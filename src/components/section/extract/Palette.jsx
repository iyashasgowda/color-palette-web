import React, {useState} from 'react';
import Item from '../../comms/Solid';

import {getPalette, makeToast, rgb2hex, validateUrl} from '../../../utils/utils';
import {add} from '../../../utils/storage';
import Modal from "../../comms/UrlModal";

const Palette = (props) => {
    const palette_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/palette.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/palette.svg`;
    const reset = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/reset.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/reset.svg`;
    const save_image = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/save.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/save.svg`;
    const image_url = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/link.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/link.svg`;

    const [modal, setModal] = useState(false);

    const is_active = props.palette.path !== '';
    const changePalette = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) =>
                getPalette(e.target.result, 16, (palette) => {
                    props.changePalette({path: e.target.result, palette});
                    makeToast(`${palette.swatches.length} colors extracted :)`);
                });
            reader.readAsDataURL(e.target.files[0]);
        } else makeToast('Selected image is not valid!');
    };
    const resetPalette = (e) => e.target.value = null;
    const handleUrlInput = (url) => {
        validateUrl(url, (valid) => {
            if (valid) {
                setModal(false);

                getPalette(url, 16, (palette) => {
                    props.changePalette({path: url, palette});
                    makeToast(`${palette.swatches.length} colors extracted :)`);
                });
            } else makeToast('Image url is not valid!');
        })
    }

    return (
        <div className='palette-section'>
            {modal && <Modal darkMode={props.darkMode} showModal={setModal} inputUrl={handleUrlInput}/>}

            <div className='palette-header'>
                <div className='palette-header-title'>
                    <img
                        src={palette_icon}
                        alt='palette_icon'/>
                    <p>Extract palette</p>
                </div>

                <div className='palette-reset'>
                    <p>Reset</p>
                    <img
                        src={reset}
                        alt='reset'
                        onClick={() => {
                            if (!is_active) makeToast(`No palette extracted to reset!`);
                            else {
                                props.changePalette({path: '', palette: []});
                                makeToast('Palette has been reset');
                            }
                        }}
                    />
                </div>
            </div>

            <div className='palette-body'>
                <div className='palette-img-chooser'
                     onClick={() => document.querySelector('#palette-file-input').click()}>
                    <input id='palette-file-input' style={{display: 'none'}} type='file' accept='image/*'
                           onChange={(e) => changePalette(e)}
                           onClick={(e) => resetPalette(e)}
                    />
                    {!is_active && (
                        <div className='logo-info'>
                            <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo'/>
                            <p>Choose Image</p>
                        </div>
                    )}
                    <img id='selected-image' className='selected-image' src={props.palette.path} alt=''/>
                    {is_active && (
                        <div
                            className='save-palette'
                            onClick={(e) => {
                                e.stopPropagation();

                                const palette = {
                                    key: props.palette.path.length > 32 ? props.palette.path.slice(props.palette.path.length - 32) : props.palette.path,
                                    path: props.palette.path,
                                    palette: props.palette.palette.swatches.map((item) => [item.red, item.green, item.blue]),
                                    timestamp: new Date(),
                                };

                                add('palette', palette, (result) => {
                                    result.onsuccess = () => makeToast('Palette saved :)');
                                    result.onerror = () => makeToast('Palette already exist!');
                                });
                            }}
                        >
                            <img src={save_image} alt='save'/>
                        </div>
                    )}
                    <div className='image-url' onClick={(e) => {
                        e.stopPropagation();
                        setModal(true);
                    }}>
                        <img src={image_url} alt='url'/>
                    </div>
                </div>

                <div
                    className='extracted-palette'>{props.palette.palette.swatches !== undefined ? props.palette.palette.swatches.map((item, index) =>
                    <Item key={index} data={{
                        rgb: item.getRGB(),
                        hex: rgb2hex(item.getRGB()[0], item.getRGB()[1], item.getRGB()[2])
                    }} shouldSave={true}/>) : <></>}
                </div>

                {!is_active && (
                    <div className='palette-extract-info'>
                        <p>Guide:</p>
                        <ul>
                            <li>Extracted palettes from the image will appear here.</li>
                            <li>Various shades of palettes will be extracted based on the color availability in the
                                selected image.
                            </li>
                            <li>You can set the maximum colors to be extracted from the image in the settings screen.
                            </li>
                            <li>You can copy HEX or RGB color code by clicking on the copy button.</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Palette;
