var path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    background: './src/background.js',
    scrape: './src/scrape.js',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
  },
};