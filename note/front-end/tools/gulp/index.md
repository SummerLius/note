<!-- TOC -->

- [Gulp](#gulp)
    - [介绍](#介绍)
    - [简单入门](#简单入门)
    - [Gulp命令行文档](#gulp命令行文档)
    - [Gulp API 文档](#gulp-api-文档)
        - [gulp.src()](#gulpsrc)
        - [gulp.dest()](#gulpdest)
        - [gulp.task()](#gulptask)
        - [gulp.watch()](#gulpwatch)
    - [参考](#参考)

<!-- /TOC -->

# Gulp

## 介绍

- **作用**
    1. 自动化构建工具，来提高你的工作流程
- **特点**
    1. 易于使用
        - 通过代码由于配置的策略，Gulp让简单的任务简单，复杂的任务可管理
    2. 构建快速
        - 利用Node.js流的威力，你可以快速构建项目并减少频繁的IO操作
    3. 插件高质
        - Gulp严格的插件指南确保插件如你期望的那样简洁高质量得工作
    4. 易于学习
        - 通过最少的API，掌握Gulp毫不费力，构建工作尽在掌握：如同一系列管道流

## 简单入门

1. 全局安装：为了在命令行CLI环境中能全局访问gulp命令，以便能执行gulpfile.js文件
    ```sh
    npm install --global gulp
    ```



2. 作为项目的开发依赖（devDependencies）安装：为了给gulpfile.js提供gulp模块，require('gulp')
    ```sh
    npm install --save-dev gulp
    ```


3. 在项目根目录下创建一个名为gulpfile.js的文件：用户通过gulp模块创建具体的任务
    ```js
    var gulp = require('gulp');
    gulp.task('default', function() {
        // 你的代码
    });
    ```


4. 运行gulp：在CLI中执行gulpfile.js文件，默认的名为default的任务将会被运行，如果想要单独执行特定的任务，请输入`gulp <task> <othertask>`
    ```sh
    gulp 或 gulp default
    ```

## Gulp命令行文档

Gulp
- 参数
    - `-v` 或 `--version`：会显示全局和项目本地安装的gulp版本号
    - `--require <module path>`：将会在执行之前 reqiure 一个模块。这对于一些语言编译器或者需要其他应用的情况来说来说很有用。你可以使用多个`--require`
    - `--gulpfile <gulpfile path>` 手动指定一个 gulpfile 的路径，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
    - `--cwd <dir path>` 手动指定 CWD。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
    - `-T` 或 `--tasks` 会显示所指定 gulpfile 的 task 依赖树
    - `--tasks-simple` 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
    - `--color` 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
    - `--no-color` 强制不显示颜色，即便检测到有颜色支持
    - `--silent` 禁止所有的 gulp 日志
- 任务
    - Task 可以通过 `gulp <task> <othertask>` 方式来执行。如果只运行 gulp 命令，则会执行所注册的名为 `default` 的 task，如果没有这个 task，那么 gulp 会报错。

## Gulp API 文档

即在gulpfile.js文件中使用的API。

以下仅列出而已，详细仅参考官网。

### gulp.src()

<!-- - 格式：`gulp.src([ globs [, options ] ])`
- 说明：
    - 输出符合参数中的匹配模式（glob）或其数组（array of globs）的文件。
    - 将返回一个vinyl files 的 stream，（即，经过包'glupjs/vinyl-fs'处理过、格式化的流 ），它可以被piped到别的插件中
    - glob 请参考node-glob语法，或者你也可以直接写文件的路径
- 参数： -->

### gulp.dest()

### gulp.task()

### gulp.watch()

## 参考

- [gulp中文网](https://www.gulpjs.com.cn/)
- [gulp官网](https://gulpjs.com/)
- [gulp插件 官网](https://gulpjs.com/plugins/)
- [gulp插件 NPM](https://www.npmjs.com/browse/keyword/gulpplugin)
