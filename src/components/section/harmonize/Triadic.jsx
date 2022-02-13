import React, { useState, useEffect } from 'react';

import { add } from '../../../utils/storage';
import { triadic as tri } from '../../../utils/harmony';
import { copyText, makeToast, renderColorWheel, rgb2hex } from '../../../utils/utils';

const Triadic = (props) => {
   const triadic = tri(props.triadic);
   const black_stop = props.triadic.checked;

   const [a_rgb, b_rgb, c_rgb] = [props.triadic, triadic.a, triadic.b];
   const [a_hex, b_hex, c_hex] = [rgb2hex(a_rgb.r, a_rgb.g, a_rgb.b), rgb2hex(b_rgb.r, b_rgb.g, b_rgb.b), rgb2hex(c_rgb.r, c_rgb.g, c_rgb.b)];

   const [isDragging, setIsDragging] = useState(false);
   const [isWheelRendered, setIsWheelRendered] = useState(false);

   useEffect(() => {
      const canvas = document.querySelector('.triadic-canvas');
      if (!isWheelRendered) if (renderColorWheel(canvas, canvas.width, black_stop ? 'black' : 'white')) setIsWheelRendered(true);
   }, [black_stop, isWheelRendered]);

   const handleMouseDown = () => setIsDragging(true);
   const handleMouseUp = () => setIsDragging(false);
   const handleMouseMove = (e) => {
      if (isDragging) {
         const data = e.target.getContext('2d').getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
         props.changeTriadic({
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
      props.changeTriadic({
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
      <div className='triadic-container'>
         <div className='triadic-header'>
            <div className='triadic-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/triadic.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/triadic.svg`} alt='triadic' />
               <p>Triadic</p>
            </div>
         </div>

         <div className='triadic-body'>
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
                  <b>Triadic:</b> Three colors are equidistant from one another and evenly spaced on the color wheel. This combination creates bold, vibrant color palettes.
               </p>

               <div className='invert-mode'>
                  <p>Invert color stop</p>
                  <input
                     type='checkbox'
                     className='toggle-checkbox'
                     id='solid-alpha-checkbox'
                     checked={black_stop}
                     onChange={() => {
                        props.changeTriadic({
                           r: a_rgb.r,
                           g: a_rgb.g,
                           b: a_rgb.b,
                           checked: !black_stop,
                        });
                        setIsWheelRendered(false);
                     }}
                  />
                  <div
                     className='save-triadic'
                     onClick={() => {
                        const triadic = {
                           key: `${a_hex}${b_hex}${c_hex}`,
                           a_hex: a_hex,
                           b_hex: b_hex,
                           c_hex: c_hex,
                           a_rgb: [a_rgb.r, a_rgb.g, a_rgb.b],
                           b_rgb: [b_rgb.r, b_rgb.g, b_rgb.b],
                           c_rgb: [c_rgb.r, c_rgb.g, c_rgb.b],
                           timestamp: new Date(),
                        };

                        add('triadic', triadic, (result) => {
                           result.onsuccess = () => makeToast('Triadic saved :)');
                           result.onerror = () => makeToast('Triadic already exist!');
                        });
                     }}
                  >
                     <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/save.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/save.svg`} alt='save' />
                  </div>
               </div>
            </div>

            <div className='color-wheel'>
               <canvas className='triadic-canvas' onMouseMove={(e) => handleMouseMove(e)} onMouseDown={(e) => handleMouseDown(e)} onMouseUp={(e) => handleMouseUp(e)} onClick={(e) => handleClick(e)}></canvas>
               {/* <img class='complement-dot' src={`${process.env.PUBLIC_URL}/assets/icons/dot.svg`} alt='dot' /> */}
            </div>
         </div>
      </div>
   );
};

export default Triadic;
