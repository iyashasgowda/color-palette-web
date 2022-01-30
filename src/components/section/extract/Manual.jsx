import React from 'react';

import { copyText, getCopyIcon, getTextColor, makeToast, rgb2hex, updateCanvas } from '../../../utils/utils';

const Manual = (props) => {
   const manual_hex = rgb2hex(props.manual.rgb.red, props.manual.rgb.green, props.manual.rgb.blue);
   const manual_rgb = `${props.manual.rgb.red}, ${props.manual.rgb.green}, ${props.manual.rgb.blue}`;
   const rgb_array = [props.manual.rgb.red, props.manual.rgb.green, props.manual.rgb.blue];
   const text_color = getTextColor(rgb_array);
   const copy_icon = getCopyIcon(rgb_array);

   const changeManual = (e) => {
      if (e.target.files && e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (e) => {
            updateManual(e.target.result, props.manual.rgb.red, props.manual.rgb.green, props.manual.rgb.blue);
            updateCanvas(e.target.result);
         };
         reader.readAsDataURL(e.target.files[0]);
      } else makeToast('Selected image is not valid!');
   };

   const getPixelColor = (e) => {
      const canvas = document.querySelector('#manual-canvas');

      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
      const y = ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;

      const rgb = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
      updateManual(props.manual.path, rgb[0], rgb[1], rgb[2]);
   };

   const updateManual = (path, red, green, blue) => {
      props.changeManual({
         path,
         rgb: {
            red,
            green,
            blue,
         },
      });
   };

   return (
      <div className='manual-section'>
         <div className='manual-header'>
            <div className='manual-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/manual.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/manual.svg`} alt='swatch' />
               <p>Manually select colors</p>
            </div>

            <div className='manual-reset'>
               <p>Reset</p>
               <img
                  src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/reset.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/reset.svg`}
                  alt='reset'
                  onClick={() => {
                     if (props.manual.path === '') makeToast(`No image is selected to reset!`);
                     else {
                        updateManual('', 0, 0, 0);
                        updateCanvas('');
                        makeToast('Image has been reset');
                     }
                  }}
               />
            </div>
         </div>

         <div className='manual-body'>
            <div className='manual-img-background' style={{ backgroundColor: `rgb(${manual_rgb})` }}>
               <div className='manual-img-card'>
                  <input id='manual-file-input' style={{ display: 'none' }} type='file' accept='image/*' onChange={(e) => changeManual(e)} />
                  {props.manual.path === '' && <img className='manual-select-logo' src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo' />}
                  <canvas id='manual-canvas' onClick={(e) => getPixelColor(e)}></canvas>
               </div>

               <div className='manual-color-card'>
                  <div className='manual-color-hex'>
                     <p style={{ color: `rgb(${text_color[0]}, ${text_color[1]}, ${text_color[2]})` }}>{manual_hex}</p>
                     <img
                        style={{ opacity: 0.8 }}
                        src={copy_icon}
                        alt='copy'
                        onClick={() => {
                           copyText(manual_hex);
                           makeToast(`${manual_hex} copied :)`);
                        }}
                     />
                  </div>
                  <div className='manual-choose-image' onClick={() => document.querySelector('#manual-file-input').click()}>
                     <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/select_manual.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/select_manual.svg`} alt='select' />
                  </div>
                  <div className='manual-color-rgb'>
                     <p style={{ color: `rgb(${text_color[0]}, ${text_color[1]}, ${text_color[2]})` }}>{manual_rgb}</p>
                     <img
                        style={{ opacity: 0.8 }}
                        src={copy_icon}
                        alt='copy'
                        onClick={() => {
                           copyText(manual_rgb);
                           makeToast(`${manual_rgb} copied :)`);
                        }}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Manual;
