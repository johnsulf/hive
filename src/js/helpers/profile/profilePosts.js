import { buildImage, formatDateTime } from "../shared/postCard.js";
import { profile } from "../../api/profile/profile.js";

export function populateUserPosts() {
    const postsTab = document.getElementById('postsTab');
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