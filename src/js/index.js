import { userToken } from '../js/helpers/constants.js';

// Redirect to the feed page if the user is logged in, otherwise redirect to the login page

if (userToken) {
    if (!window.location.href.endsWith('/views/feed/feed.html')) {
        window.location.replace('/views/feed/feed.html');
    }
} else {
    if (!window.location.href.endsWith('/views/auth/auth.html')) {
        window.location.replace('/views/auth/auth.html');
    }
}