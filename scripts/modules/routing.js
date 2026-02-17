// =========================
// Routing.js
// ====================
import { fetchTrending, searchTitles, fetchDetails } from "../api/tmdb.js";
import { renderCards, renderDetails } from "../ui/components.js";
import { getWatchlist } from "./watchlist.js";
import { getRecommendations } from "./recommendations.js";
import { getProviders } from "./providers.js";
import { getFavorites } from "./favorites.js";

export function initRouter() {
    window.addEventListener("hashchange", loadRoute);
    loadRoute();
}

async function loadRoute() {
    const moviesSection = document.getElementById("movies");
    const detailsSection = document.getElementById("details");
    const recSection = document.getElementById("recommendations");
    const providersSection = document.getElementById("providers");
    const loading = document.getElementById("loading");

    // Clear sections safely
    if (moviesSection) moviesSection.innerHTML = "";
    if (detailsSection) detailsSection.innerHTML = "";
    if (recSection) recSection.innerHTML = "";
    if (providersSection) providersSection.innerHTML = "";

    // Show loading if exists
    if (loading) loading.classList.remove("hidden");

    const hash = window.location.hash || "#/";

    try {
        // =========================
        // HOME / TRENDING
        // =========================
        if (hash === "#/" || hash === "") {
            const data = await fetchTrending();
            renderCards(data.results, "movies");
        }

        // =========================
        // SEARCH
        // =========================
        else if (hash.startsWith("#/search")) {
            const queryString = hash.split("?")[1];
            const query = queryString
                ? new URLSearchParams(queryString).get("q")
                : null;

            if (!query) {
                if (moviesSection) {
                    moviesSection.innerHTML = "<p>Please enter a search term.</p>";
                }
                return;
            }

            const data = await searchTitles(query);

            if (!data.results || data.results.length === 0) {
                moviesSection.innerHTML = "<p>No results found.</p>";
            } else {
                renderCards(data.results, "movies");
            }
        }

        // =========================
        // FAVORITES
        // =========================
        else if (hash === "#/favorites") {
            const items = getFavorites();

            if (!items || items.length === 0) {
                moviesSection.innerHTML = "<p>No favorites yet.</p>";
            } else {
                renderCards(items, "movies");
            }
        }

        // =========================
        // DETAILS
        // =========================
        else if (hash.startsWith("#/details")) {
            const parts = hash.split("/");

            if (parts.length < 4) {
                detailsSection.innerHTML = "<p>Invalid details route.</p>";
                return;
            }

            const type = parts[2];
            const id = parts[3];

            const data = await fetchDetails(id, type);
            renderDetails(data, type);

            // ---------- Recommendations ----------
            if (recSection) {
                const recs = await getRecommendations(id, type);

                if (!recs || recs.length === 0) {
                    recSection.innerHTML = "<p>No recommendations available.</p>";
                } else {
                    renderCards(recs, "recommendations");
                }
            }

            // ---------- Streaming Providers ----------
            if (providersSection) {
                const providers = await getProviders(id, type, "US");

                if (!providers || providers.length === 0) {
                    providersSection.innerHTML =
                        "<p>No streaming providers available.</p>";
                } else {
                    providers.forEach((p) => {
                        const providerDiv = document.createElement("div");
                        providerDiv.classList.add("provider");

                        providerDiv.innerHTML = `
                            <img 
                                src="https://image.tmdb.org/t/p/w92${p.logo_path}" 
                                alt="${p.provider_name}"
                            />
                            <span>${p.provider_name}</span>
                        `;

                        providersSection.appendChild(providerDiv);
                    });
                }
            }
        }

        // =========================
        // WATCHLIST
        // =========================
        else if (hash === "#/watchlist") {
            const items = getWatchlist();

            if (!items || items.length === 0) {
                moviesSection.innerHTML = "<p>Your watchlist is empty.</p>";
            } else {
                renderCards(items, "movies");
            }
        }

        // =========================
        // FALLBACK
        // =========================
        else {
            if (moviesSection) {
                moviesSection.innerHTML = "<p>Page not found.</p>";
            }
        }

        // Scroll to top after route change
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error("Router Error:", error);

        if (moviesSection) {
            moviesSection.innerHTML =
                "<p>⚠️ Failed to load content. Please try again later.</p>";
        }
    } finally {
        // Hide loading safely
        if (loading) loading.classList.add("hidden");
    }
}
