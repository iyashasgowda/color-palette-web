import React, { useState } from 'react';
import Colors from './Colors';
import Shades from './Shades';

const Frame = () => {
   const [activeColor, setActiveColor] = useState(1);
   const handleColorChange = (id) => setActiveColor(id);

   return (
      <div className='frame'>
         <Shades activeColor={activeColor} />
         <Colors activeColor={activeColor} changeColor={handleColorChange} />
      </div>
   );
};

export default Frame;
