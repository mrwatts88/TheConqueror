import { BS, WIDTH_UNITS, HEIGHT_UNITS } from './constants';

export const drawMap = (p5, map, startCorner, player, enemies) => {
    if (p5.height - (player.ypos + BS) < 2 * BS) {
        player.ypos -= BS;
        startCorner.row++;
        enemies.forEach(e => e.ypos -= BS);
        // if (startCorner.row > map.length - 20) startCorner.row = map.length - 20;
    }

    if (player.ypos < 2 * BS) {
        player.ypos += BS;
        startCorner.row--;
        enemies.forEach(e => e.ypos += BS);
        // if (startCorner.row < 0) startCorner.row = 0;
    }

    if (p5.width - (player.xpos + BS) < 2 * BS) {
        player.xpos -= BS;
        startCorner.col++;
        enemies.forEach(e => e.xpos -= BS);
        // if (startCorner.col > map[0].length - 30) startCorner.col = map[0].length - 30;
    }

    if (player.xpos < 2 * BS) {
        player.xpos += BS;
        startCorner.col--;
        enemies.forEach(e => e.xpos += BS);
        // if (startCorner.col < 0) startCorner.col = 0;
    }

    for (let row = startCorner.row; row < startCorner.row + HEIGHT_UNITS; ++row) {
        for (let col = startCorner.col; col < startCorner.col + WIDTH_UNITS; ++col) {
            if (map[row][col] === 'w') {
                p5.fill('green');
                p5.rect((col - startCorner.col) * BS, (row - startCorner.row) * BS, BS, BS);
                p5.fill('white');
            }

            if (map[row][col] === 'i') {
                p5.fill('yellow');
                p5.rect((col - startCorner.col) * BS, (row - startCorner.row) * BS, BS, BS);
                p5.fill('white');
            }
        }
    }
    return startCorner;
}