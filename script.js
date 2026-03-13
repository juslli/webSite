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
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 45 },
      color: { value: ["#ff2f75", "#ff5f9a", "#ffffff"] },
      shape: { type: "circle" },
      opacity: { value: 0.28 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1.2 },
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
        onHover: { enable: true, mode: "repulse" }
      },
      modes: {
        repulse: { distance: 70 }
      }
    }
  });
}

const fallbackRepos = [
  {
    name: "webSite",
    description: "Portfólio pessoal para apresentar evolução, projetos e presença profissional.",
    html_url: "https://github.com/juslli/webSite",
    language: "HTML/CSS/JS",
    homepage: "https://juslli.github.io/webSite/"
  },
  {
    name: "GitHub-User-Finder-pro",
    description: "Busca usuários do GitHub e exibe dados com consumo de API e manipulação do DOM.",
    html_url: "https://github.com/juslli/GitHub-User-Finder-pro",
    language: "JavaScript",
    homepage: "https://juslli.github.io/GitHub-User-Finder-pro/"
  },
  {
    name: "weather-app",
    description: "Aplicação de clima em tempo real com interface moderna e integração com API.",
    html_url: "https://github.com/juslli/weather-app",
    language: "JavaScript",
    homepage: "https://juslli.github.io/weather-app/"
  },
  {
    name: "todo-list-pro",
    description: "Lista de tarefas com foco em lógica, eventos, organização e experiência do usuário.",
    html_url: "https://github.com/juslli/todo-list-pro",
    language: "JavaScript",
    homepage: "https://juslli.github.io/todo-list-pro/"
  }
];

function createRepoCard(repo) {
  return `
    <article class="repo-card">
      <h3>${repo.name}</h3>
      <p>${repo.description || "Repositório sem descrição."}</p>

      <div class="repo-meta">
        <span class="repo-badge">${repo.language || "Projeto Web"}</span>
        ${repo.homepage ? '<span class="repo-badge">Publicado</span>' : ""}
      </div>

      <div class="card-links">
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Ver Projeto</a>` : ""}
        <a href="${repo.html_url}" target="_blank">Ver Código</a>
      </div>
    </article>
  `;
}

function renderRepos(repos) {
  const reposContainer = document.getElementById("repos");
  if (!reposContainer) return;
  reposContainer.innerHTML = repos.map(createRepoCard).join("");
}

async function carregarRepos() {
  const reposContainer = document.getElementById("repos");
  if (!reposContainer) return;

  try {
    const response = await fetch("https://api.github.com/users/juslli/repos?sort=updated&per_page=6");

    if (!response.ok) throw new Error("Falha ao buscar API");

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error("Sem repositórios");
    }

    const filtrados = repos
      .filter((repo) => !repo.fork)
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        homepage: repo.homepage
      }));

    renderRepos(filtrados);
  } catch (error) {
    console.error("Erro ao carregar repositórios:", error);
    renderRepos(fallbackRepos);
  }
}

document.addEventListener("DOMContentLoaded", carregarRepos);
