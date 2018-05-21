import { getState, setState } from './globalState'
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
            action: () => setState({ spriteChoice: i })
        })
    }
}

export const drawCharacterGrobs = (graphicsObjects, p5, images) => {
    for (let i = 0; i < graphicsObjects.chars.length; ++i) {
        const x = (i % 4) * 32 * 3
        const y = Math.floor(i / 4) * 32 * 4
        const char = graphicsObjects.chars[i]
        p5.image(images, char.left(p5), char.top(p5), char.right(p5) - char.left(p5), char.bottom(p5) - char.top(p5), x, y, 32, 32)
    }
}

export const drawBackground = (p5, mapImage) => {
    const { startCorner } = getState()
    p5.image(mapImage, 0, 0, p5.width, p5.height, (1 + startCorner.col) * BS, (1 + startCorner.row) * BS, p5.width, p5.height)
}

export const createResizeObserver = p5 => {
    // Observer to catch canvas resize
    const ro = new ResizeObserver(entries => {
        for (const entry of entries) p5.resizeCanvas(entry.contentRect.width - 10, entry.contentRect.height - 10)
    })

    ro.observe(canvasDiv)
}

export const lazyLoad = (p5, images) => new Promise((res, rej) => {
    p5.loadImage('items.png', img => {
        images.itemImage = img;
        p5.loadImage('monsterSprites.png', img2 => {
            images.enemyImage = img2;
            res();
        })
    })
});
