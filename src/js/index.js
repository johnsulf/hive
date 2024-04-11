import { getFromLocalStorage } from "./helpers/localStorage.js";

export const userToken = getFromLocalStorage('token');

if (userToken) {
    if (!window.location.href.endsWith('/views/feed/feed.html')) {
        window.location.replace('/views/feed/feed.html');
    }
} else {
    if (!window.location.href.endsWith('/views/auth/auth.html')) {
        window.location.replace('/views/auth/auth.html');
    }
}