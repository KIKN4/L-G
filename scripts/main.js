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
  if (currentScrollPosition > 150) {
    header.classList.remove("hidden");
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
    header.classList.remove("hidden");
  }
}

window.addEventListener("scroll", handleScroll);

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

const sliders = document.querySelectorAll(".slider");
const containers = document.querySelectorAll(".container");

function updateSliderPosition(slider, container) {
  container.style.setProperty("--position", `${slider.value}%`);
}

sliders.forEach((slider, index) => {
  const container = containers[index];
  if (container) {
    slider.addEventListener("input", (e) => {
      updateSliderPosition(e.target, container);
    });
  }
});

// server
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        help: document.getElementById("help").value,
      };

      console.log("Form Data:", formData); // Log form data to verify

      fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert("Failed to send email: " + data.error);
          } else {
            alert("Email sent successfully!");
            contactForm.reset();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to send email");
        });
    });
  } else {
    console.error("Form element not found");
  }
});
