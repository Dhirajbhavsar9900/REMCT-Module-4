const emojis = [
    '🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🍒', '🍑',
    '🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🍒', '🍑'
];

let firstBox = null;
let secondBox = null;
let thirdBox = null;
let lockBoard = false;
let attempts = 0;
const boxes = document.querySelectorAll('.box');
const attemptCounter = document.getElementById('attempt-counter');

function shuffle() {
    const shuffledEmojis = emojis.sort(() => 0.5 - Math.random());
    boxes.forEach((box, index) => {
        box.dataset.emoji = shuffledEmojis[index];
        box.classList.remove('flipped', 'matched');
        box.textContent = ''; 
        box.style.backgroundColor = '#F00000';
    });
}

boxes.forEach(box => box.addEventListener('click', flipBox));

function flipBox() {
    if (lockBoard) return;
    if (this === firstBox || this === secondBox) return;

    this.textContent = this.dataset.emoji;
    this.classList.add('flipped');

    if (!firstBox) {
        firstBox = this;
    } else if (!secondBox) {
        secondBox = this;
    } else {
        thirdBox = this;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstBox.dataset.emoji === secondBox.dataset.emoji && secondBox.dataset.emoji === thirdBox.dataset.emoji;

    if (isMatch) {
        firstBox.classList.add('matched');
        secondBox.classList.add('matched');
        thirdBox.classList.add('matched');
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstBox.textContent = '';
            secondBox.textContent = '';
            thirdBox.textContent = '';
            resetBoard();
        }, 1000);
    }

    attempts++;
    attemptCounter.textContent = `Attempts: ${attempts}`;
}

function resetBoard() {
    [firstBox, secondBox, thirdBox, lockBoard] = [null, null, null, false];
}

function restartGame() {
    attempts = 0;
    attemptCounter.textContent = `Attempts: ${attempts}`;
    shuffle();
    resetBoard();
}

shuffle();
