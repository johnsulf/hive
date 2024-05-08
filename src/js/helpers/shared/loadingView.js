
export function loadingView(isLoading, contentId, spinnerId) {
    const content = document.getElementById(contentId);
    const spinner = document.getElementById(spinnerId);

    if (isLoading) {
        content.style.display = "none";
        spinner.style.display = "block";
    } else {
        content.style.display = "block";
        spinner.style.display = "none";
    }
}