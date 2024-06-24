const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Definir o tamanho do canvas
canvas.width = 400;
canvas.height = 400;

// Tamanho do quadrado da cobrinha
const box = 20;

// Carregar imagens (opcional)
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";

// Carregar arquivos de áudio (opcional)
// const dead = new Audio();
// const eat = new Audio();

// dead.src = "audio/dead.mp3";
// eat.src = "audio/eat.mp3";

// Criar a cobrinha
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Criar a comida
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Pontuação
let score = 0;

// Controle da cobrinha
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Verificar colisão
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Desenhar no canvas
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);

    // Posição antiga da cabeça
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direção da cobrinha
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Se a cobrinha comeu a comida
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        // eat.play();
    } else {
        snake.pop();
    }

    // Adiciona nova cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        // dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Chamar função draw a cada 100ms
let game = setInterval(draw, 100);