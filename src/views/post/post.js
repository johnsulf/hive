import { getPost } from "../../js/api/post/post.js";
import { loadingView } from "../../js/helpers/shared/loadingView.js";
import { populateUserActions } from "../../js/helpers/post/postUserActions.js";
import { attachListeners } from "../../js/helpers/post/postListeners.js";
import { populatePost } from "../../js/helpers/post/postContent.js";

document.addEventListener("DOMContentLoaded", async () => await loadPost());

async function loadPost() {
    loadingView(true, "postContent", "postSpinner");
    
    await getPost();
    
    populatePost();
    populateUserActions();
    attachListeners();

    loadingView(false, "postContent", "postSpinner");
}