// error.js
// Centralized error handling

export function showError(message) {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}

export function clearError() {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
}
