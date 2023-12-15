
const playAgain = document.getElementById("playAgain");
playAgain.onclick = ()=>{
    window.location.href="./game.html";
};

const scoreValue = localStorage.getItem('scoreValue');
const finalScoreDisplay = document.getElementById("displayScore");

finalScoreDisplay.textContent = scoreValue;