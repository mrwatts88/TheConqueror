import { getState } from './globalState'
import { BS, itemMap, GAMESTATE, ENV } from './constants'

export const drawInventory = (p5, itemImage) => {
    const { players, id, env } = getState()
    const inventory = players[id].inventory
    const baseX = p5.width - 150
    const baseY = p5.height / 8

    for (let i = 0; i < inventory.length; ++i) {
        // Find pixel location to draw each item
        const obj = inventory[i]
        const row = Math.floor(i / 4)
        const col = i % 4
        const xPosition = baseX + col * (BS + 5)
        const yPosition = baseY + row * (BS + 5)

        if (env === ENV.DEBUG) {
            p5.fill(obj.color)
            p5.rect(xPosition, yPosition, obj.width, obj.height)
            p5.fill(255)
        } else if (env === ENV.PRODUCTION) {
            // 2D indices of object in sprite sheet
            const x = itemMap[obj.type].x
            const y = itemMap[obj.type].y

            p5.image(
                itemImage, xPosition, yPosition,
                BS, BS, x * BS, y * BS, BS, BS
            )
        }
    }
}
