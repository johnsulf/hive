
// just for testings
const userToken = localStorage.getItem('userToken');

if (userToken) {
    // if a user is logged in, redirect to the feed
    window.location.href = './views/feed/feed.html';
} else {
    // if no user is found, redirect to the auth page
    window.location.href = './views/auth/auth.html';
}