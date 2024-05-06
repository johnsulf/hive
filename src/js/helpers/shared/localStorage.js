/**
 * Saves a value to the browsers local storage
 * @param {string} key For example 'profile' or 'token'
 * @param {*} value 
 */

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a value from the browsers local storage
 * @param {string} key For example 'profile' or 'token'
 * @returns {*} 
 */

export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}