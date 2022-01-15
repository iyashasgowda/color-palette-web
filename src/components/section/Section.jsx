import React, { useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import MaterialColor from './material_color/MaterialColor';
import Create from './create/Create';
import Extract from './extract/Extract';
import Harmonize from './harmonize/Harmonize';
import Saved from './saved/Saved';
import { makeToast } from '../../utils/utils';

const Section = ({ activeMenu, version }) => {
   const [activeColor, setActiveColor] = useState(1);
   const handleColorChange = (id) => setActiveColor(id);

   return (
      <section>
         <Header version={version} />
         {activeMenu === 1 ? <MaterialColor activeColor={activeColor} changeColor={handleColorChange} /> : makeToast('Feature in development!')}
         {activeMenu === 2 && <Create />}
         {activeMenu === 3 && <Extract />}
         {activeMenu === 4 && <Harmonize />}
         {activeMenu === 5 && <Saved />}
         <Footer />
      </section>
   );
};

export default Section;
