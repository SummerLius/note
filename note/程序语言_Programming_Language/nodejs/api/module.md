<!-- TOC -->

- [module](#module)
    - [访问主模块](#访问主模块)
    - [包管理技巧](#包管理技巧)
    - [总结](#总结)
    - [缓存](#缓存)
    - [核心模块](#核心模块)
    - [循环](#循环)
    - [文件模块](#文件模块)
    - [目录作为模块](#目录作为模块)
    - [从node_modules目录加载](#从node_modules目录加载)
    - [从全局目录加载](#从全局目录加载)
    - [模块包装器](#模块包装器)
    - [模块范围](#模块范围)
        - [__dirname](#__dirname)
        - [__filename](#__filename)
        - [exports](#exports)
        - [module](#module-1)
        - [require()](#require)
        - [require.cache](#requirecache)
        - [require.main](#requiremain)
        - [](#)
        - [require.resolve(request[, options])](#requireresolverequest-options)
        - [require.resolve.paths(request)](#requireresolvepathsrequest)
    - [module对象](#module对象)
        - [module.children](#modulechildren)
        - [module.exports](#moduleexports)
            - [exports快捷方式](#exports快捷方式)
        - [module.filename](#modulefilename)
        - [module.id](#moduleid)
        - [module.loaded](#moduleloaded)
        - [module.parent](#moduleparent)
        - [module.paths](#modulepaths)
        - [module.require(id)](#modulerequireid)
    - [//////////////////////////////////////////////](#)
    - [深入浅出模块章节](#深入浅出模块章节)
        - [CommonJS规范](#commonjs规范)
        - [Node模块实现](#node模块实现)
            - [优先从缓存加载](#优先从缓存加载)
            - [路径分析和文件定位](#路径分析和文件定位)
            - [模块编译](#模块编译)
        - [核心模块](#核心模块-1)
        - [c/c++扩展模块](#cc扩展模块)
        - [模块调用栈](#模块调用栈)
        - [包与NPM](#包与npm)
        - [前后端共用模块](#前后端共用模块)
        - [总结](#总结-1)
    - [参考](#参考)

<!-- /TOC -->

# module

Node.js内部，遵循CommonJS规范，实现了一个简单的模块加载系统。使文件和模块一一对应，即每个文件被视为一个独立的模块。

模块内的变量是私有的，因为模块被Node.js包装在一个**函数**中（详见 *模块包装器*）。

## 访问主模块

当使用 node 命令直接运行一个文件时，require.main 会被设为它的module。这意味着可以通过 require.main === module 来判断一个文件是否被直接运行。

> 例如，对于 app.js　文件，如果通过node app.js运行则其为主模块，如果通过require('./app.js')运行的则为子模块

每个module提供了一个filename属性（通常等同于__filename），所以通过检查 require.main.filename 来获取当前应用程序的入口点。

## 包管理技巧

Node.js的 require() 函数的语义被设计的足够通用化，可以支持许多合理的目录结构。

- 细节暂略

## 总结

想要获得调用 `require()` 时加载的确切的文件名，使用 `require.resolve()` 函数。

综上所述，一下使用伪代码描述的高级算法，解释 `require.resolve()` 做了些什么：
- 过程暂略
- ...
<!-- - 情景：从 Y 路径引入模块：require(x)
1. 如果 x 是核心模块，则直接返回核心模块，结束
2. 如果 x 是以 './'、'../'、'/' 开头
3. 
4. 
5.  -->

## 缓存

模块在第一次加载之后会被缓存，缓存在require.cache对象中。

缓存意味着，如果每次调用 require('foo') 都解析到同一个文件，则返回相同的对象。

> 注意缓存的寻找，是根据文件所在的绝对路径。  
> 即，require.cache 对象中的每个属性，是以每个module的绝对路径为key。

故，多次调用 require('foo') 不会导致模块的代码被多次执行，因为除第一次外，之后都是直接从require.cache中获取。这是一个重要的特性，借助它，可以返回“部分完成”的对象，从而允许加载依赖的依赖，即使它们会导致循环依赖。

如果想要多次执行一个模块，可以考虑export一个函数，然后调用该函数。

<br/>

**注意事项**：
- 模块是基于其解析的文件名进行缓存的。
- 若，调用模块位置不同，模块可能被解析成不同的文件名，这样就不能保证 require('foo') 总能返回完全相同的对象。
- 此外，在不区分大小写的文件系统或操作系统中，被解析成不同的文件名可以指向同一文件，但缓存会将它们视为不同的模块，并多次重新加载。（因为js对象的key，会区分大小写）。

> 例如，require('./foo') 和 require('./Foo') 会返回两个不同的对象，而不管 ./foo 和 ./Foo 是否是相同的文件。

## 核心模块

Node.js 有些模块会被编译成二进制。这些模块别的地方有详述。

核心模块定义在 Node.js 源码的 lib/ 目录下。

require() 总是优先加载核心模块。例如，require('http') 始终返回内置的 HTTP 模块，即使有同名文件。

## 循环

暂略

## 文件模块

- 如果按照确切的文件名没有找到模块，则Nodejs会尝试带上`.js`、`.json`、`.node`扩展名再加载
    - .js：解析为js文本文件
    - .json：解析问json文本文件
    - .node：解析为通过dlopen加载的编译后的插件模块
- 以 '/' 为前缀的模块是文件的绝对路径
- 以 './'、'../' 为前缀的模块为相对路径，相对于__dirname
- 当没有以'/'、'./'、'../'开头时，这个模块必须是一个核心模块或 node_modules 目录下

## 目录作为模块

如果require一个目录，则其过程为：
1. 寻找package.json中main属性
2. 寻找index.js
3. 寻找index.node

## 从node_modules目录加载

暂略

## 从全局目录加载

暂略

## 模块包装器

在执行模块代码之前，Node.js 会使用一个如下的函数包装器将其包装：
```js
(function (exports, require, module, __filename, __dirname) {
    // 模块的代码实际上在这里
});
```

由上面可知，`exports`、`require`、`module`...不是全局变量，而是模块范围变量。

通过这样做，Node.js实现了以下几点：
- 它保持了顶层的变量（用 var、const 或 let 定义）作用在模块范围内，而不是全局变量。
- 它有助于提供一些看似全局的，但是实际上是模块特定的变量，例如：
    - 实现者可以用于从模块中导出 module 和 exports 对象。
    - 包含模块绝对文件名和目录路径的快捷变量：__filename 和 __dirname。

## 模块范围

### __dirname

- 作用：当前模块的文件夹名称、路径，等同于 path.dirname(__filename) 值。

```js
__dirname = path.dirname(__filename) // true

```

### __filename

- 作用：当前模块文件名称，解析后的完整的绝对路径

```js

// node app.js

console.log(__filename);
// /Users/root/app.js

console.log(__dirname);
// /Users/root
```

### exports

- 作用：这是对于 module.exports 对象的引用，相当于快捷方式
- 注意：模块最后导出的是 module.exports 对象，而不是 exports；如果对 exports 又赋值了其它对象，则其改动对 module.exports对象无效

### module

对当前模块的引用，详细可以查看 `module Object` 小节。

module.exports 用于指定一个模块导出的内容，即可以通过 require() 访问的内容。

### require()

引入模块。

require本身是一个函数，同时也含有一些属性：
- require.resolve()
- require.mian 对象
- require.cache 对象
- require.extensions 已废弃

### require.cache

- 作用：被引入的模块将缓存在这个对象中。
- 清除：从此对象中删除键值将会导致，下一次 require 重新加载被删除的模块。注意不能删除原生插件（native addons），因为它们的重载将会导致错误。

### require.main

### 

### require.resolve(request[, options])

暂不做详述：
- request：string类型
- options：object类型
    - paths：array类型
- returns：string类型

### require.resolve.paths(request)

暂不做详述：
- request：string类型，被查询解析路径的模块的路径
- returns：array类型，返回一个数组，其中包含解析 request 过程中被查询的路径

## module对象

- 在每个模块中，module 的自由变量是一个指向当前模块对象的引用。 

属性：
- module.id
- module.filename
- module.children
- module.parent
- module.exports
- module.paths
- module.loaded

### module.children

被该模块引用的模块对象。

即该模块内引用其它文件，require('xxx')

### module.exports

module.exports 对象是由模块系统创建的。是模块的返回值。

#### exports快捷方式

- exports 变量仅在模块的文件级别作用域内有效的，它在模块被执行前被赋予 module.exports 的值。
- 如果一个新的值赋值给 exports，那么它就不再绑定到 module.exports。

### module.filename

- 作用：模块的完全解析后的文件名

### module.id

- 作用：模块的标识符，通常是完全解析后的文件名，当不完全是

### module.loaded

- 作用：模块是否已经加载完成，或正在加载中

### module.parent

- 作用：显示最先引用该模块的模块，即第一次引用的。（后续的其它模块引用，都是从缓存中获取）

### module.paths

- 作用：模块的搜索路径

### module.require(id)


## //////////////////////////////////////////////

## 深入浅出模块章节

### CommonJS规范

### Node模块实现

Node在实现中并非完全按照CommonJS规范，而是进行了一定的取舍，同时也增加了少许自身需要的特性。

在Node中引入模块，经历3个步骤：
1. 路径分析
2. 文件定位
3. 编译执行

在Node中模块分两类：
1. Node提供的模块，称核心模块。
    - 核心模块伴随着Node源码的编译过程中，也编译成了二进制执行文件。在Node进程启动时，部分核心模块就被直接加载进内存中，所以这部分核心模块require时，文件定位和编译执行这两个步骤可以省略掉，并且在路径分析中优先判断，所以它的加载速度是最快的。
2. 用户编写的模块，称为文件模块。
    - 文件模块是在运行时动态加载的，需要完整的路径分析、文件定位、编译执行过程，速度比核心模块慢。

#### 优先从缓存加载

Node缓存的编译和执行之后的对象，即require.cache对象。

#### 路径分析和文件定位

模块标识符有几种形式，对于不同的标识符，模块的查找和定位有不同程度的差异。

1. 路径分析
    - 概述：`require()` 方法接受一个标识符作为参数。在Node实现中，正事基于这样一个标识符进行模块查找。
    - 分类：模块标识符在Node中主要分为以下几类：
        1. 核心模块
        2. `.` 或 `..` 开头的相对路径模块
        3. 以 `/` 开头的绝对路径模块
        4. 非路径形式的文件模块，自定义模块
    - `核心模块`：
        - 核心模块的优先级仅次于缓存加载，它在Node的源代码编译过程中已经编译为二进制代码，其加载过程最快。
    - `路径形式的模块`：
        - 以路径形式开始的标识符，当作文件模块处理。在分析路径模块时，require()方法会将路径转为真实路径，并以真实路径作为索引，将编译执行后的结果放到缓存中，以使二次加载更快。
        - 由于文件模块给Node指定了确切的文件位置，所以在查找过程中可以节约大量时间，其加载速度慢于核心模块。
    - `非路径形式的模块`：
        - 该类型非核心模块，也非路径形式，是查找最费时的一种
        - 该模块由于没有指定文件模块具体的位置，Node给出了查找策略（`module.paths`）：
            1. 当前文件目录下的node_modules目录
            2. 父目录下的node_modules目录
            3. 父目录的父目录下的node_modules目录
            4. 沿路径向上逐级递归，直到根目录下的node_modules目录
            5. 概要：当前文件的路径越深，模块查找耗时会越多，这是该模块加载速度最慢的原因
2. 文件定位
    - 概要：
        - 从缓存require.cache加载的优化策略使得二次引用时不需要路径分析、文件定位、编译执行的过程，大大提高了再次加载模块时的效率
        - 但在文件定位过程中，还有一些细节需要注意：文件扩展名分析、目录、package处理等等
    - 文件扩展名分析
        - require()在分析标识符过程中，可能出现标识符不含扩展名的情况。CommonJS模块规范也允许在标识符中不包含扩展名。
        - Node会按 **.js**、**.json**、**.node** 的次序补充扩展名，依次尝试
    - 目录和包分析
        - 在分析标识符过程中，在require()分析文件扩展名后，可能没有找到对应的文件，但却得到一个**目录**，此时Node会将目录当作一个包处理。
        - 目录分析策略：
            1. 首先查找package.json，通过JSON.parse()解析对象，从中取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将会进入扩展名分析步骤。
            2. 如果main属性指定文件名错误，或找不到package.json文件。则Node会将 **index** 当作默认文件名，然后一次查找：index.js、index.json、index.node
            3. 如果目录分析过程中没有成功定位任何文件，则沿着父目录（module.paths）依次向上查找。如果到根目录也没找到，则报错。

#### 模块编译

暂略，后续补充
    
### 核心模块

### c/c++扩展模块

### 模块调用栈

### 包与NPM

### 前后端共用模块

### 总结



## 参考

- http://nodejs.cn/api/modules.html#modules_modules
- https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_all_together
