import React from 'react';
import Menu from './components/Menu';
import Section from './components/Section';

import Package from '../package.json';

const App = () => {
   return (
      <>
         <div className='container'>
            <Menu />
            <Section version={Package.version} />
         </div>
      </>
   );
};

export default App;
