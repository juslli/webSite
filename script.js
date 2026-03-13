const words = ["HTML", "CSS", "JavaScript", "Projetos Reais", "Back-End"];
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
    setTimeout(type, 1000);
    return;
  }

  if (deleting && j === 0) {
    deleting = false;
    i++;

    if (i === words.length) {
      i = 0;
    }
  }

  setTimeout(type, deleting ? 70 : 120);
}

type();

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.onclick = () => {
    menu.classList.toggle("active");
  };
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

tsParticles.load("particles", {
  fullScreen: {
    enable: false
  },
  particles: {
    number: {
      value: 55
    },
    color: {
      value: ["#ff2f75", "#ff5f9a", "#ffffff"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.35
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
      distance: 140,
      color: "#7a123b",
      opacity: 0.2,
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
        distance: 80
      }
    }
  }
});

async function carregarRepos() {
  const reposContainer = document.getElementById("repos");

  try {
    const resposta = await fetch("https://api.github.com/users/juslli/repos?sort=updated");
    const repos = await resposta.json();

    reposContainer.innerHTML = "";

    if (!Array.isArray(repos)) {
      reposContainer.innerHTML = "<p>Não foi possível carregar os repositórios.</p>";
      return;
    }

    repos.slice(0, 6).forEach((repo) => {
      const repoCard = document.createElement("div");
      repoCard.classList.add("repo-card");

      repoCard.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "Repositório sem descrição."}</p>
        <a href="${repo.html_url}" target="_blank">Ver repositório</a>
      `;

      reposContainer.appendChild(repoCard);
    });
  } catch (erro) {
    reposContainer.innerHTML = "<p>Erro ao carregar repositórios.</p>";
    console.error("Erro ao buscar repositórios:", erro);
  }
}

carregarRepos();
