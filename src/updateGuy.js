import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';
import { getState, setState } from './globalState';

export const updateGuy = p5 => {
    let { player, map, startCorner } = getState();
    let p = player[0];
    if (p.xpos === undefined) return;
    if (p5.frameCount % 1 !== 0) return;

    if (p5.keyIsDown(p5.UP_ARROW)) {
        p.direction = 'up';
        if (processGuy(Math.floor((p.ypos - p.speed) / BS) + startCorner.row, undefined, p))
            p.ypos -= p.speed;
        advanceStep(p);
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
        p.direction = 'playerdown';
        if (processGuy(Math.floor((p.ypos + p.speed + BS - 1) / BS) + startCorner.row, undefined, p))
            p.ypos += p.speed;
        advanceStep(p);
    }

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
        p.direction = 'left';
        if (processGuy(undefined, Math.floor((p.xpos - p.speed) / BS) + startCorner.col, p))
            p.xpos -= p.speed;
        advanceStep(p);
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        p.direction = 'right';
        if (processGuy(undefined, Math.floor((p.xpos + p.speed + BS - 1) / BS) + startCorner.col, p))
            p.xpos += p.speed;
        advanceStep(p);
    }
}

const advanceStep = p => {
    p.step += 0.3;
    if (p.step > 4) p.step = 0;
}
