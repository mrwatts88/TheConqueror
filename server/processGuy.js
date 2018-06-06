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
            r = row === undefined ? defaultPosition[i][j].row : row
            c = col === undefined ? defaultPosition[i][j].col : col
            const block = map[r][c]

            if (block === 'w') return false

            // Add any items that the p will be on to an object (no duplicates)
            if (block.charAt(0) === 'i')
                cornerBlocks[r + ':' + c] = { r, c, type: block }

            if (block === 's') {
                if (p.type === 'enemy') return false

                const fxn = x => y => {
                    if (map[r + x][c + y] !== '0') return false
                    map[r + x][c + y] = 's'
                    map[r][c] = '0'
                    io.emit('mapupdate', { map })
                    return true
                }

                const d = p.direction
                return d === 'up' ? fxn(-1)(0) : d === 'down' ? fxn(1)(0) : fxn(0)(d === 'left' ? -1 : 1)
                // prettier-ignore
            }
        }
    }

    // Pick up all items that the p is on
    for (const key in cornerBlocks) {
        const b = cornerBlocks[key]
        if (b.type.charAt(0) === 'i') pickUp(b.r, b.c, p, io)
    }

    return true // Return true if the p can move
}
