<!-- TOC -->

- [安装方式](#安装方式)
    - [官网源码包(.tar.gz)的下载安装（官网没有提供二进制bin包）](#官网源码包targz的下载安装官网没有提供二进制bin包)
    - [apt-get方式安装](#apt-get方式安装)
    - [docker安装](#docker安装)

<!-- /TOC -->

# 安装方式

## 官网源码包(.tar.gz)的下载安装（官网没有提供二进制bin包）

首先[官网](https://redis.io/download)只提供了源码包xx.tar.gz的下载。

基于redis-3.2.9 安装流程如下：

1. 下载源码 wget，解压 tar，编译 make

![](../../assets/redis_source_make.png)

2. 配置redis程序

第一步源码编译后会在/redis-3.2.9/src/目录下生成6个可执行文件

![](../../assets/redis_bin.png)

**虽然得到了可执行程序，但是还需要一些配置，才能使redis正常的跑在Linux系统上**

- 配置开机启动脚本 /etc/init.d/redis-server

作用：一是开机启动，二是提供`service redis-server start|stop|restart|status`这样的快捷指令

- 配置path，使命令行中能识别上面6个可执行文件

Linux系统的PATH默认是"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"。

有两种方式配置path，一是将/redis-3.2.9添加到PATH后面，二是将bin文件拷贝到默认的PATH下面，一般放在"/usr/local/bin"或"/usr/bin"下面。

优先采用第二种配置PATH方式。

- 配置redis-server启动配置文件 /etc/redis/redis.conf

redis服务的启动尽量采用配置文件方式：  
`redis-server /etc/redis/redis.conf`

在配置文件再进行redis-server程序运行时的详细配置。

源码根目录下/redis-3.2.9/下有官方提供的redis.conf参考文件。

- 增加用户和用户组redis，以redis用户启动redis-server

- **自动化配置**

执行/redis-3.2.9/utils/下 install_server.sh脚本自动配置上面的东西，然后启动

## apt-get方式安装

- apt-get install redis-server
- 但是一般apt原redis-server的版本较低，所以需要配置其它源
    1. ubuntu
        - [ppa](https://launchpad.net/)
            ```sh
            apt-get install software-properties-common python-software-properties
            add-apt-repository ppa:chris-lea/redis-server
            apt-get update
            apt-get install redis-server
            ```
    2. debian
        - [Dotdeb](https://www.dotdeb.org/)
            ```sh
            # 添加一个dotdeb.list的apit源文件
            /etc/apt/sources.list.d/dotdeb.list
            
            # 原地址
            deb http://packages.dotdeb.org jessie all
            deb-src http://packages.dotdeb.org jessie all

            # 国内镜像地址
            deb http://mirror.xtom.com.hk/dotdeb/ jessie all
            deb-src http://mirror.xtom.com.hk/dotdeb/ jessie all


            wget https://www.dotdeb.org/dotdeb.gpg
            apt-key add dotdeb.gpg

            apt-get update
            apt-get install redis-server
            ```
        - 参考：
            - https://www.linode.com/docs/databases/redis/how-to-install-a-redis-server-on-ubuntu-or-debian8/
            - https://www.hugeserver.com/kb/install-redis-debian-ubuntu/

## docker安装


