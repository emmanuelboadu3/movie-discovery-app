// favorites.js
// Manages favorites and ratings

import { getFromStorage, saveToStorage } from "./storage.js";

const KEY = "favorites";

// Toggle a favorite: add if not present, remove if already there
export function toggleFavorite(item) {
    let favorites = getFromStorage(KEY);

    // Ensure we have an array
    if (!Array.isArray(favorites)) favorites = [];

    const exists = favorites.find(fav => fav.id === item.id);

    if (exists) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.id !== item.id);
    } else {
        // Add to favorites
        favorites.push(item);
    }

    saveToStorage(KEY, favorites);
    return favorites;
}

// Get all favorites
export function getFavorites() {
    const favorites = getFromStorage(KEY);
    return Array.isArray(favorites) ? favorites : [];
}

// Check if an item is a favorite
export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === id);
}
