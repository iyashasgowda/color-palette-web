import React from 'react';

const Color = ({ item }) => {
   return <div className='color-item' style={{ backgroundColor: item.color }}></div>;
};

export default Color;
