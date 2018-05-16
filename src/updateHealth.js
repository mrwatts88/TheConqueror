import { getState, setState } from './globalState';

export const updateHealth = () => {
    let { player, enemies } = getState();
    let p = player[0];
    if (p.health === undefined) return;

    for (let i = enemies.length - 1; i >= 0; --i)
        if (p.health > 0
            && Math.abs(p.ypos - enemies[i].ypos) < p.height / 2 + enemies[i].height / 2
            && Math.abs(p.xpos - enemies[i].xpos) < p.width / 2 + enemies[i].width / 2) {
            --enemies[i].health;
            if (enemies[i].health <= 0) enemies.splice(i, 1);
            else --p.health;
            if (p.health <= 0) console.log('game over.');
        }
}
