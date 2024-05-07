import { profile, fetchProfile, isLoggedInUser, isFollowingUser } from "../../js/api/profile/profile.js";
import { goBack } from "../../js/helpers/shared/utils.js";
import { updateProfileHandler } from "../../js/helpers/profile/profileHandlers.js";
import { setUserActions } from "../../js/helpers/profile/profileUserActions.js";
import { displayProfileInfo } from "../../js/helpers/profile/profileInfo.js";
import { populateTabs } from "../../js/helpers/profile/profileTabs.js";
import { populateUserPosts } from "../../js/helpers/profile/profilePosts.js";

// selectors
const profileContent = document.getElementById('profileContent');
const profileSpinner = document.getElementById('profileSpinner');
const imageContainer = document.getElementById('image');

// event listeners
document.addEventListener('DOMContentLoaded', async function() {
    await loadProfile();
    populateTabs();
    attachListeners();
});

function attachListeners() {
    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', async (e) => await updateProfileHandler(e));

    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
        post.addEventListener("click", () => window.location.href = `../post/post.html?id=${post.id}`);
    });

    const backButton = document.getElementById("backBtn");
    backButton.addEventListener("click", () => goBack());

    const zoomProfileIimgSrc = document.getElementById("zoomProfileImg");
    imageContainer.addEventListener("click", () => zoomProfileIimgSrc.src = profile.avatar.url);
}

async function loadProfile() {
    profileSpinner.style.display = 'block';
    await fetchProfile();
    displayProfileInfo(profile);
    populateUserPosts(); 
    setUserActions(isLoggedInUser, isFollowingUser);
    profileSpinner.style.display = 'none';
    profileContent.style.display = 'block';
}