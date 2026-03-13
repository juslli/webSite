// MENU MOBILE

const toggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".menu")

toggle.onclick = () => {
menu.classList.toggle("active")
}

// FECHAR MENU AO CLICAR EM LINK

document.querySelectorAll(".menu a").forEach(link => {

link.addEventListener("click", () => {

menu.classList.remove("active")

})

})


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
value: 70
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
speed: 1,
direction: "none",
outModes: {
default: "out"
}
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

},

background: {
color: "transparent"
}

})


// GITHUB REPOSITÓRIOS AUTOMÁTICOS

async function carregarRepos(){

const reposContainer = document.getElementById("repos")

if(!reposContainer) return

reposContainer.innerHTML = ""

try{

const resposta = await fetch("https://api.github.com/users/juslli/repos")

if(!resposta.ok){
throw new Error("Erro na API")
}

let repos = await resposta.json()

// REMOVE FORKS
repos = repos.filter(repo => !repo.fork)

// ORDENA POR MAIS RECENTES
repos.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))

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

console.log("Erro ao carregar repositórios", erro)

reposContainer.innerHTML = "<p>Não foi possível carregar os repositórios.</p>"

}

}

carregarRepos()
