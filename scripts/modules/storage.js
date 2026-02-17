// storage.js
// Centralized localStorage handling

export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
        return {};
    }
}
