import React from 'react';

import { rgb2hex, copyText, makeToast } from '../../../../utils/utils';

const Item = ({ rgb }) => {
   const copy_icon = `${process.env.PUBLIC_URL}/assets/icons/copy.svg`;
   return (
      <div className='palette-item'>
         <div className='color-card' style={{ backgroundColor: `rgb(${rgb})` }} />
         <div className='palette-hex'>
            <p>{rgb2hex(rgb[0], rgb[1], rgb[2])}</p>
            <img
               src={copy_icon}
               alt='copy'
               onClick={() => {
                  copyText(rgb2hex(rgb[0], rgb[1], rgb[2]));
                  makeToast(`${rgb2hex(rgb[0], rgb[1], rgb[2])} copied :)`);
               }}
            />
         </div>
         <div className='palette-rgb'>
            <p>{`${rgb[0]}, ${rgb[1]}, ${rgb[2]}`}</p>
            <img
               src={copy_icon}
               alt='copy'
               onClick={() => {
                  copyText(`${rgb[0]}, ${rgb[1]}, ${rgb[2]}`);
                  makeToast(`${rgb[0]}, ${rgb[1]}, ${rgb[2]} copied :)`);
               }}
            />
         </div>
      </div>
   );
};

export default Item;
