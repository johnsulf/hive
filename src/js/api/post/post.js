import { API_KEY, BASE_URL, POSTS_URL, SOCIAL_URL } from "../../helpers/constants.js";
import { getFromLocalStorage } from "../../helpers/localStorage.js";
import { Post } from "../../models/postModel.js";   

export let allPosts = {};
export let post;

export async function getPosts() {
    try {
        const response = await fetch(BASE_URL+SOCIAL_URL+POSTS_URL+"?_author=true&_reactions=true", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
                "Authorization": "Bearer " + getFromLocalStorage("token")
            }
        });
        const posts = await response.json();
        allPosts = posts;
        console.log(allPosts);
        return allPosts;
    } catch (error) {
        console.error("Error fetching posts:", error);
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

export async function createPost(event) {
    event.preventDefault(); 
    try {
        const submitPostBtn = document.getElementById("submitPostBtn");
        const submitPostSpinner = document.getElementById("submitPostSpinner");
        const title = document.getElementById("postTitle").value;
        const body = document.getElementById("postBody").value;
        const tagsInput = document.getElementById("postTags").value;
        const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];
        const mediaUrl = document.getElementById("mediaUrl").value;
        const mediaAlt = document.getElementById("mediaAlt").value;

        submitPostSpinner.style.display = 'inline-block';
        submitPostBtn.disabled = true;

        const postData = {
            title: title,
            body: body,
            tags: tags
        };

        if (mediaUrl) {
            postData.media = {
                url: mediaUrl,
                alt: mediaAlt
            };
        }

        console.log("Creating post:", postData);

        const response = await fetch(`${BASE_URL}${SOCIAL_URL}${POSTS_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
                "Authorization": "Bearer " + getFromLocalStorage("token")
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create post. Status: ${response.statusText}, Server message: ${errorData.message}`);
        }

        const data = await response.json();
        console.log("Post created successfully:", data);
        // Handle UI updates or redirections here TODO
    } catch (error) {
        console.error("Error creating post:", error);
        // Display error messages to the user here TODO
    } finally {
        submitPostSpinner.style.display = 'none';
        submitPostBtn.disabled = false;
    }
}

export async function updatePost(event) {
    event.preventDefault();
    const editPostBtn = document.getElementById("editPostBtn");
    const editPostSpinner = document.getElementById("editPostSpinner");
    const id = new URLSearchParams(window.location.search).get("id");
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;
    const tagsInput = document.getElementById("postTags").value;
    const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];
    const mediaUrl = document.getElementById("mediaUrl").value;
    const mediaAlt = document.getElementById("mediaAlt").value;

    editPostSpinner.style.display = 'inline-block';
    editPostBtn.disabled = true;

    const postData = {
        title: title,
        body: body,
        tags: tags
    };

    if (mediaUrl) {
        postData.media = {
            url: mediaUrl,
            alt: mediaAlt
        };
    }

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
        console.log("Updated post:", json);
    } catch (e) {
        console.error("Error updating post:", e);
    } finally {
        editPostSpinner.style.display = 'none';
        editPostBtn.disabled = false;
    }
}

export async function deletePost() {
    const id = new URLSearchParams(window.location.search).get("id");

    try {
        const response = await fetch(BASE_URL + SOCIAL_URL + POSTS_URL + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getFromLocalStorage("token"),
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            }
        });
        const json = await response.json();
        console.log("Deleted post:", json);
    } catch (e) {
        console.error("Error deleting post:", e);
    }
}

export async function postComment(event) {
    event.preventDefault();
    const id = new URLSearchParams(window.location.search).get("id");
    const comment = document.getElementById("comment").value;
    const commentBtn = document.getElementById("commentBtn");
    const commentSpinner = document.getElementById("commentSpinner");

    commentSpinner.style.display = 'inline-block';
    commentBtn.disabled = true;

    try {
        const response = await fetch(BASE_URL + SOCIAL_URL + POSTS_URL + id + "/comment", {
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
        const json = await response.json();
        console.log("Comment posted:", json);
    } catch (e) {
        console.error("Error posting comment:", e);
    } finally {
        commentSpinner.style.display = 'none';
        commentBtn.disabled = false;
    }
}
