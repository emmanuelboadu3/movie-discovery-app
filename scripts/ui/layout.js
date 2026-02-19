// layout.js
import { handleSearch } from "../modules/search.js";

export function initLayout() {
    const header = document.getElementById("app-header");

    header.innerHTML = `
        <div class="header-content">
            <h1>🎬 Movie Discovery</h1>
            <nav class="nav">
                <a href="#/">Home</a>
                <a href="#/watchlist">Watchlist</a>
                <a href="#/favorites">Favorites</a>
            </nav>
            <div class="search-bar">
                <input 
                    id="search-input" 
                    type="text" 
                    placeholder="Search movies or TV shows..." 
                />
            </div>
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
