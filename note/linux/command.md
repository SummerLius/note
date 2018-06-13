
<!-- TOC -->

- [seq](#seq)
- [pwd](#pwd)
- [dirname basename](#dirname-basename)
- [du df](#du-df)
- [openssl](#openssl)
- [openssh](#openssh)
- [env](#env)
- [cp](#cp)
- [tar](#tar)
- [uname](#uname)
- [hexdump、xxd、od](#hexdumpxxdod)
- [stat](#stat)
- [sudo](#sudo)
- [free](#free)
- [ulimit](#ulimit)
- [sysctl](#sysctl)
- [ss](#ss)
- [dig](#dig)
- [nmap](#nmap)
- [lsb_release](#lsb_release)
- [which、whereis](#whichwhereis)

<!-- /TOC -->


<hr>

#### seq

打印一串连续的数字

```shell
seq last
seq first last
seq first increment last

-s, --separator=String defalut: \n

seq 5 # 返回 1到5数字
```

<hr>

#### pwd

 显示当前目录  

 -P选项会跳过软连接显示实际目录，-L会保留软连接目录  

```shell
pwd -P
pwd -L
```

<hr>

#### dirname basename

路径处理

dirname 和 basename 只是对路径字符串进行处理，不会做实际文件路径的判断处理

```shell
dirname /a/b    --> /a
dirname ./c/d   --> ./c
basename /e/f.h --> f.h
basename -s .h /g/h.h   --> h

# 脚本中确定脚本所在的目录为工作目录，在脚步中执行代码
# 脚本中的参数0表示脚本相对执行目录的相对目录
cd $(dirname $0) || exit 0;
```

<hr>

#### du df

```shell
df -h

du -sh /xxx
du -h -d 0 /xxx
du -h -d 1 /xxx
du -h -d 2 /xxx
```

<hr>

#### openssl

[OpenSSL](https://www.openssl.org/)是一个开源项目，为传输层安全（TLS）和安全套接字层（SSL）协议提供了强大的商业级和全功能工具包。它也是通用加密库。


<hr>

#### openssh

[openSSH](http://www.openssh.com/)是使用SSH协议进行远程登录的首选连接工具。它加密所有流量，以消除窃听，连接劫持和其他攻击。此外，OpenSSH提供了一套安全的隧道功能，多种身份验证方法和复杂的配置选项。

OpenSSH套件包含以下工具：

- 使用ssh， scp和 sftp完成远程操作 。
- 使用ssh-add， ssh-keysign， ssh-keyscan和 ssh-keygen进行密钥管理 。
- 服务 端由sshd， sftp-server和 ssh-agent组成。


<hr>

#### env

env命令作用：
- 显示当前用户的环境变量
- 用来在指定环境中执行其他命令

> 显示用户环境变量列表
> ```shell
> env
> ```
>
> 用作脚本第一行，指定脚本执行的解释器
> ```shell
> #!/usr/bin/env node
> console.log(process.env);
> ```
> 
>
> 在当前用户环境下执行指定
> ```shell
> [env] node app.js
> >process.env => {xx:yy, ...}
> ```
>
> 在当前用户环境下，增加几个变量，若有冲突，则覆盖已存在的
> ```shell
> [env] NODE_ENV=production NODE_PATH=xxx node app.js
> >process.env => {xx:yy, ..., NODE_ENV: 'production',...}
> ```
>
> 参数 -i 或--ignore-environment，表示忽略当前环境变量;注意由于忽略当前环境变量，PATH变量也没有，node命令是找不到的，可以指定PATH或指定node全路径执行
> ```shell
> env -i /usr/local/bin/node app.js
> >process.env => {}
>
> env -i PATH=/usr/local/bin node app.js
> >process.env => {PATH: '/usr/local/bin'}
> ```
>

<hr>

#### cp

- -f：如果存在目标文件、文件夹不能打开，则直接删除，然后重新执行拷贝
- -r
- -d、-P、--no-dereference、--preserve=links：对于拷贝文件此参数会copy时会保留软链接；而拷贝整个目录时，目录下的软链接不加此参数，也会保留
- ...

**拷贝文件**

文件的拷贝，默认会**覆盖**已存在的同名的文件

1. 当Dest为目录则，将文件拷贝到该目录下，同名的则覆盖，Dest不存在则报错
2. 当Dest为文件时，则将Src文件覆盖Dest文件，Dest文件名不变，只是内容覆盖。指定的Dest文件所在的目录必须存在，否者报错，Dest文件存在时，Src文件内容覆盖，不存在时，将Src文件拷贝到目的目录，并命名为Dest文件名

```sh
cp /src/a.txt /dest/

cp /src/a.txt /dest/b.txt
```

**拷贝目录**

拷贝目录必须将上 -r 参数，目录拷贝默认里面的软链接快捷文件也是一成不变的拷贝。

假设Dest=目的地目录，Src=源目录，Dest要么不存在，存在只能为目录文件，否者报错  

`cp -rf Src/ Dest/`

若Dest已经存在，则将Src整个拷贝到Dest目录下，结果为Dest/src；若Dest不存在，则将Src拷贝到Dest所在的目录，然后改名为Dest

```sh
# dest 存在时

#   /
#   |--src
#   |--dest

cp -rf /src/ /Dest/

#   /
#   |--src
#   |--dest
#      |--src
```

```sh
# dest 不存在时

#   /
#   |--src
#      |--a.txt
#      |--b.txt

cp -rf /src/ /Dest/

#   /
#   |--src
#      |--a.txt
#      |--b.txt
#   |--des
#      |--a.txt
#      |--b.txt
```

<hr>

#### tar

`tar [功能参数][可选参数] 文件`

能处理的文件类型：
- .tar
- .tar.gz
- .tar.bz2
- .tar.Z
- .tar.xz

其它压缩则需要使用对应的压缩工具：
- .gz： gzip, gunzip
- .bz2：bzip2, bunzip2
- .Z：compress, uncompress
- .xz：xz, unxz
- .rar：rar, unrar
- .zip：zip, unzip

功能参数：只能选一
- -c, --create：创建打包tar文件
- -r, --append：向tar包中增加文件
- -t, --list：列出tar包中文件
- -u, --update：更新tar包中某个文件
- -x, --extract, --get：提取tar包中所有文件
- ...

```sh
tar -cf all.tar *.jpg

tar -rf all.tar *.gif

tar -uf all.tar logo.gif

tar -tf all.tar

tar -xf all.tar
```

可选参数：
- -f：tar包名，此参数似乎必须指定
- -C, --directory：指定解压问文件存放目录
- ...

```sh
tar -xf file.tar -C /temp/
```

压缩/解压缩可选参数：
- -z, --gzip, --gunzip, --ungzip
- -Z, --compress, --uncompress
- -j, --bzip2
- -J, --xz

```sh
# 解压举例

tar -xzf file.tar.gz
tar --gzip -xf file.tar.gz
tar --gunzip -xf file.tar.gz
tar --ungzip -xf file.tar.gz

tar -xZf file.tar.Z
tar --compress -xf file.tar.Z
tar --uncompress -xf file.tar.Z

tar -xjf file.tar.bz2
tar --bzip2 -xf file.tar.bz2

tar -xJf file.tar.xz
tar --xz -xf file.tar.xz

# 压缩举例

将上面 -x 换成 -c参数即可
```

<hr>

#### uname

Linux系统信息

- -a, --all
- -s：kernel name
- -n：network node hostname
- -r：kernel release
- -v: kernel version
- -m：machine hardware name
- -p：processor type
- -i：hardware platform
- -o：operating system
- --help：

<hr>

#### hexdump、xxd、od

```shell
hexdump -C file.txt
echo "abc" | hexdump -C

xxd -g1 file.txt
echo "abc" | xxd -g1
```

Windows上如果有安装git，git bash内置有xxd、od可以直接使用



  

<hr>

#### stat

查看文件相关属性信息的命令


```shell
  File: a
  Size: 11        	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 528397      Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/  summer)   Gid: ( 1000/  summer)
Access: 2017-08-29 19:24:33.702120239 +0800
Modify: 2017-08-29 19:24:31.830112762 +0800
Change: 2017-08-29 19:24:31.830112762 +0800
 Birth: -
```

<hr>

#### sudo

在ubuntu Linux下，需要操作root权限的命令时需要在前面加上sudo来改变权限，这样显得比较麻烦，不过也有解决方法：

> -s, --shell: run shell as the target user

`sudo -s` 或 `sudo -s -u root`

该命令会以root用户启动一个shell，这样就什么操作都可以执行了。


<hr>

#### free

<hr>

#### ulimit

<hr>

#### sysctl

<hr>

#### ss

<hr>

#### dig

<hr>

#### nmap

nmap、Aircrack-NG、Wireshark

#### lsb_release

打印系统版本信息

#### which、whereis

- which：定位command
- whereis：定位command的可执行二进制文件、源文件、man手册文件

whereis的功能更全一点

