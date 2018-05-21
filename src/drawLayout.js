import { getState } from './globalState'

const drawSidebar = p5 => {
    p5.fill('grey')
    p5.rect(p5.width - 160, 0, 160, p5.height)
    p5.fill('white')
}

const drawBorder = p5 => {
    p5.noFill()
    p5.rect(0, 0, p5.width - 1, p5.height - 1)
    p5.fill('white')
}

const drawMenuBtn = (p5, buttonsImage) => {
    const { playGrobs: { mainMenuBtn: { left, right, top, bottom } } } = getState()
    p5.image(
        buttonsImage,
        left(p5),
        top(p5),
        right(p5) - left(p5),
        bottom(p5) - top(p5),
        235, 75,
        1.5 * (right(p5) - left(p5)),
        1.5 * (bottom(p5) - top(p5))
    )

}

export const drawLayout = (p5, buttonsImage) => {
    drawSidebar(p5)
    drawBorder(p5)
    drawMenuBtn(p5, buttonsImage)
}
