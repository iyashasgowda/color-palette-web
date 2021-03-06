import React, { useEffect, useState } from 'react';

import { add } from '../../../utils/storage';
import { splitComplement } from '../../../utils/harmony';
import { copyText, makeToast, renderColorWheel, rgb2hex } from '../../../utils/utils';

const SplitComplement = (props) => {
   const split = splitComplement(props.split);
   const split_ico = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/split.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/split.svg`;
   const save_btn = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/save.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/save.svg`;
   const black_stop = props.split.checked;

   const [a_rgb, b_rgb, c_rgb] = [props.split, split.a, split.b];
   const [a_hex, b_hex, c_hex] = [rgb2hex(a_rgb.r, a_rgb.g, a_rgb.b), rgb2hex(b_rgb.r, b_rgb.g, b_rgb.b), rgb2hex(c_rgb.r, c_rgb.g, c_rgb.b)];

   const [isDragging, setIsDragging] = useState(false);
   const [isWheelRendered, setIsWheelRendered] = useState(false);

   useEffect(() => {
      const canvas = document.querySelector('.split-canvas');
      if (!isWheelRendered) if (renderColorWheel(canvas, canvas.width, black_stop ? 'black' : 'white')) setIsWheelRendered(true);
   }, [black_stop, isWheelRendered]);

   const handleMouseDown = () => setIsDragging(true);
   const handleMouseUp = () => setIsDragging(false);
   const handleMouseMove = (e) => {
      if (isDragging) {
         const data = e.target.getContext('2d').getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
         props.changeSplit({
            r: data.data[0],
            g: data.data[1],
            b: data.data[2],
            checked: black_stop,
         });

         // const dot = document.querySelector('.complement-dot');
         // dot.style.top = e.pageY + 'px';
         // dot.style.left = e.pageX + 'px';
      }
   };
   const handleClick = (e) => {
      setIsDragging(false);
      const data = e.target.getContext('2d').getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
      props.changeSplit({
         r: data.data[0],
         g: data.data[1],
         b: data.data[2],
         checked: black_stop,
      });

      // const dot = document.querySelector('.complement-dot');
      // dot.style.top = e.pageY + 'px';
      // dot.style.left = e.pageX + 'px';
   };

   return (
      <div className='split-container'>
         <div className='split-header'>
            <div className='split-header-title'>
               <img src={split_ico} alt='split_ico' />
               <p>Split Complement</p>
            </div>
         </div>

         <div className='split-body'>
            <div className='colors-container'>
               <div className='colors'>
                  <div
                     className='color-a'
                     style={{ backgroundColor: `rgb(${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b})` }}
                     onDoubleClick={() => {
                        const solid = {
                           key: a_hex,
                           hex: a_hex,
                           rgb: [a_rgb.r, a_rgb.g, a_rgb.b],
                           timestamp: new Date(),
                        };

                        add('solid', solid, (result) => {
                           result.onsuccess = () => makeToast(`${a_hex} - ${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b} saved :)`);
                           result.onerror = () => makeToast('Color already exist!');
                        });
                     }}
                  />
                  <div
                     className='color-b'
                     style={{ backgroundColor: `rgb(${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b})` }}
                     onDoubleClick={() => {
                        const solid = {
                           key: b_hex,
                           hex: b_hex,
                           rgb: [b_rgb.r, b_rgb.g, b_rgb.b],
                           timestamp: new Date(),
                        };

                        add('solid', solid, (result) => {
                           result.onsuccess = () => makeToast(`${b_hex} - ${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b} saved :)`);
                           result.onerror = () => makeToast('Color already exist!');
                        });
                     }}
                  />
                  <div
                     className='color-c'
                     style={{ backgroundColor: `rgb(${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b})` }}
                     onDoubleClick={() => {
                        const solid = {
                           key: c_hex,
                           hex: c_hex,
                           rgb: [c_rgb.r, c_rgb.g, c_rgb.b],
                           timestamp: new Date(),
                        };

                        add('solid', solid, (result) => {
                           result.onsuccess = () => makeToast(`${c_hex} - ${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b} saved :)`);
                           result.onerror = () => makeToast('Color already exist!');
                        });
                     }}
                  />
               </div>
               <div className='codes'>
                  <div className='code'>
                     <p onClick={() => copyText(a_hex).then(() => makeToast(`${a_hex} copied :)`))}>{a_hex}</p>
                     <p onClick={() => copyText(`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b}`).then(() => makeToast(`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b} copied :)`))}>{`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b}`}</p>
                  </div>
                  <div className='code'>
                     <p onClick={() => copyText(b_hex).then(() => makeToast(`${b_hex} copied :)`))}>{b_hex}</p>
                     <p onClick={() => copyText(`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b}`).then(() => makeToast(`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b} copied :)`))}>{`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b}`}</p>
                  </div>
                  <div className='code'>
                     <p onClick={() => copyText(c_hex).then(() => makeToast(`${c_hex} copied :)`))}>{c_hex}</p>
                     <p onClick={() => copyText(`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b}`).then(() => makeToast(`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b} copied :)`))}>{`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b}`}</p>
                  </div>
               </div>

               <div className='separator' />
               <p className='info'>
                  <b>Split complementary:</b> Primary color with two analogous colors in the color wheel. This combination has strong contrast as the complementary color.
               </p>

               <div className='invert-mode'>
                  <p>Invert color stop</p>
                  <input
                     type='checkbox'
                     className='toggle-checkbox'
                     id='solid-alpha-checkbox'
                     checked={black_stop}
                     onChange={() => {
                        props.changeSplit({
                           r: a_rgb.r,
                           g: a_rgb.g,
                           b: a_rgb.b,
                           checked: !black_stop,
                        });
                        setIsWheelRendered(false);
                     }}
                  />
                  <div
                     className='save-split'
                     onClick={() => {
                        const split = {
                           key: `${a_hex}${b_hex}${c_hex}`,
                           a_hex: a_hex,
                           b_hex: b_hex,
                           c_hex: c_hex,
                           a_rgb: [a_rgb.r, a_rgb.g, a_rgb.b],
                           b_rgb: [b_rgb.r, b_rgb.g, b_rgb.b],
                           c_rgb: [c_rgb.r, c_rgb.g, c_rgb.b],
                           timestamp: new Date(),
                        };

                        add('split', split, (result) => {
                           result.onsuccess = () => makeToast('Split saved :)');
                           result.onerror = () => makeToast('Split already exist!');
                        });
                     }}
                  >
                     <img src={save_btn} alt='save_btn' />
                  </div>
               </div>
            </div>

            <div className='color-wheel'>
               <canvas className='split-canvas' onMouseMove={(e) => handleMouseMove(e)} onMouseDown={(e) => handleMouseDown(e)} onMouseUp={(e) => handleMouseUp(e)} onClick={(e) => handleClick(e)}></canvas>
               {/* <img class='complement-dot' src={`${process.env.PUBLIC_URL}/assets/icons/dot.svg`} alt='dot' /> */}
            </div>
         </div>
      </div>
   );
};

export default SplitComplement;
