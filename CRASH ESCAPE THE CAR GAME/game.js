
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 800;
const ROAD_WIDTH = 500;
const LANE_WIDTH = ROAD_WIDTH / 3;
const GAME_SPEED = 7;
const SPAWN_INTERVAL = 1000;
const DIFFICULTY_INCREASE_RATE = 0.1;


let canvas, ctx;
let gameLoop;
let score = 0;
let highScore = 0;
let gameOver = false;
let scroll = 0;
let currentSpeed = GAME_SPEED;


let player;
let enemies = [];
let particles = [];


const sounds = {
    crash: new Audio('crash.wav'),
    engine: new Audio('engine.wav'),
    score: new Audio('score.wav'),
    drift: new Audio('drift.wav')
};


function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.getElementById('startButton').addEventListener('click', startGame);


    Object.values(sounds).forEach(sound => {
        sound.load();
    });


    player = new PlayerCar();
}


class PlayerCar {
    constructor() {
        this.width = 50;
        this.height = 80;
        this.x = (WINDOW_WIDTH - ROAD_WIDTH) / 2 + (ROAD_WIDTH / 2) - this.width / 2;
        this.y = WINDOW_HEIGHT - 150;
        this.speed = GAME_SPEED;
        this.lateralSpeed = 0;
        this.maxLateralSpeed = 8;
        this.acceleration = 0.5;
        this.deceleration = 0.2;
        this.tilt = 0;
        this.boost = 100;
        this.boostRegen = 0.1;
        this.isDrifting = false;
    }

    update(keys) {

        if (keys.SPACE && this.boost > 0) {
            this.maxLateralSpeed = 10;
            this.boost = Math.max(0, this.boost - 1.5);
            this.addParticle();
        } else {
            this.maxLateralSpeed = 8;
            this.boost = Math.min(100, this.boost + this.boostRegen);
        }


        if (keys.A) {
            this.lateralSpeed = Math.max(this.lateralSpeed - this.acceleration, -this.maxLateralSpeed);
            this.tilt = Math.min(this.tilt + 2, 15);
            if (Math.abs(this.lateralSpeed) > 6) this.isDrifting = true;
        } else if (keys.D) {
            this.lateralSpeed = Math.min(this.lateralSpeed + this.acceleration, this.maxLateralSpeed);
            this.tilt = Math.max(this.tilt - 2, -15);
            if (Math.abs(this.lateralSpeed) > 6) this.isDrifting = true;
        } else {
            this.lateralSpeed *= 0.9;
            this.tilt *= 0.8;
            this.isDrifting = false;
        }

        this.x += this.lateralSpeed;


        if (this.isDrifting) {
            sounds.drift.play();
            this.addDriftParticle();
        }


        const roadLeft = (WINDOW_WIDTH - ROAD_WIDTH) / 2;
        const roadRight = roadLeft + ROAD_WIDTH;
        if (this.x < roadLeft) {
            this.x = roadLeft;
            this.lateralSpeed *= -0.5;
        } else if (this.x > roadRight - this.width) {
            this.x = roadRight - this.width;
            this.lateralSpeed *= -0.5;
        }


        document.getElementById('boostFill').style.width = `${this.boost}%`;
    }

    draw() {

        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(this.x + 5, this.y + 5, this.width, this.height);


        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(1, '#990000');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x + 5, this.y, this.width - 10, this.height);


        const windowGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + 20);
        windowGradient.addColorStop(0, '#88ccff');
        windowGradient.addColorStop(1, '#4488cc');
        ctx.fillStyle = windowGradient;
        ctx.fillRect(this.x + 8, this.y + 15, this.width - 16, 20);


        ctx.fillStyle = '#ffffc8';
        ctx.beginPath();
        ctx.ellipse(this.x + 5, this.y + 5, 5, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(this.x + this.width - 15, this.y + 5, 5, 5, 0, 0, Math.PI * 2);
        ctx.fill();


        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(this.x, this.y + 10, 8, 20);
        ctx.fillRect(this.x + this.width - 8, this.y + 10, 8, 20);
        ctx.fillRect(this.x, this.y + this.height - 30, 8, 20);
        ctx.fillRect(this.x + this.width - 8, this.y + this.height - 30, 8, 20);


        ctx.fillStyle = '#666666';
        ctx.fillRect(this.x + 2, this.y + 18, 4, 4);
        ctx.fillRect(this.x + this.width - 6, this.y + 18, 4, 4);
        ctx.fillRect(this.x + 2, this.y + this.height - 22, 4, 4);
        ctx.fillRect(this.x + this.width - 6, this.y + this.height - 22, 4, 4);
    }

    addParticle() {
        particles.push(new Particle(
            this.x + this.width / 2,
            this.y + this.height,
            '#ffa500'
        ));
    }

    addDriftParticle() {
        particles.push(new Particle(
            this.x + Math.random() * this.width,
            this.y + this.height - 10,
            '#666'
        ));
    }

    getRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}


