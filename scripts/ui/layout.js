// layout.js
// Handles header and navigation UI

import { handleSearch } from "../modules/search.js";

export function initLayout() {
    const header = document.getElementById("app-header");

    header.innerHTML = `
        <h1>🎬 Movie Discovery</h1>
        <nav class="nav">
            <a href="#/">Home</a>
            <a href="#/watchlist">Watchlist</a>
        </nav>

        <div class="search-bar">
            <input 
                id="search-input" 
                type="text" 
                placeholder="Search movies or TV shows..." 
            />
        </div>
    `;

    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSearch(searchInput.value.trim());
            searchInput.value = "";
        }
    });
}
