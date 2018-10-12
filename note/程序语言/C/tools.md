## GCC

源文件：main.c  
预处理后：main.i         预处理文件
编译器后：main.s         编译为汇编代码文件 
汇编器后：main.o         将汇编代码翻译机器二进制代码，可重定位目标文件  
链接器后：main  

gcc -E main.c [-o main.i]  
gcc -S main.c [-o main.s]
gcc -c main.c [-o main.o]  
gcc main.c [-o main.out]  

gcc -Og -o main main.c 
- `-Og`：编译优化选项 
- `-v`：显示gcc的处理步骤
- `-E`：仅预处理源文件
- `-S`：仅预处理+编译源文件
- `-c`：仅预处理+编译+汇编源文件，不链接
- `-o`：指定输出文件的文件名，如果不指定的话
- `-g`：指定使用gdb，调试使用
- `-w、-W、-Wall`
    - `-w`：屏蔽编译时的warning，不建议使用
    - `-W`：显示编译时的warning，建议使用
    - `-Wall`：同-W类似，显示编译时的所有warning，建议使用，一般 `-W -Wall` 一起使用，至于两者区别暂不做详述
- `-I（大写i）、-l（小写L）、-L`
    - `-I`：指定一个额外的头文件查找目录。例如`-I /home/test/include`，表示将/home/test/include目录作为第一个寻找头文件目录，寻找的顺序为：`/home/test/include` --> `/usr/include` --> `/usr/local/include`，后面目录是系统默认。
    - `-l`：指定一个库文件，默认寻找动态链接库，加上`-static`选项表示寻找静态链接库。例如`-ltest`，表示指定libtest.so动态链接库，`-static -ltest`，表示指定libtest.a静态链接库。（也就是增加前缀和后缀的库名）
    - `-L`：指定一个额外的库文件查找的目录。例如`-L /home/test/lib`，表示将/home/test/lib目录作为第一个寻找库文件目录，寻找的顺序为：`/home/test/lib` --> `/lib` --> `/usr/lib` --> `/usr/local/lib`
    

## ld

ld：GNU链接器

`ld -o <output> /lib/crt0.o hello.o -lc`
- 解释：链接/lib/crt0.o、hello.o、和静态库libc.a三个文件，生成可执行文件output
- `-l`（小写的L），--library=*lib_name*：指定一个库文件，例如`-ltest`，表示指定libtest.a或libtest.so文件
    - `-Bstatic`、`-aarchive`：指定使用静态库，`-l`选项仅查找静态库"libtest.a"
    - `-Bdynamic`、`-ashared`、`-adefault`：指定使用动态库，`-l` 选项仅查找动态库"libtest.so"
- `-L`：指定一个额外的库文件查找的目录。例如`-L /home/test/lib`，表示将/home/test/lib目录作为第一个寻找库文件目录，寻找的顺序为：`/home/test/lib` --> `/lib` --> `/usr/lib` --> `/usr/local/lib`

## ar

ar：操作归档文件




## Makefile

make [Makefile]  
make [makefile]  
make -f your-makefile  

基本语法：

```makefile
<target>: <prerequisites>
[tab]   <commands>
```
- `target`：必需。
- `prerequisites`：可选。
- `commands`：可选。

### target（目标）

目标（target）一般为**文件名**，除了文件名，还可以某个**操作的名字**，这称为“伪目标”（phony target）。


为了不形成target文件名和伪目标两种类型的冲突，使用`.PHONY <target_name>`显式说明：  
```makefile
.PHONY: clean
clean:
    rm *.o temp
```

### pregerquisites（前置条件）

prerequisites通常是一组文件名，之间使用空格分隔。

prerequisites指定了target是否重建的判断标准：只要前置文件不存在或者有过更新，那么target文件就会重建。

### commands（指令）

commands有一行或多行shell命令组成，表示如何更新target文件或其它操作。它是构建target的具体指令，它运行的结果通常就是生成目标文件。

默认每行命令之前必须有一个tab键，欲使用其它键，可以使用内置变量`.RECIPEPREFIX`声明。
```makefile
# 将command前的tab键改为">"键
.RECIPEPREFIX=>

.PHONY: clean
clean:
>rm temp
```

每行的commands在在一个单独的shell中执行，这些shell没有继承关系。解决的办法有
```makefile
# 多个command写在一行，中间使用分号";"隔开
target: prerequisites
    command1;command2;

# 或者在换行符前加上反斜杠"\"
target: prerequisites
    command1; \
    command2;

# 加上 .ONESHELL: 命令
.ONESHELL
target: prerequisites
    command1;
    command2;
```

### Makefile文件的语法

- 注释：`#` 表示注释。
- 回声：正常情况下make会打印每条command再执行。可以在command前面加上 `@` 关闭回声。


