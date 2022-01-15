import React from 'react';
import Colors from './color_option/Colors';
import Shades from './color_shade/Shades';

const MaterialColor = ({ activeColor, changeColor }) => {
   return (
      <div className='material-color'>
         <Shades activeColor={activeColor} />
         <Colors activeColor={activeColor} changeColor={changeColor} />
      </div>
   );
};

export default MaterialColor;
