##### seq

打印一串连续的数字

```shell
seq last
seq first last
seq first increment last

-s, --separator=String defalut: \n

seq 5 # 返回 1到5数字
```

##### pwd

 显示当前目录  

 -P选项会跳过软连接显示实际目录，-L会保留软连接目录  

```shell
pwd -P
pwd -L
```

###### dirname、basename

路径处理

dirname 和 basename 只是对路径字符串进行处理，不会做实际文件路径的判断处理

```shell
dirname /a/b    --> /a
dirname ./c/d   --> ./c
basename /e/f.h --> f.h
basename -s .h /g/h.h   --> h

# 脚本中确定脚本所在的目录为工作目录，在脚步中执行代码
# 脚本中的参数0表示脚本相对执行目录的相对目录
cd $(dirname $0) || exit 0;
```

##### du、df

```shell
df -h

du -sh /xxx
du -h -d 0 /xxx
du -h -d 1 /xxx
du -h -d 2 /xxx
```