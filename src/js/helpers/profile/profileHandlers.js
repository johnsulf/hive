import { editProfile } from "../../api/profile/profile.js";
import { reloadPage } from "../shared/utils.js";

export async function updateProfileHandler(event) {
    event.preventDefault();
    const bio = document.getElementById('profileBio').value;
    const avatarUrl = document.getElementById('profileImgUrl').value;
    const avatarAlt = document.getElementById('profileImgAlt').value;
    const data = {
        bio: bio,
        avatar: {
            url: avatarUrl,
            alt: avatarAlt
        }
    };
    await editProfile(data);
    reloadPage();
}