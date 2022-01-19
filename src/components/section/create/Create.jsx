import React from 'react';
import Solid from './Solid';
import Gradient from './Gradient';

const Create = (props) => {
   return (
      <div className='create-color'>
         <Solid darkMode={props.darkMode} />
         <Gradient darkMode={props.darkMode} />
      </div>
   );
};

export default Create;
