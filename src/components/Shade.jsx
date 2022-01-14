import React from 'react';
import { makeToast } from '../utils/utils.js';
import copy_icon from '../assets/icons/dark/copy.svg';

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
               src={copy_icon}
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
