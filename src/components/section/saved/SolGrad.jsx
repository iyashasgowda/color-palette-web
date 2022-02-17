import React, { useEffect, useState } from 'react';

import Solid from '../../comms/Solid';
import Gradient from '../../comms/Gradient';
import { fetchAll } from '../../../utils/storage';

const SolGrad = (props) => {
   const [solid, setSolid] = useState(null);
   const [gradient, setGradient] = useState(null);

   useEffect(() => {
      if (solid === null && props.solgrad === 1) fetchAll('solid', (result) => (result.onsuccess = (e) => setSolid(e.target.result)));
      if (gradient === null && props.solgrad === 2) fetchAll('gradient', (result) => (result.onsuccess = (e) => setGradient(e.target.result)));
   });

   const removeSolid = (value) => setSolid(value);
   const removeGradient = (value) => setGradient(value);

   let solgrads;
   if (props.solgrad === 1) {
      if (solid === null)
         solgrads = (
            <div className='solgrad-loading'>
               <p className='loading'>loading...</p>
            </div>
         );
      else if (solid.length === 0)
         solgrads = (
            <div className='solgrad-loading'>
               <p className='loading'>No solids found :(</p>
            </div>
         );
      else
         solgrads = (
            <div className='solgrad-solid-items'>
               {solid.map((item) => (
                  <Solid key={item.key} data={item} shouldSave={false} removeItem={removeSolid}></Solid>
               ))}
            </div>
         );
   } else {
      if (gradient === null)
         solgrads = (
            <div className='solgrad-loading'>
               <p className='loading'>loading...</p>
            </div>
         );
      else if (gradient.length === 0)
         solgrads = (
            <div className='solgrad-loading'>
               <p className='loading'>Nothing found :(</p>
            </div>
         );
      else
         solgrads = (
            <div className='solgrad-gradient-items'>
               {gradient.map((item) => (
                  <Gradient key={item.key} data={item} shouldSave={false} shouldRemove={true} removeItem={removeGradient}></Gradient>
               ))}
            </div>
         );
   }

   return (
      <div className='solgrad-container'>
         <div className='solgrad-header'>
            <div className='solgrad-header-title'>
               <img src={props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/solgrad.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/solgrad.svg`} alt='solgrad'></img>
               <p>{props.solgrad === 1 ? `Solid` : `Gradient`}</p>
            </div>

            <div className='solgrad-options'>
               <select className='options' defaultValue={props.solgrad} onChange={(e) => props.changeSolGrad(parseInt(e.target.value))}>
                  <option value='1'>Solid</option>
                  <option value='2'>Gradient</option>
               </select>
            </div>
         </div>

         {solgrads}
      </div>
   );
};

export default SolGrad;
