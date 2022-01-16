import React from 'react';

import { makeToast } from '../../../../utils/utils.js';

const Shade = (props) => {
   const copy = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/copy.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/copy.svg`;
   return (
      <div className='color-shade'>
         <div style={{ backgroundColor: props.shade.code }}></div>
         <div>
            <div>
               <p>{props.shade.name}</p>
               <p>{props.shade.code.toUpperCase()}</p>
            </div>
            <img
               src={copy}
               alt='copy'
               onClick={() => {
                  navigator.clipboard.writeText(props.shade.code.toUpperCase());
                  makeToast(`Color ${props.shade.code.toUpperCase()} copied :)`);
               }}
            ></img>
         </div>
      </div>
   );
};

export default Shade;
