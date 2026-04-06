const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");
const reveals = document.querySelectorAll(".reveal");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open") ? "true" : "false"
    );
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

function setActiveLink() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (href === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

function revealOnScroll() {
  const trigger = window.innerHeight * 0.88;

  reveals.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < trigger) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", () => {
  setActiveLink();
  revealOnScroll();
});

window.addEventListener("load", () => {
  setActiveLink();
  revealOnScroll();
});
