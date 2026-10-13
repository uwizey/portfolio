/* main.js: builds the page from data.js and runs the animations. */

/* 0. HELPERS */
const $  = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* 1. ICONS */
const ICONS = {
  instagram: "M8 3a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm0 2h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-5 1a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  facebook:  "M13.5 22v-8h2.7l.5-3.2h-3.2V8.7c0-.9.4-1.7 1.8-1.7h1.5V4.2S15.5 4 14.3 4C11.8 4 10.2 5.500 10.200 8.200v2.600H7.500V14h2.700v8z",
  email:     "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7L4 7.500V17h16V7.500z",
  github:    "M12 2a10 10 0 0 0-3.200 19.500c.5.1.7-.2.7-.5v-1.800c-2.800.6-3.400-1.300-3.400-1.300-.5-1.200-1.100-1.500-1.100-1.500-.9-.6.1-.6.1-.6 1 .1 1.500 1 1.500 1 .9 1.500 2.300 1.100 2.900.8.1-.7.3-1.100.6-1.300-2.200-.3-4.600-1.100-4.600-5 0-1.100.4-2 1-2.700-.1-.3-.4-1.300.1-2.700 0 0 .8-.3 2.800 1a9.600 9.600 0 0 1 5 0c1.900-1.300 2.800-1 2.800-1 .5 1.400.2 2.400.1 2.700.6.7 1 1.600 1 2.700 0 3.900-2.400 4.700-4.600 5 .4.300.7.900.7 1.800V21c0 .3.200.6.700.5A10 10 0 0 0 12 2z",
  linkedin:  "M4.500 3A1.800 1.800 0 1 0 4.500 6.600 1.800 1.800 0 0 0 4.500 3zM3 8h3v13H3zm6 0h2.900v1.800c.5-.9 1.700-2 3.600-2 3.200 0 3.800 2.100 3.800 4.800V21h-3v-7.500c0-1.200 0-2.700-1.700-2.700s-1.900 1.300-1.900 2.600V21H9z",
  x:         "M17.500 3h3l-6.600 7.500L21.700 21h-6l-4.800-6.200L5.400 21h-3l7-8L2.300 3h6.200l4.300 5.700zm-1 16.200h1.700L7.600 4.700H5.800z",
  whatsapp:  "M12 2a10 10 0 0 0-8.600 15L2 22l5.200-1.400A10 10 0 1 0 12 2zm5 14c-.2.600-1.200 1.100-1.700 1.200-.5 0-.9.200-3-.6-2.500-1-4.100-3.600-4.300-3.800-.1-.2-1-1.400-1-2.600s.6-1.800.9-2c.2-.3.5-.3.700-.3h.5c.2 0 .4 0 .6.400l.8 1.800c.1.100.1.300 0 .4l-.4.400c-.1.100-.3.300-.1.500.1.300.6 1.100 1.400 1.700.9.900 1.800 1.100 2 1.200.3.100.4.100.5-.1l.8-1c.2-.2.300-.2.600-.1l1.700.8c.3.100.4.200.5.300 0 .1 0 .6-.2 1.100z"
};

