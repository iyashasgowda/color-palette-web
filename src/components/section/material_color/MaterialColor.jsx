import React from 'react';
import Colors from './color_option/Colors';
import Shades from './color_shade/Shades';

const MaterialColor = (props) => {
   return (
      <div className='material-color'>
         <Shades activeColor={props.activeColor} darkMode={props.darkMode} />
         <Colors activeColor={props.activeColor} changeColor={props.changeColor} />
      </div>
   );
};

export default MaterialColor;
