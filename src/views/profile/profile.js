import { profile, fetchProfile, isLoggedInUser } from "../../js/api/profile/profile.js";

const nameContainer = document.querySelector('#name');
const emailContainer = document.querySelector('#email');
const imageContainer = document.querySelector('#image');
const bioContainer = document.querySelector('#bio');

async function loadProfile() {
    await fetchProfile();
    console.log('Loaded Profile:', profile);
    nameContainer.innerHTML = profile.name;
    emailContainer.innerHTML = profile.email;
    imageContainer.src = profile.avatar.url;
    if (profile.bio) {
        bioContainer.innerHTML = profile.bio;
    }
}

loadProfile();
