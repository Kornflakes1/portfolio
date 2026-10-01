// Builds the project cards, the full-screen project view, and the live server lines.

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

const page = document.body.dataset.page || "";

// Nav highlight
document.querySelectorAll("nav a[data-page]").forEach(function (a) {
  a.classList.toggle("on", a.dataset.page === page);
});

// Banner art
const banner = document.querySelector(".banner");
if (banner && banner.dataset.image) banner.style.backgroundImage = "url('" + banner.dataset.image + "')";

const viewer = document.querySelector(".viewer");

const STEAM_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>';

// A muted clip that plays inside the card while it's hovered.
function hoverVideo(p) {
  return p.hoverVideo ? '<video class="hover-video" src="' + esc(p.hoverVideo) + '" muted loop playsinline preload="metadata"></video>' : "";
}

// Blurred picture, film grain and an "Unannounced" stamp for projects that aren't public yet.
function classifiedArt(p) {
  return '<span class="classified-art" style="background-image: url(\'' + esc(p.background) + '\')"></span>'
    + '<span class="classified-grain"></span>'
    + '<span class="classified-stamp">Unannounced</span>';
}

// ---- Full-screen project view: the clicked card grows to fill the screen ----

function linksHtml(p) {
  return p.links && p.links.length
    ? '<p class="links">' + p.links.map(function (l) {
        return '<a href="' + esc(l.url) + '">' + esc(l.label) + "</a>";
      }).join("") + "</p>"
    : "";
}

function heroHtml(p) {
  if (p.hoverVideo) {
    return '<div class="pv-hero"><video src="' + esc(p.hoverVideo) + '" poster="' + esc(p.background) + '" autoplay muted loop playsinline></video></div>';
  }
  return '<div class="pv-hero' + (p.cardFill ? " filled" : "") + '" style="background-image: url(\'' + esc(p.background || "") + '\')'
    + (p.cardFill ? "; background-color: " + esc(p.cardFill) : "") + '"></div>';
}

function viewHtml(p, prev, next) {
  const main = p.text.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("")
    + (p.features && p.features.length
      ? '<h4 class="detail-label">Features</h4><ul class="highlights">'
        + p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>"
      : "")
    + (p.results && p.results.length
      ? '<h4 class="detail-label">Key results</h4><div class="results">' + p.results.map(function (r) {
          return '<div class="result"><strong>' + esc(r.number) + "</strong><span>" + esc(r.label) + "</span></div>";
        }).join("") + "</div>"
      : "");
  const side = (p.role || p.dates || (p.highlights && p.highlights.length)
      ? '<h4 class="detail-label">Role</h4>'
        + (p.role || p.dates ? '<p class="role">' + esc(p.role || "")
            + (p.role && p.dates ? " &middot; " : "") + esc(p.dates || "") + "</p>" : "")
        + (p.highlights && p.highlights.length
          ? '<ul class="highlights">' + p.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>"
          : "")
      : "")
    + (p.servers ? '<div class="servers" data-feed="' + esc(p.servers) + '"><p class="server-line">Loading&hellip;</p></div>' : "");
  const pics = p.gallery || [];

  // With no description, the Role section takes the left side instead.
  const wide = !main && side;
  return heroHtml(p)
    + '<header class="pv-head pv-in"><h2>' + esc(p.title) + "</h2>"
    + (p.tagline || p.steam ? '<p class="tagline">' + esc(p.tagline || "")
        + (p.steam ? ' <a class="steam" href="' + esc(p.steam.url) + '">' + STEAM_ICON + esc(p.steam.label) + "</a>" : "")
        + "</p>" : "")
    + linksHtml(p) + "</header>"
    + (wide
      ? '<div class="pv-body pv-in single"><div class="pv-main pv-side">' + side + "</div></div>"
      : '<div class="pv-body pv-in' + (side ? "" : " single") + '"><div class="pv-main">' + main + "</div>"
        + (side ? '<aside class="pv-side">' + side + "</aside>" : "") + "</div>")
    + (pics.length ? '<div class="gallery pv-gallery pv-in">' + pics.map(function (src) {
        return '<span class="gallery-item"><img src="' + esc(src) + '" alt="" loading="lazy"></span>';
      }).join("") + "</div>" : "")
    + '<nav class="pv-nav pv-in">'
    + (prev ? '<button class="pv-step" data-step="-1">&larr; ' + esc(prev.title) + "</button>" : "<span></span>")
    + (next ? '<button class="pv-step" data-step="1">' + esc(next.title) + " &rarr;</button>" : "<span></span>")
    + "</nav>";
}

