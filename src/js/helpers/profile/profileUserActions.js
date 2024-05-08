import { followOrUnfollowUser } from '../../api/profile/profile.js';
import { logout } from '../../api/auth/auth.js';
import { profile } from '../../api/profile/profile.js';

export function setUserActions(isLoggedInUser, isFollowingUser) {    
    const userActions = document.querySelector('.user-actions');
    if (isLoggedInUser) {
        userActions.innerHTML = 
            `<div class="col my-3">
                <button id="editProfile" class="btn btn-secondary btn-sm text-white" data-bs-toggle="modal" data-bs-target="#editProfileModal">
                    <i class="bi bi-pencil"></i>
                    Edit Profile
                </button>
            </div>
            <div class="col-auto my-3">
                <button id="logOut" class="btn btn-danger btn-sm">
                    <i class="bi bi-box-arrow-left"></i>
                    Log out
                </button>
            </div>`;
        attachListeners(isLoggedInUser, isFollowingUser);
    } else {
        userActions.innerHTML = 
        isFollowingUser ? 
            `<div class="col my-3">
                <button id="unfollowUser" class="btn btn-danger btn-sm">
                    <i class="bi bi-person-dash"></i>
                    Unfollow
                </button>
            </div>` 
            :
            `<div class="col my-3">
                <button id="followUser" class="btn btn-primary btn-sm">
                    <i class="bi bi-person-plus"></i>
                    Follow
                </button>
            </div>`;
        attachListeners(isLoggedInUser, isFollowingUser);
    }
}

function attachListeners(isLoggedInUser, isFollowingUser) {
    if (isLoggedInUser) {
        document.getElementById('editProfile').addEventListener('click', () => populateEditModal());
        document.getElementById('logOut').addEventListener('click', () => logout());
    } else {
        isFollowingUser ? 
        document.getElementById('unfollowUser').addEventListener('click', async () => await followOrUnfollowUser('unfollow'))
        :
        document.getElementById('followUser').addEventListener('click', async () => await followOrUnfollowUser('follow'));
    }
}

function populateEditModal() {
    document.getElementById("profileBio").value = profile.bio || '';
    document.getElementById("profileImgUrl").value = profile.avatar["url"] || '';
    document.getElementById("profileImgAlt").value = profile.avatar["alt"] || '';
}