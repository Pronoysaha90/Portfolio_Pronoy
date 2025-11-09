const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");


menuOpenButton.addEventListener("click", () => {
  document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());


// Link with skills.html Start

function loadSection(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading section:", error);
    });
}

loadSection("skills", "sections/skills.html");
loadSection("experience", "sections/experience.html");
loadSection("education", "sections/education.html");

const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.nav-menu');

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});


<!-- Problem Solving  -->

  // Simple fade-in animation on load using vanilla JS
        function achFadeInElements() {
            const elements = document.querySelectorAll('.ach-fade-in');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 200); // Staggered delay
            });
        }

        // Trigger on page load
        window.addEventListener('load', achFadeInElements);

        // Optional: Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });
            document.querySelectorAll('.ach-fade-in').forEach(el => observer.observe(el));
        }
// Experience Section

function initExperienceAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all experience items
    document.querySelectorAll('.exp-item').forEach(item => {
        observer.observe(item);
    });
}

// Initialize when Experience section loads
window.addEventListener('load', () => {
    setTimeout(initExperienceAnimation, 100);
});

// ===== Education Section reveal (runs after fetch injection) =====
function initEducationAnimations() {
  const items = document.querySelectorAll('.edu-fade-in');
  if (!items.length) return;

  // Use IntersectionObserver if available
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(el => io.observe(el));
  } else {
    // Fallback
    const onScroll = () => {
      const trigger = window.innerHeight * 0.85;
      items.forEach(el => {
        if (!el.classList.contains('visible') && el.getBoundingClientRect().top < trigger) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    onScroll();
  }
}

// Watch the #education container for content injection
(function watchEducationMount(){
  const host = document.getElementById('education');
  if (!host) return;

  const observer = new MutationObserver(() => {
    if (host.querySelector('.edu-card')) {
      initEducationAnimations();
      observer.disconnect();
    }
  });

  observer.observe(host, { childList: true, subtree: true });

  // In case content was already present
  if (host.querySelector('.edu-card')) {
    initEducationAnimations();
    observer.disconnect();
  }
})();


