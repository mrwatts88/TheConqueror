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
createResizeObserver(P5);