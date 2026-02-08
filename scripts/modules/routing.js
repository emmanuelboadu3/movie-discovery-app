// routing.js
// Controls navigation between views

import { fetchTrending, searchTitles, fetchDetails } from "../api/tmdb.js";
import { renderCards, renderDetails } from "../ui/components.js";
import { getWatchlist } from "./watchlist.js";

export function initRouter() {
    window.addEventListener("hashchange", loadRoute);
    loadRoute();
}

async function loadRoute() {
    const app = document.getElementById("app");
    const loading = document.getElementById("loading");

    app.innerHTML = "";
    loading.classList.remove("hidden");

    const hash = window.location.hash || "#/";

    try {
        // HOME / TRENDING
        if (hash === "#/" || hash === "") {
            const data = await fetchTrending();
            renderCards(data.results);
        }

        // SEARCH
        else if (hash.startsWith("#/search")) {
            const query = new URLSearchParams(hash.split("?")[1]).get("q");
            if (!query) return;

            const data = await searchTitles(query);
            renderCards(data.results);
        }

        // DETAILS
        else if (hash.startsWith("#/details")) {
            const [, , type, id] = hash.split("/");
            const data = await fetchDetails(id, type);
            renderDetails(data, type);
        }

        // WATCHLIST
        else if (hash === "#/watchlist") {
            const items = getWatchlist();
            renderCards(items);
        }

        // FALLBACK
        else {
            app.innerHTML = "<p>Page not found</p>";
        }

    } catch (error) {
        app.innerHTML = `<p>⚠️ Failed to load content.</p>`;
        console.error(error);
    } finally {
        loading.classList.add("hidden");
    }
}

