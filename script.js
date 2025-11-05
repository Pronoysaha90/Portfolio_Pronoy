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

// Link with skills.html Start End

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