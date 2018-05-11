import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';

export const updateEnemies = (p5, enemies, map, startCorner, frame) => {
    if (frame % 7 !== 0) return;
    for (let enemy of enemies) {
        if (Math.random() < 0.7) {
            goPrevDirection(enemy, map, startCorner);
            return;
        }

        let dir = Math.random();
        if (dir < 0.25) {
            goUp(enemy, map, startCorner);

        } else if (dir < 0.5) {
            goDown(enemy, map, startCorner);

        } else if (dir < 0.75) {
            goLeft(enemy, map, startCorner);

        } else
            goRight(enemy, map, startCorner);
    }
}

const goUp = (enemy, map, startCorner) => {
    if (processGuy(Math.floor((enemy.ypos - enemy.speed) / BS) + startCorner.row, undefined, enemy, map, startCorner)) {
        enemy.ypos -= enemy.speed;
        enemy.prevDirection = 'up';
    }
}

const goDown = (enemy, map, startCorner) => {
    if (processGuy(Math.floor((enemy.ypos + enemy.speed + BS - 1) / BS) + startCorner.row, undefined, enemy, map, startCorner)) {
        enemy.ypos += enemy.speed;
        enemy.prevDirection = 'down';
    }
}

const goLeft = (enemy, map, startCorner) => {
    if (processGuy(undefined, Math.floor((enemy.xpos - enemy.speed) / BS) + startCorner.col, enemy, map, startCorner)) {
        enemy.xpos -= enemy.speed;
        enemy.prevDirection = 'left';
    }

}

const goRight = (enemy, map, startCorner) => {
    if (processGuy(undefined, Math.floor((enemy.xpos + enemy.speed + BS - 1) / BS) + startCorner.col, enemy, map, startCorner)) {
        enemy.xpos += enemy.speed;
        enemy.prevDirection = 'right';
    }
}

const goPrevDirection = (enemy, map, startCorner) => {
    switch (enemy.prevDirection) {
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