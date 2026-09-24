// Dashboard pages (Overview, My Schedule, Activity, My Profile) share this script.
// It reads the user saved by the login / sign-up forms and fills in whichever page is open.
// All numbers are SAMPLE data until a real member system is connected.

function readUser() {
  try {
    const raw = localStorage.getItem("stacklyUser") || sessionStorage.getItem("stacklyUser");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function writeUser(u) {
  try {
    const store = localStorage.getItem("stacklyUser") ? localStorage : sessionStorage;
    store.setItem("stacklyUser", JSON.stringify(u));
  } catch (e) {}
}
const user = readUser();
if (!user) location.replace("login.html");

const ROLES = {
  member: {
    label: "Member",
    schedule: "My Bookings",
    activity: "My Activity",
    stats: [
      ["Sessions this month", "12", "3 more than last month", "d-bolt"],
      ["Active minutes", "540", "This week", "d-clock"],
      ["Upcoming bookings", "3", "Next: Tomorrow, 7:00 AM", "d-cal"],
      ["Membership", "Gold", "Renews on Dec 1, 2026", "d-card"],
    ],
    chart: { title: "Active minutes", sub: "This week", unit: "min", values: [45, 60, 30, 90, 75, 120, 120] },
    list: {
      title: "My bookings",
      sub: "Your sessions and events",
      items: [
        ["OCT", "12", "Strength & Conditioning", "7:00 AM · Training Zone", "Confirmed", "ok"],
        ["OCT", "14", "Swimming Technique", "6:30 PM · Aquatic Center", "Confirmed", "ok"],
        ["OCT", "18", "Inter-Club Championship", "9:00 AM · Main Sports Arena", "Registered", "ok"],
        ["OCT", "21", "Badminton Doubles Clinic", "5:00 PM · Indoor Courts", "Waitlist", "wait"],
        ["OCT", "25", "Badminton League — Round 1", "10:00 AM · Indoor Stadium", "Pending", "wait"],
        ["NOV", "02", "Swimming Gala", "8:00 AM · Aquatic Center", "Registered", "ok"],
      ],
    },
    actStats: [
      ["Workouts this week", "6", "Goal: 5 — nicely done", "d-bolt"],
      ["Calories burned", "3,240", "This week", "d-chart"],
      ["Current streak", "9 days", "Your best is 14 days", "d-trophy"],
    ],
    log: [
      ["Completed Strength & Conditioning", "Today, 8:05 AM"],
      ["Booked Swimming Technique for Oct 14", "Yesterday, 6:40 PM"],
      ["Registered for Inter-Club Championship", "Oct 8, 11:15 AM"],
      ["Hit a 7-day workout streak", "Oct 7, 7:30 AM"],
      ["Membership upgraded to Gold", "Oct 1, 9:00 AM"],
    ],
    quick: [["Book a session", "contact.html"], ["Browse events", "dash-events.html"], ["Read training tips", "blog.html"]],
  },
  coach: {
    label: "Coach",
    schedule: "My Classes",
    activity: "Sessions",
    stats: [
      ["Today's sessions", "4", "First at 7:00 AM", "d-cal"],
      ["My athletes", "28", "2 joined this week", "d-users"],
      ["Avg. attendance", "92%", "Last 30 days", "d-check"],
      ["Pending requests", "5", "Booking requests to review", "d-clock"],
    ],
    chart: { title: "Sessions coached", sub: "This week", unit: "sessions", values: [4, 5, 3, 6, 4, 7, 2] },
    list: {
      title: "My classes",
      sub: "Your coaching schedule",
      items: [
        ["TODAY", "7AM", "Football — U16 Squad", "Football Ground · 18 athletes", "Confirmed", "ok"],
        ["TODAY", "11AM", "1-to-1 Skills Session", "Training Zone · Rahul K.", "Confirmed", "ok"],
        ["TODAY", "5PM", "Fitness Bootcamp", "Modern Gym · 12 athletes", "Awaiting", "wait"],
        ["OCT", "13", "Football — Senior Squad", "Football Ground · 22 athletes", "Confirmed", "ok"],
        ["OCT", "14", "Goalkeeper Clinic", "Football Ground · 6 athletes", "Awaiting", "wait"],
        ["OCT", "18", "Inter-Club Championship", "Main Sports Arena · Team lead", "Confirmed", "ok"],
      ],
    },
    actStats: [
      ["Sessions this week", "31", "4 more than last week", "d-bolt"],
      ["Hours coached", "38 h", "This week", "d-clock"],
      ["Athlete rating", "4.9", "From 64 reviews", "d-trophy"],
    ],
    log: [
      ["Finished Football — U16 Squad", "Today, 8:30 AM"],
      ["Approved booking from Rahul K.", "Yesterday, 4:10 PM"],
      ["Posted a training tip on the blog", "Oct 8, 2:00 PM"],
      ["New athlete joined: Meera S.", "Oct 7, 10:20 AM"],
      ["Updated the Fitness Bootcamp plan", "Oct 6, 6:45 PM"],
    ],
    quick: [["View events", "dash-events.html"], ["Post a training tip", "blog.html"], ["Contact the club", "contact.html"]],
  },
  admin: {
    label: "Admin",
    schedule: "Approvals",
    activity: "Sign-ups",
    stats: [
      ["Total members", "2,500", "Across 15 sports", "d-users"],
      ["New sign-ups", "46", "This week", "d-bolt"],
      ["Active coaches", "25", "3 on leave", "d-check"],
      ["Upcoming events", "6", "Next: City Marathon", "d-trophy"],
    ],
    chart: { title: "New member sign-ups", sub: "This week", unit: "sign-ups", values: [5, 8, 6, 9, 4, 8, 6] },
    list: {
      title: "Approvals",
      sub: "Requests that need your review",
      items: [
        ["OCT", "10", "Coach application — Anita R.", "Tennis · 5 years experience", "Review", "wait"],
        ["OCT", "10", "Event: Badminton League", "Venue booking · Indoor Stadium", "Review", "wait"],
        ["OCT", "09", "Membership upgrade — Vikram S.", "Silver → Gold", "Approved", "ok"],
        ["OCT", "09", "Refund request — Kavya P.", "Cancelled swim session", "Review", "wait"],
        ["OCT", "08", "Blog post: Football Tactics", "Submitted by Arjun Sharma", "Approved", "ok"],
        ["OCT", "07", "Facility booking — Pool lane 3", "Swimming Gala practice", "Approved", "ok"],
      ],
    },
    actStats: [
      ["Sign-ups this week", "46", "12% up on last week", "d-bolt"],
      ["Renewals", "118", "This month", "d-card"],
      ["Open requests", "3", "Need your review", "d-clock"],
    ],
    log: [
      ["Approved membership upgrade — Vikram S.", "Today, 9:12 AM"],
      ["Published blog post: Football Tactics", "Yesterday, 3:30 PM"],
      ["Created event: Badminton League", "Oct 8, 12:05 PM"],
      ["Added coach profile: Sneha Iyer", "Oct 7, 11:00 AM"],
      ["Exported monthly members report", "Oct 1, 9:00 AM"],
    ],
    quick: [["Manage events", "dash-events.html"], ["Publish a blog post", "blog.html"], ["View website", "index.html"]],
  },
};

const role = ROLES[user && user.role] ? user.role : "member";
const R = ROLES[role];
const PAGE = document.body.dataset.page || "overview";
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const tileHTML = ([label, value, note, icon]) => `
    <article class="tile">
      <div class="tile-top"><span class="tile-label">${esc(label)}</span><span class="tile-icon"><svg><use href="#${icon}"/></svg></span></div>
      <strong class="tile-value">${esc(value)}</strong>
      <p class="tile-note">${esc(note)}</p>
    </article>`;

// ---------- user details everywhere (header, sidebar, profile) ----------
function paintUser() {
  const name = (user && user.name) || "Athlete";
  const email = (user && user.email) || "";
  const vals = { name, email, role: R.label, initial: name.trim().charAt(0).toUpperCase() || "A" };
  document.querySelectorAll("[data-user]").forEach((el) => {
    el.textContent = vals[el.dataset.user];
    if (el.dataset.user === "email") el.title = email;
  });
}
paintUser();
$("dashDate").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
document.querySelectorAll('[data-label="schedule"]').forEach((el) => (el.textContent = R.schedule));
document.querySelectorAll('[data-label="activity"]').forEach((el) => (el.textContent = R.activity));

const titles = {
  overview: `Welcome back, ${esc(((user && user.name) || "Athlete").split(" ")[0])}`,
  schedule: esc(R.schedule),
  activity: esc(R.activity),
  events: "Events",
  profile: "My Profile",
};
$("pageTitle").innerHTML = titles[PAGE];
document.title = `${PAGE === "overview" ? R.label + " Dashboard" : $("pageTitle").textContent} – Stackly Sports Club`;

// ---------- stat tiles ----------
if ($("statGrid")) $("statGrid").innerHTML = R.stats.map(tileHTML).join("");
if ($("actStats")) $("actStats").innerHTML = R.actStats.map(tileHTML).join("");

// ---------- bar chart (single series, hover tooltip + table view) ----------
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const C = R.chart;
if ($("chart")) {
  $("chartTitle").textContent = C.title;
  $("chartSub").textContent = C.sub;
  const total = C.values.reduce((a, b) => a + b, 0);
  $("chartTotal").textContent = `${total.toLocaleString("en-US")} ${C.unit}`;
  $("tableUnit").textContent = C.unit.charAt(0).toUpperCase() + C.unit.slice(1);
  $("chartRows").innerHTML = C.values.map((v, i) => `<tr><td>${days[i]}</td><td>${v}</td></tr>`).join("");
  drawChart();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawChart, 150);
  });
}

