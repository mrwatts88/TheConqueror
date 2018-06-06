import { getState } from './globalState'
import { BS, ENV } from './constants'

export const drawEnemies = (p5, image) => {
    const { enemies, env, startCorner } = getState()
    const screensLeft = startCorner.col * BS
    const screensTop = startCorner.row * BS
    const screensRight = screensLeft + p5.width
    const screensBottom = screensTop + p5.height

    for (const enemy of enemies) {
        if (enemy.xpos + BS <= screensLeft) continue
        if (enemy.xpos > screensRight) continue
        if (enemy.ypos + BS <= screensTop) continue
        if (enemy.ypos > screensBottom) continue

        if (env === ENV.DEBUG) {
            p5.fill(enemy.color)
            p5.rect(
                enemy.xpos - screensLeft,
                enemy.ypos - screensTop,
                enemy.width,
                enemy.height
            )
            p5.fill(255)
        } else if (env === ENV.PRODUCTION) {
            // offset for character
            let x = (enemy.spriteChoice % 4) * 32 * 3
            let y = Math.floor(enemy.spriteChoice / 4) * 32 * 4

            // location of sprite within chosen character's sprites
            x += 32 * Math.floor(enemy.step)

            switch (enemy.direction) {
            case 'down':
                break
            case 'left':
                y += 32
                break
            case 'right':
                y += 64
                break
            case 'up':
                y += 96
                break
            }

            // draw sprite to canvas
            p5.image(
                image,
                enemy.xpos - screensLeft,
                enemy.ypos - screensTop,
                enemy.width,
                enemy.height,
                x,
                y,
                32,
                32
            )
        }
    }
}
