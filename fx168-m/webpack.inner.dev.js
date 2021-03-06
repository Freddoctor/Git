const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var autoprefixer = require('autoprefixer');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: {
    // vendor:["jquery"],
    plugin: ["./src/forexInner.js"],
  },
  // externals: {
  //   jquery: 'window.jQuery' //src 第三方库
  // },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: '192.168.30.175',
    port: 8080,
    compress: true,
    inline: true,
  },
  plugins: [
    // new CleanWebpackPlugin([process.env.NODE_ENV !== 'production' ? '' : 'dist']),
    new HtmlWebpackPlugin({
      filename: './forex/audnzd.html',
      template: './src/forex/audnzd.html',
      chunks: ['plugin', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './forex/cad.html',
      template: './src/forex/cad.html',
      chunks: ['plugin', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './forex/chf.html',
      template: './src/forex/chf.html',
      chunks: ['plugin', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './forex/eur.html',
      template: './src/forex/eur.html',
      chunks: ['plugin', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './forex/gbp.html',
      template: './src/forex/gbp.html',
      chunks: ['plugin', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './forex/jpy.html',
      template: './src/forex/jpy.html',
      chunks: ['plugin', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './forex/rmb.html',
      template: './src/forex/rmb.html',
      chunks: ['plugin', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './forex/usd.html',
      template: './src/forex/usd.html',
      chunks: ['plugin', 'vendor'],
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash].css",
      chunkFilename: "static/css/[name].[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ScriptExtHtmlWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    publicPath: (process.env.NODE_ENV !== 'production' ? '/' : "./"),
    path: path.resolve(__dirname, 'dist/'),
    filename: 'static/js/[name].[hash].js',
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [process.env.NODE_ENV !== 'production' ?
          'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              autoprefixer: true
            }
          },
          //'postcss-loader'
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      }, {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ?
          'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              autoprefixer: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'sass-loader'
        ]
      }, {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        // use: [{
        //   loader: 'file-loader',
        //   options: {
        //     name: '[name].[hash].[ext]',
        //     publicPath: "../img/",
        //     outputPath: 'images/'
        //   }
        // }]
        use: [{
          loader: "url-loader",
          options: {
            limit: 10 * 1024, //小于10k就会转成base64
            outputPath: 'static/images/'
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: { // 压缩 jpeg 的配置
              progressive: true,
              quality: 60
            },
            optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
              enabled: false,
            },
            pngquant: { // 使用 imagemin-pngquant 压缩 png
              quality: '60',
              speed: 4
            },
            gifsicle: { // 压缩 gif 的配置
              interlaced: false,
            },
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: require.resolve('jquery'), //全局配置暴露接口
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  mode: (process.env.NODE_ENV == 'production' ? 'production' : "development"),
  optimization: {
    minimizer: [ // 用于配置 minimizers 和选项
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          // minChunks:2,
          // minSize:80
        }
      }
    }
  },
}
