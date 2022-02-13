import React, { useState, useEffect } from 'react';

import { add } from '../../../utils/storage';
import { complement } from '../../../utils/harmony';
import { copyText, makeToast, renderColorWheel, rgb2hex } from '../../../utils/utils';

const Complement = (props) => {
   const black_stop = props.complement.checked;

   const [a_rgb, b_rgb] = [props.complement, complement(props.complement)];
   const [a_hex, b_hex] = [rgb2hex(a_rgb.r, a_rgb.g, a_rgb.b), rgb2hex(b_rgb.r, b_rgb.g, b_rgb.b)];

   const [isDragging, setIsDragging] = useState(false);
   const [isWheelRendered, setIsWheelRendered] = useState(false);

   useEffect(() => {
      const canvas = document.querySelector('.complement-canvas');
      if (!isWheelRendered) if (renderColorWheel(canvas, canvas.width, black_stop ? 'black' : 'white')) setIsWheelRendered(true);
   }, [black_stop, isWheelRendered]);

   const handleMouseDown = () => setIsDragging(true);
   const handleMouseUp = () => setIsDragging(false);
   const handleMouseMove = (e) => {
      if (isDragging) {
         const data = e.target.getContext('2d').getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
         props.changeComplement({
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
      props.changeComplement({
         r: data.data[0],
         g: data.data[1],
         b: data.data[2],
         checked: black_stop,
      });

      // const dot = document.querySelector('.complement-dot');
      // dot.style.top = e.pageY + 'px';
      // dot.style.left = e.pageX + 'px';
   };

   //document.addEventListener('mouseup', () => setIsDragging(false));

   return (
      <div className='complement-container'>
         <div className='complement-header'>
            <div className='complement-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/complement.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/complement.svg`} alt='complement' />
               <p>Complement</p>
            </div>
         </div>

         <div className='complement-body'>
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
               </div>
               <div className='codes'>
                  <div>
                     <p
                        onClick={() => {
                           copyText(a_hex);
                           makeToast(`${a_hex} copied :)`);
                        }}
                     >
                        {a_hex}
                     </p>
                     <p
                        onClick={() => {
                           copyText(`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b}`);
                           makeToast(`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b} copied :)`);
                        }}
                     >{`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b}`}</p>
                  </div>
                  <div>
                     <p
                        onClick={() => {
                           copyText(b_hex);
                           makeToast(`${b_hex} copied :)`);
                        }}
                     >
                        {b_hex}
                     </p>
                     <p
                        onClick={() => {
                           copyText(`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b}`);
                           makeToast(`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b} copied :)`);
                        }}
                     >{`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b}`}</p>
                  </div>
               </div>

               <div className='separator' />
               <p className='info'>
                  <b>Complementary:</b> Two colors that are on opposite sides of the color wheel. This combination has extremely high contrast and is termed as loud.
               </p>

               <div className='invert-mode'>
                  <p>Invert color stop</p>
                  <input
                     type='checkbox'
                     className='toggle-checkbox'
                     id='solid-alpha-checkbox'
                     checked={black_stop}
                     onChange={() => {
                        props.changeComplement({
                           r: a_rgb.r,
                           g: a_rgb.g,
                           b: a_rgb.b,
                           checked: !black_stop,
                        });
                        setIsWheelRendered(false);
                     }}
                  />
                  <div
                     className='save-complement'
                     onClick={() => {
                        const complement = {
                           key: `${a_hex}${b_hex}`,
                           a_hex: a_hex,
                           b_hex: b_hex,
                           a_rgb: [a_rgb.r, a_rgb.g, a_rgb.b],
                           b_rgb: [b_rgb.r, b_rgb.g, b_rgb.b],
                           timestamp: new Date(),
                        };

                        add('complement', complement, (result) => {
                           result.onsuccess = () => makeToast('Complement saved :)');
                           result.onerror = () => makeToast('Complement already exist!');
                        });
                     }}
                  >
                     <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/save.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/save.svg`} alt='save' />
                  </div>
               </div>
            </div>

            <div className='color-wheel'>
               <canvas className='complement-canvas' onMouseMove={(e) => handleMouseMove(e)} onMouseDown={(e) => handleMouseDown(e)} onMouseUp={(e) => handleMouseUp(e)} onClick={(e) => handleClick(e)}></canvas>
               {/* <img class='complement-dot' src={`${process.env.PUBLIC_URL}/assets/icons/dot.svg`} alt='dot' /> */}
            </div>
         </div>
      </div>
   );
};

export default Complement;
