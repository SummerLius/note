

## App development best practices

- 如何使镜像体积小
- 如何存储应用的数据
- 可能的话使用swarm services
- 使用 CI/CD 来测试和部署
- development和production环境的区别


## Work with images

### Best practices for writing Dockerfiles

- 大体指南和建议
    - 容器应该是ephemeral
    - 使用.dockerignore文件
    - 使用multi-stage builds
    - 避免安装没用的软件包
    - 每个容器应该只做一件事（也就是，只跑一个进程或一类进程）
    - 减小层次（minimize the number of layers）
    - 排序多行参数
    - Build cache
- The Dockerfile instructions
    - from
    - lable
    - run
    - cmd
    - expose
    - env
    - add or copy
    - entrypoint
    - volume
    - user
    - workdir
    - onbuild

### Create a base image

### Use multi-stage builds

### Dockerfile reference

### Image management

