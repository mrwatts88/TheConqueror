import * as p5 from './p5.js';

let playerState = {};

const sketch = p5 => {
    window.p5 = p5;
    p5.setup = () => {
        p5.createCanvas(600, 400);
        p5.rectMode(p5.CENTER);

        playerState = {
            xpos: p5.width / 2,
            ypos: p5.height / 2
        }
    }

    p5.draw = () => {
        p5.background(0);
        updateGuy();
        drawGuy();
    }

    const updateGuy = (keyCode) => {
        if (p5.keyIsDown(p5.UP_ARROW)) playerState.ypos -= 5;
        if (p5.keyIsDown(p5.DOWN_ARROW)) playerState.ypos += 5;
        if (p5.keyIsDown(p5.LEFT_ARROW)) playerState.xpos -= 5;
        if (p5.keyIsDown(p5.RIGHT_ARROW)) playerState.xpos += 5;
    }

    const drawGuy = () => {
        p5.rect(playerState.xpos, playerState.ypos, 20, 20);
    }
}

const P5 = new p5(sketch);  
