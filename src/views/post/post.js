import { post, getPost, postComment } from "../../js/api/post/post.js";
import { loggedInUser } from "../../js/helpers/constants.js";
import { deletePost, updatePost } from "../../js/api/post/post.js";
import { buildPostCard } from "../../js/helpers/postCard.js";

async function loadPost() {
    await getPost();
    console.log("Loaded Post:", post);
}

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
            <a class="btn me-2" type="button" href="../feed/feed.html">
                <i class="bi bi-arrow-left-circle"></i>
                Back
            </a>
            ${userActionsHtml}
        </div>
    `;

    document.getElementById("editBtn")?.addEventListener("click", populateEditModal);
}

function populatePost() {
    const postContainer = document.getElementById("post");
    postContainer.innerHTML = buildPostCard(post, false);
}

function populateEditModal() {
    document.getElementById("postTitle").value = post.title || '';
    document.getElementById("postBody").value = post.body || '';
    document.getElementById("postTags").value = post.tags.join(', ') || '';
    document.getElementById("mediaUrl").value = post.mediaUrl || '';
    document.getElementById("mediaAlt").value = post.mediaAlt || '';
}

document.addEventListener("DOMContentLoaded", async function () {

    const postSpinner = document.getElementById("postSpinner");
    postSpinner.style.display = 'block';
    await loadPost();
    postSpinner.style.display = 'none';
    populatePost();
    populateUserActions();

    if (post.author.name === loggedInUser.name) {
        const deleteButton = document.querySelector("#deleteBtn");
        deleteButton.addEventListener("click", async function () {
            await deletePost();
            window.location.href = "../feed/feed.html";
        });
    }

    const editPostForm = document.querySelector("#editPostForm");
    editPostForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        await updatePost(e);
        window.location.reload();
    });

    const commentForm = document.querySelector(".comment-form");
    commentForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        await postComment(e);
        window.location.reload();
    });
});