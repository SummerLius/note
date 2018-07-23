# 简易流程


**详情可以参考官方指南**：[指南](https://www.webpackjs.com/guides/)

1. 初始化目录:
    - 创建目录
    - 初始化npm
    - 本地安装 webpack 和 webpack-cli （此工具用于在命令行中运行 webpack）
        ```sh
        mkdir webpack-demo && cd webpack-demo
        npm init -y
        npm install webpack webpack-cli --save-dev
        ```
    - 此时目录
        ```
        |--node-modules/
        |--package-lock.json
        |--package.json
        ```
2. 创建一些基本的目录、文件：
    ```sh
    |--node-modules/
    |--dist/ 
        |--index.html（此时该文件我们自己准备，并在里面应用 bundle.js 文件）
        |--bundle.js （webpack生成） 
    |--src/
        |--index.js （源文件）
    |--webpack.config.js/
    |--package-lock.json
    |--package.json
    ```
3. 资源管理
    - 建议src资源目录管理，以组件模块方式管理
    ```sh
    - |- /assets
    + |– /components
    + |  |– /my-component
    + |  |  |– index.jsx
    + |  |  |– index.css
    + |  |  |– icon.svg
    + |  |  |– img.png
        ```
    
## 链接
    
- https://blog.csdn.net/qq_27626333/article/details/77937181
    ```js
        const path = require('path')
    // 生成一个HTML5文件
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    // 清理文件夹
    const CleanWebpackPlugin = require('clean-webpack-plugin')
    // 将内容束展示为方便交互的直观树状图
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    // 引入webpack
    const webpack = require('webpack')
    // 高性能的webpack uglify plugin
    const FastUglifyJsPlugin = require('fast-uglifyjs-plugin')
    /* 处理路径
       path.join([path1][, path2][, ...]) 
          用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是/，Windows系统是\。
       path.resolve([from ...], to) 
          将 to 参数解析为绝对路径。
     */
    function resolve (dir) {
      return path.join(__dirname, dir)
    }
    
    module.exports = {
      /*每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。
        如果传入一个字符串或字符串数组，chunk 会被命名为 main。
        如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。 
      */
      entry: {
        app: path.resolve(__dirname, 'src', 'index.js'), // 使用path.resolve解析为绝对路径
        another: resolve('src/another-module.js') // 使用path.join连接路径
      },
    
      /* 指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内   容」。
       */
      output: {
        /*filename:此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 output.chunkFilename 
        选项来控制输出。
          [hash]    模块标识符(module identifier)的 hash
          [chunkhash]   chunk 内容的 hash
          [name]    模块名称
          [id]  模块标识符(module identifier)
        */
        filename: '[name].[hash].js',
        /* 在编写一个导出值的 JavaScript library 时，可以使用下面的 library 和 libraryTarget，
           导出值可以作为其他代码的依赖。 
        */
        library: "MyLibrary",
        /* 配置如何暴露 library
           "var" - （默认值）当 library 加载完成，入口起点的返回值将分配给一个变量
           "this" - 当 library 加载完成，入口起点的返回值将分配给 this
           "window" - 当 library 加载完成，入口起点的返回值将分配给 window 对象。
           "global" - 当 library 加载完成，入口起点的返回值将分配给 global 对象。
           "commonjs" - 当 library 加载完成，入口起点的返回值将分配给 exports 对象。
           "commonjs2" - 当 library 加载完成，入口起点的返回值将分配给 exports 对象
           "amd" - webpack 将你的 library 转为 AMD 模块
           libraryTarget: "umd" - 这是一种可以将你的 library 能够在所有的模块定义下都可运行的方式
                          （并且导出的完全不是模块）。
         */
        libraryTarget: "var",
        /* 目录对应一个绝对路径
         */
        path: resolve('dist'),
        /* 散列摘要的前缀长度，默认为 20
         */
        hashDigestLength: 24,
        /* 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项默认值是 false
         */
        pathinfo: true,
        /* 按需加载chunk的输出文件
         */
        chunkFilename:'js/[name].js',
        /* 按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）
        publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
        publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
        publicPath: "/assets/", // 相对于服务(server-relative)
        publicPath: "assets/", // 相对于 HTML 页面
        publicPath: "../assets/", // 相对于 HTML 页面 
        */
        publicPath: "", // 相对于 HTML 页面（目录相同）
      },
    
      /* externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法
      */
      externals: {
        'lodash': {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
      },
    
      /* 开发工具(Devtool)此选项控制是否生成，以及如何生成 source map 
      */
      devtool: 'inline-source-map', // inline-source-map - SourceMap 转换为 DataUrl 后添加到 bundle 中。
    
      /* 如果你通过 Node.js API 来使用 dev-server， devServer 中的选项将被忽略。
         将选项作为第二个参数传入： new WebpackDevServer(compiler, {...}) 
      */
      devServer: {
        contentBase: resolve("dist"), // 在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文   件。
        hot: true, // 启用 webpack 的模块热替换特性
        compress: true, // 一切服务都启用gzip 压缩
        // color: true, // 启用/禁用控制台上的颜色
        // host: '0.0.0.0', // 默认是 localhost
        port: 9000 // 指定要监听请求的端口号
        // openPage: '/different/page' //指定打开浏览器时要导航的页面
        // overlay: true //当有编译器错误或警告时，在浏览器中显示全屏覆盖。默认禁用。如果您只想显示编译器错误：
      },
    
      /* 解析(Resolve):这些选项能设置模块如何被解析 
      */
      resolve: {
        /* 告诉 webpack 解析模块时应该搜索的目录。下面配置src目录优先于 node_modules搜索
        */
        modules: [
          resolve('src'),
          resolve('node_modules')
        ],
        /* 创建 import 或 require 的别名，来确保模块引入变得更简单。
         */
        alias: {
            jquery: "jquery/src/jquery",
            Utilities: resolve('src/utilities/'),
            Templates: resolve('src/templates/'),
            xyz$: resolve('path/to/file.js'), // 在给定对象的键后的末尾添加 $，以表示精准匹配
        },
        /* 自动解析确定的扩展。默认值为：extensions: [".js", ".json"] 
        */
        extensions: ['.js', '.vue', '.json']
      },
    
      /* module选项决定了如何处理项目中的不同类型的模块
       */
      module: {
        /* rules创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。
         */
        rules: [
          /* 加载 js
           */
          {
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory=true',
            include: [resolve('src'), resolve('test')],
            exclude: /node_modules/ // 不能满足的条件（排除不处理的目录）
          },
          /* 加载 CSS
           */
          {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader'],
            include: resolve('src'),
            exclude: /node_modules/ // 不能满足的条件（排除不处理的目录）
          },
          /* 加载 sass 和 less
           */
          {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader'],
            include: resolve('src'),
            exclude: /node_modules/ // 不能满足的条件（排除不处理的目录）
          },
          /* 加载 图片
           */
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            /* loader: ['file-loader'], // file-loader主要用来处理图片,其实也可以在js和html及其他文件上，但 很少那么使用.
             */
            loader: 'url-loader', // url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定 的限制时，可以返回一个 DataURL。
            options: {
              limit: 10000 // 小于10K的图片转成base64编码的DataURL字符串写到代码中
            },
            include: resolve('src'),
            exclude: /node_modules/ // 不能满足的条件（排除不处理的目录）
          },
          /* 加载 字体
           */
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            },
            include: resolve('src'),
            exclude: /node_modules/, // 不能满足的条件（排除不处理的目录）
          },
          /* 加载 CSV、TSV
           */
          {
            test: /\.(csv|tsv)$/,
            loader: 'csv-loader',
            include: resolve('src'),
            exclude: /node_modules/ // 不能满足的条件（排除不处理的目录）
          },
          /* 加载 xml
           */
          {
            test: /\.xml$/,
            loader: 'xml-loader',
            include: resolve('src'),
            exclude: /node_modules/ // 不能满足的条件（排除不处理的目录）
          }
        ]
      },
    
      /* 插件列表
       */
      plugins: [
        /* 清理 /dist 文件夹 
        */
        new CleanWebpackPlugin(['dist']),
        /* 设定 HtmlWebpackPlugin,然而 HtmlWebpackPlugin 还是会默认生成 index.html 文件 
        */
        new HtmlWebpackPlugin({
          template: resolve('src/index.html')
          // title: 'Caching'
        }),
        /* 启用 HMR
         */
        new webpack.HotModuleReplacementPlugin(),
        /* JS文件压缩 
        */
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: 'inline-source-map',
          compress: {
            warnings: false,
            // 移除掉代码中的 console
            drop_console: true,
            pure_funcs: ['console.log']
          }
        }),
        /* Node 环境变量
         */
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        /* 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
         */
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor', // Specify the common bundle's name.
          filename: 'vendor-[hash].min.js',
        }),
        /* ProvidePlugin 可以将模块作为一个变量，被 webpack 在其他每个模块中引用。
           只有你需要使用此变量的时候，这个模块才会被 require 进来。 
        */
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
        /* 能以可视化的方式展示打包结果，为你提供分析需求 
        */
        new BundleAnalyzerPlugin(),
        /* Scope Hoisting译作“作用域提升”。只需在配置文件中添加一个新的插件，就可以让 Webpack 
           打包出来的代码文件更小、运行的更快(实际上没有任何影响，体积大小没变)
         */
        new webpack.optimize.ModuleConcatenationPlugin(),
        /*  增强代码代码压缩，高性能的webpack uglify plugin
        */
        new FastUglifyJsPlugin({
          compress: {
              warnings: false
          },
          // debug设为true可输出详细缓存使用信息:
          debug: true,
          // 默认开启缓存，提高uglify效率，关闭请使用:
          cache: true,
          // 默认缓存路径为项目根目录，手动配置请使用:
          cacheFolder: resolve('.otherFolder'),
          // 工作进程数，默认os.cpus().length
          workerNum: 2
        })
      ]
    };
    ```
