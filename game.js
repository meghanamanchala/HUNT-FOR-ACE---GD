const cardObjectDefinitions = [
    { id: 1, imagepath: '/images/king.png' },
    { id: 2, imagepath: '/images/jack.png' },
    { id: 3, imagepath: '/images/queen.png' },
    { id: 4, imagepath: '/images/ace.png' },

];
const aceId =4

const cardBackImgPath = '/images/back.png';
const cardContainerElem = document.querySelector('.card-container');

let cards = []

const playGameButtonElem = document.getElementById('playGame');


const collapsedGridAreaTemplate = '"a a" "a a"';

const cardCollectionCellClass = ".card-pos-a";

let cardPositions = []
let gameInProgress = false
let ShuffleInProgress = false
let cardsRevealed = false

const currentGamestatusElem =document.querySelector('.current-status')
const wincolor = "green"
const losecolor = "red"
const primeColor="black"

const scoreContainerElem = document.getElementById('score')
const scoreElem = document.getElementsByClassName('badge')
const roundContainerElem =  document.getElementById('round')
const roundElem = document.getElementsByClassName('badge')

let roundNum =0;
let maxRounds = 4;
let score =0;
loadGame();

function gameOver(){
    updateStatusElement(scoreContainerElem,"none")
    updateStatusElement(scoreContainerElem,"none")

    const gameOverMessage = `Game Over! Final Score ~ <span class = 'badge'>${score}</span>
                              Click 'Play Game' to play again`
    updateStatusElement(currentGamestatusElem,"block",primeColor,gameOverMessage)
    gameInProgress = false
    playGameButtonElem.disabled = false
}

function endRound(){
    setTimeout(()=>{
        if(roundNum == maxRounds){
            gameOver()
            return
        }
        else
        {
            startRound()
        }
    })
}
function chooseCard(card)
{
    if(canChooseCard())
    {
        evaluateCardChoice(card)
        
        flipCard(card,false)

        setTimeout(() => {
            flipCards(false)
            updateStatusElement(currentGamestatusElem,"block", primeColor,"Card positions revealed")

            endRound()

        },3000)
        cardsRevealed = true
    }

}
function update(){
    if (cardObjectDefinitions.id == 1 && cardObjectDefinitions.id ==2 && cardObjectDefinitions.id == 3){
        window.location.href="./gameover.html";
    }

}
// function calculateScoreToAdd(roundNum){
//     if(roundNum ==1){
//         return 100
//     }
//     else if(roundNum == 2){
//         return 50
//     }
//     else if(roundNum == 3){
//         return 25
//     }
//     else 
//     {
//         return 10
//     }
  
// }

// function calculateScore(){
//  const scoreToAdd = calculateScoreToAdd(roundNum)
//  score = score + scoreToAdd
// }




function updateScore(){
    calculateScore()
    updateStatusElement(scoreElem,"block",primeColor,`<span class='badge'>${score}</span>`)
}
function updateStatusElement(elem, display, color, innerHTML)
{
   

    if(arguments.length > 2)
    {
        elem.style.color = color
        elem.innerHTML = innerHTML
    }
   elem.style.display = display

}

