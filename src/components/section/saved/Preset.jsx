import React, {memo, useEffect, useState} from 'react';
import Gradient from '../../comms/Gradient';
import Quadrant from '../../comms/Quadral';

import data from '../../../utils/data.json';
import {hex2rgbArray} from '../../../utils/utils';

const Preset = (props) => {
    const preset_ico = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/preset.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/preset.svg`;
    const [gradient, setGradient] = useState(null);
    const [quadrant, setQuadrant] = useState(null);

    useEffect(() => {
        if (gradient === null && props.preset === 1) setGradient(data.preset_gradients);
        if (quadrant === null && props.preset === 2) setQuadrant(data.preset_quadrants);
    }, [props.preset, gradient, quadrant]);

    return (
        <div className='preset-container'>
            <div className='preset-header'>
                <div className='preset-header-title'>
                    <img src={preset_ico} alt='preset_ico'></img>
                    <p>{props.preset === 1 ? `Preset Gradient` : `Preset Quadrant`}</p>
                </div>

                <div className='preset-options'>
                    <select className='options' defaultValue={props.preset}
                            onChange={(e) => props.changePreset(parseInt(e.target.value))}>
                        <option value='1'>Gradient</option>
                        <option value='2'>Quadrant</option>
                    </select>
                </div>
            </div>

            {props.preset === 1 && gradient !== null ? (
                <div className='preset-gradient-items'>
                    {gradient.map((item, index) => (
                        <Gradient key={index} data={{
                            a_hex: item[0],
                            b_hex: item[1],
                            a_rgb: hex2rgbArray(item[0]),
                            b_rgb: hex2rgbArray(item[1])
                        }} shouldSave={true} shouldRemove={false}/>
                    ))}
                </div>
            ) : props.preset === 2 && quadrant !== null ? (
                <div className='preset-quadrant-items'>
                    {quadrant.map((item, index) => (
                        <Quadrant key={index} data={{
                            a_hex: item[0],
                            b_hex: item[1],
                            c_hex: item[2],
                            d_hex: item[3],
                            a_rgb: hex2rgbArray(item[0]),
                            b_rgb: hex2rgbArray(item[1]),
                            c_rgb: hex2rgbArray(item[2]),
                            d_rgb: hex2rgbArray(item[3])
                        }} shouldSave={true} shouldRemove={false}/>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default memo(Preset);
