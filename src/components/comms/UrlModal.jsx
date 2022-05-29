import React, { useState } from 'react';
import { makeToast } from '../../utils/utils';

const UrlModal = (props) => {
   const close_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/close.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/close.svg`;

   const [url, setUrl] = useState('');
   const [gettingImage, setGettingImage] = useState(false);

   const validateUrl = () => {
      const btn = document.querySelector('#apply-btn');

      if (url.trim() !== '') {
         setGettingImage(true);
         btn.innerHTML = 'Hold on...';

         fetch(`https://no-more-cors-error.herokuapp.com/?url=${url}`)
            .then((response) => response.json())
            .then((response) => {
               if (response.success) props.inputUrl(response.data);
               else {
                  setGettingImage(false);
                  btn.innerHTML = 'APPLY';
                  makeToast('Image url is invalid!');
               }
            })
            .catch(() => {
               setGettingImage(false);
               btn.innerHTML = 'APPLY';
               makeToast('Failed to fetch the image from url!');
            });
      } else {
         setGettingImage(false);
         btn.innerHTML = 'APPLY';
         makeToast('Image url cannot be empty!');
      }
   };

   return (
      <div className='url-modal'>
         <div className='modal-container'>
            <div className='modal-content'>
               <div className='modal-header'>
                  <h2>Image Url</h2>
                  <img
                     src={close_icon}
                     alt='close'
                     onClick={() => {
                        if (!gettingImage) props.showModal(false);
                        else makeToast('Please wait while we fetch the image!');
                     }}
                  />
               </div>

               <div className='modal-body'>
                  <p>Enter the valid image url to extract colors</p>
                  <input type='text' placeholder='https://...' onChange={(e) => setUrl(e.target.value)} />
               </div>
            </div>

            <div className='modal-button'>
               <p
                  id='apply-btn'
                  onClick={() => {
                     if (gettingImage) makeToast('Please wait while we fetch the image!');
                     else validateUrl();
                  }}
               >
                  APPLY
               </p>
            </div>
         </div>
      </div>
   );
};

export default UrlModal;
