import React, {memo} from 'react';
import author from '../../utils/author.json';

const Warning = () => {
   return (
      <div className='mobile-warning'>
         <div className='warning-body'>
            <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='' />
            <h1>Hello there :)</h1>
            <p>Color Palette web application is made compatible for only desktop and laptop devices.</p>
            <p>
               However, if you wish to use the application on your mobile device, download the mobile app from <a
                href={author.playstore}>Google Play</a>
            </p>
         </div>
      </div>
   );
};

export default memo(Warning);
