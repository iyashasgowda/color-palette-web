import React from 'react';

/** Icons */
import theme from '../assets/icons/dark.svg';

const Header = ({ version }) => {
   return (
      <>
         <header className='header'>
            <div>
               <h1>Color Palette</h1>
               <p>v{version}</p>
            </div>

            <img src={theme} alt='theme'></img>
         </header>
      </>
   );
};

export default Header;
