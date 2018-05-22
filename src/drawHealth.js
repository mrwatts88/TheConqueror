import { getState } from './globalState'

export const drawHealth = p5 => {
    const { players, id } = getState()
    const p = players[id]
    if (p === undefined) return
    p5.fill('black')
    p5.rect(p5.width - 131, 4, 102, 8)
    p5.fill('red')
    p5.rect(p5.width - 130, 5, 100 * p.health / p.maxHealth, 6)
    p5.fill(255)
}
