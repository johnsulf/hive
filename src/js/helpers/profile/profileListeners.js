import { goBack } from "../shared/utils.js"; 
import { updateProfileHandler } from "../profile/profileHandlers.js";
import { profile } from "../../api/profile/profile.js";
import { setPostLink } from "../shared/postCard.js";

export function attachListeners() {
    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', async (e) => await updateProfileHandler(e));

    const backButton = document.getElementById("backBtn");
    backButton.addEventListener("click", () => goBack());

    const zoomProfileIimgSrc = document.getElementById("zoomProfileImg");
    const imageContainer = document.getElementById('image');
    imageContainer.addEventListener("click", () => zoomProfileIimgSrc.src = profile.avatar.url);

    setPostLink();
}