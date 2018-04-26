<!-- TOC -->

- [/etc/group](#etcgroup)
    - [概要](#概要)
    - [文件格式](#文件格式)
    - [示例](#示例)
    - [链接](#链接)

<!-- /TOC -->

# /etc/group

## 概要

- */etc/group* 文件记录系统上的用户组信息。

## 文件格式

1. 格式
    - 4项
    - group_name:password:GID:user_list
    - 用户组名称:用户组密码:GID:用户列表
        1. group_name
        2. password
        3. GID
        4. user_list

## 示例

```
root:x:0:
daemon:x:1:
bin:x:2:
sys:x:3:
adm:x:4:
tty:x:5:
disk:x:6:
lp:x:7:
mail:x:8:
news:x:9:
uucp:x:10:
man:x:12:
proxy:x:13:
kmem:x:15:
dialout:x:20:
fax:x:21:
voice:x:22:
cdrom:x:24:
floppy:x:25:
tape:x:26:
sudo:x:27:
audio:x:29:
dip:x:30:
www-data:x:33:
backup:x:34:
```

## 链接

- [man7](http://man7.org/linux/man-pages/man5/group.5.html)