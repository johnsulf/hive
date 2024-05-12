import { API_KEY, BASE_URL, POSTS_URL, SOCIAL_URL } from "../../helpers/shared/constants.js";
import { getFromLocalStorage } from "../../helpers/shared/localStorage.js";
import { Post } from "../../models/postModel.js";

export let allPosts = {};
export let post;

export async function getPosts(page = 1) {
    try {
        let url = BASE_URL + SOCIAL_URL + POSTS_URL + `?_author=true&_reactions=true&page=${page}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
                "Authorization": "Bearer " + getFromLocalStorage("token")
            }
        });
        const posts = await response.json();
        allPosts = posts;
        return allPosts;
    } catch (error) {
        console.error("Error fetching posts on page " + page + ":", error);
        throw new Error("Failed to fetch posts. Error: ", error);
    }
}

export async function getPost() {
    const id = new URLSearchParams(window.location.search).get("id");
    try {
        const response = await fetch(BASE_URL + SOCIAL_URL + POSTS_URL + id + "?_author=true&_reactions=true&_comments=true", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getFromLocalStorage("token"),
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            }
        });
        const json = await response.json();
        post = Post.fromJson(json);
    } catch (e) {
        console.error("Error fetching post:", e);
    }

}

export async function createPost(postData) {
    try {
        await fetch(BASE_URL + SOCIAL_URL + POSTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
                "Authorization": "Bearer " + getFromLocalStorage("token")
            },
            body: JSON.stringify(postData)
        });
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

export async function updatePost(postData) {
    const id = new URLSearchParams(window.location.search).get("id");
    try {
        const response = await fetch(BASE_URL + SOCIAL_URL + POSTS_URL + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + getFromLocalStorage("token"),
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(postData)
        });
        const json = await response.json();
    } catch (e) {
        console.error("Error updating post:", e);
    }
}

export async function deletePost() {
    const id = new URLSearchParams(window.location.search).get("id");
    try {
        await fetch(BASE_URL + SOCIAL_URL + POSTS_URL + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getFromLocalStorage("token"),
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            }
        });
    } catch (e) {
        console.error("Error deleting post:", e);
    }
}

export async function postComment(comment) {
    const id = new URLSearchParams(window.location.search).get("id");
    try {
        await fetch(BASE_URL + SOCIAL_URL + POSTS_URL + id + "/comment", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getFromLocalStorage("token"),
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify({
                body: comment
            })
        });
    } catch (e) {
        console.error("Error posting comment:", e);
    }
}
