// Shared script for every page — each block only runs if its elements exist.

// Mobile menu
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );
}

// Fixed header: add a solid background once the page is scrolled
const siteNav = document.querySelector(".nav");
if (siteNav) {
  const onScroll = () => siteNav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Animated counters (start when they scroll into view)
const animateCount = (el) => {
  const target = +el.dataset.count;
  const start = performance.now();
  const dur = 1600;
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
    el.textContent = val.toLocaleString("en-US") + "+";
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const countIO = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countIO.unobserve(e.target);
      }
    }),
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

// Scroll reveal
const revealEls = document.querySelectorAll(
  ".section-head, .sport-card, .about-media, .about-text, .fac-card, .coach-card, .events-left, .events-right, .member-inner, .t-head, .t-grid, " +
    ".story-text, .story-media, .stat-card, .why-left, .why-right, .team-head, .team-card, .action-head, .featured, .side-list, .upcoming-head, .event-card, .past-head, .past-card, .quote-block, .side-box, .side-news, .featured-post, .post-card, .info-card, .contact-form, .map-box"
);
revealEls.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Events switcher (home page)
const evImg = document.getElementById("evImg");
if (evImg) {
  const evTitle = document.getElementById("evTitle");
  const evDesc = document.getElementById("evDesc");
  const evDate = document.getElementById("evDate");
  const evPlace = document.getElementById("evPlace");
  document.querySelectorAll(".ev-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".ev-item").forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      evImg.style.opacity = 0;
      setTimeout(() => {
        evImg.src = item.dataset.img;
        evTitle.innerHTML = item.dataset.title;
        evDesc.textContent = item.dataset.desc;
        evDate.textContent = item.dataset.date;
        evPlace.textContent = item.dataset.place;
        evImg.style.opacity = 1;
      }, 250);
    });
  });
}

// Newsletter forms (footer on every page, blog sidebar)
document.querySelectorAll(".newsletter form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.parentElement.querySelector(".news-msg");
    if (msg) msg.textContent = "Thanks for subscribing!";
    form.reset();
  });
});

// Event filters (events page)
const eventFilters = document.getElementById("eventFilters");
if (eventFilters) {
  const cards = document.querySelectorAll("#eventGrid .event-card");
  const empty = document.getElementById("noEvents");
  eventFilters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    eventFilters.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    let shown = 0;
    cards.forEach((c) => {
      const match = f === "all" || c.dataset.sport === f;
      c.hidden = !match;
      if (match) shown++;
    });
    empty.hidden = shown > 0;
  });
}

// Testimonial rotator (events page)
const quoteDots = document.getElementById("quoteDots");
if (quoteDots) {
  const quotes = [
    { img: "images/avatar-arjun-mehta.webp", name: "Arjun Mehta", role: "Football Player",
      text: "\"The events at this club are next level! Great organization, amazing people and an incredible atmosphere. I've made friends, found my passion and pushed my limits.\"" },
    { img: "images/avatar-brooklyn.webp", name: "Brooklyn Simmons", role: "Marathon Runner",
      text: "\"Running the City Marathon with the club was unforgettable. The support from coaches and fellow members kept me going every single kilometre.\"" },
    { img: "images/avatar-jane.webp", name: "Jane Cooper", role: "Tennis Player",
      text: "\"The Tennis Open was brilliantly run — fair draws, great courts and a crowd that made every match feel like a final.\"" },
    { img: "images/about-coach-priya.webp", name: "Priya Nair", role: "Tennis Coach",
      text: "\"Watching our members compete and grow at every event is the best part of my job. The energy here is simply contagious.\"" },
  ];
  const dots = quoteDots.querySelectorAll("button");
  const qText = document.querySelector(".quote-text");
  let qi = 0;
  const showQuote = (i) => {
    qi = i;
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    qText.style.opacity = 0;
    setTimeout(() => {
      const q = quotes[i];
      document.getElementById("quoteImg").src = q.img;
      document.getElementById("quoteText").textContent = q.text;
      document.getElementById("quoteName").textContent = q.name;
      document.getElementById("quoteRole").textContent = q.role;
      qText.style.opacity = 1;
    }, 250);
  };
  dots.forEach((d, k) => d.addEventListener("click", () => showQuote(k)));
  setInterval(() => showQuote((qi + 1) % quotes.length), 6000);
}

// Blog: search, category filter, sort, pagination (blog page)
const postGrid = document.getElementById("postGrid");
if (postGrid) {
  const posts = [...postGrid.querySelectorAll(".post-card")];
  const search = document.getElementById("blogSearch");
  const sort = document.getElementById("blogSort");
  const catList = document.getElementById("blogCats");
  const empty = document.getElementById("noPosts");
  let activeCat = null;

  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    posts.forEach((p) => {
      const text = p.textContent.toLowerCase();
      const ok = (!q || text.includes(q)) && (!activeCat || p.dataset.cat === activeCat);
      p.hidden = !ok;
      if (ok) shown++;
    });
    empty.hidden = shown > 0;
  };

  search.addEventListener("input", apply);
  catList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    activeCat = activeCat === btn.dataset.cat ? null : btn.dataset.cat; // click again to clear
    catList.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.cat === activeCat));
    apply();
    postGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  sort.addEventListener("change", () => {
    const dir = sort.value === "oldest" ? 1 : -1;
    posts
      .sort((a, b) => dir * a.dataset.date.localeCompare(b.dataset.date))
      .forEach((p) => postGrid.insertBefore(p, empty));
  });

  const pager = document.getElementById("pagination");
  const pages = [...pager.querySelectorAll("button:not(.pg-arrow)")];
  const goTo = (i) => {
    pages.forEach((b, k) => b.classList.toggle("active", k === i));
    document.querySelector(".blog-content").scrollIntoView({ behavior: "smooth", block: "start" });
  };
  pager.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const cur = pages.findIndex((b) => b.classList.contains("active"));
    if (btn.classList.contains("pg-arrow")) goTo(Math.min(pages.length - 1, Math.max(0, cur + +btn.dataset.dir)));
    else goTo(pages.indexOf(btn));
  });
}

