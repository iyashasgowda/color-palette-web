import React, { useEffect } from 'react';
import { copyText, makeToast, rgba2hex, updateSlider } from '../../../utils/utils';

import data from '../../../utils/data.json';

const Gradient = (props) => {
   const [top_red, top_green, top_blue, top_alpha] = [props.gradient.top.red, props.gradient.top.green, props.gradient.top.blue, props.gradient.top.alpha];
   const [bottom_red, bottom_green, bottom_blue, bottom_alpha] = [props.gradient.bottom.red, props.gradient.bottom.green, props.gradient.bottom.blue, props.gradient.bottom.alpha];
   const [top_hex, top_rgba, bottom_hex, bottom_rgba] = [rgba2hex(top_red, top_green, top_blue, top_alpha), `${top_red}, ${top_green}, ${top_blue}, ${top_alpha}`, rgba2hex(bottom_red, bottom_green, bottom_blue, bottom_alpha), `${bottom_red}, ${bottom_green}, ${bottom_blue}, ${bottom_alpha}`];

   const gradient = `linear-gradient(rgba(${top_red}, ${top_green}, ${top_blue}, ${top_alpha / 255} ), rgba(${bottom_red}, ${bottom_green}, ${bottom_blue}, ${bottom_alpha / 255} ))`;
   let gradient_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/gradient.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/gradient.svg`;

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
         <div className='gradient-header'>
            <img src={gradient_icon} alt='gradient'></img>
            <p>Create gradient color</p>
         </div>

         <div className='gradient-body'>
            <div className='gradient-color' style={{ background: gradient }} />
            <div className='gradient-control'>
               <div className='gradient-top'>
                  <div className='gradient-top-hex'>
                     <p>HEX: {top_hex}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(top_hex);
                              makeToast(`${top_hex} copied :)`);
                           }}
                        />
                     </div>
                  </div>

                  <div className='gradient-top-rgba'>
                     <p>RGBA: {top_rgba}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(top_rgba);
                              makeToast(`${top_rgba} copied :)`);
                           }}
                        />
                     </div>
                  </div>

                  <div className='gradient-top-sliders'>
                     <ul>
                        <li>Red</li>
                        <li>Green</li>
                        <li>Blue</li>
                        <li>Alpha</li>
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
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: e.target.value,
                                       green: top_green,
                                       blue: top_blue,
                                       alpha: top_alpha,
                                    },
                                    {
                                       red: bottom_red,
                                       green: bottom_green,
                                       blue: bottom_blue,
                                       alpha: bottom_alpha,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
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
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: top_red,
                                       green: e.target.value,
                                       blue: top_blue,
                                       alpha: top_alpha,
                                    },
                                    {
                                       red: bottom_red,
                                       green: bottom_green,
                                       blue: bottom_blue,
                                       alpha: bottom_alpha,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
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
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: top_red,
                                       green: top_green,
                                       blue: e.target.value,
                                       alpha: top_alpha,
                                    },
                                    {
                                       red: bottom_red,
                                       green: bottom_green,
                                       blue: bottom_blue,
                                       alpha: bottom_alpha,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_top_alpha_seekbar'
                              className='gradient_top_alpha_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={top_alpha}
                              onInput={(e) => {
                                 updateSlider('gradient_top_alpha_seekbar', data.slider.alpha);
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: top_red,
                                       green: top_green,
                                       blue: top_blue,
                                       alpha: e.target.value,
                                    },
                                    {
                                       red: bottom_red,
                                       green: bottom_green,
                                       blue: bottom_blue,
                                       alpha: bottom_alpha,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
                              }}
                           />
                        </li>
                     </ul>
                  </div>
               </div>

               <div className='gradient-bottom'>
                  <div className='gradient-bottom-hex'>
                     <p>HEX: {bottom_hex}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(bottom_hex);
                              makeToast(`${bottom_hex} copied :)`);
                           }}
                        />
                     </div>
                  </div>

                  <div className='gradient-bottom-rgba'>
                     <p>RGBA: {bottom_rgba}</p>
                     <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/icons/edit.svg`} alt='edit' />
                        <img
                           src={`${process.env.PUBLIC_URL}/assets/icons/copy.svg`}
                           alt='copy'
                           onClick={() => {
                              copyText(bottom_rgba);
                              makeToast(`${bottom_rgba} copied :)`);
                           }}
                        />
                     </div>
                  </div>

                  <div className='gradient-bottom-sliders'>
                     <ul>
                        <li>Red</li>
                        <li>Green</li>
                        <li>Blue</li>
                        <li>Alpha</li>
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
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: top_red,
                                       green: top_green,
                                       blue: top_blue,
                                       alpha: top_alpha,
                                    },
                                    {
                                       red: e.target.value,
                                       green: bottom_green,
                                       blue: bottom_blue,
                                       alpha: bottom_alpha,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
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
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: top_red,
                                       green: top_green,
                                       blue: top_blue,
                                       alpha: top_alpha,
                                    },
                                    {
                                       red: bottom_red,
                                       green: e.target.value,
                                       blue: bottom_blue,
                                       alpha: bottom_alpha,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
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
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: top_red,
                                       green: top_green,
                                       blue: top_blue,
                                       alpha: top_alpha,
                                    },
                                    {
                                       red: bottom_red,
                                       green: bottom_green,
                                       blue: e.target.value,
                                       alpha: bottom_alpha,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
                              }}
                           />
                        </li>
                        <li>
                           <input
                              id='gradient_bottom_alpha_seekbar'
                              className='gradient_bottom_alpha_seekbar'
                              type='range'
                              min='0'
                              max='255'
                              value={bottom_alpha}
                              onInput={(e) => {
                                 updateSlider('gradient_bottom_alpha_seekbar', data.slider.alpha);
                                 const [top_rgba, bottom_rgba] = [
                                    {
                                       red: top_red,
                                       green: top_green,
                                       blue: top_blue,
                                       alpha: top_alpha,
                                    },
                                    {
                                       red: bottom_red,
                                       green: bottom_green,
                                       blue: bottom_blue,
                                       alpha: e.target.value,
                                    },
                                 ];
                                 props.changeGradient(top_rgba, bottom_rgba);
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
