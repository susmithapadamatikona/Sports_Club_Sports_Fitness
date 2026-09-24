// Stackly preloader: shows the logo while a page loads and while moving to another page.
(function () {
  const loader = document.getElementById("preloader");
  if (!loader) { document.documentElement.classList.add("is-loaded"); return; }
  const MIN_SHOW = 500; // ms — long enough to see the logo, short enough not to annoy
  const start = performance.now();

  // html.is-loaded starts the page's entrance animations (see animations.css)
  const reveal = () => { loader.classList.add("hide"); document.documentElement.classList.add("is-loaded"); };
  const hide = () => {
    const wait = Math.max(0, MIN_SHOW - (performance.now() - start));
    setTimeout(reveal, wait);
  };
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide);
  setTimeout(reveal, 1800); // never keep people waiting on a slow image or font

  // Coming back with the browser's Back button: don't leave the loader stuck on screen
  window.addEventListener("pageshow", (e) => { if (e.persisted) reveal(); });

  // Other scripts (login, sign up, log out) call this to leave with the loader showing
  window.stacklyGo = (url) => {
    loader.classList.remove("hide");
    setTimeout(() => { location.href = url; }, 350);
  };

  // Show the loader when leaving for another page on this site
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin && url.protocol !== "file:") return;
    if (url.pathname === location.pathname) return; // same-page anchor like index.html#sports while on index
    e.preventDefault();
    loader.classList.remove("hide");
    setTimeout(() => { location.href = a.href; }, 350);
  });
})();
