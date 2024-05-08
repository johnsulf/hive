import { goBack } from "../shared/utils.js";
import { post } from "../../api/post/post.js";
import { loggedInUser } from "../shared/constants.js";

export function populateUserActions() {
    let userActionsHtml = post.author.name === loggedInUser.name ? `
        <div class="d-grid gap-2 d-flex justify-content-end">
            <button id="editBtn" class="btn btn-secondary me-2 text-white" type="button" data-bs-toggle="modal" data-bs-target="#editPostModal">
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
    document.getElementById("postProfileLink").href = `../profile/profile.html?name=${loggedInUser.name}`;
}

function populateEditModal() {
    console.log(post);
    document.getElementById("postTitle").value = post.title || '';
    document.getElementById("postBody").value = post.body || '';
    document.getElementById("postTags").value = post.tags.join(', ') || '';
    document.getElementById("mediaUrl").value = post.media["url"] || '';
    document.getElementById("mediaAlt").value = post.media["alt"] || '';
}