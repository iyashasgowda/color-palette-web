import React, { useCallback, useState } from 'react';
import Menu from './components/menu/Menu';
import Section from './components/section/Section';
import Warning from './components/comms/Warning';

import { getCache, setCache, changeTheme, isMobileDevice } from './utils/utils';
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

   const [modal, showModal] = useState(getCache().settings);
   const handleSettingsModal = useCallback((flag) => {
      showModal(flag);
      setCache('settings', flag);
   }, []);

   return (
      <>
         <div className='container'>
            {isMobileDevice() ? (
               <Warning />
            ) : (
               <>
                  <Menu activeMenu={activeMenu} darkMode={darkMode} changeMenu={handleMenuChange} showModal={handleSettingsModal} />
                  <Section activeMenu={activeMenu} darkMode={darkMode} version={app.version} changeTheme={handleThemeChange} showSettings={modal} showModal={handleSettingsModal} />
               </>
            )}
         </div>
      </>
   );
};

export default App;
