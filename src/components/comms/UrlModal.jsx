import React, {memo, useState} from 'react';
import {makeToast} from "../../utils/utils";

const UrlModal = (props) => {
    const close_icon = props.darkMode ? `${process.env.PUBLIC_URL}/assets/icons/dark/close.svg` : `${process.env.PUBLIC_URL}/assets/icons/light/close.svg`;

    const [url, setUrl] = useState('');
    const [gettingImage, setGettingImage] = useState(false);

    const validateUrl = () => {
        if (url.trim() !== '') {
            setGettingImage(true);
            const btn = document.querySelector('#apply-btn');
            btn.innerHTML = 'Hold on...'
            const proxy_url = `https://cors-anywhere.herokuapp.com/${url}`;

            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => props.inputUrl(proxy_url, url);
            image.onerror = () => {
                setGettingImage(false);
                makeToast('Image url is invalid!');
            }
            image.src = proxy_url;
        } else {
            setGettingImage(false);
            makeToast('Image url cannot be empty!');
        }
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
                    <p id='apply-btn' onClick={() => {
                        if (gettingImage) makeToast('Please wait while we fetch the image!');
                        else validateUrl();
                    }}>APPLY</p>
                </div>
            </div>
        </div>
    );
};

export default memo(UrlModal);