// MENU MOBILE

const toggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".menu")

toggle.onclick = () => {

menu.classList.toggle("active")

}


// ANIMAÇÃO AO ROLAR A PÁGINA

function reveal(){

const reveals = document.querySelectorAll(".reveal")

reveals.forEach(element => {

const windowHeight = window.innerHeight
const elementTop = element.getBoundingClientRect().top
const revealPoint = 120

if(elementTop < windowHeight - revealPoint){

element.classList.add("active")

}

})

}

window.addEventListener("scroll", reveal)

reveal()


// PARTICLES BACKGROUND

tsParticles.load("particles", {

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
value: 0.5
},

size: {
value: 3
},

move: {
enable: true,
speed: 1
}

}

})


// GITHUB REPOSITÓRIOS AUTOMÁTICOS

async function carregarRepos(){

const reposContainer = document.getElementById("repos")

try{

const resposta = await fetch("https://api.github.com/users/juslli/repos")

const repos = await resposta.json()

repos.slice(0,6).forEach(repo => {

const repoCard = document.createElement("div")

repoCard.classList.add("repo-card")

repoCard.innerHTML = `

<h3>${repo.name}</h3>

<p>${repo.description || "Projeto no GitHub"}</p>

<a href="${repo.html_url}" target="_blank">Ver Repositório</a>

`

reposContainer.appendChild(repoCard)

})

}catch(erro){

console.log("Erro ao carregar repositórios")

}

}

carregarRepos()
