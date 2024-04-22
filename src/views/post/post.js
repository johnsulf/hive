import { post, getPost } from "../../js/api/post/post.js";
import { formatDateTime } from "../../js/helpers/dateTime.js";
import { loggedInUser } from "../../js/helpers/constants.js";
import { deletePost } from "../../js/api/post/post.js";

async function loadPost() {
    await getPost();
    console.log("Loaded Post:", post);
}

function populateUserActions() {
    let userActionsHtml = post.author.name === loggedInUser.name ? `
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-secondary me-md-2" type="button">
                <i class="bi bi-pencil-fill"></i>
                Edit
            </button>
            <button id="deleteBtn" class="btn btn-danger" type="button">
                <i class="bi bi-x-circle-fill"></i>
                Delete
            </button>
        </div>
    ` : "";
        const userActionsContainer = document.getElementById("userActions");
        userActionsContainer.innerHTML = `
        <div class="d-grid gap-2 d-md-flex justify-content-md-between">
            <a class="btn me-md-2" type="button" href="../feed/feed.html">
                <i class="bi bi-arrow-left-circle"></i>
                Back
            </a>
            ${userActionsHtml}
        </div>
        `;
}

function populatePost() {
    const postContainer = document.getElementById("post");
    let mediaImageTag = post.media && post.media.url ?
        `<img src="${post.media.url}" alt="${post.media.alt}" class="img-fluid post-img mb-3">` : "";
    // create reactionHtml. post.reactions is an array of objects with properties cound and symbol
    let reactionHtml = post.reactions.map(reaction => `
        <div class="col-1 d-flex fw-bold gap-1">
            <p>${reaction.count}</p>
            <p>${reaction.symbol}</p>
        </div>
    `).join("");

    postContainer.innerHTML = `
        <div class="container card my-3 position-relative">
            <div class="row">
                <a href="../profile/profile.html?name=${post.author.name}" class="profile-link col-2 my-3">
                    <img src="${post.author.avatar["url"]}" alt="${post.author.avatar["alt"]}" class="profile-img img-fluid rounded-circle float-end">
                </a>
                <div class="col my-2">
                    <p>
                        <strong>${post.author.name}</strong>
                        <small class="text-muted">&nbsp;&nbsp;${formatDateTime(post.created)}</small>
                    </p>
                    <p class="m-0 h5">${post.title}</p>
                    <p>${post.body}</p>
                    ${mediaImageTag}
                    <strong>${post.tags}</strong>
                </div>
            </div>
            <div class="row justify-content-start">
                <div class="col-2"></div>
                ${reactionHtml}
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadPost();
    populatePost();
    populateUserActions();

    if (post.author.name === loggedInUser.name) {
        const deleteButton = document.querySelector("#deleteBtn");
        deleteButton.addEventListener("click", async function () {
            await deletePost();
            window.location.href = "../feed/feed.html";
        });
    }
});