const pv = document.createElement("div");
pv.className = "project-view";
pv.hidden = true;
pv.innerHTML = '<div class="pv-backdrop"></div><article class="pv-frame" role="dialog" aria-modal="true">'
  + '<div class="pv-scroll"></div><span class="pv-esc">Esc to close</span>'
  + '<button class="pv-close" aria-label="Close">&times;</button></article>';
document.body.appendChild(pv);
const pvFrame = pv.querySelector(".pv-frame");
const pvScroll = pv.querySelector(".pv-scroll");
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let pvList = [];
let pvIndex = -1;
let pvTile = null;
let pvBusy = false;

function placeFrame(rect) {
  pvFrame.style.top = rect.top + "px";
  pvFrame.style.left = rect.left + "px";
  pvFrame.style.width = rect.width + "px";
  pvFrame.style.height = rect.height + "px";
}

function clearFrame() {
  ["top", "left", "width", "height"].forEach(function (k) { pvFrame.style[k] = ""; });
}

function fillView() {
  clearInterval(serverTimer);
  const p = pvList[pvIndex];
  pvScroll.innerHTML = viewHtml(p, pvList[pvIndex - 1], pvList[pvIndex + 1]);
  pvScroll.scrollTop = 0;
  const box = pvScroll.querySelector(".servers");
  if (box) {
    refreshServers(box);
    serverTimer = setInterval(function () { refreshServers(box); }, 30000);
  }
}

function openView(list, index, tile, instant) {
  if (pvBusy) return;
  pvList = list;
  pvIndex = index;
  pvTile = tile;
  fillView();
  pv.hidden = false;
  document.documentElement.classList.add("pv-lock");
  if (location.hash !== "#" + list[index].id) history.pushState({ pv: true }, "", "#" + list[index].id);

  if (calm || instant || !tile) {
    pv.classList.add("open");
  } else {
    // Start the frame exactly over the card, then let it grow to full size.
    // While it moves, the picture fills the whole frame so it scales evenly from the centre.
    pv.classList.add("pv-anim");
    pvFrame.classList.add("no-anim");
    placeFrame(tile.getBoundingClientRect());
    tile.classList.add("pv-source");
    void pvFrame.offsetWidth;
    pvFrame.classList.remove("no-anim");
    clearFrame();
    requestAnimationFrame(function () { pv.classList.add("open"); });
    setTimeout(function () { pv.classList.remove("pv-anim"); }, 500);
  }
  setTimeout(function () { pv.querySelector(".pv-close").focus({ preventScroll: true }); }, calm ? 0 : 500);
}

function closeView(fromHistory) {
  if (pv.hidden || pvBusy) return;
  pvBusy = true;
  clearInterval(serverTimer);
  pv.classList.remove("open");
  const finish = function () {
    pv.hidden = true;
    pvFrame.classList.add("no-anim");
    clearFrame();
    pvScroll.innerHTML = "";
    pv.classList.remove("pv-anim");
    document.documentElement.classList.remove("pv-lock");
    if (pvTile) { pvTile.classList.remove("pv-source"); pvTile.focus({ preventScroll: true }); }
    void pvFrame.offsetWidth;
    pvFrame.classList.remove("no-anim");
    pvBusy = false;
  };
  if (!fromHistory && location.hash) history.pushState({}, "", location.pathname + location.search);
  if (calm || !pvTile || !document.body.contains(pvTile)) { finish(); return; }
  // Text fades and the picture fills the frame first, then the frame shrinks back into its card.
  pvScroll.scrollTo({ top: 0, behavior: "smooth" });
  pv.classList.add("pv-anim");
  setTimeout(function () { placeFrame(pvTile.getBoundingClientRect()); }, 150);
  setTimeout(finish, 150 + 500);
}

function stepView(dir) {
  const next = pvIndex + dir;
  if (next < 0 || next >= pvList.length) return;
  pvScroll.classList.add("swapping");
  setTimeout(function () {
    pvIndex = next;
    fillView();
    history.replaceState({ pv: true }, "", "#" + pvList[pvIndex].id);
    const t = document.querySelector('.tile[data-id="' + pvList[pvIndex].id + '"]');
    if (t) {
      if (pvTile) pvTile.classList.remove("pv-source");
      pvTile = t;
      pvTile.classList.add("pv-source");
    }
    pvScroll.classList.remove("swapping");
  }, 200);
}

