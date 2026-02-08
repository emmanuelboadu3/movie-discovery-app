// favorites.js
// Manages favorites and ratings

import { getFromStorage, saveToStorage } from "./storage.js";

const KEY = "favorites";

export function toggleFavorite(item) {
    const favorites = getFromStorage(KEY);
    saveToStorage(KEY, favorites);
}