function drawChart() {
  const box = $("chart");
  const W = Math.max(box.clientWidth, 280), H = 240;
  const m = { t: 22, r: 8, b: 28, l: 34 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const maxV = Math.max(...C.values);
  const step = maxV <= 10 ? 2 : maxV <= 60 ? 10 : 30;
  const top = Math.ceil(maxV / step) * step;
  const y = (v) => m.t + ih - (v / top) * ih;
  const slot = iw / C.values.length;
  const bw = Math.min(34, slot * 0.55);
  const maxI = C.values.indexOf(maxV);

  let grid = "", axis = "", bars = "", hits = "";
  for (let v = 0; v <= top; v += step) {
    grid += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}"/>`;
    axis += `<text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  }
  C.values.forEach((v, i) => {
    const cx = m.l + slot * i + slot / 2, x = cx - bw / 2, yy = y(v), h = m.t + ih - yy, r = Math.min(4, h);
    bars += `<path class="bar" data-i="${i}" d="M${x},${m.t + ih} V${yy + r} Q${x},${yy} ${x + r},${yy} H${x + bw - r} Q${x + bw},${yy} ${x + bw},${yy + r} V${m.t + ih} Z"/>`;
    axis += `<text x="${cx}" y="${H - 8}" text-anchor="middle">${days[i]}</text>`;
    hits += `<rect class="hit" data-i="${i}" x="${m.l + slot * i}" y="${m.t}" width="${slot}" height="${ih}"/>`;
  });
  const bx = m.l + slot * maxI + slot / 2;
  const best = `<text class="val" x="${bx}" y="${y(maxV) - 7}" text-anchor="middle">${maxV}</text>`;

  box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><g class="grid">${grid}</g><g class="axis">${axis}</g><g>${bars}</g>${best}<g>${hits}</g></svg>`;
  box.setAttribute("aria-label", `${C.title}, ${C.sub.toLowerCase()}: ` + C.values.map((v, i) => `${days[i]} ${v}`).join(", "));

  const tip = $("chartTip");
  box.querySelectorAll(".hit").forEach((hit) => {
    const i = +hit.dataset.i;
    hit.addEventListener("mouseenter", () => {
      box.classList.add("hovering");
      box.querySelectorAll(".bar").forEach((b) => b.classList.toggle("on", +b.dataset.i === i));
      const panel = box.closest(".panel").getBoundingClientRect(), r = box.getBoundingClientRect();
      const scale = r.width / W;
      tip.innerHTML = `${days[i]}: <b>${C.values[i]}</b> ${esc(C.unit)}`;
      tip.style.left = `${r.left - panel.left + (m.l + slot * i + slot / 2) * scale}px`;
      tip.style.top = `${r.top - panel.top + (y(C.values[i]) - 10) * scale}px`;
      tip.hidden = false;
    });
  });
  box.querySelector("svg").addEventListener("mouseleave", () => {
    box.classList.remove("hovering");
    tip.hidden = true;
  });
}

// ---------- schedule list ----------
const listEl = $("dashList");
if (listEl) {
  $("listTitle").textContent = PAGE === "overview" ? "Coming up" : R.list.title;
  $("listSub").textContent = R.list.sub;
  const limit = +listEl.dataset.limit || R.list.items.length;
  listEl.innerHTML = R.list.items
    .slice(0, limit)
    .map(
      ([mon, day, title, meta, status, kind]) => `
    <li data-kind="${kind}">
      <span class="list-date"><small>${esc(mon)}</small><b>${esc(day)}</b></span>
      <div class="list-info"><strong>${esc(title)}</strong><span><svg><use href="#d-pin"/></svg>${esc(meta)}</span></div>
      <span class="status ${kind}"><svg><use href="#${kind === "ok" ? "d-check" : "d-clock"}"/></svg>${esc(status)}</span>
    </li>`
    )
    .join("");
}
const tabs = $("schedTabs");
if (tabs) {
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    tabs.querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
    let shown = 0;
    listEl.querySelectorAll("li").forEach((li) => {
      const ok = b.dataset.tab === "all" || li.dataset.kind === b.dataset.tab;
      li.hidden = !ok;
      if (ok) shown++;
    });
    $("schedEmpty").hidden = shown > 0;
  });
}

