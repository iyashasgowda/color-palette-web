import React, {memo} from 'react';
import Shade from './Shade';
import {makeToast} from '../../../../utils/utils';
import data from '../../../../utils/data.json';

const Shades = (props) => {
    makeToast(data.colors.find((item) => item.id === props.activeColor).name.toUpperCase())
    return (
        <div className='color-shades'>
            {data.shades
                .find((item) => item.color_id === props.activeColor)
                ?.data.map((shade) => (
                    <Shade key={shade.id} shade={shade} darkMode={props.darkMode}/>
                ))}
        </div>
    );
};

export default memo(Shades);