pv.querySelector(".pv-backdrop").addEventListener("click", function () { closeView(); });
pv.querySelector(".pv-close").addEventListener("click", function () { closeView(); });
pvScroll.addEventListener("click", function (e) {
  const step = e.target.closest(".pv-step");
  if (step) { stepView(Number(step.dataset.step)); return; }
  if (e.target.tagName === "IMG" && e.target.closest(".gallery")) {
    viewer.querySelector("img").src = e.target.src;
    viewer.hidden = false;
  }
});
window.addEventListener("popstate", function () { if (!pv.hidden) closeView(true); });

let serverTimer = null;

// Tiny extra unevenness per corner, in percent: top-left, top-right, bottom-right, bottom-left.
const ROUGH = [[0, 0.5, 0.3, 0], [0.4, 0, 0, 0.4], [0, 0.3, 0.5, 0], [0.3, 0, 0, 0.3], [0.2, 0.5, 0.2, 0]];

// One row of cards; clicking a card opens it full screen.
function makeGrid(grid, list, squares) {

  // Projects page: big plain squares with the name and tagline always showing.
  if (squares) grid.innerHTML = list.map(function (p) {
    const art = p.background ? ' style="background-image: url(\'' + esc(p.background) + '\')'
      + (p.cardFill ? "; background-color: " + esc(p.cardFill) + "; background-size: contain" : "") + '"' : "";
    if (p.classified) return '<button class="tile square classified' + (p.locked ? " locked" : "") + '" data-id="' + esc(p.id) + '"' + (p.locked ? " disabled" : "") + ">" + classifiedArt(p)
      + '<span class="square-text"><h3>' + esc(p.title) + "</h3>"
      + (p.tagline ? '<span class="square-tagline">' + esc(p.tagline) + "</span>" : "") + "</span></button>";
    return '<button class="tile square" data-id="' + esc(p.id) + '"' + art + '>' + hoverVideo(p) + '<span class="square-text">'
      + "<h3>" + esc(p.title) + "</h3>"
      + (p.tagline ? '<span class="square-tagline">' + esc(p.tagline) + "</span>" : "")
      + "</span></button>";
  }).join("");

  else grid.innerHTML = list.map(function (p) {
    // Home cards are tall, so each picture can be nudged (cardFocus) or zoomed out (cardZoom)
    // to keep its important part in frame; a blurred copy fills any space left around it.
    const zoom = p.cardZoom && p.cardZoom < 1 ? p.cardZoom : 0;
    const url = "url('" + esc(p.background) + "')";
    const art = p.background && !zoom ? ' style="background-image: ' + url
      + (p.cardFill ? "; background-color: " + esc(p.cardFill) + "; background-size: contain; background-repeat: no-repeat" : "")
      + (p.cardFocus ? "; background-position: " + esc(p.cardFocus) : "")
      + (p.cardZoom > 1 ? "; background-size: auto " + Math.round(p.cardZoom * 100) + "%" : "") + '"' : "";
    const backdrop = p.background && zoom
      ? '<span class="art-backdrop" style="background-image: ' + url + '"></span>'
        + '<span class="art-zoomed" style="background-image: ' + url + "; background-size: auto " + Math.round(zoom * 100) + "%"
        + (p.cardFocus ? "; background-position: " + esc(p.cardFocus) : "") + '"></span>'
      : "";
    if (p.classified) return '<button class="tile classified' + (p.locked ? " locked" : "") + '" data-id="' + esc(p.id) + '"' + (p.locked ? " disabled" : "") + '><span class="art">' + classifiedArt(p)
      + "<h3>" + esc(p.title) + "</h3></span></button>";
    return '<button class="tile" data-id="' + esc(p.id) + '"><span class="art"' + art + ">" + backdrop + hoverVideo(p) + "<h3>" + esc(p.title) + "</h3></span></button>";
  }).join("");

  // The row's outline dips towards the middle: each card's top and bottom edge slope
  // along one smooth curve across the whole row, so outer cards are tallest.
  const shapeRow = function () {
    const tiles = grid.querySelectorAll(".tile");
    if (!tiles.length) return;
    const first = tiles[0].getBoundingClientRect();
    const last = tiles[tiles.length - 1].getBoundingClientRect();
    const centre = (first.left + last.right) / 2;
    const half = (last.right - first.left) / 2 || 1;
    const dip = function (x, depth) {
      const u = (x - centre) / half;
      return depth * (1 - u * u);
    };
    tiles.forEach(function (t, i) {
      const r = t.getBoundingClientRect();
      const j = ROUGH[i % ROUGH.length];
      const tl = (dip(r.left, 5) + j[0]).toFixed(2);
      const tr = (dip(r.right, 5) + j[1]).toFixed(2);
      const br = (100 - dip(r.right, 3.5) - j[2]).toFixed(2);
      const bl = (100 - dip(r.left, 3.5) - j[3]).toFixed(2);
      t.style.setProperty("--shape", "polygon(0 " + tl + "%, 100% " + tr + "%, 100% " + br + "%, 0 " + bl + "%)");
      // Tilt the name to sit parallel with the card's sloped bottom edge.
      const drop = (br - bl) / 100 * r.height;
      t.style.setProperty("--text-angle", Math.atan2(drop, r.width).toFixed(4) + "rad");
      t.style.setProperty("--text-lift", ((100 - bl) / 100 * r.height).toFixed(1) + "px");
      // Where the sloped bottom edge sits at the card's centre, for "Click to Expand".
      t.dataset.bottomMid = ((Number(bl) + Number(br)) / 2).toFixed(2);
      t.style.setProperty("--mid-lift", ((100 - (Number(bl) + Number(br)) / 2) / 100 * r.height).toFixed(1) + "px");
      // Tilt the "Unannounced" stamp to follow the sloped top edge.
      t.style.setProperty("--top-angle", Math.atan2((tr - tl) / 100 * r.height, r.width).toFixed(4) + "rad");
      t.style.setProperty("--top-drop", (tl / 100 * r.height).toFixed(1) + "px");
    });
  };
  if (!squares) {
    shapeRow();
    window.addEventListener("resize", shapeRow);

    // "Click to Expand" fades in just under whichever card is hovered.
    const hint = document.createElement("span");
    hint.className = "open-hint";
    hint.textContent = "Click to Expand";
    grid.appendChild(hint);
    grid.querySelectorAll(".tile").forEach(function (t) {
      t.addEventListener("mouseenter", function () {
        const mid = Number(t.dataset.bottomMid || 100) / 100;
        hint.style.left = (t.offsetLeft + t.offsetWidth / 2) + "px";
        hint.style.top = (t.offsetTop + t.offsetHeight * mid + 10) + "px";
        hint.style.setProperty("--angle", t.style.getPropertyValue("--text-angle") || "0rad");
        hint.classList.add("on");
      });
      t.addEventListener("mouseleave", function () { hint.classList.remove("on"); });
    });
  }

  // A card whose picture is missing keeps its name showing, so it isn't blank.
  list.forEach(function (p) {
    if (!p.background) return;
    const img = new Image();
    img.onerror = function () {
      const t = grid.querySelector('.tile[data-id="' + p.id + '"]');
      if (!t) return;
      (t.querySelector(".art") || t).style.backgroundImage = "";
      t.classList.add("no-art");
    };
    img.src = p.background;
  });

  // Projects with hoverCycle flick through their gallery pictures while hovered.
  list.forEach(function (p) {
    if (!p.hoverCycle || !(p.gallery || []).length) return;
    const tile = grid.querySelector('.tile[data-id="' + p.id + '"]');
    if (!tile) return;
    const host = tile.querySelector(".art") || tile;
    const layers = [0, 1].map(function () {
      const l = document.createElement("span");
      l.className = "hover-cycle";
      host.insertBefore(l, host.firstChild);
      return l;
    });
    let timer = null;
    let n = 0;
    let front = 0;
    const show = function () {
      const next = layers[1 - front];
      next.style.backgroundImage = "url('" + p.gallery[n % p.gallery.length] + "')";
      next.classList.add("on");
      layers[front].classList.remove("on");
      front = 1 - front;
      n++;
    };
    tile.addEventListener("mouseenter", function () {
      p.gallery.forEach(function (src) { new Image().src = src; });
      show();
      timer = setInterval(show, 1200);
    });
    tile.addEventListener("mouseleave", function () {
      clearInterval(timer);
      layers.forEach(function (l) { l.classList.remove("on"); });
      n = 0;
    });
  });

  grid.querySelectorAll(".hover-video").forEach(function (v) {
    const tile = v.closest(".tile");
    tile.addEventListener("mouseenter", function () { v.play().catch(function () {}); });
    tile.addEventListener("mouseleave", function () { v.pause(); v.currentTime = 0; });
  });

  const openable = list.filter(function (p) { return !p.locked; });
  grid.addEventListener("click", function (e) {
    const tile = e.target.closest(".tile");
    if (!tile || tile.disabled) return;
    const i = openable.findIndex(function (p) { return p.id === tile.dataset.id; });
    if (i >= 0) openView(openable, i, tile);
  });

  // Open straight away if the page was loaded with a project's address, e.g. #final-call.
  const fromHash = openable.findIndex(function (p) { return "#" + p.id === location.hash; });
  if (fromHash >= 0 && pv.hidden) {
    openView(openable, fromHash, grid.querySelector('.tile[data-id="' + openable[fromHash].id + '"]'), true);
  }
}

