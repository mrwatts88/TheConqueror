// TODO: put this in some type of storage for god's sake
// Maybe redis, I don't know
let state = {
    players: {},
    enemies: [],
    maps: { '0': [], '1': [] },
    startCorner: undefined, // the top left corner square in the grid in the user's field of view. TODO: Why is this part of the global state, I don't know (will try to figure it out)
    next: undefined, // TODO: no clue right now (4/10/2020)
}

exports.getState = () => state

exports.setState = newState => {
    state = { ...state, ...newState }
}
