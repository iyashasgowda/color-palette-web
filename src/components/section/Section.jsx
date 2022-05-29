import React, { useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

import MaterialColor from './material_color/MaterialColor';
import Create from './create/Create';
import Extract from './extract/Extract';
import Harmonize from './harmonize/Harmonize';
import Saved from './saved/Saved';

import { getCache, setCache } from '../../utils/utils';

const Section = (props) => {
   /** Material color state */
   const [activeColor, setActiveColor] = useState(getCache().material_color);
   const handleColorChange = (id) => {
      setActiveColor(id);
      setCache('material_color', id);
   };

   /** Create solid state */
   const [solid, setSolid] = useState(getCache().solid);
   const handleSolidChange = (solid) => {
      setSolid(solid);
      setCache('solid', solid);
   };

   /** Create gradient state */
   const [gradient, setGradient] = useState(getCache().gradient);
   const handleGradientChange = (gradient) => {
      setGradient(gradient);
      setCache('gradient', gradient);
   };

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
   const [complement, setComplement] = useState(getCache().complement);
   const handleComplementChange = (complement) => {
      setComplement(complement);
      setCache('complement', complement);
   };

   /** Split complement colors */
    const [split, setSplit] = useState(getCache().split);
    
   const handleSplitChange = (split) => {
      setSplit(split);
      setCache('split', split);
   };

   /** Analogous colors */
   const [analogous, setAnalogous] = useState(getCache().analogous);
   const handleAnalogousChange = (analogous) => {
      setAnalogous(analogous);
      setCache('analogous', analogous);
   };

   /** Triadic colors */
   const [triadic, setTriadic] = useState(getCache().triadic);
   const handleTriadicChange = (triadic) => {
      setTriadic(triadic);
      setCache('triadic', triadic);
   };

   /** Tetradic colors */
   const [tetradic, setTetradic] = useState(getCache().tetradic);
   const handleTetradicChange = (tetradic) => {
      setTetradic(tetradic);
      setCache('tetradic', tetradic);
   };

   /** SolGrad colors */
   const [solgrad, setSolGrad] = useState(getCache().solgrad);
   const handleSolGradChange = (solgrad) => {
      setSolGrad(solgrad);
      setCache('solgrad', solgrad);
   };

   /** Extraction colors */
   const [extraction, setExtraction] = useState(getCache().extraction);
   const handleExtractionChange = (extraction) => {
      setExtraction(extraction);
      setCache('extraction', extraction);
   };

   /** Harmony colors */
   const [harmony, setHarmony] = useState(getCache().harmony);
   const handleHarmonyChange = (harmony) => {
      setHarmony(harmony);
      setCache('harmony', harmony);
   };

   /** Preset colors */
   const [preset, setPreset] = useState(getCache().preset);
   const handlePresetChange = (preset) => {
      setPreset(preset);
      setCache('preset', preset);
   };

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
         {props.activeMenu === 5 && <Saved darkMode={props.darkMode} solgrad={solgrad} changeSolGrad={handleSolGradChange} extraction={extraction} changeExtraction={handleExtractionChange} harmony={harmony} changeHarmony={handleHarmonyChange} preset={preset} changePreset={handlePresetChange} />}
         <Footer darkMode={props.darkMode} />
      </section>
   );
};

export default Section;
