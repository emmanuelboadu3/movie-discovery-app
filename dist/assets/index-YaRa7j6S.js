(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();function I(e){e&&(window.location.hash=`#/search?q=${encodeURIComponent(e)}`)}function k(){const e=document.getElementById("app-header");e.innerHTML=`
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
    `;const t=document.getElementById("search-input");t.addEventListener("keypress",r=>{r.key==="Enter"&&(I(t.value.trim()),t.value="")})}const h="82077a81c76d48a3618f1e19454ed5bd",p="https://api.themoviedb.org/3",M="https://image.tmdb.org/t/p/w500";async function H(){try{const e=await fetch(`${p}/trending/all/week?api_key=${h}`);if(!e.ok)throw new Error(`TMDb error: ${e.status}`);return await e.json()}catch(e){return console.error("Failed to fetch trending:",e),{results:[]}}}async function S(e){try{const t=await fetch(`${p}/search/multi?api_key=${h}&query=${encodeURIComponent(e)}`);if(!t.ok)throw new Error(`TMDb error: ${t.status}`);return await t.json()}catch(t){return console.error("Failed to search titles:",t),{results:[]}}}async function F(e,t){try{const r=await fetch(`${p}/${t}/${e}?api_key=${h}`);if(!r.ok)throw new Error(`TMDb error: ${r.status}`);return await r.json()}catch(r){return console.error(`Failed to fetch details for ${t} ${e}:`,r),{}}}async function B(e,t){try{const r=await fetch(`${p}/${t}/${e}/recommendations?api_key=${h}`);if(!r.ok)throw new Error(`TMDb error: ${r.status}`);return await r.json()}catch(r){return console.error(`Failed to fetch recommendations for ${t} ${e}:`,r),{results:[]}}}async function A(e,t){try{const r=await fetch(`${p}/${t}/${e}/watch/providers?api_key=${h}`);if(!r.ok)throw new Error(`TMDb error: ${r.status}`);return await r.json()}catch(r){return console.error(`Failed to fetch providers for ${t} ${e}:`,r),{results:{}}}}function $(e,t){localStorage.setItem(e,JSON.stringify(t))}function u(e){try{return JSON.parse(localStorage.getItem(e))||{}}catch{return{}}}const v="watchlist";function N(e){let t=u(v);Array.isArray(t)||(t=[]);const r=t.findIndex(s=>s.id===e.id);return r===-1?t.push(e):t.splice(r,1),$(v,t),t}function T(){const e=u(v);return Array.isArray(e)?e:[]}function b(e){return T().some(r=>r.id===e)}const y="favorites";function P(e){let t=u(y);return Array.isArray(t)||(t=[]),t.find(s=>s.id===e.id)?t=t.filter(s=>s.id!==e.id):t.push(e),$(y,t),t}function _(){const e=u(y);return Array.isArray(e)?e:[]}function L(e){return _().some(r=>r.id===e)}const w="ratings";function R(e,t){let r=u(w)||{};r[e]=t,$(w,r)}function C(e){return(u(w)||{})[e]||0}function f(e,t){const r=document.getElementById(t);r&&(r.innerHTML="",e.forEach(s=>{const a=s.title||s.name,o=s.poster_path?`${M}${s.poster_path}`:"placeholder.jpg",n=document.createElement("div");n.className="card",n.innerHTML=`
            <img src="${o}" alt="${a}" />
            <h3>${a}</h3>
            <button class="details-btn">Details</button>
        `,n.querySelector(".details-btn").addEventListener("click",()=>{const i=s.media_type||(s.first_air_date?"tv":"movie");window.location.hash=`#/details/${i}/${s.id}`}),r.appendChild(n)}))}async function D(e,t){const r=document.getElementById("details");if(!r)return;r.innerHTML="";const s=e.title||e.name,a=e.poster_path?`${M}${e.poster_path}`:"placeholder.jpg",o=document.createElement("div");o.className="details",o.innerHTML=`
        <img src="${a}" alt="${s}" />
        <h2>${s}</h2>
        <p>${e.overview||"No synopsis available."}</p>
        <p><strong>Release:</strong> ${e.release_date||e.first_air_date||"N/A"}</p>
        <p><strong>Rating:</strong> ${e.vote_average||"N/A"}</p>

        <div class="actions">
            <button id="watchlist-btn">${b(e.id)?"✓ In Watchlist":"+ Watchlist"}</button>
            <button id="favorite-btn">${L(e.id)?"★ Favorited":"☆ Favorite"}</button>
        </div>

        <div class="rating" id="rating-container"></div>
    `,r.appendChild(o);const n=document.getElementById("watchlist-btn");n.addEventListener("click",()=>{N(e),n.textContent=b(e.id)?"✓ In Watchlist":"+ Watchlist"});const i=document.getElementById("favorite-btn");i.addEventListener("click",()=>{P(e),i.textContent=L(e.id)?"★ Favorited":"☆ Favorite"});const d=document.getElementById("rating-container");function g(){d.innerHTML="";for(let c=1;c<=5;c++){const l=document.createElement("span");l.textContent=c<=C(e.id)?"★":"☆",l.classList.add("star"),l.addEventListener("click",()=>{R(e.id,c),g()}),d.appendChild(l)}}g()}async function W(e,t){try{return(await B(e,t)).results||[]}catch(r){return console.error("Failed to get recommendations:",r),[]}}async function j(e,t,r="US"){try{return(await A(e,t)).results?.[r]?.flatrate||[]}catch(s){return console.error("Failed to get providers:",s),[]}}function O(){window.addEventListener("hashchange",E),E()}async function E(){const e=document.getElementById("movies"),t=document.getElementById("details"),r=document.getElementById("recommendations"),s=document.getElementById("providers"),a=document.getElementById("loading");e&&(e.innerHTML=""),t&&(t.innerHTML=""),r&&(r.innerHTML=""),s&&(s.innerHTML=""),a&&a.classList.remove("hidden");const o=window.location.hash||"#/";try{if(o==="#/"||o===""){const n=await H();f(n.results,"movies")}else if(o.startsWith("#/search")){const n=o.split("?")[1],i=n?new URLSearchParams(n).get("q"):null;if(!i){e&&(e.innerHTML="<p>Please enter a search term.</p>");return}const d=await S(i);!d.results||d.results.length===0?e.innerHTML="<p>No results found.</p>":f(d.results,"movies")}else if(o==="#/favorites"){const n=_();!n||n.length===0?e.innerHTML="<p>No favorites yet.</p>":f(n,"movies")}else if(o.startsWith("#/details")){const n=o.split("/");if(n.length<4){t.innerHTML="<p>Invalid details route.</p>";return}const i=n[2],d=n[3],g=await F(d,i);if(D(g,i),r){const c=await W(d,i);!c||c.length===0?r.innerHTML="<p>No recommendations available.</p>":f(c,"recommendations")}if(s){const c=await j(d,i,"US");!c||c.length===0?s.innerHTML="<p>No streaming providers available.</p>":c.forEach(l=>{const m=document.createElement("div");m.classList.add("provider"),m.innerHTML=`
                            <img 
                                src="https://image.tmdb.org/t/p/w92${l.logo_path}" 
                                alt="${l.provider_name}"
                            />
                            <span>${l.provider_name}</span>
                        `,s.appendChild(m)})}}else if(o==="#/watchlist"){const n=T();!n||n.length===0?e.innerHTML="<p>Your watchlist is empty.</p>":f(n,"movies")}else e&&(e.innerHTML="<p>Page not found.</p>");window.scrollTo({top:0,behavior:"smooth"})}catch(n){console.error("Router Error:",n),e&&(e.innerHTML="<p>⚠️ Failed to load content. Please try again later.</p>")}finally{a&&a.classList.add("hidden")}}function x(){const e=document.getElementById("app-footer");e.innerHTML=`
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
          <img src="assets/icons/facebook.svg" alt="Facebook" width="20">
        </a>
        <!-- Wireframe link -->
        <a href="assets/images/wireframe.png" target="_blank">
          <img src="assets/images/wireframe.png" alt="Wireframe" width="20"> wireframe
        </a>
      </div>
    </div>
  `}document.addEventListener("DOMContentLoaded",()=>{k(),O(),x()});
