document.addEventListener("DOMContentLoaded", function () {
  // Header
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

  // Smooth scroll with offset and active class switching
  const navLinks = document.querySelectorAll(".nav__link");
  const footerLinks = document.querySelectorAll("#useful-links .links a");
  const serviceLinks = document.querySelectorAll("#services .links a");
  const headerHeight = document.querySelector(".header").offsetHeight;
  const offset = 50;

  function handleLinkClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    const targetPosition = targetSection.offsetTop - headerHeight - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  footerLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  serviceLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  // Gallery slider
  function initializeGallerySlider(sliderSelector) {
    const slides = document.querySelector(`${sliderSelector} .gallery-slide`);
    const totalItems = document.querySelectorAll(
      `${sliderSelector} .gallery-item`
    ).length;
    let currentIndex = 0;

    function moveSlide(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = totalItems - 1;
      if (currentIndex >= totalItems) currentIndex = 0;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    document
      .querySelector(`${sliderSelector} .nav-button.prev`)
      .addEventListener("click", () => moveSlide(-1));
    document
      .querySelector(`${sliderSelector} .nav-button.next`)
      .addEventListener("click", () => moveSlide(1));
  }

  // Initialize all gallery sliders
  initializeGallerySlider("#projects");

  // Content sliders
  function initializeContentSlider(sliderSelector) {
    const slider = document.querySelector(`${sliderSelector} .slider`);
    document
      .querySelector(`${sliderSelector} .prev`)
      .addEventListener("click", () => {
        const items = document.querySelectorAll(`${sliderSelector} .item`);
        slider.prepend(items[items.length - 1]);
      });

    document
      .querySelector(`${sliderSelector} .next`)
      .addEventListener("click", () => {
        const items = document.querySelectorAll(`${sliderSelector} .item`);
        slider.append(items[0]);
      });
  }

  // Initialize all content sliders
  initializeContentSlider(".slider-container");

  // Animations
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

  // Google map
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

  const locationList = document.getElementById("location-list");

  locations.forEach((location) => {
    const li = document.createElement("li");
    li.className = "location-item";
    li.innerHTML = `
      <div class="location-state">${location.state}</div>
      <div class="location-zip">${location.zip}</div>
    `;
    locationList.appendChild(li);
  });

  const map = L.map("map").setView([40.7128, -74.006], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const blackIcon = L.divIcon({
    className: "custom-icon",
    html: '<i class="fa-solid fa-location-dot"></i>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  locations.forEach((location) => {
    L.marker([location.lat, location.lng], { icon: blackIcon })
      .addTo(map)
      .bindPopup(`<b>${location.state}</b><br>Zip Code: ${location.zip}`);
  });

  // Contact form
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

      fetch("https://lgsealcoating.com/send-email", {
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
