// tmdb.js
// Handles ALL communication with the TMDb API

const API_KEY = "82077a81c76d48a3618f1e19454ed5bd";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch trending movies & TV shows
export async function fetchTrending() {
    const response = await fetch(
        `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
    );
    return response.json();
}

// Search movies or TV shows
export async function searchTitles(query) {
    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
    );
    return response.json();
}

// Get details for a single movie or show
export async function fetchDetails(id, type) {
    const response = await fetch(
        `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
    );
    return response.json();
}
