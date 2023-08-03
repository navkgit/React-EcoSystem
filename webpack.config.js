const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry : './src/index.js',
    mode : 'development',
    

  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, '/dist'),
   filename: 'bundle.js'
 },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   // contentBase
   static : {
    directory : path.join(__dirname, "public/")
   }
  ,
  port: 3000,
  // publicPath
  devMiddleware:{
     publicPath: "https://localhost:3000/dist/",
  },
  // hotOnly
  hot: "only", // hot:true
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       },
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     }
   ]
 },
 plugins: [new webpack.HotModuleReplacementPlugin()],
}