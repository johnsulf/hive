import { profile } from '../../api/profile/profile.js';

export function populateFollowers() {
    const followersTab = document.getElementById('followersTab');
        profile.followers.forEach(follower => {
            followersTab.innerHTML += returnFollowCard(follower);;
        });
}

export function populateFollowing() {
    const followingTab = document.getElementById('followingTab');
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