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

export { makeToast };
