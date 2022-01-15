import React, { useState } from 'react';
import Menu from './components/menu/Menu';
import Section from './components/section/Section';

import app from '../package.json';
import data from './utils/data.json';

const App = () => {
   const [activeMenu, setActiveMenu] = useState(1);

   const handleMenuChange = (id) => {
      setActiveMenu(id);
      data.menu_items.map((item) => item.id === activeMenu && (item.icon = item.icon.replace('off', 'on')));
   };

   return (
      <>
         <div className='container'>
            <Menu activeMenu={activeMenu} changeMenu={handleMenuChange} />
            <Section activeMenu={activeMenu} version={app.version} />
         </div>
      </>
   );
};

export default App;
