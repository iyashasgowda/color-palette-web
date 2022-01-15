import React from 'react';

import app from '../../../../package.json';

const Header = ({ version }) => {
   return (
      <>
         <header className='header'>
            <div>
               <h1>Color Palette</h1>
               <p>v{version}</p>
            </div>

            <img src={`${app.name}/assets/icons/dark.svg`} alt='theme'></img>
         </header>
      </>
   );
};

export default Header;
