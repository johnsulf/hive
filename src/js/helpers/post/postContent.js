import { buildPostCard } from "../shared/postCard.js";
import { post } from "../../api/post/post.js";

export function populatePost() {
    const postContent = document.getElementById("post");
    postContent.innerHTML += buildPostCard(post, false);
}