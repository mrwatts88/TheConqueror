const getState = require('./globalState').getState;

let BS = 32;

exports.pickUp = (row, col, player, io) => {
    if (player.inventory.length >= 16) return;
    let { map } = getState();
    let type = map[row][col];

    map[row][col] = '0';

    // Send updated map to all clients because it has changed
    io.emit('mapupdate', { map });

    player.inventory.push({
        width: BS,
        height: BS,
        color: 'yellow',
        type
    });
}
