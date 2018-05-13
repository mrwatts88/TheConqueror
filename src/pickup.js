import { BS } from './constants';

export const pickUp = (row, col, player, map) => {
    if (player.inventory.length >= 16) return;
    map[row][col] = '0';
    player.inventory.push({
        width: BS,
        height: BS,
        color: 'yellow'
    });
}
