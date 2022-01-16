import React from 'react';

const Header = (props) => {
   let theme = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/dark.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/light.svg`;
   return (
      <>
         <header className='header'>
            <div>
               <h1>Color Palette</h1>
               <p>{`v${props.version} beta`}</p>
            </div>

            <img src={theme} alt='theme' onClick={props.changeTheme}></img>
         </header>
      </>
   );
};

export default Header;
