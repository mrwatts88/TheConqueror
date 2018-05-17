import { getState, setState } from './globalState';
import { BS } from './constants';

export const drawGuy = p5 => {
    let { players, images, env, startCorner, next, id } = getState();
    let p = players[id];
    if (p.xpos === undefined) return;

    let screensLeft = startCorner.col * BS;
    let screensTop = startCorner.row * BS;

    if (env === 'DEBUG') {
        p5.fill(p.color);
        p5.rect(p.xpos - screensLeft, p.ypos - screensTop, p.width, p.height);
        p5.fill('white');
    } else if (env === 'PRODUCTION') {
        // location of sprite within sprite sheet (images)
        let x = 32 * (Math.floor(p.step));
        let y = 0;

        switch (p.direction) {
            case 'down': break;
            case 'left': y += 32; break;
            case 'right': y += 64; break;
            case 'up': y += 96; break;
        }

        p5.image(
            images,
            p.xpos - screensLeft, p.ypos - screensTop,
            p.width, p.height,
            x, y, 32, 32,
        )
    }
}
