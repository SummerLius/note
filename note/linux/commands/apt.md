# apt

## 源

- ustc
    - http://mirrors.ustc.edu.cn/help
    - https://mirrors.ustc.edu.cn/repogen/

## 常见

```sh
apt-cache showpkg mysql-server
apt-cache show mysql-server
apt-cache search mysql-server

apt list --upgradable
apt-get autoremove

# 下两个升级指令不要随便用，会尝试升级所有的软件，这不是我们期望的
apt-get upgrade 
apt upgrade

# 这个升级指令后可以跟包名
aptitude [<options>...] {full-upgrade | safe-upgrade} [<packages>...]
aptitude safe-upgrade nginx=1.15.0-1~jessie
```