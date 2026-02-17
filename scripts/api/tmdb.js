// tmdb.js
// Handles ALL communication with the TMDb API


const API_KEY = import.meta.env.VITE_TMDB_KEY; // pulled from .env
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


// Fetch trending movies & TV shows
export async function fetchTrending() {
    try {
        const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`TMDb error: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch trending:", err);
        return { results: [] }; // safe fallback
    }
}

// Search movies or TV shows
export async function searchTitles(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error(`TMDb error: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error("Failed to search titles:", err);
        return { results: [] }; // safe fallback
    }
}

// Get details for a single movie or show
export async function fetchDetails(id, type) {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`TMDb error: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error(`Failed to fetch details for ${type} ${id}:`, err);
        return {}; // safe fallback
    }
}

// (Optional) Fetch cast/crew credits
export async function fetchCredits(id, type) {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`TMDb error: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error(`Failed to fetch credits for ${type} ${id}:`, err);
        return { cast: [], crew: [] }; // safe fallback
    }
}

// (Optional) Fetch trailers/videos
export async function fetchVideos(id, type) {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`TMDb error: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error(`Failed to fetch videos for ${type} ${id}:`, err);
        return { results: [] }; // safe fallback
    }
}

// (Optional) Fetch recommendations
export async function fetchRecommendations(id, type) {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`TMDb error: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error(`Failed to fetch recommendations for ${type} ${id}:`, err);
        return { results: [] }; // safe fallback
    }
}

// Fetch streaming providers (availability)
export async function fetchProviders(id, type) {
    try {
        const response = await fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`TMDb error: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error(`Failed to fetch providers for ${type} ${id}:`, err);
        return { results: {} }; // safe fallback
    }
}
