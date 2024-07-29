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
const items = Array.from(document.querySelectorAll(".item")); // Convert NodeList to Array

function goToNextSlide() {
  slider.append(items.shift()); // Remove the first item from the array and append it to the end
  items.push(items[items.length - 1]); // Update the items array
}

function goToPrevSlide() {
  slider.prepend(items.pop()); // Remove the last item from the array and prepend it to the start
  items.unshift(items[0]); // Update the items array
}

function startAutoSlide() {
  return setInterval(goToNextSlide, 5000);
}

// Function to stop auto-slide
function stopAutoSlide(intervalId) {
  clearInterval(intervalId);
}

// Event listener for navigation buttons
document.querySelector(".next").addEventListener("click", goToNextSlide);
document.querySelector(".prev").addEventListener("click", goToPrevSlide);

// Start auto-slide on page load
const autoSlideIntervalId = startAutoSlide();

// Clean up auto-slide on page unload
window.addEventListener("beforeunload", () =>
  stopAutoSlide(autoSlideIntervalId)
);
