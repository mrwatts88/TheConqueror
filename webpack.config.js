const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        game: './src/index.js',
        mapCreator: './src/mapCreator.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle.js',
    },
}
