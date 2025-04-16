let currentPlayer = 'X'; // Start with Player X
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function startGame(mode) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    currentPlayer = 'X';
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    updateBoard();

    if (mode === 'computer') {
        setTimeout(() => computerMove(), 500);
    }
}

function playerMove(row, col) {
    if (gameBoard[row][col] !== '') return;

    gameBoard[row][col] = currentPlayer;
    updateBoard();

    if (checkWinner()) {
        setTimeout(() => {
            document.getElementById('result').textContent = currentPlayer + ' wins!';
            document.getElementById('game-over').classList.remove('hidden');
        }, 200);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O' && document.getElementById('game-board').classList.contains('computer')) {
            setTimeout(() => computerMove(), 500);
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    let index = 0;
    gameBoard.forEach(row => {
        row.forEach(cell => {
            cells[index].textContent = cell;
            if (cell === 'X') {
                cells[index].classList.add('x');
                cells[index].classList.remove('o');
            } else if (cell === 'O') {
                cells[index].classList.add('o');
                cells[index].classList.remove('x');
            } else {
                cells[index].classList.remove('x', 'o');
            }
            index++;
        });
    });
}

function checkWinner() {
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== '') {
            return true;
        }
        if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== '') {
            return true;
        }
    }
    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== '') {
        return true;
    }
    if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== '') {
        return true;
    }
    return false;
}

function computerMove() {
    // Simple AI logic to make the computer move
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                gameBoard[i][j] = 'O';
                if (checkWinner()) {
                    updateBoard();
                    setTimeout(() => {
                        document.getElementById('result').textContent = 'Computer wins!';
                        document.getElementById('game-over').classList.remove('hidden');
                    }, 200);
                    return;
                }
                gameBoard[i][j] = '';
            }
        }
    }
    // If no winning move, choose random cell
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                gameBoard[i][j] = 'O';
                updateBoard();
                currentPlayer = 'X';
                return;
            }
        }
    }
}

function restartGame() {
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}
