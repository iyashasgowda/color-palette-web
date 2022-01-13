import React from 'react';
import Colors from './Colors';
import Shades from './Shades';

const Frame = () => {
   return (
      <div className='frame'>
         <Shades />
         <Colors />
      </div>
   );
};

export default Frame;
