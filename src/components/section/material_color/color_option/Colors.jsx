import React, {memo} from 'react';
import data from '../../../../utils/data.json';
import Color from './Color';

const Colors = ({changeColor, activeColor}) => {
    return (
        <div className='color-holder'>
            {data.colors.map((item) =>
                <Color
                    key={item.id}
                    activeColor={activeColor}
                    item={item}
                    changeColor={changeColor}
                />)
            }
        </div>
    );
};

export default memo(Colors);
