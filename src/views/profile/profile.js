import { profile, fetchProfile, isLoggedInUser } from "../../js/api/profile/profile.js";
import { logout } from "../../js/api/auth/authFunctions.js";

const nameContainer = document.querySelector('#name');
const emailContainer = document.querySelector('#email');
const imageContainer = document.querySelector('#image');
const bioContainer = document.querySelector('#bio');
const userActions = document.querySelector('.user-actions');

async function loadProfile() {
    await fetchProfile();
    console.log('Loaded Profile:', profile);
    nameContainer.innerHTML = profile.name;
    emailContainer.innerHTML = profile.email;
    imageContainer.src = profile.avatar.url;
    if (profile.bio) {
        bioContainer.innerHTML = profile.bio;
    }
    if (isLoggedInUser) {
        userActions.innerHTML = `
        <div class="col my-3">
            <button id="editProfile" class="btn btn-secondary btn-sm">
                <i class="bi bi-pencil"></i>
                Edit Profile
            </button>
        </div>
        <div class="col-auto my-3">
            <button id="logOut" class="btn btn-danger btn-sm">
                <i class="bi bi-box-arrow-left"></i>
                Log out
            </button>
        </div>
        `;
        document.getElementById('logOut').addEventListener('click', () => {
            logout();
        });
    }
}

loadProfile();
