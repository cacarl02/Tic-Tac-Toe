const cells = document.querySelectorAll('.cell');
const playerTurn = document.querySelector('.player-turn');
const resetButton = document.querySelectorAll('.retry');
const reviewGame = document.querySelector('#review');
const returnLobby = document.querySelector('#lobby');
const announce = document.querySelector('.announce-result');
const displayResult = document.querySelector('.display-result');
const gameSelectors = document.querySelector('.game-selectors');
const player1Score = document.querySelector('#player1-score');
const player2Score = document.querySelector('#player2-score');

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
let isGameOngoing = false;

startGame();
function startGame() {
    isGameOngoing = true;
    cells.forEach(cell=> cell.addEventListener('click', cellClicked));
    resetButton.forEach(retry=> retry.addEventListener('click', restartGame));
    playerTurn.textContent = `${currentPlayer}'s Turn`;
}
function cellClicked() {    //cell-click functions
    const cellIndex = this.getAttribute('cellIndex');
    if(board[cellIndex] !=="" || !isGameOngoing) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell,index) { //output on cell-click
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
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
            break;
        }
    }
    if(roundWon) {
        playerTurn.textContent = `${currentPlayer} wins!`;
        isGameOngoing = false;
        displayResult.classList.remove('hidden');
        announce.textContent = `${currentPlayer} wins!`;
        if(currentPlayer === 'X') {
            p1count++;
            changePlayer();
        } else {
            p2count++;
            changePlayer();
        }
        player1Score.textContent = p1count;
        player2Score.textContent = p2count;
    }
    else if(!board.includes('')) {
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
    board = ['','','','','','','','',''];
    playerTurn.textContent = `${currentPlayer} will go first!`;
    cells.forEach(cell => cell.textContent = '');
    isGameOngoing = true;
    displayResult.classList.add('hidden');
    gameSelectors.classList.add('hidden');
}

returnLobby.addEventListener('click', quitListener)

reviewGame.addEventListener('click', () => {
    displayResult.classList.add('hidden');
    gameSelectors.classList.remove('hidden');
    
})