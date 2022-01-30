import data from './data.json';
import Palette from './palette.js';

const hex2rgb = (hex) => `rgb(${hex.match(/\w\w/g).map((x) => +`0x${x}`)})`;
const hexa2rgba = (hex, alpha) => `rgb(${hex.match(/\w\w/g).map((x) => +`0x${x}`)}, ${alpha})`;

const rgba2hexa = (r, g, b, a) => `#${(r | (1 << 8)).toString(16).slice(1).toUpperCase() + (g | (1 << 8)).toString(16).slice(1).toUpperCase() + (b | (1 << 8)).toString(16).slice(1).toUpperCase() + (a | (1 << 8)).toString(16).slice(1).toUpperCase()}`;
const rgb2hex = (r, g, b) => `#${(r | (1 << 8)).toString(16).slice(1).toUpperCase() + (g | (1 << 8)).toString(16).slice(1).toUpperCase() + (b | (1 << 8)).toString(16).slice(1).toUpperCase()}`;

const copyText = (text) => navigator.clipboard.writeText(text.toUpperCase());
const getTextColor = (rgb) => ((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 125 ? [0, 0, 0] : [255, 255, 255]);
const getCopyIcon = (rgb) => ((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 125 ? `${process.env.PUBLIC_URL}/assets/icons/dark/copy.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/copy.svg`);

const rgb2hsv = (r, g, b) => {
   r /= 255;
   g /= 255;
   b /= 255;
   let minRGB = Math.min(r, g, b);
   let maxRGB = Math.max(r, g, b);

   if (minRGB === maxRGB) return `0°, 0%, ${Math.round(((maxRGB + minRGB) / 2) * 1000) / 10}%`;
   return `${Math.round(60 * ((r === minRGB ? 3 : b === minRGB ? 1 : 5) - (r === minRGB ? g - b : b === minRGB ? r - g : b - r) / (maxRGB - minRGB)))}°, ${Math.round(((maxRGB - minRGB) / maxRGB) * 100 * 10) / 10}%, ${Math.round(maxRGB * 100 * 10) / 10}%`;
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
      var d = maxRGB - minRGB;
      s = l > 0.5 ? d / (2 - maxRGB - minRGB) : d / (maxRGB + minRGB);
      h = 60 * ((r === minRGB ? 3 : b === minRGB ? 1 : 5) - (r === minRGB ? g - b : b === minRGB ? r - g : b - r) / (maxRGB - minRGB));
   }

   return `${Math.round(h)}°, ${Math.round(s * 1000) / 10}%, ${Math.round(l * 1000) / 10}%`;
};

const rgb2cmyk = (r, g, b) => {
   if (r == 0 && g == 0 && b == 0) return '0%, 0%, 0%, 1%';
   return `${Math.round(((1 - r / 255 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255))) / (1 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)))) * 1000) / 10}%, ${
      Math.round(((1 - g / 255 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255))) / (1 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)))) * 1000) / 10
   }%, ${Math.round(((1 - b / 255 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255))) / (1 - Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)))) * 1000) / 10}%, ${Math.round(Math.min(1 - r / 255, Math.min(1 - g / 255, 1 - b / 255)) * 1000) / 10}%`;
};

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

const getSwatches = (path, result) => {
   const image = new Image();
   image.src = path;
   image.onload = () => {
      const palette = new Palette(image);
      let swatches = [{ name: 'Dominant', rgb: palette.getDominantColor() }];
      palette.getVibrantColor() != null && swatches.push({ name: 'Vibrant', rgb: palette.getVibrantColor() });
      palette.getLightVibrantColor() != null && swatches.push({ name: 'Vibrant light', rgb: palette.getLightVibrantColor() });
      palette.getDarkVibrantColor() != null && swatches.push({ name: 'Vibrant dark', rgb: palette.getDarkVibrantColor() });
      palette.getMutedColor() != null && swatches.push({ name: 'Muted', rgb: palette.getMutedColor() });
      palette.getLightMutedColor() != null && swatches.push({ name: 'Muted light', rgb: palette.getLightMutedColor() });
      palette.getDarkMutedColor() != null && swatches.push({ name: 'Muted dark', rgb: palette.getDarkMutedColor() });
      result(swatches);
   };
};

const getPalette = (path, count, result) => {
   const image = new Image();
   image.src = path;
   image.onload = () => result(new Palette(image, count));
};

const updateCanvas = (path) => {
   let canvas = document.getElementById('manual-canvas');
   let context = canvas.getContext('2d');
   context.clearRect(0, 0, canvas.width, canvas.height);

   let image = new Image();
   image.onload = () => {
      var hRatio = canvas.width / image.width;
      var vRatio = canvas.height / image.height;
      var ratio = Math.min(hRatio, vRatio);
      var centerShift_x = (canvas.width - image.width * ratio) / 2;
      var centerShift_y = (canvas.height - image.height * ratio) / 2;

      context.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
   };
   image.src = path;
};

export { hex2rgb, rgb2hex, hexa2rgba, rgba2hexa, rgb2hsv, rgb2hsl, rgb2cmyk, copyText, makeToast, changeTheme, updateSlider, validateColor, getSwatches, getPalette, getTextColor, getCopyIcon, updateCanvas };
