const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动创建html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除多余文件

module.exports = {
    devtool: 'cheap-module-eval-source-map', // 用于开发调试，方便清楚是那个文件出错 (共有7种)
    entry: { // entry 是入口文件
        index: './src/index.js'
    },
    output: { // output 是编译后的文件
        filename: 'bundle.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // _dirname 全局变量 代表当前文件所在文件夹的完整路径  path.resolve 返回一个路径 __dirname+'/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
                // 加载时顺序从右向左 
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    // 开启一个虚拟服务器
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), //每次编译都会把dist下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html' //使用一个模板
        })
    ]
};