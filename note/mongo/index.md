## mongo

#### mongod服务的正确关闭

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