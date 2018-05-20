import { setState } from './globalState';
import { defer } from './utils';

export const initSocketListeners = (socket) => {
    // When the client is first served the page, it will connect to the websocket server
    // The server will then send the map to the client
    // When the map arrives, the sketch will start looping
    let firstMapPromise = defer();
    firstMapPromise.then(data => {
        let { map, enemies, players } = data;
        let id = socket.id;
        let startCorner = players[id].startCorner;
        let next = players[id].next;
        setState({ map, enemies, players, startCorner, next, id });
    })

    socket.on('firstconnect', data => { firstMapPromise.resolve(data); })  // Get map enemies, and players from server
    socket.on('update', newData => { setState({ ...newData }); }) // Get enemies and players from server
    socket.on('mapupdate', map => { setState(map); }) // Get map from server
}
