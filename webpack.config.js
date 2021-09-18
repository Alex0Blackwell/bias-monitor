var path = require('path');


module.exports = {
  mode: 'development',
  devServer: {
    // maybe something to do with cors...
    // I can't get it working
    // https://stackoverflow.com/questions/46894106/cors-with-react-webpack-and-axios
    headers: { 
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
   }
  }
};
