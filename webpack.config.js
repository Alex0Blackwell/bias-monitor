let glob = require("glob");

let entry = __dirname + "/src/index.js";
let output_path = __dirname + "/dist/";
if (process.env.TESTBUILD) {
  console.debug("Building test environment")
  entry = glob.sync(__dirname + "/src/test/**/*test*.js");
  output_path = __dirname + "/test-dist/";
}

module.exports = {
  entry: {
    main: entry,
    background: './src/background.js',
    scrape: './src/scrape.js',
    not_news_event: './src/not_news_event.js',
  },
  output: {
      path: output_path,
      filename: '[name].js'
  },
};