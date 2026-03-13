const words=["HTML","CSS","JavaScript","Projetos Reais"]

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
