const getState = require('./globalState').getState
const setState = require('./globalState').setState

module.exports = () => {
    const { players, enemies } = getState()

    for (const id in players) {
        const p = players[id]
        for (let i = enemies.length - 1; i >= 0; --i) {
            let yOverlaps =
                Math.abs(p.ypos - enemies[i].ypos) <
                p.height / 2 + enemies[i].height / 2
            let xOverlaps =
                Math.abs(p.xpos - enemies[i].xpos) <
                p.width / 2 + enemies[i].width / 2
            if (p.health === undefined) continue
            if (p.health > 0 && yOverlaps && xOverlaps)
                if (--enemies[i].health <= 0) enemies.splice(i, 1)
                else if (--p.health <= 0) console.log('game over.')
        }
    }
}