function outputChoiceFeedBack(hit){
    if(hit){
        updateStatusElement(currentGamestatusElem,"block",wincolor,"Hurray..!!!You won")
    }
    else
    {
        updateStatusElement(currentGamestatusElem,"block",losecolor,"You Missed it :(")
    }
}
function evaluateCardChoice(card){
    if(card.id == aceId){
        updateScore()
        outputChoiceFeedBack(true)
    }
    else
    {
        outputChoiceFeedBack(false)
    }

}
function canChooseCard(){ 
    return gameInProgress == true && !cardsRevealed
}
function loadGame() {
    createCards();
    cards = document.querySelectorAll('.card');
    playGameButtonElem.addEventListener('click', () => startGame())

    updateStatusElement(scoreContainerElem,"none")
    updateStatusElement(roundContainerElem,"none")
}
function startGame() {

    initializeNewGame();
    startRound();

}
function initializeNewGame() {
    score=0
    roundNum=0
    updateStatusElement(scoreContainerElem,"flex")
    updateStatusElement(roundContainerElem,"flex")

    updateStatusElement(scoreElem,"block",primeColor,`Score <span class='badge'><span class='badge'>${score}</span>`)
    updateStatusElement(roundElem,"block",primeColor,`Round <span class='badge'><span class='badge'>${roundNum}</span>`)
}
function startRound() {
    initializeNewRound();
    collectCards();
    flipCards(true);
    
}
function initializeNewRound() {
    roundNum++
    playGameButtonElem.disabled = true

    gameInProgress = true
    cardsRevealed = false
     updateStatusElement(currentGamestatusElem,"block",primeColor,`Round <span class='badge'><span class='badge'>${roundNum}</span>`)

}
function collectCards() {
    transformGridArea(collapsedGridAreaTemplate);
    addCardToGridAreaCell(cardCollectionCellClass)

}
function transformGridArea(areas) {
    cardContainerElem.style.gridTemplateAreas = areas
}
function addCardToGridAreaCell(cellPositionClassName) {
    const cellPositionElem = document.querySelector(cellPositionClassName);
    cards.forEach((card, index) => {
        addChildElement(cellPositionElem, card)
    })
}

function flipCard(card, flipToBack) {
    const innerCardElem = card.firstChild;
    if (flipToBack && !innerCardElem.classList.contains('flip-it')) {
        innerCardElem.classList.add('flip-it');
    }
    else if (innerCardElem.classList.contains('flip-it')) {
        innerCardElem.classList.remove('flip-it');
    }
}
function flipCards(flipToBack) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            flipCard(card, flipToBack)
        }, index * 100)

    })

}




function createCards() {
    cardObjectDefinitions.forEach((cardItem) => {
        createCard(cardItem)
    })
}
//1
function createCard(cardItem) {

    const cardElem = createElement('div');
    const cardInnerElem = createElement('div');
    const cardFrontElem = createElement('div');
    const cardBackElem = createElement('div');

   
    const cardFrontImg = createElement('img');
    const cardBackImg = createElement('img');
 
    addClassToElement(cardElem, 'card');
    addIdToElement(cardElem, cardItem.id);
 
    addClassToElement(cardInnerElem, 'card-inner');
  
    addClassToElement(cardFrontElem, 'card-front');
   
    addClassToElement(cardBackElem, 'card-back');
  
    addSrcToImageElem(cardBackImg, cardBackImgPath);

    addSrcToImageElem(cardFrontImg, cardItem.imagepath);
 
    addClassToElement(cardBackImg, 'card-img');
 
    addClassToElement(cardFrontImg, 'card-img');
   
    addChildElement(cardBackElem, cardBackImg);
 
    addChildElement(cardFrontElem, cardFrontImg);
   
    addChildElement(cardInnerElem, cardFrontElem);
   
    addChildElement(cardInnerElem, cardBackElem);

    addChildElement(cardElem, cardInnerElem);

    addCardToGridCell(cardElem)
    //initializeCardPosition(cardElem)
         attachClickEventhandlerTocard(cardElem)
}

function attachClickEventhandlerTocard(card){
    card.addEventListener('click',() => chooseCard(card))

}
// function initializeCardPosition(card){
//     cardPositions.push(card.id)
// }
//2
function createElement(elemType) {
    return document.createElement(elemType)
}

function addClassToElement(elem, className) {
    elem.classList.add(className);
}
function addIdToElement(elem, id) {
    elem.id = id;
}
function addSrcToImageElem(imgElem, src) {
    imgElem.src = src
}
function addChildElement(parentElem, childElem) {
    parentElem.appendChild(childElem)
}
function addCardToGridCell(card) {
    const cardPositionClassName = mapCardidToGridCell(card);

    const cardPosElem = document.querySelector(cardPositionClassName);

    addChildElement(cardPosElem, card);

}

function mapCardidToGridCell(card) {
    if (card.id == 1) {
        return '.card-pos-a';
    }
    else if (card.id == 2) {
        return '.card-pos-b';
    }
    else if (card.id == 3) {
        return '.card-pos-c';
    }
    else if (card.id == 4) {
        return '.card-pos-d';
    }

}