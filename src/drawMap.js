import { BS, WIDTH_UNITS, HEIGHT_UNITS } from './constants';

export const drawMap = (p5, map, startCorner, player, enemies) => {
    if (player[0].xpos !== undefined) {
        if (p5.height - (player[0].ypos + BS) < 2 * BS) {
            player[0].ypos -= BS;
            startCorner.row++;
            enemies.forEach(e => e.ypos -= BS);
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

    for (let row = startCorner.row; row < startCorner.row + HEIGHT_UNITS; ++row) {
        for (let col = startCorner.col; col < startCorner.col + WIDTH_UNITS - 160 / BS; ++col) {
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

            if (map[row][col] === 'm') {
                enemies.push({
                    inventory: [],
                    xpos: (col - startCorner.col) * BS,
                    ypos: (row - startCorner.row) * BS,
                    width: BS,
                    height: BS,
                    maxHealth: 25,
                    health: 25,
                    color: 'purple',
                    type: 'enemy',
                    speed: 1,
                    attack: 1,
                    prevDirection: 'left',
                    step: 0
                })

                map[row][col] = '0';
            }

            if (map[row][col] === 'p') {
                player[0] = {
                    inventory: [],
                    xpos: (col - startCorner.col) * BS,
                    ypos: (row - startCorner.row) * BS,
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

    return startCorner;
}