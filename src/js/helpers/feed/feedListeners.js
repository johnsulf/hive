import { createPostHandler } from "../post/postHandlers.js"; 

export function attachListeners() {
    const newPostForm = document.getElementById("newPostForm");
    newPostForm.addEventListener("submit", async function (event) {
        await createPostHandler(event);
        window.location.reload();
    });
}