const cardContainer = document.querySelector(".card-container");
const scoreValue = document.getElementById("scoreValue");
const roundValue = document.getElementById("roundValue");
const playGameBtn = document.getElementById("playGame");
const resultMessage = document.getElementById("result");
const backCard = document.querySelectorAll(".backCard");

let score = 0;
let round = 0;
let correctCardIndex;

const cardImages = [
  "/images/ace.png",

  "/images/jack.png",

  "/images/king.png",

  "/images/queen.png",
];

var audio = new Audio("sound/Sakura-Girl-Daisy-chosic.com_.mp3");
audio.play();
audio.loop = true;

playGameBtn.addEventListener("click", function () {
  increaseRound();
  shuffleCards();
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

  //let scoreValue = score;

  localStorage.setItem("scoreValue", score);
}

function shuffleCards() {
  const container = document.querySelector(".card-container");
  const cards = Array.from(container.children);
  //   console.log(cards);
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    container.insertBefore(cards[randomIndex], cards[i].nextElementSibling);
  }

  // increaseRound();
  //increaseScore();
}

function createCardWithImage(imagePath) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.style.backgroundImage = `url(${imagePath})`;
  card.style.backgroundPosition = "center";
  card.style.backgroundSize = "contain";
  card.style.backgroundRepeat = "no-repeat";

  card.innerHTML = `<div class="backCard" style="opacity:0.8"></div>`;

  card.addEventListener("click", function () {
    if (imagePath === "/images/ace.png") {
      resultMessage.textContent = "Hurray..!!.You won!🥳";
    //   backCard.style.opacity = "0";
      shuffleCards();
      increaseRound();
      increaseScore();
      setTimeout(() => {
        resultMessage.textContent = "";
        // backCard.style.opacity = "0"
      }, 1000);
    } else {
      localStorage.setItem("scoreValue", score);
      window.location.href = "./gameover.html";
    }
  });
  return card;
}

function createAndAppendCardsWithImages() {
  cardImages.forEach((imagePath) => {
    const card = createCardWithImage(imagePath);

    cardContainer.appendChild(card);
  });
}
function setCorrectCard() {
  correctCardIndex = Math.floor(Math.random() * cardImages.length);
}

createAndAppendCardsWithImages();
setCorrectCard();
