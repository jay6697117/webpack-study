// 自带的库
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);
const isPro = process.env.NODE_ENV === 'production';
console.log('path.resolve(__dirname, "src") :>> ', path.resolve(__dirname, 'src'));
// console.log('__dirname: ', __dirname);
// console.log('path.resolve(__dirname, "dist") :', path.resolve(__dirname, 'dist'));
// console.log('path.join(__dirname, "dist") :', path.join(__dirname, 'dist'));
// console.log('path.resolve(__dirname, "./") :>> ', path.resolve(__dirname, './'));

const venderList = ['lodash', 'vue', 'vue-router'];

module.exports = {
  // 之前我们都是使用了单文件入口,entry同时也支持多文件入口，现在我们有两个入口
  // 一个是我们自己的代码，一个是依赖库dependencies的代码
  // entry: './src/main.js', // 入口文件默认的输出文件名为main
  entry: {
    // bundle 和 vendor 都是自己随便取名的，会映射到output.filename [name] 中
    bundle: './src/main.js',
    vender: venderList
  }, // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 必须使用绝对地址，输出文件夹
    publicPath: '/dist/',
    filename: 'js/[name].[chunkhash:8].js' // 打包后输出文件的文件名
  },
  // 如果想修改 webpack-dev-server 配置，在这个对象里面修改
  devServer: {
    open: true,
    port: 8081, // 端口号
    publicPath: '/dist/',
    openPage: 'dist/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json'],
    alias: {
      '@@': path.resolve(__dirname, 'src')
    }
  },
  devtool: isPro ? 'none' : 'cheap-module-eval-source-map', //开发环境下使用,
  module: {
    rules: [
      {
        test: /\.js$/, //js文件才使用 babel
        use: 'babel-loader', //使用哪个loader
        exclude: isPro ? /node_modules/ : /^$/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // 图片格式正则
        use: [
          {
            loader: 'url-loader', //使用哪个loader
            options: {
              limit: 10240, // 限制 图片大小 10KB，小于限制会将图片转换为 base64格式
              name: 'img/[name].[hash:8].[ext]' // dist/images/[图片名].[hash].[图片格式]
            }
          }
        ]
      },
      {
        test: /\.css$/, //css正则
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader' //使用哪个loader
            }
          ]
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // vendor 就是依赖库dependencies的代码
      // manifest文件是将依赖库中每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
      names: ['vendor', 'manifest'],
      // 配合 manifest 文件使用
      minChunks: Infinity
    }),
    // bundle manifest 每次打包都会更改; vendor 是dependencies中的依赖很少会变更，所以可以保留缓存，提高性能
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './'),
      verbose: true,
      dry: false
    }),
    // 我们这里将之前的 HTML 文件当做模板
    // 注意请务必删除之前手动在index.html模版文件引入的 js和css 文件
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // 分离css代码
    new ExtractTextPlugin('css/[name].[hash:8].css'),
    // 压缩提取出的css代码
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 压缩 JS 代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new VueLoaderPlugin()
  ]
};
