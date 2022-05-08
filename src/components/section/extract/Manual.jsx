import React, {useState} from 'react';

import {add} from '../../../utils/storage';
import {copyText, getCopyIcon, getTextColor, makeToast, rgb2hex, updateCanvas} from '../../../utils/utils';
import Modal from "../../comms/UrlModal";

const Manual = (props) => {
    const manual_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/manual.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/manual.svg`;
    const select_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/select_manual.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/select_manual.svg`;
    const reset = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/reset.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/reset.svg`;
    const image_url = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/link.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/link.svg`;

    const manual_hex = rgb2hex(props.manual.rgb.red, props.manual.rgb.green, props.manual.rgb.blue);
    const manual_rgb = `${props.manual.rgb.red}, ${props.manual.rgb.green}, ${props.manual.rgb.blue}`;
    const rgb_array = [props.manual.rgb.red, props.manual.rgb.green, props.manual.rgb.blue];
    const text_color = getTextColor(rgb_array);
    const copy_icon = getCopyIcon(rgb_array);

    const [modal, setModal] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const changeManual = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updateManual(e.target.result, props.manual.rgb.red, props.manual.rgb.green, props.manual.rgb.blue);
                updateCanvas(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else makeToast('Selected image is not valid!');
    };
    const resetManual = (e) => e.target.value = null;
    const calculateRect = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / (rect.right - rect.left)) * e.target.width;
        const y = ((e.clientY - rect.top) / (rect.bottom - rect.top)) * e.target.height;

        const rgb = e.target.getContext('2d').getImageData(x, y, 1, 1).data;
        updateManual(props.manual.path, rgb[0], rgb[1], rgb[2]);
    }
    const updateManual = (path, red, green, blue) => {
        props.changeManual({
            path,
            rgb: {
                red,
                green,
                blue,
            },
        });
    };
    const handleUrlInput = (proxy_url, url) => {
        setModal(false);

        updateManual(url, props.manual.rgb.red, props.manual.rgb.green, props.manual.rgb.blue);
        updateCanvas(proxy_url);
    }

    const handleDown = () => setIsDragging(true);
    const handleUp = () => setIsDragging(false);
    const handleClick = (e) => calculateRect(e);
    const handleMove = (e) => {
        if (isDragging) calculateRect(e);
    };

    return (
        <div className='manual-section'>
            {modal && <Modal darkMode={props.darkMode} showModal={setModal} inputUrl={handleUrlInput}/>}

            <div className='manual-header'>
                <div className='manual-header-title'>
                    <img
                        src={manual_icon}
                        alt='manual_icon'/>
                    <p>Extract manually</p>
                </div>

                <div className='manual-reset'>
                    <p>Reset</p>
                    <img
                        src={reset}
                        alt='reset'
                        onClick={() => {
                            if (props.manual.path === '') makeToast(`No image is selected to reset!`);
                            else {
                                updateManual('', 0, 0, 0);
                                updateCanvas('');
                                makeToast('Image has been reset');
                            }
                        }}
                    />
                </div>
            </div>

            <div className='manual-body'>
                <div
                    className='manual-img-background'
                    style={{backgroundColor: `rgb(${manual_rgb})`}}
                    onDoubleClick={() => {
                        const solid = {
                            key: manual_hex,
                            hex: manual_hex,
                            rgb: rgb_array,
                            timestamp: new Date(),
                        };

                        add('solid', solid, (result) => {
                            result.onsuccess = () => makeToast(`${manual_hex} - ${rgb_array} saved :)`);
                            result.onerror = () => makeToast('Color already exist!');
                        });
                    }}
                >
                    <div className='manual-img-card'>
                        <input id='manual-file-input' style={{display: 'none'}} type='file' accept='image/*'
                               onChange={(e) => changeManual(e)}
                               onClick={(e) => resetManual(e)}
                        />
                        {props.manual.path === '' &&
                            <img className='manual-select-logo' src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                                 alt='logo'/>}
                        <canvas id='manual-canvas' onClick={(e) => handleClick(e)} onMouseMove={(e) => handleMove(e)}
                                onMouseDown={() => handleDown()} onMouseUp={() => handleUp()}></canvas>

                        <div className='image-url' onClick={(e) => {
                            e.stopPropagation();
                            setModal(true);
                        }}>
                            <img src={image_url} alt='url'/>
                        </div>
                    </div>

                    <div className='manual-color-card'>
                        <div className='manual-color-hex'>
                            <p style={{color: `rgb(${text_color[0]}, ${text_color[1]}, ${text_color[2]})`}}>{manual_hex}</p>
                            <img
                                style={{opacity: 0.8}}
                                src={copy_icon}
                                alt='copy'
                                onClick={() => copyText(manual_hex).then(() => makeToast(`${manual_hex} copied :)`))}
                            />
                        </div>
                        <div className='manual-choose-image'
                             onClick={() => document.querySelector('#manual-file-input').click()}>
                            <img
                                src={select_icon}
                                alt='select'/>
                        </div>
                        <div className='manual-color-rgb'>
                            <p style={{color: `rgb(${text_color[0]}, ${text_color[1]}, ${text_color[2]})`}}>{manual_rgb}</p>
                            <img
                                style={{opacity: 0.8}}
                                src={copy_icon}
                                alt='copy'
                                onClick={() => copyText(manual_rgb).then(() => makeToast(`${manual_rgb} copied :)`))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manual;