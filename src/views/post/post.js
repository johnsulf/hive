import { post, getPost } from "../../js/api/post/post.js";
import { loggedInUser } from "../../js/helpers/shared/constants.js";
import { deletePost } from "../../js/api/post/post.js";
import { buildPostCard } from "../../js/helpers/post/postCard.js";
import { postCommentHandler, updatePostHandler } from "../../js/helpers/post/postHandlers.js";
import { goBack } from "../../js/helpers/shared/utils.js";

const postProfileLink = document.getElementById("postProfileLink");
const postSpinner = document.getElementById("postSpinner");
const postContainer = document.getElementById("post");

document.addEventListener("DOMContentLoaded", async function () {
    postProfileLink.href = `../profile/profile.html?name=${loggedInUser.name}`;
    postSpinner.style.display = 'block';
    await getPost();
    postSpinner.style.display = 'none';
    postContainer.innerHTML = buildPostCard(post, false);
    populateUserActions();
    attachEventListeners();

});

function populateUserActions() {
    let userActionsHtml = post.author.name === loggedInUser.name ? `
        <div class="d-grid gap-2 d-flex justify-content-end">
            <button id="editBtn" class="btn btn-secondary me-2" type="button" data-bs-toggle="modal" data-bs-target="#editPostModal">
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
        <div class="gap-2 d-flex justify-content-between">
            <button id="backBtn" class="btn me-2" type="button">
                <i class="bi bi-arrow-left-circle"></i>
                Back
            </button>
            ${userActionsHtml}
        </div>
    `;

    document.getElementById("backBtn").addEventListener("click", goBack);
    document.getElementById("editBtn")?.addEventListener("click", populateEditModal);
}

function attachEventListeners() {    
    if (post.author.name === loggedInUser.name) {
        const deleteButton = document.querySelector("#deleteBtn");
        deleteButton.addEventListener("click", async function () {
            await deletePost();
            window.location.href = "../feed/feed.html";
        });
    }

    const editPostForm = document.querySelector("#editPostForm");
    editPostForm.addEventListener("submit", async function (e) {
        await updatePostHandler(e);
        window.location.reload();
    });

    const commentForm = document.querySelector(".comment-form");
    commentForm.addEventListener("submit", async function (e) {
        await postCommentHandler(e);
        window.location.reload();
    });
}

function populateEditModal() {
    document.getElementById("postTitle").value = post.title || '';
    document.getElementById("postBody").value = post.body || '';
    document.getElementById("postTags").value = post.tags.join(', ') || '';
    document.getElementById("mediaUrl").value = post.mediaUrl || '';
    document.getElementById("mediaAlt").value = post.mediaAlt || '';
}
