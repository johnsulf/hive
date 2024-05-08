import { createPost, updatePost, postComment } from "../../api/post/post.js";

let postData;
 
export async function createPostHandler(event) {
    event.preventDefault(); 

    setModalElementsAndData();
    handleSpinnerAndButton("create", "inline-block", true);

    await createPost(postData);

    handleSpinnerAndButton("create", "none", false);
}

export async function updatePostHandler(event) {
    event.preventDefault();
    
    setModalElementsAndData();
    handleSpinnerAndButton("update", "inline-block", true);

    await updatePost(postData);
    
    handleSpinnerAndButton("update", "none", false);
}

export async function postCommentHandler(event) {
    event.preventDefault();
    const comment = document.getElementById("comment").value;

    handleSpinnerAndButton("comment", "inline-block", true);

    await postComment(comment);

    handleSpinnerAndButton("comment", "none", false);
}  

function setModalElementsAndData() {
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;
    const tagsInput = document.getElementById("postTags").value;
    const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];
    const mediaUrl = document.getElementById("mediaUrl").value;
    const mediaAlt = document.getElementById("mediaAlt").value;

    postData = {
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
}

function handleSpinnerAndButton(operation, spinnerDisplay, buttonDisabled) {
    const spinner = document.getElementById(operation+"Spinner");
    const button = document.getElementById(operation+"Btn");

    spinner.style.display = spinnerDisplay;
    button.disabled = buttonDisabled;
} 