
<!-- TOC -->

- [Linux启动类型](#linux启动类型)
- [Linux启动流程-sysVinit](#linux启动流程-sysvinit)
- [Linux启动流程-systemD](#linux启动流程-systemd)
- [开机启动服务设置](#开机启动服务设置)
- [临时链接](#临时链接)

<!-- /TOC -->

## Linux启动类型 

- systemd
- sysvinit
- bsd
- ...

systemd只适用于Linux，不适用unix。


Debain 8.0 Jessie开始以systemd取代sysvinit，之前的版本init的方式为sysvinit

systemd兼容SysV和LSB启动脚本。

## Linux启动流程-sysVinit

此处以Debian sysvinit启动为例。

## Linux启动流程-systemD

此处以Debian systemd启动为例。

## 开机启动服务设置

以sysVinit类型为例讲述。

<!-- - rcconf
- update-rc.d
- file-rc -->

开机启动服务即守护进程daemon涉及的目录或文件有：
- /etc/init.d/
- /etc/rc0.d/
- /etc/rc1.d/
- /etc/rc2.d/
- /etc/rc3.d/
- /etc/rc4.d/
- /etc/rc5.d/
- /etc/rc6.d/
- /etc/rcS.d/
- /etc/rc.local*

设置方式：
1. 直接编辑文件
2. 通过工具指令操作
    - update-rc.d
    - rcconf
    - file-rc
    - ...


## 临时链接

- https://wiki.archlinux.org/index.php/systemd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)
- http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html
- http://www.ruanyifeng.com/blog/2013/08/linux_boot_process.html
- http://www.debianadmin.com/manage-linux-init-or-startup-scripts.html
- http://www.debianadmin.com/remove-unwanted-startup-files-or-services-in-debian.html
