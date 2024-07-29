// header

const navEl = document.querySelector(".nav");
const hamburgerEl = document.querySelector(".hamburger");
const navItemEls = document.querySelectorAll(".nav__item");

hamburgerEl.addEventListener("click", () => {
  navEl.classList.toggle("nav--open");
  hamburgerEl.classList.toggle("hamburger--open");
});

navItemEls.forEach((navItemEl) => {
  navItemEl.addEventListener("click", () => {
    navEl.classList.remove("nav--open");
    hamburgerEl.classList.remove("hamburger--open");
  });
});

// animations

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

// before after

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

// server;

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

// slider

const slider = document.querySelector(".slider");
const items = Array.from(document.querySelectorAll(".item"));

function activate(e) {
  if (e.target.matches(".next")) {
    slider.append(items.shift());
    items.push(items[items.length - 1]);
  } else if (e.target.matches(".prev")) {
    slider.prepend(items.pop());
    items.unshift(items[0]);
  }
}

document.addEventListener("click", activate);
