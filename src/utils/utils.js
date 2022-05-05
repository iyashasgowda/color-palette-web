import data from './data.json';
import Palette from './palette.js';

/** Application settings */
let app_settings = {
    menu: 1,
    theme: false,
    material_color: 1,
    solgrad: 1,
    extraction: 1,
    harmony: 1,
    preset: 1,
    solid: {
        red: 220,
        green: 40,
        blue: 80,
        alpha: 255,
        checkbox: true,
    },
    gradient: {
        top: {
            red: 85,
            green: 210,
            blue: 132,
            alpha: 255,
        },
        bottom: {
            red: 242,
            green: 207,
            blue: 7,
            alpha: 255,
        },
        checkbox: true,
    },
    complement: {
        r: 0,
        g: 0,
        b: 0,
        checked: false,
    },
    split: {
        r: 0,
        g: 0,
        b: 0,
        checked: false,
    },
    analogous: {
        r: 0,
        g: 0,
        b: 0,
        checked: false,
    },
    triadic: {
        r: 0,
        g: 0,
        b: 0,
        checked: false,
    },
    tetradic: {
        r: 0,
        g: 0,
        b: 0,
        checked: false,
    },
};

const getCache = () => {
    const cache = localStorage.getItem('app_settings');

    if (cache !== null) app_settings = JSON.parse(cache);
    else localStorage.setItem('app_settings', JSON.stringify(app_settings));
    return app_settings;
};

const setCache = (key, value) => {
    const cache = localStorage.getItem('app_settings');

    if (cache !== null) app_settings = JSON.parse(cache);
    app_settings[key] = value;

    localStorage.setItem('app_settings', JSON.stringify(app_settings));
    return app_settings;
};

/** Color utils */
const hex2rgbArray = (hex) => hex.match(/\w\w/g).map((x) => +`0x${x}`);
const hexa2rgba = (hex, alpha) => `rgb(${hex.match(/\w\w/g).map((x) => +`0x${x}`)}, ${alpha})`;

const rgb2hex = (r, g, b) => `#${(r | (1 << 8)).toString(16).slice(1).toUpperCase() + (g | (1 << 8)).toString(16).slice(1).toUpperCase() + (b | (1 << 8)).toString(16).slice(1).toUpperCase()}`;
const rgba2hexa = (r, g, b, a) => `${rgb2hex(r, g, b) + (a | (1 << 8)).toString(16).slice(1).toUpperCase()}`;

const rgb2hsv_ui = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    let minRGB = Math.min(r, g, b);
    let maxRGB = Math.max(r, g, b);

    if (minRGB === maxRGB) return `0°, 0%, ${Math.round(((maxRGB + minRGB) / 2) * 1000) / 10}%`;
    return `${Math.round(60 * ((r === minRGB ? 3 : b === minRGB ? 1 : 5) - (r === minRGB ? g - b : b === minRGB ? r - g : b - r) / (maxRGB - minRGB)))}°, ${Math.round(((maxRGB - minRGB) / maxRGB) * 100 * 10) / 10}%, ${Math.round(maxRGB * 100 * 10) / 10}%`;
};

const rgb2hsv = (rgb) => {
    let hsv = {};
    let max = rgb.r > rgb.g ? (rgb.r > rgb.b ? rgb.r : rgb.b) : rgb.g > rgb.b ? rgb.g : rgb.b;
    let dif = max - (rgb.r < rgb.g ? (rgb.r < rgb.b ? rgb.r : rgb.b) : rgb.g < rgb.b ? rgb.g : rgb.b);
    hsv.s = max === 0.0 ? 0 : (100 * dif) / max;
    if (hsv.s === 0) hsv.h = 0;
    else if (rgb.r === max) hsv.h = (60.0 * (rgb.g - rgb.b)) / dif;
    else if (rgb.g === max) hsv.h = 120.0 + (60.0 * (rgb.b - rgb.r)) / dif;
    else if (rgb.b === max) hsv.h = 240.0 + (60.0 * (rgb.r - rgb.g)) / dif;
    if (hsv.h < 0.0) hsv.h += 360.0;
    hsv.v = Math.round((max * 100) / 255);
    hsv.h = Math.round(hsv.h);
    hsv.s = Math.round(hsv.s);
    return hsv;
};

