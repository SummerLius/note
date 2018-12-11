<!-- TOC -->

- [js模块规范](#js模块规范)
    - [CommonJS](#commonjs)
    - [AMD](#amd)
    - [CMD](#cmd)
    - [UMD](#umd)
    - [ES6 module](#es6-module)
    - [参考链接](#参考链接)

<!-- /TOC -->

# js模块规范

- 模块化可以提高代码复用率、可读性，方便代码管理。
- 通常一个文件就是一个模块，有自己的作用域，只向外暴露特有的变量和函数。
- 目前流行的js模块化规范有CommonJS、AMD、CMD、UMD以及ES6模块系统。
- 对于本地使用类似webpack打包工具将js文件打包成单个文件，使用CommonJS或es6 module即可

## CommonJS

- 特点：
    - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
    - 同步加载 —— 模块加载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行。
- 环境：
    - 服务端环境
- 应用：
    - nodejs
- 语法：
    1. 导入：`require('路径')`
    2. 导出：`module.exports和exports`
- 样例：
    ```js
    // a.js
    // 相当于这里还有一行：var exports = module.exports;代码
    exports.a = 'Hello world';  // 相当于：module.exports.a = 'Hello world';
    
    // b.js
    var moduleA = require('./a.js');
    console.log(moduleA.a);     // 打印出hello world// a.js
    // 相当于这里还有一行：var exports = module.exports;代码
    exports.a = 'Hello world';  // 相当于：module.exports.a = 'Hello world';
    
    // b.js
    var moduleA = require('./a.js');
    console.log(moduleA.a);     // 打印出hello world
    ```

## AMD

> 解决的问题：
> 1. 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
> 2. js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长

- 名称：
    - Asynchronous Module Definition，AMD，异步模块定义
- 特点：
    - 异步加载。模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
    - 管理模块之间的依赖性，便于代码的编写和维护
- 环境：
    - 浏览器环境
- 应用：
    - requireJS（requirejs2.0库，同时支持amd和cmd语法）
- 语法：
    1. 导入：`require(['模块名称'], function ('模块变量引用'){// 代码});`
    2. 导出：`define(function (){return '值');`
- 样例：
    ```js
    // a.js
    define(function (){
    　　return {
    　　　a:'hello world'
    　　}
    });
    // b.js
    require(['./a.js'], function (moduleA){
        console.log(moduleA.a); // 打印出：hello world
    });
    ```




## CMD

> 对使用者来说，cmd和amd的解决的问题是一致的，只不过内部许多细节不一样，模块异步加载时机不一致。  

- 名称：
    - Common Module Definition，CMD，通用模块定义
- 特点：
    - 异步加载。同AMD类似，也是异步加载。
    - CMD是在AMD基础上改进的一种规范，和AMD不同在于对依赖模块的执行时机处理不同，CMD是就近依赖，而AMD是前置依赖
- 环境：
    - 浏览器环境
- 语法：
    1. 导入：`define(function(require, exports, module) {});`
    2. 导出：`define(function (){return '值');` 或 `define(function(require, exports, module) {});`
- 样例：
    ```js
    // a.js
    define(function (require, exports, module){
    　　exports.a = 'hello world';
    });
    // b.js
    define(function (require, exports, module){
        var moduleA = require('./a.js');
        console.log(moduleA.a); // 打印出：hello world
    });
    ```

## UMD

- 特点：
    - 兼容AMD和commonJS规范的同时，还兼容全局引用的方式
- 环境：
    - 浏览器或服务器环境
- 应用：
    - 无
- 语法：
    - 无导入导出规范，只有如下的一个常规写法：
        ```js
        (function (root, factory) {
            if (typeof define === 'function' && define.amd) {
                //AMD
                define(['jquery'], factory);
            } else if (typeof exports === 'object') {
                //Node, CommonJS之类的
                module.exports = factory(require('jquery'));
            } else {
                //浏览器全局变量(root 即 window)
                root.returnExports = factory(root.jQuery);
            }
        }(this, function ($) {
            //方法
            function myFunc(){};
            //暴露公共方法
            return myFunc;
        }));
        ```

## ES6 module

- 特点：
    - 按需加载（编译时加载）
    - import和export命令只能在模块的顶层，不能在代码块之中（如：if语句中）,import()语句可以在代码块中实现异步动态按需动态加载（不确定，待了解）
- 环境：
    - 浏览器或服务器环境（以后可能支持）
- 应用：
    - ES6的最新语法支持规范
- 语法：

## 参考链接

- https://segmentfault.com/a/1190000012419990
- [AMD 和 CMD 的区别有哪些？ - 玉伯的回答 - 知乎](https://www.zhihu.com/question/20351507/answer/14859415)
    ```text
    作者：玉伯
    链接：https://www.zhihu.com/question/20351507/answer/14859415
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

    AMD 规范在这里：https://github.com/amdjs/amdjs-api/wiki/AMD
    CMD 规范在这里：https://github.com/seajs/seajs/issues/242
    AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
    CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
    类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。
    
    还有不少⋯⋯这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。
    
    目前这些规范的实现都能达成浏览器端模块化开发的目的。
    
    区别：
    1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，
    也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
    
    2. CMD 推崇依赖就近，AMD 推崇依赖前置。
    看代码：
    // CMD
    define(function(require, exports, module) {   
        var a = require('./a')  
        a.doSomething()   
        // 此处略去 100 行  
        var b = require('./b') 
        // 依赖可以就近书写  
        b.doSomething()   
        // ... 
    })
    
    // AMD 默认推荐的是
    define(['./a', './b'], function(a, b) {  
        // 依赖必须一开始就写好    
        a.doSomething()    
        // 此处略去 100 行    
        b.doSomething()    
        ...
    }) 
    
    虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，
    但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。
    
    3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。
    比如 AMD 里，require 分全局 require 和局部 require，都叫 require。
    CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。
    CMD 里，每个 API 都简单纯粹。
    
    4. 还有一些细节差异，具体看这个规范的定义就好，就不多说了。另外，SeaJS 和 RequireJS 的差异，可以参考：https://github.com/seajs/seajs/issues/277
    ```
- [seajs 和 requirejs 的区别](https://github.com/seajs/seajs/issues/277)
- [seajs](https://seajs.github.io/seajs/docs/)
- [requrejs](https://requirejs.org/)
- [requrejs 中文](http://www.requirejs.cn/)
- seajs已死相关链接
    - https://www.zhihu.com/question/34756861
    - https://github.com/seajs/seajs/issues/1605
        ```text
        lifesinger commented on 19 Oct 2015
        很抱歉，我一直欠大家一篇文章，就是《Sea.js 已死》。
        
        任何一个技术产品，都有其生命周期，随着 ES6、ES7、webpack、babel 等技术与工具的兴起，Sea.js 也好，RequireJS 也好，都有了更好的解决方案。当前情况下，用 loader 意义已经不大。
        
        推荐大家可以用下 http://ant.design/ ，也是 Arale 体系的一次重大技术升级，都不需要 loader 了。
        
        很抱歉，同时因为 Sea.js 的死去，我充满惊喜。
        
        你对 Sea.js 大失所望，却是我对你的欣喜若狂……
        ```
        ```text
        作者：徐飞
        链接：https://www.zhihu.com/question/34756861/answer/59764534
        来源：知乎
        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

        因为过时了。
        
        所谓的过时，并不是指现在就不能用了，而是说出现了明显更加先进的理念（或者标准），
        这会导致未来它的使用场景大为减少，整体趋势已经步入衰落。随着Web相关标准的推进，有很多框架（库）都过时了。
        
        比如：JavaScript新的模块标准导致了SeaJS和RequireJS的过时原生选择器的良好支持，
        导致人们对jQuery不再那么依赖Array和Object上面一些新特性的出现，
        导致underscore和lodash的作用减弱与此同时，一些专注于做shim或者polyfill的库反倒会比较时髦，
        因为它们的定位非常明确：扶上马，送一程。
        
        然后，Angular，Backbone，Knockout，这一大票东西，除非革自己的命，否则全部过时了。
        
        再来看看Kissy，这也是一个时代的产物，在同一个时期，都很多类似YUI或者jQuery UI的东西，
        然而，它们都衰落了，不再适应新的时代。
        
        我们将来不需要用那样的方式编写前端框架，不需要用那样的方式编写界面组件，永远不要停下自己的脚步。
        
        中堂大人教导我们：一代人做一代人的事情。
        
        上一代前端框架/库都已经基本完成使命了，让我们默默记住并怀念它们。
        
        （再次强调，过时、衰落，都代表着下降趋势，而不是说你现在就不能用了，仍然会有合适的场景
        ，比如你要支持ie6之类，在你的场景没有与时俱进之前，技术选型也是不能与时俱进的。
        将来宣传上有偏差，是要负责任的……）
        
        发布于 2015-08-18
        ```