const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// import postcssPresetEnv from 'postcss-preset-env';


module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /index\.html$/, //without this HtmlWebPackPlugin will not work with template file correctly
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              importLoaders: 1,
              sourceMap: true
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
        })
      },
      {
        test:  /\.(eot|woff|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'  
          }
        }
      },
      {
        test:  /\.(jpg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'img/'  
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Title',
      template: "./src/html/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin('style.css')
  ]
};