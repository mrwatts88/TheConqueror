import { BS } from './constants';

export const drawMap = (p5, map, startCorner, player) => {
    if (p5.height - (player.ypos + BS) < 30) {
        player.ypos -= BS;
        startCorner.row++;
        if (startCorner.row > map.length - 20) startCorner.row = map.length - 20;
    }

    if (player.ypos < 30) {
        player.ypos += BS;
        startCorner.row--;
        if (startCorner.row < 0) startCorner.row = 0;
    }

    if (p5.width - (player.xpos + BS) < 30) {
        player.xpos -= BS;
        startCorner.col++;
        if (startCorner.col > map[0].length - 30) startCorner.col = map[0].length - 30;
    }

    if (player.xpos < 30) {
        player.xpos += BS;
        startCorner.col--;
        if (startCorner.col < 0) startCorner.col = 0;
    }

    for (let row = startCorner.row; row < startCorner.row + 20; ++row) {
        for (let col = startCorner.col; col < startCorner.col + 30; ++col) {
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