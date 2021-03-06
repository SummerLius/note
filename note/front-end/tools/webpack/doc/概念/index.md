
<!-- TOC -->

- [概念](#概念)
    - [概念](#概念-1)
    - [入口](#入口)
    - [输出](#输出)
    - [模块](#模块)
    - [模式](#模式)

<!-- /TOC -->
# 概念

## 概念

- 概要
    - 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
    - 在开始前你需要先理解四个核心概念：
        - 入口（entry）
        - 输出（output）
        - 加载器（loader）
        - 插件（plugins）
- 入口（entry）
    - 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其**内部依赖图的开始**。
    - 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
    - 每个依赖项随即被处理，最后输出到称之为 bundles 的文件中，我们将在下一章节详细讨论这个过程。
    - 可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 `./src`。
- 输出（output）
    - output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `./dist`。
    - 基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。
- 加载器（loader）
    - loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
    - loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
    - 本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。
        - > 注意：loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。
    - 在更高层面，在 webpack 的配置中 loader 有两个目标：
        1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
        2. use 属性，表示进行转换时，应该使用哪个 loader。
            ```js
            const path = require('path');

            const config = {
              output: {
                filename: 'my-first-webpack.bundle.js'
              },
              module: {
                rules: [
                  { test: /\.txt$/, use: 'raw-loader' }
                ]
              }
            };
            
            module.exports = config;
            ```
    - 以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器(compiler) 如下信息：
        - > “嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。”
    - > 重要的是要记得，在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules。然而，在定义错误时 webpack 会给出严重的警告。为了使你受益于此，如果没有按照正确方式去做，webpack 会“给出严重的警告”
    - > loader 还有更多我们尚未提到的具体配置属性。
- 插件（plugins）
    - 加载器（loader）被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务；
    - 插件的范围包括，从打包优化和压缩，一直到重定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务；
    - 想要使用一个插件，你只需要`require()`它，然后把它添加到`plugins`数组中。多数插件可以通过选项options自定义。你也可以在一个配置文件中因为不同的目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的一个实例；
        ```js
        const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
        const webpack = require('webpack'); // 用于访问内置插件
        
        const config = {
          module: {
            rules: [
              { test: /\.txt$/, use: 'raw-loader' }
            ]
          },
          plugins: [
            new HtmlWebpackPlugin({template: './src/index.html'})
          ]
        };
        
        module.exports = config;
        ```
    - webpack提供了许多开箱可用的插件！查阅官网的[插件列表](https://www.webpackjs.com/plugins/)获取更多信息。
- 模式
    - 通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的webpack内置的优化。
        ```js
        module.exports = {
          mode: 'production'
        };
        ```

## 入口

- 简要
    - 单个入口语法
        - `entry: string|Array<string>`
    - 对象语法
        - `entry: {[entryChunkName: string]: string|Array<string>}`
    - 常见场景
        - 分离应用程序和第三方库入口
        - 多页面应用程序

## 输出

- 概要
    - 配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。
    - 注意，即使可以存在多个入口起点，但可以只指定一个输出配置。
- 用法
- 多个入口起点
- 高级进阶

## 模块

- 概要
    - 在模块化编程中，开发者将程序分解为离散功能块，并称之为模块；
    - Nodejs从最开始就支持模块化编程。然而，在web，模块化的支持正缓慢到来。
    - 在web存在多种支持JavaScript模块化的工具，这些工具各有优势和限制。
    - webpack基于从这些系统获得经验教训，并将模块的概念应用于项目中的任何文件。
- 什么是webpack模块
    - 对比nodejs模块，webpack模块能够以各种方式表达它们的依赖关系，几个例子如下
        - es2015 import 语句
        - CommonJS require() 语句
        - AMD define 和 require 语句
        - css/sass/less 文件中的 @import 语句
        - 样式中 `url(...)` 或HTML文件 `<img src=...>` 中的图片链接
    - 注意：webpack1需要特定的loader来转换es2015 import，然后webpack2可以开箱即用
- 支持的模块类型
    - webpack通过loader可以支持各种语言和预处理器编写的模块。
    - loader 描述了 webpack 如何处理非JavaScript模块，并且在bundle中引入这些依赖，webpack社区已经为各种流行语言和语言处理器构建了loader，包括：
        - CoffeeScript
        - TypeScript
        - ESNext（Babel）
        - Sass
        - Less
        - Stylus
    - 相关完整列表，请参考[loader列表](https://www.webpackjs.com/loaders)或[自己编写](https://www.webpackjs.com/api/loaders)

## 模式

- 概要
    - 提供 mode 配置选项，告知webpack使用相应模式的内置优化
- 用法
    - 在配置或命令行中提供 mode 选项
        ```js
        module.exports = {
          mode: 'production'
        };
        ```
        ```sh
        webpack --mode=production
        ```
- 值
    - development
        - 会将 process.env.NODE_ENV 的值设为 development。
        - 启用 NamedChunksPlugin 和 NamedModulesPlugin。
    - production
        - 会将 process.env.NODE_ENV 的值设为 production。
        - 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    - none
    - > 记住，只设置 NODE_ENV，则不会自动设置 mode。