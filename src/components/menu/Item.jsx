import React, {memo} from 'react';

const Item = (props) => {
   const path = props.darkMode
      ? props.activeMenu === props.item.id
         ? `${process.env.PUBLIC_URL}/assets/icons/dark/${props.item.name}.svg`
         : `${process.env.PUBLIC_URL}/assets/icons/off/${props.item.name}.svg`
      : props.activeMenu === props.item.id
      ? `${process.env.PUBLIC_URL}/assets/icons/light/${props.item.name}.svg`
      : `${process.env.PUBLIC_URL}/assets/icons/off/${props.item.name}.svg`;
   const style = props.activeMenu === props.item.id ? `${props.item.name}-item` : '';

   return (
      <li className={style}>
         <img src={path} alt={props.item.name} onClick={() => props.changeMenu(props.item.id)}></img>
      </li>
   );
};

export default memo(Item);
