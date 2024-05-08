import { post } from "../../api/post/post.js";
import { loggedInUser } from "../shared/constants.js";
import { deletePost } from "../../api/post/post.js";
import { updatePostHandler, postCommentHandler } from "./postHandlers.js";

export function attachListeners() {    
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
