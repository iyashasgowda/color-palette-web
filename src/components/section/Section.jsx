import React, { useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

import MaterialColor from './material_color/MaterialColor';
import Create from './create/Create';
import Extract from './extract/Extract';
import Harmonize from './harmonize/Harmonize';
import Saved from './saved/Saved';

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
   const handleSwatchChange = (swatch) => setSwatch(swatch);

   /** Extract palette colors */
   const [palette, setPalette] = useState({ path: '', palette: [] });
   const handlePaletteChange = (palette) => setPalette(palette);

   /** Extract manual colors */
   const [manual, setManual] = useState({ path: '', rgb: { red: 0, green: 0, blue: 0 } });
   const handleManualChange = (palette) => setManual(palette);

   /** Complement colors */
   const [complement, setComplement] = useState({ r: 0, g: 0, b: 0, checked: false });
   const handleComplementChange = (complement) => setComplement(complement);

   /** Split complement colors */
   const [split, setSplit] = useState({ r: 0, g: 0, b: 0, checked: false });
   const handleSplitChange = (split) => setSplit(split);

   /** Analogous colors */
   const [analogous, setAnalogous] = useState({ r: 0, g: 0, b: 0, checked: false });
   const handleAnalogousChange = (analogous) => setAnalogous(analogous);

   /** Triadic colors */
   const [triadic, setTriadic] = useState({ r: 0, g: 0, b: 0, checked: false });
   const handleTriadicChange = (triadic) => setTriadic(triadic);

   /** Tetradic colors */
   const [tetradic, setTetradic] = useState({ r: 0, g: 0, b: 0, checked: false });
   const handleTetradicChange = (tetradic) => setTetradic(tetradic);

   return (
      <section>
         <Header version={props.version} darkMode={props.darkMode} changeTheme={props.changeTheme} />
         {props.activeMenu === 1 && <MaterialColor activeColor={activeColor} darkMode={props.darkMode} changeColor={handleColorChange} />}
         {props.activeMenu === 2 && <Create darkMode={props.darkMode} solid={solid} gradient={gradient} changeSolid={handleSolidChange} changeGradient={handleGradientChange} />}
         {props.activeMenu === 3 && <Extract darkMode={props.darkMode} swatch={swatch} palette={palette} manual={manual} changeSwatch={handleSwatchChange} changePalette={handlePaletteChange} changeManual={handleManualChange} />}
         {props.activeMenu === 4 && (
            <Harmonize
               darkMode={props.darkMode}
               complement={complement}
               changeComplement={handleComplementChange}
               split={split}
               changeSplit={handleSplitChange}
               analogous={analogous}
               changeAnalogous={handleAnalogousChange}
               triadic={triadic}
               changeTriadic={handleTriadicChange}
               tetradic={tetradic}
               changeTetradic={handleTetradicChange}
            />
         )}
         {props.activeMenu === 5 && <Saved darkMode={props.darkMode} />}
         <Footer darkMode={props.darkMode} />
      </section>
   );
};

export default Section;
