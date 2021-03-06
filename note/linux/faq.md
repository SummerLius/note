<!-- TOC -->

- [运行级别runlevel是什么？](#运行级别runlevel是什么)
- [Linux查看进程端口的占用？](#linux查看进程端口的占用)
- [console、terminal、shell之间的关系？](#consoleterminalshell之间的关系)

<!-- /TOC -->

## 运行级别runlevel是什么？

运行级别指的是Unix或Linux等类Unix操作系统下不同的运行模式。

运行级别通常分为7等，分别是0到6，但不仅限于此，有必要的话可以更多。

- 0：关机
- 1：单用户模式，无网络连接，不运行守护进程、不允许非超级用户登录
- 2：多用户，无网络连接，不运行守护进程
- 3：多用户，正常启动系统
- 4：未使用，保留，用户自定义
- 5：多用户，图形界面启动
- 6：重启

在全新的Linux systemd中使用target代替Runlevel，如multi-user.target相当于init 3，graphical.target相当于init 5，但是systemd仍然兼容运行级别Runlevel。目前绝大多数发行版已采用systemd代替UNIX System V。


## Linux查看进程端口的占用？

- lsof -i :80
- netstat -anp | grep :80


## console、terminal、shell之间的关系？

**console**  
一台电脑主机通常只有一个console（控制台），是主机设备的一部分，不需要连线，早期用来管理主机，只能给系统管理员使用。

**terminal**  
unix是单主机-多终端模式的多用户系统，每个用户连接主机的设备，叫Terminal终端。终端是一种输入输出设备，是一种抽象的设备概念总称，具体细化可以为，输入设备：键盘、鼠标、麦克风等；输出设备：显示器、扬声器等。

可以说：
- `计算机 = 主机 + 终端`
- `终端 = 输入设备 + 输出设备`


unix是多用户系统，那么每个用户通过terminal登录到主机，这种终端设备有多个，通过线路、网络等方式连接到主机上，和主机进行交互。

到这里，**终端是一种物理设备**，从前的用户也确实是操作这种终端设备，例如ASR33电传打字机（自带输入输出：键盘和纸张）。

随着时代的发展，电子屏、显示器等硬件的出现，终端也从纸张打印显示过渡到电子屏的显示，也从字符终端进步到图形终端。所以现在终端的类型有两种：
- 字符终端：只能接受和输出文本信息
- 图形终端：不仅接受和输出文本信息，还可以输出图形图像

现在的“终端”的概念有些变化，具体设计到Linux系统的设计，尤其/dev目录下文件，待研究一段事件Linux后再总结，看的头疼...

<!-- >这里指的"终端"和显示屏的关系是很紧密的，可以说是终端是显示器这个硬件设备的"驱动"、"协议"。DEC公司1978制造的型号为VT100的终端，由于设计良好，成为最流行的字符终端，并且为其它字符终端形成了标准。而图形终端也有一个标准，那就是X Window，它是大多数Unix-like系统GUI界面的基础。（这里可以说，linux下其它桌面环境kde、gnome、unity等是一种图形终端） -->

<!-- 硬件和软件的进步，终端的概念也有了变化：
- 之前的终端概念：物理设备，指的是用户使用的，输入输出设备的总称
- 目前的终端概念：

两种模拟终端程序：随着需求，Unix允许用户在自己的电脑上使用多个终端，其中1个是图形终端（ctrl+alt+F7）和6个字符终端（ctrl+alt+F1~F6），这7个终端使用同一个显示器和键盘。一般情况下启动Linux系统，图形界面自动启动，同时启动7个不同的终端模拟程序。这七个为虚拟控制台。1到6个为虚拟控制台，第7个为图形终端，用来运行GUI程序。
1. 终端窗口（Terminal Window）：
2. 虚拟控制台（Virtual Console）：  -->


**shell**  
几个概念之间交互关系：`用户 <==> 终端 <==> shell <==> Linux内核`  

终端只负责信息的输入输出，即键盘输入数据，显示屏显示数据，那么输入数据给谁，输出的数据又是由谁提供？没错，由shell负责，shell是一个命令解释器（也是一个程序），负责把终端输入的指令传递给内核，并将执行结果返回给终端显示。




- https://www.linuxdashen.com/%E4%BD%A0%E7%9C%9F%E7%9A%84%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%88%E7%AB%AF%E5%90%97%EF%BC%9F
- https://zh.wikipedia.org/zh-cn/%E7%B5%82%E7%AB%AF
- http://www.lijigang.com/blog/2016/02/17/shell,-terminal,-console%E5%8C%BA%E5%88%AB/
- https://segmentfault.com/a/1190000009082089
- https://en.wikipedia.org/wiki/Terminal
- http://blog.csdn.net/govago/article/details/8494760
- http://www.deansys.com/doc/ldd3/ch18.html
- http://www.linusakesson.net/programming/tty/
- https://wenku.baidu.com/view/50c9594f8762caaedc33d40e.html
- http://www.wowotech.net/tty_framework/tty_concept.html




