
<!-- TOC -->

- [基本处理](#基本处理)
    - [概要](#概要)
    - [配置、运行Docker](#配置运行docker)
    - [Collect Docker metrics with Prometheus](#collect-docker-metrics-with-prometheus)
    - [自动启动容器](#自动启动容器)
    - [限制容器资源](#限制容器资源)
    - [应用自定义元数据](#应用自定义元数据)
    - [清除未使用的Docker对象](#清除未使用的docker对象)
    - [当守护进程停工时保持容器存活](#当守护进程停工时保持容器存活)
    - [控制、配置Docker](#控制配置docker)
    - [格式化指令和日志输出](#格式化指令和日志输出)
    - [运行一个本地注册服务mirror](#运行一个本地注册服务mirror)
- [日志](#日志)
- [安全](#安全)
- [使应用具有伸缩性、扩展性](#使应用具有伸缩性扩展性)
- [Docker延伸知识](#docker延伸知识)

<!-- /TOC -->

## 基本处理

### 概要

- 开发和设计你的应用
- 存储你的数据
- 使你的app在正式环境中更加灵活、安全、稳定

### 配置、运行Docker

成功安装、启动Docker后，`dockerd`守护进程是以其默认的配置运行。

此章节主要讲述如何自定义配置、手动启动守护进程、故障寻找、debug等。

1. 利用系统工具启动dockerd守护进程
    - [安装Docker](https://docs.docker.com/engine/installation/)
    - [系统初始化时，配置Docker启动](https://docs.docker.com/engine/installation/linux/linux-postinstall/#configure-docker-to-start-on-boot)
2. 手动启动守护进程
    - 一般下，我们应该使用系统公共工具来启动Docker。
    - 为了debug目的，我们可以使用`dockerd`命令来手动启动Docker。当你以此方式启动Docker，它在shell前台运行，而且会直接将logs输出到shell终端。可以`ctrl + c`终止。
3. 配置Docker守护进程
    - `dockerd`守护进程包含许多配置选项，你可以直接在`dockerd`命令后指定，也可以在文件/etc/docker/daemon.json中配置。
    - `dockerd --help`命令查看配置选项
    - 其它配置选项讨论：
        - Automatically start containers
        - Limit a container’s resources
        - Configure storage drivers
        - Container security
```sh
# 命令行指定配置选项
dockerd -D --tls=true --tlscert=/var/docker/server.pem --tlskey=/var/docker/serverkey.pem -H tcp://192.168.59.3:2376

# 文件配置
{
  "debug": true,
  "tls": true,
  "tlscert": "/var/docker/server.pem",
  "tlskey": "/var/docker/serverkey.pem",
  "hosts": ["tcp://192.168.59.3:2376"]
}
```
4. 略
5. 略...

### Collect Docker metrics with Prometheus

利用Prometheus监控平台监控Docker

### 自动启动容器

### 限制容器资源

### 应用自定义元数据

### 清除未使用的Docker对象

### 当守护进程停工时保持容器存活

### 控制、配置Docker

### 格式化指令和日志输出

### 运行一个本地注册服务mirror

## 日志

## 安全

## 使应用具有伸缩性、扩展性

## Docker延伸知识


