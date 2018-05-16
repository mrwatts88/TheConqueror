import { getState, setState } from './globalState';

export const drawEnemies = p5 => {
    let { enemies, enemyImages, env } = getState();
    enemies.forEach(ob => {
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
                ob.xpos, ob.ypos,
                ob.width, ob.height,
                x, y, 32, 32,
            )
        }
    })
}
