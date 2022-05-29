import React from 'react';

import { removeOne } from '../../utils/storage';
import { copyText, makeToast } from '../../utils/utils';

const Gradient = (props) => {
   const [a_hex, b_hex] = [props.data.a_hex, props.data.b_hex];
   const [a_rgb, b_rgb] = [props.data.a_rgb, props.data.b_rgb];
   const gradient = `linear-gradient(to right, ${a_hex}, ${b_hex})`;
   const copy_icon = `${process.env.PUBLIC_URL}/assets/icons/copy.svg`;

   return (
      <div className='gradient-item'>
         <div
            className='color-card'
            style={{ background: gradient }}
            onDoubleClick={() => {
               props.shouldRemove
                  ? removeOne('gradient', props.data.key, (result) => {
                       result.onsuccess = () => {
                          props.removeItem(null);
                          makeToast(`Gradient removed!`);
                       };
                       result.onerror = () => makeToast(`Could not delete the gradient!`);
                    })
                  : makeToast('Preset gradients cannot be deleted!');
            }}
         />
         <div className='code-holder'>
            <div className='color-codes'>
               <div className='color-identifier' style={{ backgroundColor: a_hex }} />
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
            </div>
            <div className='color-codes'>
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
               <div className='color-identifier' style={{ backgroundColor: b_hex }} />
            </div>
         </div>
      </div>
   );
};

export default Gradient;
