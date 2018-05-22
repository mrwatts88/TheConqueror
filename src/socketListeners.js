import { setState } from './globalState'
import { GAMESTATE } from './constants'

export const initSocketListeners = socket => {
    // Get map enemies, and players from server
    socket.on('initialdata', data => {
        const { map, enemies, players } = data
        const id = socket.id
        const startCorner = players[id].startCorner
        const next = players[id].next
        setState({
            map,
            enemies,
            players,
            startCorner,
            next,
            id,
            gameState: GAMESTATE.LOADING,
        })
    })
    socket.on('update', newData => {
        setState({ ...newData })
    }) // Get enemies and players from server
    socket.on('mapupdate', map => {
        setState(map)
    }) // Get map from server
}
