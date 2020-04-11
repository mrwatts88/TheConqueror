import { getState } from './globalState'
import { UNIT_SIZE, itemMap, ENV } from './constants'

// Draw the items that are in the field of view,
// and add andy monsters that show up in the view
export const drawVisibleItems = (p5, image) => {
    const { map, env, startCorner } = getState()

    // Due to scrolling, startCorner.row and col can be non-integers
    // Resolving floating-point rounding issues
    const scr = Math.floor(Math.abs(startCorner.row))
    const scc = Math.floor(Math.abs(startCorner.col))
    for (let row = scr; row < scr + p5.height / UNIT_SIZE; ++row) {
        if (row > map.length - 1) continue
        for (let col = scc; col < scc - 1 + p5.width / UNIT_SIZE - 160 / UNIT_SIZE; ++col) {
            if (col > map[0].length - 1) continue
            if (env === ENV.DEBUG) {
                // Draw walls
                if (map[row][col] === 'w') {
                    p5.fill('green')
                    p5.rect(
                        (col - startCorner.col) * UNIT_SIZE,
                        (row - startCorner.row) * UNIT_SIZE,
                        UNIT_SIZE,
                        UNIT_SIZE
                    )
                    p5.fill('white')
                }
            }

            if (map[row][col] === 's') {
                p5.fill('green')
                p5.rect(
                    (col - startCorner.col) * UNIT_SIZE,
                    (row - startCorner.row) * UNIT_SIZE,
                    UNIT_SIZE,
                    UNIT_SIZE
                )
                p5.fill('white')
            }

            // Draw items
            if (map[row][col] === 'i') {
                const randomItem = Object.keys(itemMap)[
                    (Object.keys(itemMap).length * Math.random()) << 0
                ]
                map[row][col] = randomItem
            }

            if (map[row][col].charAt(0) === 'i') {
                if (env === ENV.DEBUG) {
                    p5.fill('yellow')
                    p5.rect(
                        (col - startCorner.col) * UNIT_SIZE,
                        (row - startCorner.row) * UNIT_SIZE,
                        UNIT_SIZE,
                        UNIT_SIZE
                    )
                    p5.fill('white')
                } else if (env === ENV.PRODUCTION) {
                    // location of sprite within sprite sheet (images)
                    const x = itemMap[map[row][col]].x
                    const y = itemMap[map[row][col]].y

                    p5.image(
                        image,
                        (col - startCorner.col) * UNIT_SIZE,
                        (row - startCorner.row) * UNIT_SIZE,
                        UNIT_SIZE,
                        UNIT_SIZE,
                        x * UNIT_SIZE,
                        y * UNIT_SIZE,
                        UNIT_SIZE,
                        UNIT_SIZE
                    )
                }
            }
        }
    }
}
