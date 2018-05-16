<!-- TOC -->

- [doc](#doc)
    - [安装](#安装)
    - [开始](#开始)
        - [视频介绍](#视频介绍)
        - [提示与技巧](#提示与技巧)
        - [用户界面](#用户界面)
        - [主题](#主题)
        - [设置](#设置)
        - [按键绑定](#按键绑定)
        - [显示语言](#显示语言)
    - [用户指南](#用户指南)
        - [基本编辑功能](#基本编辑功能)
        - [智能感知](#智能感知)
        - [代码导航](#代码导航)
        - [重构](#重构)
        - [调试](#调试)
        - [集成终端](#集成终端)
        - [多根工作区](#多根工作区)
        - [任务](#任务)
        - [创建代码片](#创建代码片)
        - [Emmet](#emmet)
        - [命令行](#命令行)
        - [可访问性](#可访问性)
    - [语言](#语言)
        - [概要](#概要)
        - [JavaScript](#javascript)
        - [JSON](#json)
        - [HTML](#html)
        - [CSS Sass Less](#css-sass-less)
        - [...](#)
    - [Nodejs / JavaScript](#nodejs--javascript)
        - [Nodejs教程](#nodejs教程)
        - [Nodejs调试](#nodejs调试)
        - [Nodejs开发](#nodejs开发)
        - [React教程](#react教程)
        - [Angular教程](#angular教程)
        - [调试方法](#调试方法)
        - [扩展包](#扩展包)
    - [Python](#python)
    - [Java](#java)
    - [扩展包创作](#扩展包创作)
    - [扩展包文档](#扩展包文档)
    - [其他](#其他)
    - [参考](#参考)

<!-- /TOC -->

# doc

## 安装

## 开始

### 视频介绍

### 提示与技巧

- [基础](#)
    1. “帮助 >> 欢迎使用”
    2. “帮助 >> 交互演练场”
    3. 命令面盘：`ctrl + shift + p`
    4. 默认快捷键：所有的命令绑定的快捷键，是可以通过上面命令面盘看到的（如果命令有绑定快捷键的话）
    5. 快捷键表：“帮助 >> 快捷键参考”
    6. 快速打开（快速打开文件）：`ctrl + p`
    7. 快速打开上一次打开的文件：按两次快速打开，即两次 ctrl+p
- [命令行](#)
    1. vscode 提供了丰富的命令行接口去自定义打开文件等等
        ```sh
        $ code --help
        Visual Studio Code 1.23.1
        
        Usage: code.exe [options] [paths...]
        
        To read output from another program, append '-' (e.g. 'echo Hello World | code -')
        
        Options:
          -d, --diff <file> <file>           Compare two files with each other.
          -a, --add <dir>                    Add folder(s) to the last active window.
          -g, --goto <file:line[:character]> Open a file at the path on the specified
                                             line and character position.
          -n, --new-window                   Force to open a new window.
          -r, --reuse-window                 Force to open a file or folder in the last
                                             active window.
          -w, --wait                         Wait for the files to be closed before
                                             returning.
          --locale <locale>                  The locale to use (e.g. en-US or zh-TW).
          --user-data-dir <dir>              Specifies the directory that user data is
                                             kept in. Can be used to open multiple
                                             distinct instances of Code.
          -v, --version                      Print version.
          -h, --help                         Print usage.
        
        Extensions Management:
          --extensions-dir <dir>
              Set the root path for extensions.
          --list-extensions
              List the installed extensions.
          --show-versions
              Show versions of installed extensions, when using --list-extension.
          --install-extension (<extension-id> | <extension-vsix-path>)
              Installs an extension.
          --uninstall-extension (<extension-id> | <extension-vsix-path>)
              Uninstalls an extension.
          --enable-proposed-api <extension-id>
              Enables proposed API features for an extension.
        
        Troubleshooting:
          --verbose                Print verbose output (implies --wait).
          --log <level>            Log level to use. Default is 'info'. Allowed values
                                   are 'critical', 'error', 'warn', 'info', 'debug',
                                   'trace', 'off'.
          -s, --status             Print process usage and diagnostics information.
          -p, --performance        Start with the 'Developer: Startup Performance'
                                   command enabled.
          --prof-startup           Run CPU profiler during startup
          --disable-extensions     Disable all installed extensions.
          --inspect-extensions     Allow debugging and profiling of extensions. Check
                                   the developer tools for the connection URI.
          --inspect-brk-extensions Allow debugging and profiling of extensions with the
                                   extension host being paused after start. Check the
                                   developer tools for the connection URI.
          --disable-gpu            Disable GPU hardware acceleration.
          --upload-logs            Uploads logs from current session to a secure
                                   endpoint.
          --max-memory             Max memory size for a window (in Mbytes).
        ```
    2. 工作区相关的文件放在 `.vscode` 文件夹里面，里面的 `tasks.json` 负责任务执行，`lauch.json` 负责调试等
- [状态栏](#)
    1. 错误和警告：快捷键，`ctrl + shift + M`
    2. 切换语言模式：快捷键：`ctrl K, M`，或直接鼠标点击右下角
- [自定义](#)
    1. 你可以自定义vscode许多地方
        - 更换主题
        - 更换快捷键
        - 调整设置
        - 增加json验证
        - 创建代码片
        - 安装扩展包
        - ...
    2. 更换主题：`ctrl+k ctrl+t`，或 ctrl+shift+p 搜索
    3. 按键映射：“文件 >> 首选项 >> 按键映射扩展”，安装其他软件的快捷键映射表，例如vim、sublime、Emacs、atom
    4. 查看当前键盘快捷方式：“文件 >> 首选项 >> 键盘快捷方式” 或 `ctrl+k ctrl+s`
    5. 更换用户设置，打开用户设置：`settings.json`
- [扩展包](#)
- [文件和文件夹](#)
- [编辑技巧](#)
- [智能感应](#)
- [代码片](#)
- [Git集成](#)
- [调试](#)
- [任务运行](#)
- [内部构建](#)

### 用户界面

### 主题

### 设置

### 按键绑定

### 显示语言

## 用户指南

### 基本编辑功能

- [键盘快捷键](#)
    1. [快捷键参考](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference)
    2. [安装一个快捷键扩展包](https://code.visualstudio.com/docs/getstarted/keybindings#_keymap-extensions)
    3. [自定义快捷键](https://code.visualstudio.com/docs/getstarted/keybindings#_customizing-shortcuts)
- [多行选择](#)
    1. 触发
        - 使用鼠标：`Alt+Click`
        - 使用键盘：`Ctrl+Alt+Down` 或 `Ctrl+Alt+Up`
    2. 多行选择状态下，选中每行中光标临近的那个单词：`Ctrl+D`
    3. 修改触发快捷键
    4. 缩小/扩大 选中
        - 缩小：`Shift+Alt+Left`
        - 扩大：`Shift+Alt+Right`
- [列选择](#) 
    1. 将光标移到指定位置，然后按住 `shift+alt`，最后鼠标移动控制
- [](#) 
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)

### 智能感知

### 代码导航

### 重构

### 调试

### 集成终端

### 多根工作区

### 任务

### 创建代码片

### Emmet

### 命令行

### 可访问性

## 语言

### 概要

### JavaScript

### JSON

### HTML

### CSS Sass Less

### ...

## Nodejs / JavaScript

### Nodejs教程

### Nodejs调试

### Nodejs开发

### React教程

### Angular教程

### 调试方法

### 扩展包

## Python

## Java

## 扩展包创作

## 扩展包文档

## 其他

## 参考

- [官方文档](https://code.visualstudio.com/docs)

临时快捷记录：
- `alt+up/down`：移动当前行
- sync settings 扩展：cd16ff58f6f3ac93805aa7ad82d9d5ed1969268f
