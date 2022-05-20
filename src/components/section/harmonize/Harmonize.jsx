import React, {memo} from 'react';
import Complement from './Complement';
import SplitComplement from './SplitComplement';
import Analogous from './Analogous';
import Triadic from './Triadic';
import Tetradic from './Tetradic';

const Harmonize = (props) => {
   return (
      <div className='harmonize-color'>
         <Complement darkMode={props.darkMode} complement={props.complement} changeComplement={props.changeComplement}></Complement>
         <SplitComplement darkMode={props.darkMode} split={props.split} changeSplit={props.changeSplit}></SplitComplement>
         <Analogous darkMode={props.darkMode} analogous={props.analogous} changeAnalogous={props.changeAnalogous}></Analogous>
         <Triadic darkMode={props.darkMode} triadic={props.triadic} changeTriadic={props.changeTriadic}></Triadic>
         <Tetradic darkMode={props.darkMode} tetradic={props.tetradic} changeTetradic={props.changeTetradic}></Tetradic>
      </div>
   );
};

export default memo(Harmonize);
