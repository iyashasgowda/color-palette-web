import React from 'react';

import app from '../../../../../package.json';
import { makeToast } from '../../../../utils/utils.js';

const Shade = ({ shade }) => {
   return (
      <div className='color-shade'>
         <div style={{ backgroundColor: shade.code }}></div>
         <div>
            <div>
               <p>{shade.name}</p>
               <p>{shade.code.toUpperCase()}</p>
            </div>
            <img
               src={`${app.name}/assets/icons/dark/copy.svg`}
               alt='copy'
               onClick={() => {
                  navigator.clipboard.writeText(shade.code.toUpperCase());
                  makeToast(`Color ${shade.code.toUpperCase()} copied :)`);
               }}
            ></img>
         </div>
      </div>
   );
};

export default Shade;
