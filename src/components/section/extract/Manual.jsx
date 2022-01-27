import React from 'react';

const Manual = (props) => {
   return (
      <div className='manual-section'>
         <div className='manual-header'>
            <div className='manual-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/manual.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/manual.svg`} alt='swatch' />
               <p>Manually select colors</p>
            </div>
         </div>
      </div>
   );
};

export default Manual;
