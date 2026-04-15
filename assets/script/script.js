'use strict';
const cookieBox = document.getElementById('cookieBox');
const settings = document.getElementById('settings');
//Buttons
const acceptBtn = document.getElementById('acceptBtn');
const settingBtn = document.getElementById('settingsBtn');
const saveBtn = document.getElementById('saveBtn');
//options
const browserCheck = document.getElementById('BrowserCheck');
const osCheck = document.getElementById('osCheck');
const widthCheck = document.getElementById('widthCheck');
const heightCheck = document.getElementById('heightCheck');

const LIFETIME = 20;

function setCookie(name, value, maxAge) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    const options = {
        path: '/',
        SameSite: 'Lax'
    };
    for (let option in options) {
        cookieString += `; ${option}=${options[option]}`;
    }
    if (maxAge) {
        cookieString += `; max-age=${maxAge}`;
    }
    document.cookie = cookieString;
}

