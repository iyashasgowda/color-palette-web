import React from 'react';
import Shade from './Shade';
import { makeToast } from '../../../../utils/utils';
import data from '../../../../utils/data.json';

const Shades = ({ activeColor }) => {
   return (
      <div className='color-shades'>
         {data.shades
            .find((item) => item.color_id === activeColor)
            ?.data.map((shade) => (
               <Shade key={shade.id} shade={shade} />
            ))}
         {makeToast(data.colors.find((item) => item.id === activeColor).name.toUpperCase())}
      </div>
   );
};

export default Shades;
