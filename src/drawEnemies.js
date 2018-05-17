import { getState, setState } from './globalState';
import { BS } from './constants';

export const drawEnemies = p5 => {
    let { enemies, enemyImages, env, startCorner } = getState();
    for (let ob of enemies) {
        let screensLeft = startCorner.col * BS;
        let screensTop = startCorner.row * BS;
        let screensRight = screensLeft + p5.width;
        let screensBottom = screensTop + p5.height;

        if (ob.xpos + BS <= screensLeft) continue;
        if (ob.xpos > screensRight) continue;
        if (ob.ypos + BS <= screensTop) continue;
        if (ob.ypos > screensBottom) continue;

        if (env === 'DEBUG') {
            p5.fill(ob.color);
            p5.rect(ob.xpos, ob.ypos, ob.width, ob.height);
            p5.fill(255);
        } else if (env === 'PRODUCTION') {
            // location of sprite within sprite sheet (images)
            let x = 6 * 32 + 32 * (Math.floor(ob.step));
            let y = 4 * 32;

            switch (ob.prevDirection) {
                case 'down': break;
                case 'left': y += 32; break;
                case 'right': y += 64; break;
                case 'up': y += 96; break;
            }

            // draw sprite to canvas
            p5.image(
                enemyImages,
                ob.xpos - screensLeft, ob.ypos - screensTop,
                ob.width, ob.height,
                x, y, 32, 32,
            )
        }
    }
}
