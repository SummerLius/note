# MySQL

## 文档地址

- [MySQL 文档](https://dev.mysql.com/doc/)
- [MySQL 8.0](https://dev.mysql.com/doc/refman/8.0/en/introduction.html)
- [MySQL 5.7](https://dev.mysql.com/doc/refman/5.7/en/introduction.html)
- [MySQL 5.6](https://dev.mysql.com/doc/refman/5.6/en/introduction.html)
- [MySQL 5.5](https://dev.mysql.com/doc/refman/5.5/en/introduction.html)



## 其它 

```sql
# 创建用户并赋予全部权限
grant all privileges on *.* to root@localhost identified by 'my_password';

flush privileges;


grant all privileges on mail_monitor.* to 'mail_monitor'@'%' identified by 'dy2980Mail_monitor';
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

### SQL语句

```sql
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name 

```

### 附录

- `\G` 的用法：使mysql的查询结果按列打印



