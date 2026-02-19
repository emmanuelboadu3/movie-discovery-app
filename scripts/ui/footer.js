// footer.js
export function renderFooter() {
    const footer = document.getElementById("app-footer");

    footer.innerHTML = `
    <div class="footer-content">
      <p>&copy; 2026 Movie Discovery App. Built by Emmanuel Boadu.</p>
      <div class="social-links">
        <a href="https://github.com/emmanuelboadu3" target="_blank">
          <img src="assets/icons/github.svg" alt="GitHub" width="20">
        </a>
        <a href="https://linkedin.com/in/emmanuel-boadu-2681842a6" target="_blank">
          <img src="assets/icons/linkedin-square.svg" alt="LinkedIn" width="20">
        </a>
        <a href="https://instagram.com/kojo_barjona19" target="_blank">
          <img src="assets/icons/instagram-circle.svg" alt="Instagram" width="20">
        </a>
        <a href="https://facebook.com/share/1APo2Pr2dP/" target="_blank">
          <img src="docs/assets/icons/facebook.svg" alt="Facebook" width="20">
        </a>
        <!-- Wireframe link -->
        <a href="assets/images/wireframe.png" target="_blank">
          <img src="assets/images/wireframe.png" alt="Wireframe" width="20"> wireframe
        </a>
      </div>
    </div>
  `;
}
