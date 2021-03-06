import React from 'react';
import Swatch from './Swatch';
import Palette from './Palette';
import Manual from './Manual';

const Extract = (props) => {
   return (
      <div className='extract-color'>
         <Swatch darkMode={props.darkMode} swatch={props.swatch} changeSwatch={props.changeSwatch}></Swatch>
         <Palette darkMode={props.darkMode} palette={props.palette} changePalette={props.changePalette} extractionCount={props.extractionCount}></Palette>
         <Manual darkMode={props.darkMode} manual={props.manual} changeManual={props.changeManual}></Manual>
      </div>
   );
};

export default Extract;
