## MySQL

```sql
# 创建用户并赋予全部权限
grant all privileges on *.* to root@localhost identified by 'my_password';
flush privileges;
```

### 引擎

```sql
show engines;

show variables like '%storage_engine%';

show create table 表名;
```

### 事务

事务四个属性ACID，这四个概念其实有点相互交融，没必要非得区分开



- 原子性（atomicity）：保证单次事务的一致性
- 一致性（consistency）
- 隔离性（isolation）：保证多个事务并发时的一致性
- 持久性（durability）

### 附录

- `\G` 的用法：使mysql的查询结果按列打印