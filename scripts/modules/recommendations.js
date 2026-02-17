// recommendations.js
// Generates recommendations based on favorites

import { fetchRecommendations } from "../api/tmdb.js";

export async function getRecommendations(id, type) {
    try {
        const data = await fetchRecommendations(id, type);
        return data.results || [];
    } catch (err) {
        console.error("Failed to get recommendations:", err);
        return [];
    }
}
