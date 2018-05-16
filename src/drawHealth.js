import { getState, setState } from './globalState';

export const drawHealth = p5 => {
    let { player } = getState();
    let p = player[0];
    if (p.health === undefined) return;
    p5.fill('black');
    p5.rect(p5.width - 131, 4, 102, 8);
    p5.fill('red');
    p5.rect(p5.width - 130, 5, 100 * p.health / p.maxHealth, 6);
    p5.fill(255);
}