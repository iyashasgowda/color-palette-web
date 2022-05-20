//Constants
const WEIGHT_SATURATION = 0.24,
    WEIGHT_LUMA = 0.52,
    WEIGHT_POPULATION = 0.24,
    INDEX_MIN = 0,
    INDEX_TARGET = 1,
    INDEX_MAX = 2,
    INDEX_WEIGHT_SAT = 0,
    INDEX_WEIGHT_LUMA = 1,
    INDEX_WEIGHT_POP = 2,
    TARGET_DARK_LUMA = 0.26,
    MAX_DARK_LUMA = 0.45,
    MIN_LIGHT_LUMA = 0.55,
    TARGET_LIGHT_LUMA = 0.74,
    MIN_NORMAL_LUMA = 0.3,
    TARGET_NORMAL_LUMA = 0.5,
    MAX_NORMAL_LUMA = 0.7,
    TARGET_MUTED_SATURATION = 0.3,
    MAX_MUTED_SATURATION = 0.4,
    TARGET_VIBRANT_SATURATION = 1,
    MIN_VIBRANT_SATURATION = 0.35,
    COMPONENT_RED = -3,
    COMPONENT_GREEN = -2,
    COMPONENT_BLUE = -1;

//Utilities
const setDefaultDarkLightnessValues = (target) => {
    target.lightnessTargets[INDEX_TARGET] = TARGET_DARK_LUMA;
    target.lightnessTargets[INDEX_MAX] = MAX_DARK_LUMA;
};

const setDefaultNormalLightnessValues = (target) => {
    target.lightnessTargets[INDEX_MIN] = MIN_NORMAL_LUMA;
    target.lightnessTargets[INDEX_TARGET] = TARGET_NORMAL_LUMA;
    target.lightnessTargets[INDEX_MAX] = MAX_NORMAL_LUMA;
};

const setDefaultLightLightnessValues = (target) => {
    target.lightnessTargets[INDEX_MIN] = MIN_LIGHT_LUMA;
    target.lightnessTargets[INDEX_TARGET] = TARGET_LIGHT_LUMA;
};

const setDefaultVibrantSaturationValues = (target) => {
    target.saturationTargets[INDEX_MIN] = MIN_VIBRANT_SATURATION;
    target.saturationTargets[INDEX_TARGET] = TARGET_VIBRANT_SATURATION;
};

const setDefaultMutedSaturationValues = (target) => {
    target.saturationTargets[INDEX_TARGET] = TARGET_MUTED_SATURATION;
    target.saturationTargets[INDEX_MAX] = MAX_MUTED_SATURATION;
};

const defaultCompare = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
};

const quantizedRed = (rgb555) => {
    return (rgb555 >> 10) & 0x1f;
};

const quantizedGreen = (rgb555) => {
    return (rgb555 >> 5) & 0x1f;
};

const quantizedBlue = (rgb555) => {
    return rgb555 & 0x1f;
};

const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let d = max - min;
    let h,
        s,
        l = (max + min) / 2;

    if (max === min) h = s = 0;
    else {
        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else if (max === b) h = (r - g) / d + 4;
        s = d / (1 - Math.abs(2 * l - 1));
    }

    h = (h * 60) % 360;
    if (h < 0) h += 360;
    return [h, s, l];
};

//tinyqueue
class TinyQueue {
    constructor(data = [], compare = defaultCompare) {
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;

        if (this.length > 0) {
            for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
        }
    }

    push(item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.data[0];
        const bottom = this.data.pop();
        this.length--;

        if (this.length > 0) {
            this.data[0] = bottom;
            this._down(0);
        }

        return top;
    }

    peek() {
        return this.data[0];
    }

    _up(pos) {
        const {data, compare} = this;
        const item = data[pos];

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const current = data[parent];
            if (compare(item, current) >= 0) break;
            data[pos] = current;
            pos = parent;
        }

