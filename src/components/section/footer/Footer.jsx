import React, {memo} from 'react';

import author from '../../../utils/author.json';

const Footer = ({ darkMode }) => {
   const icon_size = 24;
   const this_year = new Date().getFullYear();
   const github = darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/github.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/github.svg`;

   const goTo = (url) => window.open(url, '_blank');
   return (
      <footer>
         <p>
            © {this_year} <span onClick={() => goTo(author.website)}>Yashas Gowda.</span> All rights reserved.
         </p>
         <ul>
            <li>
               <img onClick={() => goTo(author.linkedin)}
                    src={`${process.env.PUBLIC_URL}/assets/icons/social/linkedin.svg`} alt='linkedin' width={icon_size}
                    height={icon_size}/>
            </li>
            <li>
               <img onClick={() => goTo(author.github)} src={github} alt='github' width={icon_size} height={icon_size}/>
            </li>
            <li>
               <img onClick={() => goTo(author.instagram)}
                    src={`${process.env.PUBLIC_URL}/assets/icons/social/instagram.svg`} alt='instagram'
                    width={icon_size} height={icon_size}/>
            </li>
            <li>
               <img onClick={() => goTo(author.facebook)}
                    src={`${process.env.PUBLIC_URL}/assets/icons/social/facebook.svg`} alt='facebook' width={icon_size}
                    height={icon_size}/>
            </li>
            <li>
               <img onClick={() => goTo(author.twitter)}
                    src={`${process.env.PUBLIC_URL}/assets/icons/social/twitter.svg`} alt='twitter' width={icon_size}
                    height={icon_size}/>
            </li>
            <li>
               <img onClick={() => goTo(author.playstore)}
                    src={`${process.env.PUBLIC_URL}/assets/icons/social/playstore.svg`} alt='playstore'
                    width={icon_size} height={icon_size}/>
            </li>
         </ul>
      </footer>
   );
};

export default memo(Footer);
