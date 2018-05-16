import { getState, setState } from './globalState';
import { BS } from './constants';

export const pickUp = (row, col, player) => {
    if (player.inventory.length >= 16) return;
    let { map } = getState();
    let type = map[row][col];

    map[row][col] = '0';
    player.inventory.push({
        width: BS,
        height: BS,
        color: 'yellow',
        type
    });
}
