const getState = require('./globalState').getState
const setState = require('./globalState').setState
const { UNIT_SIZE } = require('./constants')
const dropItem = require('./dropItem')

module.exports = io => {
    const { players, enemies } = getState()
    for (const id in players) {
        const p = players[id]
        for (let j = enemies.length - 1; j >= 0; --j) {
            const e = enemies[j]
            const fxn = a => b => 2 * Math.abs(p[a] - e[a]) < p[b] + e[b]
            const overlaps = fxn('ypos')('height') && fxn('xpos')('width')
            if (p.health === undefined) continue // First instance of the player
            if (p.health > 0 && overlaps) {
                if (--e.health <= 0) {
                    enemies.splice(j, 1)[0]
                    const { maps } = getState()
                    const map = maps[p.mapChoice]
                    const i = e.inventory
                    while (i.length > 0) dropItem(io, map, e, i.pop())
                    io.emit('mapupdate', { maps })
                } else if (--p.health <= 0) console.log('game over.')
            }
        }
    }
}
