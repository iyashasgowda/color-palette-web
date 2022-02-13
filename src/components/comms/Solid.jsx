import React from 'react';

import { add, removeOne } from '../../utils/storage';
import { copyText, makeToast } from '../../utils/utils';

const Solid = (props) => {
   const copy_icon = `${process.env.PUBLIC_URL}/assets/icons/copy.svg`;

   return (
      <div className='solid-item'>
         <div
            className='color-card'
            style={{ backgroundColor: `rgb(${props.data.rgb})` }}
            onDoubleClick={() => {
               props.shouldSave
                  ? add(
                       'solid',
                       {
                          key: props.data.hex,
                          hex: props.data.hex,
                          rgb: props.data.rgb,
                          timestamp: new Date(),
                       },
                       (result) => {
                          result.onsuccess = () => makeToast(`${props.data.hex} - ${props.data.rgb[0]}, ${props.data.rgb[1]}, ${props.data.rgb[2]} saved :)`);
                          result.onerror = () => makeToast('Color already exist!');
                       }
                    )
                  : removeOne('solid', props.data.key, (result) => {
                       result.onsuccess = () => {
                          props.removeItem(null);
                          makeToast(`Color removed!`);
                       };
                       result.onerror = () => makeToast(`Could not delete the color :(`);
                    });
            }}
         />
         <div className='solid-hex'>
            <p>{props.data.hex}</p>
            <img
               src={copy_icon}
               alt='copy'
               onClick={() => {
                  copyText(props.data.hex);
                  makeToast(`${props.data.hex} copied :)`);
               }}
            />
         </div>
         <div className='solid-rgb'>
            <p>{`${props.data.rgb[0]}, ${props.data.rgb[1]}, ${props.data.rgb[2]}`}</p>
            <img
               src={copy_icon}
               alt='copy'
               onClick={() => {
                  copyText(`${props.data.rgb[0]}, ${props.data.rgb[1]}, ${props.data.rgb[2]}`);
                  makeToast(`${props.data.rgb[0]}, ${props.data.rgb[1]}, ${props.data.rgb[2]} copied :)`);
               }}
            />
         </div>
      </div>
   );
};

export default Solid;