class EnemyVehicle {
    constructor(type) {
        this.type = type;
        this.lane = Math.floor(Math.random() * 3);
        const roadLeft = (WINDOW_WIDTH - ROAD_WIDTH) / 2;
        this.x = roadLeft + (LANE_WIDTH * this.lane) + (LANE_WIDTH / 2);
        this.y = -100;
        
        switch(type) {
            case 'car':
                this.width = 50;
                this.height = 80;
                this.speed = Math.random() * 7 + 8;
                this.color = this.getRandomColor();
                break;
            case 'bike':
                this.width = 30;
                this.height = 60;
                this.speed = Math.random() * 6 + 10;
                this.color = this.getRandomColor();
                break;
            case 'truck':
                this.width = 80;
                this.height = 120;
                this.speed = Math.random() * 4 + 5;
                this.color = this.getRandomColor();
                break;
        }
        
        this.x -= this.width / 2;
    }

    getRandomColor() {
        const colors = {
            car: ['#aa0000', '#006400', '#0000aa', '#c86e00', '#c0c0c0', '#d4af37', '#424242', '#b87333'],
            bike: ['#ff0000', '#0000ff', '#000000', '#ffa500'],
            truck: ['#323296', '#963232', '#326432', '#505050']
        };
        return colors[this.type][Math.floor(Math.random() * colors[this.type].length)];
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.05) * 2;
    }

    draw() {

        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(this.x + 5, this.y + 5, this.width, this.height);

        switch(this.type) {
            case 'car':
                this.drawCar();
                break;
            case 'bike':
                this.drawBike();
                break;
            case 'truck':
                this.drawTruck();
                break;
        }
    }

    drawCar() {

        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, this.darkenColor(this.color));
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x + 5, this.y, this.width - 10, this.height);


        ctx.fillStyle = '#333333';
        ctx.fillRect(this.x + 10, this.y + this.height - 45, this.width - 20, 25);

        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 5, this.y + this.height - 8, 10, 5);
        ctx.fillRect(this.x + this.width - 15, this.y + this.height - 8, 10, 5);
    }

    drawBike() {
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y + 15);
        ctx.lineTo(this.x + this.width/2, this.y + 45);
        ctx.stroke();

        
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2 - 8, this.y + 20);
        ctx.lineTo(this.x + this.width/2 + 8, this.y + 20);
        ctx.stroke();

        
        ctx.fillStyle = '#1e1e1e';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + 15, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + 45, 8, 0, Math.PI * 2);
        ctx.fill();

        
        ctx.strokeStyle = '#666666';
        ctx.lineWidth = 2;
        for(let i = 0; i < 4; i++) {
            const angle = (i * Math.PI/2) + (this.y * 0.08);
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2, this.y + 15);
            ctx.lineTo(
                this.x + this.width/2 + Math.cos(angle) * 6,
                this.y + 15 + Math.sin(angle) * 6
            );
            ctx.stroke();
        }

        
        ctx.fillStyle = '#333333';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + 25, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(this.x + this.width/2 - 8, this.y + 25, 16, 20);
    }

    drawTruck() {
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height/3);

        
        ctx.fillStyle = this.darkenColor(this.color);
        ctx.fillRect(this.x + 5, this.y + this.height/3, this.width - 10, this.height * 2/3);

        
        ctx.fillStyle = '#333333';
        ctx.fillRect(this.x + 10, this.y + 5, this.width - 20, this.height/4);

        
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(this.x, this.y + this.height/4, 12, 25);
        ctx.fillRect(this.x + this.width - 12, this.y + this.height/4, 12, 25);
        ctx.fillRect(this.x, this.y + this.height - 35, 12, 25);
        ctx.fillRect(this.x + this.width - 12, this.y + this.height - 35, 12, 25);


        ctx.fillStyle = '#ffffc8';
        ctx.fillRect(this.x + 5, this.y + this.height/3 - 8, 10, 5);
        ctx.fillRect(this.x + this.width - 15, this.y + this.height/3 - 8, 10, 5);
    }

    darkenColor(color) {
        const rgb = this.hexToRgb(color);
        return `rgb(${Math.floor(rgb.r * 0.7)}, ${Math.floor(rgb.g * 0.7)}, ${Math.floor(rgb.b * 0.7)})`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    getRect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}


