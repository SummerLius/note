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

nginx通过在配置文件中的特殊指令控制包含的模块。指令分为简单的指令和指令块。一个简单的指令，包括名称，并用空格隔开的参数，并以分号结束（;）。指令块具有和简单的指令相同的结构，但它是一组由括号包围的指令（{和}）。如果一个指令块 可包含引入其它指令块，则它被称为一个上下文（例如：events, http, server, and location）。

放置在配置文件中的任何上下文以外的指令都被认为是 main上下文。events和http 指令 写在 main 上下文中, server 写在 http, and location写在 server中.配置文件中＃符号开头的行被认为是注释。


## 提供静态内容

一个重要的网络服务器应用场景是输出静态文件（如图像或静态的HTML页面）。下面您将实现一个例子，其中，根据不同的请求，文件将被从不同的本地目录读取并提供服务：/data/www（包含HTML文件）和/data/images （包含影像）。这将需要编辑配置文件设置 一个 server 块 到 http块中,并在server块中配置两个 location 块.

首先，创建/data/www目录，并存入一个 index.html文件，接着创建/data/images目录，并存入一些图片。

接下来，打开配置文件。默认配置文件中已经包含了几个范例server模块。现在注释掉所有这些模块，并开始一个新的 server模块：

```
HTTP {
    server{
    }
}
```

一般地，配置文件可以包括若干server块,可以由它们的listen端口和server names区分。nginx通过请求头中的参数来测试匹配server指使块中的location

添加以下location块到 server模块：

```
location / {
    root /data/www;
}
```

此location块使用“ / “前缀与请求的URI进行比较。如果请求匹配，该URI将被添加到在指定的路径 root 指令，也就是到/data/www，以形成路径到本地文件系统上的所需的文件。如果有多个匹配的location块nginx的选择具有最长前缀。上面提供的location块是最短前缀长度之一，因此仅当所有其它位置 的块不能提供匹配，该块将被使用。

接着，添加第二个位置块：

```
location /images/ {
    root /data;
}
```

如果请求路径中包含/images/  则会对比两个规则块（location /也符合这样的要求，但具有更短的前缀不会被使用）。

对由此产生的配置server模块应该是这样的：

```
server {
    location / {
        root /data/www;
    }

    location /images/ {
        root /data;
    }
}
```

上面的配置已经是默认监听在端口80上，并在本地计算机上访问http：//localhost/已经可以工作了.如果URL请求中包含/images/，服务器会从/data/images目录发送文件。例如， http：//localhost/images/example.png请求,nginx将发送/data/images/example.png文件。如果这个文件不存在，nginx的将发送一个响应，指示404错误。请求的URI如果不是以/images/为开头,则将被映射到/data/www目录中。例如，http：//localhost/some/example.html请求,nginx将发送/data/www/some/example.html文件作为响应。

如果nginx已经启动,要让nginx应用新的配置，可以将reload信号给nginx的的主进程，执行：

> nginx -s reload  

如果启动时未能按预期正常工作，你可以通过/usr/local/nginx/logs或/var/log/nginx目录中的文件access.log和error.log 日志文件查看原因

## 设置一个简单的代理服务器

一个nginx的频繁的用途之一是将其设置为代理服务器，这意味着接收到的请求，并将它们传递到代理的服务器，检索来自它们的响应，并且将它们发送到客户端的服务器。

我们将配置一个基本的代理服务器，该服务器从本地目录提供图像请求服务，并发送所有其他请求至被代理服务器。在这个例子中，两个服务器都将在单一的nginx实例来定义。

首先，通过增加一个 定义代理服务器server 块,包含以下内容的nginx的配置文件：

```
server {
    listen 8080;
    root /data/ UP1;

    location / {
    }
}
```

这将是监听的端口8080（在标准80端口没有使用前,没有进行手动指定端口）并将所有请求映射到/data/UP1本地文件系统上的目录。创建该目录，并把index.html文件放入。注意，root指令放置在server上下文,这样的root指令用于,响应服务请求时location自己不包含root指令。

接下来，修改使用上一节的服务器的配置，使其成为代理服务器的配置。在第一个location块，配置 proxy_pass指令和参数,参数中指定的代理服务器的协议，名称和端口（在本例中，它是HTTP：//localhost：8080）：

```
server {
    location / {
        proxy_pass HTTP：//localhost：8080;
    }

    location /images/ {
        root /data
    }
}
```

我们将修改所述第二location 块，其目前映射/images/前缀请求 到文件/data/images目录，使之匹配指定的文件扩展名的图像请求。修改后的location块看起来像这样：

```
location ~ \.(GIF|JPG|PNG)$ {
    root /data/images;
}
```

该参数是一个正则表达式匹配结尾为 .gif，.JPG或.PNG的URI。正则表达式之前，应先用〜。相应的请求将被映射到/data/image 目录。

nginx在选择location 块时, 首先对URL进行前缀匹配,并选择一个最先的匹配成功的location，然后检查正则表达式。如果有一个正则表达式匹配，nginx则优先使用这个 location，否则使用之前记住的一个匹配成功的location。

代理服务器生成的配置看起来像这样：

```
server {
    location / {
        proxy_pass HTTP：//localhost：8080/l
    }

    location ~ \.(GIF|JPG|PNG)$ {
        root /data/images;
    }
}
```

此服务器会过滤结尾为.gif， .JPG或.PNG 的请求，并将它们映射到/data/images目录（ root指令指定的url参数），并转发所有其他请求到上述配置的代理服务器。

如前面章节所述,要应用新的配置，发送reload信号至nginx。

有许多更多 的指令可以被用来进一步配置一个代理连接。


## 设置FastCGI的代理功能

nginx的可用于将请求路由到运行内置的各种框架和编程语言，如PHP FastCGI的应用程序服务器。

最基本的nginx的配置工作，使用 fastcgi_pass 指令指定FastCGI的服务器，并且配置fastcgi_param 指令设置传递给FastCGI的服务器参数。假设FastCGI的服务器上访问localhost：9000。在上一节的代理配置基础上，更换proxy_pass指令为fastcgi_pass指令，改变参数为 localhost：9000。在PHP中，SCRIPT_FILENAME参数被用于确定该脚本名，并且QUERY_STRING 参数用于传递请求参数。所得的结构是：

```
server {
    location / {
        fastcgi_pass localhost:9000;
        fastcgi_param SCRIPT_FILENAME $ DOCUMENT_ROOT $ fastcgi_script_name;
        fastcgi_param QUERY_STRING $ QUERY_STRING;
    }

    location ~\ (GIF|JPG|PNG)$ {
        root /data/images;
    }
}
```
这将建立一个服务器，将路由代理服务器上除静态图像外的所有请求,通过FastCGI协议到 localhost：9000。
