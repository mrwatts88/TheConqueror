import { getState, setState } from './globalState';
import { BS, HEIGHT_UNITS, WIDTH_UNITS } from './constants';

// handle the shifting of the map, so we only draw the visible portion, and shift entities accordingly
export const shiftView = p5 => {
    let { players, map, startCorner, id } = getState();
    let sC = {};
    sC.row = startCorner.row;
    sC.col = startCorner.col;

    if (players[id].xpos !== undefined) {
        let screensLeft = startCorner.col * BS;
        let screensTop = startCorner.row * BS;

        //player going down
        if (p5.height - ((players[id].ypos - screensTop) + BS) < 2 * BS) {
            let canMove = map.length - HEIGHT_UNITS - sC.row;
            let wantToMove = HEIGHT_UNITS - 5;
            let move = Math.min(canMove, wantToMove);
            sC.row += move;
        }

        // player going up
        if ((players[id].ypos - screensTop) < 2 * BS) {
            let canMove = sC.row;
            let wantToMove = HEIGHT_UNITS - 5;
            let move = Math.min(canMove, wantToMove);
            sC.row -= move;
        }

        // player going right
        if (p5.width - ((players[id].xpos - screensLeft) + BS) < 2 * BS + 160) {
            let canMove = map[0].length - WIDTH_UNITS - sC.col + 5;
            let wantToMove = WIDTH_UNITS - 10;
            let move = Math.min(canMove, wantToMove);
            sC.col += move;
        }

        // player going left
        if ((players[id].xpos - screensLeft) < 2 * BS) {
            let canMove = sC.col;
            let wantToMove = WIDTH_UNITS - 10;
            let move = Math.min(canMove, wantToMove);
            sC.col -= move;
        }
    }

    setState({ next: { ...sC } });
}
