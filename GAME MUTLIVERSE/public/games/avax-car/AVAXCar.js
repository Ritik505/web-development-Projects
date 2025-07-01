const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "CarMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_CARS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "carPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cars",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "speed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "acceleration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "handling",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getCarStats",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_speed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_acceleration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_handling",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_color",
				"type": "string"
			}
		],
		"name": "mintCar",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "setCarPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contractAddress = '0x37A4786276bDaA20C25acB8FaAaB42E1cf9577B0';

let web3;
let contract;
let accounts = [];
let selectedCar = null;

async function init() {
	if (typeof window.ethereum !== 'undefined') {
		try {
			accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			console.log('Connected accounts:', accounts);
			
			web3 = new Web3(window.ethereum);
			
			if (!web3.utils.isAddress(contractAddress)) {
				throw new Error('Invalid contract address');
			}
			
			contract = new web3.eth.Contract(contractABI, contractAddress);
			console.log('Contract initialized:', contract);
			
			updateWalletStatus();
			loadOwnedCars();
			
			window.ethereum.on('accountsChanged', (newAccounts) => {
				accounts = newAccounts;
				updateWalletStatus();
				loadOwnedCars();
			});
			
			window.ethereum.on('chainChanged', () => {
				window.location.reload();
			});
			
		} catch (error) {
			console.error('Error initializing:', error);
			alert('Error: ' + error.message);
		}
	} else {
		alert('Please install MetaMask to use this application!');
	}
}

function updateWalletStatus() {
	const walletStatus = document.getElementById('wallet-status');
	if (accounts.length > 0) {
		walletStatus.textContent = `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
	} else {
		walletStatus.textContent = 'Connect Wallet';
	}
}

async function loadOwnedCars() {
	if (!contract || !accounts[0]) return;
	
	const ownedCarsDiv = document.getElementById('owned-cars');
	ownedCarsDiv.innerHTML = '';
	
	try {
		const balance = await contract.methods.balanceOf(accounts[0]).call();
		console.log('User balance:', balance);
		
		for (let i = 0; i < balance; i++) {
			const tokenId = i + 1;
			try {
				const carStats = await contract.methods.getCarStats(tokenId).call();
				console.log('Car stats:', carStats);
				
				const carCard = document.createElement('div');
				carCard.className = 'car-card';
				carCard.innerHTML = `
					<h3>Car #${tokenId}</h3>
					<p>Speed: ${carStats[0]}</p>
					<p>Acceleration: ${carStats[1]}</p>
					<p>Handling: ${carStats[2]}</p>
					<div style="background-color: ${carStats[3]}; width: 50px; height: 50px; margin: 10px auto;"></div>
					<button onclick="selectCar(${tokenId})">Select</button>
				`;
				ownedCarsDiv.appendChild(carCard);
			} catch (error) {
				console.error(`Error loading car ${tokenId}:`, error);
				continue;
			}
		}
	} catch (error) {
		console.error('Error loading cars:', error);
	}
}

function selectCar(tokenId) {
	selectedCar = tokenId;
	alert(`Car #${tokenId} selected for racing!`);
}

document.getElementById('mint-form').addEventListener('submit', async (e) => {
	e.preventDefault();
	
	if (!contract || !accounts[0]) {
		alert('Please connect your wallet first');
		return;
	}
	
	const speed = document.getElementById('speed').value;
	const acceleration = document.getElementById('acceleration').value;
	const handling = document.getElementById('handling').value;
	const color = document.getElementById('color').value;
	
	try {
		await contract.methods.mintCar(
			speed,
			acceleration,
			handling,
			color
		).send({ 
			from: accounts[0], 
			value: web3.utils.toWei('0.1', 'ether')
		});
		
		loadOwnedCars();
		alert('Car minted successfully!');
	} catch (error) {
		console.error('Error minting car:', error);
		alert('Error minting car: ' + error.message);
	}
});

const canvas = document.getElementById('race-track');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600; // Same height

class Car {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speed = 0;
		this.maxSpeed = 5;
		this.acceleration = 0.1;
		this.friction = 0.05;
		this.angle = 0;
		this.turnSpeed = 0.03;
		this.controls = new Controls();
		
		this.image = new Image();
		this.image.src = 'images\\player.png';
		this.image.onerror = () => {
			console.error('Failed to load player car image');
			this.useDefaultShape = true;
		};
	}

	update() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}

		if (this.speed !== 0) {
			const flip = this.speed > 0 ? 1 : -1;
			if (this.controls.left) {
				this.angle += this.turnSpeed * flip;
			}
			if (this.controls.right) {
				this.angle -= this.turnSpeed * flip;
			}
		}

		if (this.speed > 0) {
			this.speed -= this.friction;
		}
		if (this.speed < 0) {
			this.speed += this.friction;
		}
		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		}
		if (this.speed < -this.maxSpeed/2) {
			this.speed = -this.maxSpeed/2;
		}

		const newX = this.x - Math.sin(this.angle) * this.speed;
		const newY = this.y - Math.cos(this.angle) * this.speed;

		const trackPadding = 50;
		const carHalfWidth = this.width / 2;
		const carHalfHeight = this.height / 2;

		if (newX - carHalfWidth >= trackPadding && 
			newX + carHalfWidth <= canvas.width - trackPadding && 
			newY - carHalfHeight >= trackPadding && 
			newY + carHalfHeight <= canvas.height - trackPadding) {
			this.x = newX;
			this.y = newY;
		} else {
			this.speed = 0;
		}
	}

	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.angle);
		
		if (this.image.complete && !this.useDefaultShape) {
			ctx.drawImage(
				this.image,
				-this.width/2,
				-this.height/2,
				this.width,
				this.height
			);
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
		}
		
		ctx.restore();
	}
}

