var webpack = require("webpack");

module.exports = {
  entry:{
      'popup/popup' : './app/main/src/pages/popup/popup.js',
      'settings/settings' : './app/main/src/pages/settings/settings.js'
  },
  output: {
      filename: '[name].bundle.js',
      path: __dirname + '/app/main/src/pages/',
      publicPath: "/app/main/src/pages/"    
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,        
        loader: 'babel-loader',
        query: {
            presets: ['es2015', 'react']
        }
    }]
  }
};