<!-- TOC -->

- [如何使用go编程](#如何使用go编程)
    - [引言](#引言)
    - [代码的组织](#代码的组织)
        - [概述](#概述)
        - [工作空间](#工作空间)
        - [GOPATH环境变量](#gopath环境变量)
        - [导入路径](#导入路径)
        - [你的第一个程序](#你的第一个程序)
        - [你的第一个库](#你的第一个库)
        - [包名](#包名)
    - [测试](#测试)
    - [远程包](#远程包)
    - [接下来做什么](#接下来做什么)
    - [获取帮助](#获取帮助)

<!-- /TOC -->

# 如何使用go编程

- [官方 英文](https://golang.org/doc/code.html)
- [官方 中文](https://go-zh.org/doc/code.html)

## 引言

- 本文档展示了一个简单Go包的开发，并介绍了用[go工具](https://golang.org/cmd/go/)来获取、 构建并安装Go包及命令的标准方式。
- go 工具需要你按照指定的方式来组织代码。请仔细阅读本文档， 它说明了如何以最简单的方式来准备并运行你的Go安装。
- 类似的视频讲解可在[此处](https://www.youtube.com/watch?v=XCsL89YtqCs)观看。

## 代码的组织

### 概述

- Go程序员通常会将所有Go代码保存在一个工作区中。
- 工作空间包含许多版本控制存储库（例如，由Git管理）。
- 每个存储库包含一个或多个包。
- 每个包由一个目录中的一个或多个Go源文件组成。
- 包目录的路径确定其导入路径。

### 工作空间

- 一个工作空间是目录，里面含有两个目录：
    1. `src/`，含有Go源文件
    2. `bin/`，含有可执行命令
- go 工具用于构建源码包，并将其生成的二进制文件安装到 pkg 和 bin 目录中。
- src 子目录通常包会含多种版本控制的代码仓库（例如Git或Mercurial）， 以此来跟踪一个或多个源码包的开发。
- 以下例子展现了实践中工作空间的概念：
    ```
    bin/
        hello                          # command executable
        outyet                         # command executable
    src/
        github.com/golang/example/
            .git/                      # Git repository metadata
    	hello/
    	    hello.go               # command source
    	outyet/
    	    main.go                # command source
    	    main_test.go           # test source
    	stringutil/
    	    reverse.go             # package source
    	    reverse_test.go        # test source
        golang.org/x/image/
            .git/                      # Git repository metadata
    	bmp/
    	    reader.go              # package source
    	    writer.go              # package source
        ... (many more repositories and packages omitted) ...
    ```
- 上面这个工作空间含有两个仓库（example和image）。
- 一个典型的工作空间含有多个仓库，每个仓库又含有多个包和命令。绝大多数Go程序员将他们的go源码和其依赖置于一个工作空间中。
- 注意工作空间内不要使用软链接来引用文件或目录。


### GOPATH环境变量

- `gopath` 环境变量指定了你工作空间的位置。该变量默认的地址为是Home目录，例如
    - 在unix上为，`$HOME/go`，例如 `/root/go`
    - 在windows上为，`%USERPROFILE%\go`，例如 `C:\Users\YourName\go`
- `gopath` 可以设置为任何目录，改变此环境变量就好，但是注意，**它绝对不能和你的Go安装目录相同**。
- 命令 `go env GOPATH` 可以打印当前有效的该环境变量值。
- 作为约定，请将此工作空间中的 "bin/" 目录添加到环境变量 `path` 中。
- 命令 `go help gopath`，查看更多 

### 导入路径

- 导入路径是唯一标识包的字符串。 包的导入路径对应于其在工作空间内或远程存储库中的位置（如下所述）。
- 标准库中的包有给定的短路径，比如 "fmt" 和 "net/http"。 对于你自己的包，你必须选择一个基本路径，来保证它不会与将来添加到标准库， 或其它扩展库中的包相冲突。
- 如果你将你的代码放到了某处的源码库，那就应当使用该源码库的根目录作为你的基本路径。 例如，若你在 GitHub 上有账户 github.com/user 那么它就应该是你的基本路径。
- 注意，在你能构建这些代码之前，无需将其公布到远程代码库上。只是若你某天会发布它， 这会是个好习惯。在实践中，你可以选择任何路径名，只要它对于标准库和更大的Go生态系统来说， 是唯一的就行。
- 我们将使用 github.com/user 作为基本路径。在你的工作空间里创建一个目录， 我们将源码存放到其中：`mkdir -p $GOPATH/src/github.com/user`


### 你的第一个程序



### 你的第一个库

### 包名

## 测试

## 远程包

## 接下来做什么

## 获取帮助


