import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';

export const updateGuy = (p5, player, map, startCorner) => {
    if (p5.keyIsDown(p5.UP_ARROW)) {
        if (processGuy(Math.floor((player.ypos - player.speed) / BS) + startCorner.row, undefined, player, map, startCorner))
            player.ypos -= player.speed;
    }

    if (p5.keyIsDown(p5.DOWN_ARROW))
        if (processGuy(Math.floor((player.ypos + player.speed + BS) / BS) + startCorner.row, undefined, player, map, startCorner))
            player.ypos += player.speed;

    if (p5.keyIsDown(p5.LEFT_ARROW))
        if (processGuy(undefined, Math.floor((player.xpos - player.speed) / BS) + startCorner.col, player, map, startCorner))
            player.xpos -= player.speed;

    if (p5.keyIsDown(p5.RIGHT_ARROW))
        if (processGuy(undefined, Math.floor((player.xpos + player.speed + BS) / BS) + startCorner.col, player, map, startCorner))
            player.xpos += player.speed;
}