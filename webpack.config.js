const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js', // Your main JS file
    signup: './src/signup.js' // Your signup JS file
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,  // This will clean the output directory before each build
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main'] // Include only the main JS chunk
    }),
    new HtmlWebpackPlugin({
      filename: 'signup.html',
      template: './src/signup.html',
      chunks: ['signup'] // Include only the signup JS chunk
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    compress: true,
    port: 8080,
    hot: true,  // Enable hot reloading
    open: true, // Automatically open the browser
  },
};