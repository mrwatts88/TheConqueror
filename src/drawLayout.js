import { getState } from './globalState'
import { drawGrob } from './graphicsHelpers'

const drawSidebar = p5 => {
    p5.push()
    p5.fill('rgba(200,200,200, 0.25)')
    p5.strokeWeight(0)
    p5.rect(p5.width - 160, 0, 160, p5.height)
    p5.pop()
}

const drawBorder = p5 => {
    p5.push()
    p5.noFill()
    p5.rect(0, 0, p5.width - 1, p5.height - 1)
    p5.pop()
}

export const drawLayout = (p5, buttonsImage) => {
    drawSidebar(p5)
    drawBorder(p5)

    const opts = {
        image: buttonsImage,
        grob: getState().playGrobs.mainMenuBtn,
        width: 135,
        height: 45,
        spriteX: 255,
        spriteY: 70,
        spriteWidth: 175,
        spriteHeight: 75
    }

    drawGrob(p5, opts)
}
