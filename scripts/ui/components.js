import { IMAGE_BASE_URL } from "../api/tmdb.js";
import { toggleWatchlist, isInWatchlist } from "../modules/watchlist.js";
import { toggleFavorite, isFavorite } from "../modules/favorites.js";
import { getRating, setRating } from "../modules/ratings.js";

// Render a grid of cards (movies, TV shows, favorites, watchlist, recommendations)
export function renderCards(items, sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.innerHTML = ""; // clear previous content

    items.forEach(item => {
        const title = item.title || item.name;
        const poster = item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : "placeholder.jpg";

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${poster}" alt="${title}" />
            <h3>${title}</h3>
            <button class="details-btn">Details</button>
        `;

        // Navigate to details route
        card.querySelector(".details-btn").addEventListener("click", () => {
            const type = item.media_type || (item.first_air_date ? "tv" : "movie");
            window.location.hash = `#/details/${type}/${item.id}`;
        });

        section.appendChild(card);
    });
}

// Render detailed view of a movie or show
export async function renderDetails(item, type) {
    const detailsSection = document.getElementById("details");
    if (!detailsSection) return;

    // Clear previous content
    detailsSection.innerHTML = "";

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
            <button id="watchlist-btn">${isInWatchlist(item.id) ? "✓ In Watchlist" : "+ Watchlist"}</button>
            <button id="favorite-btn">${isFavorite(item.id) ? "★ Favorited" : "☆ Favorite"}</button>
        </div>

        <div class="rating" id="rating-container"></div>
    `;

    detailsSection.appendChild(details);

    // Watchlist button
    const watchlistBtn = document.getElementById("watchlist-btn");
    watchlistBtn.addEventListener("click", () => {
        toggleWatchlist(item);
        watchlistBtn.textContent = isInWatchlist(item.id) ? "✓ In Watchlist" : "+ Watchlist";
    });

    // Favorite button
    const favoriteBtn = document.getElementById("favorite-btn");
    favoriteBtn.addEventListener("click", () => {
        toggleFavorite(item);
        favoriteBtn.textContent = isFavorite(item.id) ? "★ Favorited" : "☆ Favorite";
    });

    // Rating stars
    const ratingContainer = document.getElementById("rating-container");
    function updateStars() {
        ratingContainer.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.textContent = i <= getRating(item.id) ? "★" : "☆";
            star.classList.add("star");
            star.addEventListener("click", () => {
                setRating(item.id, i);
                updateStars();
            });
            ratingContainer.appendChild(star);
        }
    }
    updateStars();
}
