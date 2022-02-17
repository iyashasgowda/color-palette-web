import React, { useEffect, useState } from 'react';
import Dual from '../../comms/Dual';
import Trial from '../../comms/Trial';
import Quadral from '../../comms/Quadral';

import { fetchAll } from '../../../utils/storage';

const Harmony = (props) => {
   const [complement, setComplement] = useState(null);
   const [split, setSplit] = useState(null);
   const [analogous, setAnalogous] = useState(null);
   const [triadic, setTriadic] = useState(null);
   const [tetradic, setTetradic] = useState(null);

   useEffect(() => {
      if (complement === null && props.harmony === 1) fetchAll('complement', (result) => (result.onsuccess = (e) => setComplement(e.target.result)));
      else if (split === null && props.harmony === 2) fetchAll('split', (result) => (result.onsuccess = (e) => setSplit(e.target.result)));
      else if (analogous === null && props.harmony === 3) fetchAll('analogous', (result) => (result.onsuccess = (e) => setAnalogous(e.target.result)));
      else if (triadic === null && props.harmony === 4) fetchAll('triadic', (result) => (result.onsuccess = (e) => setTriadic(e.target.result)));
      else if (tetradic === null && props.harmony === 5) fetchAll('tetradic', (result) => (result.onsuccess = (e) => setTetradic(e.target.result)));
   });

   const changeComplement = (value) => setComplement(value);
   const changeSplit = (value) => setSplit(value);
   const changeAnalogous = (value) => setAnalogous(value);
   const changeTriadic = (value) => setTriadic(value);
   const changeTetradic = (value) => setTetradic(value);

   let list, title;
   const loading = (
      <div className='data-loading'>
         <p className='loading'>loading...</p>
      </div>
   );
   const empty = (
      <div className='data-loading'>
         <p className='loading'>Nothing found :(</p>
      </div>
   );
   const getData = () => {
      if (props.harmony === 1) {
         title = 'Complement';

         if (complement === null) list = loading;
         else if (complement.length === 0) list = empty;
         else
            list = (
               <div className='data-items'>
                  {complement.map((item) => (
                     <Dual key={item.key} type='complement' name='Complement' data={item} shouldSave={false} removeItem={changeComplement}></Dual>
                  ))}
               </div>
            );
      } else if (props.harmony === 2) {
         title = 'Split Complement';

         if (split === null) list = loading;
         else if (split.length === 0) list = empty;
         else
            list = (
               <div className='data-items'>
                  {split.map((item) => (
                     <Trial key={item.key} type='split' name='Split Complement' data={item} shouldSave={false} removeItem={changeSplit}></Trial>
                  ))}
               </div>
            );
      } else if (props.harmony === 3) {
         title = 'Analogous';

         if (analogous === null) list = loading;
         else if (analogous.length === 0) list = empty;
         else
            list = (
               <div className='data-items'>
                  {analogous.map((item) => (
                     <Trial key={item.key} type='analogous' name='Analogous' data={item} shouldSave={false} removeItem={changeAnalogous}></Trial>
                  ))}
               </div>
            );
      } else if (props.harmony === 4) {
         title = 'Triadic';

         if (triadic === null) list = loading;
         else if (triadic.length === 0) list = empty;
         else
            list = (
               <div className='data-items'>
                  {triadic.map((item) => (
                     <Trial key={item.key} type='triadic' name='Triadic' data={item} shouldSave={false} removeItem={changeTriadic}></Trial>
                  ))}
               </div>
            );
      } else if (props.harmony === 5) {
         title = 'Tetradic';

         if (tetradic === null) list = loading;
         else if (tetradic.length === 0) list = empty;
         else
            list = (
               <div className='data-items'>
                  {tetradic.map((item) => (
                     <Quadral key={item.key} type='tetradic' name='Tetradic' data={item} shouldSave={false} shouldRemove={true} removeItem={changeTetradic}></Quadral>
                  ))}
               </div>
            );
      }
   };
   getData();

   return (
      <div className='harmony-container'>
         <div className='harmony-header'>
            <div className='harmony-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/harmony.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/harmony.svg`} alt='solgrad'></img>
               <p>{title}</p>
            </div>

            <div className='harmony-options'>
               <select className='options' defaultValue={props.harmony} onChange={(e) => props.changeHarmony(parseInt(e.target.value))}>
                  <option value='1'>Complement</option>
                  <option value='2'>Split</option>
                  <option value='3'>Analogous</option>
                  <option value='4'>Triadic</option>
                  <option value='5'>Tetradic</option>
               </select>
            </div>
         </div>

         {list}
      </div>
   );
};

export default Harmony;