class Controls {
	constructor() {
		this.forward = false;
		this.reverse = false;
		this.left = false;
		this.right = false;
		this.brake = false;

		this.#addKeyboardListeners();
	}

	#addKeyboardListeners() {
		document.addEventListener('keydown', (event) => {
			switch(event.key) {
				case 'w':
				case 'W':
					this.forward = true;
					break;
				case 's':
				case 'S':
					this.reverse = true;
					break;
				case 'a':
				case 'A':
					this.left = true;
					break;
				case 'd':
				case 'D':
					this.right = true;
					break;
			}
		});

		document.addEventListener('keyup', (event) => {
			switch(event.key) {
				case 'w':
				case 'W':
					this.forward = false;
					break;
				case 's':
				case 'S':
					this.reverse = false;
					break;
				case 'a':
				case 'A':
					this.left = false;
					break;
				case 'd':
				case 'D':
					this.right = false;
					break;
			}
		});
	}
}

class EnemyCar extends Car {
	constructor(x, y, width, height) {
		super(x, y, width, height, '#D2B48C');
		this.speed = 4.5;
		this.direction = Math.random() * Math.PI * 2;
		this.changeDirectionTimer = 0;
		this.maxChangeDirectionTime = 50;
		this.turnSpeed = 0.05;
		this.chaseDistance = 300;
		
		this.image = new Image();
		this.image.src = 'images\\enemy.png';
		this.image.onerror = () => {
			console.error('Failed to load enemy car image');
			this.useDefaultShape = true;
		};
	}

	update() {
		if (!car) return;

		const dx = car.x - this.x;
		const dy = car.y - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < this.chaseDistance) {
			const targetAngle = Math.atan2(dy, dx);
			
			this.direction = this.lerp(this.direction, targetAngle, 0.1);
			
			this.speed = 5.5;
		} else {	
			this.changeDirectionTimer++;
			if (this.changeDirectionTimer >= this.maxChangeDirectionTime) {
				const targetDirection = Math.random() * Math.PI * 2;
				this.direction = this.lerp(this.direction, targetDirection, 0.1);
				this.changeDirectionTimer = 0;
				this.speed = 4.5;
			}
		}

		const targetX = this.x + Math.cos(this.direction) * this.speed;
		const targetY = this.y + Math.sin(this.direction) * this.speed;

