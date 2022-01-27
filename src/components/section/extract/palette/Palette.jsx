import React from 'react';

const Palette = (props) => {
   return (
      <div className='palette-section'>
         <div className='palette-header'>
            <div className='palette-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/palette.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/palette.svg`} alt='swatch' />
               <p>Extract palette colors</p>
            </div>
         </div>
      </div>
   );
};

export default Palette;
