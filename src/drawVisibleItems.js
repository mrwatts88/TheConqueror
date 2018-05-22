import { getState } from './globalState'
import { BS, itemMap, ENV } from './constants'

// Draw the items that are in the field of view,
// and add andy monsters that show up in the view
export const drawVisibleItems = (p5, image) => {
    const { map, env, startCorner } = getState()

    // Due to scrolling, startCorner.row and col can be non-integers
    // Resolving floating-point rounding issues
    const scr = Math.floor(Math.abs(startCorner.row))
    const scc = Math.floor(Math.abs(startCorner.col))
    for (let row = scr; row < scr + p5.height / BS; ++row) {
        if (row > map.length - 1) continue
        for (let col = scc; col < scc - 1 + p5.width / BS - 160 / BS; ++col) {
            if (col > map[0].length - 1) continue
            if (env === ENV.DEBUG) {
                // Draw walls
                if (map[row][col] === 'w') {
                    p5.fill('green')
                    p5.rect(
                        (col - startCorner.col) * BS,
                        (row - startCorner.row) * BS,
                        BS,
                        BS
                    )
                    p5.fill('white')
                }
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
                        (col - startCorner.col) * BS,
                        (row - startCorner.row) * BS,
                        BS,
                        BS
                    )
                    p5.fill('white')
                } else if (env === ENV.PRODUCTION) {
                    // location of sprite within sprite sheet (images)
                    const x = itemMap[map[row][col]].x
                    const y = itemMap[map[row][col]].y

                    p5.image(
                        image,
                        (col - startCorner.col) * BS,
                        (row - startCorner.row) * BS,
                        BS,
                        BS,
                        x * BS,
                        y * BS,
                        BS,
                        BS
                    )
                }
            }
        }
    }
}
