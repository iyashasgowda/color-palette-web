import React from 'react';
import Item from '../palette/Item';

import { makeToast, getPalette } from '../../../../utils/utils';

const Palette = (props) => {
   const is_active = props.palette.path !== '';
   const changePalette = (e) => {
      if (e.target.files && e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (e) =>
            getPalette(e.target.result, 16, (palette) => {
               props.changePalette({ path: e.target.result, palette });
               makeToast(`${palette.swatches.length} colors extracted :)`);
            });
         reader.readAsDataURL(e.target.files[0]);
      } else makeToast('Selected image is not valid!');
   };

   return (
      <div className='palette-section'>
         <div className='palette-header'>
            <div className='palette-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/palette.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/palette.svg`} alt='swatch' />
               <p>Extract palette colors</p>
            </div>

            <div className='palette-reset'>
               <p>Reset</p>
               <img
                  src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/reset.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/reset.svg`}
                  alt='reset'
                  onClick={() => {
                     if (!is_active) makeToast(`No palette extracted to reset!`);
                     else {
                        props.changePalette({ path: '', palette: [] });
                        makeToast('Palette has been reset');
                     }
                  }}
               />
            </div>
         </div>

         <div className='palette-body'>
            <div className='palette-img-chooser' onClick={() => document.querySelector('#palette-file-input').click()}>
               <input id='palette-file-input' style={{ display: 'none' }} type='file' accept='image/*' onChange={(e) => changePalette(e)} />
               {!is_active && (
                  <div className='logo-info'>
                     <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo' />
                     <p>Choose Image</p>
                  </div>
               )}
               <img id='selected-image' className='selected-image' src={props.palette.path} alt='' />
            </div>

            <div className='extracted-palette'>{props.palette.palette.swatches !== undefined ? props.palette.palette.swatches.map((item, index) => <Item key={index} rgb={item.getRGB()} />) : <></>}</div>

            {!is_active && (
               <div className='palette-extract-info'>
                  <p>Guide:</p>
                  <ul>
                     <li>Extracted palettes from the image will appear here.</li>
                     <li>Various shades of palettes will be extracted based on the color availability in the selected image.</li>
                     <li>You can set the maximum colors to be extracted from the image in the settings screen.</li>
                     <li>You can copy HEX or RGB color code by clicking on the copy button.</li>
                  </ul>
               </div>
            )}
         </div>
      </div>
   );
};

export default Palette;
