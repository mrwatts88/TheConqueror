import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';

export const updateGuy = (p5, player, map) => {
    if (p5.keyIsDown(p5.UP_ARROW))
        if (processGuy(Math.floor((player.ypos - 1) / BS), undefined, player, map))
            player.ypos -= SPEED;

    if (p5.keyIsDown(p5.DOWN_ARROW))
        if (processGuy(Math.floor((player.ypos + 1 + BS) / BS), undefined, player, map))
            player.ypos += SPEED;

    if (p5.keyIsDown(p5.LEFT_ARROW))
        if (processGuy(undefined, Math.floor((player.xpos - 1) / BS), player, map))
            player.xpos -= SPEED;

    if (p5.keyIsDown(p5.RIGHT_ARROW))
        if (processGuy(undefined, Math.floor((player.xpos + 1 + BS) / BS), player, map))
            player.xpos += SPEED;
}