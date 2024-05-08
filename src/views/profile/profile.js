import { profile, fetchProfile, isLoggedInUser, isFollowingUser } from "../../js/api/profile/profile.js";
import { setUserActions } from "../../js/helpers/profile/profileUserActions.js";
import { displayProfileInfo } from "../../js/helpers/profile/profileInfo.js";
import { populateTabs } from "../../js/helpers/profile/profileTabs.js";
import { populateUserPosts } from "../../js/helpers/profile/profilePosts.js";
import { attachListeners } from "../../js/helpers/profile/profileListeners.js";
import { loadingView } from "../../js/helpers/shared/loadingView.js";
import { showToast } from "../../js/helpers/shared/errorToast.js";

document.addEventListener('DOMContentLoaded', async () => await loadProfile());

async function loadProfile() {
        loadingView(true, "profileContent", "profileSpinner");

        await fetchProfile();

        displayProfileInfo(profile);
        populateUserPosts(); 
        setUserActions(isLoggedInUser, isFollowingUser);
        populateTabs();
        attachListeners();

        loadingView(false, "profileContent", "profileSpinner");
}