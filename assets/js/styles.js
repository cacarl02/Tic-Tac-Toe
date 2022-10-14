//mainpage selectors
const originPage = document.querySelector('.page1');
const mainPage = document.querySelector('.main-page');
const play = document.querySelector('#play');
const help = document.querySelector('#help');
const about = document.querySelector('#about');
const playPage = document.querySelector('.page1-1');
const helpPage = document.querySelector('.page1-2');
const aboutPage = document.querySelector('.page1-3');

const backButton = document.querySelector('.back-button');
const singlePlayer = document.querySelector('.one-player');
const multiPlayer = document.querySelector('.two-player');
const gamePage = document.querySelector('.page1-1-1');

const playerOneName = document.querySelector('#player1_name');
const playerTwoName = document.querySelector('#player2_name');
const playerOneInput = document.querySelector('#player_1');
const playerTwoInput = document.querySelector('#player_2');
const letsPlay = document.querySelector('#letsplay');
const playerForm = document.querySelector('.player-form');

const firstTurn = document.querySelector('.first-turn');
const btnX = document.querySelector('#btn_x');
const btnO = document.querySelector('#btn_o');

var arrMainPage = [play, help, about];
var arrMainPageSelect = [playPage, helpPage, aboutPage];
for (let i=0; i<arrMainPage.length; i++) {
    arrMainPage[i].addEventListener('click', () => {
        arrMainPageSelect[i].classList.remove('hidden');
        mainPage.classList.add('hidden');
        backButton.classList.remove('hidden');
    })
}
backButton.addEventListener('click', () => {
    backButton.classList.add('hidden');
    mainPage.classList.remove('hidden');
    playPage.classList.add('hidden');
    helpPage.classList.add('hidden');
    aboutPage.classList.add('hidden');
})
multiPlayer.addEventListener('click', () => {
    originPage.classList.add('hidden');
    playPage.classList.add('hidden');
    backButton.classList.add('hidden');
    gamePage.classList.remove('hidden');
    playerForm.classList.remove('hidden');
})

//in-game selectors
const quitButton = document.querySelector('#quit');
const quitPopup = document.querySelector('.quit-popup');
const quit = document.querySelector('#proceed');
const resume = document.querySelector('#resume');

quitButton.addEventListener('click', () => {
    quitPopup.classList.remove('hidden');
})
quit.addEventListener('click', quitListener)

resume.addEventListener('click', () => {
    quitPopup.classList.toggle('hidden');
})

function quitListener() {
    originPage.classList.remove('hidden');
    mainPage.classList.remove('hidden');
    gamePage.classList.add('hidden');
    quitPopup.classList.add('hidden');
    restartGame();
    resetData();
}
let isP1Valid = false;
let isP2Valid = false;
let currentPlayer = '';
const validateInput = () => {
    playerOneInput.classList.add('invalid');
    playerTwoInput.classList.add('invalid');
    playerOneInput.nextElementSibling.classList.remove('hide');
    playerTwoInput.nextElementSibling.classList.remove('hide');
    firstTurn.nextElementSibling.classList.remove('hide');

    if(playerOneInput.value) {
        isP1Valid = true;
        playerOneInput.classList.remove('invalid');
        playerOneInput.nextElementSibling.classList.add('hide');
    }
    if(playerTwoInput.value) {
        isP2Valid = true;
        playerTwoInput.classList.remove('invalid');
        playerTwoInput.nextElementSibling.classList.add('hide');
    }
}
function playGame() {
    playerOneName.textContent = `${playerOneInput.value} (X)`;
    playerTwoName.textContent = `${playerTwoInput.value} (O)`;
    playerForm.classList.add('hidden');
}
btnO.addEventListener('click', () => {
    currentPlayer = 'O';
    firstTurn.nextElementSibling.classList.add('hide');
    btnX.classList.remove('x_first');
    btnO.classList.add('o_first');
})
btnX.addEventListener('click', () => {
    currentPlayer = 'X';
    firstTurn.nextElementSibling.classList.add('hide');
    btnX.classList.add('x_first');
    btnO.classList.remove('o_first');
})
letsPlay.addEventListener('click', (event) => {
    validateInput();
    if(currentPlayer !=='') {
        firstTurn.nextElementSibling.classList.add('hide');
    }
    if(isP1Valid && isP2Valid && currentPlayer !== '') {
        playGame();
        firstTurn.nextElementSibling.classList.add('hide');
        playerTurn.textContent = `${currentPlayer} will go first!`;
    } else {
        event.preventDefault();
    }
})