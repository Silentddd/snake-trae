// 游戏常量
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// 游戏状态
let snake = [
    { x: 10, y: 10 }
];
let food = {};
let direction = DIRECTIONS.RIGHT;
let gameOver = false;
let gameSpeed = 150;
let score = 0;

// 初始化游戏
function init() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // 生成食物
    generateFood();
    
    // 游戏主循环
    function gameLoop() {
        if (gameOver) return;
        
        // 移动蛇
        moveSnake();
        
        // 检查碰撞
        checkCollisions();
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制食物
        drawFood(ctx);
        
        // 绘制蛇
        drawSnake(ctx);
        
        // 显示分数
        drawScore(ctx);
        
        // 继续游戏循环
        setTimeout(gameLoop, gameSpeed);
    }
    
    // 开始游戏
    gameLoop();
    
    // 键盘控制
    document.addEventListener('keydown', changeDirection);
}

// 生成食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // 确保食物不会出现在蛇身上
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            return generateFood();
        }
    }
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

// 检查碰撞
function checkCollisions() {
    const head = snake[0];
    
    // 撞墙
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver = true;
        alert('游戏结束！你的分数是: ' + score);
        return;
    }
    
    // 撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            alert('游戏结束！你的分数是: ' + score);
            return;
        }
    }
}

// 改变方向
function changeDirection(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== DIRECTIONS.DOWN) direction = DIRECTIONS.UP;
            break;
        case 'ArrowDown':
            if (direction !== DIRECTIONS.UP) direction = DIRECTIONS.DOWN;
            break;
        case 'ArrowLeft':
            if (direction !== DIRECTIONS.RIGHT) direction = DIRECTIONS.LEFT;
            break;
        case 'ArrowRight':
            if (direction !== DIRECTIONS.LEFT) direction = DIRECTIONS.RIGHT;
            break;
    }
}

// 绘制蛇
function drawSnake(ctx) {
    ctx.fillStyle = '#4CAF50';
    for (let segment of snake) {
        ctx.fillRect(
            segment.x * CELL_SIZE,
            segment.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    }
}

// 绘制食物
function drawFood(ctx) {
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(
        food.x * CELL_SIZE,
        food.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
    );
}

// 绘制分数
function drawScore(ctx) {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('分数: ' + score, 10, 30);
}

// 启动游戏
window.onload = init;