// Contact form (contact page) — front-end validation only, no server yet
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const status = document.getElementById("formStatus");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    contactForm.querySelectorAll("[required]").forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    status.className = "form-status " + (ok ? "ok" : "err");
    status.textContent = ok
      ? "Thanks! Your message has been sent — we'll get back to you within 24 hours."
      : "Please fill in your name, a valid email, a subject and your message.";
    if (ok) contactForm.reset();
  });
  contactForm.addEventListener("input", (e) => e.target.classList.remove("invalid"));
}

// Save the signed-in user for the dashboard (demo only — nothing is sent to a server)
function saveUser(user, remember) {
  try {
    localStorage.removeItem("stacklyUser");
    sessionStorage.removeItem("stacklyUser");
    user.signedAt = new Date().toISOString();
    (remember ? localStorage : sessionStorage).setItem("stacklyUser", JSON.stringify(user));
  } catch (e) {}
}

// Login page — show/hide password + front-end checks (no account system connected yet)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  const pw = document.getElementById("loginPassword");
  const eye = document.getElementById("togglePassword");
  const status = document.getElementById("loginStatus");
  eye.addEventListener("click", () => {
    const show = pw.type === "password";
    pw.type = show ? "text" : "password";
    eye.setAttribute("aria-label", show ? "Hide password" : "Show password");
    eye.querySelector("use").setAttribute("href", show ? "#i-eye-off" : "#i-eye");
  });
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email, pass = loginForm.password;
    const badEmail = !/^\S+@\S+\.\S+$/.test(email.value);
    const badPass = pass.value.length < 6;
    email.closest(".field").classList.toggle("invalid", badEmail);
    pass.closest(".field").classList.toggle("invalid", badPass);
    if (badEmail || badPass) {
      status.className = "login-status err";
      status.textContent = badEmail ? "Please enter a valid email address." : "Your password must be at least 6 characters.";
      return;
    }
    // Demo sign-in: no server yet, so any valid email + password is accepted.
    const local = email.value.split("@")[0].replace(/[._-]+/g, " ").trim();
    const name = local.replace(/\b\w/g, (c) => c.toUpperCase()) || "Athlete";
    saveUser({ name, email: email.value.trim(), role: loginForm.role.value }, loginForm.remember.checked);
    status.className = "login-status ok";
    status.textContent = "Logging you in…";
    (window.stacklyGo || ((u) => (location.href = u)))("dashboard.html");
  });
  loginForm.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("invalid"));
  document.getElementById("googleBtn").addEventListener("click", () => {
    status.className = "login-status ok";
    status.textContent = "Google sign-in will be available once it's connected.";
  });
}

// Sign up page — front-end checks (no account system connected yet)
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  const pw = document.getElementById("loginPassword");
  const eye = document.getElementById("togglePassword");
  const status = document.getElementById("loginStatus");
  const agreeLabel = document.getElementById("agreeLabel");
  eye.addEventListener("click", () => {
    const show = pw.type === "password";
    pw.type = show ? "text" : "password";
    eye.setAttribute("aria-label", show ? "Hide password" : "Show password");
    eye.querySelector("use").setAttribute("href", show ? "#i-eye-off" : "#i-eye");
  });
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = signupForm;
    const checks = [
      [!f.name.value.trim(), f.name, "Please enter your name."],
      [!/^\S+@\S+\.\S+$/.test(f.email.value), f.email, "Please enter a valid email address."],
      [f.password.value.length < 6, f.password, "Your password must be at least 6 characters."],
    ];
    let msg = "";
    checks.forEach(([bad, input, text]) => {
      input.closest(".field").classList.toggle("invalid", bad);
      if (bad && !msg) msg = text;
    });
    const noAgree = !f.agree.checked;
    agreeLabel.classList.toggle("invalid", noAgree);
    if (!msg && noAgree) msg = "Please agree to the Terms and Privacy policy.";
    if (msg) {
      status.className = "login-status err";
      status.textContent = msg;
      return;
    }
    saveUser({ name: f.name.value.trim(), email: f.email.value.trim(), role: f.role.value }, true);
    status.className = "login-status ok";
    status.textContent = "Account created! Taking you to your dashboard…";
    (window.stacklyGo || ((u) => (location.href = u)))("dashboard.html");
  });
  signupForm.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("invalid"));
  signupForm.agree.addEventListener("change", () => agreeLabel.classList.remove("invalid"));
  document.getElementById("googleBtn").addEventListener("click", () => {
    status.className = "login-status ok";
    status.textContent = "Google sign-up will be available once it's connected.";
  });
}

// Blog sidebar tags: click a tag to search for it (click again to clear)
const tagCloud = document.querySelector(".tag-cloud");
const blogSearchBox = document.getElementById("blogSearch");
if (tagCloud && blogSearchBox) {
  tagCloud.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const on = !b.classList.contains("active");
    tagCloud.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
    b.classList.toggle("active", on);
    blogSearchBox.value = on ? b.dataset.tag.replace("-", " ").replace("warm up", "warm-up") : "";
    blogSearchBox.dispatchEvent(new Event("input"));
    document.getElementById("postGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Login / sign up: clicking anywhere in an input box (icon, padding) puts the cursor in it
document.querySelectorAll(".field").forEach((f) =>
  f.addEventListener("click", (e) => { if (!e.target.closest("button, input")) f.querySelector("input")?.focus(); })
);
