import React from 'react';

/** Icons */
import logo from '../assets/logo.svg';
import settings_icon from '../assets/icons/settings.svg';
import home_icon from '../assets/icons/on/home_on.svg';
import create_icon from '../assets/icons/off/create_off.svg';
import extract_icon from '../assets/icons/off/extract_off.svg';
import harmonize_icon from '../assets/icons/off/harmonizer_off.svg';

/** Style */
import '../css/menu.css';

const Menu = () => {
   const logo_size = 48;

   return (
      <div className='menu'>
         <div>
            <img className='logo' src={logo} alt='logo' height={logo_size} width={logo_size}></img>
            <ul>
               <li>
                  <img src={home_icon} alt='home'></img>
               </li>
               <li>
                  <img src={create_icon} alt='create'></img>
               </li>
               <li>
                  <img src={extract_icon} alt='extract'></img>
               </li>
               <li>
                  <img src={harmonize_icon} alt='harmonizer'></img>
               </li>
            </ul>
         </div>

         <img className='settings' src={settings_icon} alt='settings'></img>
      </div>
   );
};

export default Menu;
