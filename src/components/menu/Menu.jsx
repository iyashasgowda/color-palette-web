import React from 'react';
import Item from './Item';

import data from '../../utils/data.json';

const Menu = (props) => {
   const logo_size = 48;
   const settings = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/settings.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/settings.svg`;
   const goTo = (url) => window.open(url, '_self');

   return (
      <div className='menu'>
         <div>
            <img className='logo' src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo' height={logo_size} width={logo_size} onClick={() => goTo(process.env.PUBLIC_URL)} />
            <ul>
               {data.menu_items.map((item) => (
                  <Item key={item.id} item={item} darkMode={props.darkMode} activeMenu={props.activeMenu} changeMenu={props.changeMenu} />
               ))}
            </ul>
         </div>

         <img className='settings' src={settings} alt='settings' onClick={() => props.showModal(true)} />
      </div>
   );
};

export default Menu;
