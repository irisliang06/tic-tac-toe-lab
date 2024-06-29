// Step 1: Define the required variables used to track the state of the game
let board;
let currentPlayer;
let gameOver;

// Step 2: Store cached element references
const squares = Array.from(document.querySelectorAll('.sqr'));
const messageEl = document.getElementById('message');

// Step 5: Define the required constants
const players = {
    X: 'X',
    O: 'O'
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Step 3: Initialize the game state
function init() {
    board = Array(9).fill(null);
    currentPlayer = players.X;
    gameOver = false;
    render();
}

// Step 4: Render the game state
function render() {
    board.forEach((mark, index) => {
        squares[index].textContent = mark;
    });
    if (gameOver) {
        messageEl.textContent = currentPlayer ? `${currentPlayer} wins!` : "It's a tie!";
    } else {
        messageEl.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Step 6: Handle a player clicking a square
function handleClick(event) {
    const index = squares.indexOf(event.target);
    if (board[index] || gameOver) return;
    board[index] = currentPlayer;
    if (checkWin()) {
        gameOver = true;
    } else if (checkTie()) {
        gameOver = true;
        currentPlayer = null; // Set currentPlayer to null to indicate a tie
    } else {
        currentPlayer = currentPlayer === players.X ? players.O : players.X;
    }
    render();
}

function checkWin() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    return board.every(square => square !== null);
}

// Step 7: Create Reset functionality
function reset() {
    init();
}

// Event listeners
squares.forEach(square => square.addEventListener('click', handleClick));
document.addEventListener('DOMContentLoaded', init);
document.querySelector('button').addEventListener('click', reset);
