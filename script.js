const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuToggle && nav) {
      menuToggle.classList.remove("active");
      nav.classList.remove("open");
    }
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
