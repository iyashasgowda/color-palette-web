import React, {memo} from 'react';

import SolGrad from './SolGrad';
import Extraction from './Extraction';
import Harmony from './Harmony';
import Preset from './Preset';

const Saved = (props) => {
   return (
      <div className='saved-color'>
         <SolGrad darkMode={props.darkMode} solgrad={props.solgrad} changeSolGrad={props.changeSolGrad}></SolGrad>
         <Extraction darkMode={props.darkMode} extraction={props.extraction} changeExtraction={props.changeExtraction}></Extraction>
         <Harmony darkMode={props.darkMode} harmony={props.harmony} changeHarmony={props.changeHarmony}></Harmony>
         <Preset darkMode={props.darkMode} preset={props.preset} changePreset={props.changePreset}></Preset>
      </div>
   );
};

export default memo(Saved);
