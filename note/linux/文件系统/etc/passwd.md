<!-- TOC -->

- [/etc/passwd](#etcpasswd)
    - [概要](#概要)
    - [文件格式](#文件格式)
    - [示例](#示例)
    - [链接](#链接)

<!-- /TOC -->

# /etc/passwd

## 概要

- */etc/passwd* 文件主要记录系统的登录帐号信息。
- 其可被所有用户读取，仅可被超级用户写入


## 文件格式

1. 格式
    - 7个项
    - name:password:UID:GID:GECOS:derectory:shell
    - 用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell
        1. name
            - 用户登录名
            - 不应该含有大写字母
        2. password
            - 此处要么是加密的用户密码，要么是星号*，要么是字母x
            - 如果是字母x，表示加密的密码保存在 */etc/shadow* 文件中
        3. UID
            - 用户id
            - root帐号的ID为 0
        4. GID
            - 用户组ID
        5. GECOS
            - 该项是可选的，仅用于存储其它信息
            - 通常其包含用户全名
            - “General Electric Comprehensive Operating System”
        6. directory
            - 用户的home目录
        7. shell
            - 用户登录的时候，运行的程序

## 示例

```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/bin/sh
bin:x:2:2:bin:/bin:/bin/sh
sys:x:3:3:sys:/dev:/bin/sh
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/bin/sh
man:x:6:12:man:/var/cache/man:/bin/sh
lp:x:7:7:lp:/var/spool/lpd:/bin/sh
mail:x:8:8:mail:/var/mail:/bin/sh
news:x:9:9:news:/var/spool/news:/bin/sh
uucp:x:10:10:uucp:/var/spool/uucp:/bin/sh
proxy:x:13:13:proxy:/bin:/bin/sh
www-data:x:33:33:www-data:/var/www:/bin/sh
backup:x:34:34:backup:/var/backups:/bin/sh
list:x:38:38:Mailing List Manager:/var/list:/bin/sh
irc:x:39:39:ircd:/var/run/ircd:/bin/sh
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/bin/sh
nobody:x:65534:65534:nobody:/nonexistent:/bin/sh
libuuid:x:100:101::/var/lib/libuuid:/bin/sh
Debian-exim:x:101:103::/var/spool/exim4:/bin/false
statd:x:102:65534::/var/lib/nfs:/bin/false
sshd:x:103:65534::/var/run/sshd:/usr/sbin/nologin
class:x:1000:1000::/home/class:/bin/bash
```

## 链接

- [man7](http://man7.org/linux/man-pages/man5/passwd.5.html)