class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 2;
        this.lifetime = 20;
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.lifetime--;
        this.size = Math.max(0, this.size - 0.1);
    }

    draw() {
        ctx.globalAlpha = this.lifetime / 20;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}


function startGame() {
    document.getElementById('startScreen').classList.add('hidden');
    gameOver = false;
    score = 0;
    enemies = [];
    particles = [];
    currentSpeed = GAME_SPEED;
    player = new PlayerCar();
    sounds.engine.play();
    gameLoop = setInterval(update, 1000 / 60);
    spawnEnemy();
}

function spawnEnemy() {
    if (gameOver) return;
    
    const types = ['car', 'bike', 'truck'];
    const weights = [0.5, 0.3, 0.2];
    const type = types[Math.floor(Math.random() * types.length)];
    
    enemies.push(new EnemyVehicle(type));
    
    setTimeout(spawnEnemy, SPAWN_INTERVAL);
}

function update() {
    if (gameOver) return;


    scroll = (scroll + currentSpeed) % WINDOW_HEIGHT;


    player.update(keys);


    enemies.forEach((enemy, index) => {
        enemy.update();
        

        if (checkCollision(player.getRect(), enemy.getRect())) {
            gameOver = true;
            sounds.crash.play();
            sounds.engine.pause();
            showGameOver();
            return;
        }
        

        enemies.forEach((otherEnemy, otherIndex) => {
            if (index !== otherIndex && checkCollision(enemy.getRect(), otherEnemy.getRect())) {

                enemies.splice(index, 1);
                enemies.splice(otherIndex, 1);
                score += 2;
                sounds.score.play();
            }
        });
        

        if (enemy.y > WINDOW_HEIGHT) {
            enemies.splice(index, 1);
            score++;
        }
    });


    particles.forEach((particle, index) => {
        particle.update();
        if (particle.lifetime <= 0) {
            particles.splice(index, 1);
        }
    });


    currentSpeed = GAME_SPEED + (score * DIFFICULTY_INCREASE_RATE);
    document.getElementById('speed').textContent = `Speed: ${Math.floor(currentSpeed)}`;


    document.getElementById('score').textContent = `Score: ${score}`;
    highScore = Math.max(highScore, score);
    document.getElementById('highScore').textContent = `High Score: ${highScore}`;


    draw();
}

function draw() {

    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);


    drawRoad();


    enemies.forEach(enemy => enemy.draw());


    particles.forEach(particle => particle.draw());


    player.draw();
}

function drawRoad() {
    const roadLeft = (WINDOW_WIDTH - ROAD_WIDTH) / 2;
    

    ctx.fillStyle = '#22b14c';
    ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    

    ctx.fillStyle = '#404040';
    ctx.fillRect(roadLeft, 0, ROAD_WIDTH, WINDOW_HEIGHT);
    

    ctx.fillStyle = '#ffff00';
    for (let x = roadLeft + LANE_WIDTH; x < roadLeft + ROAD_WIDTH; x += LANE_WIDTH) {
        for (let y = (-scroll % 80); y < WINDOW_HEIGHT; y += 80) {
            ctx.fillRect(x - 5, y, 10, 40);
        }
    }


    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(roadLeft, 0);
    ctx.lineTo(roadLeft, WINDOW_HEIGHT);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(roadLeft + ROAD_WIDTH, 0);
    ctx.lineTo(roadLeft + ROAD_WIDTH, WINDOW_HEIGHT);
    ctx.stroke();
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function showGameOver() {
    document.getElementById('gameOver').classList.remove('hidden');
    clearInterval(gameLoop);
}


const keys = {
    A: false,
    D: false,
    SPACE: false
};

function handleKeyDown(e) {
    if (e.key === 'a' || e.key === 'A') keys.A = true;
    if (e.key === 'd' || e.key === 'D') keys.D = true;
    if (e.key === ' ') keys.SPACE = true;
    
    if (gameOver && e.key === ' ') {
        document.getElementById('gameOver').classList.add('hidden');
        startGame();
    }
}

function handleKeyUp(e) {
    if (e.key === 'a' || e.key === 'A') keys.A = false;
    if (e.key === 'd' || e.key === 'D') keys.D = false;
    if (e.key === ' ') keys.SPACE = false;
}


window.onload = init; 