// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', () => {
    let board = null; // Initialize the chessboard
    const game = new Chess(); // Create new Chess.js game instance
    const moveHistory = document.getElementById('move-history'); // Get move history container
    let moveCount = 1; // Initialize the move count
    let userColor = 'w'; // Initialize the user's color as white

    // Function to make a move for the computer via API
    const makeComputerMove = async () => {
        if (game.game_over()) {
            handleGameOver();
            return;
        }

        try {
            const response = await fetch('/move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fen: game.fen()
                })
            });

            const data = await response.json();

            if (!data || !data.move) {
                console.error("Invalid API response:", data);
                updateStatus("AI Error", "error");
                return;
            }

            const moveObj = {
                from: data.move.substring(0, 2),
                to: data.move.substring(2, 4),
                promotion: 'q'
            };

            const move = game.move(moveObj);

            if (move === null) {
                console.error("Invalid move from API:", data.move);
                return;
            }

            board.position(game.fen());
            recordMove(move.san, moveCount);
            moveCount++;
            
            checkTurnStatus();

        } catch (error) {
            console.error("API error:", error);
            updateStatus("Connection Lost", "error");
        }
    };

    // Function to record and display a move in the move history
    const recordMove = (move, count) => {
        if (count === 1) {
            moveHistory.innerHTML = ''; // Clear placeholder on first move
        }

        const isWhite = count % 2 === 1;
        const moveNumber = Math.ceil(count / 2);

        if (isWhite) {
            // Create a new row for the move number and white's move
            const moveRow = document.createElement('div');
            moveRow.className = 'move-row';
            moveRow.innerHTML = `
                <span class="move-number">${moveNumber}.</span>
                <span class="white-move">${move}</span>
            `;
            moveHistory.appendChild(moveRow);
        } else {
            // Find the last row and append black's move to it
            const lastRow = moveHistory.lastElementChild;
            if (lastRow) {
                const blackMove = document.createElement('span');
                blackMove.className = 'black-move';
                blackMove.textContent = move;
                lastRow.appendChild(blackMove);
            }
        }
        
        moveHistory.scrollTop = moveHistory.scrollHeight;
    };

    const checkTurnStatus = () => {
        if (game.game_over()) {
            handleGameOver();
            return;
        }
        
        const isUserTurn = game.turn() === userColor;
        const turnText = isUserTurn ? `Your Turn (${userColor === 'w' ? 'White' : 'Black'})` : "AI's Turn (Thinking)";
        updateStatus(turnText, isUserTurn ? "success" : "warning");
    };

    const updateStatus = (text, type) => {
        const statusText = document.getElementById('status-text');
        const statusDot = document.querySelector('.status-dot');
        statusText.textContent = text;
        
        // Dynamic colors based on type
        if (type === 'warning') {
            statusDot.style.backgroundColor = '#f59e0b';
            statusDot.style.boxShadow = '0 0 8px #f59e0b';
        } else if (type === 'error') {
            statusDot.style.backgroundColor = '#ef4444';
            statusDot.style.boxShadow = '0 0 8px #ef4444';
        } else if (type === 'success') {
            statusDot.style.backgroundColor = '#22c55e';
            statusDot.style.boxShadow = '0 0 8px #22c55e';
        }
    };

    const handleGameOver = () => {
        let status = "Game Over";
        if (game.in_checkmate()) status = "Checkmate!";
        else if (game.in_draw()) status = "Draw!";
        updateStatus(status, "error");
        alert(status);
    };

    // Function to handle the start of a drag position
    const onDragStart = (source, piece) => {
        if (game.game_over()) return false;
        // User can only drag on their turn
        if (game.turn() !== userColor) return false;
        // Allow the user to drag only their own pieces
        return (userColor === 'w' && piece.search(/^w/) !== -1) ||
               (userColor === 'b' && piece.search(/^b/) !== -1);
    };

    // Function to handle a piece drop on the board
    const onDrop = (source, target) => {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (move === null) return 'snapback';

        recordMove(move.san, moveCount);
        moveCount++;
        
        checkTurnStatus(); // Update to "AI's Turn"
        window.setTimeout(makeComputerMove, 250);
    };

    // Function to handle the end of a piece snap animation
    const onSnapEnd = () => {
        board.position(game.fen());
    };

    // Configuration options for the chessboard
    const boardConfig = {
        showNotation: true,
        draggable: true,
        position: 'start',
        onDragStart,
        onDrop,
        onSnapEnd,
        // Updated path for pieces
        pieceTheme: '/static/img/chesspieces/wikipedia/{piece}.png',
        moveSpeed: 'fast',
    };

    // Initialize the chessboard
    board = Chessboard('board', boardConfig);

    // Event listener for the "Play Again" button
    document.querySelector('.play-again').addEventListener('click', () => {
        game.reset();
        board.start();
        moveHistory.innerHTML = '<div class="history-placeholder">Waiting for the first move...</div>';
        moveCount = 1;
        userColor = 'w';
        checkTurnStatus();
    });



    // Event listener for the "Flip Board" button
    document.querySelector('.flip-board').addEventListener('click', () => {
        board.flip();
        userColor = userColor === 'w' ? 'b' : 'w';
        
        checkTurnStatus();
        
        // If it's now the computer's turn after flipping
        if (game.turn() !== userColor) {
            makeComputerMove();
        }
    });

});
