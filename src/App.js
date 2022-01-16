import React, { useState } from 'react';
import Menu from './components/menu/Menu';
import Section from './components/section/Section';

import { changeTheme } from './utils/utils';

import app from '../package.json';
import data from './utils/data.json';

const App = () => {
   const [darkMode, setDarkMode] = useState(false);
   const [activeMenu, setActiveMenu] = useState(1);

   const handleThemeChange = () => {
      setDarkMode(!darkMode);
      changeTheme(darkMode);
   };
   const handleMenuChange = (id) => {
      setActiveMenu(id);
      data.menu_items.map((item) => item.id === activeMenu && (item.icon = item.icon.replace('off', 'on')));
   };
   
   return (
      <>
         <div className='container'>
            <Menu activeMenu={activeMenu} darkMode={darkMode} changeMenu={handleMenuChange} />
            <Section activeMenu={activeMenu} darkMode={darkMode} version={app.version} changeTheme={handleThemeChange} />
         </div>
      </>
   );
};

export default App;
