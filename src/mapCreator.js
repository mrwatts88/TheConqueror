import * as p5 from './p5';
import { BS } from './constants';
const bs = BS + 4;
const beginBtn = document.querySelector('#begin-btn');
const mapHeight = document.querySelector('#map-height');
const mapWidth = document.querySelector('#map-width');
const w = document.querySelector('#w');
const i = document.querySelector('#i');
const m = document.querySelector('#m');
const p = document.querySelector('#p');
const o = document.querySelector('#o');
const playBtn = document.querySelector('#play-btn');

let height, width, P5, startRow, startCol, endRow, endCol;
let gridArray = [];
let currentBlockType = 'w';

beginBtn.addEventListener('click', e => {
    if (P5 !== undefined) P5.remove();
    P5 = new p5(sketch, 'grid');
})

w.addEventListener('click', e => {
    currentBlockType = 'w';
})

i.addEventListener('click', e => {
    currentBlockType = 'i';
})

m.addEventListener('click', e => {
    currentBlockType = 'm';
})

p.addEventListener('click', e => {
    currentBlockType = 'p';
})

o.addEventListener('click', e => {
    currentBlockType = '0';
})

playBtn.addEventListener('click', e => {
    playGame();
})

const playGame = () => {
    localStorage.setItem("map", JSON.stringify(gridArray));
    window.location.href = 'index.html';
}


// TODO: stop looping, only need to update the canvas after a click
const sketch = p5 => {
    p5.setup = () => {
        height = mapHeight.value;
        width = mapWidth.value;
        const can = p5.createCanvas(bs * width + 1, bs * height + 1);
        can.mousePressed(() => {
            startRow = Math.floor(p5.mouseY / bs);
            startCol = Math.floor(p5.mouseX / bs);
        })

        can.mouseReleased(() => {
            endRow = Math.floor(p5.mouseY / bs);
            endCol = Math.floor(p5.mouseX / bs);
            for (let j = Math.min(startRow, endRow); j <= Math.max(startRow, endRow); ++j)
                for (let i = Math.min(startCol, endCol); i <= Math.max(startCol, endCol); ++i)
                    gridArray[j][i] = currentBlockType;
        })

        for (let j = 0; j < height; ++j) {
            let oneRow = [];
            for (let i = 0; i < width; ++i) {
                if (i === 0 || i === 1 || i === width - 1 || i === width - 2
                    || j === 0 || j === 1 || j === height - 1 || j === height - 2)
                    oneRow[i] = 'w';
                else oneRow[i] = '0';
            }

            gridArray[j] = oneRow.slice();
        }
    }

    p5.draw = () => {
        for (let j = 0; j < height; ++j) {
            for (let i = 0; i < width; ++i) {
                if (gridArray[j][i] === 'w') p5.fill('green');
                if (gridArray[j][i] === 'i') p5.fill('yellow');
                if (gridArray[j][i] === 'm') p5.fill('purple');
                if (gridArray[j][i] === 'p') p5.fill('pink');
                if (gridArray[j][i] === '0') p5.fill('white');
                p5.rect(i * bs, j * bs, bs, bs);
                p5.fill('white');
            }
        }
    }
}
