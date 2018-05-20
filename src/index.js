import * as p5 from './p5';
import { initSketch } from './sketch';
import { setState } from './globalState';
import { defer } from './utils';
import { initChat } from './chat';
import { initSocketListeners } from './socketListeners';
import { createResizeObserver } from './graphicsHelpers';

const socket = io.connect('http://184.58.143.70:8080');
initSocketListeners(socket);
initChat(socket);
let sketch = initSketch(socket);
let P5 = new p5(sketch, 'grid');
<<<<<<< HEAD
createResizeObserver(P5);
=======
createResizeObserver(P5);
>>>>>>> 95493d824de4c3a274fd6959c1d240fc7ecebdd9
