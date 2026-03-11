const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

toggle.onclick = () => {
  menu.classList.toggle("active");
};

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

fetch("https://api.github.com/users/juslli/repos")
  .then((res) => res.json())
  .then((data) => {
    const reposDiv = document.getElementById("repos");

    if (!reposDiv || !Array.isArray(data)) return;

    reposDiv.innerHTML = "";

    data
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .forEach((repo) => {
        reposDiv.innerHTML += `
          <div class="repo-card reveal">
            <h3>${repo.name}</h3>
            <p>${repo.description || "Projeto de programação"}</p>
            <a href="${repo.html_url}" target="_blank">
              <button>Ver no GitHub</button>
            </a>
          </div>
        `;
      });

    reveal();
  })
  .catch((error) => {
    console.error("Erro ao carregar repositórios:", error);
  });

tsParticles.load("particles", {
  particles: {
    number: {
      value: 80
    },
    color: {
      value: "#38bdf8"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 3
    },
    move: {
      enable: true,
      speed: 1
    }
  },
  background: {
    color: "transparent"
  }
});
