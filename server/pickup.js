const getState = require('./globalState').getState
const { UNIT_SIZE } = require('./constants')

module.exports = (row, col, player, io) => {
    if (player.inventory.length >= 16) return
    const { maps } = getState()
    const type = maps[player.mapChoice][row][col]

    maps[player.mapChoice][row][col] = '0'

    // Send updated map to all clients because it has changed
    io.emit('mapupdate', { maps })

    player.inventory.push({
        width: UNIT_SIZE,
        height: UNIT_SIZE,
        color: 'yellow',
        type,
    })
}
