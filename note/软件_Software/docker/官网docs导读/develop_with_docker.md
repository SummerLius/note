<!-- TOC -->

- [应用开发最佳实践](#应用开发最佳实践)
- [镜像相关](#镜像相关)
    - [Dockerfile最佳实践](#dockerfile最佳实践)
    - [创建基础镜像](#创建基础镜像)
    - [多阶段构建镜像](#多阶段构建镜像)
    - [Dockerfile手册](#dockerfile手册)
    - [镜像管理](#镜像管理)

<!-- /TOC -->


## 应用开发最佳实践

- 如何使镜像体积小
- 如何存储应用的数据
- 可能的话使用swarm services
- 使用 CI/CD 来测试和部署
- development和production环境的区别


## 镜像相关

### Dockerfile最佳实践

给个其他人博客地址：
- [地址1](https://deepzz.com/post/dockerfile-best-practices.html)
- [地址2](https://blog.fundebug.com/2017/05/15/write-excellent-dockerfile/)



<!-- - 大体指南和建议
    - 容器应该是ephemeral
    - 使用.dockerignore文件
    - 使用multi-stage builds
        - 如果Docker版本是17.05以上，那么可以使用multi-stage builds功能
        - 使用该功能可以大幅减小最后构建镜像的尺寸，不需要在构建过程中，想尽办法来减少的中间层或移除中间文件。
        - 镜像在最后阶段才会被构建，你可以利用build cache和减少image层次来尽量缩短build时间
        - 你的构建阶段可能包含几个层次，以修改频繁情况由少到多排序：
            1. 安装构建我们应用的必需工具
            2. 安装或更新应用依赖库
            3. 生成我们的应用
    - 避免安装没用的软件包
    - 每个容器应该只做一件事（也就是，只跑一个进程或一类进程）
    - 减小层次（minimize the number of layers）
    - 排序多行参数
        - apt-get update && apt-get install -y bzr cvs git vim // 一次性安装多个软件，并按照字母排序
    - Build cache
        - 构建镜像时，如果有需要image时，会先到cache中寻找，直接重用，如果不想使用可以docker build --no-cache=true
        - 使用Docker cache，你有必要知道docker什么时候寻找/不寻找匹配的镜像，下面是大概规则：xxx
- The Dockerfile instructions
    - from
    - lable
    - run
    - cmd
    - expose
    - env
    - add or copy
    - entrypoint
    - volume
    - user
    - workdir
    - onbuild -->

### 创建基础镜像

- 使用tar文件创建完成镜像，使用docker import
- 使用scratch镜像创建一个简单的镜像，在Dockerfile中指定FROM scratch

### 多阶段构建镜像

- [官网地址](https://docs.docker.com/engine/userguide/eng-image/multistage-build/#use-multi-stage-builds)
- [其它博客1](https://segmentfault.com/a/1190000009069842)
- [其它博客2](http://blog.csdn.net/fundebug/article/details/71084336)

Multi-stage builds是Docker 17.05或更高版本提供的新特性。

方便优化Dockerfile，使其易读、易维护。

- 多阶段构建前了解
    - 构建镜像最大的挑战之一就是保持镜像尺寸小。每个Dockerfile指令会给镜像添加一层，我们需要在每一层（每个指令）清除我们不需要的文件。
    - 欲要构建真正高效的镜像，可能需要会使用shell技巧和其它逻辑处理，来使镜像层次尽可能的少，使每一层不产生冗余文件，仅生成必需的依赖文件。
    <!--
      通常情况下，我们给开发环境维护一个Dockerfile，里面可以包含各种需要的依赖、构建等文件；然后给正式环境又维护一个精简瘦身的 Dockerfile，里面仅含有运行应用需要的依赖文件。
      但是维护维护两份Dockerfile不是很理想，`Dockerfile.build` `Dockerfile`。
     -->
- 使用多阶段构建
    - 该特性，使你可以多次使用 `FROM` 指令。
    - 每次`from`指令可以引入不同的镜像，并且每次他们在新阶段上构建（？这里不是很理解）
    - 你可以选择性的将文件从一个镜像阶段赋值到另外一个镜像阶段，同时在最后一个镜像阶段不会保留前面镜像阶段的文件，除非手动copy --from
    - 假如一个Dockerfile文件，引入两个From指令，前者`From golang as builder`，后者`FROM alpine：latest`，最后一个FROM生成最终镜像，并且不会包含前者FROM产生的文件，后者From可以使用copy --from=builder 指令来获取前者From中的有用的文件。这样多阶段build可以完成复杂的逻辑，并且最后镜像不会臃肿。

### Dockerfile手册

### 镜像管理

