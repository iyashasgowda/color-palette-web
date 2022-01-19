import React from 'react';

const Gradient = (props) => {
   let gradient_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/gradient.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/gradient.svg`;

   return (
      <div className='gradient-section'>
         <div className='gradient-header'>
            <img src={gradient_icon} alt='gradient'></img>
            <p>Create gradient color</p>
         </div>
      </div>
   );
};

export default Gradient;
