// components.js
// Reusable UI elements

import { toggleWatchlist, isInWatchlist } from "../modules/watchlist.js";
import { toggleFavorite } from "../modules/favorites.js";
import { fetchStreamingAvailability } from "../api/streaming.js";
import { getRecommendations } from "../modules/recommendations.js";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Render a grid of cards
export function renderCards(items) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    if (!items || items.length === 0) {
        app.innerHTML = "<p>No results found.</p>";
        return;
    }

    const grid = document.createElement("div");
    grid.className = "grid";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const title = item.title || item.name;
        const type = item.media_type || "movie";
        const poster = item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : "placeholder.jpg";

        card.innerHTML = `
            <img src="${poster}" alt="${title}" />
            <h3>${title}</h3>
            <button class="details-btn">Details</button>
        `;

        card.querySelector(".details-btn").addEventListener("click", () => {
            window.location.hash = `#/details/${type}/${item.id}`;
        });

        grid.appendChild(card);
    });

    app.appendChild(grid);
}

// Render a detailed view
export async function renderDetails(item, type) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const title = item.title || item.name;
    const poster = item.poster_path
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : "placeholder.jpg";

    const details = document.createElement("div");
    details.className = "details";

    details.innerHTML = `
        <img src="${poster}" alt="${title}" />
        <h2>${title}</h2>
        <p>${item.overview || "No synopsis available."}</p>
        <p><strong>Release:</strong> ${item.release_date || item.first_air_date || "N/A"}</p>
        <p><strong>Rating:</strong> ${item.vote_average || "N/A"}</p>

        <div class="actions">
            <button id="watchlist-btn">
                ${isInWatchlist(item.id) ? "✓ In Watchlist" : "+ Watchlist"}
            </button>
            <button id="favorite-btn">❤ Favorite</button>
        </div>

        <div id="streaming-info">Loading streaming availability...</div>
        <h3>Recommended</h3>
        <div id="recommendations"></div>
    `;

    app.appendChild(details);

    // Watchlist button
    document.getElementById("watchlist-btn").addEventListener("click", () => {
        toggleWatchlist(item);
        renderDetails(item, type);
    });

    // Favorite button
    document.getElementById("favorite-btn").addEventListener("click", () => {
        toggleFavorite(item);
        alert("Added to favorites");
    });

    // Streaming availability
    const streaming = await fetchStreamingAvailability(title);
    document.getElementById("streaming-info").innerHTML = `
        <p>Netflix: ${streaming.netflix ? "✅" : "❌"}</p>
        <p>Prime Video: ${streaming.prime ? "✅" : "❌"}</p>
        <p>Disney+: ${streaming.disney ? "✅" : "❌"}</p>
    `;

    // Recommendations
    const recs = await getRecommendations(item.id, type);
    const recContainer = document.getElementById("recommendations");

    recs.slice(0, 5).forEach(rec => {
        const recDiv = document.createElement("div");
        recDiv.className = "recommendation";
        recDiv.textContent = rec.title || rec.name;

        recDiv.addEventListener("click", () => {
            window.location.hash = `#/details/${type}/${rec.id}`;
        });

        recContainer.appendChild(recDiv);
    });
}
