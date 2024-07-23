let isMenuOpen = false;
const header = document.getElementById("header");
let lastScrollPosition = 0;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  document.querySelector(".burger-bar").classList.toggle("active", isMenuOpen);
  document.querySelector(".links").classList.toggle("active", isMenuOpen);
}

// function setInitialHeaderPosition() {
//   const currentScrollPosition = window.scrollY;
//   if (currentScrollPosition > 100) {
//     header.classList.add("fixed");
//     header.classList.remove("animate"); // Remove animate class initially if already scrolled
//   }
// }

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

// // Set initial header position on load
// window.addEventListener("load", setInitialHeaderPosition);

// Add scroll event listener
window.addEventListener("scroll", handleScroll);
