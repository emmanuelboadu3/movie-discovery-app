// watchlist.js
// Manages user watchlist

import { getFromStorage, saveToStorage } from "./storage.js";

const KEY = "watchlist";

export function toggleWatchlist(item) {
    const list = getFromStorage(KEY) || [];

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
    return getFromStorage(KEY) || [];
}

export function isInWatchlist(id) {
    const list = getFromStorage(KEY) || [];
    return list.some(item => item.id === id);
}
