import { getState, setState } from './globalState';
import { BS } from './constants';

export const updateHealth = () => {
    let { player, enemies, startCorner } = getState();
    let p = player[0];
    if (p.health === undefined) return;

    for (let i = enemies.length - 1; i >= 0; --i) {
        let screensLeft = startCorner.col * BS;
        let screensTop = startCorner.row * BS;
        if (p.health > 0
            && Math.abs(p.ypos - (enemies[i].ypos - screensTop)) < p.height / 2 + enemies[i].height / 2
            && Math.abs(p.xpos - (enemies[i].xpos - screensLeft)) < p.width / 2 + enemies[i].width / 2) {
            --enemies[i].health;
            if (enemies[i].health <= 0) enemies.splice(i, 1);
            else --p.health;
            if (p.health <= 0) console.log('game over.');
        }
    }
}
