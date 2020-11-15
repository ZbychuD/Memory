const start = document.querySelector('.start')
const buttons = [...document.querySelectorAll('button')]
const colors = [];
const cards = [];

const startTime = new Date().getTime();

let activeElement = '';
let activeCards =[];

let gamePairs;
let gameResult = 0;


const getColors = ()=>{
    let r = Math.floor(Math.random()*256 -20)
    let g = Math.floor(Math.random()*256 -20)
    let b = Math.floor(Math.random()*256 -20)
    const color = `rgb(${r},${g},${b})`
    colors.push(color)
    colors.push(color)
}
const initialize = (e)=>{
    for(i=0;i<(e.target.dataset.key)/2;i++){
       getColors()
    }
}
const clickCard = function(){
    console.log(cards.length)
activeElement = this;
activeElement.classList.remove('active')

if(activeElement===activeCards[0]) return

if (activeCards.length===0){
    activeCards.push(activeElement)
}
else{
    activeCards.push(this)
    cards.forEach(div=>{
        div.removeEventListener('click',clickCard)
    })
    if(activeCards[0].style.backgroundColor===activeCards[1].style.backgroundColor){
        setTimeout(()=>{
            activeCards.forEach(div=>{
                div.classList.add('unactive')
            })
            cards.forEach(div=>{
                div.addEventListener('click',clickCard)
            })
            activeElement = '';
            activeCards =[];
            
        },500)
        gameResult++
    }
    else{
        setTimeout(()=>{
            activeCards.forEach(div=>{
                div.classList.add('active')
            })

            cards.forEach(div=>{
                div.addEventListener('click',clickCard)
            })
           activeElement = '';
            activeCards =[];
        },500) 
    }
}
if(gameResult==gamePairs){
    setTimeout(()=>{
       const endTime = new Date().getTime();
       const gameTime = (endTime-startTime)/1000
       alert(`Wygrałeś!!! Twój czas to ${gameTime} sekund`)
    },1000)
   
}
}
const choiceLevel = function(e){
    initialize(e)
    document.body.removeChild(start)
    for(i=0;i<this.dataset.key;i++){
        const index = Math.floor(Math.random()*colors.length)
        if(this.classList.contains('easy')){
        const div = document.createElement('div')
        div.classList.add('easy')
       div.style.backgroundColor = colors[index]
        colors.splice(index,1)
        document.body.appendChild(div)
        cards.push(div)
        }
    else if (this.classList.contains('medium')){
        const div = document.createElement('div')
        div.classList.add('medium')
        div.style.backgroundColor = colors[index]
        colors.splice(index,1)
        document.body.appendChild(div)
        cards.push(div)
    }
    else{
        const div = document.createElement('div')
        div.classList.add('hard')
        div.style.backgroundColor = colors[index]
        colors.splice(index,1)
        document.body.appendChild(div)
        cards.push(div)
    }
    }
    setTimeout(()=>{
        cards.forEach(div=>{
            div.classList.add('active')
            div.addEventListener('click',clickCard)
        })
    },1000)
    gamePairs=cards.length/2
}

buttons.forEach(btn=>{
btn.addEventListener('click',choiceLevel)
})