// ---------- activity log ----------
if ($("logList")) {
  $("logList").innerHTML = R.log
    .map(([what, when]) => `<li><span class="log-dot"></span><div><strong>${esc(what)}</strong><small>${esc(when)}</small></div></li>`)
    .join("");
}

// ---------- quick actions ----------
if ($("quickGrid")) {
  $("quickGrid").innerHTML = R.quick
    .map(([label, href]) => `<a href="${href}">${esc(label)}<svg><use href="#d-arrow"/></svg></a>`)
    .join("");
}

// ---------- events (inside the dashboard) ----------
const EVENTS = [
  { id: "marathon", title: "City Marathon", sport: "Running", icon: "🏃", date: "2026-10-12", place: "City Grounds", img: "images/events-marathon.webp", spots: 120 },
  { id: "tennis", title: "Tennis Open", sport: "Tennis", icon: "🎾", date: "2026-10-18", place: "Tennis Courts", img: "images/events-tennis.webp", spots: 32 },
  { id: "badminton", title: "Badminton League", sport: "Badminton", icon: "🏸", date: "2026-10-25", place: "Indoor Stadium", img: "images/events-badminton.webp", spots: 48 },
  { id: "swimming", title: "Swimming Gala", sport: "Swimming", icon: "🏊", date: "2026-11-02", place: "Aquatic Center", img: "images/events-swimming.webp", spots: 60 },
  { id: "basketball", title: "Basketball Clash", sport: "Basketball", icon: "🏀", date: "2026-11-08", place: "Indoor Stadium", img: "images/events-basketball.webp", spots: 40 },
  { id: "fitness", title: "Fitness Challenge", sport: "Fitness", icon: "🏋️", date: "2026-11-15", place: "Training Center", img: "images/events-fitness.webp", spots: 80 },
];
const FEATURED = {
  id: "interclub", title: "Inter-Club Championship 2026", date: "2026-10-18", place: "Main Sports Arena", img: "images/events-featured.webp",
  desc: "A thrilling multi-sport event bringing together clubs from across the region. Compete, connect and celebrate the spirit of sports.",
};
const PAST = [
  ["Summer Sports Meet", "Jun 14, 2026", "images/past-summer-meet.webp"],
  ["Community Football Cup", "May 22, 2026", "images/past-football-cup.webp"],
  ["Annual Fitness Challenge", "Apr 10, 2026", "images/past-fitness-challenge.webp"],
];

