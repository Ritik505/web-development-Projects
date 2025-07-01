document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 650;

    let snake = [
        { x: 300, y: 300 },
        { x: 280, y: 300 },
        { x: 260, y: 300 }
    ];
    let food = { x: 0, y: 0 };
    let specialFood = null;
    let dx = 20;
    let dy = 0;
    let score = 0;
    let highScore = 0;
    let gameSpeed = 100;
    let gameLoop = null;
    let isPaused = false;
    let isGameOver = true;
    let specialFoodTimer = null;

    const colors = {
        snakeHead: '#00ff00',
        snakeBody: '#00cc00',
        food: '#ff0000',
        specialFood: '#ffff00',
        background: '#000000'
    };

    
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    function initGame() {
        generateFood();
        document.addEventListener('keydown', changeDirection);
        startBtn.addEventListener('click', startGame);
        pauseBtn.addEventListener('click', togglePause);
        resetBtn.addEventListener('click', resetGame);
        speedSlider.addEventListener('input', function () {
            gameSpeed = 300 - (parseInt(this.value) * 2.5);
            speedValue.textContent = this.value;
            if (gameLoop) {
                clearInterval(gameLoop);
            }
            if (!isPaused && !isGameOver && gameSpeed > 0) {
                gameLoop = setInterval(draw, gameSpeed);
            }
        });
    }

    
    function startGame() {
        if (isGameOver) {
            isGameOver = false;
            isPaused = false;
            pauseBtn.textContent = 'Pause';
            resetGame(true); 
            if (gameSpeed > 0) {
                gameLoop = setInterval(draw, gameSpeed);
            }
        }
    }

    
    function togglePause() {
        if (!isGameOver) {
            isPaused = !isPaused;
            if (isPaused) {
                clearInterval(gameLoop);
                pauseBtn.textContent = 'Resume';
            } else {
                if (gameSpeed > 0) {
                    gameLoop = setInterval(draw, gameSpeed);
                }
                pauseBtn.textContent = 'Pause';
            }
        }
    }

    function generateFood() {
        food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
        
        if (Math.random() < 0.2) {
            generateSpecialFood();
        }
    }

    
    function generateSpecialFood() {
        if (specialFoodTimer) {
            clearTimeout(specialFoodTimer);
        }
        specialFood = {
            x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
            y: Math.floor(Math.random() * (canvas.height / 20)) * 20
        };
        specialFoodTimer = setTimeout(() => {
            specialFood = null;
        }, 5000);
    }

    function changeDirection(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
        const W_KEY = 87;
        const A_KEY = 65;
        const S_KEY = 83;
        const D_KEY = 68;
        const keyPressed = event.keyCode;
        const goingUp = dy === -20;
        const goingDown = dy === 20;
        const goingRight = dx === 20;
        const goingLeft = dx === -20;
        if ((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight) {
            dx = -20;
            dy = 0;
        }
        if ((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown) {
            dx = 0;
            dy = -20;
        }
        if ((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft) {
            dx = 20;
            dy = 0;
        }
        if ((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp) {
            dx = 0;
            dy = 20;
        }
    }

    function draw() {
        if (isPaused || isGameOver) return;
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            if (score > highScore) {
                highScore = score;
            }
            document.getElementById('score').textContent = score;
            document.getElementById('highScore').textContent = highScore;
            generateFood();
        } else if (specialFood && head.x === specialFood.x && head.y === specialFood.y) {
            score += 30;
            if (score > highScore) {
                highScore = score;
            }
            document.getElementById('score').textContent = score;
            document.getElementById('highScore').textContent = highScore;
            specialFood = null;
            if (specialFoodTimer) {
                clearTimeout(specialFoodTimer);
            }
        } else {
            snake.pop();
        }
    
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            gameOver();
            return;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }

        ctx.fillStyle = colors.food;
        ctx.beginPath();
        ctx.arc(food.x + 10, food.y + 10, 10, 0, Math.PI * 2);
        ctx.fill();
        if (specialFood) {
            ctx.fillStyle = colors.specialFood;
            ctx.beginPath();
            ctx.arc(specialFood.x + 10, specialFood.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = colors.specialFood;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(specialFood.x + 10, specialFood.y + 10, 12, 0, Math.PI * 2);
            ctx.stroke();
        }
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? colors.snakeHead : colors.snakeBody;
            ctx.fillRect(segment.x, segment.y, 20, 20);
        
            if (index === 0) {
                ctx.fillStyle = 'white';
                const eyeSize = 4;
            
                if (dx === 20) { 
                    ctx.fillRect(segment.x + 15, segment.y + 5, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + 15, segment.y + 15, eyeSize, eyeSize);
                } else if (dx === -20) { 
                    ctx.fillRect(segment.x + 1, segment.y + 5, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + 1, segment.y + 15, eyeSize, eyeSize);
                } else if (dy === -20) { 
                    ctx.fillRect(segment.x + 5, segment.y + 1, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + 15, segment.y + 1, eyeSize, eyeSize);
                } else { 
                    ctx.fillRect(segment.x + 5, segment.y + 15, eyeSize, eyeSize);
                    ctx.fillRect(segment.x + 15, segment.y + 15, eyeSize, eyeSize);
                }
            }
        });
    }

    function gameOver() {
        isGameOver = true;
        clearInterval(gameLoop);
        if (specialFoodTimer) {
            clearTimeout(specialFoodTimer);
        }
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText('Press Start to play again', canvas.width / 2, canvas.height / 2 + 40);
    }

    
    function resetGame(keepHighScore = false) {
        snake = [
            { x: 300, y: 300 },
            { x: 280, y: 300 },
            { x: 260, y: 300 }
        ];
        dx = 20;
        dy = 0;
        score = 0;
        gameSpeed = 300 - (parseInt(speedSlider.value) * 2.5);
        document.getElementById('score').textContent = score;
        if (!keepHighScore) {
            highScore = 0;
            document.getElementById('highScore').textContent = highScore;
        }
        if (specialFoodTimer) {
            clearTimeout(specialFoodTimer);
        }
        specialFood = null;
        generateFood();
        if (gameLoop) {
            clearInterval(gameLoop);
        }
        if (!isGameOver && !isPaused && gameSpeed > 0) {
            gameLoop = setInterval(draw, gameSpeed);
        } else {
            draw();
        }
    }

    initGame();
    draw(); 
});