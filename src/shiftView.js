import { BS, HEIGHT_UNITS, WIDTH_UNITS } from './constants';

export const shiftView = (player, p5, startCorner, enemies, mapImage, map) => {
    // handle the shifting of the map, so we only draw the visible portion, and shift entities accordingly
    let sC = {};
    sC.row = startCorner.row;
    sC.col = startCorner.col;

    if (player[0].xpos !== undefined) {

        // player going down
        // if (p5.height - (player[0].ypos + BS) < 2 * BS) {
        //     let canMove = map.length - HEIGHT_UNITS - sC.row;
        //     let wantToMove = HEIGHT_UNITS - 5;
        //     let move = Math.min(canMove, wantToMove);
        //     sC.row += move;
        //     // player[0].ypos -= move * BS + 1;
        //     // enemies.forEach(e => e.ypos -= move * BS + 1);
        // }

        // player going up
        if (player[0].ypos < 2 * BS) {
            let canMove = sC.row;
            let wantToMove = HEIGHT_UNITS - 5;
            let move = Math.min(canMove, wantToMove);
            sC.row -= move;
            // player[0].ypos += move * BS - 1;
            // enemies.forEach(e => e.ypos += move * BS - 1);
        }

        // // player going right
        // if (p5.width - (player[0].xpos + BS) < 2 * BS + 160) {
        //     let canMove = map[0].length - WIDTH_UNITS - sC.col + 5;
        //     let wantToMove = WIDTH_UNITS - 10;
        //     let move = Math.min(canMove, wantToMove);
        //     sC.col += move;
        //     // player[0].xpos -= move * BS + 1;
        //     // enemies.forEach(e => e.xpos -= move * BS - 1);
        // }

        // // player going left
        // if (player[0].xpos < 2 * BS) {
        //     let canMove = sC.col;
        //     let wantToMove = WIDTH_UNITS - 10;
        //     let move = Math.min(canMove, wantToMove);
        //     sC.col -= move;
        //     // player[0].xpos += move * BS - 1;
        //     // enemies.forEach(e => e.xpos += move * BS + 1);
        // }
    }

    // p5.image(mapImage, 0, 0, p5.width, p5.height, 32 + sC.col * BS,
    //     32 + sC.row * BS, p5.width, p5.height);

    return sC;
}