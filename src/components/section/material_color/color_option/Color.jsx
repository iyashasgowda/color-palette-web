import React, {memo} from 'react';

const Color = ({item, activeColor, changeColor}) => {
    return (
        <div className='color-item' style={{backgroundColor: item.color}} onClick={() => changeColor(item.id)}>
            {activeColor === item.id && <div className='selector'></div>}
        </div>
    );
};

export default memo(Color);
