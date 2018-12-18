# loaders

- webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。
- 你可以使用 Node.js 来很简单地编写自己的 loader。
- loader 通过在 require() 语句中使用 loadername! 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用 - 查看配置。

## 文件

- raw-loader 加载文件原始内容（utf-8）
- val-loader 将代码作为模块执行，并将 exports 转为 JS 代码
- url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
- file-loader 将文件发送到输出文件夹，并返回（相对）URL

## json
## 转换编译
## 模板
## 样式