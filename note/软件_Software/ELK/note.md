# elk 部分笔记记录

## Elasticsearch

- **[index](#)**
    1. index是有着相同结构、特征的文档的集合。例如一个index专门存放客户，一个index专门存放产品的数据。
    2. 一个index定义有一个name，其值必须是小写，这个name通常就被用来指代一个index，当对这个index里面的文档执行检索、更新、删除操作时
    3. 在创建index的时候，其主分片只要设置了就不能更改了，但是后续随着数据量的变化，对主分片的要求可能会有所改变，由此需求，Elasticsearch提供了两样机制：
        - shrink index：用于想将主分片数量减少
        - split index：用户想将主分片数量增多
- **[Type](#)**
    1. 注意，其在6.0.0版本中就废弃了
    2. 一个type用来表示一个index里面的逻辑分类/分区，用来允许一个index中存储不同类型的文档，例如一种type存储用户数据，一种type用处用户博客。
    3. 在之后的es版本中，将不被允许在一个index创建多个type，而且整个 “Type” 的概念将会被移除
    4. [移除理由: removal of mapping types](https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html)
    5. Mapping types 将会在ES 7.0.0 版本完全移除
    6. 后续关于mapping types的可选方案：
        1. 首选是，每个index，仅设置一个type
        2. 实现你自定义的 "type" 字段，使其像旧版本的 "_type" 字段一样工作
        3. 对于之前使用 "_type" 来描述父子关系，后续可以使用 "join" 字段
- **[Document](#)**
    1. 文档是可以被检索的基本信息单位。例如index里面的一个用户信息，一个产品信息。
    2. 文档以JSON格式表示
    3. 文档必须要归属于一个type
- **[](#)**
- **[](#)**
- **[](#)**
- **[](#)**
- **[](#)**

## kibana

## logstash

## beats


## MISC

1. 