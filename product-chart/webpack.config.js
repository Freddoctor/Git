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
    service_details: ["./src/service_details.js"],
  },
  // externals: {
  //   jquery: 'window.jQuery' //src 第三方库
  // },
  plugins: [
    // new CleanWebpackPlugin([process.env.NODE_ENV !== 'production' ? '' : 'dist']),
    new HtmlWebpackPlugin({
      filename: './service_details.html',
      template: './src/service_details.html',
      chunks: ['service_details', 'vendor'],
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
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
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        // test: require.resolve('./src/js/jquery-3.1.1.min.js'),
        test: require.resolve('jquery'),
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
        sourceMap: false, // set to true if you want JS source maps
        // exclude: [/\home\.js/],
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: false, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        }
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
        }
      }
    }
  },
}
