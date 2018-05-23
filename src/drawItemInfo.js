import { setState } from './globalState'
import { BS } from './constants'
import { xScale, yScale } from './utils'

export const drawItemInfo = () => {
    setState({
        activeGrob: {
            left: p5 => xScale(p5) * 300,
            right: p5 => xScale(p5) * 332,
            top: p5 => yScale(p5) * (118 + 2.5 * BS),
            bottom: p5 => yScale(p5) * (150 + 2.5 * BS),
            action: () => {
                // console.log('item')
            }
        }
    })
}
