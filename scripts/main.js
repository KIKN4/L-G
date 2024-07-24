// header burger bar  and animation

let isMenuOpen = false;
const header = document.getElementById("header");
let lastScrollPosition = 0;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  document.querySelector(".burger-bar").classList.toggle("active", isMenuOpen);
  document.querySelector(".links").classList.toggle("active", isMenuOpen);
}

function handleScroll() {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > 180) {
    header.classList.add("fixed");
    header.classList.add("animate");
  } else if (currentScrollPosition) {
    header.classList.remove("fixed");
    header.classList.remove("animate");
  }
}

window.addEventListener("scroll", handleScroll);

// services animaton

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
});
