import React, { useEffect, useState } from 'react';
import Modal from './CreateModal';

import data from '../../../utils/data.json';
import { add } from '../../../utils/storage';
import { copyText, hex2rgbArray, makeToast, rgb2hex, rgba2hexa, updateSlider, validateColor } from '../../../utils/utils';

const Gradient = (props) => {
   const copy_icon = `${process.env.PUBLIC_URL}/assets/icons/copy.svg`;
   const edit_icon = `${process.env.PUBLIC_URL}/assets/icons/edit.svg`;
   const [top_red, top_green, top_blue, top_alpha, checkbox] = [props.gradient.top.red, props.gradient.top.green, props.gradient.top.blue, props.gradient.top.alpha, props.gradient.checkbox];
   const [bottom_red, bottom_green, bottom_blue, bottom_alpha] = [props.gradient.bottom.red, props.gradient.bottom.green, props.gradient.bottom.blue, props.gradient.bottom.alpha];
   const [top_hex, top_rgb, top_hex_alpha, top_rgba, bottom_hex, bottom_rgb, bottom_hex_alpha, bottom_rgba] = [
      rgb2hex(top_red, top_green, top_blue),
      `${top_red}, ${top_green}, ${top_blue}`,
      rgba2hexa(top_red, top_green, top_blue, top_alpha),
      `${top_red}, ${top_green}, ${top_blue}, ${top_alpha}`,
      rgb2hex(bottom_red, bottom_green, bottom_blue),
      `${bottom_red}, ${bottom_green}, ${bottom_blue}`,
      rgba2hexa(bottom_red, bottom_green, bottom_blue, bottom_alpha),
      `${bottom_red}, ${bottom_green}, ${bottom_blue}, ${bottom_alpha}`,
   ];

   const gradient = `linear-gradient(rgba(${top_red}, ${top_green}, ${top_blue}, ${top_alpha / 255} ), rgba(${bottom_red}, ${bottom_green}, ${bottom_blue}, ${bottom_alpha / 255} ))`;
   const gradient_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/gradient.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/gradient.svg`;

   const [color_index, setColorIndex] = useState(0);
   const [modal, setModal] = useState({ hex: false, rgba: false });
   const handleModalClose = () => setModal({ hex: false, rgba: false });

   const handleColorInput = (color, hex) => {
      const user_input = validateColor(color, hex, checkbox);

      if (user_input != null) {
         setModal({ hex: false, rgba: false });

         const [top_rgba, bottom_rgba] = [
            {
               red: color_index === 1 ? user_input[0] : top_red,
               green: color_index === 1 ? user_input[1] : top_green,
               blue: color_index === 1 ? user_input[2] : top_blue,
               alpha: checkbox ? (color_index === 1 ? user_input[3] : top_alpha) : top_alpha,
            },
            {
               red: color_index === 2 ? user_input[0] : bottom_red,
               green: color_index === 2 ? user_input[1] : bottom_green,
               blue: color_index === 2 ? user_input[2] : bottom_blue,
               alpha: checkbox ? (color_index === 2 ? user_input[3] : bottom_alpha) : bottom_alpha,
            },
         ];
         props.changeGradient({ ...props.gradient, top: top_rgba, bottom: bottom_rgba });
         makeToast(`${color} applied.`);
      }
   };

   useEffect(() => {
      updateSlider('gradient_top_red_seekbar', data.slider.red);
      updateSlider('gradient_top_green_seekbar', data.slider.green);
      updateSlider('gradient_top_blue_seekbar', data.slider.blue);
      updateSlider('gradient_top_alpha_seekbar', data.slider.alpha);

      updateSlider('gradient_bottom_red_seekbar', data.slider.red);
      updateSlider('gradient_bottom_green_seekbar', data.slider.green);
      updateSlider('gradient_bottom_blue_seekbar', data.slider.blue);
      updateSlider('gradient_bottom_alpha_seekbar', data.slider.alpha);
   });

   return (
      <div className='gradient-section'>
         {modal.hex ? (
            <Modal darkMode={props.darkMode} is_hex={true} is_alpha={checkbox} closeModal={handleModalClose} inputColor={handleColorInput} />
         ) : modal.rgba ? (
            <Modal darkMode={props.darkMode} is_hex={false} is_alpha={checkbox} closeModal={handleModalClose} inputColor={handleColorInput} />
         ) : (
            <></>
         )}

         <div className='gradient-header'>
            <div className='gradient-header-title'>
               <img src={gradient_icon} alt='gradient'></img>
               <p>Create gradient</p>
            </div>

            <div className='gradient-alpha-control'>
               <p>Alpha</p>
               <input type='checkbox' className='toggle-checkbox' id='gradient-alpha-checkbox' checked={checkbox} onChange={() => props.changeGradient({ ...props.gradient, checkbox: !checkbox })} />
            </div>
         </div>

         <div className='gradient-body'>
            <div
               className='gradient-color'
               style={{ background: gradient }}
               onDoubleClick={() => {
                  const gradient = {
                     key: `${top_hex}${bottom_hex}`,
                     a_hex: top_hex,
                     b_hex: bottom_hex,
                     a_rgb: hex2rgbArray(top_hex),
                     b_rgb: hex2rgbArray(bottom_hex),
                     timestamp: new Date(),
                  };

                  add('gradient', gradient, (result) => {
                     result.onsuccess = () => makeToast('Gradient saved.');
                     result.onerror = () => makeToast('Gradient already exist!');
                  });
               }}
            />
            <div className='gradient-control'>
               <div className='gradient-top'>
                  <div className='gradient-top-hex'>
                     <p>HEX: {checkbox ? top_hex_alpha : top_hex}</p>
                     <div>
                        <img
                           src={edit_icon}
                           alt='edit'
                           onClick={() => {
                              setModal({ ...modal, hex: true });
                              setColorIndex(1);
                           }}
                        />
                        <img src={copy_icon} alt='copy' onClick={() => copyText(`${checkbox ? top_hex_alpha : top_hex}`).then(() => makeToast(`${checkbox ? top_hex_alpha : top_hex} copied.`))} />
                     </div>
                  </div>

                  <div className='gradient-top-rgba'>
                     <p>{checkbox ? `RGBA: ${top_rgba}` : `RGB: ${top_rgb}`}</p>
                     <div>
                        <img
                           src={edit_icon}
                           alt='edit'
                           onClick={() => {
                              setModal({ ...modal, rgba: true });
                              setColorIndex(1);
                           }}
                        />
                        <img src={copy_icon} alt='copy' onClick={() => copyText(`${checkbox ? top_rgba : top_rgb}`).then(() => makeToast(`${checkbox ? top_rgba : top_rgb} copied.`))} />
                     </div>
                  </div>

                  <div className='gradient-top-sliders'>
                     <ul>
                        <li>Red</li>
                        <li>Green</li>
                        <li>Blue</li>
                        <li className={!checkbox ? `disabled` : ``}>Alpha</li>
                     </ul>
                     <ul>
                        <li>
                           <input
                              id='gradient_top_red_seekbar'
                              className='gradient_top_red_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={top_red}
                              onInput={(e) => {
                                 updateSlider('gradient_top_red_seekbar', data.slider.red);
                                 props.changeGradient({
                                    ...props.gradient,
                                    top: { ...props.gradient.top, red: e.target.value },
                                 });
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_top_green_seekbar'
                              className='gradient_top_green_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={top_green}
                              onInput={(e) => {
                                 updateSlider('gradient_top_green_seekbar', data.slider.green);
                                 props.changeGradient({
                                    ...props.gradient,
                                    top: { ...props.gradient.top, green: e.target.value },
                                 });
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_top_blue_seekbar'
                              className='gradient_top_blue_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={top_blue}
                              onInput={(e) => {
                                 updateSlider('gradient_top_blue_seekbar', data.slider.blue);
                                 props.changeGradient({
                                    ...props.gradient,
                                    top: { ...props.gradient.top, blue: e.target.value },
                                 });
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_top_alpha_seekbar'
                              className={checkbox ? `gradient_top_alpha_seekbar` : `gradient_top_alpha_seekbar disabled`}
                              type='range'
                              min='0'
                              max='255'
                              value={top_alpha}
                              disabled={!checkbox}
                              onInput={(e) => {
                                 updateSlider('gradient_top_alpha_seekbar', data.slider.alpha);
                                 props.changeGradient({
                                    ...props.gradient,
                                    top: { ...props.gradient.top, alpha: e.target.value },
                                 });
                              }}
                           />
                        </li>
                     </ul>
                  </div>
               </div>

               <div className='gradient-bottom'>
                  <div className='gradient-bottom-hex'>
                     <p>HEX: {checkbox ? bottom_hex_alpha : bottom_hex}</p>
                     <div>
                        <img
                           src={edit_icon}
                           alt='edit'
                           onClick={() => {
                              setModal({ ...modal, hex: true });
                              setColorIndex(2);
                           }}
                        />
                        <img src={copy_icon} alt='copy' onClick={() => copyText(`${checkbox ? bottom_hex_alpha : bottom_hex}`).then(() => makeToast(`${checkbox ? bottom_hex_alpha : bottom_hex} copied.`))} />
                     </div>
                  </div>

                  <div className='gradient-bottom-rgba'>
                     <p>{checkbox ? `RGBA: ${bottom_rgba}` : `RGB: ${bottom_rgb}`}</p>
                     <div>
                        <img
                           src={edit_icon}
                           alt='edit'
                           onClick={() => {
                              setModal({ ...modal, rgba: true });
                              setColorIndex(2);
                           }}
                        />
                        <img src={copy_icon} alt='copy' onClick={() => copyText(`${checkbox ? bottom_rgba : bottom_rgb}`).then(() => makeToast(`${checkbox ? bottom_rgba : bottom_rgb} copied.`))} />
                     </div>
                  </div>

                  <div className='gradient-bottom-sliders'>
                     <ul>
                        <li>Red</li>
                        <li>Green</li>
                        <li>Blue</li>
                        <li className={!checkbox ? `disabled` : ``}>Alpha</li>
                     </ul>
                     <ul>
                        <li>
                           <input
                              id='gradient_bottom_red_seekbar'
                              className='gradient_bottom_red_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={bottom_red}
                              onInput={(e) => {
                                 updateSlider('gradient_bottom_red_seekbar', data.slider.red);
                                 props.changeGradient({
                                    ...props.gradient,
                                    bottom: { ...props.gradient.bottom, red: e.target.value },
                                 });
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_bottom_green_seekbar'
                              className='gradient_bottom_green_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={bottom_green}
                              onInput={(e) => {
                                 updateSlider('gradient_bottom_green_seekbar', data.slider.green);
                                 props.changeGradient({
                                    ...props.gradient,
                                    bottom: { ...props.gradient.bottom, green: e.target.value },
                                 });
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_bottom_blue_seekbar'
                              className='gradient_bottom_blue_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={bottom_blue}
                              onInput={(e) => {
                                 updateSlider('gradient_bottom_blue_seekbar', data.slider.blue);
                                 props.changeGradient({
                                    ...props.gradient,
                                    bottom: { ...props.gradient.bottom, blue: e.target.value },
                                 });
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_bottom_alpha_seekbar'
                              className={checkbox ? `gradient_bottom_alpha_seekbar` : `gradient_bottom_alpha_seekbar disabled`}
                              type='range'
                              min='0'
                              max='255'
                              value={bottom_alpha}
                              disabled={!checkbox}
                              onInput={(e) => {
                                 updateSlider('gradient_bottom_alpha_seekbar', data.slider.alpha);
                                 props.changeGradient({
                                    ...props.gradient,
                                    bottom: { ...props.gradient.bottom, alpha: e.target.value },
                                 });
                              }}
                           />
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Gradient;
