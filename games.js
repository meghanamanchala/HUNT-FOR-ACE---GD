const cardContainer = document.querySelector(".card-container");
const scoreValue = document.getElementById("scoreValue");
const roundValue = document.getElementById("roundValue");
const playGameBtn = document.getElementById("playGame");
const resultMessage = document.getElementById("result");
const backCard = document.querySelectorAll(".backCard");
const timerDisplay = document.getElementById("timer");

let score = 0;
let round = 0;
let correctCardIndex;
let timer=3;

const cardImages = [
  "/images/ace.png",
  "/images/king.png",
  "/images/jack.png",
  "/images/queen.png",
  "/images/king.png",
  "/images/jack.png",
  "/images/queen.png",
  "/images/king.png",
  "/images/jack.png",
  "/images/queen.png",
  "/images/king.png",
  "/images/jack.png",
  "/images/queen.png",
  "/images/king.png",
  "/images/jack.png",
  "/images/queen.png",
 
];

var audio = new Audio("sound/Sakura-Girl-Daisy-chosic.com_.mp3");
audio.play();
audio.loop = true;

playGameBtn.addEventListener("click", function () {
  createAndAppendCardsWithImages();
setCorrectCard();
  increaseRound();
  shuffleCards();
  countDown();
  playGameBtn.remove();
  startGameMessage.style.display = "block"; 
});
function increaseRound() {
  round++;
  roundValue.textContent = round;
}
function increaseScore() {
  score += 10;
  scoreValue.textContent = score;
localStorage.setItem("scoreValue", score);
countDown();
}

function shuffleCards() {
  const container = document.querySelector(".card-container");
  const cards = Array.from(container.children);
 
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    container.insertBefore(cards[randomIndex], cards[i].nextElementSibling);
  }
}
function createCardWithImage(imagePath,index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.index = index;
  card.style.backgroundImage = `url(${imagePath})`;
  card.style.backgroundPosition = "center";
  card.style.backgroundSize = "contain";
  card.style.backgroundRepeat = "no-repeat";

  card.addEventListener("click", function () {
    timer=3;
    if (imagePath === "/images/ace.png") {
      resultMessage.textContent = "Hurray..!!.You won!🥳";
    
    setTimeout(() => {
    card.style.backgroundImage = `url(${imagePath})`;
  }, 1000);
      shuffleCards();
      increaseRound();
      increaseScore();
      countDown();
      setTimeout(() => {
        resultMessage.textContent = "";
      }, 2000);
    } else {
      resultMessage.textContent = "Oops! You lost! 😞"; 
      setTimeout(() => {
      localStorage.setItem("scoreValue", score);
      window.location.href = "./gameover.html";
       }, 500); 
    }
  });
  return card;
}
function createAndAppendCardsWithImages() {
  cardImages.forEach((imagePath,index) => {
    const card = createCardWithImage(imagePath,index);
   cardContainer.appendChild(card);
  });
}
function setCorrectCard() {
  correctCardIndex = Math.floor(Math.random() * cardImages.length);
}
function countDown(){
  localStorage.setItem("scoreValue",score);
  if (timer==0){
    window.location.href = "./gameover.html";
}
timerDisplay.innerText=timer;
timer--;

};
setInterval(countDown,1000)



