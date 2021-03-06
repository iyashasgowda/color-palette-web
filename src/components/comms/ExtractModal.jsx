import React from 'react';
import SwatchItem from './SwatchItem';
import PaletteItem from './Solid';

import { removeOne } from '../../utils/storage';
import { makeToast, rgb2hex } from '../../utils/utils';

const ExtractModal = (props) => {
   const close_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/close.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/close.svg`;
   const delete_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/delete.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/delete.svg`;

   return (
      <div className='extract-modal'>
         <div className='modal-container'>
            <img className='extract-image' style={props.swatch ? { alignSelf: 'end', marginRight: '32px' } : { alignSelf: 'center' }} src={props.data.path} alt='extract' />

            {props.swatch ? (
               <div className='swatch-extracts'>
                  {props.data.swatches.map((item, index) => (
                     <SwatchItem key={index} name={item.name} rgb={item.rgb} shouldSave={false} />
                  ))}
               </div>
            ) : (
               <div className='palette-extracts'>
                  {props.data.palette.map((item, index) => (
                     <PaletteItem key={index} data={{ rgb: item, hex: rgb2hex(item[0], item[1], item[2]) }} shouldSave={false} />
                  ))}
               </div>
            )}

            <div className='modal-option close' onClick={() => props.closeModal()}>
               <img src={close_icon} alt='close' />
            </div>

            <div
               className='modal-option delete'
               onClick={() => {
                  props.closeModal();
                  props.swatch
                     ? removeOne('swatch', props.data.key, (result) => {
                          result.onsuccess = () => makeToast(`Swatch removed!`);
                          result.onerror = () => makeToast(`Could not delete the swatch!`);
                       })
                     : removeOne('palette', props.data.key, (result) => {
                          result.onsuccess = () => makeToast(`Palette removed!`);
                          result.onerror = () => makeToast(`Could not delete the palette!`);
                       });
                  props.reloadExtract();
               }}
            >
               <img src={delete_icon} alt='delete' />
            </div>
         </div>
      </div>
   );
};

export default ExtractModal;
