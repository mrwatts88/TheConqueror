import { getState, setState } from './globalState'
import { UNIT_SIZE } from './constants'
import { xScale, yScale } from './utils'

const canvasDiv = document.querySelector('#grid')

export const createCharacterGrobs = characterImage => {
    let { startMenuGrobs } = getState()
    for (let i = 0; i < 7; ++i) {
        const x = (i % 4) * 32 * 3
        const y = Math.floor(i / 4) * 32 * 4

        startMenuGrobs['char' + i] = {
            left: p5 => xScale(p5) * i * (UNIT_SIZE + 10) + UNIT_SIZE * 2,
            right: p5 => xScale(p5) * i * (UNIT_SIZE + 10) + UNIT_SIZE * 3,
            top: p5 => yScale(p5) * 5 * UNIT_SIZE,
            bottom: p5 => yScale(p5) * 6 * UNIT_SIZE,
            action: () => setState({ spriteChoice: i }),
            image: characterImage,
            spriteX: x,
            spriteY: y,
            spriteWidth: 32,
            spriteHeight: 32,
            selected: () => getState().spriteChoice === i
        }
    }
}

export const createMapGrobs = mapImages => {
    let { startMenuGrobs } = getState()
    for (let i = 0; i < mapImages.length; ++i) {
        startMenuGrobs['map' + i] = {
            left: p5 => xScale(p5) * 450,
            right: p5 => xScale(p5) * 850,
            top: p5 => yScale(p5) * i * (160 + 10) + 125,
            bottom: p5 => yScale(p5) * i * (160 + 10) + 125 + 160,
            action: () => setState({ mapChoice: i }),
            image: mapImages[i],
            spriteX: 200,
            spriteY: 465,
            spriteWidth: 400,
            spriteHeight: 160,
            selected: () => getState().mapChoice === i
        }
    }
}

export const drawGrobs = grobs => {
    for (const grob of Object.values(grobs)) {
        drawGrob_v2(grob)
    }
}

export const drawBackground = (p5, mapImage) => {
    const { startCorner, mapChoice } = getState()
    const offset = mapChoice === 0 ? 1 : 0 // todo: fix this
    p5.image(
        mapImage,
        0,
        0,
        p5.width,
        p5.height,
        (offset + startCorner.col) * UNIT_SIZE,
        (offset + startCorner.row) * UNIT_SIZE,
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

export const drawGrob_v2 = grob => {
    const p5 = window.p5

    const options = {
        grob,
        image: grob.image,
        width: grob.width,
        height: grob.height,
        spriteX: grob.spriteX,
        spriteY: grob.spriteY,
        spriteWidth: grob.spriteWidth,
        spriteHeight: grob.spriteHeight,
        selected: grob.selected
    }

    drawGrob(p5, options)
}

export const drawGrob = (p5, options) => {
    const width =
        options.width !== undefined
            ? options.width
            : options.grob.right(p5) - options.grob.left(p5)
    const height =
        options.height !== undefined
            ? options.height
            : options.grob.bottom(p5) - options.grob.top(p5)

    if (options.image) {
        p5.image(
            options.image,
            options.grob.left(p5),
            options.grob.top(p5),
            width,
            height,
            options.spriteX,
            options.spriteY,
            options.spriteWidth,
            options.spriteHeight
        )
    }

    if (options.selected && options.selected()) {
        p5.noFill()
        p5.rect(options.grob.left(p5) - 5,
            options.grob.top(p5) - 5,
            width + 10,
            height + 10)
        p5.fill(255)
    }
}

export const drawNameText = (p5, nameBox, name) => {
    p5.push()
    p5.fill(0)
    const { left, top } = nameBox
    p5.text(name, left(p5), top(p5))
    if (p5.frameCount % 60 < 30)
        p5.text('|', left(p5) + p5.textWidth(name), top(p5) - 2)
    p5.pop()
}
