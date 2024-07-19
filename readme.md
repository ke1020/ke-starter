# Webpack 快速启动模板

该项目是一个 `Webpack` 快速启动模板是一种预先配置的解决方案，旨在加速开发流程。它为 `JavaScript` 应用及 `Web` 资源提供模块化打包，使之适应浏览器环境。借助这样的模板，开发者能够立即投身项目核心功能的构建，无需从零配置构建工具链。

## 快速开始

> 使用启动模板之前，请确保已安装 `Node.js` 和 `Yarn` 包管理工具 。

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
yarn start
```

完成上述步骤后，项目就已经启动并运行在本地开发环境中，可以开始愉快地编码和调试了。

## 打包

打包分发项目 (生产环境)

```bash
yarn build
```

## 项目依赖

-   `webpack`：是一个流行的前端资源模块打包器，它主要用于 `JavaScript` 应用程序，但也可以转换、打包其他类型的文件如 CSS、图片等。

-   `webpack-cli`：是一个命令行接口，它是与 `Webpack` 一起使用的工具，允许开发者通过命令行来运行 `Webpack` 的构建、服务启动等任务，简化了配置和执行过程。

-   `webpack-dev-server`：是一个小型的开发服务器，它不仅提供了实时重新加载的功能，还能够简化静态资源的托管，让开发者可以快速预览项目。

-   `@babel/core`： 是一个 `JavaScript` 转译器的核心模块，它是 `Babel` 的一部分。`Babel` 是一个广泛使用的工具，它允许你使用最新的 `ECMAScript` 特性编写代码，并将其转换为当前浏览器或环境支持的 `JavaScript` 版本，从而实现向后兼容。

    > **提示**
    >
    > `@babel/core` 主要负责解析（`parsing`）、转换（`transformation`）和生成（`code generation`）`JavaScript` 代码。它不直接包含任何具体的转换规则（称为 “插件” ），而是提供了一个运行时环境来加载这些插件并对代码应用它们。

-   `@babel/preset-env`： 这是一个预设（ `preset` ），包含了将 ES6+代码转换为广泛支持的 ES5 代码所需的一系列插件。

-   `babel-loader`： 是一个用于 `Webpack` 的加载器（`loader`），它允许你在 `Webpack` 构建过程中使用 `Babel` 来转换 `JavaScript` 文件。`Webpack` 是一个流行的模块打包器，它能够处理各种模块和资源，把它们打包成一个或多个优化过的 `bundles`，以便于在浏览器或其他环境中运行。

    > **提示**
    >
    > `babel-loader` 的工作原理是，当 `Webpack` 遇到导入的 `JavaScript` 文件时，它会使用 `babel-loader` 加载该文件，然后 `@babel/core` 会根据你的 `Babel` 配置（包括预设和插件）来转译这些文件。这样，你就可以在项目中自由地使用最新的 `JavaScript` 特性，而不用担心浏览器兼容性问题，因为 `babel-loader` 会确保输出的代码能够在目标环境中运行。

-   `copy-webpack-plugin`：是一个 `Webpack` 插件，它的主要功能是在构建过程中复制文件或整个目录到构建目录（通常是 `dist` 目录）中。这对于处理静态资源，如图片、字体文件、`HTML` 模板或其他不需要经过 `Webpack` 模块转换的文件非常有用。

-   `css-loader`： 是一个 `webpack` 加载器，它主要用于在 `webpack` 构建过程中处理 `CSS` 文件。这个加载器使得 `webpack` 能够理解 `import` 或 `require` 语句中导入的 `CSS` 文件，并将其作为模块来处理。这意味着你可以像导入 `JavaScript` 模块一样导入 `CSS` 文件，并且可以利用 `webpack` 的模块化能力，如代码拆分、热模块替换等。

-   `css-minimizer-webpack-plugin`： 是一个 `webpack` 插件，用于在 `webpack` 构建流程的优化阶段（`optimization phase`）压缩 `CSS` 文件。这个插件通过利用诸如 `cssnano` 之类的 `CSS` 压缩工具来减少 `CSS` 文件的大小，从而提升网页加载速度和整体性能。

-   `html-webpack-plugin`：是一个常用的 `Webpack`插件，它简化了在 `webpack` 构建过程中对 `HTML` 文件的处理。这个插件主要做了以下几件事情：

    > **提示**
    >
    > -   自动注入资产：当你在 `JavaScript` 文件中通过 `import` 或 `require` 引入 `CSS`、图像或其他静态资源时，`html-webpack-plugin` 会自动将这些资源的引用添加到生成的 `HTML` 文件中。这意味着你无需手动管理这些资源的链接。
    > -   模板生成：你可以指定一个 `HTML` 模板文件，`html-webpack-plugin` 会基于该模板生成最终的 `HTML` 文件，并在其中插入编译后的 `JS`、`CSS` 等 `bundle` 文件的引用。这对于多页面应用尤其有用，因为你只需要维护模板即可，而不用关心每次构建后如何更新资源引用。
    > -   简化配置：对于 `SPA`（单页应用）来说，它可以帮助你快速设置一个基本的 `HTML` 页面来加载你的应用程序，包括自动设置正确的 `<base>` 标签，确保资源加载路径正确。

-   `mini-css-extract-plugin`： 主要作用是在 `Webpack` 构建过程中将 `CSS` 从 `JavaScript` 模块中抽取出来，生成独立的 `CSS` 文件。这样做有以下几个好处：

    > **提示**
    >
    > -   避免样式阻塞渲染：当 `CSS` 与 `JavaScript` 打包在一起时，浏览器会遇到 `JavaScript` 执行阻塞问题，导致页面空白直到所有 `JavaScript` 执行完毕。通过将 `CSS` 分离到单独的文件，可以实现无阻塞渲染，提高页面加载速度和用户体验。
    > -   更好的缓存策略：独立的 `CSS` 文件可以更好地利用浏览器的缓存机制。当只有 `CSS` 内容改变时，用户不需要重新下载 `JavaScript` 代码，反之亦然。
    > -   便于管理：对于大型项目，将 `CSS` 与 `JavaScript` 分开管理可以使代码结构更清晰，便于开发和维护。

-   `postcss`：是一个强大的 `CSS` 处理器，它使用 `JavaScript` 插件来转换 `CSS` 代码。这意味着你可以自动完成一系列任务，如语法 `sugar` 的编写（例如使用未来的 `CSS` 特性）、浏览器兼容性处理（自动添加浏览器前缀）、代码优化和 `linting` 等。`PostCSS` 不是一个预处理器（像 `Sass` 或 `Less`），而是一个在预处理器之后或直接对 `CSS` 进行操作的工具，提供了高度的灵活性和模块化。

    > **主要特点**
    >
    > -   插件生态系统：`PostCSS` 的核心强大之处在于其丰富的插件生态。有数百个插件可供选择，覆盖了从最基础的自动前缀添加到复杂的布局和设计功能。
    > -   未来 `CSS` 特性：许多 `PostCSS` 插件允许你使用尚未被浏览器广泛支持的 `CSS` 新特性，比如 `CSS Grid` 布局、`Custom Properties`（变量）、`Color Functions` 等，然后自动将其转换为当前大多数浏览器可识别的 `CSS` 代码。
    > -   兼容性处理：自动添加浏览器厂商前缀（例如 `-webkit-` 、`-moz-` 等），确保样式的跨浏览器兼容性。
    > -   代码优化：移除无用的代码、合并重复的规则、压缩 `CSS` 等，帮助减小文件大小，提高加载速度。
    > -   代码质量：通过诸如 `Stylelint` 这样的插件进行代码风格检查和规范，保持代码的一致性和可读性。

-   `postcss-loader`：是一个 `Webpack` 加载器，它允许你在 `Webpack` 构建流程中使用 `PostCSS`。通过这个加载器，你可以应用 `PostCSS` 的各种插件来处理 `CSS` 文件，比如自动添加浏览器前缀、使用未来 `CSS` 特性、进行代码优化等。

-   `postcss-preset-env`：是一个 `PostCSS` 的预设（`preset`），它让你能够使用最新的 `CSS` 特性，同时确保生成的 `CSS` 代码兼容当前和旧版浏览器。这个预设自动包含了你需要的所有转译插件，以支持你所指定的目标浏览器环境。

-   `style-loader`：是一个 `webpack` 加载器（`loader`），它用于在 `JavaScript` 模块中动态地注入 `CSS` 代码到 `DOM` 中。这意味着当你在 `JavaScript` 文件中导入一个 `CSS` 文件时，`style-loader` 会把 `CSS` 作为 `<style>` 标签插入到 `HTML` 文档的 `<head>` 部分，从而使得样式生效。这种方式特别适合开发环境，因为它不需要额外的构建步骤来提取 `CSS` 到单独的文件中，使得样式变更可以即时反映在页面上，便于快速迭代和调试。

-   `sass`：是一种 `CSS` 预处理器，它能够将 `Sass/SCSS` 代码编译成普通的 `CSS` 代码

-   `sass-loader`：是 `Webpack` 中的一个加载器（`loader`），它的作用是让 `Webpack` 能够理解和处理 `.sass` 或 `.scss` 文件。当 `Webpack` 遇到这些类型的文件时，`sass-loader` 会调用 `Sass` 库来把 `Sass/SCSS` 代码转换为 `CSS` 代码。

-   `terser-webpack-plugin`：利用 `Terser` 库来压缩（也称为最小化）`JavaScript` 代码的插件
