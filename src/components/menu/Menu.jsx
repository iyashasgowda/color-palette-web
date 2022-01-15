import React from 'react';
import Item from './Item';

import data from '../../utils/data.json';
import app from '../../../package.json';

const Menu = ({ activeMenu, changeMenu }) => {
   const logo_size = 48;

   return (
      <div className='menu'>
         <div>
            <img className='logo' src={`${app.name}/assets/logo.svg`} alt='logo' height={logo_size} width={logo_size}></img>
            <ul>
               {data.menu_items.map((item) => (
                  <Item key={item.id} item={item} activeMenu={activeMenu} changeMenu={changeMenu} />
               ))}
            </ul>
         </div>

         <img className='settings' src={`${app.name}/assets/icons/settings.svg`} alt='settings'></img>
      </div>
   );
};

export default Menu;