const hsv2rgb = (hsv) => {
    let rgb = {};
    if (hsv.s === 0) rgb.r = rgb.g = rgb.b = Math.round(hsv.v * 2.55);
    else {
        hsv.h /= 60;
        hsv.s /= 100;
        hsv.v /= 100;
        let i = Math.floor(hsv.h);
        let f = hsv.h - i;
        let p = hsv.v * (1 - hsv.s);
        let q = hsv.v * (1 - hsv.s * f);
        let t = hsv.v * (1 - hsv.s * (1 - f));
        switch (i) {
            case 0:
                rgb.r = hsv.v;
                rgb.g = t;
                rgb.b = p;
                break;
            case 1:
                rgb.r = q;
                rgb.g = hsv.v;
                rgb.b = p;
                break;
            case 2:
                rgb.r = p;
                rgb.g = hsv.v;
                rgb.b = t;
                break;
            case 3:
                rgb.r = p;
                rgb.g = q;
                rgb.b = hsv.v;
                break;
            case 4:
                rgb.r = t;
                rgb.g = p;
                rgb.b = hsv.v;
                break;
            default:
                rgb.r = hsv.v;
                rgb.g = p;
                rgb.b = q;
        }
        rgb.r = Math.round(rgb.r * 255);
        rgb.g = Math.round(rgb.g * 255);
        rgb.b = Math.round(rgb.b * 255);
    }
    return rgb;
};

const rgb2hsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    let maxRGB = Math.max(r, g, b);
    let minRGB = Math.min(r, g, b);
    let h,
        s,
        l = (maxRGB + minRGB) / 2;

    if (maxRGB === minRGB) h = s = 0;
    else {
        let d = maxRGB - minRGB;
        s = l > 0.5 ? d / (2 - maxRGB - minRGB) : d / (maxRGB + minRGB);
        h = 60 * ((r === minRGB ? 3 : b === minRGB ? 1 : 5) - (r === minRGB ? g - b : b === minRGB ? r - g : b - r) / (maxRGB - minRGB));
    }

    return `${Math.round(h)}°, ${Math.round(s * 1000) / 10}%, ${Math.round(l * 1000) / 10}%`;
};

const rgb2cmyk = (r, g, b) => {
    if (r === 0 && g === 0 && b === 0) return '0%, 0%, 0%, 1%';
    return `${Math.round(((1 - r / 255 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255))) / (1 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)))) * 1000) / 10}%, ${
        Math.round(((1 - g / 255 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255))) / (1 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)))) * 1000) / 10
    }%, ${Math.round(((1 - b / 255 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255))) / (1 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)))) * 1000) / 10}%, ${Math.round(Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)) * 1000) / 10}%`;
};

/** App utils */
const copyText = (text) => navigator.clipboard.writeText(text.toUpperCase());
const getTextColor = (rgb) => ((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 125 ? [0, 0, 0] : [255, 255, 255]);
const getCopyIcon = (rgb) => ((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 125 ? `${process.env.PUBLIC_URL}/assets/icons/dark/copy.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/copy.svg`);

const isMobileDevice = () =>
    navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

let timeout;
const makeToast = (message) => {
    const toast = document.querySelector('.toast');

    if (timeout !== undefined) {
        clearTimeout(timeout);
        toast.style.display = 'none';
    }

    toast.innerHTML = message;
    toast.style.display = 'block';

    timeout = setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
};

const changeTheme = (darkMode) => {
    let root = document.documentElement;
    if (darkMode) {
        data.slider.alpha = '#FAFAFA';
        root.style.setProperty('--base-color', '#2D2D2D');
        root.style.setProperty('--background-color', '#000000');
        root.style.setProperty('--card-color', '#212121');
        root.style.setProperty('--text-color', '#FAFAFA');

        root.style.setProperty('--base-color-rgb', '45, 45, 45');
        root.style.setProperty('--background-color-rgb', '0, 0, 0');
        root.style.setProperty('--card-color-rgb', '33, 33, 33');
        root.style.setProperty('--text-color-rgb', '250, 250, 250');
    } else {
        data.slider.alpha = '#212121';
        root.style.setProperty('--base-color', '#D3D3D3');
        root.style.setProperty('--background-color', '#FFFFFF');
        root.style.setProperty('--card-color', '#FAFAFA');
        root.style.setProperty('--text-color', '#212121');

        root.style.setProperty('--base-color-rgb', '211, 211, 211');
        root.style.setProperty('--background-color-rgb', '255, 255, 255');
        root.style.setProperty('--card-color-rgb', '250, 250, 250');
        root.style.setProperty('--text-color-rgb', '33, 33, 33');
    }
};

const updateSlider = (id, color) => {
    const element = document.querySelector(`#${id}`);
    let progress = ((element.value - element.min) / (element.max - element.min)) * 100;
    element.style.background = `linear-gradient(90deg, ${hexa2rgba(color, 1)} ${progress}%, ${hexa2rgba(color, 0.2)} ${progress}%)`;
};

const validateColor = (code, hex, alpha) => {
    try {
        if (hex) {
            /** pre validation before conversion */
            if (code.charAt(0) !== '#') {
                makeToast('Invalid color code!');
                return null;
            }

            /** conversion */
            const array = alpha ? [parseInt(code.slice(1, 3), 16), parseInt(code.slice(3, 5), 16), parseInt(code.slice(5, 7), 16), parseInt(code.slice(7, 9), 16)] : [parseInt(code.slice(1, 3), 16), parseInt(code.slice(3, 5), 16), parseInt(code.slice(5, 7), 16)];

            /** post validation after conversion */
            if (array.includes(NaN)) {
                makeToast('Invalid color code!');
                return null;
            }
            return array;
        } else {
            const array = code.trim().split(',');

            if (alpha) {
                /** pre validation before conversion */
                if (array.length !== 4) {
                    makeToast('Invalid color code!');
                    return null;
                }

                /** conversion */
                const rgba = [parseInt(array[0]), parseInt(array[1]), parseInt(array[2]), parseInt(array[3])];

                /** post validation after conversion */
                if (rgba.includes(NaN) || rgba[0] < 0 || rgba[0] > 255 || rgba[1] < 0 || rgba[1] > 255 || rgba[2] < 0 || rgba[2] > 255 || rgba[3] < 0 || rgba[3] > 255) {
                    makeToast('Invalid color code!');
                    return null;
                }
                return rgba;
            } else {
                /** pre validation before conversion */
                if (array.length !== 3) {
                    makeToast('Invalid color code!');
                    return null;
                }

                /** conversion */
                const rgb = [parseInt(array[0]), parseInt(array[1]), parseInt(array[2])];

                /** post validation after conversion */
                if (rgb.includes(NaN) || rgb[0] < 0 || rgb[0] > 255 || rgb[1] < 0 || rgb[1] > 255 || rgb[2] < 0 || rgb[2] > 255) {
                    makeToast('Invalid color code!');
                    return null;
                }
                return rgb;
            }
        }
    } catch {
        makeToast(`Invalid color code!`);
        return null;
    }
};

const validateUrl = (url, result) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => result(true);
    image.onerror = () => result(false);
    image.src = url;
}

const getSwatches = (path, result) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = path;
    image.onload = () => {
        const palette = new Palette(image);
        let swatches = [{name: 'Dominant', rgb: palette.getDominantColor()}];
        palette.getVibrantColor() != null && swatches.push({name: 'Vibrant', rgb: palette.getVibrantColor()});
        palette.getLightVibrantColor() != null && swatches.push({
            name: 'Vibrant light',
            rgb: palette.getLightVibrantColor()
        });
        palette.getDarkVibrantColor() != null && swatches.push({
            name: 'Vibrant dark',
            rgb: palette.getDarkVibrantColor()
        });
        palette.getMutedColor() != null && swatches.push({name: 'Muted', rgb: palette.getMutedColor()});
        palette.getLightMutedColor() != null && swatches.push({name: 'Muted light', rgb: palette.getLightMutedColor()});
        palette.getDarkMutedColor() != null && swatches.push({name: 'Muted dark', rgb: palette.getDarkMutedColor()});
        result(swatches);
    };
};

