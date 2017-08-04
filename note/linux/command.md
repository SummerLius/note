
<!-- TOC -->

- [seq](#seq)
- [pwd](#pwd)
- [dirname basename](#dirname-basename)
- [du df](#du-df)
- [openssl](#openssl)
- [openssh](#openssh)
- [env](#env)

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

使用ssh， scp和 sftp完成远程操作 。
使用ssh-add， ssh-keysign， ssh-keyscan和 ssh-keygen进行密钥管理 。
服务 端由sshd， sftp-server和 ssh-agent组成。


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
> 在当前用户环境下执行指定
> ```shell
> [env] node app.js
> ```
>
> 在当前用户环境下，增加几个变量，若有冲突，则覆盖已存在的
> ```shell
> [env] NODE_ENV=production NODE_PATH=xxx node app.js
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
