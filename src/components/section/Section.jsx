import React, { useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Create from './create/Create';
import Extract from './extract/Extract';
import Harmonize from './harmonize/Harmonize';
import Saved from './saved/Saved';

import MaterialColor from './material_color/MaterialColor';

const Section = (props) => {
   /** Material color state */
   const [activeColor, setActiveColor] = useState(1);
   const handleColorChange = (id) => setActiveColor(id);

   /** Create solid state */
   const [solid, setSolid] = useState({ red: 220, green: 40, blue: 80, alpha: 255 });
   const handleSolidChange = (red, green, blue, alpha) => setSolid({ red, green, blue, alpha });

   /** Create gradient state */
   const [gradient, setGradient] = useState({ top: { red: 85, green: 210, blue: 132, alpha: 255 }, bottom: { red: 242, green: 207, blue: 7, alpha: 255 } });
   const handleGradientChange = (top, bottom) => setGradient({ top, bottom });

   return (
      <section>
         <Header version={props.version} darkMode={props.darkMode} changeTheme={props.changeTheme} />
         {props.activeMenu === 1 && <MaterialColor activeColor={activeColor} darkMode={props.darkMode} changeColor={handleColorChange} />}
         {props.activeMenu === 2 && <Create darkMode={props.darkMode} solid={solid} gradient={gradient} changeSolid={handleSolidChange} changeGradient={handleGradientChange} />}
         {props.activeMenu === 3 && <Extract darkMode={props.darkMode} />}
         {props.activeMenu === 4 && <Harmonize darkMode={props.darkMode} />}
         {props.activeMenu === 5 && <Saved darkMode={props.darkMode} />}
         <Footer darkMode={props.darkMode} />
      </section>
   );
};

export default Section;
