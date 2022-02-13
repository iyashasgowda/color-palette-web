import React from 'react';

import { copyText, makeToast } from '../../utils/utils';
import { removeOne } from '../../utils/storage';

const Quadral = (props) => {
   const [a_hex, b_hex, c_hex, d_hex] = [props.data.a_hex, props.data.b_hex, props.data.c_hex, props.data.d_hex];
   const [a_rgb, b_rgb, c_rgb, d_rgb] = [props.data.a_rgb, props.data.b_rgb, props.data.c_rgb, props.data.d_rgb];

   return (
      <div className='quadral-item'>
         <div
            className='color-cards'
            onDoubleClick={() =>
               removeOne(props.type, props.data.key, (result) => {
                  result.onsuccess = () => {
                     props.removeItem(null);
                     makeToast(`${props.name} removed!`);
                  };
                  result.onerror = () => makeToast(`Could not delete the ${props.type} :(`);
               })
            }
         >
            <div className='color-card' style={{ backgroundColor: a_hex }} />
            <div className='color-card' style={{ backgroundColor: b_hex }} />
            <div className='color-card' style={{ backgroundColor: c_hex }} />
            <div className='color-card' style={{ backgroundColor: d_hex }} />
         </div>

         <div className='color-codes'>
            <div className='codes'>
               <p
                  onClick={() => {
                     copyText(a_hex);
                     makeToast(`${a_hex} copied :)`);
                  }}
               >
                  {a_hex}
               </p>
               <p
                  onClick={() => {
                     copyText(`${a_rgb[0]}, ${a_rgb[1]}, ${a_rgb[2]}`);
                     makeToast(`${a_rgb[0]}, ${a_rgb[1]}, ${a_rgb[2]} copied :)`);
                  }}
               >{`${a_rgb[0]}, ${a_rgb[1]}, ${a_rgb[2]}`}</p>
            </div>
            <div className='codes'>
               <p
                  onClick={() => {
                     copyText(b_hex);
                     makeToast(`${b_hex} copied :)`);
                  }}
               >
                  {b_hex}
               </p>
               <p
                  onClick={() => {
                     copyText(`${b_rgb[0]}, ${b_rgb[1]}, ${b_rgb[2]}`);
                     makeToast(`${b_rgb[0]}, ${b_rgb[1]}, ${b_rgb[2]} copied :)`);
                  }}
               >{`${b_rgb[0]}, ${b_rgb[1]}, ${b_rgb[2]}`}</p>
            </div>
            <div className='codes'>
               <p
                  onClick={() => {
                     copyText(c_hex);
                     makeToast(`${c_hex} copied :)`);
                  }}
               >
                  {c_hex}
               </p>
               <p
                  onClick={() => {
                     copyText(`${c_rgb[0]}, ${c_rgb[1]}, ${c_rgb[2]}`);
                     makeToast(`${c_rgb[0]}, ${c_rgb[1]}, ${c_rgb[2]} copied :)`);
                  }}
               >{`${c_rgb[0]}, ${c_rgb[1]}, ${c_rgb[2]}`}</p>
            </div>
            <div className='codes'>
               <p
                  onClick={() => {
                     copyText(d_hex);
                     makeToast(`${d_hex} copied :)`);
                  }}
               >
                  {d_hex}
               </p>
               <p
                  onClick={() => {
                     copyText(`${d_rgb[0]}, ${d_rgb[1]}, ${d_rgb[2]}`);
                     makeToast(`${d_rgb[0]}, ${d_rgb[1]}, ${d_rgb[2]} copied :)`);
                  }}
               >{`${d_rgb[0]}, ${d_rgb[1]}, ${d_rgb[2]}`}</p>
            </div>
         </div>
      </div>
   );
};

export default Quadral;
