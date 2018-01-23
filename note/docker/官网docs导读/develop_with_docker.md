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
- https://deepzz.com/post/dockerfile-best-practices.html
- https://blog.fundebug.com/2017/05/15/write-excellent-dockerfile/



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

### Dockerfile手册

### 镜像管理

