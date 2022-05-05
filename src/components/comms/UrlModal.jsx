import React, {useState} from 'react';
import {makeToast} from "../../utils/utils";

const UrlModal = (props) => {
    const close_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/close.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/close.svg`;

    const [url, setUrl] = useState('');
    const validateUrl = () => {
        url.trim() === '' ? makeToast('Image url cannot be empty!') : props.inputUrl(url);
    }

    return (
        <div className="url-modal">
            <div className="modal-container">
                <div className="modal-content">
                    <div className='modal-header'>
                        <h2>Image Url</h2>
                        <img src={close_icon} alt='close' onClick={() => props.showModal(false)}/>
                    </div>

                    <div className='modal-body'>
                        <p>Enter the valid image url to extract colors</p>
                        <input type='text' placeholder="https://..." onChange={e => setUrl(e.target.value)}/>
                    </div>
                </div>

                <div className='modal-button'>
                    <p onClick={() => validateUrl()}>APPLY</p>
                </div>
            </div>
        </div>
    );
};

export default UrlModal;