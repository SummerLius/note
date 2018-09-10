## 防火墙

这里仅讨论debian/ubuntu下的iptables防火墙。

iptables是debian linux内核的组件，不是一个服务或进程，所以也没有 "service iptalbes status" 这样的命令来查看或控制iptables组件。只有GNU提供的一些指令来控制`iptables` `iptables-save` `iptables-restore` `iptables-apply` `iptables-extensions`。

GNU常用指令：
- iptables
- iptables-save
- iptables-restore

当然，我们也可以自己写这样一个服务，通过GNU指令或调用系统接口来操作iptables组件。而且我也相信，在目前的Linux生态中，肯定已经存在这样的工具。

Debian下，就提供了这样一个工具：`iptables-persistent`，可以了解一下。

默认情况下，我们通过iptables命令对于防火墙表的修改都是直接改动到内核上，没有持久化到磁盘上，如果重启服务器那么防火墙所有的规则都会丢失。所以，我们必须使用其它工具或服务来管理或者自己提供一些指令、脚本或服务来管理。


### iptables

### iptables-save

### iptables-restore

## 常用命令

```sh
iptables -nvL --line-numbers

iptables -P INPUT DROP

iptables -D INPUT 95

iptables -A INPUT -s 0.0.0.0 -j ACCEPT
iptables -A INPUT -s 0.0.0.0 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -s 0.0.0.0 -p tcp -m tcp -m multiport --dports 80,443 -j ACCEPT

iptables-save > /etc/iptables/ipt_save.def
iptables-restore < /etc/iptables/ipt_save.def
```

## 参考链接

- https://segmentfault.com/a/1190000002540601
- https://wiki.debian.org/iptables
