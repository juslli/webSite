// TEXTO DIGITANDO
const words = [
  "projetos reais",
  "HTML",
  "CSS",
  "JavaScript",
  "evolução constante",
  "futuro na programação"
];

let i = 0;
let j = 0;
let currentWord = "";
let deleting = false;

function type() {
  currentWord = words[i];

  if (deleting) {
    j--;
  } else {
    j++;
  }

  const typingElement = document.querySelector(".typing");
  if (typingElement) {
    typingElement.textContent = currentWord.substring(0, j);
  }

  if (!deleting && j === currentWord.length) {
    deleting = true;
    setTimeout(type, 1200);
    return;
  }

  if (deleting && j === 0) {
    deleting = false;
    i++;

    if (i === words.length) {
      i = 0;
    }
  }

  setTimeout(type, deleting ? 55 : 105);
}

type();


// MENU MOBILE
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}


// ANIMAÇÃO AO ROLAR A PÁGINA
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 110;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();


// PARTICLES
if (window.tsParticles) {
  tsParticles.load("particles", {
    fpsLimit: 60,
    background: {
      color: {
        value: "transparent"
      }
    },
    particles: {
      number: {
        value: 55
      },
      color: {
        value: ["#b1124d", "#d61f69", "#ff4d94"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.35
      },
      size: {
        value: { min: 1, max: 3.5 }
      },
      links: {
        enable: true,
        distance: 120,
        color: "#b1124d",
        opacity: 0.22,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.1,
        outModes: {
          default: "bounce"
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.35
          }
        }
      }
    },
    detectRetina: true
  });
}


// GITHUB REPOSITÓRIOS AUTOMÁTICOS
async function carregarRepos() {
  const reposContainer = document.getElementById("repos");
  if (!reposContainer) return;

  try {
    const resposta = await fetch("https://api.github.com/users/juslli/repos?sort=updated&per_page=6");

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os repositórios.");
    }

    const repos = await resposta.json();

    reposContainer.innerHTML = "";

    repos.forEach((repo) => {
      const card = document.createElement("div");
      card.classList.add("repo-card", "glass-card");

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "Repositório sem descrição no momento."}</p>
        <a class="repo-link" href="${repo.html_url}" target="_blank">Ver no GitHub</a>
      `;

      reposContainer.appendChild(card);
    });
  } catch (erro) {
    reposContainer.innerHTML = `<p class="loading">Erro ao carregar repositórios.</p>`;
    console.error("Erro:", erro);
  }
}

carregarRepos();
