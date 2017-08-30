## GCC

源文件：main.c  
预处理：main.i         预处理  
编译器：main.s         编译为汇编代码  
汇编器：main.o         将汇编代码翻译机器二进制代码  
链接器：main  

gcc -E main.i main.c  
gcc -S main.s main.c  
gcc -c main.o main.c  
gcc -o main   main.c  

gcc -Og -o main main.c  



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


