import React from 'react';

import { removeOne } from '../../utils/storage';
import { copyText, makeToast } from '../../utils/utils';

const Trial = (props) => {
   const [a_hex, b_hex, c_hex] = [props.data.a_hex, props.data.b_hex, props.data.c_hex];
   const [a_rgb, b_rgb, c_rgb] = [props.data.a_rgb, props.data.b_rgb, props.data.c_rgb];
   const copy_icon = `${process.env.PUBLIC_URL}/assets/icons/copy.svg`;

   return (
      <div className='trial-item'>
         <div
            className='color-cards'
            onDoubleClick={() =>
               removeOne(props.type, props.data.key, (result) => {
                  result.onsuccess = () => {
                     props.removeItem(null);
                     makeToast(`${props.name} removed!`);
                  };
                  result.onerror = () => makeToast(`Could not delete the ${props.type}!`);
               })
            }
         >
            <div className='color-card' style={{ backgroundColor: a_hex }} />
            <div className='color-card' style={{ backgroundColor: b_hex }} />
            <div className='color-card' style={{ backgroundColor: c_hex }} />
         </div>

         <div className='color-codes'>
            <div className='codes'>
               <div className='code'>
                  <p>{a_hex}</p>
                  <img src={copy_icon} alt='copy' onClick={() => copyText(a_hex).then(() => makeToast(`${a_hex} copied.`))} />
               </div>
               <div className='code'>
                  <p>{`${a_rgb[0]}, ${a_rgb[1]}, ${a_rgb[2]}`}</p>
                  <img src={copy_icon} alt='copy' onClick={() => copyText(`${a_rgb[0]}, ${a_rgb[1]}, ${a_rgb[2]}`).then(() => makeToast(`${a_rgb[0]}, ${a_rgb[1]}, ${a_rgb[2]} copied.`))} />
               </div>
            </div>
            <div className='codes'>
               <div className='code'>
                  <p>{b_hex}</p>
                  <img src={copy_icon} alt='copy' onClick={() => copyText(b_hex).then(() => makeToast(`${b_hex} copied.`))} />
               </div>
               <div className='code'>
                  <p>{`${b_rgb[0]}, ${b_rgb[1]}, ${b_rgb[2]}`}</p>
                  <img src={copy_icon} alt='copy' onClick={() => copyText(`${b_rgb[0]}, ${b_rgb[1]}, ${b_rgb[2]}`).then(() => makeToast(`${b_rgb[0]}, ${b_rgb[1]}, ${b_rgb[2]} copied.`))} />
               </div>
            </div>
            <div className='codes'>
               <div className='code'>
                  <p>{c_hex}</p>
                  <img src={copy_icon} alt='copy' onClick={() => copyText(c_hex).then(() => makeToast(`${c_hex} copied.`))} />
               </div>
               <div className='code'>
                  <p>{`${c_rgb[0]}, ${c_rgb[1]}, ${c_rgb[2]}`}</p>
                  <img src={copy_icon} alt='copy' onClick={() => copyText(`${c_rgb[0]}, ${c_rgb[1]}, ${c_rgb[2]}`).then(() => makeToast(`${c_rgb[0]}, ${c_rgb[1]}, ${c_rgb[2]} copied.`))} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Trial;
