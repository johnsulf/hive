import { buildPostCard, setPostLink } from "../shared/postCard.js";
import { activeFilters } from "../feed/feedSearchAndFilter.js";

export function populateFeed(posts, searchResult = "") {
    const feedContent = document.getElementById("feedContent");
    feedContent.innerHTML = "";

    if (posts && posts.length > 0) {
        feedContent.innerHTML = `<p>Showing ${posts.length} posts</p>`;  
        posts.forEach((post) => {
            feedContent.innerHTML += buildPostCard(post, true);
        });
        setPostLink();
    } else {
        feedContent.innerHTML = searchResult === "" ? "<p>No posts found.</p>" 
        : searchResult.length != 0 && activeFilters.length != 0 ? `<p>No posts found for <i>${searchResult}</i> and filter(s).</p>` 
        : `<p>No posts found for <i>${searchResult}</i>.</p>`;
    }
}