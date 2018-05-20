import { setState } from './globalState'
import { defer } from './utils'

export const initSocketListeners = (socket) => {
    // When the client is first served the page, it will connect to the websocket server
    // The server will then send the map to the client
    // When the map arrives, the sketch will start looping
    const firstMapPromise = defer()
    firstMapPromise.then(data => {
        const { map, enemies, players } = data
        const id = socket.id
        const startCorner = players[id].startCorner
        const next = players[id].next
        setState({ map, enemies, players, startCorner, next, id })
    })

    socket.on('firstconnect', data => { firstMapPromise.resolve(data) })  // Get map enemies, and players from server
    socket.on('update', newData => { setState({ ...newData }) }) // Get enemies and players from server
    socket.on('mapupdate', map => { setState(map) }) // Get map from server
}
