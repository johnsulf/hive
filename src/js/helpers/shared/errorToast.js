export async function showToast(message) {
    const toastHTML = `
        <div class="toast align-items-center text-bg-danger position-absolute top-0 start-50 translate-middle-x border-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`;

    const toastContainer = document.getElementById('toastContainer') || document.body;
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toast = new bootstrap.Toast(toastContainer.lastChild);
    toast.show();
}