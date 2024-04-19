import { API_KEY, BASE_URL, POSTS_URL, SOCIAL_URL } from "../../helpers/constants.js";
import { getFromLocalStorage } from "../../helpers/localStorage.js";
import { populateFeed } from "../../../views/feed/feed.js";

let allPosts = {};

async function getPosts() {
    try {
        const response = await fetch(BASE_URL+SOCIAL_URL+POSTS_URL+"?_author=true", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
                "Authorization": "Bearer " + getFromLocalStorage("token")
            }
        });
        const posts = await response.json();
        allPosts = posts;
        console.log("All posts:", allPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts. Error: ", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
   await getPosts();
   populateFeed(allPosts);
    const form = document.getElementById("newPostForm");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();  // Prevent the default form submission behavior

        try {
            // Collecting form data
            const title = document.getElementById("postTitle").value;
            const body = document.getElementById("postBody").value;
            const tagsInput = document.getElementById("postTags").value;
            const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : []; // Handling empty tag input
            const mediaUrl = document.getElementById("mediaUrl").value;
            const mediaAlt = document.getElementById("mediaAlt").value;

            // Creating the post object according to your API's requirements
            const postData = {
                title: title,
                body: body,
                tags: tags
            };

            // Include media only if the URL is not empty
            if (mediaUrl) {
                postData.media = {
                    url: mediaUrl,
                    alt: mediaAlt
                };
            }

            console.log("Creating post:", postData);

            // Sending the POST request to the API
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
                // Extract response body for detailed error message if possible
                const errorData = await response.json();
                throw new Error(`Failed to create post. Status: ${response.statusText}, Server message: ${errorData.message}`);
            }

            const data = await response.json();
            console.log("Post created successfully:", data);
            // Handle UI updates or redirections here
        } catch (error) {
            console.error("Error creating post:", error);
            // Display error messages to the user here
        }
    });
});
