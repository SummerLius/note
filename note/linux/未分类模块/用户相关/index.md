<!-- TOC -->

- [linux 用户相关](#linux-用户相关)
    - [相关概念](#相关概念)
    - [相关文件](#相关文件)
    - [相关命令](#相关命令)
    - [登录相关](#登录相关)
        - [登录情况](#登录情况)
        - [帐号密码登录](#帐号密码登录)
        - [秘钥登录](#秘钥登录)

<!-- /TOC -->

# linux 用户相关

## 相关概念

## 相关文件

- /etc/passwd
- /etc/shadow
- /etc/group

## 相关命令

- useradd
- usermod
- userdel
- groupadd
- groudmod
- groupdel
- passwd
- adduser
- ...

## 登录相关

### 登录情况

|/etc/shadow|ssh 帐号密码|ssh 公钥秘钥|su|
|:--:|:--:|:--:|:--:|
|2正常|y|y|y|
|2空|n||y|
|2:*|n|y|y|
|2:!|n|y|y|
|2:密码前加!，即锁住密码，即 `password -l`|n|y|y|
|8:帐号过期|n|n|y|
|5:当前密码过期 + 7:密码不活动时间过期|n|n|y|
|||||
|||||

### 帐号密码登录

```sh
ssh -l username 10.0.0.0 -p 22
```

### 秘钥登录

```sh
# 1. 如果不带任何参数，默认会生成一对公钥/秘钥在home目录下，~/.ssh/，id_rsa和id_rsa.pub
ssh-keygen

# 2. 在服务器上安装公钥，给ssh使用，一下命令在 ~/.ssh/目录下执行
cat id_rsa.pub >> authorized_keys

# 3. 设置ssh部分配置，保证能使用秘钥登录
#     编辑/etc/ssh/sshd_config 文件
RSAAuthentication yes
PubkeyAuthentication yes

#     允许root用户使用ssh登录
PermitRootLogin yes
#     禁用帐号密码登录
PasswordAuthentication no

#     禁止空密码
PermitEmptyPasswords no

# 4. 重启ssh服务
service sshd restart

# 5. 将秘钥放置在客户端，客户端利用一些ssh客户端登录，例如xshell   
```
