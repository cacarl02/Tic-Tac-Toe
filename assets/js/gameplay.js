const cells = document.querySelectorAll('.cell');
const playerTurn = document.querySelector('.player-turn');
const resetButton = document.querySelectorAll('.retry');
const reviewGame = document.querySelector('#review');
const returnLobby = document.querySelector('#lobby');
const announce = document.querySelector('.announce-result');
const displayResult = document.querySelector('.display-result');
const gameSelectors = document.querySelector('.game-selectors');
const gameSelButtons = document.querySelectorAll('.game-selectors button');
const player1Score = document.querySelector('#player1-score');
const player2Score = document.querySelector('#player2-score');

const undo = document.querySelector('#btn_previous');
const redo = document.querySelector('#btn_next');

const winImg = document.querySelector('.result-content');

const bgSet = document.getElementById('bg_sounds');
const clickSet = document.getElementById('click_sounds');
const bgClick = document.querySelector('.bg');
const clickClick = document.querySelector('.click');

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let board = ['','','','','','','','',''];
let markHistory = [];
let cellHistory = [];
let revenge = false;
let isGameOngoing = false;
let turnCount = 0;

function bot(){
    console.log('AI turn');
}
startGame();
function startGame() {
    isGameOngoing = true;
    cells.forEach(cell=> cell.addEventListener('click', cellClicked));
    resetButton.forEach(retry=> retry.addEventListener('click', restartGame));
    playerTurn.textContent = `${currentPlayer}'s Turn`;
}
function cellClicked() {    //cell-click functions
    const cellIndex = this.getAttribute('cellIndex');
    if(board[cellIndex] !=="" || !isGameOngoing) {      //traps the cell-click if the game is over or the cell is occupied
        return;
    }
    if(currentPlayer == 'X') {
        cells[cellIndex].style.color = 'dodgerblue';
    } else {
        cells[cellIndex].style.color = 'gold';
    }
    if(currentPlayer === 'X' && p1mode == true) {
        bot();
    }
    cellHistory.push(cellIndex);
    turnCount++;
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell,index) { //output on cell-click
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    markHistory.push(board[index]);
    xoxSound.play();
}
function changePlayer() {   //alternating turn
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    playerTurn.textContent = `${currentPlayer}'s turn`;
}
let p1count = 0;
let p2count = 0;
function checkWinner() {    //winning, losing, and draw functions
    let roundWon = false;
    for(let i=0; i<winningConditions.length; i++) {
        const sameValue = winningConditions[i];
        const cellA = board[sameValue[0]];
        const cellB = board[sameValue[1]];
        const cellC = board[sameValue[2]];

        if(cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            if(currentPlayer == 'X') {
                cells[sameValue[0]].classList.add('x_won');
                cells[sameValue[1]].classList.add('x_won');
                cells[sameValue[2]].classList.add('x_won');
            } else {
                cells[sameValue[0]].classList.add('o_won');
                cells[sameValue[1]].classList.add('o_won');
                cells[sameValue[2]].classList.add('o_won');
            }
            break;
        }
    }
    if(roundWon) {
        function resultDelay() {
            displayResult.classList.remove('hidden');
        }
        setTimeout(resultDelay, 2000);
        announce.textContent = `${playerOneInput.value} wins!`;
        playerTurn.textContent = `${playerTwoInput.value} wins!`;
        isGameOngoing = false;
        revenge = true;
        winSound.play();
        if(currentPlayer === 'X') {
            p1count++;
            winImg.classList.add('x');
            winImg.classList.remove('o');
            announce.style.color = 'dodgerblue';
            playerTurn.style.color = 'dodgerblue';
            announce.textContent = `${playerOneInput.value} wins!`;
            playerTurn.textContent = `${playerOneInput.value} wins!`;
        } else {
            p2count++;
            winImg.classList.add('o');
            winImg.classList.remove('x');
            announce.style.color = 'gold';
            playerTurn.style.color = 'gold';
            announce.textContent = `${playerTwoInput.value} wins!`;
            playerTurn.textContent = `${playerTwoInput.value} wins!`;
        }
        player1Score.textContent = p1count;
        player2Score.textContent = p2count;
    }
    else if(!board.includes('')) {
        winImg.classList.remove('x');
        winImg.classList.remove('o');
        playerTurn.textContent = 'Draw!';
        announce.textContent = 'Draw!';
        isGameOngoing = false;
        displayResult.classList.remove('hidden');
    }
    else {
        changePlayer();
    }
}
function resetData() {     //reset score count every quit and return to lobby
    p1count = 0;
    p2count = 0;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    playerOneName.textContent = 'Player 1';
    playerTwoName.textContent = 'Player 2';
    isP1Valid = false;
    isP2Valid = false;
    currentPlayer = '';
}
function restartGame() {    //reset every cell to '', loser plays first
    if(revenge) {
        changePlayer();
        if(currentPlayer === 'O' && p1mode == true) {
            bot();
        }
    }
    board = ['','','','','','','','',''];
    markHistory = [];
    cellHistory = [];
    turnCount = 0;
    playerTurn.textContent = `${currentPlayer} will go first!`;
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.classList.remove('x_won'));
    cells.forEach(cell => cell.classList.remove('o_won'));
    isGameOngoing = true;
    revenge = false;
    displayResult.classList.add('hidden');
    gameSelectors.classList.add('hide');
    undo.style.visibility = 'visible';
    btnX.classList.remove('x_first');
    btnO.classList.remove('o_first');
    buttonDisabler();
    document.querySelector('.settings_dropdown').classList.remove('reveal');
    announce.style.color = '#fff';
    playerTurn.style.color = '#fff';
}
function buttonEnabler() {
for(let i=0; i<gameSelButtons.length; i++) {
    gameSelButtons[i].disabled = false;
}
}
function buttonDisabler() {
    for(let i=0; i<gameSelButtons.length; i++) {
        gameSelButtons[i].disabled = true;
    }
    }
returnLobby.addEventListener('click', quitListener)

reviewGame.addEventListener('click', () => {
    redo.style.visibility = 'hidden';
    displayResult.classList.add('hidden');
    gameSelectors.classList.remove('hide');
    buttonEnabler();
})

const prevClick = () => {
    if(turnCount ===2) {
        undo.style.visibility = 'hidden';
    }
    cells[cellHistory[turnCount-1]].textContent = '';
    turnCount--;
    redo.style.visibility = 'visible';
}
const nextClick = () => {
    if(turnCount === markHistory.length-1) {
        redo.style.visibility = 'hidden';
    }
    cells[cellHistory[turnCount]].textContent = `${markHistory[turnCount]}`;
    turnCount++;
    undo.style.visibility = 'visible';
}

undo.addEventListener('click', prevClick);
redo.addEventListener('click', nextClick);

function muteUnmute() {
if(bgSet.checked) {
    bgClick.innerHTML = '&#128264;';
    document.getElementById('audio').muted = false;
} else {
    bgClick.innerHTML = '&#128263;';
    document.getElementById('audio').muted = true;
}
if(clickSet.checked) {
    clickClick.innerHTML = '&#128264;';
    buttonClickSound.volume = 1;
    xoxSound.volume = 1;
    invalidSound.volume = 1;
    startSound.volume = 1;
    winSound.volume = 1;

} else {
    clickClick.innerHTML = '&#128263;';
    buttonClickSound.volume = 0;
    xoxSound.volume = 0;
    invalidSound.volume = 0;
    startSound.volume = 0;
    winSound.volume = 0;
}
}