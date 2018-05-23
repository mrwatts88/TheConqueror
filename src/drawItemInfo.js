import { getState, setState } from './globalState';
import { BS, itemMap } from './constants'
import { drawGrob } from './graphicsHelpers'
import { xScale, yScale } from './utils'

export const drawItemInfo = (p5, image) => {
    setState({
        activeGrob:
            {
                left: p5 => xScale(p5) * 300,
                right: p5 => xScale(p5) * (332),
                top: p5 => yScale(p5) * (118 + 2.5 * BS),
                bottom: p5 => yScale(p5) * (150 + 2.5 * BS),
                action: () => {
                    console.log("item")
                }
            }
    })

    const { players, id, activeGrob } = getState()

    const inventory = players[id].inventory

    // for (let i = 0; i < inventory.length; ++i) {
    //     const obj = inventory[i]
    //     // const x = itemMap[obj.type].x
    //     // const y = itemMap[obj.type].y

    //     // if (players[id].inventory[i].type === activeGrob) {
    //     p5.push()
    //     p5.rectMode(p5.CENTER)
    //     p5.fill('rgba(200,200,200, 0.25)')
    //     p5.strokeWeight(0);
    //     p5.rect(p5.width / 2, p5.height / 2, p5.width / 3, p5.height / 3)
    //     p5.pop()

    //     drawGrob(p5, activeGrob, image, 0, 0, BS, BS)
    //     // }
    // }
}


