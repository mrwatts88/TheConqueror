const processGuy = require('./processGuy')
const getState = require('./globalState').getState
const setState = require('./globalState').setState
const constants = require('./constants')

const { UNIT_SIZE } = constants

module.exports = (id, dir, io) => {
    const { players, map } = getState()
    const p = players[id]

    if (dir.up) {
        p.direction = 'up'
        if (processGuy(Math.floor((p.ypos - p.speed) / UNIT_SIZE), undefined, p, io))
            p.ypos -= p.speed
        advanceStep(p)
    }

    if (dir.down) {
        p.direction = 'down'
        if (
            processGuy(
                Math.floor((p.ypos + p.speed + UNIT_SIZE - 1) / UNIT_SIZE),
                undefined,
                p,
                io
            )
        )
            p.ypos += p.speed
        advanceStep(p)
    }

    if (dir.left) {
        p.direction = 'left'
        if (processGuy(undefined, Math.floor((p.xpos - p.speed) / UNIT_SIZE), p, io))
            p.xpos -= p.speed
        advanceStep(p)
    }

    if (dir.right) {
        p.direction = 'right'
        if (
            processGuy(
                undefined,
                Math.floor((p.xpos + p.speed + UNIT_SIZE - 1) / UNIT_SIZE),
                p,
                io
            )
        )
            p.xpos += p.speed
        advanceStep(p)
    }
}

const advanceStep = p => {
    p.step += 0.3
    if (p.step > 2) p.step = 0
}
