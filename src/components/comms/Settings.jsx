import React, { useEffect } from 'react';

import data from '../../utils/data.json';
import '../../css/slider.css';
import { makeToast, updateSlider } from '../../utils/utils';

const Settings = (props) => {
   const close_img = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/close.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/close.svg`;

   useEffect(() => updateSlider('palette_seekbar', data.slider.alpha));

   const updateExtractionCount = (e) => {
      updateSlider('palette_seekbar', data.slider.alpha);
      props.changeExtractionCount(e.target.value);
      if (e.target.value <= 2) makeToast('Minimum 2 colors are required!');
   };

   return (
      <div className='settings-modal'>
         <div className='modal-container'>
            <div className='settings-modal-header'>
               <h2>Settings</h2>
               <img src={close_img} alt='close' onClick={() => props.showModal(false)} />
            </div>

            <div className='settings-modal-body'>
               <h3>Palette</h3>
               <div className='extract-count'>
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
            </div>
         </div>
      </div>
   );
};

export default Settings;
