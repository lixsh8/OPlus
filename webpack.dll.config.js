var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    vendor: ['vue/dist/vue.esm.js', 'axios', 'vue-router']
  },
  output: {
    path: path.join(__dirname, './static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};