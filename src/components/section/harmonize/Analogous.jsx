import React, {memo, useEffect, useState} from 'react';

import {add} from '../../../utils/storage';
import {analogous as analog} from '../../../utils/harmony';
import {copyText, makeToast, renderColorWheel, rgb2hex} from '../../../utils/utils';

const Analogous = (props) => {
    const analogous = analog(props.analogous);
    const analogous_ico = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/analogous.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/analogous.svg`;
    const save_btn = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/save.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/save.svg`;
    const black_stop = props.analogous.checked;

    const [a_rgb, b_rgb, c_rgb] = [props.analogous, analogous.a, analogous.b];
    const [a_hex, b_hex, c_hex] = [rgb2hex(a_rgb.r, a_rgb.g, a_rgb.b), rgb2hex(b_rgb.r, b_rgb.g, b_rgb.b), rgb2hex(c_rgb.r, c_rgb.g, c_rgb.b)];

    const [isDragging, setIsDragging] = useState(false);
    const [isWheelRendered, setIsWheelRendered] = useState(false);

    useEffect(() => {
        const canvas = document.querySelector('.analogous-canvas');
        if (!isWheelRendered) if (renderColorWheel(canvas, canvas.width, black_stop ? 'black' : 'white')) setIsWheelRendered(true);
    }, [black_stop, isWheelRendered]);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
        if (isDragging) {
            const data = e.target.getContext('2d').getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
            props.changeAnalogous({
                r: data.data[0],
                g: data.data[1],
                b: data.data[2],
                checked: black_stop,
            });

            // const dot = document.querySelector('.complement-dot');
            // dot.style.top = e.pageY + 'px';
            // dot.style.left = e.pageX + 'px';
        }
    };
    const handleClick = (e) => {
        setIsDragging(false);
        const data = e.target.getContext('2d').getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1);
        props.changeAnalogous({
            r: data.data[0],
            g: data.data[1],
            b: data.data[2],
            checked: black_stop,
        });

        // const dot = document.querySelector('.complement-dot');
        // dot.style.top = e.pageY + 'px';
        // dot.style.left = e.pageX + 'px';
    };

    return (
        <div className='analogous-container'>
            <div className='analogous-header'>
                <div className='analogous-header-title'>
                    <img src={analogous_ico} alt='analogous_ico'/>
                    <p>Analogous</p>
                </div>
            </div>

            <div className='analogous-body'>
                <div className='colors-container'>
                    <div className='colors'>
                        <div
                            className='color-a'
                            style={{backgroundColor: `rgb(${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b})`}}
                            onDoubleClick={() => {
                                const solid = {
                                    key: a_hex,
                                    hex: a_hex,
                                    rgb: [a_rgb.r, a_rgb.g, a_rgb.b],
                                    timestamp: new Date(),
                                };

                                add('solid', solid, (result) => {
                                    result.onsuccess = () => makeToast(`${a_hex} - ${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b} saved.`);
                                    result.onerror = () => makeToast('Color already exist!');
                                });
                            }}
                        />
                        <div
                            className='color-b'
                            style={{backgroundColor: `rgb(${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b})`}}
                            onDoubleClick={() => {
                                const solid = {
                                    key: b_hex,
                                    hex: b_hex,
                                    rgb: [b_rgb.r, b_rgb.g, b_rgb.b],
                                    timestamp: new Date(),
                                };

                                add('solid', solid, (result) => {
                                    result.onsuccess = () => makeToast(`${b_hex} - ${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b} saved.`);
                                    result.onerror = () => makeToast('Color already exist!');
                                });
                            }}
                        />
                        <div
                            className='color-c'
                            style={{backgroundColor: `rgb(${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b})`}}
                            onDoubleClick={() => {
                                const solid = {
                                    key: c_hex,
                                    hex: c_hex,
                                    rgb: [c_rgb.r, c_rgb.g, c_rgb.b],
                                    timestamp: new Date(),
                                };

                                add('solid', solid, (result) => {
                                    result.onsuccess = () => makeToast(`${c_hex} - ${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b} saved.`);
                                    result.onerror = () => makeToast('Color already exist!');
                                });
                            }}
                        />
                    </div>
                    <div className='codes'>
                        <div className='code'>
                            <p onClick={() => copyText(a_hex).then(() => makeToast(`${a_hex} copied.`))}>
                                {a_hex}
                            </p>
                            <p onClick={() => copyText(`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b}`).then(() => makeToast(`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b} copied.`))}>
                                {`${a_rgb.r}, ${a_rgb.g}, ${a_rgb.b}`}
                            </p>
                        </div>
                        <div className='code'>
                            <p onClick={() => copyText(b_hex).then(() => makeToast(`${b_hex} copied.`))}>
                                {b_hex}
                            </p>
                            <p onClick={() => copyText(`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b}`).then(() => makeToast(`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b} copied.`))}>
                                {`${b_rgb.r}, ${b_rgb.g}, ${b_rgb.b}`}
                            </p>
                        </div>
                        <div className='code'>
                            <p onClick={() => copyText(c_hex).then(() => makeToast(`${c_hex} copied.`))}>
                                {c_hex}
                            </p>
                            <p onClick={() => copyText(`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b}`).then(() => makeToast(`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b} copied.`))}>
                                {`${c_rgb.r}, ${c_rgb.g}, ${c_rgb.b}`}
                            </p>
                        </div>
                    </div>

                    <div className='separator'/>
                    <p className='info'>
                        <b>Analogous:</b> Three colors are side by side to each other on the color wheel. this color
                        combination is versatile but can be overwhelming.
                    </p>

                    <div className='invert-mode'>
                        <p>Invert color stop</p>
                        <input
                            type='checkbox'
                            className='toggle-checkbox'
                            id='solid-alpha-checkbox'
                            checked={black_stop}
                            onChange={() => {
                                props.changeAnalogous({
                                    r: a_rgb.r,
                                    g: a_rgb.g,
                                    b: a_rgb.b,
                                    checked: !black_stop,
                                });
                                setIsWheelRendered(false);
                            }}
                        />
                        <div
                            className='save-analogous'
                            onClick={() => {
                                const analogous = {
                                    key: `${a_hex}${b_hex}${c_hex}`,
                                    a_hex: a_hex,
                                    b_hex: b_hex,
                                    c_hex: c_hex,
                                    a_rgb: [a_rgb.r, a_rgb.g, a_rgb.b],
                                    b_rgb: [b_rgb.r, b_rgb.g, b_rgb.b],
                                    c_rgb: [c_rgb.r, c_rgb.g, c_rgb.b],
                                    timestamp: new Date(),
                                };

                                add('analogous', analogous, (result) => {
                                    result.onsuccess = () => makeToast('Analogous saved.');
                                    result.onerror = () => makeToast('Analogous already exist!');
                                });
                            }}>
                            <img src={save_btn} alt='save_btn'/>
                        </div>
                    </div>
                </div>

                <div className='color-wheel'>
                    <canvas
                        className='analogous-canvas'
                        onMouseMove={(e) => handleMouseMove(e)}
                        onMouseDown={(e) => handleMouseDown(e)}
                        onMouseUp={(e) => handleMouseUp(e)}
                        onClick={(e) => handleClick(e)}/>
                    {/* <img class='complement-dot' src={`${process.env.PUBLIC_URL}/assets/icons/dot.svg`} alt='dot' /> */}
                </div>
            </div>
        </div>
    );
};

export default memo(Analogous);
