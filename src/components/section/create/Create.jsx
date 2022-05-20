import React, {memo} from 'react';
import Solid from './Solid';
import Gradient from './Gradient';

const Create = (props) => {
   return (
      <div className='create-color'>
         <Solid darkMode={props.darkMode} solid={props.solid} changeSolid={props.changeSolid} />
         <Gradient darkMode={props.darkMode} gradient={props.gradient} changeGradient={props.changeGradient} />
      </div>
   );
};

export default memo(Create);
