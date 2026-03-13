const words = [
  "HTML",
  "CSS",
  "JavaScript",
  "DOM",
  "APIs",
  "Projetos Reais",
  "Java em breve"
];

let i = 0;
let j = 0;
let currentWord = "";
let deleting = false;

function type() {
  const typingElement = document.querySelector(".typing");
  if (!typingElement) return;

  currentWord = words[i];

  if (deleting) {
    j--;
  } else {
    j++;
  }

  typingElement.textContent = currentWord.substring(0, j);

  if (!deleting && j === currentWord.length) {
    deleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (deleting && j === 0) {
    deleting = false;
    i++;

    if (i === words.length) i = 0;
  }

  setTimeout(type, deleting ? 70 : 120);
}

type();

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");

    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();

if (window.tsParticles) {
  tsParticles.load("particles", {
    fullScreen: {
      enable: false
    },
    background: {
      color: "transparent"
    },
    particles: {
      number: {
        value: 45
      },
      color: {
        value: ["#ff2f75", "#ff5f9a", "#ffffff"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.28
      },
      size: {
        value: { min: 1, max: 4 }
      },
      move: {
        enable: true,
        speed: 1.2
      },
      links: {
        enable: true,
        distance: 130,
        color: "#8d123f",
        opacity: 0.18,
        width: 1
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        }
      },
      modes: {
        repulse: {
          distance: 70
        }
      }
    }
  });
}
