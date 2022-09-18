const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const entries = require('./entries');
/**
 *
 需借助 babel-plugin-import 
 import {Button} from "ReactUI";
 转化成 const Button =require ("ReactUI/${libraryName}/Button") 
 require ("ReactUI/${libraryName}/${styleLibrary.name}/Button.css") 
  [
      "component",
      {
        "libraryName": "components",
        "styleLibrary": {
          "name": "lib-style", // same with styleLibraryName
          "base": false  // if theme package has a base.css
        }
      }
    ]

 */

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  entry: entries,
  mode: 'production',
  resolve: {
    extensions: ['.tsx', 'ts', '.js', '.json'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      return chunkData.chunk?.name === 'index'
        ? '[name].js'
        : 'components/[name]/index.js';
    },
    clean: true,
    library: 'ReactUI',
    libraryExport: 'default',
    libraryTarget: 'umd',
    // library: {
    //   type: '',
    // },
  },
  //   experiments: {
  //     outputModule: true,
  //   },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              context: __dirname,
              configFile: 'tsconfig.build.json',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: path.resolve(__dirname, './src/styles/variables.less'),
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,

      minSize: 1,

      maxInitialRequests: 1,
      cacheGroups: {
        css: {
          test: /\.css$/,
          name: 'css',
          maxInitialSize: 1,
          maxSize: 1,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './components/css/[name].css',
    }),
  ],
};
module.exports = config;
