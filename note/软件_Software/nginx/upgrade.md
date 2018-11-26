<!-- TOC -->

- [nginx在线升级](#nginx在线升级)
    - [目前状况](#目前状况)
    - [升级步骤](#升级步骤)
    - [过程中遇到的错误](#过程中遇到的错误)
    - [附录](#附录)
    - [参考链接](#参考链接)

<!-- /TOC -->

# nginx在线升级

## 目前状况

- 拿外测服做测试，将nginx@1.13.12升级到nginx@1.14.1
- 目前服务是通过apt-get直接便捷安装的。对应的文件为
    - /usr/sbin/nginx*
    - /usr/lib/nginx
    - /etc/nginx
    - /etc/init.d/nginx*
    - ...
- 当前Nginx详细信息
    ```sh
    # nginx -V
    nginx version: nginx/1.13.12
    built by gcc 4.9.2 (Debian 4.9.2-10+deb8u1) 
    built with OpenSSL 1.0.1t  3 May 2016
    TLS SNI support enabled
    configure arguments:
        --prefix=/etc/nginx 
        --sbin-path=/usr/sbin/nginx 
        --modules-path=/usr/lib/nginx/modules 
        --conf-path=/etc/nginx/nginx.conf 
        --error-log-path=/var/log/nginx/error.log 
        --http-log-path=/var/log/nginx/access.log 
        --pid-path=/var/run/nginx.pid 
        --lock-path=/var/run/nginx.lock 
        --http-client-body-temp-path=/var/cache/nginx/client_temp 
        --http-proxy-temp-path=/var/cache/nginx/proxy_temp 
        --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp 
        --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp 
        --http-scgi-temp-path=/var/cache/nginx/scgi_temp 
        --user=nginx 
        --group=nginx 
        --with-compat 
        --with-file-aio 
        --with-threads 
        --with-http_addition_module 
        --with-http_auth_request_module 
        --with-http_dav_module 
        --with-http_flv_module 
        --with-http_gunzip_module 
        --with-http_gzip_static_module 
        --with-http_mp4_module 
        --with-http_random_index_module 
        --with-http_realip_module 
        --with-http_secure_link_module 
        --with-http_slice_module 
        --with-http_ssl_module 
        --with-http_stub_status_module 
        --with-http_sub_module 
        --with-http_v2_module 
        --with-mail 
        --with-mail_ssl_module 
        --with-stream 
        --with-stream_realip_module 
        --with-stream_ssl_module 
        --with-stream_ssl_preread_module 
        --with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -fPIC' 
        --with-ld-opt='-Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie'
    ```
- 如上，目前nginx版本带有这些参数，那么源码编译升级生成的nginx可执行文件也需要带上这些参数，保持一致

## 升级步骤

- 升级方式：
    - 源码编译：本文档使用该方法
    - apt-get：使用apt-get upgrade升级

```sh
# 安装相关必要环境（没有必要首先安装环境，直接编译nginx，在过程中提示缺什么再安装）

# >>> 安装编译c/c++等的环境
apt-get install build-essential
# >>> 安装pcre库
apt-get install libpcre3 libpcre3-dev
# >>> 安装openssl库
apt-get install libssl-dev

# 开始安装

# >>> 下载源码文件，并解压
wget http://nginx.org/download/nginx-1.14.1.tar.gz
tar -xzf nginx-1.14.1.tar.gz
cd nginx-1.14.1

# >>> 配置文件，会生成Makefile等相关文件
./configure <参数列表（使用"nginx -V"命令查看当前版本参数列表，复制到这里）>

# >>> 编译到本地，执行“make”命令（注意不要执行“make install”），执行后会在在objs/目录生成可执行文件nginx*
make

# >>> 备份旧版本nginx可执行文件
mv /usr/sbin/nginx /usr/sbin/nginx.old

# >>> 将新编译的nginx*文件，复制到/usr/sbin/目录
cp objs/nginx /usr/sbin/

# >>> 测试新版本nginx是否正常
/usr/sbin/nginx -V
/usr/sbin/nginx -t

# >>> 升级方法1，使用源码脚本，在上述./configure过程中生成的Makefile文件，自带有升级脚本。下面附录章节有详细脚本内容。
make upgrade
# >>> 升级方法2. 不是用脚本，自己可控的执行一条条命令。详细可以参考上面方法1中脚本和本文末尾参考链接。

# >>> 至此，升级完毕。
```

## 过程中遇到的错误

1. 缺少 C 编译环境
    - 错误提示
        ```sh
        root@debian:~/temp/nginx/nginx-1.14.1# ./configure 
        checking for OS
         + Linux 3.16.0-4-amd64 x86_64
        checking for C compiler ... not found

        ./configure: error: C compiler cc is not found
        ```
    - 解决方法
        ```sh
        apt-get install build-essential
        ```
2. 缺少PCRE库
    - 错误提示
        ```sh
        checking for PCRE library ... not found
        checking for PCRE library in /usr/local/ ... not found
        checking for PCRE library in /usr/include/pcre/ ... not found
        checking for PCRE library in /usr/pkg/ ... not found
        checking for PCRE library in /opt/local/ ... not found

        ./configure: error: the HTTP rewrite module requires the PCRE library.
        You can either disable the module by using --without-http_rewrite_module
        option, or install the PCRE library into the system, or build the PCRE library
        statically from the source with nginx by using --with-pcre=<path> option.
        ```
    - 解决方法
        ```sh
        apt-get install libpcre3 libpcre3-dev
        ```
3. 缺少zlib库
    - 错误提示
        ```sh
        checking for zlib library ... not found
        
        ./configure: error: the HTTP gzip module requires the zlib library.
        You can either disable the module by using --without-http_gzip_module
        option, or install the zlib library into the system, or build the zlib library
        statically from the source with nginx by using --with-zlib=<path> option.
        ```
    - 解决方法
        ```sh
        apt-get install --reinstall zlibc zlib1g zlib1g-dev
        ```
4. 缺少OpenSSL库
    - 错误提示
        ```sh
        checking for OpenSSL library ... not found
        checking for OpenSSL library in /usr/local/ ... not found
        checking for OpenSSL library in /usr/pkg/ ... not found
        checking for OpenSSL library in /opt/local/ ... not found
        
        ./configure: error: SSL modules require the OpenSSL library.
        You can either do not enable the modules, or install the OpenSSL library
        into the system, or build the OpenSSL library statically from the source
        with nginx by using --with-openssl=<path> option.
        ```
    - 解决方法
        ```sh
        apt-get install libssl-dev
        ```

## 附录

```sh

# 1. 下载源文件并解压
wget http://nginx.org/download/nginx-1.14.1.tar.gz
tar -xzf nginx-1.14.1.tar.gz

# 2. 查看文件
root@debian:~/temp/nginx# cd nginx-1.14.1/
root@debian:~/temp/nginx/nginx-1.14.1# l
total 756K
drwxr-xr-x 6 rsync rsync 4.0K Nov 26 10:51 auto/
-rw-r--r-- 1 rsync rsync 281K Nov  6 21:52 CHANGES
-rw-r--r-- 1 rsync rsync 428K Nov  6 21:52 CHANGES.ru
drwxr-xr-x 2 rsync rsync 4.0K Nov 26 10:51 conf/
-rwxr-xr-x 1 rsync rsync 2.5K Nov  6 21:52 configure*
drwxr-xr-x 4 rsync rsync 4.0K Nov 26 10:51 contrib/
drwxr-xr-x 2 rsync rsync 4.0K Nov 26 10:51 html/
-rw-r--r-- 1 rsync rsync 1.4K Nov  6 21:52 LICENSE
-rw-r--r-- 1 root  root    46 Nov 26 11:09 Makefile
drwxr-xr-x 2 rsync rsync 4.0K Nov 26 10:51 man/
drwxr-xr-x 2 root  root  4.0K Nov 26 11:09 objs/
-rw-r--r-- 1 rsync rsync   49 Nov  6 21:52 README
drwxr-xr-x 9 rsync rsync 4.0K Nov 26 10:51 src/

# 3. 配置编译文件
root@debian:~/temp/nginx/nginx-1.14.1# ./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-g -O2 -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -fPIC' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie'
checking for OS
 + Linux 3.16.0-4-amd64 x86_64
checking for C compiler ... found
 + using GNU C compiler
 + gcc version: 4.9.2 (Debian 4.9.2-10+deb8u1) 
checking for gcc -pipe switch ... found
checking for --with-ld-opt="-Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie" ... found
checking for -Wl,-E switch ... found
checking for gcc builtin atomic operations ... found
checking for C99 variadic macros ... found
checking for gcc variadic macros ... found
checking for gcc builtin 64 bit byteswap ... found
checking for unistd.h ... found
checking for inttypes.h ... found
checking for limits.h ... found
checking for sys/filio.h ... not found
checking for sys/param.h ... found
checking for sys/mount.h ... found
checking for sys/statvfs.h ... found
checking for crypt.h ... found
checking for Linux specific features
checking for epoll ... found
checking for EPOLLRDHUP ... found
checking for EPOLLEXCLUSIVE ... not found
checking for O_PATH ... found
checking for sendfile() ... found
checking for sendfile64() ... found
checking for sys/prctl.h ... found
checking for prctl(PR_SET_DUMPABLE) ... found
checking for prctl(PR_SET_KEEPCAPS) ... found
checking for capabilities ... found
checking for crypt_r() ... found
checking for sys/vfs.h ... found
checking for poll() ... found
checking for /dev/poll ... not found
checking for kqueue ... not found
checking for crypt() ... not found
checking for crypt() in libcrypt ... found
checking for F_READAHEAD ... not found
checking for posix_fadvise() ... found
checking for O_DIRECT ... found
checking for F_NOCACHE ... not found
checking for directio() ... not found
checking for statfs() ... found
checking for statvfs() ... found
checking for dlopen() ... not found
checking for dlopen() in libdl ... found
checking for sched_yield() ... found
checking for sched_setaffinity() ... found
checking for SO_SETFIB ... not found
checking for SO_REUSEPORT ... found
checking for SO_ACCEPTFILTER ... not found
checking for SO_BINDANY ... not found
checking for IP_TRANSPARENT ... found
checking for IP_BINDANY ... not found
checking for IP_BIND_ADDRESS_NO_PORT ... not found
checking for IP_RECVDSTADDR ... not found
checking for IP_SENDSRCADDR ... not found
checking for IP_PKTINFO ... found
checking for IPV6_RECVPKTINFO ... found
checking for TCP_DEFER_ACCEPT ... found
checking for TCP_KEEPIDLE ... found
checking for TCP_FASTOPEN ... found
checking for TCP_INFO ... found
checking for accept4() ... found
checking for kqueue AIO support ... not found
checking for Linux AIO support ... found
checking for int size ... 4 bytes
checking for long size ... 8 bytes
checking for long long size ... 8 bytes
checking for void * size ... 8 bytes
checking for uint32_t ... found
checking for uint64_t ... found
checking for sig_atomic_t ... found
checking for sig_atomic_t size ... 4 bytes
checking for socklen_t ... found
checking for in_addr_t ... found
checking for in_port_t ... found
checking for rlim_t ... found
checking for uintptr_t ... uintptr_t found
checking for system byte ordering ... little endian
checking for size_t size ... 8 bytes
checking for off_t size ... 8 bytes
checking for time_t size ... 8 bytes
checking for AF_INET6 ... found
checking for setproctitle() ... not found
checking for pread() ... found
checking for pwrite() ... found
checking for pwritev() ... found
checking for sys_nerr ... found
checking for localtime_r() ... found
checking for clock_gettime(CLOCK_MONOTONIC) ... found
checking for posix_memalign() ... found
checking for memalign() ... found
checking for mmap(MAP_ANON|MAP_SHARED) ... found
checking for mmap("/dev/zero", MAP_SHARED) ... found
checking for System V shared memory ... found
checking for POSIX semaphores ... not found
checking for POSIX semaphores in libpthread ... found
checking for struct msghdr.msg_control ... found
checking for ioctl(FIONBIO) ... found
checking for struct tm.tm_gmtoff ... found
checking for struct dirent.d_namlen ... not found
checking for struct dirent.d_type ... found
checking for sysconf(_SC_NPROCESSORS_ONLN) ... found
checking for sysconf(_SC_LEVEL1_DCACHE_LINESIZE) ... found
checking for openat(), fstatat() ... found
checking for getaddrinfo() ... found
checking for PCRE library ... found
checking for PCRE JIT support ... found
checking for OpenSSL library ... found
checking for zlib library ... found
creating objs/Makefile

Configuration summary
  + using threads
  + using system PCRE library
  + using system OpenSSL library
  + using system zlib library

  nginx path prefix: "/etc/nginx"
  nginx binary file: "/usr/sbin/nginx"
  nginx modules path: "/usr/lib/nginx/modules"
  nginx configuration prefix: "/etc/nginx"
  nginx configuration file: "/etc/nginx/nginx.conf"
  nginx pid file: "/var/run/nginx.pid"
  nginx error log file: "/var/log/nginx/error.log"
  nginx http access log file: "/var/log/nginx/access.log"
  nginx http client request body temporary files: "/var/cache/nginx/client_temp"
  nginx http proxy temporary files: "/var/cache/nginx/proxy_temp"
  nginx http fastcgi temporary files: "/var/cache/nginx/fastcgi_temp"
  nginx http uwsgi temporary files: "/var/cache/nginx/uwsgi_temp"
  nginx http scgi temporary files: "/var/cache/nginx/scgi_temp"


# 4. 查看文件列表
root@debian:~/temp/nginx/nginx-1.14.1# l
total 756K
drwxr-xr-x 6 rsync rsync 4.0K Nov 26 10:51 auto/
-rw-r--r-- 1 rsync rsync 281K Nov  6 21:52 CHANGES
-rw-r--r-- 1 rsync rsync 428K Nov  6 21:52 CHANGES.ru
drwxr-xr-x 2 rsync rsync 4.0K Nov 26 10:51 conf/
-rwxr-xr-x 1 rsync rsync 2.5K Nov  6 21:52 configure*
drwxr-xr-x 4 rsync rsync 4.0K Nov 26 10:51 contrib/
drwxr-xr-x 2 rsync rsync 4.0K Nov 26 10:51 html/
-rw-r--r-- 1 rsync rsync 1.4K Nov  6 21:52 LICENSE
-rw-r--r-- 1 root  root   376 Nov 26 11:55 Makefile
drwxr-xr-x 2 rsync rsync 4.0K Nov 26 10:51 man/
drwxr-xr-x 3 root  root  4.0K Nov 26 11:55 objs/
-rw-r--r-- 1 rsync rsync   49 Nov  6 21:52 README
drwxr-xr-x 9 rsync rsync 4.0K Nov 26 10:51 src/

# 5. 查看Makefile文件
root@debian:~/temp/nginx/nginx-1.14.1# cat Makefile 

default:	build

clean:
	rm -rf Makefile objs

build:
	$(MAKE) -f objs/Makefile

install:
	$(MAKE) -f objs/Makefile install

modules:
	$(MAKE) -f objs/Makefile modules

upgrade:
	/usr/local/nginx/sbin/nginx -t

	kill -USR2 `cat /usr/local/nginx/logs/nginx.pid`
	sleep 1
	test -f /usr/local/nginx/logs/nginx.pid.oldbin

	kill -QUIT `cat /usr/local/nginx/logs/nginx.pid.oldbin`

# 6. 编译
root@debian:~/temp/nginx/nginx-1.14.1# make
make -f objs/Makefile
make[1]: Entering directory '/root/temp/nginx/nginx-1.14.1'
cc -c -pipe  -O -W -Wall -Wpointer-arith -Wno-unused-parameter -Werror -g  -I src/core -I src/event -I src/event/modules -I src/os/unix -I objs \
	-o objs/src/core/nginx.o \
	src/core/nginx.c
...省略...
cc -o objs/nginx \
objs/src/core/nginx.o \
...省略...
sed -e "s|%%PREFIX%%|/etc/nginx|" \
	-e "s|%%PID_PATH%%|/var/run/nginx.pid|" \
	-e "s|%%CONF_PATH%%|/etc/nginx/nginx.conf|" \
	-e "s|%%ERROR_LOG_PATH%%|/var/log/nginx/error.log|" \
	< man/nginx.8 > objs/nginx.8
make[1]: Leaving directory '/root/temp/nginx/nginx-1.14.1'

# 7. 编译生成的nginx可执行，放在目录 objs/nginx*
# 8. 备份旧版本nginx可执行文件
mv /usr/sbin/nginx /usr/sbin/nginx.old

# 9. 将新编译的nginx*文件，复制到/usr/sbin/目录
cp objs/nginx /usr/sbin/

# 10. 测试新版本nginx是否正常
/usr/sbin/nginx -V
/usr/sbin/nginx -t

# 11. 源码自带的脚本升级
make upgrade

# 12. 升级完毕
```

## 参考链接

- https://www.digitalocean.com/community/tutorials/how-to-upgrade-nginx-in-place-without-dropping-client-connections
- http://blog.51cto.com/liqingbiao/1948430
- https://blog.csdn.net/huoyuanshen/article/details/52302214
- https://www.cnblogs.com/happlyp/p/6090409.html

