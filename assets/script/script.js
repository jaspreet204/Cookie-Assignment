'use strict';
const cookieBox = document.getElementById('cookieBox');
const settings = document.getElementById('settings');
//Buttons
const acceptBtn = document.getElementById('acceptbtn');
const settingBtn = document.getElementById('settingsbtn');
const saveBtn = document.getElementById('saveBtn');
//options
const browserCheck = document.getElementById('browserCheck');
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

function getCookie() {
    if(document.cookie) {
    const cookies = document.cookie.split(';');
    console.log(cookies);

 for(let i = 0; i < cookies.length; i++){
     let trimmedCookie = cookies[i].trim();
        
        let key = decodeURIComponent(trimmedCookie.split('=')[0]); 
        let value = decodeURIComponent(trimmedCookie.split('=')[1]);
           console.log(`Key: ${key}, Value: ${value}`);
    }
  }

}

function getCookieValue(name) {
    if (document.cookie) {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let trimmedCookie = cookies[i].trim();

            let key = decodeURIComponent(trimmedCookie.split('=')[0]);
            let value = decodeURIComponent(trimmedCookie.split('=')[1]);

            if (key === name) {
                return value;
            }
        }
    }

    return null;
}

function getOS() {
    let OsInfo = navigator.userAgent;

    let OS = [
        { name: 'Windows', key: 'Win' },
        { name: 'MacOS', key: 'Mac' },
        { name: 'Linux', key: 'Linux' }
    ];

    for (let i = 0; i < OS.length; i++) {
        if (OsInfo.indexOf(OS[i].key) !== -1) {
            return OS[i].name;
        }
    }

    return 'Not Available';
}

function getBrowser() {
    let BrowserInfo = navigator.userAgent;

    let browsers = [
        { name: 'Microsoft Edge', key: 'Edg' },
        { name: 'Google Chrome', key: 'Chrome' },
        { name: 'Firefox', key: 'Firefox' },
        { name: 'Safari', key: 'Safari' }
    ];

    for (let i = 0; i < browsers.length; i++) {
        if (BrowserInfo.indexOf(browsers[i].key) !== -1) {
            return browsers[i].name;
        }
    }

    return 'Not Available';
}

function toSettings() {
    cookieBox.style.display = 'none';
    settings.style.display = 'flex';
}

settingBtn.onclick = toSettings;

function acceptAll() {
    setCookie('browser', getBrowser(), LIFETIME);
    setCookie('os', getOS(), LIFETIME);
    setCookie('screenWidth', screen.width, LIFETIME);
    setCookie('screenHeight', screen.height, LIFETIME);
    setCookie('userConsent', 'accepted', LIFETIME);
    cookieBox.style.display = 'none';
}

acceptBtn.onclick = acceptAll;

function saveChoices() {
    if (browserCheck.checked) {
        setCookie('browser', getBrowser(), LIFETIME);
    }
    if (osCheck.checked) {
        setCookie('os', getOS(), LIFETIME);
    }
    if (widthCheck.checked) {
        setCookie('screenWidth', screen.width, LIFETIME);
    }
    if (heightCheck.checked) {
        setCookie('screenHeight', screen.height, LIFETIME);
    }
    setCookie('userConsent', 'saved', LIFETIME);
    settings.style.display = 'none';
}

saveBtn.onclick = saveChoices;

window.onload = function () {
    setTimeout(function () {
       if (!getCookieValue('userConsent')) {
            cookieBox.style.display = 'flex';
        } 
    }, 1000);
};