if ($("evGrid")) {
  // registrations are remembered per email, in this browser only
  const regKey = "stacklyRegs:" + ((user && user.email) || "guest");
  const loadRegs = () => { try { return JSON.parse(localStorage.getItem(regKey)) || []; } catch (e) { return []; } };
  const saveRegs = (r) => { try { localStorage.setItem(regKey, JSON.stringify(r)); } catch (e) {} };
  let regs = loadRegs();
  let sport = "All", view = "all";
  const fmt = (d, o) => new Date(d + "T00:00:00").toLocaleDateString("en-US", o);
  const daysTo = (d) => Math.round((new Date(d + "T00:00:00") - new Date(new Date().toDateString())) / 864e5);

  const renderStats = () => {
    const next = [FEATURED, ...EVENTS].filter((e) => regs.includes(e.id)).sort((a, b) => a.date.localeCompare(b.date))[0];
    $("evStats").innerHTML = [
      ["Upcoming events", String(EVENTS.length + 1), "Across 6 sports", "d-trophy"],
      ["My registrations", String(regs.length), regs.length ? "You are on the list" : "Register below to join", "d-check"],
      ["Next event", next ? fmt(next.date, { month: "short", day: "numeric" }) : "—", next ? next.title : "No registrations yet", "d-cal"],
    ].map(tileHTML).join("");
  };

  const btn = (id) => regs.includes(id)
    ? `<button class="reg-btn on" data-reg="${id}" title="Click to cancel"><svg><use href="#d-check"/></svg>Registered</button>`
    : `<button class="reg-btn" data-reg="${id}">Register</button>`;

  const renderFeatured = () => {
    const f = FEATURED, d = daysTo(f.date);
    $("evFeatured").innerHTML = `
      <img src="${f.img}" alt="" />
      <div class="ev-hero-text">
        <span class="ev-pill">FEATURED</span>
        <h2>${esc(f.title)}</h2>
        <p>${esc(f.desc)}</p>
        <div class="ev-hero-meta"><span><svg><use href="#d-cal"/></svg>${fmt(f.date, { month: "short", day: "numeric", year: "numeric" })}</span><span><svg><use href="#d-pin"/></svg>${esc(f.place)}</span>${d >= 0 ? `<span class="ev-count">${d === 0 ? "Today" : d + " days to go"}</span>` : ""}</div>
        ${btn(f.id)}
      </div>`;
  };

  const sports = ["All", ...EVENTS.map((e) => e.sport)];
  $("evChips").innerHTML = sports.map((s) => `<button class="chip${s === "All" ? " active" : ""}" data-sport="${s}">${s}</button>`).join("");

  const renderGrid = () => {
    const list = EVENTS.filter((e) => (sport === "All" || e.sport === sport) && (view === "all" || regs.includes(e.id)));
    $("evGrid").innerHTML = list.map((e) => `
      <article class="dev-card${regs.includes(e.id) ? " is-reg" : ""}">
        <div class="dev-photo"><img src="${e.img}" alt="" /><span class="date-chip"><small>${fmt(e.date, { month: "short" }).toUpperCase()}</small>${fmt(e.date, { day: "2-digit" })}</span></div>
        <div class="dev-body">
          <h3>${esc(e.title)}</h3>
          <span class="dev-meta">${e.icon} ${esc(e.sport)}</span>
          <span class="dev-meta"><svg><use href="#d-pin"/></svg>${esc(e.place)}</span>
          <div class="dev-foot"><small>${e.spots} spots</small>${btn(e.id)}</div>
        </div>
      </article>`).join("");
    $("evEmpty").hidden = list.length > 0;
  };

  $("evPast").innerHTML = PAST.map(([t, d, img]) => `
    <article class="past-mini-card"><img src="${img}" alt="" /><div><strong>${esc(t)}</strong><small><svg><use href="#d-cal"/></svg>${esc(d)}</small></div></article>`).join("");

  const renderAll = () => { renderStats(); renderFeatured(); renderGrid(); };
  renderAll();

  document.querySelector(".dash-main").addEventListener("click", (e) => {
    const r = e.target.closest("[data-reg]");
    if (r) {
      const id = r.dataset.reg;
      regs = regs.includes(id) ? regs.filter((x) => x !== id) : [...regs, id];
      saveRegs(regs);
      renderAll();
      return;
    }
    const c = e.target.closest(".chip");
    if (c) {
      sport = c.dataset.sport;
      document.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === c));
      renderGrid();
    }
  });
  $("evTabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    view = b.dataset.f;
    $("evTabs").querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
    renderGrid();
  });
}

// ---------- profile ----------
const profileForm = $("profileForm");
if (profileForm) {
  profileForm.name.value = user.name || "";
  profileForm.email.value = user.email || "";
  profileForm.phone.value = user.phone || "";
  $("signedIn").textContent = user.signedAt
    ? new Date(user.signedAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })
    : "This session";
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = profileForm.name.value.trim();
    if (!name) return;
    user.name = name;
    user.phone = profileForm.phone.value.trim();
    writeUser(user);
    paintUser();
    $("profileMsg").textContent = "Saved! Your name is updated across the dashboard.";
  });
}

// ---------- sidebar: mobile menu + logout ----------
const side = $("dashSide"), scrim = $("dashScrim");
const toggleSide = (open) => {
  side.classList.toggle("open", open);
  scrim.classList.toggle("show", open);
};
$("dashMenu").addEventListener("click", () => toggleSide(!side.classList.contains("open")));
scrim.addEventListener("click", () => toggleSide(false));
$("logoutBtn").addEventListener("click", () => {
  try {
    localStorage.removeItem("stacklyUser");
    sessionStorage.removeItem("stacklyUser");
  } catch (e) {}
  (window.stacklyGo || ((u) => (location.href = u)))("login.html");
});
