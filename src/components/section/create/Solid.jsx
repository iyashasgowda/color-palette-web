import React, { useState, useEffect } from 'react';
import data from '../../../utils/data.json';
import '../../../css/slider.css';
import { rgba2hex, rgb2hsv, updateSlider } from '../../../utils/utils';

const Solid = (props) => {
   const [solid_alpha, setAlpha] = useState(255);
   const [solid_red, setRed] = useState(220);
   const [solid_green, setGreen] = useState(40);
   const [solid_blue, setBlue] = useState(80);

   const solid_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/solid.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/solid.svg`;

   useEffect(() => {
      updateSlider('solid_alpha_seekbar', data.slider.alpha);
      updateSlider('solid_red_seekbar', data.slider.red);
      updateSlider('solid_green_seekbar', data.slider.green);
      updateSlider('solid_blue_seekbar', data.slider.blue);
   });

   const updateSolid = () => {};

   return (
      <div className='solid-section'>
         <div className='solid-header'>
            <img src={solid_icon} alt='solid'></img>
            <p>Create solid color</p>
         </div>

         <div className='solid-body'>
            <div className='solid-color' style={{ backgroundColor: `rgba(${solid_red}, ${solid_green}, ${solid_blue}, ${solid_alpha / 255} )` }} />
            <div className='solid-control'>
               <div className='solid-attributes'>
                  <div className='solid-hex'>
                     <p>HEX: {rgba2hex(solid_red, solid_green, solid_blue, solid_alpha)}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`} alt='copy' />
                     </div>
                  </div>

                  <div className='solid-rgb'>
                     <p>RGBA: {`${solid_red}, ${solid_green}, ${solid_blue}, ${solid_alpha}`}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`} alt='copy' />
                     </div>
                  </div>

                  <div className='solid-hsv'>
                     <p>HSV: {rgb2hsv(solid_red, solid_green, solid_blue)}</p>
                     <img src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`} alt='copy' />
                  </div>

                  <div className='solid-hsl'>
                     <p>HSL: 888°, 888%, 888%</p>
                     <img src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`} alt='copy' />
                  </div>

                  <div className='solid-cmyk'>
                     <p>CMYK: 888%, 888%, 888%, 888%</p>
                     <img src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`} alt='copy' />
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
                           value={solid_red}
                           onInput={(e) => {
                              updateSlider('solid_red_seekbar', data.slider.red);
                              setRed(e.target.value);
                              updateSolid();
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
                           value={solid_green}
                           onInput={(e) => {
                              updateSlider('solid_green_seekbar', data.slider.green);
                              setGreen(e.target.value);
                              updateSolid();
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
                           value={solid_blue}
                           onInput={(e) => {
                              updateSlider('solid_blue_seekbar', data.slider.blue);
                              setBlue(e.target.value);
                              updateSolid();
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
                           value={solid_alpha}
                           onInput={(e) => {
                              updateSlider('solid_alpha_seekbar', data.slider.alpha);
                              setAlpha(e.target.value);
                              updateSolid();
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
