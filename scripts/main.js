// main.js
// This is the brain of the application.
// It initializes layout, routing, and default views.

import { initLayout } from "./ui/layout.js";
import { initRouter } from "./modules/routing.js";

document.addEventListener("DOMContentLoaded", () => {
    initLayout();     // Load header/navigation
    initRouter();     // Handle page routing
});