// Home page: every project in one row.
const homeGrid = document.querySelector("main > .grid");
if (homeGrid) makeGrid(homeGrid, PROJECTS);

// Projects page: one group per category, empty ones left out.
const groups = document.querySelector(".groups");
if (groups) {
  [["games", "Games"], ["modding", "Modding"], ["misc", "Misc"]].forEach(function (c) {
    const list = PROJECTS.filter(function (p) { return p.category === c[0]; });
    if (!list.length) return;
    const section = document.createElement("section");
    section.className = "group";
    section.innerHTML = '<h2 class="group-title">' + c[1] + '</h2><div class="squares"></div>';
    groups.appendChild(section);
    makeGrid(section.querySelector(".squares"), list, true);
  });
}

// Full-size picture closes on click; Esc closes the picture first, then the project view.
if (viewer) viewer.addEventListener("click", function () { viewer.hidden = true; });
document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  if (viewer && !viewer.hidden) viewer.hidden = true;
  else closeView();
});

// Live server status, one line per server.
const JOIN_URL = "steam://run/939510//+connect {ip}:{port}";

function refreshServers(box) {
  fetch(box.dataset.feed, { cache: "no-store" })
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (data) {
      const servers = data.servers || [];
      if (!servers.length) {
        box.innerHTML = '<p class="server-line">No servers online right now</p>';
        return;
      }
      box.innerHTML = servers.map(function (s) {
        const href = s.ip ? JOIN_URL.replace("{ip}", s.ip).replace("{port}", s.port || 2838) : "";
        const live = (s.players || 0) > 0 ? " live" : "";
        return '<p class="server-line"><span class="dot' + live + '"></span>'
          + (servers.length > 1 ? esc(s.name || s.ip) + " &middot; " : "")
          + (s.players || 0) + "/" + (s.maxPlayers || 30) + " players online"
          + (href ? ' &middot; <a href="' + esc(href) + '">Join</a>' : "")
          + "</p>";
      }).join("");
    })
    .catch(function () {
      box.innerHTML = '<p class="server-line">Server list unavailable</p>';
    });
}

