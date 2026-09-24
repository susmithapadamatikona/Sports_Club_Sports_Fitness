// Stackly — site-wide animations: staggered scroll reveals, slide-in directions,
// scroll progress bar and a back-to-top button. Loaded on every page.
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- which elements reveal, and how ----------
  const REVEAL = [
    // public site
    ".section-head", ".sport-card", ".about-media", ".about-text", ".fac-card", ".coach-card",
    ".events-left", ".events-right", ".member-inner", ".t-head", ".t-card", ".t-img",
    ".story-text", ".story-media", ".stat-card", ".why-left", ".why-right", ".value", ".team-head", ".team-card",
    ".action-head", ".featured", ".side-event", ".upcoming-head", ".event-card", ".past-head", ".past-card", ".quote-block",
    ".blog-toolbar", ".side-box", ".side-news", ".featured-post", ".post-card", ".pagination",
    ".contact-info h2", ".contact-sub", ".info-card", ".contact-form", ".map-box",
    ".f-brand", ".f-col",
    // dashboard
    ".tile", ".panel", ".ev-hero", ".dev-card", ".dash-list li", ".log-list li", ".past-mini-card",
  ].join(",");
  const FROM_LEFT = ".about-media, .story-text, .why-left, .events-left, .contact-info h2, .featured, .quote-block";
  const FROM_RIGHT = ".about-text, .story-media, .why-right, .events-right, .side-event, .contact-form";
  const ZOOM = ".featured-post, .map-box, .ev-hero, .member-inner";

  const els = [...document.querySelectorAll(REVEAL)];
  if (!reduce && els.length) {
    // stagger siblings: each card in a grid starts a little after the previous one
    const groups = new Map();
    els.forEach((el) => {
      const g = groups.get(el.parentElement) || [];
      g.push(el);
      groups.set(el.parentElement, g);
    });
    groups.forEach((g) => g.forEach((el, i) => el.style.setProperty("--d", `${Math.min(i, 7) * 0.09}s`)));

    els.forEach((el) => {
      el.classList.add("reveal");
      if (el.matches(FROM_LEFT)) el.classList.add("from-left");
      else if (el.matches(FROM_RIGHT)) el.classList.add("from-right");
      else if (el.matches(ZOOM)) el.classList.add("zoom-in");
    });

    // once an element has finished revealing, drop the reveal classes so its own
    // hover effects (lift, zoom) work normally again
    const settle = (el) => {
      const done = () => {
        el.classList.remove("reveal", "show", "from-left", "from-right", "zoom-in");
        el.style.removeProperty("--d");
      };
      el.addEventListener("transitionend", (e) => { if (e.target === el && e.propertyName === "opacity") done(); }, { once: true });
      setTimeout(done, 2200); // safety net
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("show");
        settle(e.target);
        io.unobserve(e.target);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Backup check: anything already on screen (on load, after the preloader, or while
    // scrolling) is revealed even if the observer above misses it — nothing stays hidden.
    const revealInView = () => {
      const limit = innerHeight - 20;
      els.forEach((el) => {
        if (!el.classList.contains("reveal") || el.classList.contains("show")) return;
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) {
          el.classList.add("show");
          settle(el);
          io.unobserve(el);
        }
      });
    };
    requestAnimationFrame(revealInView);
    window.addEventListener("load", revealInView);
    setTimeout(revealInView, 900);
    setTimeout(revealInView, 2000);
    let pending = false;
    window.addEventListener("scroll", () => {
      if (pending) return;
      pending = true;
      setTimeout(() => { pending = false; revealInView(); }, 120);
    }, { passive: true });
  }

  // ---------- scroll progress bar + back-to-top (public pages only) ----------
  if (document.querySelector(".footer")) {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    const top = document.createElement("button");
    top.className = "to-top";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
    document.body.appendChild(top);

    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      top.classList.toggle("show", scrollY > innerHeight * 0.8);
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
