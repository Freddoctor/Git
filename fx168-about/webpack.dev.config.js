const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var autoprefixer = require('autoprefixer');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    jQuery: "./src/js/jquery-3.1.1.min.js",
    plugin: ["./src/index.js", "./src/js/public.js"]
  },
  //["./src/js/jquery-3.1.1.min.js", "./src/index.js", "./src/js/public.js"],
  externals: {
    jquery: 'window.jQuery'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
    port: 8080,
    compress: true,
    inline: true,
  },
  plugins: [
    new CleanWebpackPlugin([process.env.NODE_ENV !== 'production' ? '' : 'dist']),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: './index.html',
      template: './src/index.html',
      minify: {
        removeComments: true,
        // collapseWhitespace:true
      }
    }),
    // new HtmlWebpackPlugin({
    //   title: 'night',
    //   filename: './night.html',
    //   template: './src/night.html',
    // }),
    // new CopyWebpackPlugin([{
    //   from: path.resolve(__dirname, './src'),
    //   to: path.resolve(__dirname, './dist'),
    //   ignore: ['*.js', '*.css', '*.html']
    // }]),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash].css",
      chunkFilename: "static/css/[name].[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
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
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: require.resolve('./src/js/jquery-3.1.1.min.js'),
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
    splitChunks: {
      minSize: 30000, // chunk只有超过这个大小才会被分割
      chunks: 'async',
      maxAsyncRequests: 5, // 按需加载最大的并行数
      maxInitialRequests: 3, // 初始加载最大的并行数
      cacheGroups: {
        commons: {
          // test: /[\\/]node_modules[\\/]/,
          test: /[\\/]src[\\/]js[\\/]/,
          chunks: 'initial',
          name: 'commons',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 30000
        },
        vendor: { // 抽离第三插件
          test: /src\\\/js\\\//,
          chunks: 'initial',
          name: 'vendor',
          priority: 10
        }
      }
    },
    minimizer: [ // 用于配置 minimizers 和选项
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
