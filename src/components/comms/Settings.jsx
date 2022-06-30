import React, { useEffect } from 'react';

import '../../css/slider.css';
import author from '../../utils/author.json';
import data from '../../utils/data.json';
import { makeToast, updateSlider } from '../../utils/utils';

const Settings = (props) => {
   const close_img = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/close.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/close.svg`;
   const email_img = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/email.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/email.svg`;
   const logo = `${process.env.PUBLIC_URL}/assets/logo.svg`;

   useEffect(() => updateSlider('palette_seekbar', data.slider.alpha));

   const updateExtractionCount = (e) => {
      updateSlider('palette_seekbar', data.slider.alpha);
      props.changeExtractionCount(e.target.value);
      if (e.target.value <= 2) makeToast('Minimum 2 colors are required!');
   };

   const sendEmail = () => {
      const link = `mailto:${author.email}?subject=${encodeURIComponent('Color Palette: Request Feature')}`;
      window.location.href = link;
   };

   return (
      <div className='settings-modal'>
         <div className='modal-container'>
            <div className='settings-modal-header'>
               <h2>Settings</h2>
               <img src={close_img} alt='close' onClick={() => props.showModal(false)} />
            </div>

            <div className='settings-modal-body'>
               <h3>Theme</h3>
               <div className='settings-category theme'>
                  <div className='title-desc'>
                     <h4>Dark Mode</h4>
                     <p>Improves visibility for users with low vision and those who are sensitive to bright light.</p>
                  </div>

                  <input type='checkbox' className='toggle-checkbox' id='solid-alpha-checkbox' checked={props.darkMode} onChange={() => props.changeTheme()} />
               </div>

               <h3>Palette</h3>
               <div className='settings-category palette'>
                  <p>Set number of colors you want to extract:</p>

                  <div className='palette_seekbar_count'>
                     <input id='palette_seekbar' className='palette_seekbar' type='range' min='2' max='100' value={props.extractionCount} onInput={(e) => updateExtractionCount(e)} />
                     <h3>{props.extractionCount}</h3>
                  </div>

                  <div className='separator' />
                  <p className='info'>
                     <b>Note:</b> The number of colors extracted might be lower than the value you've set. This is due to that particular image and it is normal.
                  </p>
               </div>

               <h3>Feedback</h3>
               <div className='settings-category feedback'>
                  <p>Request developer to implement your required feature.</p>
                  <img src={email_img} alt='email' onClick={() => sendEmail()} />
               </div>

               <div className='about-app'>
                  <img className='app-logo' src={logo} alt='logo' />
                  <p className='app-name'>Color Palette</p>
                  <p className='app-version'>v{props.version}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