// Menu video sound toggle on the home page.
const stageVideo = document.querySelector(".stage-video");
const soundToggle = document.querySelector(".sound-toggle");
if (stageVideo && soundToggle) {
  soundToggle.addEventListener("click", function () {
    stageVideo.muted = !stageVideo.muted;
    if (!stageVideo.muted) stageVideo.play();
    soundToggle.setAttribute("aria-pressed", String(!stageVideo.muted));
    soundToggle.setAttribute("aria-label", stageVideo.muted ? "Turn sound on" : "Turn sound off");
  });
}

// Home opening: everything starts fading in as soon as the menu video starts playing.
const REVEAL_DELAY_MS = 100;
if (document.body.classList.contains("waiting")) {
  let revealed = false;
  const reveal = function () {
    if (revealed) return;
    revealed = true;
    setTimeout(function () { document.body.classList.remove("waiting"); }, REVEAL_DELAY_MS);
  };
  if (!stageVideo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.body.classList.remove("waiting");
  else {
    if (!stageVideo.paused && stageVideo.currentTime > 0) reveal();
    stageVideo.addEventListener("playing", reveal, { once: true });
    // In case the video can't play at all.
    setTimeout(reveal, 2500);
  }
}

// Clicking the email under the name copies it and briefly says so.
document.querySelectorAll(".email[data-email]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const address = btn.dataset.email;
    const done = function () {
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(function () { btn.textContent = address; btn.classList.remove("copied"); }, 1500);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(address).then(done, done);
    else {
      const field = document.createElement("textarea");
      field.value = address;
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
      done();
    }
  });
});