/* 2. BUILDERS */
function buildRoles() {
  $("#roles").innerHTML = PORTFOLIO.roles.map(r => `<span>${r}</span>`).join("");
}
function buildSocials() {
  $("#socials").innerHTML = PORTFOLIO.socials.map(s => `
    <a href="${s.url}" aria-label="${s.name}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="${ICONS[s.icon] || ICONS.email}"/></svg>
    </a>`).join("");
}
function buildStats() {
  $("#stats").innerHTML = PORTFOLIO.stats.map(s => `
    <div><b data-count="${s.value}">0</b><small>${s.label}</small></div>`).join("");
}
function buildSkills() {
  $("#skills-grid").innerHTML = PORTFOLIO.skillGroups.map((group, i) => `
    <div class="skill-card" data-a="up" style="--d:${i * 0.15}s">
      <h3>${group.title}</h3>
      ${group.items.map(item => `
        <div class="skill">
          <div class="skill__top"><span>${item.name}</span><span>${item.level}%</span></div>
          <div class="skill__track"><i data-level="${item.level}"></i></div>
        </div>`).join("")}
    </div>`).join("");

  $("#tags").innerHTML = PORTFOLIO.tags.map(t => `<span>${t}</span>`).join("");
}
function buildProjects() {
  const projects = PORTFOLIO.projects;

  $("#projects-grid").innerHTML = projects.map((p, i) => `
    <article class="project ${p.image ? "" : "project--noimage"}"
             data-a="up" style="--d:${(i % 3) * 0.1}s"
             data-category="${p.category}" data-initial="${p.title[0]}">
      <div class="project__info">
        <small>${p.category}</small>
        <h3>${p.title}</h3>
        ${p.description ? `<p>${p.description}</p>` : ""}
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">Visit site ↗</a>` : ""}
      </div>
    </article>`).join("");
  $$(".project").forEach((card, i) => {
    const src = projects[i].image;
    if (!src) return;
    const test = new Image();
    test.onload  = () => card.style.backgroundImage = `url('${src}')`;
    test.onerror = () => card.classList.add("project--noimage");
    test.src = src;
  });
  const categories = ["All", ...new Set(projects.map(p => p.category))];
  const filters = $("#filters");
  filters.innerHTML = categories.map((c, i) =>
    `<button class="filter ${i === 0 ? "is-active" : ""}" data-filter="${c}">${c}</button>`).join("");

  filters.addEventListener("click", e => {
    const button = e.target.closest(".filter");
    if (!button) return;
    $$(".filter").forEach(b => b.classList.toggle("is-active", b === button));
    $$(".project").forEach(card => {
      const show = button.dataset.filter === "All" || card.dataset.category === button.dataset.filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
}

/* 3. SCROLL REVEAL ANIMATIONS */
// Adds .in to every [data-a] element when it scrolls into view, then removes data-a so hover is not delayed
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("in");
      $$("[data-level]", el).forEach(bar => bar.style.width = bar.dataset.level + "%");
      $$("[data-count]", el).forEach(countUp);
      const delay = parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0;
      setTimeout(() => { el.removeAttribute("data-a"); el.classList.remove("in"); }, (delay + 1.1) * 1000);

      observer.unobserve(el);
    });
  }, { threshold: 0.2 });

  $$("[data-a]").forEach(el => observer.observe(el));
}
function countUp(el) {
  const end = +el.dataset.count;
  let current = 0;
  const step = Math.max(1, Math.round(end / 40));
  const timer = setInterval(() => {
    current = Math.min(end, current + step);
    el.textContent = current;
    if (current >= end) clearInterval(timer);
  }, 20);
}

/* 4. NAV, PROGRESS BAR, BACK-TO-TOP */
function initNav() {
  const burger = $("#burger"), links = $("#nav-links");
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  $$("#nav-links a").forEach(a => a.addEventListener("click", () => {
    burger.classList.remove("open");
    links.classList.remove("open");
  }));
  const sections = $$("section");
  addEventListener("scroll", () => {
    const y = scrollY;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;

    $("#progress").style.width = (y / maxScroll * 100) + "%";
    $("#nav").classList.toggle("solid", y > 40);
    $("#to-top").classList.toggle("show", y > 600);
    let current = "home";
    sections.forEach(s => { if (y + 200 >= s.offsetTop) current = s.id; });
    $$("#nav-links a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + current));
  }, { passive: true });

  $("#to-top").addEventListener("click", () => scrollTo({ top: 0 }));
}

/* 5. HERO EFFECTS */
// 1.8em must equal the role line height in style.css
function initRoleSlider() {
  const track = $("#roles");
  const count = PORTFOLIO.roles.length;
  let index = 0;
  setInterval(() => {
    index = (index + 1) % count;
    track.style.transform = `translateY(-${index * 1.8}em)`;
  }, 2600);
}
function initParallax() {
  const strength = 30;
  $("#home").addEventListener("mousemove", e => {
    const x = (e.clientX / innerWidth  - 0.5) * strength;
    const y = (e.clientY / innerHeight - 0.5) * strength;
    $(".hero__glow").style.transform = `translate(${x}px, ${y}px)`;
    $(".orb").style.transform        = `translate(${-x / 2}px, ${-y / 2}px)`;
  });
}

/* 6. CONTACT FORM */
// Opens the visitor's mail app (mailto), copies the text, and offers a Gmail link as fallback
function initForm() {
  const form = $("#form"), status = $("#form-status");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data    = new FormData(form);
    const name    = data.get("name").trim();
    const email   = data.get("email").trim();
    const message = data.get("message").trim();

    const to      = PORTFOLIO.email;
    const subject = `Portfolio message from ${name}`;
    const body    = `${message}\n\n--\n${name}\nReply to: ${email}`;
    const q = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try { await navigator.clipboard.writeText(body); } catch (err) {}
    const link = document.createElement("a");
    link.href = `mailto:${to}?${q}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&${q}`;
    status.innerHTML = `Opening your mail app… press <b>Send</b> there.<br>
      Nothing opened? Your message is copied, or
      <a href="${gmail}" target="_blank" rel="noopener">send it with Gmail</a>.`;
    form.reset();
  });
}

/* 7. LOADER */
function initLoader() {
  addEventListener("load", () => setTimeout(() => {
    $("#loader").classList.add("done");
    initReveal();
  }, 1500));
}

/* 8. INIT */
// Build the HTML first, then start the animations that look for it
buildRoles();
buildSocials();
buildStats();
buildSkills();
buildProjects();

initNav();
initRoleSlider();
initParallax();
initForm();
initLoader();

$("#year").textContent = new Date().getFullYear();
