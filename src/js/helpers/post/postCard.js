import { formatDateTime } from "./dateTime.js";

export function buildPostCard(post, isFeed = false) {
    return `
        <div id="${post.id}" class="container card position-relative post my-3">
            <div class="row mt-3">
                <a href="../profile/profile.html?name=${post.author.name}" class="profile-link col-2">
                    <img src="${post.author.avatar["url"]}" alt="${post.author.avatar["alt"]}" class="profile-img img-fluid rounded-circle float-end">
                </a>
                <div class="col">
                    <div class="d-flex align-items-end gap-2">
                        <strong>${post.author.name}</strong>
                        <small class="text-muted">${formatDateTime(post.created)}<span class="text-secondary">${edited(post)}</span></small>
                    </div>
                    <p class="h5 mt-2">${post.title}</p>
                    <p>${post.body === null ? "" : post.body}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    ${buildImage(post.media)}
                </div>
            </div>
            <div class="row justify-content-start">
                <div class="col-2"></div>
                <div class="col-8">
                    ${post.tags.map(tag => `<span class="badge bg-primary text-black me-1">#${tag}</span>`).join('')}
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-2"></div>
                ${buildReactions(post)}
                <div class="col-1 d-flex fw-bold gap-1 ms-2">
                    <p>${post._count.comments}</p>
                    <i class="bi bi-chat col-1"></i>
                </div>
            </div>
            ${ !isFeed ? buildCommentSection(post) : "" }
        </div>
    `;
}

//helpers
export function buildImage(media) {
    return media && media.url 
    ? `<img src="${media.url}" alt="${media.alt}" class="img-fluid post-img mb-3">` 
    : "";
}

function edited(post) {
    return post.updated !== post.created ? "&nbsp;&nbsp;&nbsp;EDITED" : "";
}

export function buildReactions(post) {
    return post.reactions.length === 0 
    ?   `<div class="col-1 d-flex fw-bold gap-1">
            <p>${post._count.reactions}</p>
            <i class="bi bi-hand-thumbs-up"></i>
        </div>` 
    :   post.reactions.map(reaction => `
            <div class="col-1 d-flex fw-bold">
                <p>${reaction.count}</p>
                <p>${reaction.symbol}</p>
            </div>
        `).join("");
}

function buildComments(post) {
    return post.comments.map(comment => `
        <div class="row my-2">
            <div class="col-2"></div>
            <div class="col-8">
                <div class="container card position-relative comment">
                    <div class="row mt-2">
                        <a href="../profile/profile.html?name=${comment.author.name}" class="profile-link col-2">
                            <img src="${comment.author.avatar["url"]}" alt="${comment.author.avatar["alt"]}" class="profile-img img-fluid rounded-circle float-end">
                        </a>
                        <div class="col">
                            <div class="d-flex align-items-end gap-2">
                                <strong>${comment.author.name}</strong>
                                <small class="text-muted">${formatDateTime(comment.created)}</small>
                            </div>
                            <p>${comment.body}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

function buildCommentSection(post) {
    return `
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <h5>Comments</h5>
                ${ post.comments.length === 0 ? "<p>There are no comments yet.</p>" : "" }
            </div>
        </div>

        ${ buildComments(post) }

        <div class="row my-3">
            <div class="col-2"></div>
            <div class="col-8">
                <form class="comment-form">
                    <div>
                        <label for="comment" class="form-label">Write a Comment</label>
                        <textarea class="form-control" id="comment" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary my-3" id="commentBtn">
                        Submit
                        <span class="spinner-border spinner-border-sm" style="display:none;" id="commentSpinner" aria-hidden="true"></span>
                    </button>
                </form>
            </div>
        </div>
    `;
}