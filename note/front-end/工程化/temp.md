# 前端工程化



## 临时

- [前端工程的阶段：](https://github.com/fouber/blog/issues/10)
    1. 库/框架选型。jquery/react/angularjs/vue...
    2. 简单构建优化。grunt/gulp...
    3. js/css模块化开发。js模块工具，AMD/CommonJS/UMD/ES6 Module；css模块化工具，less/sass/stylus。
    4. 组件化开发与资源管理
        - 面对的问题：
            - 大体量：多功能、多页面、多状态、多系统；
            - 大规模：多人甚至多团队合作开发；
            - 高性能：CDN部署、缓存控制、文件指纹、缓存复用、请求合并、按需加载、同步/异步加载、移动端首屏CSS内嵌、HTTP 2.0服务端资源推送。
- 第一件事：组件化开发
    - 整个前端项目可以划分为这么几种开发概念：
        - js模块：（js文件）独立的算法和数据单元。
        - css模块：（css、png文件）独立的功能性样式单元。
        - UI组件：（js、hmtl、css、png等文件）独立的可视/可交互功能单元。
        - 页面：前端这种GUI软件的界面状态，是UI组件的容器
        - 应用：整个项目或整个站点被称之为应用，由多个页面组成。
    - 一般中小规模的项目，大致可以规划出这样的源码目录结构：
        - ![](https://raw.githubusercontent.com/fouber/blog/master/201508/assets/files-x.png)
- 第二件事：“智能”静态资源管理
    - 第四阶段前端开发最迫切需要做好的就是在基础架构中贯彻**增量原则**。
    - 静态资源管理系统 = 资源表 + 资源加载框架
    - 解决资源管理的方法其实一点也不复杂：一个通用的资源表生成工具 + 基于表的资源加载框架
    - 根据业务场景的不同，加载框架可以在浏览器中用JS实现，也可以是后端模板引擎中用服务端语言实现，甚至二者的组合，不一而足。
    - 如何选型技术、如何定制规范、如何分治系统、如何优化性能、如何加载资源，当你从切图开始转变为思考这些问题的时候，我想说：你好，工程师！
- [百度开源 前端构建系统](https://github.com/fex-team/fis3)


## 参考链接

- https://github.com/fouber/blog/issues/3
- https://github.com/fouber/blog/issues/4
- https://github.com/fouber/blog/issues/10
- https://github.com/fex-team/fis3
