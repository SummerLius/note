# loaders



- webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。
- 你可以使用 Node.js 来很简单地编写自己的 loader。
- loader 通过在 require() 语句中使用 `loadername!` 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用 - 查看配置。

## 文件

- raw-loader 加载文件原始内容（utf-8）
- val-loader 将代码作为模块执行，并将 exports 转为 JS 代码
- url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
- file-loader 将文件发送到输出文件夹，并返回（相对）URL

### raw-loader

- 概要
    - 以string形式导入文件
- 条件：
    - Node>=v6.9.0，Webpack v4.0.0
- 安装
    - `npm install raw-loader --save-dev`
- 使用
    1. 配置使用
        ```js
        // 配置文件 webpack.config.js
        module.exports = {
          module: {
            rules: [
              {
                test: /\.txt$/,
                use: 'raw-loader'
              }
            ]
          }
        }

        // 引入txt模块，该fileTxt是String类型变量
        import fileTxt from 'file.txt'
        ```
    2. 内联使用
        ```js
        // 该fileTxt是String类型变量
        import fileTxt from 'raw-loader!./file.txt';
        ```

### file-loader

- 概要
    - 指示webpack将所需对象作为文件打包到输出目录并返回其公共URL
- 条件
    - Node>=v6.9.0，Webpack v3 v4
- 安装
    `npm install file-loader --save-dev`
- 用法
    - 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。
        ```js
        // 配置文件 webpack.config.js
        module.exports = {
          module: {
            rules: [
              {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}
                  }
                ]
              }
            ]
          }
        }

        // 引入文件模块
        import img from './file.png';

        // 生成文件file.png，输出到输出目录并返回public URL
        "/public/path/0dcbbaa7013869e351f.png"
        ```
- 选项
    - name
        - 类型：`{String|Function}`
        - 默认值：`[hash].[ext]`
        - 描述：为你的文件配置自定义文件名模板
    - context
        - 类型：`{String}`
        - 默认值：`this.options.context`
        - 描述：配置自定义文件 context，默认为 webpack.config.js context
    - publicPath
        - 类型：`{String|Function}`
        - 默认值：`__webpack_public_path__`
        - 描述：为你的文件配置自定义 public 发布目录
    - outputPath
        - 类型：`{String|Function}`
        - 默认值：`'undefined'`
        - 描述：为你的文件配置自定义 output 输出目录
    - regExp
        - 类型：``
        - 默认值：``
        - 描述：
    - useRelativePath
        - 类型：`{Boolean}`
        - 默认值：`false`
        - 描述：如果你希望为每个文件生成一个相对 url 的 context 时，应该将其设 true
    - emitFile
        - 类型：`{Boolean}`
        - 默认值：`true`
        - 描述：默认情况下会生成文件，可以通过将此项设置为 false 来禁止（例如，使用了服务端的 packages）
- 占位符
    - `[ext]`
        - 类型：`{String}`
        - 默认值：file extname
        - 描述：资源扩展名
    - `[name]`
        - 类型：`{String}`
        - 默认值：file basename
        - 描述：资源的基本名称
    - `[path]`
        - 类型：`{String}`
        - 默认值：file dirname
        - 描述：资源相对于 context的路径
    - `[hash]`
        - 类型：`{String}`
        - 默认值：md5
        - 描述：内容的哈希值，下面的 哈希（hashes） 配置中有更多信息
    - `[N]`
        - 类型：`{Number}`
        - 默认值：
        - 描述：当前文件名按照查询参数 regExp 匹配后获得到第 N 个匹配结果
- 哈希
    - 概要
        - 上面占位符hash的配置设置：`[<hashType>:hash:<digestType>:<length>]`
    - hashType
        - 类型：`{String}`
        - 默认值：md5
        - 描述：sha1, md5, sha256, sha512
    - digestType
        - 类型：`{String}`
        - 默认值：base64
        - 描述：hex, base26, base32, base36, base49, base52, base58, base62, base64
    - length
        - 类型：`{Number}`
        - 默认值：9999
        - 描述：字符的长度
- 文件url
    1. 如果options指定了`publicPath`，则url组成为：`options.publicPath` + `options.name`
        ```js
        {
            publicPath: 'https://img.xxx.com',
            name: 'img/[name].[hash:7].[ext]'
        }

        // url ==> https://img.xxx.com/img/hhj.0b7316a.png
        ```
    2. 如果options指定了`useRelativePath=true`，则url为: `文件基于context的相对路径` + `options.name`
    3. 如果options指定了`outputPath`，则url为：`options.outputPath` + `options.name`
- 文件存放路径影响因素
    - 总的配置输出目录：webpack.config.output.path 
    - Loader输出目录配置，均在webpack.config.output.path之下：
        - loader.options.outputPath
        - loader.options.name
        - loader.options.context
        - loader.options.useRelativePath

### url-loader

- 概要
    - url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 [data URL](https://tools.ietf.org/html/rfc2397)；
    - 用于将文件转换为base64 URI。
        ```html
        <!-- 例子 -->
         <IMG
            SRC="data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAw
            AAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFz
            ByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSp
            a/TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJl
            ZeGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uis
            F81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PH
            hhx4dbgYKAAA7"
            ALT="Larry">
        ```
- 条件
    - Node最小v6.9.0，Webpack v4
- 安装
    - `npm install url-loader --save-dev`
- 选项
    - **limit**
        - 类型：`{Number}`
        - 默认值：undefined，默认无限制
        - 描述：指定文件的大小限制（以字节为单位）。如果文件大于限制，则默认使用file-loader，并将所有options传递给它。
    - **mimetype**
        - 类型：`{String}`
        - 默认值：extname
        - 描述：指定文件的MIME类型（否则从文件扩展名中推断）
    - **fallback**
        - 类型：`{String}`
        - 默认值：file-loader
        - 描述：当文件大于限制时（以字节为单位）为文件指定备用的loader

## json

## 转换编译

## 模板

### html-loader

- 概要
    - 将html文件模块，引入为string。当指定选项时，还可以将html最小化。
    - 待处理...

## 样式

### css-loader

- 概要
    - css-loader 解释(interpret) `@import` 和 `url()`中的css文件，会 import/require() 后再解析(resolve)它们。
    - 对于其它文件（例如图片，视频，字体等），用其它的loader：file-loader和url-loader。
- 条件
    - Node最小v6.9.0，Webpack v4
- 安装
    - `npm install css-loader --save-dev`
- 

### style-loader