        data[pos] = item;
    }

    _down(pos) {
        const {data, compare} = this;
        const halfLength = this.length >> 1;
        const item = data[pos];

        while (pos < halfLength) {
            let left = (pos << 1) + 1;
            let best = data[left];
            const right = left + 1;

            if (right < this.length && compare(data[right], best) < 0) {
                left = right;
                best = data[right];
            }
            if (compare(best, item) >= 0) break;

            data[pos] = best;
            pos = left;
        }

        data[pos] = item;
    }
}

//Swatch
class Swatch {
    constructor(red, green, blue, population) {
        this.red = red << 3;
        this.green = green << 3;
        this.blue = blue << 3;
        this.rgb = (this.red << 16) | (this.green << 8) | this.blue;
        this.population = population;
    }

    getHsl() {
        if (this.hsl == null) {
            this.hsl = rgbToHsl(this.red, this.green, this.blue);
        }
        return this.hsl;
    }

    getRGB() {
        return [this.red, this.green, this.blue];
    }
}

//vbox
class Vbox {
    constructor(histogram, colors, lowerIndex, upperIndex) {
        this.histogram = histogram;
        this.colors = colors;
        this.lowerIndex = lowerIndex;
        this.upperIndex = upperIndex;
        this.fitBox();
    }

    static modifySignificantOctet(colors, dimension, lower, upper) {
        if (dimension === COMPONENT_GREEN) {
            for (let i = lower; i <= upper; i++) {
                let color = colors[i];
                colors[i] = (quantizedGreen(color) << 10) | (quantizedRed(color) << 5) | quantizedBlue(color);
            }
        } else if (dimension === COMPONENT_BLUE) {
            for (let i = lower; i <= upper; i++) {
                let color = colors[i];
                colors[i] = (quantizedBlue(color) << 10) | (quantizedGreen(color) << 5) | quantizedRed(color);
            }
        }
    }

    static sortRange(arr, from, to) {
        let temp = new Int16Array(to - from + 1);
        let j = 0;
        for (let i = from; i <= to; i++) {
            temp[j] = arr[i];
            j++;
        }

        temp.sort();

        j = 0;
        for (let i = from; i <= to; i++) {
            arr[i] = temp[j];
            j++;
        }
    }

    getVolume() {
        return (this.maxRed - this.minRed + 1) * (this.maxGreen - this.minGreen + 1) * (this.maxBlue - this.minBlue + 1);
    }

    canSplit() {
        return this.upperIndex > this.lowerIndex;
    }

    fitBox() {
        this.minRed = this.minGreen = this.minBlue = Number.MAX_VALUE;
        this.maxRed = this.maxGreen = this.maxBlue = 0;
        this.population = 0;

        for (let i = this.lowerIndex; i <= this.upperIndex; i++) {
            let color = this.colors[i];
            this.population += this.histogram[color];

            let r = quantizedRed(color);
            let g = quantizedGreen(color);
            let b = quantizedBlue(color);

            if (r > this.maxRed) {
                this.maxRed = r;
            }
            if (r < this.minRed) {
                this.minRed = r;
            }
            if (g > this.maxGreen) {
                this.maxGreen = g;
            }
            if (g < this.minGreen) {
                this.minGreen = g;
            }
            if (b > this.maxBlue) {
                this.maxBlue = b;
            }
            if (b < this.minBlue) {
                this.minBlue = b;
            }
        }
    }

    splitBox() {
        if (!this.canSplit()) throw new Error('Can not split a box with only 1 color');

        let splitPoint = this.findSplitPoint();
        let newBox = new Vbox(this.histogram, this.colors, splitPoint + 1, this.upperIndex);

        this.upperIndex = splitPoint;
        this.fitBox();

        return newBox;
    }

    getLongestColorDimension() {
        let redLen = this.maxRed - this.minRed;
        let greenLen = this.maxGreen - this.minGreen;
        let blueLen = this.maxBlue - this.minBlue;

        if (redLen >= greenLen && redLen >= blueLen) {
            return COMPONENT_RED;
        } else if (greenLen >= redLen && greenLen >= blueLen) {
            return COMPONENT_GREEN;
        } else {
            return COMPONENT_BLUE;
        }
    }

