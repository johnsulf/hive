import { profile, fetchProfile, isLoggedInUser, isFollowingUser, followOrUnfollowUser, editProfile } from "../../js/api/profile/profile.js";
import { logout } from "../../js/api/auth/auth.js";
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
const postsTab = document.getElementById('postsTab');
const followersTab = document.getElementById('followersTab');
const followingTab = document.getElementById('followingTab');


async function loadProfile() {
    await fetchProfile();
    console.log('Loaded Profile:', profile);
    postCountElement.textContent = profile.posts.length;
    followerCountElement.textContent = profile._count.followers;
    followingCountElement.textContent = profile._count.following;
    nameContainer.innerHTML = profile.name;
    emailContainer.innerHTML = profile.email;
    emailContainer.href = `mailto:${profile.email}`;
    imageContainer.src = profile.avatar.url;

    populatePosts();

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
        </div>
        `;
        document.getElementById('editProfile').addEventListener('click', () => {
            populateEditModal();
        });

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

loadProfile();

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#profileTabs .nav-link');
    const tabContents = document.querySelectorAll('.tab-content > div');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('show', 'active'));

            this.classList.add('active');
            const activeTab = this.getAttribute('data-tab');

            const contentToShow = document.getElementById(activeTab);
            if (contentToShow) {
                contentToShow.classList.add('show', 'active');
            }

            switch(activeTab) {
                case 'postsTab':
                    populatePosts(); 
                    break;
                case 'followersTab':
                    populateFollowers(); 
                    break;
                case 'followingTab':
                    populateFollowing(); 
                    break;
            }
        });
    });

    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const bio = document.getElementById('profileBio').value;
        const avatarUrl = document.getElementById('profileImgUrl').value;
        const avatarAlt = document.getElementById('profileImgAlt').value;
        const data = {
            bio: bio,
            avatar: {
                url: avatarUrl,
                alt: avatarAlt
            }
        };
        await editProfile(data);
        window.location.reload();
    });
});

function populatePosts() {
    postsTab.innerHTML = '';
    profile.posts.forEach(post => {
        console.log('Post:', post);
        postsTab.innerHTML += `
        <div id="${post.id}" class="container card position-relative post my-2 py-3">
            <div class="row">
                <a href="../profile/profile.html?name=${post.owner}" class="profile-link col-2">
                    <img src="${profile.avatar.url}" alt="${profile.avatar.alt}" class="profile-img img-fluid rounded-circle float-end">
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
                    ${post.tags.map(tag => `<span class="badge bg-primary text-black me-1">#${tag}</span>`).join('')}
                </div>
            </div>
        </div>`;
    });
}


function populateFollowers() {
    profile.followers.forEach(follower => {
        followersTab.innerHTML += returnFollowCard(follower);;
    });
}

function populateFollowing() {
    profile.following.forEach(follower => {
    followingTab.innerHTML += returnFollowCard(follower);
    });
}

function returnFollowCard(follower) {
    return `
        <a href="../profile/profile.html?name=${follower.name}" class="card my-2 p-2 ">
            <div class="d-flex align-items-center justify-content-start gap-2">
                <img src="${follower.avatar["url"]}" alt="${follower.avatar["alt"]}" class="profile-img img-fluid rounded-circle">
                <strong>${follower.name}</strong>
            </div>
        </a>
    `;
}

function populateEditModal() {
    document.getElementById("profileBio").value = profile.bio || '';
    document.getElementById("profileImgUrl").value = profile.avatar["url"] || '';
    document.getElementById("profileImgAlt").value = profile.avatar["alt"] || '';
}