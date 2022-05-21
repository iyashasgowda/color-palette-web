import React, {memo, useState} from 'react';
import Item from '../../comms/SwatchItem';
import Modal from '../../comms/UrlModal';

import {getSwatches, makeToast} from '../../../utils/utils';
import {add} from '../../../utils/storage';

const Swatches = (props) => {
    const swatch_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/swatch.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/swatch.svg`;
    const reset = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/reset.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/reset.svg`;
    const save_image = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/save.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/save.svg`;
    const image_url = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/light/link.svg` : `${process.env.PUBLIC_URL}/assets/icons/dark/link.svg`;

    const [modal, setModal] = useState(false);
    const is_active = props.swatch.path !== '';
    const changeSwatch = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) =>
                getSwatches(e.target.result, (swatches) => {
                    props.changeSwatch({path: e.target.result, swatches});
                    makeToast(`${swatches.length} swatches extracted.`);
                });
            reader.readAsDataURL(e.target.files[0]);
        } else makeToast('Selected image is not valid!');
    };
    const resetSwatch = (e) => e.target.value = null;

    const handleUrlInput = (data) => {
        setModal(false);

        getSwatches(data, (swatches) => {
            props.changeSwatch({path: data, swatches});
            makeToast(`${swatches.length} colors extracted.`);
        });
    }

    return (
        <div className='swatch-section'>
            {modal && <Modal darkMode={props.darkMode} showModal={setModal} inputUrl={handleUrlInput}/>}

            <div className='swatch-header'>
                <div className='swatch-header-title'>
                    <img
                        src={swatch_icon}
                        alt='swatch_icon'/>
                    <p>Extract swatches</p>
                </div>

                <div className='swatch-reset'>
                    <p>Reset</p>
                    <img
                        src={reset}
                        alt='reset'
                        onClick={() => {
                            if (!is_active) makeToast(`No swatch extracted to reset!`);
                            else {
                                props.changeSwatch({path: '', swatches: []});
                                makeToast('Swatch has been reset');
                            }
                        }}
                    />
                </div>
            </div>

            <div className='swatch-body'>
                <div className='swatch-img-chooser'
                     onClick={() => document.querySelector('#swatch-file-input').click()}>
                    <input id='swatch-file-input' style={{display: 'none'}} type='file' accept='image/*'
                           onChange={(e) => changeSwatch(e)}
                           onClick={(e) => resetSwatch(e)}
                    />
                    {!is_active && (
                        <div className='logo-info'>
                            <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='logo'/>
                            <p>Choose Image</p>
                        </div>
                    )}
                    <img id='selected-image' className='selected-image' src={props.swatch.path} alt=''/>
                    {is_active && (
                        <div
                            className='save-swatch'
                            onClick={(e) => {
                                e.stopPropagation();
                                const swatch = {
                                    key: props.swatch.path.length > 32 ? props.swatch.path.slice(props.swatch.path.length - 32) : props.swatch.path,
                                    path: props.swatch.path,
                                    swatches: props.swatch.swatches,
                                    timestamp: new Date(),
                                };

                                add('swatch', swatch, (result) => {
                                    result.onsuccess = () => makeToast('Swatch saved.');
                                    result.onerror = () => makeToast('Swatch already exist!');
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

                <div className='extracted-swatches'>
                    {props.swatch.swatches.map((item, index) => (
                        <Item key={index} name={item.name} rgb={item.rgb} shouldSave={true}/>
                    ))}
                </div>

                {!is_active && (
                    <div className='swatch-extract-info'>
                        <p>Guide:</p>
                        <ul>
                            <li>Extracted swatches from the image will appear here.</li>
                            <li>Various shades of swatches will be extracted based on the color availability in the
                                selected image.
                            </li>
                            <li>Maximum 7 swatches can be extracted, such as Dominant, Vibrant, Vibrant light, Vibrant
                                dark, Muted, Muted light, Muted dark.
                            </li>
                            <li>You can copy HEX or RGB color code by clicking on the copy button.</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Swatches);
