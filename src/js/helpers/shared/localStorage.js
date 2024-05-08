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

/**
 * Updates the profile object in local storage.
 * Since its only the bio and avatar properties that can be edited, the rest of the fields are kept as is.
 * @param {Object} data
 * @example
 * const data = {
 *    bio: "This is my new bio",
 *   avatar: {
 *      url: "https://example.com/image.jpg",
 *      alt: "A beautiful image"
 *  }
 * };
 * updateProfileInLocalStorage(data);
 */

export function updateProfileInLocalStorage(data) {
    const profile = getFromLocalStorage('profile');
    saveToLocalStorage('profile', { ...profile, ...data });
}