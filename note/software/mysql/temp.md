
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