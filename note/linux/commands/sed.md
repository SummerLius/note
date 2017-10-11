
## sed

流编辑器（stream editor for filtering and transforming text），接受输入流，可以来自于文件或管道。

`sed [-hnVi] [-e<script>][-f<script文件>] [文本文件]`  

```bash
# 单引号里面内容就是script，用来具体说明如何操作文本文件

# 注意如果使用引号的话，使用单引号，不要使用双引号

sed -n -e '1,$p' file.txt
```

**参数说明**：
- -e
- -f
- -e
- -n
- -i
- -h
- -V

**动作说明**：
- a
- c
- s
- i
- d
- p

如果没有指定 `-n，-f`选项，那么sed指令将第一个非选项参数当作script内容去解释，即 `-n，-f` 可以省略，其余的参数当作文本文件的name，如果没有指定文本文件，那么从标准输入stdin读取文本内容。



脚本语法：`[Address] [!] <command>`   

**Address**：

sed指令可以不指定地址，在这种情况下，脚本里的操作会应用所有行。

指定了单行地址，则sed只会匹配此行进行操作。

指定了两个地址，则sed会匹配这两个地址内的范围所有行。

address类型：
- 

## 参考链接

- http://blog.jobbole.com/109088/
- http://man.linuxde.net/sed
- https://www.gnu.org/software/sed/manual/
