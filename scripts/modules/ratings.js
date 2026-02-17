// ratings.js
import { getFromStorage, saveToStorage } from "./storage.js";

const KEY = "ratings";

export function setRating(id, rating) {
    let ratings = getFromStorage(KEY) || {};
    ratings[id] = rating;
    saveToStorage(KEY, ratings);
}

export function getRating(id) {
    const ratings = getFromStorage(KEY) || {};
    return ratings[id] || 0;
}
