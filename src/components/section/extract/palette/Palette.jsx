import React from 'react';

import Item from '../palette/Item';

const Palette = (props) => {
   return (
      <div className='palette-section'>
         <div className='palette-header'>
            <div className='palette-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/palette.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/palette.svg`} alt='swatch' />
               <p>Extract palette colors</p>
            </div>
         </div>

         <div className='palette-body'>
            <div className='palette-img-chooser' onClick={() => document.querySelector('#palette-file-input').click()}>
               <input id='palette-file-input' className='cosmetic-file-input' type='file' accept='image/*' onChange={(e) => props.changePalette(e)} />
               <div className='logo-info'>
                  <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo' />
                  <p>Choose Image</p>
               </div>
               <img id='selected-image' className='selected-image' src={props.palette.path} alt='' />
            </div>

            <div className='extracted-palette'>{props.palette.palette.swatches !== undefined ? props.palette.palette.swatches.map((item, index) => <Item key={index} rgb={item.getRGB()} />) : <></>}</div>
         </div>
      </div>
   );
};

export default Palette;
