<!-- TOC -->

- [webpack](#webpack)
    - [概要](#概要)
    - [文档结构](#文档结构)
    - [概念](#概念)
        - [概念](#概念-1)
        - [模块](#模块)

<!-- /TOC -->

# webpack

## 概要

- [官网](https://webpack.js.org/)
- [中文文档](https://www.webpackjs.com/concepts/)
- [英文文档](https://webpack.js.org/concepts/)

## 文档结构

- 概念
    - 概念
    - 入口起点(Entry Points)
    - 输出(Output)
    - 模式(Mode)
    - loader
    - 插件(Plugins)
    - 配置(Configuration)
    - 模块(Modules)
    - 模块解析(Module Resolution)
    - 依赖图(Dependency Graph)
    - Manifest
    - 构建目标(Targets)
    - 模块热替换(Hot Module Hot Module Replacement)
- 配置 
    - 配置
    - 使用不同语言进行配置(Configuration Languages)
    - 多种配置类型(Configuration Types)
    - 入口和上下文(Entry and Context)
    - 输出(Output)
    - 模块(Module)
    - 解析(Resolve)
    - 插件(Plugins)
    - 开发中 Server(DevServer)
    - Devtool
    - 构建目标(Targets)
    - Watch 和 WatchOptions
    - 外部扩展(Externals)
    - 性能(Performance)
    - Node
    - 统计信息(stats)
    - 其它选项(Other Options)
    - 解析(Resolve)
    - 编辑此页
- API
- 指南
- Loaders
- 插件

## 概念

### 概念

- 概要
    - 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
    - 在开始前你需要先理解四个核心概念：
        - 入口（entry）
        - 输出（output）
        - 加载器（loader）
        - 插件（plugins）
- 入口
    - 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其**内部依赖图的开始**。
    - 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
    - 每个依赖项随即被处理，最后输出到称之为 bundles 的文件中，我们将在下一章节详细讨论这个过程。
    - 可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 `./src`。
- 输出
    - output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `./dist`。
    - 基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。
- 加载器
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
- 插件
    - 

### 模块

- 
