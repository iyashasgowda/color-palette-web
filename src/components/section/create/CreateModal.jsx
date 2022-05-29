import React from 'react';
import {makeToast} from '../../../utils/utils';

const Modal = (props) => {
    const close_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/close.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/close.svg`;

    const validateCode = () => {
        const code = document.querySelector('#color_code').value;
        code.trim() === '' ? makeToast('Color code cannot be empty!') : props.inputColor(code, props.is_hex);
    };

    return (
        <div className='create-modal'>
            <div className='modal-container'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h2>{props.is_hex ? 'HEX Code' : props.is_alpha ? 'RGBA Code' : 'RGB Code'}</h2>
                        <img
                            src={close_icon}
                            alt='close'
                            onClick={() => props.closeModal()}
                        />
                    </div>

                    <div className='modal-body'>
                        {props.is_hex ? (
                            <ul>
                                <li>Enable alpha to enter code with alpha value. Ex: #2979FFFF</li>
                                <li>Disable alpha to enter code without alpha value. Ex: #2979FF</li>
                                <li>
                                    Must start HEX values with <b>(#)</b> key only.
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>Enable alpha to enter code with alpha value. Ex: 41, 121, 255, 255</li>
                                <li>Disable alpha to enter code without alpha value. Ex: 41, 121, 255</li>
                                <li>
                                    Must enter RGBA values within 0-255 with <b>(,)</b> separated only.
                                </li>
                            </ul>
                        )}

                        <input
                            type='text'
                            name='color_code'
                            id='color_code'
                            placeholder={props.is_hex ? (props.is_alpha ? '#RRGGBBAA' : '#RRGGBB') : props.is_alpha ? 'R, G, B, A' : 'R, G, B'}
                        />
                    </div>
                </div>

                <div className='modal-button'>
                    <p onClick={() => validateCode()}>APPLY</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
