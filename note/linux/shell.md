## SHELL

系统shell程序在 `/bin` 目录下，合法的shell写在配置文件 `/etc/shells`。 

<!-- TOC -->

- [SHELL](#shell)
    - [变量](#变量)
    - [变量的修改及${}详细用法](#变量的修改及详细用法)
    - [判断符号 []](#判断符号-)
    - [结构语句if,case,while,until,for](#结构语句ifcasewhileuntilfor)
    - [单、双引号](#单双引号)
    - [shell脚本的第一行作用](#shell脚本的第一行作用)
    - [重定向](#重定向)
    - [管道](#管道)
    - [一行执行多个命令](#一行执行多个命令)
    - [shell脚本中打印一段文本](#shell脚本中打印一段文本)

<!-- /TOC -->

<hr> 

### 变量

**变量读取**

使用 `$` 或 `${}` 符号：$variable, ${variable}

**变量赋值**

- 使用 `=` 符号  
- `=` 两边不能有空格，除非在引号内  
- 变量名不能以数字开头
- 使用 `反引号` 或 `$(command)` 可以将某个shell命令执行后的结果赋值给变量

```shell
# 错误

# 不能有空格
var1 = value1;
var2=var ue2;

# 不能数字开头
3var=value3;
```

<hr> 

### 变量的修改及${}详细用法

![](../../assets/linux_var1.png)

![](../../assets/linux_var.png)

<hr> 

### 判断符号 []

<hr> 

### 结构语句if,case,while,until,for

```shell
#//////////////////////////////////////////////
# If
#//////////////////////////////////////////////
if command;then
    xxx
elif command;then
    yyy
else
    zzz
fi

#//////////////////////////////////////////////
# case
#//////////////////////////////////////////////
case "$var" in
    'value1')
        程序段
        ;;
    'value2')
        程序段
        ;;
    *)
        程序段
        ;;
esac
-----------------------------------------------
case $1 in
    -a|A)
        echo $1
        ;;
    -b|B)
        echo $1
        ;;
    *)
        echo Wrong
        ;;
eaac

#//////////////////////////////////////////////
# While 状态为true执行循环
#//////////////////////////////////////////////
while command
do
    程序段
done

#//////////////////////////////////////////////
# Until 状态为false执行循环
#//////////////////////////////////////////////
until command
do
    程序段
done

#//////////////////////////////////////////////
# for
#//////////////////////////////////////////////
for variable in varlist
do
    程序段
done

# c风格for写法，注意有些sh不支持，例如dash会报错，bash没问题
for ((初始值；循环限制；步阶))
do
    程序段
done
```

<hr> 

### 单、双引号

在赋值变量时，右边不能直接存在空格space，如果欲赋值的字符串中存在空格，则必须以 `''` `""`引号包围起来。

**单、双引号的区别**

基本上作用是一致的，区别在于shell不识别单引号 `''` 内所有特殊字符，而会识别双引号 `""` 内部分特殊字符：`$` `\` `反引号`

<hr> 

### shell脚本的第一行作用

第一行的作用：指定脚本的解释器，例如下面举例

```shell
# linux 找到node程序解析执行脚本
"#!/usr/bin/env node" 

# linux 找到python程序解析执行脚本
"#!/usr/bin/env python" 

# linux 找到sh程序解析执行脚本
"#!/bin/sh"

# 等等
```

<hr> 

### 重定向


一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件：
- 标准输入文件(stdin)：stdin的文件描述符为0，Unix程序默认从stdin读取数据。
- 标准输出文件(stdout)：stdout 的文件描述符为1，Unix程序默认向stdout输出数据。
- 标准错误文件(stderr)：stderr的文件描述符为2，Unix程序会向stderr流中写入错误信息。
-  
- （可以将stdin，stdout，stderr看作和普通文件一模一样）

默认下Linux指令程序的输入从stdin读入或者指定参数读入，然后输出到stdout、stderr文件，这个三个文件一般与键盘和屏幕等外设相关联。

![linux_redirect.jpg](../../assets/linux_redirect.jpg)

**正常定向**

```shell
# 操作：linux 终端下输入指令，然后结果会立马显示在终端上面
# 原因：只是因为who指令将结果输出到stdout文件，stdout文件与屏幕连接在一起，所以直接显示在屏幕上

who
>summer tty7 2017-08-01 15:55 (:0)
```

**重定向**

```shell
#　操作：linux 终端下输入指令，结果不会显示在终端上面
#　原因：who指令将结果输出到stdout文件，使用">"符号将stdout文件内容重新输出到temp.txt文件

who > temp.txt
```

- 标准输入 `stdin`：文件描述符0（文件/dev/stdin），使用`<`，`<<`， `0<`， `0<<`
- 标准输出 `stdout`：文件描述符1（文件/dev/stdout），使用`>`， `>>`， `1>`， `1>>`
- 标准错误输出 `stderr`：文件描述符2（文件/dev/stderr），使用`2>`， `2>>`

|命令|说明|
|:-:|:-:|
|command > file|将stdout重定向到 file|
|command < file|将stdin重定向到 file|
|command >> file|将stdout以追加的方式重定向到 file|
|<< tag|将开始标记 tag 和结束标记 tag 之间的内容作为输入。|
|n> file|将文件描述符为 n 的文件重定向到 file|
|n>> file|将文件描述符为 n 的文件以追加的方式重定向到 file|
|n>&m |把往文件描述符 n 的输出重定向到文件描述符 m 上|
|n<&m |把往文件描述符 n 的输入重定向到文件描述符 m 上|

**例子**
```shell
ls -alF 1>/dev/null 2>&1

cat > newfile << eof
```


<hr> 

### 管道

在类Unix操作系统中，管道是原始的软件管道：即是一个由标准输入输出链接起来的进程集合，所以每一个进程的输出（stdout）被直接作为下一个进程的输入（stdin）。

**可见，pipe适用于，有使用stdin，stdout，stderr作为输入输出的Linux Command**


![linux_pipe.png](../../assets/linux_pipe.png)

```shell
ps aux | grep 'node'
l -laF | wc
```

<hr> 

### 一行执行多个命令

- `;`  ：不考虑命令相关性，不考虑对错，连续执行命令
- `&&` ：前一个命令运行完毕且正确返回，则运行下一个命令，否者终止
- `||` ：前一个命令正确，则终止，否者运行下一个命令

`&&`,`||` 和编程语言中的逻辑其实是一致的

```shell
# ;
who;who;who

# &&
test -e /root/.bashrc && cat /root/.bashrc
```

<hr> 

### shell脚本中打印一段文本

```shell
#!/bin/sh

# 脚本中支持 cat <<eof 
cat << eof
    Summerlius Usage

    -a: a is a
    -b: b is b
eof
```
