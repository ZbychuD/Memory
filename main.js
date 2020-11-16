const start = document.querySelector('.start')
const buttons = [...document.querySelectorAll('button')]
//tablica z wylosowanymi kolorami//
const colors = [];
//tablica z divami do odkrywania//
const cards = [];

//pobranie czasu startu gry//
const startTime = new Date().getTime();

//zmienne z aktywnymi elementami//
let activeElement = '';
let activeCards =[];

//zmienne potrzebne do wyniku//
let gamePairs;
let gameResult = 0;

//funkcja losująca kolory i przypisująca je do tablicy z kolorami//
const getColors = ()=>{
    let r = Math.floor(Math.random()*256 -20)
    let g = Math.floor(Math.random()*256 -20)
    let b = Math.floor(Math.random()*256 -20)
    const color = `rgb(${r},${g},${b})`
    colors.push(color)
    colors.push(color)
}
//funkcja inicjalizująca wywołująca funkcje z kolorami
const initialize = (e)=>{
    for(i=0;i<(e.target.dataset.key)/2;i++){
       getColors()
    }
}
//funkcja odsłaniająca divy
const clickCard = function(){
//pierwszy klik//
activeElement = this;
activeElement.classList.remove('active')
//sprawdzenie czy nie został kliknięty ten sam element
if(activeElement===activeCards[0]) return
//dodanie pierwszego elementu do tablicy 
if (activeCards.length===0){
    activeCards.push(activeElement)
}
//drugi klik dodaje drugi element do tablicy i usuwa nasłuchiwanie na klik dla wszystkich divow az do sprawdzenia
else{
    activeCards.push(this)
    cards.forEach(div=>{
        div.removeEventListener('click',clickCard)
    })
    //porównanie divów (te same,trafione),nadanie klas i usunięcie ich z gry oraz podwyzszenie wyniku
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
    //nietrafione
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
//okreslenie zwyciestwa
if(gameResult==gamePairs){
    setTimeout(()=>{
       const endTime = new Date().getTime();
       const gameTime = (endTime-startTime)/1000
       alert(`Wygrałeś !!! Twój czas to ${gameTime.toFixed(2)} sekund.`)
       location.reload()
    },1000)
   
}
}
//funckja wyboru poziomu trudnosci
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