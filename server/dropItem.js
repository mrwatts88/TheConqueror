const { UNIT_SIZE } = require('./constants')

module.exports = (io, map, entity, item) => {
    // Calculate the row and column in the game grid that
    // the entity (e.g. player) is on
    const row = Math.floor((entity.ypos + 0.5 * UNIT_SIZE) / UNIT_SIZE)
    const col = Math.floor((entity.xpos + 0.5 * UNIT_SIZE) / UNIT_SIZE)

    // Try to drop the item in the squares around the entity
    // If they are all filled already, move outwards until
    // there is an open square to drop something in.
    // TODO: Technically this could be an infinite loop
    // if all the squares were filled, but unlikely
    let canDrop = false
    let distance = 0
    while (!canDrop) {
        canDrop = true
        ++distance
        if (map[row - distance][col] === '0')
            map[row - distance][col] = item.type
        else if (map[row - distance][col + distance] === '0')
            map[row - distance][col + distance] = item.type
        else if (map[row][col + distance] === '0')
            map[row][col + distance] = item.type
        else if (map[row + distance][col + distance] === '0')
            map[row + distance][col + distance] = item.type
        else if (map[row + distance][col] === '0')
            map[row + distance][col] = item.type
        else if (map[row + distance][col - distance] === '0')
            map[row + distance][col - distance] = item.type
        else if (map[row][col - distance] === '0')
            map[row][col - distance] = item.type
        else if (map[row - distance][col - distance] === '0')
            map[row - distance][col - distance] = item.type
        else canDrop = false
    }
}
