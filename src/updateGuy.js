import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';

export const updateGuy = (p5, player, map, startCorner, frame) => {
    if (player.xpos === undefined) return;
    if (frame % 1 !== 0) return;

    if (p5.keyIsDown(p5.UP_ARROW)) {
        player.direction = 'up';
        if (processGuy(Math.floor((player.ypos - player.speed) / BS) + startCorner.row, undefined, player, map, startCorner))
            player.ypos -= player.speed;
        advanceStep(player);
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
        player.direction = 'down';
        if (processGuy(Math.floor((player.ypos + player.speed + BS - 1) / BS) + startCorner.row, undefined, player, map, startCorner))
            player.ypos += player.speed;
        advanceStep(player);
    }

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
        player.direction = 'left';
        if (processGuy(undefined, Math.floor((player.xpos - player.speed) / BS) + startCorner.col, player, map, startCorner))
            player.xpos -= player.speed;
        advanceStep(player);
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        player.direction = 'right';
        if (processGuy(undefined, Math.floor((player.xpos + player.speed + BS - 1) / BS) + startCorner.col, player, map, startCorner))
            player.xpos += player.speed;
        advanceStep(player);
    }
}

const advanceStep = player => {
    player.step += 0.3;
    if (player.step > 4) player.step = 0;
}
