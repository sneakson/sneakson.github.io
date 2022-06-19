let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
context.font = '16px Arial';

const version = 0.1
let score = 0;
let ammo = 5;
let enemyCount = 0;

document.addEventListener('keydown', function(event) {
    if(gameState === 'alive'){
        if(!event.repeat && ammo > 0){
            // console.log('press', event.key);
            enemies.find(enemy => enemy.value === event.key);
            const hitIndex = enemies.findIndex(enemy => enemy.value === event.key);
            // console.log(hitIndex);
            if(hitIndex >= 0){
                score++;
                checkLevel();
                enemies.splice(hitIndex, 1);
            }else{
                if(event.key !== 'Shift')
                    ammo--;
            }
        }
    }else{
        if(event.key === 'Enter'){
            // console.log('Enter');
            enemies = [];
            level = 1;
            gameState = 'alive';
            score = 0;
            ammo = 5;
        }
    }

});

const player = {

};

let enemies = [

];

const enemyTypes = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')'
]

const spawnPointX = 700;

// console.log('hi mark');

window.requestAnimationFrame(update);

let prevTime = 0;
let spawnCountdown = 1000;
let spawnRate = 500;

let frame = 0;

let gameState = 'alive';

function update(timestamp) {

    // console.log('prev time', prevTime)
    // console.log('timestamp', timestamp)

    let elapsedTime = timestamp - prevTime;
    prevTime = timestamp;
    spawnCountdown -= elapsedTime;
    // console.log('elasped time', elapsedTime);
    // console.log('spawnCountdown', spawnCountdown);

    // prevSpawnTime = prevSpawnTime ?? timestamp;

    if(gameState === 'alive'){
        if(spawnCountdown < 0){
            spawnCountdown = spawnRate;
            enemies.push(makeEnemy());
    
            // console.log('enemies', enemies);
        }
        moveEnemies(elapsedTime);
        checkDead();
    }



    context.clearRect(0, 0, canvas.width, canvas.height);

    draw();

    // frame++;
    // if(frame < 2)
    window.requestAnimationFrame(update);
}

// let prevGameTime;

// function gameLoop(timestamp) {
//     let elapsedTime = timestamp - prevTime;
//     prevGameTime = timestamp;
// }

function draw() {
    context.fillRect(0,0,100,200);
    context.fillText(gameState, 50, 250);
    context.fillText(`Score ${score}`, 50, 300);
    context.fillText(`Ammo ${ammo}`, 50, 350);
    context.fillText(`Level ${level}`, 50, 400);
    context.fillText(`Version ${version}`, 50, 450);
    enemies.forEach(enemy => {
        context.fillText(enemy.value, enemy.x, enemy.y);
    });
}

function moveEnemies(elapsedTime) {
    const seconds = elapsedTime / 1000;

    enemies.forEach(enemy => {
        const movement = seconds * enemy.speed;
        enemy.x = enemy.x - movement;
    });
}

let deadpoint = 100;
function checkDead(){
    if(enemies.find(enemy => enemy.x < deadpoint)){
        gameState = 'dead, press enter to play again';
    }
}

let level = 1;
function checkLevel() {
    // console.log('check level', score / (level * 10));
    // console.log('level', level);
    // console.log('check level', score / (level * 10));
    if(score / (level * 10) > level){
        // console.log('level up');
        level++;
    }
}

let lastY = 50;
function getYSpawn() {
    const y = lastY;
    lastY += 50;
    lastY %= 400;

    lastY = lastY === 0 ? 50 : lastY;

    return y;
}

function makeEnemy() {
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    let speed = enemySpeed();
    const enemy = {
        speed: speed,
        value: randomType,
        x: spawnPointX,
        y: getYSpawn()
    }

    enemyCount++;

    return enemy;
}

let defaultSpeed = 25;

function enemySpeed() {
    const levelSpeedModifier = level * 20;
    let speed = defaultSpeed + levelSpeedModifier;
    if(shouldMakeFastEnemy()){
        speed *= 1.25;
    }
    return speed;
}

function shouldMakeFastEnemy() {
    return (enemyCount + 1) % 11 === 0;
}








