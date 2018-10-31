<!-- TOC -->

- [Doc](#doc)
    - [安装go](#安装go)
    - [学习go](#学习go)
        - [go指南](#go指南)
        - [如何编写Go代码](#如何编写go代码)
        - [编辑器插件和IDEs](#编辑器插件和ides)
        - [高效go语言](#高效go语言)
        - [诊断](#诊断)
        - [FAQ](#faq)
        - [Go Wiki](#go-wiki)
        - [更多](#更多)
    - [参阅文档](#参阅文档)
    - [相关文章](#相关文章)
    - [谈论](#谈论)
    - [非英文文档](#非英文文档)

<!-- /TOC -->

# Doc


- 记录此文档时，go版本为：1.11.1
- [官网](https://golang.org/doc/)
- Go编程语言是一个开源项目，可以提高程序员的工作效率。
- Go富有表现力，简洁，干净，高效。 它的并发机制使编写能够充分利用多核和联网机器的程序变得容易，而其新颖的类型系统可实现灵活的模块化程序构建。 Go快速编译到机器代码，但具有垃圾收集的便利性和运行时反射的强大功能。 它是一种快速，静态类型的编译语言，感觉就像一种动态类型的解释语言。

## 安装go

- [下载并安装 Go 编译器、工具与库的说明](https://go-zh.org/doc/install)

## 学习go

### go指南

- Go 语言的交互式简介，它分为三节。第一节覆盖了基本语法及数据结构，第二节讨论了方法与接口， 第三节则简单介绍了 Go 的并发原语。每节末尾都有几个练习，你可以对自己的所学进行实践。
- 你可以 在线学习 或 安装到本地。
    - 在线：
        - [英文](https://tour.golang.org/welcome/1)
        - [中文](https://tour.go-zh.org/welcome/1)
    - 本地：
        - 该命令会将`gotour`二进制可执行文件放在`c:/Users/xxx/bin/`目录下
            - 英文： `go get golang.org/x/tour/gotour`，
            - 中文： `go get github.com/Go-zh/tour/gotour`，

### 如何编写Go代码

- 本文档教你如何使用 go 命令来获取、构建并安装包、命令及运行测试， 这些内容也可在此[视频](https://www.youtube.com/watch?v=XCsL89YtqCs)中获得。
- [英文](https://golang.org/doc/code.html)
- [中文](https://go-zh.org/doc/code.html)

### 编辑器插件和IDEs

- [此文档总结了常用的编辑器插件和带有Go支持的IDE](https://golang.org/doc/editors.html) 

### 高效go语言

- 本文档是 Go 语言新手的必读物，它就如何编写清晰而地道的 Go 代码提供一些技巧。 在阅读本文档之前，你应当首先阅读 Go 语言之旅及 Go 编程语言规范，它是对二者的补充
- [英文](https://golang.org/doc/effective_go.html)
- [中文](https://go-zh.org/doc/effective_go.html)


### 诊断

- [总结用于诊断Go程序中的问题的工具和方法](https://golang.org/doc/diagnostics.html)

### FAQ

关于 Go 的常见问题解答
- [英文](https://go-zh.org/doc/faq)
- [中文](https://golang.org/doc/faq)

### Go Wiki

- 由Go社区维护的[维基](https://github.com/golang/go/wiki)。

### 更多

- 更多Go学习的资源见[Go Wiki学习](https://github.com/golang/go/wiki/Learn)页面。

## 参阅文档

- [包文档](https://golang.org/pkg/)
    - Go标准库文档
- [命令文档](https://golang.org/doc/cmd)
    - Go命令行工具文档
- [语言标准/规格](https://golang.org/ref/spec)
    - 官方Go语言标准
- [Go内存模型](https://golang.org/ref/mem)
- [发布历史](https://golang.org/doc/devel/release.html)
    - Go版本之间的变化摘要

## 相关文章

- Go官方的一些博客文档等
- [Articles](https://golang.org/doc/#articles)

## 谈论

- 主要一些youtube视频讲解
- [Talks](https://golang.org/doc/#talks)

## 非英文文档

- [非英文文档，包含中文](https://github.com/golang/go/wiki/NonEnglish)
