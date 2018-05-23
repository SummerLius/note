<!-- TOC -->

- [Vue-loader](#vue-loader)
    - [开始](#开始)
        - [Vue 组件细则](#vue-组件细则)
    - [特性](#特性)
    - [配置](#配置)
        - [预处理器](#预处理器)
        - [资源路径处理](#资源路径处理)
        - [进阶配置](#进阶配置)
        - [提取CSS文件](#提取css文件)
        - [自定义块](#自定义块)
    - [工作流程](#工作流程)
    - [选项参考](#选项参考)

<!-- /TOC -->

# Vue-loader

## 开始

### Vue 组件细则

- [概要](#)
    - .vue 文件是一个自定义的文件类型，用类 HTML 语法描述一个 Vue 组件。每个 .vue 文件包含三种类型的顶级语言块 `<template>`、`<script>` 和 `<style>`，还允许添加可选的自定义块：
        ```html
        <template>
          <div class="example">{{ msg }}</div>
        </template>

        <script>
        export default {
          data () {
            return {
              msg: 'Hello world!'
            }
          }
        }
        </script>

        <style>
        .example {
          color: red;
        }
        </style>

        <custom1>
          This could be e.g. documentation for the component.
        </custom1>
        ```
    - vue-loader 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 CommonJS 模块，**module.exports 出一个 Vue.js 组件对象**。
    - vue-loader 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 lang 属性。例如，你可以像下面这样使用 Sass 语法编写样式，更多的细节可以在 “预处理器” 中找到：
        ```html
        <style lang="sass">
          /* write Sass! */
        </style>
        ```
- [语言块](#)
    1. `<template>`
        - 默认语言：html
        - 每个 .vue 文件最多包含一个 `<template>` 块
        - 内容将被提取为字符串，将编译并用作 Vue 组件的 template 选项。
    2. `<script>`
        - 默认语言：js (在检测到 babel-loader 或 buble-loader 配置时自动支持ES2015)
        - 每个 .vue 文件最多包含一个 `<script>` 块
        - 该脚本在类 CommonJS 环境中执行 (就像通过 webpack 打包的正常 js 模块)，这意味着你可以 require() 其它依赖。在 ES2015 支持下，你也可以使用 import 和 export 语法
        - 脚本必须导出 Vue.js 组件对象。也可以导出由 Vue.extend() 创建的扩展对象，但是普通对象是更好的选择。
    3. `<style>`
        - 默认语言：css
        - 一个 .vue 文件可以包含多个 `<style>` 标签
        - `<style>` 标签可以有 scoped 或者 module 属性 (查看 CSS 作用域和 CSS Modules) 以帮助你将样式封装到当前组件。具有不同封装模式的多个 `<style>` 标签可以在同一个组件中混合使用
        - 默认情况下，将会使用 style-loader 提取内容，并通过 `<style>` 标签动态加入文档的 `<head>` 中，也可以配置 webpack 将所有 styles 提取到单个 CSS 文件中
- [自定义块](#)
- [src导入](#)
- [语法高亮](#)
- [注释](#)


## 特性

## 配置

### 预处理器

### 资源路径处理

### 进阶配置

### 提取CSS文件

### 自定义块

## 工作流程

## 选项参考