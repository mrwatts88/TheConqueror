import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';

export const updateEnemies = (p5, player, map) => {
    let dir = Math.random();
    if (dir < 0.25) {
        if (processGuy(Math.floor((player.ypos - 1) / BS), undefined, player, map))
            player.ypos -= SPEED;

    } else if (dir < 0.5) {
        if (processGuy(Math.floor((player.ypos + 1 + BS) / BS), undefined, player, map))
            player.ypos += SPEED;

    } else if (dir < 0.75) {
        if (processGuy(undefined, Math.floor((player.xpos - 1) / BS), player, map))
            player.xpos -= SPEED;

    } else
        if (processGuy(undefined, Math.floor((player.xpos + 1 + BS) / BS), player, map))
            player.xpos += SPEED;
}