import React from 'react';
import { rgb2hex, getTextColor, getCopyIcon, copyText, makeToast } from '../../../../utils/utils';

const Item = (props) => {
   return (
      <div className='swatch-item' style={{ backgroundColor: `rgb(${props.rgb})` }}>
         <p style={{ color: `rgb(${getTextColor(props.rgb)})` }}>{props.name}</p>
         <div className='swatch-hex'>
            <p style={{ color: `rgba(${getTextColor(props.rgb)}, 0.8)` }}>{`HEX: ${rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2])}`}</p>
            <img
               style={{ opacity: 0.8 }}
               src={getCopyIcon(props.rgb)}
               alt='copy'
               onClick={() => {
                  copyText(rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2]));
                  makeToast(`${rgb2hex(props.rgb[0], props.rgb[1], props.rgb[2])} copied :)`);
               }}
            />
         </div>
         <div className='swatch-rgb'>
            <p style={{ color: `rgba(${getTextColor(props.rgb)}, 0.8)` }}>{`RGB: ${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]}`}</p>
            <img
               style={{ opacity: 0.8 }}
               src={getCopyIcon(props.rgb)}
               alt='copy'
               onClick={() => {
                  copyText(`${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]}`);
                  makeToast(`${props.rgb[0]}, ${props.rgb[1]}, ${props.rgb[2]} copied :)`);
               }}
            />
         </div>
      </div>
   );
};

export default Item;
