import React from 'react';
import Item from './Item';

const Swatches = (props) => {
   return (
      <div className='swatch-section'>
         <div className='swatch-header'>
            <div className='swatch-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/swatch.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/swatch.svg`} alt='swatch' />
               <p>Extract swatch colors</p>
            </div>
         </div>

         <div className='swatch-body'>
            <div className='swatch-img-chooser' onClick={() => document.querySelector('#swatch-file-input').click()}>
               <input id='swatch-file-input' className='cosmetic-file-input' type='file' accept='image/*' onChange={(e) => props.changeSwatch(e)} />
               <div className='logo-info'>
                  <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo' />
                  <p>Choose Image</p>
               </div>
               <img id='selected-image' className='selected-image' src={props.swatch.path} alt='' />
            </div>

            <div className='extracted-swatches'>
               {props.swatch.swatches.map((item, index) => (
                  <Item key={index} name={item.name} rgb={item.rgb} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Swatches;
