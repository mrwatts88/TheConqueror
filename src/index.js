import * as p5 from './p5';
import { getTheMap } from './map'
import { drawMap } from './drawMap';
import { drawInventory } from './drawInventory';
import { drawGuy } from './drawGuy';
import { updateGuy } from './updateGuy';
import { BS } from './constants';

let player = {};
let map = [];

const sketch = p5 => {
    p5.setup = () => {
        p5.createCanvas(BS * 30, BS * 20);
        map = getTheMap();
        p5.strokeWeight(0);

        player = {
            inventory: [],
            xpos: p5.width / 2,
            ypos: p5.height / 2,
            width: BS,
            height: BS,
            color: 'white'
        }
    }

    p5.draw = () => {
        p5.background(0);
        drawMap(p5, map);
        updateGuy(p5, player, map);
        drawGuy(p5, player);
        drawInventory(p5, player.inventory);
    }
}

const P5 = new p5(sketch);
