import { profile, fetchProfile, isLoggedInUser, isFollowingUser } from "../../js/api/profile/profile.js";
import { setUserActions } from "../../js/helpers/profile/profileUserActions.js";
import { displayProfileInfo } from "../../js/helpers/profile/profileInfo.js";
import { populateTabs } from "../../js/helpers/profile/profileTabs.js";
import { populateUserPosts } from "../../js/helpers/profile/profilePosts.js";
import { setPostLink } from "../../js/helpers/post/postLink.js";
import { attachListeners } from "../../js/helpers/profile/profileListeners.js";
import { toggleSpinnerAndView } from "../../js/helpers/profile/profileLoading.js";

document.addEventListener('DOMContentLoaded', async () => await loadProfile());

async function loadProfile() {
        toggleSpinnerAndView(true);

        await fetchProfile();

        displayProfileInfo(profile);
        populateUserPosts(); 
        setUserActions(isLoggedInUser, isFollowingUser);
        populateTabs();
        attachListeners();

        toggleSpinnerAndView(false);
}