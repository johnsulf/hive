import { profile, fetchProfile, isLoggedInUser, isFollowingUser, followOrUnfollowUser } from "../../js/api/profile/profile.js";
import { logout } from "../../js/api/auth/authFunctions.js";
import { formatDateTime } from "../../js/helpers/dateTime.js";
import { buildImage } from "../../js/helpers/postCard.js";

const nameContainer = document.querySelector('#name');
const emailContainer = document.querySelector('#email');
const imageContainer = document.querySelector('#image');
const bioContainer = document.querySelector('#bio');
const userActions = document.querySelector('.user-actions');
const postCountElement = document.getElementById("postCount");
const followerCountElement = document.getElementById("followerCount");
const followingCountElement = document.getElementById("followingCount");
const tabView = document.querySelector('.tab-view');

async function loadProfile() {
    await fetchProfile();
    console.log('Loaded Profile:', profile);
    postCountElement.textContent = profile.posts.length;
    followerCountElement.textContent = profile._count.followers;
    followingCountElement.textContent = profile._count.following;
    nameContainer.innerHTML = profile.name;
    emailContainer.innerHTML = profile.email;
    imageContainer.src = profile.avatar.url;

    populateTabView();

    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
        post.addEventListener("click", function () {
            window.location.href = `../post/post.html?id=${post.id}`;
        });
    });

    if (profile.bio) {
        bioContainer.innerHTML = profile.bio;
    }
    if (isLoggedInUser) {
        userActions.innerHTML = `
        <div class="col my-3">
            <button id="editProfile" class="btn btn-secondary btn-sm text-white">
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
    } else {
        userActions.innerHTML = 
        isFollowingUser ? `
        <div class="col my-3">
            <button id="unfollowUser" class="btn btn-danger btn-sm">
                <i class="bi bi-person-dash"></i>
                Unfollow
            </button>
        </div>
        ` :
        `
        <div class="col my-3">
            <button id="followUser" class="btn btn-primary btn-sm">
                <i class="bi bi-person-plus"></i>
                Follow
            </button>
        </div>
        `;

        isFollowingUser ? document.getElementById('unfollowUser').addEventListener('click', async () => {
           await followOrUnfollowUser('unfollow');
           window.location.reload();
        }) :
        document.getElementById('followUser').addEventListener('click', async () => {
           await followOrUnfollowUser('follow');
           window.location.reload();
        });
    }
}

function populateTabView() {
    profile.posts.forEach(post => {
        console.log('Post:', post);
        tabView.innerHTML += `
        <div id="${post.id}" class="container card position-relative post my-3">
            <div class="row mt-3">
                <a href="../profile/profile.html?name=${post.owner}" class="profile-link col-2">
                    <img src="${profile.avatar["url"]}" alt="${profile.avatar["alt"]}" class="profile-img img-fluid rounded-circle float-end">
                </a>
                <div class="col">
                    <div class="d-flex align-items-end gap-2">
                        <strong>${post.owner}</strong>
                        <small class="text-muted">${formatDateTime(post.created)}</small>
                    </div>
                    <p class="h5 mt-2">${post.title}</p>
                    <p>${post.body === null ? "" : post.body}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    ${buildImage(post.media)}
                </div>
            </div>
            <div class="row justify-content-start">
                <div class="col-2"></div>
                <div class="col-8">
                    <strong>${post.tags}</strong>
                </div>
            </div>
        </div>
    `
    });
}

loadProfile();
