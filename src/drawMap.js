import { BS } from './constants';

export const drawMap = (p5, map) => {
    for (let row = 0; row < map.length; ++row) {
        for (let col = 0; col < map[0].length; ++col) {
            if (map[row][col] === 'w') {
                p5.fill('red');
                p5.rect(col * BS, row * BS, BS, BS);
                p5.fill('white');
            }

            if (map[row][col] === 'i') {
                p5.fill('green');
                p5.rect(col * BS, row * BS, BS, BS);
                p5.fill('white');
            }
        }
    }
}