    findSplitPoint() {
        let longestDimension = this.getLongestColorDimension();

        Vbox.modifySignificantOctet(this.colors, longestDimension, this.lowerIndex, this.upperIndex);

        Vbox.sortRange(this.colors, this.lowerIndex, this.upperIndex);

        Vbox.modifySignificantOctet(this.colors, longestDimension, this.lowerIndex, this.upperIndex);

        let midPoint = this.population / 2;
        let count = 0;
        for (let i = this.lowerIndex; i <= this.upperIndex; i++) {
            count += this.histogram[this.colors[i]];
            if (count >= midPoint) {
                return Math.min(this.upperIndex - 1, i);
            }
        }
        return this.lowerIndex;
    }

    getAverageColor() {
        let redSum = 0,
            greenSum = 0,
            blueSum = 0,
            totalPopulation = 0;
        for (let i = this.lowerIndex; i <= this.upperIndex; i++) {
            let color = this.colors[i];
            let colorPopulation = this.histogram[color];

            totalPopulation += colorPopulation;
            redSum += colorPopulation * quantizedRed(color);
            greenSum += colorPopulation * quantizedGreen(color);
            blueSum += colorPopulation * quantizedBlue(color);
        }

        let redMean = Math.round(redSum / totalPopulation);
        let greenMean = Math.round(greenSum / totalPopulation);
        let blueMean = Math.round(blueSum / totalPopulation);

        return new Swatch(redMean, greenMean, blueMean, totalPopulation);
    }
}

//color filter
class ColorFilter {
    constructor() {
        this.BLACK_MAX_LIGHTNESS = 0.05;
        this.WHITE_MIN_LIGHTNESS = 0.95;
    }

    isAllowed(hsl) {
        let isWhite = hsl[2] >= this.WHITE_MIN_LIGHTNESS;
        let isBlack = hsl[2] <= this.BLACK_MAX_LIGHTNESS;
        let isNearRedILine = hsl[0] >= 10 && hsl[0] <= 37 && hsl[1] <= 0.82;
        return !isWhite && !isBlack && !isNearRedILine;
    }
}

//quantizer
const DEFAULT_FILTER = new ColorFilter();

class Quantizer {
    constructor(data, maxColors) {
        let colorCount = 1 << 15;
        let histogram = new Int16Array(colorCount);

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i] >> 3;
            let g = data[i + 1] >> 3;
            let b = data[i + 2] >> 3;
            histogram[(r << 10) | (g << 5) | b]++;
        }

        let distinctColorCount = 0;
        for (let color = 0; color < colorCount; color++) {
            if (histogram[color] > 0 && Quantizer.shouldIgnoreColor(color)) {
                histogram[color] = 0;
            }

            if (histogram[color] > 0) {
                distinctColorCount++;
            }
        }

        let colors = new Int16Array(distinctColorCount);
        let index = 0;
        for (let color = 0; color < colorCount; color++) {
            if (histogram[color] > 0) {
                colors[index++] = color;
            }
        }

        if (distinctColorCount <= maxColors) {
            this.quantizedColors = new Array(distinctColorCount);
            for (let i = 0; i < distinctColorCount; i++) {
                let color = colors[i];
                let r = (color >> 10) & 0x1f;
                let g = (color >> 10) & 0x1f;
                let b = color & 0x1f;
                this.quantizedColors[i] = new Swatch(r, g, b, histogram[color]);
            }
        } else {
            this.quantizedColors = Quantizer.quantizePixels(histogram, colors, maxColors);
        }
    }

    static quantizePixels(histogram, colors, maxColors) {
        let box = new Vbox(histogram, colors, 0, colors.length - 1);
        let queue = new TinyQueue([box], (a, b) => b.getVolume() - a.getVolume());

        Quantizer.splitBoxes(queue, maxColors);

        return Quantizer.generateAverageColors(queue);
    }

    static splitBoxes(queue, maxSize) {
        while (queue.length < maxSize) {
            let vbox = queue.pop();
            if (vbox != null && vbox.canSplit()) {
                queue.push(vbox.splitBox());
                queue.push(vbox);
            } else {
                break;
            }
        }
    }

    static generateAverageColors(queue) {
        let swatches = [];
        while (queue.length) {
            let swatch = queue.pop().getAverageColor();
            if (!Quantizer.shouldIgnoreHSL(swatch.getHsl())) {
                swatches.push(swatch);
            }
        }
        return swatches;
    }

    static shouldIgnoreColor(rgb555) {
        let r = quantizedRed(rgb555) << 3;
        let g = quantizedGreen(rgb555) << 3;
        let b = quantizedBlue(rgb555) << 3;
        let hsl = rgbToHsl(r, g, b);
        return !DEFAULT_FILTER.isAllowed(hsl);
    }

    static shouldIgnoreHSL(hsl) {
        return !DEFAULT_FILTER.isAllowed(hsl);
    }

    getQuantizedColors() {
        return this.quantizedColors;
    }
}

