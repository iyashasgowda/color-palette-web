import React from 'react';

import { add } from '../../../../utils/storage';
import { rgb2hex, copyText, makeToast } from '../../../../utils/utils';

const Item = (props) => {
   const hex = rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2]);
   const copy_icon = `${process.env.PUBLIC_URL}/assets/icons/copy.svg`;

   return (
      <div className='palette-item'>
         <div
            className='color-card'
            style={{ backgroundColor: `rgb(${props.rgb})` }}
            onDoubleClick={() => {
               const solid = {
                  key: hex,
                  hex: hex,
                  rgb: props.rgb,
                  timestamp: new Date(),
               };

               add('solid', solid, (result) => {
                  result.onsuccess = () => makeToast(`${hex} - ${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]} saved :)`);
                  result.onerror = () => makeToast('Color already exist!');
               });
            }}
         />
         <div className='palette-hex'>
            <p>{rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2])}</p>
            <img
               src={copy_icon}
               alt='copy'
               onClick={() => {
                  copyText(rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2]));
                  makeToast(`${rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2])} copied :)`);
               }}
            />
         </div>
         <div className='palette-rgb'>
            <p>{`${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]}`}</p>
            <img
               src={copy_icon}
               alt='copy'
               onClick={() => {
                  copyText(`${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]}`);
                  makeToast(`${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]} copied :)`);
               }}
            />
         </div>
      </div>
   );
};

export default Item;
