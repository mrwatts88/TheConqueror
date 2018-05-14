import { BS } from './constants';

export const shiftView = (player, p5, startCorner, enemies, mapImage) => {
    // handle the shifting of the map, so we only draw the visible portion, and shift entities accordingly
    if (player[0].xpos !== undefined) {
        if (p5.height - (player[0].ypos + BS) < 2 * BS) {
            player[0].ypos -= BS;
            startCorner.row++;
            enemies.forEach(e => e.ypos -= BS);
            // Not necessary as long as there is a 2 block wall surrounding the outside of the map
            // if (startCorner.row > map.length - 20) startCorner.row = map.length - 20;
        }
        if (player[0].ypos < 2 * BS) {
            player[0].ypos += BS;
            startCorner.row--;
            enemies.forEach(e => e.ypos += BS);
            // if (startCorner.row < 0) startCorner.row = 0;
        }
        if (p5.width - (player[0].xpos + BS) < 2 * BS + 160) {
            player[0].xpos -= BS;
            startCorner.col++;
            enemies.forEach(e => e.xpos -= BS);
            // if (startCorner.col > map[0].length - 30) startCorner.col = map[0].length - 30;
        }
        if (player[0].xpos < 2 * BS) {
            player[0].xpos += BS;
            startCorner.col--;
            enemies.forEach(e => e.xpos += BS);
            // if (startCorner.col < 0) startCorner.col = 0;
        }
    }

    p5.image(mapImage, 0, 0, p5.width, p5.height, 32 + startCorner.col * BS,
        32 + startCorner.row * BS, p5.width, p5.height);

    return startCorner;
}