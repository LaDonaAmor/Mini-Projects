const choiceBtns = document.querySelectorAll('.choice');
const resultEl = document.getElementById('result');

const possibleChoices = ['rock', 'paper', 'scissors'];

let userChoice = undefined;
let compChoice = undefined;

let timesWon = 0;
let timesTied = 0;
let timesLost = 0;

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        userChoice = btn.id;
        compChoice = getRandomChoice();

        playGame();
    });
});

function getRandomChoice() {
    const randomId = Math.floor(Math.random() * possibleChoices.length);
    return possibleChoices[randomId];
}

function playGame() {
    if (userChoice === compChoice) {
        // its a tie
        timesTied++ 
        resultEl.innerHTML = `
        <p>It's a tie!</p>
        <p>Score: W - ${timesWon} T - ${timesTied} L - ${timesLost}
        `;
    } else if (userChoice === 'rock' && compChoice === 'scissors' ||
        userChoice === 'scissors' && compChoice === 'paper' ||
        userChoice === 'paper' && compChoice === 'rock') {
        // we won
        timesWon++
        resultEl.innerHTML = `
        <p>You won!</p>
        <p>Score: W - ${timesWon} T - ${timesTied} L - ${timesLost}
        `;
    } else {
        // comp won
        timesLost++
        resultEl.innerHTML = `
        <p>You lost!</p>
        <p>Score: W - ${timesWon} T - ${timesTied} L - ${timesLost}
        `;
    }
}

