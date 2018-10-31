<!-- TOC -->

- [安装方式](#安装方式)
    - [安装建议](#安装建议)
    - [官网源码安装](#官网源码安装)
    - [apt-get方式安装](#apt-get方式安装)
    - [docker安装](#docker安装)

<!-- /TOC -->

# 安装方式

## 安装建议

1. 建议通过源码安装或Docker容器安装。
    - 两者都可以安装最新Redis版本
    - 两者都可以很容易的在本机安装多个Redis服务，尤其是源码安装中提供的`install_server.sh`工具
2. 官方没有提供apt-get源安装，第三方的apt源安装，Redis版本都不高

## 官网源码安装

- [官网下载地址](https://redis.io/download)
- 安装流程：
    1. 首先下载并解压到服务器上，并进入解压目录，执行make命令
        ```sh
        wget http://download.redis.io/releases/redis-5.0.0.tar.gz
        tar xzf redis-5.0.0.tar.gz
        cd redis-5.0.0
        make
        ```
    2. make命令gcc源码编译后，会在 redis-5.0.0/src/ 目录下生成6个可执行文件，分别如下
        ```
        redis-benchmark*
        redis-check-aof*
        redis-check-rdb*
        redis-cli*
        redis-sentinel*
        redis-server*
        ```
    3. 将上述编译生成的可执行文件，拷贝到 `/usr/bin/` 目录下
    4. 接下来就是配置和启动服务：在解压后的目录 `redis-5.0.0/utils/` 下，官方就提供了一些工具文件，其中 `redis-5.0.0/utils/install_server.sh` 脚本提供了服务的配置与运行的自动化，很方便，这就是我们要的执行的脚本文件。
    5. 执行`install_server.sh`文件，其是交互式的，依次让我们确定以下几项：
        - 端口：默认 6379
        - 配置文件：默认 /etc/redis/6379.conf
        - 日志文件：默认 /var/log/redis_6379.log
        - 数据目录：默认 /var/lib/redis/6379/
        - 可执行文件：默认 /var/bin/redis-server（该文件需要我们事先拷贝到该目录）
    6. `install_server.sh` 执行完后，会生成上述确定的文件，并运行redis服务
        - 生成 /etc/init.d/redis_6379 文件，可以作为系统服务
        - 生成 /etc/redis/6379.conf 配置文件
        - 生成 /var/log/redis_6379.log 日志文件
        - 生成 /var/lib/redis/6379/ 数据目录
    7. 至此端口6379的redis服务成功运行
    8. **安装多个redis服务**：从上面流程我们可以看到，通过 `install_server.sh` 脚本，我们可以很轻松的在本机安装多个redis服务，只需要指定不同的端口即可，其生产的配置、日志、数据等文件都是以端口号隔开，不会交错。

<!-- 首先[官网](https://redis.io/download)只提供了源码包xx.tar.gz的下载。

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

执行/redis-3.2.9/utils/下 install_server.sh脚本自动配置上面的东西，然后启动 -->

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


