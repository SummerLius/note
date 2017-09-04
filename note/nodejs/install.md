## 服务器nodejs安装

这里显示两种安装方法

### 源码编译安装

安装指令如下：

```sh
wget https://nodejs.org/download/release/v8.0.0/node-v8.0.0.tar.gz
tar -zxf node-v8.0.0.tar.gz
cd node-v8.0.0.tar.gz
./configure
make
make install
```

过程可能会比较慢，而且gcc编译过程中可能、有可能会出现意料之外的惊喜（ERROR），不过这种安装会自动化将各个文件放在指定目录

### 编译好的二进制包安装

二进制包，就是官方已经编译好的可执行文件，直接下载下来，解压就行，然后将自己将bin文件放在指定目录。

如果不清楚该如何放在什么目录，可以当前目录下安装`npm install n -g`，然后通过包管理工具`n`来管理安装`node`程序，`n`会自动化安装node服务


规范化的安装路径为：

![node_install_path.png](../../assets/node_install_path.png)

手动将文件copy到指定目录：

下载到的软件包里面的目录结构为：
![node_install_path.png](../../assets/node_bin_dir.png)

那么很清晰了，接下来做的也很简单粗暴有效，一一对应就好
- `bin` 目录下所有文件copy到/usr/local/bin下
- `include` 目录下所有文件copy到/usr/local/include下（可选）
- `lib` 目录下所有文件copy到/usr/local/lib下
- `share` 目录下所有文件copy到/usr/local/share（可选）

```sh
wget https://nodejs.org/download/release/v8.2.0/node-v8.2.0-linux-x64.tar.xz
tar -xJf node-v8.2.0-linux-x64.tar.xz

cp -rf node-v8.2.0-linux-x64/bin/* /usr/local/bin/
cp -rf node-v8.2.0-linux-x64/lib/* /usr/local/lib/

或

cp -rf node-v8.2.0-linux-x64/* /usr/local/

# 就这样，done
```
