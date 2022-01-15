import React from 'react';
import app from '../../../package.json';

const Item = ({ item, activeMenu, changeMenu }) => {
   const path = activeMenu === item.id ? `${app.name}/assets/icons/on/${item.name}.svg` : `${app.name}/assets/icons/off/${item.name}.svg`;
   const style = activeMenu === item.id ? `${item.name}-item` : '';

   return (
      <li className={style}>
         <img src={path} alt={item.name} onClick={() => changeMenu(item.id)}></img>
      </li>
   );
};

export default Item;
