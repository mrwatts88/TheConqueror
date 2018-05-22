const processGuy = require('./processGuy')
const getState = require('./globalState').getState
const setState = require('./globalState').setState
const constants = require('./constants')

const { BS } = constants

module.exports = io => {
    const { enemies, map } = getState()

    if (Math.random() < 0.97) {
        for (const enemy of enemies) goPrevDirection(enemy, map, io)
        return
    }

    for (const enemy of enemies) {
        const dir = Math.random()
        if (dir < 0.2) goUp(enemy, map, io)
        else if (dir < 0.4) goDown(enemy, map, io)
        else if (dir < 0.6) goLeft(enemy, map, io)
        else if (dir < 0.8) goRight(enemy, map, io)
        else enemy.prevDirection = 'stay'
    }
}

const goUp = (enemy, map, io) => {
    if (
        processGuy(
            Math.floor((enemy.ypos - enemy.speed) / BS),
            undefined,
            enemy,
            io
        )
    ) {
        enemy.ypos -= enemy.speed
        enemy.prevDirection = 'up'
    }
    advanceStep(enemy)
}

const goDown = (enemy, map, io) => {
    if (
        processGuy(
            Math.floor((enemy.ypos + enemy.speed + BS - 1) / BS),
            undefined,
            enemy,
            io
        )
    ) {
        enemy.ypos += enemy.speed
        enemy.prevDirection = 'down'
    }
    advanceStep(enemy)
}

const goLeft = (enemy, map, io) => {
    if (
        processGuy(
            undefined,
            Math.floor((enemy.xpos - enemy.speed) / BS),
            enemy,
            io
        )
    ) {
        enemy.xpos -= enemy.speed
        enemy.prevDirection = 'left'
    }
    advanceStep(enemy)
}

const goRight = (enemy, map, io) => {
    if (
        processGuy(
            undefined,
            Math.floor((enemy.xpos + enemy.speed + BS - 1) / BS),
            enemy,
            io
        )
    ) {
        enemy.xpos += enemy.speed
        enemy.prevDirection = 'right'
    }
    advanceStep(enemy)
}

const goPrevDirection = (enemy, map, io) => {
    switch (enemy.prevDirection) {
        case 'stay':
            break
        case 'up':
            goUp(enemy, map, io)
            break
        case 'down':
            goDown(enemy, map, io)
            break
        case 'left':
            goLeft(enemy, map, io)
            break
        case 'right':
            goRight(enemy, map, io)
            break
        default:
            goRight(enemy, map, io)
            break
    }
}

const advanceStep = enemy => {
    enemy.step += 0.3
    if (enemy.step > 3) enemy.step = 0
}
