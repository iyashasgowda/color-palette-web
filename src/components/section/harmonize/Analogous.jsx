import React, { useState, useEffect } from 'react';

import { analogous as analog } from '../../../utils/harmony';
import { copyText, makeToast, renderColorWheel, rgb2hex } from '../../../utils/utils';

const Analogous = (props) => {
   const analogous = analog(props.analogous);
   const black_stop = props.analogous.checked;

   const [a_rgb, b_rgb, c_rgb] = [props.analogous, analogous.a, analogous.b];
   const [a_hex, b_hex, c_hex] = [rgb2hex(a_rgb.r, a_rgb.g, a_rgb.b), rgb2hex(b_rgb.r, b_rgb.g, b_rgb.b), rgb2hex(c_rgb.r, c_rgb.g, c_rgb.b)];

   const [isDragging, setIsDragging] = useState(false);
   const [isWheelRendered, setIsWheelRendered] = useState(false);

   useEffect(() => {
      const canvas = document.querySelector('.analogous-canvas');
      if (!isWheelRendered) if (renderColorWheel(canvas, canvas.width, black_stop ? 'black' : 'white')) setIsWheelRendered(true);
   });

   const handleMouseDown = () => setIsDragging(true);
   const handleMouseUp = () => setIsDragging(false);
   const handleMouseMove = (e) => {
      if (isDragging) {
         const data = e.target.getContext('2d').getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
         props.changeAnalogous({
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
      props.changeAnalogous({
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
      <div className='analogous-container'>
         <div className='analogous-header'>
            <div className='analogous-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/analogous.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/analogous.svg`} alt='analogous' />
               <p>Analogous</p>
            </div>
         </div>

         <div className='analogous-body'>
            <div className='colors-container'>
               <div className='colors'>
                  <div className='color-a' style={{ backgroundColor: `rgb(${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b})` }} />
                  <div className='color-b' style={{ backgroundColor: `rgb(${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b})` }} />
                  <div className='color-c' style={{ backgroundColor: `rgb(${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b})` }} />
               </div>
               <div className='codes'>
                  <div className='code'>
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
                  <div className='code'>
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
                  <div className='code'>
                     <p
                        onClick={() => {
                           copyText(c_hex);
                           makeToast(`${c_hex} copied :)`);
                        }}
                     >
                        {c_hex}
                     </p>
                     <p
                        onClick={() => {
                           copyText(`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b}`);
                           makeToast(`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b} copied :)`);
                        }}
                     >{`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b}`}</p>
                  </div>
               </div>

               <div className='separator' />
               <p className='info'>
                  <b>Analogous:</b> Three colors are side by side to each other on the color wheel. this color combination is versatile but can be overwhelming.
               </p>

               <div className='invert-mode'>
                  <p>Invert color stop</p>
                  <input
                     type='checkbox'
                     className='toggle-checkbox'
                     id='solid-alpha-checkbox'
                     checked={black_stop}
                     onChange={() => {
                        props.changeAnalogous({
                           r: a_rgb.r,
                           g: a_rgb.g,
                           b: a_rgb.b,
                           checked: !black_stop,
                        });
                        setIsWheelRendered(false);
                     }}
                  />
               </div>
            </div>

            <div className='color-wheel'>
               <canvas className='analogous-canvas' onMouseMove={(e) => handleMouseMove(e)} onMouseDown={(e) => handleMouseDown(e)} onMouseUp={(e) => handleMouseUp(e)} onClick={(e) => handleClick(e)}></canvas>
               {/* <img class='complement-dot' src={`${process.env.PUBLIC_URL}/assets/icons/dot.svg`} alt='dot' /> */}
            </div>
         </div>
      </div>
   );
};

export default Analogous;
