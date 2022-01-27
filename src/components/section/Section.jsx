import React, { useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

import MaterialColor from './material_color/MaterialColor';
import Create from './create/Create';
import Extract from './extract/Extract';
import Harmonize from './harmonize/Harmonize';
import Saved from './saved/Saved';

import { makeToast, getSwatches, getPalette } from '../../utils/utils';

const Section = (props) => {
   /** Material color state */
   const [activeColor, setActiveColor] = useState(1);
   const handleColorChange = (id) => setActiveColor(id);

   /** Create solid state */
   const [solid, setSolid] = useState({ red: 220, green: 40, blue: 80, alpha: 255, checkbox: true });
   const handleSolidChange = (red, green, blue, alpha, checkbox) => setSolid({ red, green, blue, alpha, checkbox });

   /** Create gradient state */
   const [gradient, setGradient] = useState({ top: { red: 85, green: 210, blue: 132, alpha: 255 }, bottom: { red: 242, green: 207, blue: 7, alpha: 255 }, checkbox: true });
   const handleGradientChange = (top, bottom, checkbox) => setGradient({ top, bottom, checkbox });

   /** Extract swatch colors */
   const [swatch, setSwatch] = useState({ path: '', swatches: [] });
   const handleSwatchChange = (e) => {
      if (e.target.files && e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (e) =>
            getSwatches(e.target.result, (swatches) => {
               setSwatch({ path: e.target.result, swatches });
               makeToast(`${swatches.length} swatches extracted :)`);
            });
         reader.readAsDataURL(e.target.files[0]);
      } else makeToast('Selected image is not valid!');
   };

   /** Extract palette colors */
   const [palette, setPalette] = useState({ path: '', palette: [] });
   const handlePaletteChange = (e) => {
      if (e.target.files && e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (e) =>
            getPalette(e.target.result, 16, (palette) => {
               setPalette({ path: e.target.result, palette });
               makeToast(`${palette.swatches.length} colors extracted :)`);
            });
         reader.readAsDataURL(e.target.files[0]);
      } else makeToast('Selected image is not valid!');
   };

   return (
      <section>
         <Header version={props.version} darkMode={props.darkMode} changeTheme={props.changeTheme} />
         {props.activeMenu === 1 && <MaterialColor activeColor={activeColor} darkMode={props.darkMode} changeColor={handleColorChange} />}
         {props.activeMenu === 2 && <Create darkMode={props.darkMode} solid={solid} gradient={gradient} changeSolid={handleSolidChange} changeGradient={handleGradientChange} />}
         {props.activeMenu === 3 && <Extract darkMode={props.darkMode} swatch={swatch} palette={palette} changeSwatch={handleSwatchChange} changePalette={handlePaletteChange} />}
         {props.activeMenu === 4 && <Harmonize darkMode={props.darkMode} />}
         {props.activeMenu === 5 && <Saved darkMode={props.darkMode} />}
         <Footer darkMode={props.darkMode} />
      </section>
   );
};

export default Section;
