const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const root = path.join(__dirname);
const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        entry: {
            Hello: {
                import: env.production ? src + '/js/Hello.js' : src + '/index.js',
                // 防止重复引入，配置依赖
                //dependOn: "shared",
            }
        },
        output: {
            filename: env.production ? '[name]-[hash:8].js' : '[name].bundle.js',
            path: dist,
            // 开发环境需要将这里设置为 / , 否则 webpack-dev-server 会出现 listing directory / 错误
            publicPath: env.production ? './' : '/',
            // 生成分发前清理目录
            clean: true,

            // 暴露库名
            library: {
                name: '[name]',
                type: 'umd',
                export: 'default',
            },
            umdNamedDefine: true,
            //globalObject: 'this',
        },
        // 排除以下模块打包进 bundle.js，引用第三方 CDN 资源
        externals: {
            jquery: 'jQuery', // jQuery 区分大小写，Q 不能写成小写。千万注意
            bootstrap: 'bootstrap',
            lodash: {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_',
            },
        },
        devServer: {
            static: dist,
            hot: true,
        },
        module: {
            rules: [
                // 样式 import './style.css'
                {
                    test: /\.s?css$/i,
                    use: [
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // 相当消耗资源。你真的需要它们？
                                // sourceMap: true,
                                importLoaders: 1,
                            },
                        },
                        // 进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等
                        'postcss-loader',
                        /*
                        {
                            loader: "postcss-loader",
                            options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                [
                                    // `postcss-preset-env` 可以根据最新的规范和浏览器支持情况自动将现代 CSS 转换为兼容性更好的 CSS
                                    "postcss-preset-env",
                                    {
                                    // Options
                                    },
                                ],
                                ],
                            },
                            },
                        },
                        */
                        //{ loader: "sass-loader", options: { sourceMap: true } },
                    ],
                },
                // 图像 import image from './image.png'
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                // 字体 css 文件中声明 @font-face 自动被引入
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                /*
                // csv 文件  (csv-loader)
                // import Notes from './data.csv';
                {
                    test: /\.(csv|tsv)$/i,
                    use: ["csv-loader"],
                },
                // xml 文件 (xml-loader)
                // import Data from './data.xml';
                {
                    test: /\.xml$/i,
                    use: ['xml-loader'],
                },
                // json5 (npm i json5 -D)
                {
                    test: /\.json5$/i,
                    type: 'json',
                    parser: {
                    parse: json5.parse,
                    },
                },
                */
                // npm install -D babel-loader @babel/core @babel/preset-env
                // js 文件
                {
                    test: /\.js$/,
                    // 排除不应编译的库
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
                        },
                    },
                },
            ],
        },
        plugins: [
            // Html
            new HtmlWebpackPlugin({
                title: 'Demo 页面',
                inject: 'body',
                /*
                minify: {
                    removeComments: true, // 移除HTML中的注释
                    collapseWhitespace: true, // 删除空白符与换行符
                    minifyCSS: true, // 压缩内联css
                    minifyJS: true, // 压缩内联 js
                },
                */
                minify: false,
                filename: `${dist}/index.html`,
                template: `${src}/index.html`,
                // 只引用 all-[hash].js 文件
                chunks: ['Hello'],
            }),
            // 将 CSS 从主应用程序中分离
            new MiniCssExtractPlugin({
                filename: env.production ? '[name]-[hash:8].css' : '[name].bundle.css',
                //chunkFilename: env.production ? '[id]-[hash:8].css' : '[id].css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            }),

            /*
            new CopyPlugin({
                patterns: [
                    // 将 'public' 目录下的 'assets' 文件夹复制到输出目录
                    { from: path.join(__dirname, 'public/assets'), to: 'assets' },
                    // 也可以指定多个文件或文件夹
                    // { from: 'some-file.jpg', to: 'some-destination.jpg' },
                ],
            }),
            */
        ],
        optimization: {
            minimize: true,
            // 压缩 css 、 js
            minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
            /*
            // 单个 HTML 页面有多个入口时，将 runtime 单独打包
            runtimeChunk: "single",
            // 插件将 shared 公共依赖包分离到单独的 chunk
            splitChunks: {
            chunks: "all",
            },
            */
        },
    };
};
