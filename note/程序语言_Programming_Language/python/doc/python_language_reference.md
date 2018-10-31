<!-- TOC -->

- [Python 语言参考手册](#python-语言参考手册)
    - [介绍](#介绍)
    - [词法分析](#词法分析)
        - [行结构](#行结构)
        - [其它tokens](#其它tokens)
        - [标识符和关键字](#标识符和关键字)
        - [字面量](#字面量)
        - [操作符](#操作符)
        - [分隔符](#分隔符)
    - [数据模型](#数据模型)
        - [对象，值和类型](#对象值和类型)
        - [标准类型层次](#标准类型层次)
        - [特殊方法名](#特殊方法名)
        - [协同程序（协程 Coroutines）](#协同程序协程-coroutines)
    - [执行模型](#执行模型)
        - [程序结构](#程序结构)
        - [命名和绑定](#命名和绑定)
        - [异常](#异常)
    - [导入系统](#导入系统)
        - [importlib](#importlib)
        - [包](#包)
        - [搜索](#搜索)
        - [加载](#加载)
        - [基于路径的查找器](#基于路径的查找器)
        - [代替标准导入系统](#代替标准导入系统)
        - [`__main__` 特别注意事项](#__main__-特别注意事项)
        - [Open issues](#open-issues)
        - [参考](#参考)
    - [表达式](#表达式)
        - [](#)
        - [](#-1)
        - [](#-2)
        - [](#-3)
        - [](#-4)
        - [](#-5)
        - [](#-6)
        - [](#-7)
        - [](#-8)
        - [](#-9)
        - [](#-10)
        - [](#-11)
        - [](#-12)
        - [](#-13)
        - [](#-14)
    - [简单语句](#简单语句)
    - [复合语句](#复合语句)
    - [顶级组件](#顶级组件)
        - [完整Python程序](#完整python程序)
        - [文件输入](#文件输入)
        - [交互输入](#交互输入)
        - [表达式输入](#表达式输入)
    - [完整语法规范](#完整语法规范)

<!-- /TOC -->

# Python 语言参考手册

- [The Python Language Reference](https://docs.python.org/3/reference/index.html#reference-index)
- [中文](http://wiki.jikexueyuan.com/project/python-language-reference/)

## 介绍

## 词法分析

- 一个 Python 程序是由一个解析器读取的。解析器的输入是一个由词法分析器生成的符号流（stream of tokens）。本章介绍了词法分析器如何将文件分解为符号。
- Python 将程序文本以 Unicode 代码点的方式读入；源文件的编码格式由编码声明给出，其默认值为 UTF-8 ，详见 [PEP 3120](https://www.python.org/dev/peps/pep-3120) 。源文件无法被解析时，会引发 SyntaxError 异常。

### 行结构

1. 逻辑行
2. 物理行
3. 注释
4. 编码声明
5. 显示行连接
6. 隐式行连接
7. 空行
8. 缩进
9. tokens间的空白

### 其它tokens

1. 除了 NEWLINE， INDENT 和 DEDENT，还有以下几类语言符号：标识符、关键字、字面量、运算符及分隔符。空白符不是符号（除了行终止符，之前讨论过），但是可以用来分隔符号。当解释某个符号存在歧义时，该符号被看作是由一个尽可能长的字符串组成的合法符号（从左至右）。

### 标识符和关键字

1. 概述
    - 标识符是由以下词法定义描述的。
    - Python 语言中的标识符语法基于 Unicode 标准附件 UAX-31，阐述变化定义如下；也可以点击 [PEP 3131](https://www.python.org/dev/peps/pep-3131) 获得更详细的信息。
    - 在 ASCII 范围内（ U+0001..U+007F ），合法的标识符字符与 Python 2.X版本中是一致的：`a-zA-Z_0-9`，首位不能为数字
    - Python 3.0版本引入了 ASCII 范围以外其他的字符（详见 PEP 3131 ）。这些字符使用包含在 [unicodedata](https://docs.python.org/3/library/unicodedata.html#module-unicodedata) 模块中的 Unicode 字符数据库版本进行分类。
    - 标识符的长度是没有限制的，大小写敏感。
        ```
        identifier   ::=  xid_start xid_continue*
        id_start     ::=  <all characters in general categories Lu, Ll, Lt, Lm, Lo, Nl, the underscore, and characters with the Other_ID_Start property>
        id_continue  ::=  <all characters in id_start, plus characters in the categories Mn, Mc, Nd, Pc and others with the Other_ID_Continue property>
        xid_start    ::=  <all characters in id_start whose NFKC normalization is in "id_start xid_continue*">
        xid_continue ::=  <all characters in id_continue whose NFKC normalization is in "id_continue*">
        ```
    - 上面提到的 Unicode 分类代码分别代表：
        - Lu - uppercase letters
        - Ll - lowercase letters
        - Lt - titlecase letters
        - Lm - modifier letters
        - Lo - other letters
        - Nl - letter numbers
        - Mn - nonspacing marks
        - Mc - spacing combining marks
        - Nd - decimal numbers
        - Pc - connector punctuations
        - Other_ID_Start - explicit list of characters in PropList.txt to support backwards compatibility
        - Other_ID_Continue - likewise
    - 解析器会将所有标识符转换为标准形式的 NFKC，标识符的比较是基于 NFKC 的。
2. 关键字
    - 下面列出的标识符被用作保留字，或者叫做该语言的关键字，这些保留字不能作为普通标识符使用。这些关键字必须严格像下面一样拼写：
        ```
        False   class      finally    is          return
        None    continue   for        lambda      try
        True    def        from       nonlocal    while
        and     del        global     not         with
        as      elif       if         or          yield
        assert  else       import     pass
        break   except     in         raise
        ```
3. 保留的标识符类型
    - 除了关键字，某些标识符类型也具有特殊含义。这些类型由前导和尾随的下划线字符模式确定：
        - `_*`
        - `__*__`
        - `__*`

### 字面量

1. 字符串和字节字面量
2. 字符串连接
3. 格式化的字符串字面量
4. 数字字面量
5. 整数字面量
6. 浮点型字面量
7. 虚数字面量

### 操作符

```
+       -       *       **      /       //      %      @
<<      >>      &       |       ^       ~
<       >       <=      >=      ==      !=
```

### 分隔符

- 以下tokens用作语法上的分隔符
    ```
    (       )       [       ]       {       }
    ,       :       .       ;       @       =       ->
    +=      -=      *=      /=      //=     %=      @=
    &=      |=      ^=      >>=     <<=     **=
    ```
- 下面列出的 ASCII 字符作为其他符号的一部分具有特殊含义，或者对于词法分析器具有重要意义。
    ```
    '       "       #       \
    ```
- 下面列出的 ASCII 字符没有在 Python 中使用。当它们出现在字符串文本及注释之外时就认为是非法的。
    ```
    $       ?       `
    ```




## 数据模型

### 对象，值和类型
### 标准类型层次
### 特殊方法名
### 协同程序（协程 Coroutines）


## 执行模型

### 程序结构
### 命名和绑定
### 异常



## 导入系统

### importlib
### 包
### 搜索
### 加载
### 基于路径的查找器
### 代替标准导入系统
### `__main__` 特别注意事项
### Open issues
### 参考


## 表达式

### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 
### 

## 简单语句

## 复合语句

## 顶级组件

### 完整Python程序
### 文件输入
### 交互输入
### 表达式输入

## 完整语法规范