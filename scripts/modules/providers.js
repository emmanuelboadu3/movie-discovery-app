import { fetchProviders } from "../api/tmdb.js";

export async function getProviders(id, type, region = "US") {
    try {
        const data = await fetchProviders(id, type);
        // TMDB groups providers by region code (e.g., US, GH, GB)
        return data.results?.[region]?.flatrate || [];
    } catch (err) {
        console.error("Failed to get providers:", err);
        return [];
    }
}
