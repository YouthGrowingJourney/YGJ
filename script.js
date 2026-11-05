/* =========================================================
   YGJ — shared site script
   Injects icons, background, header + footer and runs all
   interactions. No accounts, no tracking, no cookies.
   ========================================================= */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  // ---------- Remove data left by the old login system ----------
  // The old site stored usernames + passwords in localStorage. Wipe it.
  try {
    ["users", "currentUser", "theme"].forEach(function (k) { localStorage.removeItem(k); });
    Object.keys(localStorage).forEach(function (k) {
      if (/^(ygj_free_|theme_|ygj-theme)/.test(k)) localStorage.removeItem(k);
    });
  } catch (e) { /* storage blocked: nothing to clean */ }

  // ---------- Links ----------
  var LINKS = {
    instagram: "https://www.instagram.com/youthgrowingjourney/",
    tiktok: "https://www.tiktok.com/@youthgrowingjourney",
    youtube: "https://www.youtube.com/@YouthGrowingJourney",
    tracker: "https://youthgrowingjourney.github.io/daily-tracker/",
    email: "ygjcontact@gmail.com"
  };
  window.YGJ_LINKS = LINKS;

  // ---------- Icon sprite ----------
  var S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var icons = {
    ig: '<symbol id="i-ig" viewBox="0 0 24 24" ' + S + '><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".6" fill="currentColor"/></symbol>',
    tt: '<symbol id="i-tt" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.6 3.7 3.9 3.9v3.1c-1.4.1-2.7-.3-3.9-1.1v6.2c0 3.6-2.6 6-5.9 6-3.4 0-6-2.6-5.8-6 .2-3.1 2.9-5.4 6.2-5.1v3.2c-1.5-.3-3 .6-3.1 2.1-.1 1.4 1 2.6 2.6 2.6 1.6 0 2.7-1.1 2.7-2.9V3h3.3z"/></symbol>',
    yt: '<symbol id="i-yt" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM9.8 15.1V8.9l5.6 3.1-5.6 3.1z"/></symbol>',
    play: '<symbol id="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></symbol>',
    arrow: '<symbol id="i-arrow" viewBox="0 0 24 24" ' + S + '><path d="M5 12h14M13 6l6 6-6 6"/></symbol>',
    out: '<symbol id="i-out" viewBox="0 0 24 24" ' + S + '><path d="M7 17 17 7M8 7h9v9"/></symbol>',
    left: '<symbol id="i-left" viewBox="0 0 24 24" ' + S + '><path d="m15 6-6 6 6 6"/></symbol>',
    right: '<symbol id="i-right" viewBox="0 0 24 24" ' + S + '><path d="m9 6 6 6-6 6"/></symbol>',
    check: '<symbol id="i-check" viewBox="0 0 24 24" ' + S + ' stroke-width="2.4"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>',
    x: '<symbol id="i-x" viewBox="0 0 24 24" ' + S + '><path d="M6 6l12 12M18 6 6 18"/></symbol>',
    plus: '<symbol id="i-plus" viewBox="0 0 24 24" ' + S + '><path d="M12 5v14M5 12h14"/></symbol>',
    mail: '<symbol id="i-mail" viewBox="0 0 24 24" ' + S + '><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></symbol>',
    shield: '<symbol id="i-shield" viewBox="0 0 24 24" ' + S + '><path d="M12 3 4.5 6v6c0 4.4 3.2 7.8 7.5 9 4.3-1.2 7.5-4.6 7.5-9V6L12 3z"/><path d="m9 12 2 2 4-4"/></symbol>',
    flame: '<symbol id="i-flame" viewBox="0 0 24 24" ' + S + '><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.6 1 2.5 2 3 0-3 0-5.5 1-8.5z"/></symbol>',
    target: '<symbol id="i-target" viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></symbol>',
    dumbbell: '<symbol id="i-dumbbell" viewBox="0 0 24 24" ' + S + '><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></symbol>',
    brain: '<symbol id="i-brain" viewBox="0 0 24 24" ' + S + '><path d="M9.5 4A3 3 0 0 0 6.6 6.3 3.2 3.2 0 0 0 4.5 9.4c0 .9.3 1.7.9 2.3A3.3 3.3 0 0 0 7 17.6 3 3 0 0 0 12 19V5.5A2.3 2.3 0 0 0 9.5 4zM14.5 4A3 3 0 0 1 17.4 6.3a3.2 3.2 0 0 1 2.1 3.1c0 .9-.3 1.7-.9 2.3a3.3 3.3 0 0 1-1.6 5.9A3 3 0 0 1 12 19"/></symbol>',
    book: '<symbol id="i-book" viewBox="0 0 24 24" ' + S + '><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/></symbol>',
    moon: '<symbol id="i-moon" viewBox="0 0 24 24" ' + S + '><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></symbol>',
    calendar: '<symbol id="i-calendar" viewBox="0 0 24 24" ' + S + '><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></symbol>',
    users: '<symbol id="i-users" viewBox="0 0 24 24" ' + S + '><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.5 3.3-5.5 6.5-5.5s5.9 2 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.5 3.5 5.2"/></symbol>',
    trophy: '<symbol id="i-trophy" viewBox="0 0 24 24" ' + S + '><path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v3M8 21h8M9.5 17h5v4h-5z"/></symbol>',
    pen: '<symbol id="i-pen" viewBox="0 0 24 24" ' + S + '><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z"/><path d="m13.5 6.5 4 4"/></symbol>',
    zap: '<symbol id="i-zap" viewBox="0 0 24 24" ' + S + '><path d="M13 3 4.5 13.5H12L11 21l8.5-10.5H12L13 3z"/></symbol>',
    compass: '<symbol id="i-compass" viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/></symbol>',
    download: '<symbol id="i-download" viewBox="0 0 24 24" ' + S + '><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></symbol>',
    apple: '<symbol id="i-apple" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.4-1-2.4-3.7zM14.2 5.6c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3z"/></symbol>',
    gplay: '<symbol id="i-gplay" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2.8c-.3.3-.5.8-.5 1.4v15.6c0 .6.2 1.1.5 1.4l8.9-9.2L4 2.8zm10 8.1 2.8-2.9L6.6 2.2c-.4-.2-.8-.3-1.1-.2l8.5 8.9zm0 2.2-8.5 8.9c.3.1.7 0 1.1-.2l10.2-5.8-2.8-2.9zm6-2.9-2.4-1.4-3 3.2 3 3.1 2.4-1.4c1-.6 1-2.8 0-3.5z"/></symbol>',
    lock: '<symbol id="i-lock" viewBox="0 0 24 24" ' + S + '><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></symbol>',
    sparkle: '<symbol id="i-sparkle" viewBox="0 0 24 24" ' + S + '><path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7zM19 16c.3 1.8 1 2.6 2.5 3-1.5.3-2.2 1.1-2.5 2.5-.3-1.4-1-2.2-2.5-2.5 1.5-.4 2.2-1.2 2.5-3z"/></symbol>',
    clock: '<symbol id="i-clock" viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>',
    mountain: '<symbol id="i-mountain" viewBox="0 0 24 24" ' + S + '><path d="m3 19 7-11 4 6 2-3 5 8H3z"/></symbol>',
    layers: '<symbol id="i-layers" viewBox="0 0 24 24" ' + S + '><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/></symbol>',
    heart: '<symbol id="i-heart" viewBox="0 0 24 24" ' + S + '><path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/></symbol>',
    phone: '<symbol id="i-phone" viewBox="0 0 24 24" ' + S + '><rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M10.5 18.5h3"/></symbol>',
    eye: '<symbol id="i-eye" viewBox="0 0 24 24" ' + S + '><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>',
    chat: '<symbol id="i-chat" viewBox="0 0 24 24" ' + S + '><path d="M20 15a3 3 0 0 1-3 3H9l-5 3.5V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8z"/></symbol>'
  };
  var sprite = document.createElement("div");
  sprite.setAttribute("aria-hidden", "true");
  sprite.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  sprite.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + Object.keys(icons).map(function (k) { return icons[k]; }).join("") + "</svg>";
  document.body.prepend(sprite);

  function ico(id) { return '<svg aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  window.YGJ_ICON = ico;

  // The YGJ mark (mountain ridges from the logo)
  var MARK = '<svg viewBox="0 0 250 120" fill="none" aria-hidden="true"><g stroke="url(#ygjg)" stroke-width="11" stroke-linecap="square" stroke-linejoin="miter">' +
    '<path d="M8 104 L104 14 L200 104"/><path d="M68 104 L110 66 L150 104"/><path d="M123 79 L168 34 L240 104"/></g>' +
    '<defs><linearGradient id="ygjg" x1="0" y1="0" x2="250" y2="120" gradientUnits="userSpaceOnUse"><stop stop-color="#f6e2b3"/><stop offset=".5" stop-color="#e0c280"/><stop offset="1" stop-color="#c49a55"/></linearGradient></defs></svg>';
  window.YGJ_MARK = MARK;

  // ---------- Background ----------
  var bg = document.createElement("div");
  bg.className = "bg";
  bg.setAttribute("aria-hidden", "true");
  bg.innerHTML = '<div class="milkyway"></div><div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div><canvas class="sky"></canvas><div class="noise"></div>';
  document.body.prepend(bg);
  starfield(bg.querySelector("canvas.sky"));

  // ---------- Starry night sky (canvas) ----------
  function starfield(canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, stars = [], shooting = [], last = 0, nextShoot = 2500;
    var tints = ["255,255,255", "255,244,220", "246,226,179", "210,222,255"];

    function build() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(760, (W * H) / 1700));
      stars = [];
      for (var i = 0; i < count; i++) {
        var layer = Math.random() < 0.7 ? 0 : Math.random() < 0.75 ? 1 : 2; // far, mid, near
        stars.push({
          x: Math.random() * W, y: Math.random() * H * 1.6,
          r: [0.45, 0.85, 1.35][layer] * (0.7 + Math.random() * 0.6),
          a: 0.35 + Math.random() * 0.6,
          tw: 0.6 + Math.random() * 2.2, ph: Math.random() * Math.PI * 2,
          par: [0.02, 0.06, 0.12][layer],
          c: tints[Math.random() < 0.82 ? 0 : 1 + Math.floor(Math.random() * 3)]
        });
      }
    }

    function shoot() {
      var fromLeft = Math.random() < 0.5;
      shooting.push({
        x: fromLeft ? Math.random() * W * 0.5 : W * 0.5 + Math.random() * W * 0.5,
        y: Math.random() * H * 0.45,
        vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 5), vy: 2.5 + Math.random() * 2.5,
        life: 0, max: 55 + Math.random() * 35
      });
    }

    function draw(t) {
      var dt = Math.min(64, t - last || 16); last = t;
      var scroll = window.scrollY || 0;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var y = ((s.y - scroll * s.par) % (H * 1.6) + H * 1.6) % (H * 1.6);
        if (y > H + 4) continue;
        var alpha = reduce ? s.a : s.a * (0.55 + 0.45 * Math.sin(t / 1000 * s.tw + s.ph));
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + s.c + "," + alpha.toFixed(3) + ")";
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.25 && alpha > 0.6) { // soft glow + cross flare on the brightest stars
          ctx.fillStyle = "rgba(" + s.c + "," + (alpha * 0.12).toFixed(3) + ")";
          ctx.beginPath(); ctx.arc(s.x, y, s.r * 4, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "rgba(" + s.c + "," + (alpha * 0.35).toFixed(3) + ")";
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(s.x - s.r * 5, y); ctx.lineTo(s.x + s.r * 5, y);
          ctx.moveTo(s.x, y - s.r * 5); ctx.lineTo(s.x, y + s.r * 5); ctx.stroke();
        }
      }
      if (!reduce) {
        nextShoot -= dt;
        if (nextShoot <= 0) { shoot(); nextShoot = 5000 + Math.random() * 9000; }
        for (var j = shooting.length - 1; j >= 0; j--) {
          var m = shooting[j];
          m.life++; m.x += m.vx; m.y += m.vy;
          var k = 1 - m.life / m.max;
          var g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
          g.addColorStop(0, "rgba(255,246,222," + (0.95 * k).toFixed(3) + ")");
          g.addColorStop(1, "rgba(224,194,128,0)");
          ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14); ctx.stroke();
          if (m.life >= m.max) shooting.splice(j, 1);
        }
        requestAnimationFrame(draw);
      }
    }

    build();
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { build(); if (reduce) draw(0); }, 150); });
    if (reduce) {
      draw(0);
      window.addEventListener("scroll", function () { draw(0); }, { passive: true });
    } else {
      requestAnimationFrame(draw);
    }
  }

  // ---------- Header ----------
  var page = document.body.getAttribute("data-page") || "";
  var nav = [
    ["home", "index.html", "Home"],
    ["about", "about-us.html", "About"],
    ["hub", "optimization-hub.html", "Knowledge Hub"],
    ["reels", "index.html#reels", "Reels"],
    ["contact", "contact.html", "Contact"]
  ];
  function navLinks(cls) {
    return nav.map(function (n) {
      return '<a class="' + (cls || "") + '" href="' + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : "") + ">" + n[2] + "</a>";
    });
  }
  var socialsHtml =
    '<div class="socials">' +
    '<a href="' + LINKS.instagram + '" target="_blank" rel="noopener" aria-label="YGJ on Instagram">' + ico("ig") + "</a>" +
    '<a href="' + LINKS.tiktok + '" target="_blank" rel="noopener" aria-label="YGJ on TikTok">' + ico("tt") + "</a>" +
    '<a href="' + LINKS.youtube + '" target="_blank" rel="noopener" aria-label="YGJ on YouTube">' + ico("yt") + "</a>" +
    '<a href="contact.html" aria-label="Contact YGJ">' + ico("mail") + "</a></div>";
  window.YGJ_SOCIALS = socialsHtml;

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<nav class="nav" aria-label="Main">' +
    '<a class="brand" href="index.html" aria-label="YGJ home">' + MARK + '<span class="brand-name">YGJ<small>YOUTH GROWING JOURNEY</small></span></a>' +
    '<ul class="nav-links">' + navLinks().map(function (a) { return "<li>" + a + "</li>"; }).join("") + "</ul>" +
    '<div class="nav-cta"><a class="btn btn-gold btn-sm" href="index.html#app">' + ico("phone") + ' The App</a>' +
    '<button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button></div></nav>';
  document.body.prepend(header);

  var mm = document.createElement("div");
  mm.className = "mobile-menu";
  mm.setAttribute("aria-hidden", "true");
  mm.innerHTML = navLinks("big").join("") + '<a class="big" href="index.html#app">The App</a>' + socialsHtml;
  document.body.appendChild(mm);
  Array.prototype.forEach.call(mm.querySelectorAll("a.big"), function (a, i) { a.style.transitionDelay = (0.05 + i * 0.05) + "s"; });

  var menuBtn = header.querySelector(".menu-btn");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mm.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  menuBtn.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  mm.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  // ---------- Footer ----------
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap"><div class="footer-grid">' +
    '<div><a class="brand" href="index.html">' + MARK + '<span class="brand-name">YGJ<small>YOUTH GROWING JOURNEY</small></span></a>' +
    "<p>A movement of young people becoming their best selves. Built by a young person, for young people.</p>" + socialsHtml + "</div>" +
    '<div><h4>Explore</h4><ul><li><a href="index.html">Home</a></li><li><a href="about-us.html">About YGJ</a></li><li><a href="index.html#reels">Reels</a></li><li><a href="index.html#app">The App</a></li></ul></div>' +
    '<div><h4>Knowledge</h4><ul><li><a href="optimization-hub.html">Knowledge Hub</a></li><li><a href="sleep-optimization.html">Sleep</a></li><li><a href="gym-optimization.html">Gym</a></li><li><a href="nutrition-optimization.html">Nutrition</a></li><li><a href="socializing.html">Socializing</a></li></ul></div>' +
    '<div><h4>Connect</h4><ul><li><a href="' + LINKS.instagram + '" target="_blank" rel="noopener">Instagram</a></li><li><a href="' + LINKS.tiktok + '" target="_blank" rel="noopener">TikTok</a></li><li><a href="' + LINKS.youtube + '" target="_blank" rel="noopener">YouTube</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
    '</div><div class="footer-word" aria-hidden="true">GROW&nbsp;STRONG</div>' +
    '<div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() + ' Youth Growing Journey</span><span><a href="privacy.html">Privacy</a> &nbsp;·&nbsp; No cookies. No tracking. No accounts.</span></div></div>';
  var main = document.querySelector("main");
  (main && main.parentNode ? main.parentNode : document.body).insertBefore(footer, main ? main.nextSibling : null);

  // ---------- Header hide on scroll + parallax var ----------
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 30);
    if (!document.body.classList.contains("menu-open")) header.classList.toggle("hide", y > 400 && y > lastY + 4);
    if (y < lastY - 4) header.classList.remove("hide");
    lastY = y;
    document.documentElement.style.setProperty("--scroll", y.toFixed(0));
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- Split headings into words ----------
  Array.prototype.forEach.call(document.querySelectorAll(".split-words"), function (el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement("span"); w.className = "w";
            var inner = document.createElement("span"); inner.textContent = part; inner.style.setProperty("--i", i++);
            w.appendChild(inner); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR") {
          walk(n);
        }
      });
    })(el);
  });

  // ---------- Reveal on scroll ----------
  var revealEls = document.querySelectorAll(".reveal, .split-words, [data-inview]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add("in-view"); });
  }

  // ---------- Count up ----------
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute("data-count")), suffix = el.getAttribute("data-suffix") || "";
        var start = performance.now(), dur = 1600;
        (function step(t) {
          var p = Math.min(1, (t - start) / dur), v = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.textContent = v.toLocaleString("en-US") + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(start);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  // ---------- Accordions ----------
  Array.prototype.forEach.call(document.querySelectorAll(".acc-item > button"), function (btn) {
    var item = btn.parentNode;
    btn.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
    btn.addEventListener("click", function () {
      var open = !item.classList.contains("open");
      if (item.parentNode.hasAttribute("data-single")) {
        Array.prototype.forEach.call(item.parentNode.querySelectorAll(".acc-item.open"), function (o) {
          if (o !== item) { o.classList.remove("open"); o.querySelector("button").setAttribute("aria-expanded", "false"); }
        });
      }
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // ---------- Instagram embeds (load only after a tap) ----------
  function igSrc(path) {
    var clean = String(path).replace(/[^A-Za-z0-9_/-]/g, "");
    return "https://www.instagram.com/" + clean + "/embed/" + (clean.indexOf("p/") === 0 ? "captioned/" : "");
  }
  function igFrame(path, title) {
    return '<iframe src="' + igSrc(path) + '" title="' + (title || "YGJ on Instagram").replace(/"/g, "&quot;") +
      '" loading="lazy" allowtransparency="true" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" scrolling="no"></iframe>';
  }
  var lb;
  function openEmbed(path, title) {
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox ig";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.innerHTML = '<button class="close" aria-label="Close">' + ico("x") + '</button><div class="frame"></div>';
      document.body.appendChild(lb);
      lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".close")) closeEmbed(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeEmbed(); });
    }
    lb.querySelector(".frame").innerHTML = igFrame(path, title);
    lb.setAttribute("aria-label", title || "YGJ on Instagram");
    void lb.offsetWidth; // force reflow so the fade-in transition runs
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    lb.querySelector(".close").focus();
  }
  function closeEmbed() {
    if (!lb || !lb.classList.contains("open")) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(function () { lb.querySelector(".frame").innerHTML = ""; }, 400);
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-ig]");
    if (!t) return;
    e.preventDefault();
    var path = t.getAttribute("data-ig"), title = t.getAttribute("data-title");
    if (t.hasAttribute("data-inline")) {
      var holder = t.parentNode;
      holder.innerHTML = igFrame(path, title);
    } else {
      openEmbed(path, title);
    }
  });

  // ---------- Phone tilt ----------
  var phone = document.querySelector(".phone");
  if (phone && fine) {
    var stage = phone.closest(".phone-stage");
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      phone.style.setProperty("--ry", (x * 26).toFixed(1) + "deg");
      phone.style.setProperty("--rx", (-y * 18).toFixed(1) + "deg");
    });
    stage.addEventListener("pointerleave", function () { phone.style.removeProperty("--ry"); phone.style.removeProperty("--rx"); });
  }

  // Guide cross-navigation: <span data-guide-nav></span>
  var GUIDES = [
    ["sleep-optimization.html", "Sleep", "moon"],
    ["gym-optimization.html", "Gym", "dumbbell"],
    ["nutrition-optimization.html", "Nutrition", "heart"],
    ["socializing.html", "Socializing", "users"]
  ];
  var here = location.pathname.split("/").pop();
  Array.prototype.forEach.call(document.querySelectorAll("[data-guide-nav]"), function (el) {
    el.innerHTML = GUIDES.filter(function (g) { return g[0] !== here; }).map(function (g) {
      return '<a href="' + g[0] + '">' + ico(g[2]) + " " + g[1] + " guide</a>";
    }).join("");
  });

  // Mark placeholders: <span data-mark></span>
  Array.prototype.forEach.call(document.querySelectorAll("[data-mark]"), function (el) { el.innerHTML = MARK; });
  Array.prototype.forEach.call(document.querySelectorAll("[data-socials]"), function (el) { el.innerHTML = socialsHtml; });
})();
