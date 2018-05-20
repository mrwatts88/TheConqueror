import { getState } from './globalState'
import { BS } from './constants'
import { xScale, yScale } from './utils'

const canvasDiv = document.querySelector('#grid')

export const createCharacterGrobs = (graphicsObjects) => {
    for (let i = 0; i < 7; ++i) {
        graphicsObjects.chars.push({
            left: p5 => xScale(p5) * (2 + i) * BS,
            right: p5 => xScale(p5) * (3 + i) * BS,
            top: p5 => yScale(p5) * 5 * BS,
            bottom: p5 => yScale(p5) * 6 * BS,
            action: (id, socket) => socket.emit('chooseplayer', { id, spriteChoice: i })
        })
    }
}

export const drawCharacterGrobs = (graphicsObjects, p5, images) => {
    for (let i = 0; i < graphicsObjects.chars.length; ++i) {
        let x = (i % 4) * 32 * 3
        let y = Math.floor(i / 4) * 32 * 4
        let char = graphicsObjects.chars[i]
        p5.image(images, char.left(p5), char.top(p5), char.right(p5) - char.left(p5), char.bottom(p5) - char.top(p5), x, y, 32, 32)
    }
}

export const drawBackground = p5 => {
    let { mapImage, startCorner } = getState()
    p5.image(mapImage, 0, 0, p5.width, p5.height, (1 + startCorner.col) * BS, (1 + startCorner.row) * BS, p5.width, p5.height)
}

export const createResizeObserver = p5 => {
    // Observer to catch canvas resize
    const ro = new ResizeObserver(entries => {
        for (let entry of entries) p5.resizeCanvas(entry.contentRect.width, entry.contentRect.height)
    })

    ro.observe(canvasDiv)
}