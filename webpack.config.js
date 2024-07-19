const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// 使用版本号的方式
const useVersion = true;
const { version } = require('./package.json'); // 引入 package.json 中的 version
const root = path.join(__dirname);
const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, useVersion === true ? `dist/${version}` : 'dist');

module.exports = (env) => {
    // 入口点 ()
    const entry = {};

    // 定义分块名称
    const chunkName = 'Hello';
    // 第一个分块
    entry[chunkName] = {
        import: env.production ? src + '/js/index.js' : src + '/index.js',
    };

    /*
    // 第 2 个分块
    const chunk2 = 'chunk2';
    entry[chunk2] = {
        import: env.production ? src + '/js/chunk2.js' : src + '/chunk2.js',
    };
    */

    return {
        /**
         * 构建模式
         * production: 生产环境
         * development： 开发环境
         */
        mode: env.production ? 'production' : 'development',

        /**
         * 入口点 (入口对象)
         * 
         * 用于指定打包的入口文件或入口点，可以自定多个入口 chunk。Webpack 将从这些入口点开始，跟踪依赖图，将
         * 所有依赖的模块打包成一个或多个输出文件。entry 可以是一个字符串、数组或对象，具体形式根据项目的需求而定。
         * 
         * @example
            // 字符串形式 
            entry: './src/index.js' 
            // 数组形式
            entry: ['./src/pageA.js', './src/pageB.js']
            // 对象形式
            entry: {
                main: './src/index.js',
                vendor: './src/vendor.js'
            }
         */
        entry: entry,

        /**
         * 打包文件输出配置
         *
         * 决定打包后资源的存放位置、文件名格式以及其他与输出相关的行为
         */
        output: {
            /**
             * 定义了输出文件的根目录路径。这个路径应该是绝对路径，通常使用 Node.j s的 path 模块来构造，以确保跨平台兼容性。
             */
            path: dist,
            /**
             * 输出文件名
             *
             * 此配置将会为每个入口 chunk 生成一个文件
             *
             * [name]: 入口 chunk 的名字，来自于配置中的入口对象的键名
             * [hash]: 基于整个打包内容的哈希值，每次内容改变哈希值就会变化，适用于长期缓存
             */
            filename: useVersion === true ? '[name].js' : env.production ? '[name]-[hash:8].js' : '[name].bundle.js',
            /**
             * 配置资源文件（如图片、字体等）在浏览器中的访问路径。
             *
             * 开发环境需要将这里设置为 / , 否则 webpack-dev-server 会出现 listing directory / 错误
             */
            publicPath: env.production ? './' : '/',
            /**
             * 是否自动清理输出目录。当设置为 true 时，每次构建前都会清空输出目录。
             */
            clean: true,
            /**
             * 配置项用于定义如何将输出的代码暴露给其他模块系统
             */
            library: {
                /**
                 * 暴露库名
                 *
                 * 定义你的库在全局作用域下的变量名，这样其他脚本可以直接通过这个变量名来访问你的库
                 */
                name: '[name]',
                /**
                 * 指定库的导出方式。可选以下方式：
                 *
                 * 'var': 导出为一个全局变量。在浏览器环境中，你的库将会作为一个全局变量挂载到 window（或其他全局对象）上
                 * 'umd': 通用模块定义，尝试以 AMD、CommonJS 或作为全局变量的方式来导出模块，使得你的库几乎可以在任何环境下工作
                 * 'commonjs' 或 'commonjs2': 专为 CommonJS 模块系统设计，如 Node.js。这使得其他 CommonJS 模块可以通过 require 使用你的库
                 * 'this': 类似于 'var'，但更适合在非浏览器环境中使用，如 Web Workers
                 * 'window': 直接将库挂载到浏览器的 window 对象上，仅适用于浏览器环境
                 * 'amd': 为 AMD 模块加载器（如 RequireJS ）导出模块
                 * 'module': 用于 ES 模块环境，导出为 ES 模块格式
                 */
                type: 'umd',
                /**
                 * 更细粒度地控制如何导出模块
                 *
                 * export default () => {}
                 */
                export: 'default',
            },
            /**
             * 指定在 UMD 模块中使用具名定义
             */
            umdNamedDefine: true,
        },

        /**
         * 用于控制哪些模块应该作为外部依赖处理，而不是被打包进最终的输出文件中。避免将某些库（如React、Vue、jQuery、bootstrap 等）
         * 重复打包进每个依赖它们的 bundle 中特别有用，因为这些库通常会作为项目的依赖预先安装，并且可能已经在全局或通过 CDN 加载。
         * 
         * @example
            // 数组形式
            externals: ['react', 'react-dom']
            // 对象形式
            externals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            }
         */
        externals: {
            jquery: 'jQuery', // jQuery 区分大小写，Q 不能写成小写
            bootstrap: 'bootstrap',
            lodash: {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_',
            },
        },

        /**
         * 用于定义开发服务器（webpack-dev-server）的行为
         */
        devServer: {
            /**
             * 指定开发服务器监听的主机名
             */
            //host: 'localhost',
            /**
             * 指定开发服务器监听的端口号
             */
            port: 8080,
            /**
             * 如果设置为 true，浏览器会在服务器启动后自动打开。
             */
            open: true,
            /**
             * 配置静态资源服务的目录。默认是 public
             */
            static: ['public'],
            /**
             * 启用热模块替换（Hot Module Replacement, HMR），允许在不刷新页面的情况下替换、添加或删除模块。
             */
            hot: true,
        },

        /**
         * 用于定义如何处理项目中不同类型的模块
         */
        module: {
            /**
             * 处理规则
             */
            rules: [
                // 样式处理规则
                {
                    // 正则表达式，匹配 .scss 和 .css 文件
                    test: /\.s?css$/i,
                    use: [
                        /**
                         * 配置表示生产环境将 css 抽出来单独打包，开发环境直接动态地注入 `CSS` 代码到 `DOM` 中
                         */
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        // 构建过程中处理 CSS 文件
                        {
                            loader: 'css-loader',
                            options: {
                                // 相当消耗资源。你真的需要它们？
                                // sourceMap: true,

                                /**
                                 * 当 css-loader 遇到一个 @import 语句时，它会先让紧跟其后的 postcss-loader（即 importLoaders: 1 指定的那个加载器）
                                 * 处理那个被导入的 CSS 文件，然后再继续处理剩余的 CSS 代码。这样，不论是直接写的 CSS 还是通过 @import 引入的CSS，都
                                 * 能得到一致的 PostCSS 处理，比如自动添加浏览器前缀等。
                                 */
                                importLoaders: 1,

                                /**
                                 * 省略该配置，webpack 会自动查找项目根目录下的 postcss.config.js 中的配置
                                 */
                                // postcssOptions:{}
                            },
                        },
                        // 进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等
                        'postcss-loader',
                        // 将 SCSS 转换为CSS
                        'sass-loader',
                    ],
                },
                // 图像 import image from './image.png'
                {
                    // 正则表达式，匹配 .png 、.svg 、.jpg 等图片文件
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    // 表示文件复制到输出目录
                    type: 'asset/resource',
                },
                // 字体 css 文件中声明 @font-face 自动被引入
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                // npm install -D babel-loader @babel/core @babel/preset-env
                // js 文件
                {
                    test: /\.js$/,
                    // 排除不应编译的库
                    exclude: /node_modules/,
                    use: {
                        // 构建过程中使用 Babel 来转换 JavaScript 文件
                        loader: 'babel-loader',
                        options: {
                            // 使用预设的配置将 ES6+ 代码转换为广泛支持的 ES5 代码
                            presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
                        },
                    },
                },

                // 其它类型文件配置
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
            ],
        },

        /**
         * 插件
         */
        plugins: [
            /**
             * Html 处理插件
             */
            new HtmlWebpackPlugin({
                /**
                 * Html 页面标题
                 */
                title: 'Demo 页面',
                /**
                 * 资源将被注入到 HTML 文件中，通常是在 <head> 标签末尾插入 CSS 链接，在 </body> 之前插入 JavaScript 脚本标签
                 */
                inject: 'body',
                /**
                 * Html 压缩配置
                 *
                 * removeComments: true, // 移除 HTML 中的注释
                 * collapseWhitespace: true, // 删除空白符与换行符
                 * minifyCSS: true, // 压缩内联css
                 * minifyJS: true, // 压缩内联 js
                 */
                minify: false,
                /**
                 * 输出到 dist 目录的文件
                 */
                filename: `${dist}/index.html`,
                /**
                 * 指定 Html 模板文件
                 */
                template: `${src}/index.html`,
                /**
                 * 指定 Html 文件要引入的文件分块，即入口点中定义的项
                 */
                chunks: [chunkName],
            }),

            /**
             * 将 CSS 从主应用程序中分离的插件
             */
            new MiniCssExtractPlugin({
                /**
                 * 打包 css 的文件名称
                 */
                filename: useVersion === true ? '[name].css' : env.production ? '[name]-[hash:8].css' : '[name].bundle.css',
            }),

            /**
             * 复制插件
             */
            new CopyPlugin({
                patterns: [
                    // 将 'public' 目录下的 'assets' 文件夹复制到输出目录
                    { from: path.join(__dirname, 'public/assets'), to: 'assets' },
                    // 也可以指定多个文件或文件夹
                    // { from: 'some-file.jpg', to: 'some-destination.jpg' },
                ],
            }),
        ],

        /**
         * 输出包的优化设置
         */
        optimization: {
            /**
             * 控制是否对输出的 JavaScript 代码进行压缩
             */
            minimize: true,
            /**
             * 指定具体使用哪些压缩插件压缩 css 、 js
             */
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
