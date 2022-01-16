import React from 'react';
import Shade from './Shade';
import { makeToast } from '../../../../utils/utils';
import data from '../../../../utils/data.json';

const Shades = (props) => {
   return (
      <div className='color-shades'>
         {data.shades
            .find((item) => item.color_id === props.activeColor)
            ?.data.map((shade) => (
               <Shade key={shade.id} shade={shade} darkMode={props.darkMode} />
            ))}
         {makeToast(data.colors.find((item) => item.id === props.activeColor).name.toUpperCase())}
      </div>
   );
};

export default Shades;
