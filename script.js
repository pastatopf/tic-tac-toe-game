class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            tie: 0
        };
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        // Only initialize DOM-related listeners if the document and expected elements exist.
        if (typeof document !== 'undefined' && document.querySelector && document.querySelector('.cell')) {
            this.initializeGame();
        }
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('current-player');
        this.gameStatusDisplay = document.getElementById('game-status');
        this.resetButton = document.getElementById('resetButton');
        this.scoreXDisplay = document.getElementById('scoreX');
        this.scoreODisplay = document.getElementById('scoreO');
        this.scoreTieDisplay = document.getElementById('scoreTie');
        
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        
        this.updateDisplay();
        this.updateScoreboard();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.updateCellDisplay(index);
        
        if (this.checkWin()) {
            this.handleGameEnd('win');
        } else if (this.checkTie()) {
            this.handleGameEnd('tie');
        } else {
            this.switchPlayer();
            this.updateDisplay();
        }
    }
    
    updateCellDisplay(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.classList.add('disabled');
    }
    
    checkWin() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                this.winningCells = condition;
                return true;
            }
        }
        return false;
    }
    
    checkTie() {
        return this.board.every(cell => cell !== '');
    }
    
    handleGameEnd(result) {
        this.gameActive = false;
        
        if (result === 'win') {
            this.gameStatusDisplay.textContent = `Spieler ${this.currentPlayer} hat gewonnen! 🎉`;
            this.gameStatusDisplay.className = 'game-status-win';
            this.scores[this.currentPlayer]++;
            this.highlightWinningCells();
        } else if (result === 'tie') {
            this.gameStatusDisplay.textContent = 'Unentschieden! 🤝';
            this.gameStatusDisplay.className = 'game-status-tie';
            this.scores.tie++;
        }
        
        this.disableAllCells();
        this.updateScoreboard();
    }
    
    highlightWinningCells() {
        this.winningCells.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }
    
    disableAllCells() {
        this.cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    updateDisplay() {
        this.currentPlayerDisplay.textContent = `Der heiße Spieler ${this.currentPlayer} ist dran`;
    }
    
    updateScoreboard() {
        this.scoreXDisplay.textContent = this.scores.X;
        this.scoreODisplay.textContent = this.scores.O;
        this.scoreTieDisplay.textContent = this.scores.tie;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCells = null;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.gameStatusDisplay.textContent = '';
        this.gameStatusDisplay.className = '';
        this.updateDisplay();
    }
}

// Spiel initialisieren, wenn die Seite geladen ist
// Wenn im Browser, initialisieren
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        new TicTacToe();
    });

    // Tastatur-Unterstützung hinzufügen
    document.addEventListener('keydown', (event) => {
        if (event.key >= '1' && event.key <= '9') {
            const index = parseInt(event.key) - 1;
            const cell = document.querySelector(`[data-index="${index}"]`);
            if (cell && !cell.classList.contains('disabled')) {
                cell.click();
            }
        }
        
        if (event.key === 'r' || event.key === 'R') {
            document.getElementById('resetButton').click();
        }
    });
}

// Export für Tests / Node-Umgebungen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TicTacToe };
}