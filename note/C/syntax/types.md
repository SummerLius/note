

<!-- - 字符类型
    - 存储任何一个基本执行字符集（the basic execution character set，单字节）中的字符
    - 对于非基本执行字符集的字符，其...
    - 
- 整数类型
- 浮点数类型 -->

## 数据类型

- 字符类型
    - char：字符型，存放一个单字节字符
- 整数类型
    - int：整型，通常反映机器中整数的最自然长度
- 浮点类型
    - float：单精度浮点型
    - double：双精度浮点型


### 整型

int修饰符：
- 长度修饰符
    - short
    - long
- 符号修饰符
    - signed
    - unsigned

所以两种修饰符组合共有六种情况（[]内表示可省略）：
- [signed] int
- unsigned int
- short [int]
- unsigned short [int]
- [signed] long [int]
- unsigned long [int]

这6中整数类型所表示值范围会根据机器的不同而不同，但是有几条规则是所有编译器必须遵守的：
1. c标准要求short、int、long每一种类型都要覆盖一个确定的最小取值范围。待理解
2. 要求长度关系：short <= int <= long 

占字节数：
||short|int|long|
|:-:|:-:|:-:|:-:|
|16位机|2字节|2字节|4字节|
|32位机|2字节|4字节|4字节|
|64位机|2字节|4字节|8字节|




不带限定符的char类型是否默认带符号，取决与具体机器，但可打印字符总是正值（因为可打印字符对应ascii值范围在0~127，只占用单个字节7位，故不受影响）。所以，对于char类型声明，对于不确定的赋值，可以明确指定符号限定符：signed char 或 unsigned char。


