import { BS, WIDTH_UNITS, HEIGHT_UNITS } from './constants';

export const drawEntities = (p5, map, startCorner, enemies) => {
    // Draw the visible portion of the map.
    for (let row = startCorner.row; row < startCorner.row + HEIGHT_UNITS; ++row) {
        for (let col = startCorner.col; col < startCorner.col + WIDTH_UNITS - 160 / BS; ++col) {

            // // Draw walls
            // if (map[row][col] === 'w') {
            //     p5.fill('green');
            //     p5.rect((col - startCorner.col) * BS, (row - startCorner.row) * BS, BS, BS);
            //     p5.fill('white');
            // }

            // Draw items
            if (map[row][col] === 'i') {
                p5.fill('yellow');
                p5.rect((col - startCorner.col) * BS, (row - startCorner.row) * BS, BS, BS);
                p5.fill('white');
            }

            // Draw initial monsters and add them to the enemies array
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
        }
    }
}
