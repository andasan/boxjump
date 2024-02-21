(() => {
	// Constant rendering or the game's looping logic || all browser support
	const requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

// Variable declarations
const GAME_WIDTH = 700;
const GAME_HEIGHT = 300;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const player = {
	x: 0,
	y: GAME_HEIGHT - 100,
	width: 20,
	height: 20,
	speed: 3,
	velX: 0,
	velY: 0,
	jumping: false,
};
const floor = {
	x: 0,
	y: GAME_HEIGHT - 150,
	width: GAME_WIDTH,
	height: 20,
};

// biome-ignore lint/style/useSingleVarDeclarator: just for aesthetics
let levels = 1,
	death = 0,
	keys = [],
	walls = [],
	friction = 0.8,
	gravity = 0.3,
	stageInit = true,
	developerMode = false,
	gamestart = false;

// Apply var WxH onto element's dimension
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

class Wall {
	constructor(color, x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw() {
		context.fillStyle = "white";
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		this.draw();
	}
}

function createWall(lvl) {
	walls = []; // Reset walls every level

	if (developerMode) {
		// When creating/testing new levels
		walls.push(new Wall("white", 140, floor.y - 50, 20, 50));
		walls.push(new Wall("white", 290, floor.y - 50, 20, 50));
		walls.push(new Wall("white", 450, floor.y - 50, 20, 50));
		walls.push(new Wall("white", 620, floor.y - 50, 20, 50));
	} else {
		switch (lvl) {
			case 1:
				walls.push(new Wall("white", 300, floor.y - 30, 20, 30));
				break;
			case 2:
				walls.push(new Wall("white", 200, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 350, floor.y - 30, 20, 30));
				break;
			case 3:
				walls.push(new Wall("white", 280, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 300, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 320, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 340, floor.y - 30, 20, 30));
				break;
			case 4:
				walls.push(new Wall("white", 280, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 300, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 320, floor.y - 30, 20, 30));

				walls.push(new Wall("white", 440, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 460, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 480, floor.y - 30, 20, 30));
				break;
			case 5:
				walls.push(new Wall("white", 280, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 300, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 320, floor.y - 30, 20, 30));

				walls.push(new Wall("white", 440, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 460, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 480, floor.y - 30, 20, 30));
				break;
			case 6:
				walls.push(new Wall("white", 180, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 200, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 220, floor.y - 30, 20, 30));

				walls.push(new Wall("white", 340, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 360, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 380, floor.y - 30, 20, 30));

				walls.push(new Wall("white", 500, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 520, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 540, floor.y - 30, 20, 30));
				break;
			case 7:
				walls.push(new Wall("white", 130, floor.y - 35, 150, 10));
				walls.push(new Wall("white", 340, floor.y - 10, 50, 10));
				walls.push(new Wall("white", 550, floor.y - 50, 20, 50));
				break;
			case 8:
				walls.push(new Wall("white", 180, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 200, floor.y - 40, 20, 40));
				walls.push(new Wall("white", 220, floor.y - 50, 20, 50));

				walls.push(new Wall("white", 370, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 390, floor.y - 40, 20, 40));
				walls.push(new Wall("white", 410, floor.y - 30, 20, 30));

				walls.push(new Wall("white", 560, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 580, floor.y - 40, 20, 40));
				walls.push(new Wall("white", 600, floor.y - 50, 20, 50));
				break;
			case 9:
				walls.push(new Wall("white", 180, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 200, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 220, floor.y - 30, 20, 30));

				walls.push(new Wall("white", 290, floor.y - 35, 150, 10));

				walls.push(new Wall("white", 520, floor.y - 30, 20, 30));
				walls.push(new Wall("white", 540, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 560, floor.y - 30, 20, 30));
				break;
			case 10:
				walls.push(new Wall("white", 140, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 290, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 450, floor.y - 50, 20, 50));
				walls.push(new Wall("white", 620, floor.y - 50, 20, 50));
				break;
			default:
				break;
		}
	}
}

function splashScreen() {
	context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	context.fillStyle = "white";
	context.font = "60px Verdana";
	context.fillText('Press "S" to Start', 100, 150);
}

function updateGame() {
	if (levels > 10) {
		endGame();
		return;
	}

	if (stageInit) {
		setTimeout(() => {
			player.velX++;
			// stageInit = false;
		}, 1000);
	}

	// Player movement mechanics
	player.velX *= friction;
	player.velY += gravity;

	player.x += player.velX;
	player.y += player.velY;

	// Check for up keys
	if (keys.ArrowUp || keys.Space) {
		// Up arrow or space
		if (!player.jumping) {
			player.jumping = true;
			player.velY = -player.speed * 2;
			console.log(player.velY);
		}
	}

	// Floor collision
	if (player.y >= floor.y - player.height) {
		player.y = floor.y - player.height;
		player.jumping = false;
	}

	// Wall collision
	for (const w of walls) {
		if (
			player.x + player.width >= w.x &&
			player.x <= w.x + w.width &&
			player.y + player.height >= w.y &&
			player.y <= w.y + w.height
		) {
			console.log("collision");
			player.x = 0;
			death++;
		}
	}

	// Player hits the end = new level
	if (player.x + player.width >= GAME_WIDTH) {
		player.x = 0;
		levels++;
	}

	createWall(levels);

	// Draw the player onto the canvas
	context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	context.fillStyle = "orange";
	context.fillRect(player.x, player.y, player.width, player.height);

	context.font = "20px Verdana";
	context.fillStyle = "white";
	context.fillText(`Death: ${death}`, 0, 20);
	context.fillText(`Level: ${levels}`, GAME_WIDTH - 80, 20);
	context.fillText(
		'Press "Space" or "↑" to jump',
		GAME_WIDTH / 2 - 110,
		GAME_HEIGHT - 40,
	);
	context.fillText('Press "R" to reset', GAME_WIDTH / 2 - 90, GAME_HEIGHT - 10);

	context.fillRect(floor.x, floor.y, floor.width, floor.height);

	// Loop
	requestAnimationFrame(updateGame);

	for (const w of walls) {
		w.update();
	}
}

function endGame() {
	// biome-ignore lint/style/useConst: subText is reassigned
	let subText;
	context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	context.fillStyle = "white";
	context.font = "60px Verdana";
	context.fillText(`You died ${death} times`, 120, 150);
	subText =
		death === 0
			? "Wow!!! Congrats!!! Press R to retry"
			: "Can you do better? Press R to retry";
	context.font = "30px Verdana";
	context.fillText(subText, 110, 190);
}

// Listener for when spacebar key is pressed
document.body.addEventListener("keydown", (e) => {
	keys[e.code] = true;
});

// Listener for when spacebar key is released
document.body.addEventListener("keyup", (e) => {
	keys[e.code] = false;
});

// Reload game ||| keycode is R
document.addEventListener("keyup", (e) => {
	const pressedReload = e.key === "r" || e.key === "R";
	if (pressedReload) window.location.reload();
});

// Game start listener ||| keycode is S
document.addEventListener("keyup", (e) => {
	const pressedStart = e.key === "s" || e.key === "S";
	if (pressedStart && !gamestart) {
		updateGame();
		gamestart = true;
	}
});

// Page load listener
window.addEventListener("load", () => {
	// updateGame();
	splashScreen();
});
