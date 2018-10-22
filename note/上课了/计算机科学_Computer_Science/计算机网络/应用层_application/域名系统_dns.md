<!-- TOC -->

- [DNS](#dns)
    - [提问？](#提问)
    - [概述](#概述)

<!-- /TOC -->

# DNS

- [rfc1034：域名 - 概念和设施](https://tools.ietf.org/html/rfc1034)
- [rfc1035：域名 - 实施和规范](https://tools.ietf.org/html/rfc1035)
- [rfc2036：域名系统中的动态更新（DNS更新）](https://tools.ietf.org/html/rfc2136)
- [rfc2181：说明DNS规范](https://tools.ietf.org/html/rfc2181)
- [rfc2535：域名系统安全扩展](https://tools.ietf.org/html/rfc2535)
- [rfc2929：域名系统（DNS）IANA注意事项](https://tools.ietf.org/html/rfc2929)
- ...
- [dns相关rfc文档归纳](https://www.isc.org/community/rfcs/dns/)
- [根DNS服务器的域名和IP地址](https://www.iana.org/domains/root/servers)

## 提问？

1. dns是什么，提供了什么功能，它的出现解决了什么问题？
2. dns架构设计？
2. 浏览器域名解析的过程是怎样的？

## 概述

- 《计算机网络 自顶向下》，dns工作机理概述
    1. 分布式、层次数据库
        - 由于DNS面对的请求是全球整个网络，考虑到故障处理、维护、负载均衡等原因，网络上DNS服务器的设计是：分布式、层次式的。
        - 为了处理扩展性的问题，dns使用了大量的dns服务器，它们以层次方式组织，并且分布在全世界范围内。
        - 大致来说，有三种类型的DNS服务器：
            - 根dns服务器（root DNS servers）
            - 顶级域dns服务器（top-level domain (TLD) DNS servers）
            - 权威dns服务器（authoritative DNS servers）
            - 层次为：根 → 顶级域 → 权威
        - 基本流程：
            - 一个dns客户要决定 “www.amazon.com” 的ip地址。
            - [client → root]：那么，该dns客户先与根服务器之一联系，它将返回顶级域名com的TLD服务器的ip地址。
            - [client → top-level]：然后，该客户则与这些TLD服务器之一联系，它将返回 “amazon.com”。
            - [client → authoritative]：最后，该客户与 “amazon.com” 权威服务器之一联系，它为主机名 “www.amazon.com” 返回其ip地址。
        - 三种dns服务器详述：
            - 根dns服务器
                - 以下地址可以明确的看到13个根dns服务器的详细情况：域名、ip等
                    - [IANA国际组织：根dns服务器](https://www.iana.org/domains/root/servers)
                    - [维基百科：根dns服务器](https://en.wikipedia.org/wiki/Root_name_server)
                - 在因特网上有13个根服务器（标号从 A 到 M），域名形式为：“a.root-servers.net”。
                - 尽管我们将这13个根dns服务器中的每个都视为单个服务器，但是实际上是一个冗余的服务器网络，以提供安全性和可靠性。
            - 顶级域dns服务器
                - 这些服务器负责顶级域名。
                    - 通用类：com、org、net、edu、...
                    - 国家代号类：cn、us、...
                - [IANA国际组织：顶级域名列表](https://www.iana.org/domains/root/db)
            - 权威dns服务器
                - 在因特网上具有公共可访问主机（例如服务器）的每个组织结构必须提供公共可访问的dns记录，这些记录将这些主机的名字映射成ip地址。一个组织机构的权威dns服务器收藏了这些dns记录。
                - 一个组织机构能够选择实现它自己的权威dns服务器以保存这些记录，（例如amazon公司，实现自己的权威dns服务器：amazon.com）。
                - 另一种方法是，该组织支付费用，让这些记录存储在某个服务提供商isp的一个权威dns服务器中。
                - 多数大学和大公司实现和维护它们自己的基本和备份的权威dns服务器。
        - 根、TLD和权威dns服务器都处于因特网DNS服务器的层次结构中，此外，还有另外一类重要的dns，称为本地dns服务器（local dns server）。一个本地的dns服务器严格来说并不属于因特网dns服务器的层次结构，但它对dns层次结构是重要的。
        - 本地dns服务器（local dns server）
            - 每个isp（如一个大学，一个系，一个公司或一个居民区的isp）都有一台本地的dns服务器。
            - 当主机与某个isp连接时，该isp分配该主机一个ip地址，同时也会告诉该主机本地dns服务器的ip地址，（通常通过DHCP分配）。
            - 主机的本地dns服务器，通常邻近主机，可能就在同一个局域网内。
            - 当主机发出dns请求时，该请求被发往本地dns服务器，它起着**代理作用**，并将该请求转发到因特网dns服务器层次结构中。
        - 查询流程：
            1. 迭代
                - ![dns_iteration.png](./assets/dns_iteration.png)
            2. 递归
                - ![dns_recursion](./assets/dns_recursion.png)
            3. 小结：从理论上讲，任何dns查询既可以是迭代也能是递归的。实践中，查询通常遵循第一种模式。从请求主机到本地dns服务器的查询是递归的，其余的查询是迭代的。
    2. dns缓存
        - 为了改善时延性能并减少在因特网上到处传输的dns报文数量，dns广泛使用了缓存技术。
        - 每一个层级上的dns服务器都有缓存，可以大大的减少响应时间。
- 《计算机网络 自顶向下》，dns记录和报文
    1. 
