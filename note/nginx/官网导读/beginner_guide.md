## 简介

此入门指南提供了nginx的基本介绍，描述了通过nginx能实现的一些简单的任务。具体有如下，
- 如何启动和停止nginx
- 如何加载nginx配置
- 介绍配置文件的结构
- 如何设置nginx来提供静态内容服务
- 如何配置nginx来提供代理服务
- 如何用FastCGI应用来连接nginx

nginx有一个master进程和若干worker进程。主进程的主要功能是读取配置文件和管理工作进程。工作进程负责处理请求。nginx基于事件模型并且能够根据操作系统的特性高效的利用worker进程处理请求。worker进程的数量在配置文件中定义，也可以通过指定的配置文件来定义其数量，或者自动根据CPU核心数确定其数量。

nginx以及相关模块的工作方式通过配置文件来指定。默认情况下，配置文件命名为nginx.conf，位于/usr/local/nginx/conf 或 /etc/nginx 或 /usr/local/etc/nginx 路径下。

## 启动，关闭nginx及重载配置文件

执行可执行文件来启动nginx。一旦nginx启动了，可以调用可执行命令(命令+参数)来控制，语法如下：  
> nginx -s signal

*signal*可选值如下：
- `stop` —— 快速关闭
- `quit` —— 平滑关闭
- `reload` —— 重新加载配置文件
- `reopen` —— 重新打开日志文件

例子：  

等待所有worker进程处理完当前的请求再关闭nginx，可以使用
> nginx -s quit  

> 执行该命令的用户必须和启动nginx的用户一致  

更改配置文件不会立即生效，除非执行重载配置命令或重新启动nginx，重载配置命令为：
> nginx -s reload  

一旦master进程接收到重载配置文件的信号，它首先会检查新的配置文件是否有语法错误，如果没有错误，master进程将会采用新的配置，并启动新的worker进程，同时通知旧的worker进程让他们停止工作。否则，若配置文件存在错误，那么master进程仍然使用旧的配置，并且旧的worker进程将继续保持工作。一旦master进程通知worker进程停止工作，worker进程首先会停止接收链接，然后处理完当前的所有请求，之后再exit，结束执行。   

除了 nginx 命令，像 Kill 等Unix工具命令也像nginx进程发送信号量。在此情况下，信号量直接发送给指定pid的进程。nginx主进程的pid默认存储在文件nginx.pid下，文件放置在目录/usr/local/nginx/logs或/var/run或/run下。例如，如果主进程pid是1628，欲nginx平滑关闭，可以发送QUIT信号量：

> kill -s QUIT 1628  

想要获取所有运行的nginx进程信息，可以执行 *ps* 命令：  

> ps -ax | grep nginx  

关于发送给nginx信号量更多的信息，见[Controlling nginx](http://nginx.org/en/docs/control.html)

## 配置文件结构

