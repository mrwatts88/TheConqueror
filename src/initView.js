import { getState, setState } from './globalState';
import { BS, WIDTH_UNITS, HEIGHT_UNITS } from './constants';

export const initView = () => {
    let { map, player } = getState();

    let pRow = 0;
    let pCol = 0;
    for (let row = 0; row < map.length; ++row) {
        for (let col = 0; col < map[0].length; ++col) {
            // Draw player at initial position and add to the player array.
            if (map[row][col] === 'p') {
                // Position view so that player is in the center, but constrain to size of map.
                pRow = Math.min(map.length - HEIGHT_UNITS, Math.max(0, Math.floor(row - HEIGHT_UNITS / 2)));
                pCol = Math.min(map[0].length - WIDTH_UNITS, Math.max(0, Math.floor(col - WIDTH_UNITS / 2)));

                player[0] = {
                    inventory: [],
                    xpos: (col - pCol) * BS,
                    ypos: (row - pRow) * BS,
                    width: BS,
                    height: BS,
                    maxHealth: 100,
                    health: 100,
                    color: 'pink',
                    type: 'player',
                    speed: 1,
                    attack: 2,
                    direction: 'down',
                    step: 0
                }

                map[row][col] = '0';
            }
        }
    }

    setState({ startCorner: { row: pRow, col: pCol } });
}
