// main.js
// This is the brain of the application.
// It initializes layout, routing, and default views.
import { initLayout } from "./ui/layout.js";
import { initRouter } from "./modules/routing.js";
import { renderFooter } from "./ui/footer.js";

document.addEventListener("DOMContentLoaded", () => {
    initLayout();     // Header + search bar
    initRouter();     // Routing
    renderFooter();   // Footer with socials + ©2026
});


