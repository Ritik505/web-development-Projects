class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.level = 1;
        this.enemySpawnRate = 2000; 
        this.lastEnemySpawn = 0;
        this.collisionCooldown = 0; 
        
        this.keys = {};
        this.setupEventListeners();
        this.startGame();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
        document.getElementById('restartButton').addEventListener('click', () => this.restart());
    }

    startGame() {
        this.gameLoop();
        this.spawnEnemies();
    }

    spawnEnemies() {
        setInterval(() => {
            if (!this.gameOver) {
                const side = Math.floor(Math.random() * 4);
                let x, y;
                
                switch(side) {
                    case 0: // top
                        x = Math.random() * this.canvas.width;
                        y = -20;
                        break;
                    case 1: // right
                        x = this.canvas.width + 20;
                        y = Math.random() * this.canvas.height;
                        break;
                    case 2: // bottom
                        x = Math.random() * this.canvas.width;
                        y = this.canvas.height + 20;
                        break;
                    case 3: // left
                        x = -20;
                        y = Math.random() * this.canvas.height;
                        break;
                }
                
                this.enemies.push(new Enemy(x, y, this.player));
            }
        }, this.enemySpawnRate);
    }

    createParticles(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }

    update() {
        if (this.gameOver) return;

        
        if (this.collisionCooldown > 0) {
            this.collisionCooldown--;
        }


        this.player.update(this.keys, this.canvas);
        
        
        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            return bullet.active;
        });

        
        this.enemies = this.enemies.filter(enemy => {
            enemy.update(this.player);
            
            
            if (this.collisionCooldown === 0 && this.checkCollision(enemy, this.player)) {
                this.lives--;
                this.createParticles(this.player.x, this.player.y, '#fff');
                this.updateHUD();
                this.collisionCooldown = 60; 
                
                
                if (this.lives <= 0) {
                    this.endGame();
                }
                return false;
            }

        
            for (let bullet of this.bullets) {
                if (this.checkCollision(enemy, bullet)) {
                    this.score += 10;
                    this.createParticles(enemy.x, enemy.y, '#f00');
                    this.updateHUD();
                    bullet.active = false;
                    return false;
                }
            }
            return true;
        });

        
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.active;
        });

        
        if (this.score > this.level * 100) {
            this.level++;
            this.enemySpawnRate = Math.max(500, this.enemySpawnRate - 200);
            document.getElementById('level').textContent = this.level;
        }
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    
        this.drawStars();

        
        this.player.draw(this.ctx);
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.particles.forEach(particle => particle.draw(this.ctx));
    }

    drawStars() {
        this.ctx.fillStyle = '#fff';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 2;
            this.ctx.fillRect(x, y, size, size);
        }
    }

    checkCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < obj1.radius + obj2.radius;
    }

    updateHUD() {
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('score').textContent = this.score;
    }

    endGame() {
        this.gameOver = true;
        document.getElementById('gameOver').classList.remove('hidden');
        document.getElementById('finalScore').textContent = this.score;
        
        
        for (let i = 0; i < 50; i++) {
            this.createParticles(this.player.x, this.player.y, '#ff0');
        }
    }

    restart() {
        this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.level = 1;
        this.enemySpawnRate = 2000;
        this.collisionCooldown = 0;
        this.updateHUD();
        document.getElementById('gameOver').classList.add('hidden');
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.angle = 0;
        this.speed = 0;
        this.maxSpeed = 5;
        this.acceleration = 0.2;
        this.rotationSpeed = 0.1;
        this.color = '#fff';
        this.engineGlow = 0;
        this.engineGlowDirection = 1;
        this.shield = 100;
        this.shieldRechargeRate = 0.5;
        this.shieldRechargeDelay = 0;
    }

    update(keys, canvas) {
        
        if (keys['ArrowLeft']) this.angle -= this.rotationSpeed;
        if (keys['ArrowRight']) this.angle += this.rotationSpeed;

        
        if (keys['ArrowUp']) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
            this.engineGlow = Math.min(this.engineGlow + 0.1, 1);
        } else {
            this.speed = Math.max(this.speed - this.acceleration * 0.5, 0);
            this.engineGlow = Math.max(this.engineGlow - 0.05, 0);
        }
        if (keys['ArrowDown']) this.speed = Math.max(this.speed - this.acceleration, 0);

        
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;

        
        if (this.shieldRechargeDelay > 0) {
            this.shieldRechargeDelay--;
        } else if (this.shield < 100) {
            this.shield = Math.min(this.shield + this.shieldRechargeRate, 100);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        
        if (this.shield > 0) {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 255, ${this.shield / 100})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        
        ctx.beginPath();
        ctx.moveTo(this.radius, 0);
        ctx.lineTo(-this.radius, -this.radius / 2);
        ctx.lineTo(-this.radius / 2, 0);
        ctx.lineTo(-this.radius, this.radius / 2);
        ctx.closePath();
        
        
        const gradient = ctx.createLinearGradient(-this.radius, 0, this.radius, 0);
        gradient.addColorStop(0, '#444');
        gradient.addColorStop(0.5, '#fff');
        gradient.addColorStop(1, '#444');
        ctx.fillStyle = gradient;
        ctx.fill();


        ctx.beginPath();
        ctx.moveTo(this.radius / 2, -this.radius / 4);
        ctx.lineTo(this.radius / 2, this.radius / 4);
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.stroke();

        
        if (this.engineGlow > 0) {
            const glowGradient = ctx.createRadialGradient(
                -this.radius - 10, 0, 0,
                -this.radius - 10, 0, this.radius
            );
            glowGradient.addColorStop(0, `rgba(255, 100, 0, ${this.engineGlow})`);
            glowGradient.addColorStop(0.5, `rgba(255, 50, 0, ${this.engineGlow * 0.5})`);
            glowGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

            ctx.beginPath();
            ctx.moveTo(-this.radius / 2, 0);
            ctx.lineTo(-this.radius - 20, -this.radius / 3);
            ctx.lineTo(-this.radius - 20, this.radius / 3);
            ctx.closePath();
            ctx.fillStyle = glowGradient;
            ctx.fill();

            
            for (let i = 0; i < 5; i++) {
                const particleX = -this.radius - 20 - Math.random() * 20;
                const particleY = (Math.random() - 0.5) * this.radius;
                const size = Math.random() * 3 + 1;
                
                ctx.beginPath();
                ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, ${Math.floor(Math.random() * 100 + 155)}, 0, ${this.engineGlow})`;
                ctx.fill();
            }
        }

        ctx.restore();
    }

    takeDamage(amount) {
        if (this.shield > 0) {
            this.shield = Math.max(0, this.shield - amount);
            this.shieldRechargeDelay = 60; 
            return this.shield === 0;
        }
        return true;
    }
}

class Enemy {
    constructor(x, y, player) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.speed = 2;
        this.color = '#f00';
        this.player = player;
        this.angle = Math.atan2(player.y - y, player.x - x);
    }

    update(player) {
        
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        
        this.angle = Math.atan2(player.y - this.y, player.x - this.x);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.speed = 10;
        this.angle = angle;
        this.color = '#ff0';
        this.active = true;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        
        if (this.x < 0 || this.x > 800 || this.y < 0 || this.y > 600) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.active = true;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
        
        if (this.alpha <= 0) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}


window.addEventListener('load', () => {
    const game = new Game();
    
                
    window.addEventListener('keydown', (e) => {
        if (e.key === ' ' && !game.gameOver) {
            const bullet = new Bullet(
                game.player.x + Math.cos(game.player.angle) * game.player.radius,
                game.player.y + Math.sin(game.player.angle) * game.player.radius,
                game.player.angle
            );
            game.bullets.push(bullet);
        }
    });
}); 