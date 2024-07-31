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

// before after

let currentIndex = 0;
const slides = document.querySelector(".gallery-slide");
const totalItems = document.querySelectorAll(".gallery-item").length;

function moveSlide(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = totalItems - 1;
  if (currentIndex >= totalItems) currentIndex = 0;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

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

// slider

const slider = document.querySelector(".slider");
document.addEventListener("click", activate, false);

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

// google map

document.addEventListener("DOMContentLoaded", function () {
  // Define locations data with coordinates
  const locations = [
    {
      state: "New York",
      address: "123 NY St, New York, NY 10001",
      zip: "10001",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      state: "New Jersey",
      address: "456 NJ Ave, Newark, NJ 07101",
      zip: "07101",
      lat: 40.7357,
      lng: -74.1724,
    },
    {
      state: "Pennsylvania",
      address: "789 PA Blvd, Philadelphia, PA 19103",
      zip: "19103",
      lat: 39.9526,
      lng: -75.1652,
    },
    {
      state: "Connecticut",
      address: "101 CT Rd, Hartford, CT 06103",
      zip: "06103",
      lat: 41.7658,
      lng: -72.6734,
    },
  ];

  // Get the location list container
  const locationList = document.getElementById("location-list");

  // Create list items for each location
  locations.forEach((location) => {
    const li = document.createElement("li");
    li.className = "location-item";
    li.innerHTML = `
          <div class="location-state">${location.state}</div>
          <div class="location-zip">${location.zip}</div>
      `;
    locationList.appendChild(li);
  });

  // Initialize the map
  const map = L.map("map").setView([40.7128, -74.006], 6); // Centered on New York with zoom level 6

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Define a custom icon using Font Awesome
  const blackIcon = L.divIcon({
    className: "custom-icon",
    html: '<i class="fa-solid fa-location-dot"></i>',
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32], // Popup offset
  });

  // Add markers for each location
  locations.forEach((location) => {
    L.marker([location.lat, location.lng], { icon: blackIcon })
      .addTo(map)
      .bindPopup(`<b>${location.state}</b><br>Zip Code: ${location.zip}`);
  });
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
