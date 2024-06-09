# 前端开发快速启动模板

模板地址：https://gitee.com/xkpro/ke-starter

主要功能就是快速搭建一个前端开发环境

## 核心技术栈

-   `Webpack 5` 作为核心打包工具，Webpack 5 提供了更高效的资源处理能力，支持 Tree Shaking、持久缓存等特性，极大地优化了构建速度和输出文件大小。
    -   `webpack-dev-server` 提供了一个简便的本地开发服务器，支持热模块替换（`HMR`），使得开发过程中无需频繁刷新页面即可看到修改效果。
    -   `webpack-dev-middleware` 可以与 `Express` 等服务器框架集成，为开发环境提供实时编译和响应。
-   `Babel`:

    -   允许你使用最新的 `JavaScript` 语法编写源码，然后将其转换为向后兼容的版本，确保在各种浏览器环境下的兼容性。
    -   `babel-loader` 用于 `Webpack` 中加载并转译 `JavaScript` 文件。

-   CSS 处理:

    -   `css-loader` 与 `style-loader` 或 `mini-css-extract-plugin` 配合使用，处理 CSS 文件并将其注入到页面中或提取到单独的 CSS 文件。
    -   `postcss-loader` 与 `postcss` 和 `postcss-preset-env`，提供对现代 `CSS` 特性的支持，并确保生成的 `CSS` 在旧浏览器中可用。
    -   `css-minimizer-webpack-plugin` 用于压缩 `CSS`，减小文件体积。

-   `html-webpack-plugin` 自动为你的 `webpack` 打包输出生成 `HTML` 文件，并自动注入编译后的资源。

-   `terser-webpack-plugin` 用于压缩 `JavaScript` 代码，提升加载速度。
    `webpack-cli` 是 `Webpack` 的命令行工具，便于从命令行运行 `Webpack`。

-   `express`，轻量级的 `Node.js web` 应用框架，可用于快速搭建 `API` 服务器或静态资源服务器。

## 快速开始

1. 拉取项目到本地

```bash
git clone https://gitee.com/xkpro/ke-starter.git
```

2. 安装依赖

```bash
yarn
```

3. 运行项目 (开发环境)

```bash
npm run start
```

4. 打包分发项目 (生产环境)

```bash
npm run build
```
