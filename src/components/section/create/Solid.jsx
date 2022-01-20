import React, { useEffect } from 'react';
import { copyText, makeToast, rgba2hex, rgb2hsv, rgb2cmyk, rgb2hsl, updateSlider } from '../../../utils/utils';

import data from '../../../utils/data.json';

const Solid = (props) => {
   const [red, green, blue, alpha] = [props.solid.red, props.solid.green, props.solid.blue, props.solid.alpha];
   const [hex, rgba, hsv, hsl, cmyk] = [rgba2hex(red, green, blue, alpha), `${red}, ${green}, ${blue}, ${alpha}`, rgb2hsv(red, green, blue), rgb2hsl(red, green, blue), rgb2cmyk(red, green, blue)];
   const solid_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/solid.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/solid.svg`;

   useEffect(() => {
      updateSlider('solid_alpha_seekbar', data.slider.alpha);
      updateSlider('solid_red_seekbar', data.slider.red);
      updateSlider('solid_green_seekbar', data.slider.green);
      updateSlider('solid_blue_seekbar', data.slider.blue);
   });

   return (
      <div className='solid-section'>
         <div className='solid-header'>
            <img src={solid_icon} alt='solid'></img>
            <p>Create solid color</p>
         </div>

         <div className='solid-body'>
            <div className='solid-color' style={{ backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha / 255} )` }} />
            <div className='solid-control'>
               <div className='solid-attributes'>
                  <div className='solid-hex'>
                     <p>HEX: {hex}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(hex);
                              makeToast(`${hex} copied :)`);
                           }}
                        />
                     </div>
                  </div>

                  <div className='solid-rgb'>
                     <p>RGBA: {rgba}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(rgba);
                              makeToast(`${rgba} copied :)`);
                           }}
                        />
                     </div>
                  </div>

                  <div className='solid-hsv'>
                     <p>HSV: {hsv}</p>
                     <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                        alt='copy'
                        onClick={() => {
                           copyText(hsv);
                           makeToast(`${hsv} copied :)`);
                        }}
                     />
                  </div>

                  <div className='solid-hsl'>
                     <p>HSL: {hsl}</p>
                     <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                        alt='copy'
                        onClick={() => {
                           copyText(hsl);
                           makeToast(`${hsl} copied :)`);
                        }}
                     />
                  </div>

                  <div className='solid-cmyk'>
                     <p>CMYK: {cmyk}</p>
                     <img
                        src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                        alt='copy'
                        onClick={() => {
                           copyText(cmyk);
                           makeToast(`${cmyk} copied :)`);
                        }}
                     />
                  </div>
               </div>

               <div className='seekbars'>
                  <ul>
                     <li>Red</li>
                     <li>Green</li>
                     <li>Blue</li>
                     <li>Alpha</li>
                  </ul>
                  <ul>
                     <li>
                        <input
                           id='solid_red_seekbar'
                           className='solid_red_seekbar'
                           type='range'
                           min='0'
                           max='255'
                           value={red}
                           onInput={(e) => {
                              updateSlider('solid_red_seekbar', data.slider.red);
                              props.changeSolid(e.target.value, green, blue, alpha);
                           }}
                        />
                     </li>
                     <li>
                        <input
                           id='solid_green_seekbar'
                           className='solid_green_seekbar'
                           type='range'
                           min='0'
                           max='255'
                           value={green}
                           onInput={(e) => {
                              updateSlider('solid_green_seekbar', data.slider.green);
                              props.changeSolid(red, e.target.value, blue, alpha);
                           }}
                        />
                     </li>
                     <li>
                        <input
                           id='solid_blue_seekbar'
                           className='solid_blue_seekbar'
                           type='range'
                           min='0'
                           max='255'
                           value={blue}
                           onInput={(e) => {
                              updateSlider('solid_blue_seekbar', data.slider.blue);
                              props.changeSolid(red, green, e.target.value, alpha);
                           }}
                        />
                     </li>
                     <li>
                        <input
                           id='solid_alpha_seekbar'
                           className='solid_alpha_seekbar'
                           type='range'
                           min='0'
                           max='255'
                           value={alpha}
                           onInput={(e) => {
                              updateSlider('solid_alpha_seekbar', data.slider.alpha);
                              props.changeSolid(red, green, blue, e.target.value);
                           }}
                        />
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Solid;
