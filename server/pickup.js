const getState = require('./globalState').getState
const { UNIT_SIZE } = require('./constants')

module.exports = (row, col, player, io) => {
    if (player.inventory.length >= 16) return
    const { map } = getState()
    const type = map[row][col]

    map[row][col] = '0'

    // Send updated map to all clients because it has changed
    io.emit('mapupdate', { map })

    player.inventory.push({
        width: UNIT_SIZE,
        height: UNIT_SIZE,
        color: 'yellow',
        type,
    })
}
