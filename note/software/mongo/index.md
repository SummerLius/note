## mongo
<!-- TOC -->

- [mongo](#mongo)
    - [常用指令](#常用指令)
    - [mongod服务的正确关闭](#mongod服务的正确关闭)

<!-- /TOC -->


### 常用指令
```mongodb
# 显示当前数据库
show databases
show dbs
show collections
show users

db.help()
db.collection.help()
db.serverStatus()

```


### mongod服务的正确关闭

```sh
# 登入mongo客户端，执行
use admin;
db.shutdownServer();

# 直接shell命令
mongod --shutdown;

ctrl+c

kill <mongod pid>
kill -2 <mongod pid>


千万不要使用 kill -9 去终止mongod程序，可能会破坏mongodb表，会造成再次启动失败
```