const board = document.getElementById('board');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

function createBoard() {
    board.innerHTML = '';
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', playerMove);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function playerMove(e) {
    const index = e.target.dataset.index;
    if (boardState[index] !== '' || !gameActive) return;
    boardState[index] = currentPlayer;
    updateBoard();
    if (checkWinner(currentPlayer)) {
        alert(currentPlayer + ' yutdi!');
        gameActive = false;
        return;
    }
    if (boardState.every(cell => cell !== '')) {
        alert('Durrang!');
        gameActive = false;
        return;
    }
    currentPlayer = 'O';
    setTimeout(botMove, 500);
}

function botMove() {
    if (!gameActive) return;
    // Oddiy bot: bo'sh joydan tasodifiy tanlaydi
    let emptyIndices = boardState.map((v,i) => v === '' ? i : -1).filter(i => i !== -1);
    if(emptyIndices.length === 0) return;
    let moveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    boardState[moveIndex] = currentPlayer;
    updateBoard();
    if (checkWinner(currentPlayer)) {
        alert(currentPlayer + ' yutdi!');
        gameActive = false;
        return;
    }
    if (boardState.every(cell => cell !== '')) {
        alert('Durrang!');
        gameActive = false;
        return;
    }
    currentPlayer = 'X';
}

function updateBoard() {
    boardState.forEach((value, index) => {
        cells[index].textContent = value;
    });
}

function checkWinner(player) {
    const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winCombos.some(combo => combo.every(i => boardState[i] === player));
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateBoard();
}

createBoard();
