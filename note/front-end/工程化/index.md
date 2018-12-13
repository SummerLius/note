<!-- TOC -->

- [前端开发工程化](#前端开发工程化)
    - [第一步：模块化](#第一步模块化)
        - [HTML](#html)
        - [JavaScript](#javascript)
        - [CSS](#css)
    - [第二部：组件化](#第二部组件化)
    - [第三部：静态资源管理](#第三部静态资源管理)
    - [参考链接](#参考链接)

<!-- /TOC -->

# 前端开发工程化

## 第一步：模块化

- 这里的模块化，是分语言，将html、js、css根据业务或功能细化为各个小文件
- 例如
    ```files
    /html
        index.html
        header.html
        footer.html
    /js
        index.js
        header.js
        footer.js
    /css
        index.css
        header.css
        footer.css
    ```

### HTML

- 模块化工具
    - ejs/jade

### JavaScript

- AMD/CommonJS/UMD/ES6 Module

### CSS

- less/sass/stylus

## 第二部：组件化

- 例如：
    ```files
    /index
        - index.html
        - index.js
        - index.css
    /header
        - header.html
        - header.js
        - header.css
    /footer
        - footer.html
        - footer.js
        - footer.css
    ```


## 第三部：静态资源管理

## 参考链接

- http://www.alloyteam.com/2015/11/we-will-be-componentized-web-long-text/
- http://fis.baidu.com/
- https://github.com/xufei/blog/issues/50