const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const port = process.env.PORT || 3000;

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/index.html' }],
    })
  ],
  devServer: {
    'static': {
      directory: './dist'
    },
    port: port,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [
      '.jsx',
      '.js'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};

module.exports = config;