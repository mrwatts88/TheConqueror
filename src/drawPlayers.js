import { getState } from './globalState'
import { UNIT_SIZE, ENV } from './constants'

export const drawPlayers = (p5, image) => {
    const { players, env, startCorner } = getState()
    const screensLeft = startCorner.col * UNIT_SIZE
    const screensTop = startCorner.row * UNIT_SIZE

    for (const key in players) {
        const p = players[key]
        if (env === ENV.DEBUG) {
            p5.fill(p.color)
            p5.rect(
                p.xpos - screensLeft,
                p.ypos - screensTop,
                p.width,
                p.height
            )
            p5.fill('white')
        } else if (env === ENV.PRODUCTION) {
            // offset for character
            let x = (p.spriteChoice % 4) * 32 * 3
            let y = Math.floor(p.spriteChoice / 4) * 32 * 4

            // location of sprite within chosen character's sprites
            x += 32 * Math.floor(p.step)

            switch (p.direction) {
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

            p5.push()
            p5.fill(p.chatColor)
            p5.rectMode(p5.CENTER)
            p5.textAlign(p5.CENTER, p5.BOTTOM)
            p5.textStyle(p5.BOLD)
            p5.textSize(10)
            p5.text(p.name, p.xpos - screensLeft + UNIT_SIZE / 2, p.ypos - screensTop)
            p5.pop()
            p5.fill('white')

            p5.image(
                image,
                p.xpos - screensLeft,
                p.ypos - screensTop,
                p.width,
                p.height, //how big to draw
                x,
                y,
                32,
                32
            )
        }
    }
}
