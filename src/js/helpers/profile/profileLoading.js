export function toggleSpinnerAndView(loading) {
    const content = document.getElementById('profileContent');
    const spinner = document.getElementById('profileSpinner');

    if (loading) {
        spinner.style.display = "block";
        content.style.display = "none";
    } else {
        spinner.style.display = "none";
        content.style.display = "block";
    }
}