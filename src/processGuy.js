import { pickUp } from './pickup';
import { BS } from './constants';


export const processGuy = (row, col, player, map) => {
    let { xpos, ypos } = player;
    let cornerBlocks = {};
    let r, c;

    let defaultPosition = [
        [{ row: Math.floor(ypos / BS), col: Math.floor(xpos / BS) },
        { row: Math.floor(ypos / BS), col: Math.floor((xpos + BS) / BS) }],
        [{ row: Math.floor((ypos + BS) / BS), col: Math.floor((xpos + BS) / BS) },
        { row: Math.floor((ypos + BS) / BS), col: Math.floor(xpos / BS) }]
    ]

    for (let i = 0; i < 2; ++i) {
        for (let j = 0; j < 2; ++j) {
            if (row == undefined) r = defaultPosition[i][j].row; else r = row;
            if (col == undefined) c = defaultPosition[i][j].col; else c = col;
            let block = map[r][c];
            if (block === 'w') return false;

            if (block === 'i') {
                cornerBlocks[r + ":" + c] = {
                    row: r,
                    col: c,
                    type: block
                }
            }
        }
    }

    for (let key in cornerBlocks) {
        let b = cornerBlocks[key];
        if (b.type === 'i') pickUp(b.row, b.col, player, map);
    }

    return true;
}