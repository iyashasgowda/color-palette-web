import React from 'react';
import author from '../utils/author.json';

/** Icons */
import linkedin from '../assets/icons/social/linkedin.svg';
import github from '../assets/icons/social/github.svg';
import instagram from '../assets/icons/social/instagram.svg';
import facebook from '../assets/icons/social/facebook.svg';
import twitter from '../assets/icons/social/twitter.svg';
import playstore from '../assets/icons/social/playstore.svg';

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
               <img onClick={() => goTo(author.linkedin)} src={linkedin} alt='linkedin' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.github)} src={github} alt='github' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.instagram)} src={instagram} alt='instagram' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.facebook)} src={facebook} alt='facebook' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.twitter)} src={twitter} alt='twitter' width={icon_size} height={icon_size}></img>
            </li>
            <li>
               <img onClick={() => goTo(author.playstore)} src={playstore} alt='playstore' width={icon_size} height={icon_size}></img>
            </li>
         </ul>
      </footer>
   );
};

const goTo = (url) => window.open(url, '_blank');
export default Footer;
