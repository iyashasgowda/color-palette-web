import React from 'react';
import Swatch from './swatch/Swatch';
import Palette from './palette/Palette';
import Manual from './Manual';

const Extract = (props) => {
   return (
      <div className='extract-color'>
         <Swatch darkMode={props.darkMode} swatch={props.swatch} changeSwatch={props.changeSwatch}></Swatch>
         <Palette darkMode={props.darkMode} palette={props.palette} changePalette={props.changePalette}></Palette>
         <Manual darkMode={props.darkMode}></Manual>
      </div>
   );
};

export default Extract;
