import React, { useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import MaterialColor from './material_color/MaterialColor';
import Create from './create/Create';
import Extract from './extract/Extract';
import Harmonize from './harmonize/Harmonize';
import Saved from './saved/Saved';

const Section = (props) => {
   const [activeColor, setActiveColor] = useState(1);
   const handleColorChange = (id) => setActiveColor(id);

   return (
      <section>
         <Header version={props.version} darkMode={props.darkMode} changeTheme={props.changeTheme} />
         {props.activeMenu === 1 && <MaterialColor activeColor={activeColor} darkMode={props.darkMode} changeColor={handleColorChange} />}
         {props.activeMenu === 2 && <Create darkMode={props.darkMode} />}
         {props.activeMenu === 3 && <Extract darkMode={props.darkMode} />}
         {props.activeMenu === 4 && <Harmonize darkMode={props.darkMode} />}
         {props.activeMenu === 5 && <Saved darkMode={props.darkMode} />}
         <Footer darkMode={props.darkMode} />
      </section>
   );
};

export default Section;