const getPalette = (path, count, result) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = path;
    image.onload = () => result(new Palette(image, count));
};

const updateCanvas = (path) => {
    let canvas = document.getElementById('manual-canvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
        let hRatio = canvas.width / image.width;
        let vRatio = canvas.height / image.height;
        let ratio = Math.min(hRatio, vRatio);
        let centerShift_x = (canvas.width - image.width * ratio) / 2;
        let centerShift_y = (canvas.height - image.height * ratio) / 2;

        context.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
    };
    image.src = path;
};

const renderColorWheel = (canvas, size, shade) => {
    const context = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    let angle = 0;
    let pivot = 0;

    const radius = size / 2;
    const rgb = [0, 0, 255];
    const offset = 4.322;

    while (angle < 360) {
        const pointer = (pivot + 3 - 1) % 3;

        if (rgb[pivot] < 255) rgb[pivot] = rgb[pivot] + offset > 255 ? 255 : rgb[pivot] + offset;
        else if (rgb[pointer] > 0) rgb[pointer] = rgb[pointer] > offset ? rgb[pointer] - offset : 0;
        else if (rgb[pivot] >= 255) {
            rgb[pivot] = 255;
            pivot = (pivot + 1) % 3;
        }

        const grad = context.createRadialGradient(radius, radius, 0, radius, radius, radius);
        grad.addColorStop(0, shade);
        grad.addColorStop(1, `rgb(${rgb.map((h) => Math.floor(h)).join(',')})`);
        context.fillStyle = grad;

        context.beginPath();
        context.moveTo(radius, radius);
        context.arc(radius, radius, radius, angle * (Math.PI / 180), 360 * (Math.PI / 180));
        context.closePath();
        context.fill();
        angle++;
    }
    return true;
};

export {
    isMobileDevice,
    getCache,
    setCache,
    hex2rgbArray,
    rgb2hex,
    hexa2rgba,
    rgba2hexa,
    rgb2hsv_ui,
    rgb2hsv,
    hsv2rgb,
    rgb2hsl,
    rgb2cmyk,
    copyText,
    makeToast,
    changeTheme,
    updateSlider,
    validateColor,
    validateUrl,
    getSwatches,
    getPalette,
    getTextColor,
    getCopyIcon,
    updateCanvas,
    renderColorWheel
};
