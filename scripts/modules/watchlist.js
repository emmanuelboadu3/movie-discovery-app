// watchlist.js
// Manages user watchlist
import { getFromStorage, saveToStorage } from "./storage.js";

const KEY = "watchlist";

export function toggleWatchlist(item) {
    let list = getFromStorage(KEY);

    // Ensure list is always an array
    if (!Array.isArray(list)) list = [];

    const index = list.findIndex(i => i.id === item.id);

    if (index === -1) {
        list.push(item);
    } else {
        list.splice(index, 1);
    }

    saveToStorage(KEY, list);
    return list;
}

export function getWatchlist() {
    const list = getFromStorage(KEY);
    return Array.isArray(list) ? list : [];
}

export function isInWatchlist(id) {
    const list = getWatchlist();
    return list.some(item => item.id === id);
}
