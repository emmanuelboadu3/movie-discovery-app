// search.js
// Handles search logic

export function handleSearch(query) {
    if (!query) return;
    window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
}
