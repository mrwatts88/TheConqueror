import { getState, setState } from './globalState';
import { BS, itemMap } from './constants';

// Draw the items that are in the field of view,
// and add any monsters that show up in the view
export const drawVisibleItems = (p5, width, height) => {
    let { map, players, enemies, itemImage, env, startCorner, next } = getState();

    // Due to scrolling, startCorner.row and col can be non-integers
    // Resolving floating-point rounding issues
    let scr = Math.floor(Math.abs(startCorner.row));
    let scc = Math.floor(Math.abs(startCorner.col));
    // console.log(map.length);

    for (let row = scr; row < scr + (height / BS); ++row) {
        if (row > map.length - 1) continue;
        for (let col = scc; col < scc - 1 + (width / BS) - 160 / BS; ++col) {
            if (col > map[0].length - 1) continue;
            if (env === 'DEBUG') {
                // Draw walls
                if (map[row][col] === 'w') {
                    p5.fill('green');
                    p5.rect((col - startCorner.col) * BS, (row - startCorner.row) * BS, BS, BS);
                    p5.fill('white');
                }
            }
            // Draw items
            if (map[row][col] === 'i') {
                let randomItem = Object.keys(itemMap)[(Object.keys(itemMap).length * Math.random()) << 0];
                map[row][col] = randomItem;
            }

            if (map[row][col].charAt(0) === 'i') {
                if (env === 'DEBUG') {
                    p5.fill('yellow');
                    p5.rect((col - startCorner.col) * BS, (row - startCorner.row) * BS, BS, BS);
                    p5.fill('white');
                } else if (env === 'PRODUCTION') {
                    // location of sprite within sprite sheet (images)
                    let x = itemMap[map[row][col]].x;
                    let y = itemMap[map[row][col]].y;

                    p5.image(itemImage,
                        (col - startCorner.col) * BS,
                        (row - startCorner.row) * BS,
                        BS, BS, x * BS, y * BS, BS, BS
                    )
                }
            }
        }
    }
}
