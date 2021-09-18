const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js',
        background: './src/background.js',
        content: './src/content.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
}