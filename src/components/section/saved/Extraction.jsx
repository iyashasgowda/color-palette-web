import React, { useState, useEffect } from 'react';

import { fetchAll, removeOne } from '../../../utils/storage';
import { makeToast } from '../../../utils/utils';

const Extraction = (props) => {
   const [swatch, setSwatch] = useState(null);
   const [palette, setPalette] = useState(null);

   useEffect(() => {
      if (swatch === null && props.extraction === 1) fetchAll('swatch', (result) => (result.onsuccess = (e) => setSwatch(e.target.result)));
      if (palette === null && props.extraction === 2) fetchAll('palette', (result) => (result.onsuccess = (e) => setPalette(e.target.result)));
   });

   let extraction;
   if (props.extraction === 1) {
      if (swatch === null)
         extraction = (
            <div className='extraction-loading'>
               <p className='loading'>loading...</p>
            </div>
         );
      else if (swatch.length === 0)
         extraction = (
            <div className='extraction-loading'>
               <p className='loading'>Nothing found :(</p>
            </div>
         );
      else
         extraction = (
            <div className='extraction-items'>
               {swatch.map((item) => (
                  <img
                     src={item.path}
                     alt='swatch'
                     key={item.key}
                     onDoubleClick={() =>
                        removeOne('swatch', item.key, (result) => {
                           result.onsuccess = () => {
                              setSwatch(null);
                              makeToast(`Swatch removed!`);
                           };
                           result.onerror = () => makeToast(`Could not delete the swatch :(`);
                        })
                     }
                  />
               ))}
            </div>
         );
   } else {
      if (palette === null)
         extraction = (
            <div className='extraction-loading'>
               <p className='loading'>loading...</p>
            </div>
         );
      else if (palette.length === 0)
         extraction = (
            <div className='extraction-loading'>
               <p className='loading'>No palette found :(</p>
            </div>
         );
      else
         extraction = (
            <div className='extraction-items'>
               {palette.map((item) => (
                  <img
                     src={item.path}
                     alt='palette'
                     key={item.key}
                     onDoubleClick={() =>
                        removeOne('palette', item.key, (result) => {
                           result.onsuccess = () => {
                              setPalette(null);
                              makeToast(`Palette removed!`);
                           };
                           result.onerror = () => makeToast(`Could not delete the palette :(`);
                        })
                     }
                  />
               ))}
            </div>
         );
   }

   return (
      <div className='extraction-container'>
         <div className='extraction-header'>
            <div className='extraction-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/extraction.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/extraction.svg`} alt='solgrad'></img>
               <p>{props.extraction === 1 ? `Swatch` : `Palette`}</p>
            </div>

            <div className='extraction-options'>
               <select className='options' defaultValue={props.extraction} onChange={(e) => props.changeExtraction(parseInt(e.target.value))}>
                  <option value='1'>Swatch</option>
                  <option value='2'>Palette</option>
               </select>
            </div>
         </div>
         {extraction}
      </div>
   );
};

export default Extraction;
