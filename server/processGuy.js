const pickUp = require('./pickup')
const constants = require('./constants')
const getState = require('./globalState').getState
const setState = require('./globalState').setState
const { BS } = constants

// Determine what type of blocks the player will be on after moving
module.exports = (row, col, p, io) => {
    const { xpos, ypos } = p
    if (xpos == undefined) return
    const { map } = getState()
    const cornerBlocks = {}
    let r, c

    const defaultPosition = [
        [
            { row: Math.floor(ypos / BS), col: Math.floor(xpos / BS) },
            {
                row: Math.floor(ypos / BS),
                col: Math.floor((xpos + BS - 1) / BS),
            },
        ],
        [
            {
                row: Math.floor((ypos + BS - 1) / BS),
                col: Math.floor((xpos + BS - 1) / BS),
            },
            {
                row: Math.floor((ypos + BS - 1) / BS),
                col: Math.floor(xpos / BS),
            },
        ],
    ]

    for (let i = 0; i < 2; ++i) {
        for (let j = 0; j < 2; ++j) {
            if (row === undefined) r = defaultPosition[i][j].row
            else r = row
            if (col === undefined) c = defaultPosition[i][j].col
            else c = col
            const block = map[r][c]

            // Don't move if the p would be on a wall
            if (block === 'w') return false

            // Add any items that the p will be on to an object (no duplicates)
            if (block.charAt(0) === 'i') {
                cornerBlocks[r + ':' + c] = {
                    row: r,
                    col: c,
                    type: block,
                }
            }
        }
    }

    // Pick up all items that the p is on
    for (const key in cornerBlocks) {
        const b = cornerBlocks[key]
        if (b.type.charAt(0) === 'i') pickUp(b.row, b.col, p, io)
    }

    return true // Return true if the p can move
}
