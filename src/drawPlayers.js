import { getState, setState } from './globalState';
import { BS } from './constants';

export const drawPlayers = p5 => {
    let { players, images, env, startCorner, next, id } = getState();
    let screensLeft = startCorner.col * BS;
    let screensTop = startCorner.row * BS;

    for (let key in players) {
        let p = players[key];
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

            //TODO: FIX this algorithm to determin how to center the name. 
            if (p.name.length > 6) p5.text(p.name, p.xpos - screensLeft - p5.textWidth(p.name) / 3, p.ypos - screensTop);
            else p5.text(p.name, p.xpos - screensLeft + p5.textWidth(p.name) / 3, p.ypos - screensTop);

            p5.image(
                images,
                p.xpos - screensLeft, p.ypos - screensTop,
                p.width, p.height,
                x, y, 32, 32,
            )
        }
    }
}
