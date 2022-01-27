import React from 'react';

import { copyText, makeToast } from '../../../../utils/utils.js';

const Shade = (props) => {
   return (
      <div className='color-shade'>
         <div style={{ backgroundColor: props.shade.code }}></div>
         <div>
            <div>
               <p>{props.shade.name}</p>
               <p>{props.shade.code.toUpperCase()}</p>
            </div>
            <img
               src={`${process.env.PUBLIC_URL}/assets/icons/copy_large.svg`}
               alt='copy'
               onClick={() => {
                  copyText(props.shade.code);
                  makeToast(`${props.shade.code.toUpperCase()} copied :)`);
               }}
            ></img>
         </div>
      </div>
   );
};

export default Shade;
