# 链接

链接（linking）是将各种代码和数据片段集合成单一文件的过程，即可执行文件，可以加载到内存中执行。

linking可以执行的时间点：
1. 编译时，即源代码翻译成机器码时
2. 加载时，即程序被加载器加载到内存执行时
3. 运行时，在程序运行过程中，由应用程序来执行linking操作

现代系统中，linking由链接器（linker）程序自动执行。

链接器作用：链接器在软件开发中扮演重要角色，其使得分离编译称为可能，不用将源代码每次都全部编译，而是可以划分
子部分编译，最后链接到一起。



三种目标形式：
1. 可重定位目标文件
2. 共享目标文件：一种特殊类型的可重定位目标文件
3. 可执行目标文件

编译器和汇编器生成可重定位目标文件（包括共享目标文件）。  
链接器生成可执行目标文件。