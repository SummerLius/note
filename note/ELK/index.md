<!-- TOC -->

- [ELK](#elk)
    - [概要](#概要)
    - [Elasticsearch参考文档](#elasticsearch参考文档)
        - [ES安装](#es安装)
    - [Kibana用户指南](#kibana用户指南)
    - [参考](#参考)

<!-- /TOC -->

# ELK

## 概要

- [elastic公司产品列表](https://www.elastic.co/cn/products)：
    1. [Logstash](https://www.elastic.co/cn/products/logstash)
        - 作用：采集数据。
        - 组成：输入 + 过滤器 + 输出
        - 依赖环境：Java
    2. [Elasticsearch](https://www.elastic.co/cn/products/elasticsearch)
        - 作用：存储、搜索和分析数据
            - 查询：
                - es允许执行和合并多种类型的搜索——结构化、非结构化、地理位置、度量指标——搜索方式随心所欲。
            - 分析：
                - es聚合让你能够从大出着眼，探索数据的趋势和模式。
            - 速度：
                - es响应速度快
                - es通过有限状态机实现了，用于全文检索的倒排索引，实现了用于存储数值数据和位置数据的BKD树，以及用于分析的列存储。
                - 由于每个数据都被编入了索引，因此你再也不用因为某些数据没有索引而烦心，你可以用超快的速度使用和访问你的数据
            - 可扩展性：
                - 
        - 依赖环境：Java
        - 概述：
            - Elasticsearch是一个分布式的 RESTful 风格的搜索和数据分析引擎，能够解决不断涌现出的各种用例。作为elk的核心，它集中存储你的数据，帮助你发现意料之中以及意料之外的情况。
    3. [Kibana](https://www.elastic.co/cn/products/kibana)
        - 作用：将E中的数据可视化
    4. [Beats](https://www.elastic.co/cn/products/beats)
        - 作用：beats平台集合了多种单一用途的数据采集器。这些采集器安装后可用作轻量型代理，从成百上千或成千上万台机器像Logstash或Elasticsearch发送数据。
    5. [X-Pack](https://www.elastic.co/cn/products/x-pack)
        - 作用：

## Elasticsearch参考文档

**[ES参考](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)**
- [入门指南](#)
    1. [基本概念](#)
        - Near Realtime (NRT)
        - Cluster
        - Node
        - Index
        - Type (Deprecated in 6.0.0)
        - Document
        - Shards & Replicas
    2. [安装](#)
    3. [探查你的集群](#)
        -  前言：现在我们已经让我们的node或cluster跑起来了，下一步就是理解如何和它交流。幸运的是，ES提供了非常强大的REST API给我们来和ES交流使用。API提供的功能有以下：
            1. 检查、查看ES的集群、节点和索引的健康、状态、统计数据。
            2. 管理ES的集群、节点和索引数据、元数据。
            3. 对索引，执行CRUD（增加、读取、更新、删除）和搜索操作
            4. 执行高级的搜索操作，例如分页、排序、过滤、脚本处理、聚合等等其它操作
            5. ...
        1. [集群健康状态](#)
        2. [显示所有索引](#)
        3. [创建一个索引](#)
        4. [查询一个文档](#)
        5. [删除一个索引](#)
    4. [修改你的数据](#)
        1. [更新文档](#)
        2. [删除文档](#)
        3. [成批处理](#)
    5. [探查你的数据](#)
        1. [搜索API](#)
        2. [介绍查询语言](#)
        3. [执行搜索](#)
        4. [执行过滤](#)
        5. [执行聚合](#)
    6. [总结](#)
- [设置 Elasticsearch](#)
    1. [安装ES](#)
        1. 使用二进制压缩包
        2. 使用 Debian Packages
        3. 使用 RPM
        4. 使用 Windows MSI 安装程序
        5. 使用 Docker 安装
            - 镜像类型
                - basic：默认，预安装了x-pack和免费的licence，可以使用x-pack的基本功能
                - platinum：预安装了x-pack和30天期限的licence，可以使用x-pack全部功能
                - oss：没有安装x-pack
    2. [配置ES](#)
        1. [设置 JVM 选项](#)
            - 你应该很好频率的改动 JVM 选项。如果要改，最有可能是修改 `heap size` 设置。
            - 通过 "jvm.options" 配置文件是修改 JVM 设置选项较好的方式。
            - jvm.options 配置文件默认的位置为：
                1. 通过tar或zip压缩包安装：config/jvm.options
                2. 通过Debian或RPM包管理器安装：/etc/elasticsearch/jvm.options
            - jvm.options配置文件是行界定的，遵循以下语法：
                1. 只含有空白的行会被忽略
                2. 以 `#` 开头的行被当作注释忽略掉
                3. 以 `-` 开头的行会被当作jvm选项，不管安装的jvm是什么版本
                3. 以 `number:-` 开头的行会被当作jvm选项，如果安装的jvm版本和`number`相同的话
                4. 以 `number-:` 开头的行会被当作jvm选项，如果安装的jvm版本 >= `number`的话
                5. 以 `number-number:` 开头的行会被当作jvm选项，如果安装的jvm版本在这个两个`number`范围中
                6. 非以上格式的行，均会被拒绝
            - 你可以自定义jvm flags在jvm.options配置文件中，并在你的版本控制系统中检查该配置文件
            - 除了通过jvm.options配置文件指定jvm选项，还可以通过设置 `ES_JAVA_OPTS` 环境变量。例如：
                ```
                export ES_JAVA_OPTS="$ES_JAVA_OPTS -Djava.io.tmpdir=/path/to/temp/dir" ./bin/elasticsearch
                ```
        2. [安全设置](#)
            - 一些设置是敏感的，仅依赖文件系统的权限机制去保护其值是不够的。在这种情况下，Elasticsearch提供了一个 keystore 秘钥文件和 elasticsearch-keystore 工具来管理在keystore中的设置
            - > 注意：下面的所有命令的执行用户，应该和启动ES的用户一致
            - > 注意：只有部分设置项能从keystore中读取。可以查看文档，了解那些配置项被keystore所支持
            - > 注意：对于keystore中的修改，只有在重启ES后，才会生效
            - > 注意：当前ES keystore仅提供秘钥模糊处理，在未来版本，会添加密码保护
            - 创建keystore文件：
                1. 命令：bin/elasticsearch-keystore create
                2. 生成的 elasticsearch.keystore 文件会和 elasticsearch.yml 放在一起
            - 显示keystore文件中的所有设置：
                1. 命令：bin/elasticsearch-keystore list
            - 添加字符串设置
                1. 敏感的字符串设置，例如云插件的授权认证，可以添加在里面：bin/elasticsearch-keystore add the.setting.name.to.set，然后该命令会提示输入值，是交互式的
                2. 不想交互的输入值，可以使用 "--stdin"，从stdin写入值
                    ```
                    cat /file/containing/setting/value | bin/elasticsearch-keystore add --stdin the.setting.name.to.set
                    ```
            - 删除设置：
                1. 命令：bin/elasticsearch-keystore remove the.setting.name.to.remove
            - 该命令详细的使用可以使用命令去看：bin/elasticsearch-keystore --help （我猜）
        3. [日志配置](#)
            - 暂略，后续整理...
            - 主要操作 log4j2.properties 文件
    3. [重要的ES配置](#)
        1. [*path.data* 和 *path.logs*](#)
            - 如果你是以 zip 或 tar.gz 包文件安装，ES软件输出的data和logs目录也在解压出来的目录下。在正式环境下，最好不要使用这种路径，推荐的路径为：
                1. logs: /var/log/elasticsearch
                2. data: /var/data/elasticsearch
            - 如果以RPM或Debian包管理器安装ES软件，其已经使用了自定义的data和logs的路径
            - "path.data" 可以指定多个路径，每个路径下都会存储数据（但是同一个分片下的数据，会被放到同一个path下，不会拆分）
                ```
                path:
                    data:
                        - /mnt/es_1
                        - /mnt/es_2
                        - /mnt/es_3
                ```
        2. [*cluster.name*](#)
            - 一个node只能加入一个cluster，在这个cluster中，所有的node都使用这个相同的 *cluster.name* 名字
            - 默认的名字是 *elasticsearch*，但是你应该改为一个更适合的名字，例如：`cluster.name: logging-prod`
            - 确认在其它的环境中没有再使用这个相同的 *cluster.name* 名字，否则node会提示加入错误的cluter而终止
        3. [*node.name*](#)
            - 默认，ES会使用UUID的前7个字符作为node的ID
            - 注意，node ID是持久化的，不会因为ES重启而改变，因此默认的node name也不会改变
            - 最好，你也把 *node.name* 改为一个更有意义的名字，例如：`node.name: prod-data-1`，如果一台机器只运行一个ES实例的话，也可以把服务器的HOSTNAME作为node.name：`node.name: ${HOSTNAME}`
        4. [*network.host*](#)
            - 默认，es仅绑定回环地址：127.0.0.1
            - 为了和其它服务器上的node交流和组成一个聚群，你的node需要绑定非回环地址，例如：`network.host: 192.168.1.10`
            - 注意：如果你提供一个自定以的 *network.host* 值，ES会认为你以production模式启动（否则为development模式），然后ES会将一些ES启动时的系统检查要求，从warn级别升级到exception级别，即要求会严格一点。
        5. [Discovery 设置](#)
            - ES使用一个称为 “Zen Discovery”的定制的发现机制来实现node-to-node集群和主节点选举。
            - 在正式使用之前，这里有两个重要的discover设置项应该被配置
                1. discover.zen.ping.unicast.hosts
                    - 如果配置任何网络设置项的话，ES会绑定localhost地址，然后会扫描端口9300~9305，去尝试和本机运行的其它ES节点连接。在没有任何配置的情况下，这提供了一个自动集群化的体验。
                    - 但是如果本机的ES node要和其它服务器上的ES node建立联系的话，则必须提供一份像下面的配置
                        ```
                        discover.zen.ping.unicast.hosts:
                            - 192.168.1.10:9300
                            - 192.168.1.11 
                            - seeds.mydomain.com 
                        ```
                    - 给出的配置中，如果仅ip，没指定port，则默认会使用 *transport.profiles.default.port*，如果前者没有指定，则使用 *transport.tcp.port*
                    - 给出的配置中，如果是域名的话：A hostname that resolves to multiple IP addresses will try all resolved addresses.
                2. descovery.zen.minimum_master_nodes
                    - 为了阻止数据丢失，设置 *descovery.zen.minimum_master_nodes* 是必要的，这样每一个有资格选举为master的节点知道所有这种节点的最小数目，以便组成集群
                    - 如果没有配置该选项，一个集群可能由于网络不好，从而致使一个集群被划分为两个集群，从而致使数据丢失。[更多关于此的讨论，请点击](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html#split-brain)
                    - 为了避免集群的分裂，该设置项应该被设置为一个合适的值：`(master_eligible_nodes / 2) + 1`，例如，加入有3个有资格称为master的节点，此时该值应该设置为：`(3 / 2) + 1 or 2`，即`discovery.zen.minimum_master_nodes: 2`
        6. [设置heap大小](#)
            - 暂略...
        7. [JVM help dump path](#)
            - 目的：配置jvm崩溃时的异常文件输出路径
            - 通过RPM和Debian包管理其安装的ES，会自动将其JVM的oom异常文件保存到/var/lib/elasticsearch。
            - 手动更改，在jvm.options文件中配置：-XX:HeapDumpPath=/var/lib/elasticsearch
            - 注意，通过二进制包安装的ES，没有配置heap dump路径，JVM会将异常文件输出到ES运行的工作目录。最好配置，不使用默认的。
        8. [GC logging](#)
            - ES默认开启了GC日志。
            - 这些也可以在jvm.potions文件中配置，默认的gc日志位置和ES的logs一样（这个有待测试、观察）
    4. [重要的系统配置](#)
        - 理想情况下，一台服务器应该只运行一个ES程序，让其充分利用上面的资源。为了达到这样的目的，你应该配置你的系统，使其能够比默认的配置访问更多的资源。以下的一些设置使你在部署正式服必须考虑的：
            1. 关闭swapping
            2. 增加fd
            3. 确保足够的虚拟内存
            4. 确保足够的线程
            5. JVM dns 缓存设置
        - 开发模式和正式模式
            - 默认，es工作在开发模式，如果你没有正确配置上面的几个设置项，警告提醒将会写入日志，但是你仍然可以启动ES程序
            - 但是，只要你配置了ES的网络设置项，例如 *network.host*，es会认为工作在正式环境，并将警告提醒升级为异常，这些异常会阻止ES的正常启动。这是一个重要的安全措施，以确保不会因为服务器的问题而丢失数据。
        1. [系统设置项配置](#)
            - 到哪里配置系统设置，取决于你使用什么方式安装，以及你使用的什么操作系统
            - 当使用二进制包安装时，系统配置可以使用以下两种方式：
                1. 临时：`ulimit`
                2. 持久：`/etc/security/limits.conf`
            - 当使用RPM或Debian包管理器安装时，多数系统设置项可以在 “system configuration file” 文件中设置。
            - ulimit
                1. 在linux系统上，ulimit命令可以临时更改资源限制。ulimit资源限制的修改通常以root身份去设置，然后在切换到运行ES的用户执行ES。例如以下：
                    ```
                    su
                    ulimit -n 65536
                    su elasticsearch
                    ```
                2. ulimit命令修改的结果仅会在当前session中有效，所以是暂时、临时的，不是持久的
            - /etc/security/limits.conf
                1. 在linux系统上，可以编辑 /etc/security/limits.conf 文件来持久化设置某个用户的limits。
                2. 该文件的设置方法，可以打开该文件，里面的注释部分有讲解，这里给出个例子：`elasticsearch - nofile 65536`
                3. 该文件的改变，之后才会生效，当时不生效
            - Sysconfig file
            - Systemd configuration
        2. [禁用swapping](#)
            - 暂略
        3. [文件描述符](#)
            - ES会使用大量的fd，一旦用光fd数量，对es来说是灾难性的，可能会导致数据的丢失。所以，确保es打开文件数量的限制为65536或更高
            - root用户下使用命令ulimit -n 65536，或修改配置文件/etc/security/limits.conf
        4. [虚拟内存](#)
            - 默认，es使用 `mmapfs` 目录去存放它的索引，大多数系统默认对mmap的数量限制比较低，可能会导致内存溢出异常。
            - 在linux上，你可以扩大这个限制，`root: sysctl -w vm.max_map_count=262144`
            - 上面是临时的更改，想要持久化的修改，直接修改 /etc/sysctl.conf 文件里面的 vm.max_map_count 的值。并且可以通过 sysctl vm.max_map_count 来查看验证
        5. [线程数](#)
            - es会使用许多线程来执行不同的操作。确保es至少可以创建4096个线程。
            - ulimit -u 4096 或 /etc/security/limits.conf : nproc
        6. [dns缓存设置](#)
    5. [启动检查（Bootstrap Checks）](#)
        1. [](#)
        2. ...
    6. [停止ES](#)
- [版本重大更改](#)
    1. [6.0](#)
    2. [6.1](#)
    3. [6.2](#)
- ...
- ...

    <!--
        1. [](#)
        2. [](#)
        3. [](#)
        4. [](#)
        5. [](#) 
    -->

### ES安装

1. 安装Java 8 jre
    - 两个java环境源：
        1. sunJDK
            ```
            直接去oracle官网下jdk/jre的二进制包 或 配置apt source通过apt-get来下载安装
            ```
        2. openJDK
            ```sh
            直接去openJDK网站下载jdk/jre的二进制包 或 apt-get install openjdk-8-jre
            ```
2. 安装ES




## Kibana用户指南

- [介绍](#)
- [装配Kibana](#)
    1. [安装Kibana](#)
        - ".tar.gz" 二进制包安装
        - Debian包管理器安装
        - RPM包管理器安装
        - 在Windows上安装
    2. [配置Kibana](#)
        1. 配置Kibana
            - kibana从启动处读取 *kibana.yml* 配置文件。默认kibana是绑定 *localhost:5601* 运行的。根据需要你也可以配置的 *kibana.yml* 文件，可以开启SSL和设置其它的选项。
            - Kibana配置文件设置：
                - `console.enabled`
                - `...`
        2. 安全设置
    3. [Docker运行Kibana](#)
        1. 镜像类型
        2. 拉取镜像
        3. 配置Kibana
    4. [访问Kibana](#)
    5. [连接Kibana和Elasticsearch](#)
    6. [Using Kibana with Tribe nodes](#)
    7. [在正式环境使用Kibana](#)
    8. [升级Kibana](#)
- [装配X-Pack](#)
- [版本重要改变](#)
- [X-Pack重要改变](#)
- [新手入门](#)
- ...




## 参考

- [Elasticsearch: 权威指南](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html)
- [elastic 产品栈 指南、文档](https://www.elastic.co/guide/index.html)
- [Elasticsearch软件安装 硬件配置推荐](https://www.elastic.co/guide/cn/elasticsearch/guide/current/hardware.html#hardware)
- https://www.elastic.co/elk-stack
- https://www.tianmaying.com/tutorial/elastic-logstash-kibana
- http://blog.oldboyedu.com/elk/
- https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html
- https://www.elastic.co/guide/index.html
- https://www.elastic.co/cn/products
