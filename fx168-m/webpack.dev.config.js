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
    // _24k99: ["./src/24k99.js"],
    // _99qh: ["./src/99qh.js"],
    // _404: ["./src/404.js"],
    // _bank: ["./src/bank.js"],
    // _bond: ["./src/bond.js"],
    // _calendar: ["./src/calendar.js"],
    // _city: ["./src/city.js"],
    // _forex: ["./src/forex.js"],
    // _hangye: ["./src/hangye.js"],
    // _hk: ["./src/hk.js"],
    // _hq_inner: ["./src/hq_inner.js"],
    _hq_inner2: ["./src/hq_inner2.js"],
    _index: ["./src/index.js"],
    // _london: ["./src/london.js"],
    // _newContent: ["./src/newContent.js"],
    // _news: ["./src/news.js"],
    // _newsInner: ["./src/newsInner.js"],
    // _ny: ["./src/ny.js"],
    // _oil: ["./src/oil.js"],
    // _pinglun: ["./src/pinglun.js"],
    // _politics: ["./src/politics.js"],
    // _quote: ["./src/quote.js"],
    // _rlzbny: ["./src/rlzbny.js"],
    // _sfo: ["./src/sfo.js"],
    // _stock: ["./src/stock.js"],
    // _sudi: ["./src/sudi.js"],
    // _tor: ["./src/tor.js"],
    // _tuisong: ["./src/tuisong.js"],
    // _v: ["./src/v.js"],
    // _van: ["./src/van.js"],
    // _zhuanti: ["./src/zhuanti.js"],
    // handlebars:["./src/handlebars.js"]
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
    // new HtmlWebpackPlugin({
    //   filename: './24k99.html',
    //   template: './src/24k99.html',
    //   chunks: ['_24k99', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './99qh.html',
    //   template: './src/99qh.html',
    //   chunks: ['_99qh', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './404.html',
    //   template: './src/404.html',
    //   chunks: ['_404', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './bank.html',
    //   template: './src/bank.html',
    //   chunks: ['_bank', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './bond.html',
    //   template: './src/bond.html',
    //   chunks: ['_bond', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './calendar.html',
    //   template: './src/calendar.html',
    //   chunks: ['_calendar', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './city.html',
    //   template: './src/city.html',
    //   chunks: ['_city', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './forex.html',
    //   template: './src/forex.html',
    //   chunks: ['_forex', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './hangye.html',
    //   template: './src/hangye.html',
    //   chunks: ['_hangye', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './hk.html',
    //   template: './src/hk.html',
    //   chunks: ['_hk', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './hq_inner.html',
    //   template: './src/hq_inner.html',
    //   chunks: ['_hq_inner', 'vendor'],
    // }),
    new HtmlWebpackPlugin({
      filename: './hq_inner2.html',
      template: './src/hq_inner2.html',
      chunks: ['_hq_inner2', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      chunks: ['_index', 'vendor'],
    }),
    // new HtmlWebpackPlugin({
    //   filename: './london.html',
    //   template: './src/london.html',
    //   chunks: ['_london', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './newContent.html',
    //   template: './src/newContent.html',
    //   chunks: ['_newContent', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './news.html',
    //   template: './src/news.html',
    //   chunks: ['_news', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './newsInner.html',
    //   template: './src/newsInner.html',
    //   chunks: ['_newsInner', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './ny.html',
    //   template: './src/ny.html',
    //   chunks: ['_ny', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './oil.html',
    //   template: './src/oil.html',
    //   chunks: ['_oil', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './pinglun.html',
    //   template: './src/pinglun.html',
    //   chunks: ['_pinglun', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './politics.html',
    //   template: './src/politics.html',
    //   chunks: ['_politics', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './quote.html',
    //   template: './src/quote.html',
    //   chunks: ['_quote', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './rlzbny.html',
    //   template: './src/rlzbny.html',
    //   chunks: ['_rlzbny', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './sfo.html',
    //   template: './src/sfo.html',
    //   chunks: ['_sfo', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './stock.html',
    //   template: './src/stock.html',
    //   chunks: ['_stock', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './sudi.html',
    //   template: './src/sudi.html',
    //   chunks: ['_sudi', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './tor.html',
    //   template: './src/tor.html',
    //   chunks: ['_tor', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './tuisong.html',
    //   template: './src/tuisong.html',
    //   chunks: ['_tuisong', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './v.html',
    //   template: './src/v.html',
    //   chunks: ['_v', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './van.html',
    //   template: './src/van.html',
    //   chunks: ['_van', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './zhuanti.html',
    //   template: './src/zhuanti.html',
    //   chunks: ['_zhuanti', 'vendor'],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: './handlebars.html',
    //   template: './src/handlebars.html',
    //   chunks: ['vendor','handlebars'],
    //   title:"Cut it down!"
    // }),
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
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
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
