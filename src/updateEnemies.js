import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';

export const updateEnemies = (p5, enemies, map, startCorner) => {
    for (let enemy of enemies) {
        let dir = Math.random();
        if (dir < 0.25) {
            if (processGuy(Math.floor((enemy.ypos - 1) / BS), undefined, enemy, map, startCorner))
                enemy.ypos -= SPEED;

        } else if (dir < 0.5) {
            if (processGuy(Math.floor((enemy.ypos + 1 + BS) / BS), undefined, enemy, map, startCorner))
                enemy.ypos += SPEED;

        } else if (dir < 0.75) {
            if (processGuy(undefined, Math.floor((enemy.xpos - 1) / BS), enemy, map, startCorner))
                enemy.xpos -= SPEED;

        } else
            if (processGuy(undefined, Math.floor((enemy.xpos + 1 + BS) / BS), enemy, map, startCorner))
                enemy.xpos += SPEED;
    }
}