import React from 'react';

import {copyText, hex2rgbArray, makeToast} from '../../../../utils/utils.js';
import {add} from '../../../../utils/storage.js';

const Shade = (props) => {
    return (
        <div className='color-shade'>
            <div
                style={{backgroundColor: props.shade.code}}
                onDoubleClick={() => {
                    const solid = {
                        key: props.shade.code,
                        hex: props.shade.code,
                        rgb: hex2rgbArray(props.shade.code),
                        timestamp: new Date(),
                    };

                    add('solid', solid, (result) => {
                        result.onsuccess = () => makeToast(`${props.shade.code} saved.`);
                        result.onerror = () => makeToast('Color already exist!');
                    });
                }}>
            </div>
            <div>
                <div>
                    <p>{props.shade.name}</p>
                    <p>{props.shade.code.toUpperCase()}</p>
                </div>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/copy_large.svg`}
                    alt='copy'
                    onClick={() => copyText(props.shade.code).then(() => makeToast(`${props.shade.code.toUpperCase()} copied.`))}>
                </img>
            </div>
        </div>
    );
};

export default Shade;
