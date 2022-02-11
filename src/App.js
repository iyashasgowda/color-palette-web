import React, { useState } from 'react';
import Menu from './components/menu/Menu';
import Section from './components/section/Section';

import { getCache, setCache, changeTheme } from './utils/utils';
import app from '../package.json';

const App = () => {
   const [activeMenu, setActiveMenu] = useState(getCache().menu);
   const [darkMode, setDarkMode] = useState(getCache().theme);

   const handleMenuChange = (id) => {
      setActiveMenu(id);
      setCache('menu', id);
   };

   const handleThemeChange = () => {
      setDarkMode(!darkMode);
      changeTheme(darkMode);
      setCache('theme', !darkMode);
   };
   changeTheme(darkMode);

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
