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
