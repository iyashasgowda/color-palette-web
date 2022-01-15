import React from 'react';

import app from '../../../../package.json';
import author from '../../../utils/author.json';

const Footer = () => {
   const icon_size = 24;
   const this_year = new Date().getFullYear();

   return (
      <footer>
         <p>
            © {this_year} <span onClick={() => goTo(author.website)}>Yashas Gowda.</span> All rights reserved.
         </p>
         <ul>
            <li>
               <img onClick={() => goTo(author.linkedin)} src={`${app.name}/assets/icons/social/linkedin.svg`} alt='linkedin' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.github)} src={`${app.name}/assets/icons/social/github.svg`} alt='github' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.instagram)} src={`${app.name}/assets/icons/social/instagram.svg`} alt='instagram' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.facebook)} src={`${app.name}/assets/icons/social/facebook.svg`} alt='facebook' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.twitter)} src={`${app.name}/assets/icons/social/twitter.svg`} alt='twitter' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.playstore)} src={`${app.name}/assets/icons/social/playstore.svg`} alt='playstore' width={icon_size} height={icon_size}></img>
            </li>
         </ul>
      </footer>
   );
};

const goTo = (url) => window.open(url, '_blank');
export default Footer;
