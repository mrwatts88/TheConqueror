const { BS } = require('./constants')

module.exports = (io, map, entity, item) => {
    const row = Math.floor((entity.ypos + 0.5 * BS) / BS)
    const col = Math.floor((entity.xpos + 0.5 * BS) / BS)

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
