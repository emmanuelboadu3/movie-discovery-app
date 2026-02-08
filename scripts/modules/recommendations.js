// recommendations.js
// Generates recommendations based on favorites

import { fetchDetails } from "../api/tmdb.js";

export async function getRecommendations(id, type) {
    // Simple recommendation strategy
    return fetchDetails(id, type);
}
