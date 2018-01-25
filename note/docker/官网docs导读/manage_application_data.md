
<!-- TOC -->

- [存储概要](#存储概要)
- [Volumes](#volumes)
- [Bind mounts](#bind-mounts)
- [tmpfs mounts](#tmpfs-mounts)
- [volume故障查找处理](#volume故障查找处理)
- [容器数据存储](#容器数据存储)
    - [存储驱动概要](#存储驱动概要)
    - [镜像、容器、存储驱动相关](#镜像容器存储驱动相关)
    - [选择一个存储驱动](#选择一个存储驱动)
    - [使用AUFS存储驱动](#使用aufs存储驱动)
    - [使用Btrfs存储驱动](#使用btrfs存储驱动)
    - [使用设备映射存储驱动](#使用设备映射存储驱动)
    - [使用OverlayFS存储驱动](#使用overlayfs存储驱动)
    - [使用 XFS存储驱动](#使用-xfs存储驱动)
- [使用VFS存储驱动](#使用vfs存储驱动)

<!-- /TOC -->

## 存储概要

1. 管理Docker中的数据
    - 将数据直接存储在容器的可写层是可以的，但是有几个缺点：
        1. 如果容器不再运行（remove），其中的数据不会保留，而且其内的数据想要移出容器，给其它进程共享比较困难
        2. 容器的可写层是和宿主机器紧密耦合在一起的，想要将数据转移到其它机器也不容易
        3. 将数据写入容器可写层，需要一个存储驱动去管理该文件系统。该存储驱动使用Linux内核提供了一个union filesystem。对比使用Data Volumes，使用这个抽象的文件系统降低了性能，使用Data Volumes会将数据直接写入到Host文件系统。
    - Docker提供了三种方法来将Host的数据挂载到容器当中：`volumes`、`bind mounts`、`tmpfs`。如果你犹豫不决的话，`volumes`通常是正确的选择。
2. 选择合适的数据挂载类型
    - 无论你选择哪种类型，在容器表现的形式都是一样的，以一个目录或单独文件在容器的文件系统上。
    - 一种区分`volumes`、`bind mounts`、`tmpfs`三种类型的简单的方法是：查看这三种类型在Host上的数据存储形式
        1. Volumes：存储在Host文件系统指定位置（/var/lib/docker/volumes），被Docker程序管理。非Docker进程不应该修改Host文件系统的这部分。Volumes是最佳的存储数据方式。
        2. Bind mounts：可以存储在Host文件系统的任何地方。甚至可以是重要的系统文件或目录。非Docker进程或Docker容器可以修改它们。
        3. tmpfs mounts：仅存储在Host的内存中，永远不会写入到Host文件系统中。
3. 挂载类型的更多细节
4. Volumes适用场景
5. Bind mounts适用场景
6. tmpfs mounts适用场景
7. 使用bind mounts或volumes的技巧提示
    - 如果挂载一个空的volume到容器指定目录，如果该目录下有内容，则其内容会copy到volume中。
    - 如果挂碍一个非空的volume到容器指定目录，如果该目录下有内容，则其内容会被volume中的文件遮蔽，被容器中遮蔽的文件没有被移除和修改，当挂载bind mounts或volumes时，被遮蔽的文件仅仅不能被访问而已。

## Volumes

1. 使用Volumes
    - 持续化容器产生和使用的数据，使用Volumes是较优的选择
    - bind mounts类型主要依赖Host机器的目录结构，而volumes完全是有Docker来管理。
    - Volumes比较bind mounts有以下几个优点：
        1. volumes比bind mounts更容易备份和迁移
        2. 你可以使用Docker命令行或Docker API来管理volumes
        3. volumes可以工作在Linux和Windows容器上
        4. volumes可以更加安全的被多个容器共享
        5. volume driver允许将volume存储在remote host或云上、允许加密voulume内容、或增加其它功能
        6. 一个新的空内容的volume可以被容器预先填充内容
    - 此外，容器使用volume不会增加容器的尺寸，volume的内容存储在Host上（/var/lib/docker/volumes/），其生命周期在容器之外
    - 如果容器会产生非持久化状态的数据，建议使用tmpfs mount去避免持久化这些数据，去避免将这些数据写入容器的可写层从而提高容器的性能。（容器内的数据尽量不要直接写入容器可写层）
    - "Volumes use rprivate bind propagation, and bind propagation is not configurable for volumes."
2. 选择`-v`或`--mount`选项
    - 起初，`-v`或`--volume`选项用于独立的容器，`--mount`选项用于swarm services。然而，从Docker 17.06版本开始，`--mount`也可以用于独立容器。
    - `--mount`选项更加精确、详细，而`-v`选项精简、可读性差一点，建议多使用前者，而且前者还可以指定volume driver。
    - **`-v`** 或 **`--volume`**：含有三部分，以冒号（:）隔开，这三部分有严格顺序
        1. 第一部分是volume的名字。如果volume是匿名的，该部分可省略
        2. 第二部分是指定容器内的地址作为挂载点
        3. 第三部分可选，逗号（,）分隔的列表，例如"ro"
    - **`--mount`**：包含多个键值对，以逗号（,）分隔，并且没有顺序要求，可读性更好
        - `<key>=<value>`
        - `type`：mount类型，值有："bind"、"volume"、"tmpfs"，默认是volume
        - `source`、`src`：值为volume名字，若volume匿名则该键值对省略
        - `destination`、`dst`、`target`：容器内挂载点路径
        - `readonly`：只读
        - `volume-opt`：xxx
3. `-v`和`--mount`行为区别
    - 与bind mounts相反，volumes所有选项指定，用-v或--mount均可实现
    - servers使用volumes，仅支持--mount选项
4. 创建和管理volumes

```sh
docker volume create my-vol
docker volume ls
docker volume inspect my-vol
docker volume rm my-vol
```

5. 使用volume来启动容器
    - 如果指定的volume不存在，启动容器时候会自动创建

```sh
docker run -id --name devtest --mount src=myvol2,dst=/data ubuntu
docker run -id --name devtest -v myvol2:/app ubuntu
```

6. 使用volume来启动service
7. 使用容器来填充volume内容
    - 即空的容器挂载到容器非空的目录，则该目录的内容会同步到volume
8. 使用只读read-only的volume
    - `readonly`
    - `ro`
```sh
docker run -id --name devtest --mount src=myvol2,dst=/data,readonly ubuntu
docker run -id --name devtest -v myvol2:/app:ro ubuntu
```
9. 使用volume驱动
    - 假设你有两个docker node资源，第一个是Docker Host，并且可以使用SSH连接第二个节点，以下给出示例
    - 如果需要指定额外参数`volume-opt`，则只能用`--mount`，用`-v`做不到

```sh
# 安装驱动插件
docker plugin install --grant-all-permissions vieux/sshfs

# 直接创建,并指定驱动和参数
docker volume create --driver vieux/sshfs \
  -o sshcmd=test@node2:/home/test \
  -o password=testpassword \
  sshvolume

# 在启动容器时，创建volume，并指定驱动和驱动参数
docker run -d \
  --name sshfs-container \
  --volume-driver vieux/sshfs \
  --mount src=sshvolume,target=/app,volume-opt=sshcmd=test@node2:/home/test,volume-opt=password=testpassword \
  nginx:latest
```
    
## Bind mounts

1. 使用bind mounts
    - bind的Host地址，必须是**绝对地址**
    - Host上绑定的文件或目录不需要事先存在，Docker会自动创建
    - bind mounts性能很好，但是比较依赖Host文件系统。
2. 选择`-v`或`--mount`选项
    - **`-v`** 或 **`--volume`**：含有三部分，以冒号（:）隔开，这三部分有严格顺序
        1. 第一部分是Host上被挂载的文件路径
        3. 第三部分可选，逗号（,）分隔的列表，例如ro, consistent, delegated, cached, z, and Z，详细在下面讨论
    - **`--mount`**：包含多个键值对，以逗号（,）分隔，并且没有顺序要求，可读性更好
        - `<key>=<value>`
        - `type`：mount类型，值有："bind"、"volume"、"tmpfs"，默认是volume
        - `source`、`src`：
        - `destination`、`dst`、`target`：
        - `readonly`：
        - `bind-propagation`：值有rprivate, private, rshared, shared, rslave, slave.
        - `consistency`：（仅作用于Mac电脑，其它平台忽略）值有consistent, delegated, or cached
        - > "The --mount flag does not support z or Z options for modifying selinux labels"
3. `-v`和`--mount`行为区别
    - -v和--mount选项在Docker之前的版本就存在了，其行为要兼容旧版本，不能改变。
    - 如果用-v绑定的地址Host上不存在，则Docker会自动创建
    - 如果用--mount绑定的地址Host上不存在，此时Docker不会创建，会亲切的报一个错误给你
4. 以bind mount启动容器
```sh
# -v
docker run -d \
  -it \
  --name devtest \
  -v "$(pwd)"/target:/app \
  nginx:latest

# --mount
docker run -d \
  -it \
  --name devtest \
  --mount type=bind,source="$(pwd)"/target,target=/app \
  nginx:latest
```
5. 挂载到容器的非空目录
    - 如果容器的挂载目录有内容，则其内容会被挂载遮蔽
    - 注意此情景
6. 使用只读bind mount
    - -v: ro
    - --mount：readonly
7. 配置bind propagation（暂略，待研究）
    - bind propagation对于volume和bind mount的类型默认值都是"rprivate"。仅在bind mount类型中可配置，而且仅在Linux Host上。
    - bind propagation是一个高级主题，许多用户从来没有必要配置它。
8. 配置selinux标签（暂略）
9. 在MacOS上配置挂载的一致性（暂略）
    

## tmpfs mounts

> 不是很清楚具体使用场景

1. 使用tmpfs mountfs
    - volume和bind mounts默认挂载到容器的文件系统中，且其数据存储到Host上。
    - 有一些场景是，你既不想把数据存储到Host上，又不想直接写到容器的可写层上，其中原因可能是为了性能或安全......，例如容器内应用创建、使用的一次性临时密码
    - tmpfs mount存储在Host的内存上。当容器停止式，tmpfs mount会被移除。如果容器被committed，tmpfs mount不会被保存。
2. 使用`--tmpfs`或`--mount`选项
    - （暂略，待研究）
3. tmpfs容器限制（暂略）
4. 在容器内使用tmpfs mount（暂略）
5. 指定tmpfs选项（暂略）

## volume故障查找处理

[官网地址](https://docs.docker.com/engine/admin/troubleshooting_volume_errors/#error-unable-to-remove-filesystem)

以下讨论，当使用Docker Volumes或bind mounts可能需要的错误

1. `Error: Unable to remove filesystem`

## 容器数据存储

### 存储驱动概要

1. 某些场景下，需要将数据写入容器的可写层，此时就需要**存储驱动（storage driver）**来作用了。
2. Docker自身就使用了一系列不同的存储驱动来管理存有镜像、运行的容器的文件系统。这些存储驱动，不同于Docker volume
3. Docker依赖驱动技术来管理镜像、运行容器的存储和交互等。


### 镜像、容器、存储驱动相关

为了高效的使用存储驱动，你必须了解Docker是如何构建和存储镜像的。

然后，你需要理解容器是如何使用这些镜像的。

最后，你需要对启动镜像和容器操作的技术进行简短的了解。

理解Docker如何管理镜像和容器内的数据，会帮助你更好的理解如何设计你的容器，以及避免性能问题等。

1. 镜像和层次
2. 容器和层次
3. 容器在硬盘上的尺寸
4. 写时拷贝策略
5. 数据卷和存储驱动

### 选择一个存储驱动

### 使用AUFS存储驱动

### 使用Btrfs存储驱动

### 使用设备映射存储驱动

### 使用OverlayFS存储驱动

### 使用 XFS存储驱动

## 使用VFS存储驱动

