import { getState, setState } from './globalState'
import { BS } from './constants'
import { xScale, yScale } from './utils'

const canvasDiv = document.querySelector('#grid')

export const createCharacterGrobs = startMenuGrobs => {
    for (let i = 0; i < 7; ++i) {
        startMenuGrobs['char' + i] = {
            left: p5 => xScale(p5) * (2 + i) * BS,
            right: p5 => xScale(p5) * (3 + i) * BS,
            top: p5 => yScale(p5) * 5 * BS,
            bottom: p5 => yScale(p5) * 6 * BS,
            action: () => setState({ spriteChoice: i }),
        }
    }
}

export const drawCharacterGrobs = (p5, images) => {
    let { startMenuGrobs } = getState()
    let i = 0
    for (let key in startMenuGrobs) {
        if (key.substring(0, 4) != 'char') continue
        const x = (i % 4) * 32 * 3
        const y = Math.floor(i / 4) * 32 * 4
        const char = startMenuGrobs[key]
        drawGrob(p5, char, images, x, y, 1, 1)
        ++i
    }
}

export const drawBackground = (p5, mapImage) => {
    const { startCorner } = getState()
    p5.image(
        mapImage,
        0,
        0,
        p5.width,
        p5.height,
        (1 + startCorner.col) * BS,
        (1 + startCorner.row) * BS,
        p5.width,
        p5.height
    )
}

export const createResizeObserver = p5 => {
    // Observer to catch canvas resize
    const ro = new ResizeObserver(entries => {
        for (const entry of entries)
            p5.resizeCanvas(
                entry.contentRect.width - 10,
                entry.contentRect.height - 10
            )
    })

    ro.observe(canvasDiv)
}

export const lazyLoad = (p5, images) =>
    new Promise(res => {
        p5.loadImage('items.png', img => {
            images.itemImage = img
            p5.loadImage('monsterSprites.png', img2 => {
                images.enemyImage = img2
                p5.loadImage('buttons.png', img3 => {
                    images.buttonsImage = img3
                    res()
                })
            })
        })
    })

export const drawGrob = (p5, grob, image, x, y, xScale, yScale) => {
    p5.image(
        image,
        grob.left(p5),
        grob.top(p5),
        grob.right(p5) - grob.left(p5),
        grob.bottom(p5) - grob.top(p5),
        x,
        y,
        xScale * (grob.right(p5) - grob.left(p5)),
        yScale * (grob.bottom(p5) - grob.top(p5))
    )
}

export const drawNameText = (p5, nameBox, name) => {
    const { left, top } = nameBox
    p5.text(name, left(p5), top(p5))
    if (p5.frameCount % 60 < 30)
        p5.text('|', left(p5) + p5.textWidth(name), top(p5) - 2)
}
