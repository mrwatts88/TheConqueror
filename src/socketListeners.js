import { setState, getState } from './globalState'
import { GAMESTATE } from './constants'

export const initSocketListeners = socket => {
    // Get map enemies, and players from server
    socket.on('initialdata', data => {
        const { id } = getState()
        const { maps, enemies, players } = data
        const startCorner = players[id].startCorner
        const next = players[id].next
        filterPlayersInDiffMaps(players[id].mapChoice, players)
        setState({
            map: maps[players[id].mapChoice],
            enemies: enemies.filter(e => e.mapChoice === players[id].mapChoice),
            players,
            startCorner,
            next,
            gameState: GAMESTATE.LOADING,
        })
    })
    socket.on('update', newData => {
        const { id } = getState()
        filterPlayersInDiffMaps(newData.players[id].mapChoice, newData.players)
        setState({ ...newData, enemies: newData.enemies.filter(e => e.mapChoice === newData.players[id].mapChoice) })
    }) // Get enemies and players from server
    socket.on('mapupdate', ({ maps }) => {
        const { players, id } = getState()
        setState({ map: maps[players[id].mapChoice] })
    }) // Get map from server
}

const filterPlayersInDiffMaps = (mapChoice, players) => {
    for (const key in players) {
        if (players[key].mapChoice !== mapChoice) delete players[key]
    }
}