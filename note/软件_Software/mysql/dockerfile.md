# docker与mysql

- [DockerHub MySQL](https://hub.docker.com/_/mysql/)
- 环境变量：
    - 当你启动mysql镜像时，你可以在启动docker时传入环境变量来调整mysql实例配置。
    - [https://dev.mysql.com/doc/refman/5.7/en/environment-variables.html](https://dev.mysql.com/doc/refman/5.7/en/environment-variables.html)
    - MYSQL_ROOT_PASSWORD
        - 这个变量必须指定，并会强制性设置MySQL的管理员账号root的密码
    - MYSQL_DATABASE
        - 该变量可选。如果指定了，则会在镜像启动时，创建该名字的数据库。如果同时指定了MYSQL_USR/MYSQL_PASSWORD，则该用户会对该数据库拥有全部操作权限
    - MYSQL_USER, MYSQL_PASSWORD
        - 该变量可选。
    - MYSQL_ALLOW_EMPTY_PASSWORD
    - MYSQL_RANDOM_ROOT_PASSWORD
    - MYSQL_ONETIME_PASSWORD