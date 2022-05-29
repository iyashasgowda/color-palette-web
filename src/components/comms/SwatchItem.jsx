import React from 'react';

import { add } from '../../utils/storage';
import { copyText, getCopyIcon, getTextColor, makeToast, rgb2hex } from '../../utils/utils';

const SwatchItem = (props) => {
   const hex = rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2]);
   return (
      <div
         className='swatch-item'
         style={{ backgroundColor: `rgb(${props.rgb})` }}
         onDoubleClick={() => {
            props.shouldSave &&
               add(
                  'solid',
                  {
                     key: hex,
                     hex: hex,
                     rgb: props.rgb,
                     timestamp: new Date(),
                  },
                  (result) => {
                     result.onsuccess = () => makeToast(`${hex} - ${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]} saved.`);
                     result.onerror = () => makeToast('Color already exist!');
                  }
               );
         }}
      >
         <p style={{ color: `rgb(${getTextColor(props.rgb)})` }}>{props.name}</p>
         <div className='swatch-hex'>
            <p style={{ color: `rgba(${getTextColor(props.rgb)}, 0.8)` }}>{`HEX: ${rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2])}`}</p>
            <img style={{ opacity: 0.8 }} src={getCopyIcon(props.rgb)} alt='copy' onClick={() => copyText(rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2])).then(() => makeToast(`${rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2])} copied.`))} />
         </div>
         <div className='swatch-rgb'>
            <p style={{ color: `rgba(${getTextColor(props.rgb)}, 0.8)` }}>{`RGB: ${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]}`}</p>
            <img style={{ opacity: 0.8 }} src={getCopyIcon(props.rgb)} alt='copy' onClick={() => copyText(`${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]}`).then(() => makeToast(`${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]} copied.`))} />
         </div>
      </div>
   );
};

export default SwatchItem;
