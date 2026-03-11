const words = ["HTML","CSS","JavaScript","Programação","Back-End"]

let i=0
let j=0
let currentWord=""
let deleting=false

function type(){

currentWord=words[i]

if(deleting){

j--

}else{

j++

}

document.querySelector(".typing").textContent=currentWord.substring(0,j)

if(!deleting && j===currentWord.length){

deleting=true
setTimeout(type,1000)
return

}

if(deleting && j===0){

deleting=false
i++

if(i===words.length){

i=0

}

}

setTimeout(type,120)

}

type()


const toggle=document.querySelector(".menu-toggle")
const menu=document.querySelector(".menu")

toggle.onclick=()=>{

menu.classList.toggle("active")

}


function reveal(){

const reveals=document.querySelectorAll(".reveal")

reveals.forEach(element=>{

const windowHeight=window.innerHeight
const elementTop=element.getBoundingClientRect().top

if(elementTop<windowHeight-100){

element.classList.add("active")

}

})

}

window.addEventListener("scroll",reveal)



fetch("https://api.github.com/users/SEUUSUARIO/repos")

.then(res=>res.json())

.then(data=>{

const reposDiv=document.getElementById("repos")

data.slice(0,6).forEach(repo=>{

reposDiv.innerHTML+=`

<div class="repo-card">

<h3>${repo.name}</h3>

<p>${repo.description || "Projeto de programação"}</p>

<a href="${repo.html_url}" target="_blank">

<button>Ver no GitHub</button>

</a>

</div>

`

})

})



tsParticles.load("particles",{

particles:{

number:{value:80},

color:{value:"#38bdf8"},

shape:{type:"circle"},

opacity:{value:0.5},

size:{value:3},

move:{enable:true,speed:1}

}

})