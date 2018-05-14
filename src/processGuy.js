import { pickUp } from './pickup';
import { BS } from './constants';

// Determine what type of blocks the player will be on after moving
export const processGuy = (row, col, player, map, startCorner) => {
    if (player.xpos == undefined) return;

    let { xpos, ypos } = player;
    let cornerBlocks = {};
    let r, c;

    let defaultPosition = [
        [{ row: Math.floor(ypos / BS) + startCorner.row, col: Math.floor(xpos / BS) + startCorner.col },
        { row: Math.floor(ypos / BS) + startCorner.row, col: Math.floor((xpos + BS - 1) / BS) + startCorner.col }],
        [{ row: Math.floor((ypos + BS - 1) / BS) + startCorner.row, col: Math.floor((xpos + BS - 1) / BS) + startCorner.col },
        { row: Math.floor((ypos + BS - 1) / BS) + startCorner.row, col: Math.floor(xpos / BS) + startCorner.col }]
    ];

    for (let i = 0; i < 2; ++i) {
        for (let j = 0; j < 2; ++j) {
            if (row == undefined) r = defaultPosition[i][j].row; else r = row;
            if (col == undefined) c = defaultPosition[i][j].col; else c = col;
            let block = map[r][c];

            // Don't move if the player would be on a wall
            if (block === 'w') return false;

            // Add any items that the player will be on to an object (no duplicates)
            if (block.charAt(0) === 'i') {
                cornerBlocks[r + ":" + c] = {
                    row: r,
                    col: c,
                    type: block
                }
            }
        }
    }

    // Pick up all items that the player is on
    for (let key in cornerBlocks) {
        let b = cornerBlocks[key];
        if (b.type.charAt(0) === 'i') pickUp(b.row, b.col, player, map);
    }

    return true; // Return true if the player can move
}
