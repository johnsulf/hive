import { getPosts } from "../../js/api/post/post.js";
import { populateFeedTopArea } from "../../js/helpers/feed/feedTopArea.js";
import { updatePagination } from "../../js/helpers/feed/feedPagination.js";
import { onSearchAndFilter } from "../../js/helpers/feed/feedSearchAndFilter.js";
import { loadingView } from "../../js/helpers/shared/loadingView.js";
import { attachListeners } from "../../js/helpers/feed/feedListeners.js";
import { populateFeed } from "../../js/helpers/feed/feedContent.js";

document.addEventListener("DOMContentLoaded", async () => await loadFeed());

async function loadFeed() {
    loadingView(true, "feedContent", "feedSpinner");   
    populateFeedTopArea(); 

    const fetchedPosts = await getPosts(1);

    populateFeed(fetchedPosts.data);
    updatePagination(fetchedPosts.meta);
    onSearchAndFilter();
    attachListeners();

    loadingView(false, "feedContent", "feedSpinner");
}