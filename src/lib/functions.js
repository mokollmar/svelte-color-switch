import { STORAGE_KEY } from './constants'

// We can only store strings in local storage

function ex_getCurrentColor({ css }) {
    return getComputedStyle(document.documentElement).getPropertyValue(css);
}

function ex_getStoredColor({ css }) {
    let stored_data = localStorage.getItem(STORAGE_KEY);
    if (stored_data) {
        try {
            stored_data = JSON.parse(stored_data);
            console.log("The value is: " + stored_data[css])
            return stored_data[css]
        } catch (_) { return undefined }
    } else {
        return undefined;
    }
}

function ex_updateColor({ css, value }) {
    document.documentElement.style.setProperty(css, value);

    // Get the old data:
    let store_value = { [css]: value } // the value that will be stored
    let stored_data = localStorage.getItem(STORAGE_KEY); // the received storage

    // add the new to the old data
    try {
        stored_data = JSON.parse(stored_data);
        store_value = Object.assign(stored_data, store_value);
    } catch (_) { }

    // Store
    console.log("will store: " + JSON.stringify(store_value))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store_value));
}

function ex_getColorDelayPresence() {
    let stored_data = localStorage.getItem("ColorDelay");
    if (stored_data) {
        localStorage.removeItem("ColorDelay");
        return true;
    }
    return false;
}


export { ex_getCurrentColor, ex_getStoredColor, ex_updateColor, ex_getColorDelayPresence };