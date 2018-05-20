import { getState, setState } from './globalState';
import { BS } from './constants';

export const drawEnemies = p5 => {
    let { enemies, enemyImages, env, startCorner, next } = getState();
    let screensLeft = startCorner.col * BS;
    let screensTop = startCorner.row * BS;
    let screensRight = screensLeft + p5.width;
    let screensBottom = screensTop + p5.height;

    for (let enemy of enemies) {
        if (enemy.xpos + BS <= screensLeft) continue;
        if (enemy.xpos > screensRight) continue;
        if (enemy.ypos + BS <= screensTop) continue;
        if (enemy.ypos > screensBottom) continue;

        if (env === 'DEBUG') {
            p5.fill(enemy.color);
            p5.rect(enemy.xpos - screensLeft, enemy.ypos - screensTop, enemy.width, enemy.height);
            p5.fill(255);
        } else if (env === 'PRODUCTION') {
            // offset for character
            let x = (enemy.spriteChoice % 4) * 32 * 3;
            let y = Math.floor(enemy.spriteChoice / 4) * 32 * 4;

            // location of sprite within chosen character's sprites
            x += 32 * (Math.floor(enemy.step));

            switch (enemy.prevDirection) {
                case 'down': break;
                case 'left': y += 32; break;
                case 'right': y += 64; break;
                case 'up': y += 96; break;
            }

            // draw sprite to canvas
            p5.image(
                enemyImages,
                enemy.xpos - screensLeft, enemy.ypos - screensTop,
                enemy.width, enemy.height,
                x, y, 32, 32,
            )
        }
    }
}
