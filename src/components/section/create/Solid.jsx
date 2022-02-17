import React, { useState, useEffect } from 'react';
import Modal from './CreateModal';

import data from '../../../utils/data.json';
import { add } from '../../../utils/storage';
import { copyText, makeToast, hex2rgbArray, rgb2hex, rgba2hexa, rgb2hsv_ui, rgb2cmyk, rgb2hsl, updateSlider, validateColor } from '../../../utils/utils';

const Solid = (props) => {
   const [red, green, blue, alpha, checkbox] = [props.solid.red, props.solid.green, props.solid.blue, props.solid.alpha, props.solid.checkbox];
   const solid_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/solid.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/solid.svg`;
   const [hex, rgb, hexa, rgba, hsv, hsl, cmyk] = [rgb2hex(red, green, blue), `${red}, ${green}, ${blue}`, rgba2hexa(red, green, blue, alpha), `${red}, ${green}, ${blue}, ${alpha}`, rgb2hsv_ui(red, green, blue), rgb2hsl(red, green, blue), rgb2cmyk(red, green, blue)];

   const [modal, setModal] = useState({ hex: false, rgba: false });
   const handleModalClose = () => setModal({ hex: false, rgba: false });

   const handleColorInput = (color, hex) => {
      const user_input = validateColor(color, hex, checkbox);

      if (user_input != null) {
         setModal({ hex: false, rgba: false });
         checkbox ? props.changeSolid(user_input[0], user_input[1], user_input[2], user_input[3], checkbox) : props.changeSolid(user_input[0], user_input[1], user_input[2], alpha, checkbox);
         makeToast(`${color} applied :)`);
      }
   };

   useEffect(() => {
      updateSlider('solid_alpha_seekbar', data.slider.alpha);
      updateSlider('solid_red_seekbar', data.slider.red);
      updateSlider('solid_green_seekbar', data.slider.green);
      updateSlider('solid_blue_seekbar', data.slider.blue);
   });

   return (
      <div className='solid-section'>
         {modal.hex ? (
            <Modal darkMode={props.darkMode} is_hex={true} is_alpha={checkbox} from={'solid'} closeModal={handleModalClose} inputColor={handleColorInput} />
         ) : modal.rgba ? (
            <Modal darkMode={props.darkMode} is_hex={false} is_alpha={checkbox} from={'solid'} closeModal={handleModalClose} inputColor={handleColorInput} />
         ) : (
            <></>
         )}

         <div className='solid-header'>
            <div className='solid-header-title'>
               <img src={solid_icon} alt='solid'></img>
               <p>Create solid</p>
            </div>

            <div className='solid-alpha-control'>
               <p>Alpha</p>
               <input type='checkbox' className='toggle-checkbox' id='solid-alpha-checkbox' checked={checkbox} onChange={() => props.changeSolid(red, green, blue, 255, !checkbox)} />
            </div>
         </div>

         <div className='solid-body'>
            <div
               className='solid-color'
               style={{ backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha / 255} )` }}
               onDoubleClick={() => {
                  const solid = {
                     key: hex,
                     hex: hex,
                     rgb: hex2rgbArray(hex),
                     timestamp: new Date(),
                  };

                  add('solid', solid, (result) => {
                     result.onsuccess = () => makeToast(`${hex} - ${rgb} saved :)`);
                     result.onerror = () => makeToast('Color already exist!');
                  });
               }}
            />
            <div className='solid-control'>
               <div className='solid-attributes'>
                  <div className='solid-hex'>
                     <p>HEX: {checkbox ? hexa : hex}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' onClick={() => setModal({ hex: true })} />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(`${checkbox ? hexa : hex}`);
                              makeToast(`${checkbox ? hexa : hex} copied :)`);
                           }}
                        />
                     </div>
                  </div>

                  <div className='solid-rgb'>
                     <p>{checkbox ? `RGBA: ${rgba}` : `RGB: ${rgb}`}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' onClick={() => setModal({ rgba: true })} />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(`${checkbox ? rgba : rgb}`);
                              makeToast(`${checkbox ? rgba : rgb} copied :)`);
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
                     <li className={!checkbox ? `disabled` : ``}>Alpha</li>
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
                              props.changeSolid(e.target.value, green, blue, alpha, checkbox);
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
                              props.changeSolid(red, e.target.value, blue, alpha, checkbox);
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
                              props.changeSolid(red, green, e.target.value, alpha, checkbox);
                           }}
                        />
                     </li>
                     <li>
                        <input
                           id='solid_alpha_seekbar'
                           className={checkbox ? `solid_alpha_seekbar` : `solid_alpha_seekbar disabled`}
                           type='range'
                           min='0'
                           max='255'
                           value={alpha}
                           disabled={!checkbox}
                           onInput={(e) => {
                              updateSlider('solid_alpha_seekbar', data.slider.alpha);
                              props.changeSolid(red, green, blue, e.target.value, checkbox);
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
