
## nginx安装

- 在线安装
    - debian/ubuntu下apt包安装
    - RHEL/CentOS下yum包安装
- 源码编译安装

## apt在线安装

官网指导安装：http://nginx.org/en/linux_packages.html

```bash
1. 添加key
    - wget http://nginx.org/keys/nginx_signing.key
    - sudo apt-key add nginx_signing.key

2. 编辑/etc/apt/sources.list文件
    - debian
        - deb http://nginx.org/packages/mainline/debian/ `codename` nginx
        - deb-src http://nginx.org/packages/mainline/debian/ `codename` nginx
    - ubuntu
        - deb http://nginx.org/packages/mainline/ubuntu/ `codename` nginx
        - deb-src http://nginx.org/packages/mainline/ubuntu/ `codename` nginx

3. apt安装
    - apt-get update
    - apt-get install nginx
```

## 源码编译

待定

## 安装后文件位置

- /usr/sbin/nginx
