var path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    background: './src/background.js',
    scrape: './src/scrape.js',
    not_news_event: './src/not_news_event.js',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
  },
};