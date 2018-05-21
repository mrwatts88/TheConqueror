import * as p5 from './p5'
import { initSketch } from './sketch'
import { initChat } from './chat'
import { initSocketListeners } from './socketListeners'
import { createResizeObserver } from './graphicsHelpers'
import { initState, setState } from './globalState'

const socket = io.connect('http://66.190.34.45:8080') // eslint-disable-line no-undef

initState(socket)

socket.on('connect', () => {
    setState({ id: socket.id })
})

initSocketListeners(socket)
initChat(socket)
const sketch = initSketch(socket)
const P5 = new p5(sketch, 'grid')
createResizeObserver(P5)