		this.x = this.lerp(this.x, targetX, 0.1);
		this.y = this.lerp(this.y, targetY, 0.1);

		if (this.x < 50) {
			this.x = 50;
			this.direction = Math.PI - this.direction;
		}
		if (this.x > canvas.width - 50) {
			this.x = canvas.width - 50;
			this.direction = Math.PI - this.direction;
		}
		if (this.y < 50) {
			this.y = 50;
			this.direction = -this.direction;
		}
		if (this.y > canvas.height - 50) {
			this.y = canvas.height - 50;
			this.direction = -this.direction;
		}

		this.angle = this.lerp(this.angle, this.direction, 0.1);
	}

	lerp(start, end, amt) {
		return (1 - amt) * start + amt * end;
	}

	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.angle);
		
		if (this.image.complete && !this.useDefaultShape) {
			ctx.drawImage(
				this.image,
				-this.width/2,
				-this.height/2,
				this.width,
				this.height
			);
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
		}
		
		ctx.restore();
	}
}

let raceInProgress = false;
let car = null;
let enemyCars = [];
let gameOver = false;
let score = 0;
let scoreInterval;

function startRace() {
	if (!selectedCar) {
		alert('Please select a car first!');
		return;
	}
	
	raceInProgress = true;
	gameOver = false;
	score = 0;
	document.getElementById('score').textContent = '0';
	document.getElementById('scoreboard').style.display = 'block';
	
	scoreInterval = setInterval(() => {
		if (raceInProgress && !gameOver) {
			score++;
			document.getElementById('score').textContent = score;
		}
	}, 1000);

	car = new Car(
		canvas.width/2,
		canvas.height/2,
		45,
		75,
		'#f00'
	);

	enemyCars = [];
	
	const enemy1 = new EnemyCar(
		100,
		100,
		45,
		75
	);
	enemy1.direction = Math.PI / 4;
	enemyCars.push(enemy1);
	
	const enemy2 = new EnemyCar(
		canvas.width - 100,
		canvas.height - 100,
		45,
		75
	);
	enemy2.direction = (5 * Math.PI) / 4;
	enemyCars.push(enemy2);

	const playerCarImage = new Image();
	playerCarImage.src = 'images\\player.png';
	
	const enemyCarImage = new Image();
	enemyCarImage.src = 'images\\enemy.png';
	
	Promise.all([
		new Promise(resolve => playerCarImage.onload = resolve),
		new Promise(resolve => enemyCarImage.onload = resolve)
	]).then(() => {
		requestAnimationFrame(gameLoop);
	}).catch(error => {
		console.error('Error loading images:', error);
		alert('Error loading game images. Please check if the image files exist.');
	});
}

function checkCollision(car1, car2) {
	const dx = car1.x - car2.x;
	const dy = car1.y - car2.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance < (car1.width + car2.width) / 2;
}

function gameLoop() {
	if (!raceInProgress || gameOver) return;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = '#333';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.strokeStyle = '#fff';
	ctx.lineWidth = 5;
	const trackPadding = 50;
	ctx.strokeRect(trackPadding, trackPadding, canvas.width - 2 * trackPadding, canvas.height - 2 * trackPadding);
	
	ctx.fillStyle = '#fff';
	ctx.fillRect(canvas.width - 20, trackPadding, 2, canvas.height - 2 * trackPadding);

	car.update();
	car.draw();

	for (let enemy of enemyCars) {
		enemy.update();
		enemy.draw();

		if (checkCollision(car, enemy)) {
			gameOver = true;
			raceInProgress = false;
			clearInterval(scoreInterval);
			alert(`Game Over! Your final score: ${score}`);
			return;
		}
	}
	
	requestAnimationFrame(gameLoop);
}

document.getElementById('start-race').addEventListener('click', startRace);
document.getElementById('reset-race').addEventListener('click', () => {
	raceInProgress = false;
	gameOver = false;
	car = null;
	enemyCars = [];
	clearInterval(scoreInterval);
	document.getElementById('scoreboard').style.display = 'none';
	canvas.height = canvas.offsetHeight;
});

window.addEventListener('load', init); 