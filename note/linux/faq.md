<!-- TOC -->

- [运行级别runlevel是什么？](#运行级别runlevel是什么)

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