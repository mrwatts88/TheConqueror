import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';

export const updateEnemies = (p5, enemies, map, startCorner, frame) => {
    if (frame % 1 !== 0) return;

    if (Math.random() < 0.97) {
        for (let enemy of enemies) {
            goPrevDirection(enemy, map, startCorner);
        }
        return;
    }

    for (let enemy of enemies) {
        let dir = Math.random();
        if (dir < 0.2)
            goUp(enemy, map, startCorner);
        else if (dir < 0.4)
            goDown(enemy, map, startCorner);
        else if (dir < 0.6)
            goLeft(enemy, map, startCorner);
        else if (dir < 0.8)
            goRight(enemy, map, startCorner);
        else
            enemy.prevDirection = 'stay';
    }
}

const goUp = (enemy, map, startCorner) => {
    if (processGuy(Math.floor((enemy.ypos - enemy.speed) / BS) + startCorner.row, undefined, enemy, map, startCorner)) {
        enemy.ypos -= enemy.speed;
        enemy.prevDirection = 'up';
    }
    advanceStep(enemy);
}

const goDown = (enemy, map, startCorner) => {
    if (processGuy(Math.floor((enemy.ypos + enemy.speed + BS - 1) / BS) + startCorner.row, undefined, enemy, map, startCorner)) {
        enemy.ypos += enemy.speed;
        enemy.prevDirection = 'down';
    }
    advanceStep(enemy);
}

const goLeft = (enemy, map, startCorner) => {
    if (processGuy(undefined, Math.floor((enemy.xpos - enemy.speed) / BS) + startCorner.col, enemy, map, startCorner)) {
        enemy.xpos -= enemy.speed;
        enemy.prevDirection = 'left';
    }
    advanceStep(enemy);
}

const goRight = (enemy, map, startCorner) => {
    if (processGuy(undefined, Math.floor((enemy.xpos + enemy.speed + BS - 1) / BS) + startCorner.col, enemy, map, startCorner)) {
        enemy.xpos += enemy.speed;
        enemy.prevDirection = 'right';
    }
    advanceStep(enemy);
}

const goPrevDirection = (enemy, map, startCorner) => {
    switch (enemy.prevDirection) {
        case 'stay':
            break;
        case 'up':
            goUp(enemy, map, startCorner)
            break;
        case 'down':
            goDown(enemy, map, startCorner)
            break;
        case 'left':
            goLeft(enemy, map, startCorner)
            break;
        case 'right':
            goRight(enemy, map, startCorner)
            break;
        default:
            goRight(enemy, map, startCorner)
            break;
    }
}

const advanceStep = enemy => {
    enemy.step += 0.3;
    if (enemy.step > 3) enemy.step = 0;
}