//target
class Target {
    constructor() {
        this.saturationTargets = [0, 0.5, 1];
        this.lightnessTargets = [0, 0.5, 1];
        this.weights = new Float32Array(3);
        this.weights[INDEX_WEIGHT_SAT] = WEIGHT_SATURATION;
        this.weights[INDEX_WEIGHT_LUMA] = WEIGHT_LUMA;
        this.weights[INDEX_WEIGHT_POP] = WEIGHT_POPULATION;
    }

    normalizeWeights() {
        let sum = 0;
        for (let i = 0, z = this.weights.length; i < z; i++) {
            let weight = this.weights[i];
            if (weight > 0) {
                sum += weight;
            }
        }
        if (sum !== 0) {
            for (let i = 0, z = this.weights.length; i < z; i++) {
                if (this.weights[i] > 0) {
                    this.weights[i] /= sum;
                }
            }
        }
    }

    getMinimumSaturation() {
        return this.saturationTargets[INDEX_MIN];
    }

    getTargetSaturation() {
        return this.saturationTargets[INDEX_TARGET];
    }

    getMaximumSaturation() {
        return this.saturationTargets[INDEX_MAX];
    }

    getMinimumLightness() {
        return this.lightnessTargets[INDEX_MIN];
    }

    getTargetLightness() {
        return this.lightnessTargets[INDEX_TARGET];
    }

    getMaximumLightness() {
        return this.lightnessTargets[INDEX_MAX];
    }

    getSaturationWeight() {
        return this.weights[INDEX_WEIGHT_SAT];
    }

    getLightnessWeight() {
        return this.weights[INDEX_WEIGHT_LUMA];
    }

    getPopulationWeight() {
        return this.weights[INDEX_WEIGHT_POP];
    }
}

let LIGHT_VIBRANT = new Target();
setDefaultLightLightnessValues(LIGHT_VIBRANT);
setDefaultVibrantSaturationValues(LIGHT_VIBRANT);

let VIBRANT = new Target();
setDefaultNormalLightnessValues(VIBRANT);
setDefaultVibrantSaturationValues(VIBRANT);

let DARK_VIBRANT = new Target();
setDefaultDarkLightnessValues(DARK_VIBRANT);
setDefaultVibrantSaturationValues(DARK_VIBRANT);

let LIGHT_MUTED = new Target();
setDefaultLightLightnessValues(LIGHT_MUTED);
setDefaultMutedSaturationValues(LIGHT_MUTED);

let MUTED = new Target();
setDefaultNormalLightnessValues(MUTED);
setDefaultMutedSaturationValues(MUTED);

let DARK_MUTED = new Target();
setDefaultDarkLightnessValues(DARK_MUTED);
setDefaultMutedSaturationValues(DARK_MUTED);

