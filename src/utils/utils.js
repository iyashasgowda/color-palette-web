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
      root.style.setProperty('--base-color', '#2D2D2D');
      root.style.setProperty('--background-color', '#000000');
      root.style.setProperty('--card-color', '#212121');
      root.style.setProperty('--text-color', '#FAFAFA');
   } else {
      root.style.setProperty('--base-color', '#D3D3D3');
      root.style.setProperty('--background-color', '#FFFFFF');
      root.style.setProperty('--card-color', '#FAFAFA');
      root.style.setProperty('--text-color', '#212121');
   }
};

export { makeToast, changeTheme };
