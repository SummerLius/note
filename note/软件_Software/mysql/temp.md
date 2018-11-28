
# MySQL

## 文档地址

- [MySQL 文档](https://dev.mysql.com/doc/)
- [MySQL 8.0](https://dev.mysql.com/doc/refman/8.0/en/introduction.html)
- [MySQL 5.7](https://dev.mysql.com/doc/refman/5.7/en/introduction.html)
- [MySQL 5.6](https://dev.mysql.com/doc/refman/5.6/en/introduction.html)
- [MySQL 5.5](https://dev.mysql.com/doc/refman/5.5/en/introduction.html)



## 常见命令

```sh
# 创建用户并赋予权限
grant all privileges on *.* to root@1.1.1.1 identified by 'xxxxxx';
grant all privileges on mail_monitor.* to 'mail_monitor'@'%' identified by 'xxxxxxxxxxx';
flush privileges;

# 创建从复制用户
grant REPLICATION SLAVE ON *.* to rsyncuser2@'%' identified by 'xxxxxxxx';
GRANT ALL PRIVILEGES ON `esb`.* TO 'rsyncuser2'@'%';

# 导出数据和表结构
mysqldump -u用户名 -p密码 数据库名 > xxx.sql

# 只导出表结构
mysqldump -u用户名 -p密码 -d 数据库名 > xxx.sql

# 导入数据库 （首先要创建数据库：create database xxx;）
mysql>source /home/xxx.sql

mysql -u用户名 -p密码 数据库名 < xxx.sql
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

- http://blog.jobbole.com/100349/
- https://wenku.baidu.com/view/8dda8409f12d2af90242e629.html

## 查看mysql信息状态等

```sql
# 显示引擎
show engines;

# 显示mysql_server环境变量
show variables like '%storage_engine%';

# 显示创建表结构
show create table 表名;

# 显示连接到mysql_server的socket（ip:port）列表
show processlist;
show full processlist;

# 显示服务状态
show status like 'xx';
```

## MySQL服务设计

1. 默认下是，一个connection一个thread，（一个connection，即客户端和mysql服务一个socket对接）