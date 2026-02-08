// loading.js
// Handles loading spinner visibility

export function showLoading() {
    document.getElementById("loading").classList.remove("hidden");
}

export function hideLoading() {
    document.getElementById("loading").classList.add("hidden");
}
