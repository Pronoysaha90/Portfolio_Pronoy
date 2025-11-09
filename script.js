// ========== Mobile menu ==========
const menuOpenButton  = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

// Toggle drawer
if (menuOpenButton) {
  menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
  });
}
// Always close drawer
if (menuCloseButton) {
  menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
  });
}
// Close drawer when any nav link is clicked (works for both desktop/mobile)
document.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link");
  if (link) document.body.classList.remove("show-mobile-menu");
});

// ========== Section loader with callbacks ==========
function loadSection(id, file, onLoad) {
  const host = document.getElementById(id);
  if (!host) return Promise.resolve();

  return fetch(file, { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${file}`);
      return res.text();
    })
    .then((html) => {
      host.innerHTML = html;
      if (typeof onLoad === "function") onLoad(host);
    })
    .catch((err) => console.error("Error loading section:", file, err));
}

// ========== Generic reveal helper ==========
function revealOnView(nodeList, options = { threshold: 0.15 }, visibleClass = "visible") {
  const els = Array.from(nodeList || []);
  if (!els.length) return;

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add(visibleClass);
          io.unobserve(en.target);
        }
      });
    }, options);
    els.forEach((el) => io.observe(el));
  } else {
    // Fallback
    const onScroll = () => {
      const trigger = window.innerHeight * 0.85;
      els.forEach((el) => {
        if (!el.classList.contains(visibleClass) && el.getBoundingClientRect().top < trigger) {
          el.classList.add(visibleClass);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}

// ========== Per-section initializers ==========
function initSkillsSection(root) {
  // Fade-in items inside skills (achievements blocks reused here)
  const items = root.querySelectorAll(".ach-fade-in");
  revealOnView(items);

  // Make clickable list items keyboard accessible
  root.querySelectorAll(".ach-list-item").forEach((li) => {
    li.setAttribute("tabindex", "0");
    li.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        li.click();
      }
    });
  });
}

function initExperienceAnimation() {
  const items = document.querySelectorAll(".exp-item");
  revealOnView(items);
}

function initEducationAnimations(scope) {
  const root = scope instanceof HTMLElement ? scope : document;
  const items = root.querySelectorAll(".edu-fade-in");
  revealOnView(items);
}

// ========== Boot ==========
window.addEventListener("load", () => {
  // Load split HTML sections, then init each
  loadSection("skills",     "sections/skills.html",     initSkillsSection);
  loadSection("experience", "sections/experience.html", initExperienceAnimation);
  loadSection("education",  "sections/education.html",  initEducationAnimations);
  loadSection("testimonials",     "sections/testimonials.html");
  // Optional: footer placeholder <div id="footer"></div>
  loadSection("footer",     "sections/footer.html").catch(() => {});

  // If some elements already exist in DOM (SSR or inline), init them too
  initExperienceAnimation();
  initEducationAnimations(document);

  // If opened with a hash, ensure smooth scroll after initial load
  if (location.hash) {
    setTimeout(() => {
      try {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {}
    }, 100);
  }
});



