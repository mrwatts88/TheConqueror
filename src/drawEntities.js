import { BS, WIDTH_UNITS, HEIGHT_UNITS } from './constants';

export const drawEntities = (p5, map, startCorner, enemies, itemImage) => {
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
                let randomItem = Object.keys(itemMap)[(Object.keys(itemMap).length * Math.random()) << 0];
                map[row][col] = randomItem;
                console.log(randomItem);
            }

            if (map[row][col].charAt(0) === 'i') {
                // p5.fill('yellow');
                // p5.rect((col - startCorner.col) * BS, (row - startCorner.row) * BS, BS, BS);
                // p5.fill('white');

                // location of sprite within sprite sheet (images)
                // let x = Math.floor(Math.random() * 11) * 32;
                // let y = Math.floor(Math.random() * 7) * 32;;
                let x = itemMap[map[row][col]].x;
                let y = itemMap[map[row][col]].y;

                p5.image(
                    itemImage,
                    (col - startCorner.col) * BS,
                    (row - startCorner.row) * BS,
                    BS,
                    BS,
                    x * BS,
                    y * BS,
                    BS,
                    BS,
                )
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

const itemMap = {
    'ia': { x: 0, y: 0 },
    'ib': { x: 1, y: 0 },
    'ic': { x: 2, y: 0 },
    'id': { x: 3, y: 0 },
    'ie': { x: 4, y: 0 },
    'if': { x: 5, y: 0 },
    'ig': { x: 6, y: 0 },
    'ih': { x: 7, y: 0 },
    'ii': { x: 8, y: 0 },
    'ij': { x: 9, y: 0 },
    'ik': { x: 10, y: 0 },
    'il': { x: 11, y: 0 },
    'im': { x: 0, y: 1 },
    'in': { x: 1, y: 1 },
    'io': { x: 2, y: 1 },
    'ip': { x: 3, y: 1 },
    'iq': { x: 4, y: 1 },
    'ir': { x: 5, y: 1 },
    'is': { x: 6, y: 1 },
    'it': { x: 7, y: 1 },
    'iu': { x: 8, y: 1 },
    'iv': { x: 9, y: 1 },
    'iw': { x: 10, y: 1 },
    'ix': { x: 11, y: 1 },
    'iy': { x: 0, y: 2 },
    'iz': { x: 1, y: 2 }
}