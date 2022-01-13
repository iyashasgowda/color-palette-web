import React from 'react';
import data from '../utils/data.json';
import Color from './Color';

const Colors = () => {
   return (
      <div className='color-holder'>
         {data.material_colors.map((item, index) => (
            <Color key={index} item={item} />
         ))}
      </div>
   );
};

export default Colors;
