import React from 'react';
import Item from './Item';

import data from '../../utils/data.json';
import { makeToast } from '../../utils/utils';

const Menu = ({ activeMenu, darkMode, changeMenu }) => {
   const logo_size = 48;
   const settings = darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/settings.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/settings.svg`;

   return (
      <div className='menu'>
         <div>
            <img className='logo' src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo' height={logo_size} width={logo_size}></img>
            <ul>
               {data.menu_items.map((item) => (
                  <Item key={item.id} item={item} darkMode={darkMode} activeMenu={activeMenu} changeMenu={changeMenu} />
               ))}
            </ul>
         </div>

         <img className='settings' src={settings} alt='settings' onClick={() => makeToast('Settings is coming soon :)')}></img>
      </div>
   );
};

export default Menu;
