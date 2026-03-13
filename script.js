// TEXTO DIGITANDO
const words = ["HTML", "CSS", "JavaScript", "Projetos Reais", "Evolução Constante"];
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

  document.querySelector(".typing").textContent = currentWord.substring(0, j);

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

  setTimeout(type, deleting ? 60 : 120);
}

type();


// MENU MOBILE
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.onclick = () => {
  menu.classList.toggle("active");
};


// ANIMAÇÃO AO ROLAR A PÁGINA
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


// PARTICLES BACKGROUND
tsParticles.load("particles", {
  background: {
    color: {
      value: "transparent"
    }
  },
  particles: {
    number: {
      value: 60
    },
    color: {
      value: "#38bdf8"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.4
    },
    size: {
      value: 3
    },
    move: {
      enable: true,
      speed: 1
    },
    links: {
      enable: true,
      distance: 130,
      color: "#38bdf8",
      opacity: 0.2,
      width: 1
    }
  }
});


// GITHUB REPOSITÓRIOS AUTOMÁTICOS
async function carregarRepos() {
  const reposContainer = document.getElementById("repos");

  try {
    const resposta = await fetch("https://api.github.com/users/juslli/repos?sort=updated&per_page=6");

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os repositórios.");
    }

    const repos = await resposta.json();

    reposContainer.innerHTML = "";

    repos.forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("repo-card");

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
