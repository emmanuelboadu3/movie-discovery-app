// api.test.js
// Simple unit tests for core modules

import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../scripts/modules/watchlist.js";
import { toggleFavorite, getFavorites, rateFavorite } from "../scripts/modules/favorites.js";

function testWatchlist() {
    console.log("Testing Watchlist...");
    addToWatchlist({ id: 1, title: "Test Movie" });
    console.assert(getWatchlist().length === 1, "Watchlist should contain 1 item");
    removeFromWatchlist(1);
    console.assert(getWatchlist().length === 0, "Watchlist should be empty after removal");
}

function testFavorites() {
    console.log("Testing Favorites...");
    toggleFavorite({ id: 2, title: "Test Show" });
    console.assert(getFavorites().length === 1, "Favorites should contain 1 item");
    rateFavorite(2, 5);
    console.assert(getFavorites()[0].rating === 5, "Favorite should have rating 5");
    toggleFavorite({ id: 2, title: "Test Show" });
    console.assert(getFavorites().length === 0, "Favorites should be empty after toggle remove");
}

testWatchlist();
testFavorites();
