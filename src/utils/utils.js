import data from './data.json';

let hex2rgb = (hex) => `rgb(${hex.match(/\w\w/g).map((x) => +`0x${x}`)})`;
let hex2rgba = (hex, alpha) => `rgb(${hex.match(/\w\w/g).map((x) => +`0x${x}`)}, ${alpha})`;
let rgba2hex = (r, g, b, a) => `#${(r | (1 << 8)).toString(16).slice(1).toUpperCase() + (g | (1 << 8)).toString(16).slice(1).toUpperCase() + (b | (1 << 8)).toString(16).slice(1).toUpperCase() + (a | (1 << 8)).toString(16).slice(1).toUpperCase()}`;
let rgb2hsv = (r, g, b) => {
   r = r / 255;
   g = g / 255;
   b = b / 255;
   let minRGB = Math.min(r, Math.min(g, b));
   let maxRGB = Math.max(r, Math.max(g, b));

   if (minRGB === maxRGB) return `0°, 0%, ${minRGB}%`;
   return `${Math.round(60 * ((r === minRGB ? 3 : b === minRGB ? 1 : 5) - (r === minRGB ? g - b : b === minRGB ? r - g : b - r) / (maxRGB - minRGB)))}°, ${Math.round(((maxRGB - minRGB) / maxRGB) * 100 * 10) / 10}%, ${Math.round(maxRGB * 100 * 10) / 10}%`;
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
   if (!darkMode) {
      data.slider.alpha = '#FAFAFA';
      root.style.setProperty('--base-color', '#2D2D2D');
      root.style.setProperty('--background-color', '#000000');
      root.style.setProperty('--card-color', '#212121');
      root.style.setProperty('--text-color', '#FAFAFA');
   } else {
      data.slider.alpha = '#212121';
      root.style.setProperty('--base-color', '#D3D3D3');
      root.style.setProperty('--background-color', '#FFFFFF');
      root.style.setProperty('--card-color', '#FAFAFA');
      root.style.setProperty('--text-color', '#212121');
   }
};

const updateSlider = (id, color) => {
   const element = document.querySelector(`#${id}`);
   let progress = ((element.value - element.min) / (element.max - element.min)) * 100;
   element.style.background = `linear-gradient(90deg, ${hex2rgba(color, 1)} ${progress}%, ${hex2rgba(color, 0.2)} ${progress}%)`;
};

export { hex2rgb, hex2rgba, rgba2hex, rgb2hsv, makeToast, changeTheme, updateSlider };
