const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gravity = 0.25;
const duckSpeed = 4;
const maxBullets = 3;
let bullets = maxBullets;
let score = 0;
let roundActive = false;
let ducks = [];

function spawnDuck() {
    const startX = Math.random() * (canvas.width - 60) + 30;
    const duck = {
        x: startX,
        y: canvas.height - 30,
        vx: Math.random() * 2 - 1 < 0 ? -duckSpeed : duckSpeed,
        vy: -8 - Math.random() * 4,
        hit: false
    };
    ducks.push(duck);
    roundActive = true;
    bullets = maxBullets;
}

function resetRound() {
    ducks = [];
    setTimeout(spawnDuck, 1000);
}

function drawDuck(duck) {
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.rect(duck.x - 10, duck.y - 10, 20, 20);
    ctx.fill();
}

function drawBullets() {
    ctx.fillStyle = 'black';
    for (let i = 0; i < bullets; i++) {
        ctx.fillRect(10 + i * 15, canvas.height - 20, 10, 10);
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function updateDuck(duck) {
    duck.vy += gravity;
    duck.x += duck.vx;
    duck.y += duck.vy;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!roundActive) {
        resetRound();
    }

    ducks.forEach(duck => {
        updateDuck(duck);
        drawDuck(duck);
    });

    ducks = ducks.filter(duck => duck.y < canvas.height + 40 && !duck.hit);

    if (ducks.length === 0 && bullets === 0) {
        roundActive = false;
    }

    drawBullets();
    drawScore();

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (e) => {
    if (bullets <= 0) return;
    bullets--;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    ducks.forEach(duck => {
        if (!duck.hit && Math.abs(mouseX - duck.x) < 15 && Math.abs(mouseY - duck.y) < 15) {
            duck.hit = true;
            score += 100;
        }
    });
});

spawnDuck();
requestAnimationFrame(gameLoop);