//Palette
export default class Palette {
    constructor(image, maxColors) {
        this.image = image;
        this.maxColors = maxColors || 16;

        let width = this.image.width;
        let height = this.image.height;

        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, 0, 0);
        let data = ctx.getImageData(0, 0, width, height).data;

        let quantizer = new Quantizer(data, this.maxColors);
        this.swatches = quantizer.getQuantizedColors();

        this.findDominantSwatch();

        this.targets = [LIGHT_VIBRANT, VIBRANT, DARK_VIBRANT, LIGHT_MUTED, MUTED, DARK_MUTED];
        this.usedColors = new Map();
        this.selectedSwatches = new Map();
        for (let i = 0; i < this.targets.length; i++) {
            let target = this.targets[i];
            target.normalizeWeights();
            let swatch = this.generateScoredTarget(target);
            this.selectedSwatches.set(target, swatch);
        }
        this.usedColors.clear();
    }

    findDominantSwatch() {
        let maxPop = 0;
        let maxSwatch = null;
        this.swatches.forEach(function (swatch) {
            if (swatch.population > maxPop) {
                maxSwatch = swatch;
                maxPop = swatch.population;
            }
        });
        this.dominantSwatch = maxSwatch;
    }

    generateScoredTarget(target) {
        let maxScoreSwatch = this.getMaxScoredSwatchForTarget(target);
        if (maxScoreSwatch != null) {
            this.usedColors.set(maxScoreSwatch.rgb, true);
        }
        return maxScoreSwatch;
    }

    getMaxScoredSwatchForTarget(target) {
        let maxScore = 0;
        let maxScoreSwatch = null;
        for (let i = 0; i < this.swatches.length; i++) {
            let swatch = this.swatches[i];
            if (this.shouldBeScoredForTarget(swatch, target)) {
                let score = this.generateScore(swatch, target);
                if (score > maxScore || maxScoreSwatch == null) {
                    maxScoreSwatch = swatch;
                    maxScore = score;
                }
            }
        }
        return maxScoreSwatch;
    }

    shouldBeScoredForTarget(swatch, target) {
        let hsl = swatch.getHsl();
        let s = hsl[1];
        let l = hsl[2];

        return s >= target.getMinimumSaturation() && s <= target.getMaximumSaturation() && l >= target.getMinimumLightness() && l <= target.getMaximumLightness() && !this.usedColors.get(swatch.rgb);
    }

    generateScore(swatch, target) {
        let saturationScore = 0;
        let luminanceScore = 0;
        let populationScore = 0;
        let maxPopulation = this.dominantSwatch.population;

        let hsl = swatch.getHsl();

        if (target.getSaturationWeight() > 0) {
            saturationScore = target.getSaturationWeight() * (1 - Math.abs(hsl[1] - target.getTargetSaturation()));
        }
        if (target.getLightnessWeight() > 0) {
            luminanceScore = target.getLightnessWeight() * (1 - Math.abs(hsl[2] - target.getTargetLightness()));
        }
        if (target.getPopulationWeight() > 0) {
            populationScore = target.getPopulationWeight() * (swatch.population / maxPopulation);
        }

        return saturationScore + luminanceScore + populationScore;
    }

    getDominantColor() {
        return this.dominantSwatch.getRGB();
    }

    getColorForTarget(target, defaultColor) {
        let swatch = this.selectedSwatches.get(target);
        return swatch == null ? defaultColor : swatch.getRGB();
    }

    getVibrantColor() {
        return this.getColorForTarget(VIBRANT);
    }

    getLightVibrantColor() {
        return this.getColorForTarget(LIGHT_VIBRANT);
    }

    getDarkVibrantColor() {
        return this.getColorForTarget(DARK_VIBRANT);
    }

    getMutedColor() {
        return this.getColorForTarget(MUTED);
    }

    getLightMutedColor() {
        return this.getColorForTarget(LIGHT_MUTED);
    }

    getDarkMutedColor() {
        return this.getColorForTarget(DARK_MUTED);
    }
}
