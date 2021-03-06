
### 关于大量数据下的处理方式？

这里仅阐述下一种处理方式：
1. 分表
2. ...

#### 分表

如果一张表数据量过大，检索、修改等操作可能会较慢。即使索引等设置已是最优，但是对于单张表，量大的话也会达到性能瓶颈。

所以可以将父表划分为多张子表，这样父表的数据量就会被多张子表均分，从而减少单张表的数据量。

**但是分表的话，如果我要根据ID来寻找一个指定的记录，然而不知道它在哪张子表内，难道要到每个子表内都select一次？**

回答这个问题要根据具体的业务需求，这里讨论两种情况：

1. **表和记录不关联**：例如，记录日志，为每月或天为时间段建立一个表
2. **表和记录关联**：将表名和ID做某种关联
    - 如果ID是Number且为自增类型，可以以ID数值大小分表，例如<1000 000的ID放在表user_1000000中，<2000 000的ID放在表suer_2000000中...
    - ...
