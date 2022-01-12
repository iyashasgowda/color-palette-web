import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Frame from './Frame';

const Section = ({ version }) => {
   return (
      <section>
         <Header version={version} />
         <Frame />
         <Footer />
      </section>
   );
};

export default Section;
