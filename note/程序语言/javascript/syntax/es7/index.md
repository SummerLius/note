<!-- TOC -->

- [ECMACcript 8th](#ecmaccript-8th)
    - [概述](#概述)
    - [标准目录](#标准目录)
    - [标准章节](#标准章节)
        - [第六章 ES数据类型和值](#第六章-es数据类型和值)
        - [第七章 抽象运算/操作](#第七章-抽象运算操作)
        - [第十一章 ES语言：词法](#第十一章-es语言词法)
        - [第十二章 ES语言：表达式](#第十二章-es语言表达式)
        - [第十三章 ES语言：语句和声明](#第十三章-es语言语句和声明)
        - [第十四章 ES语言：函数和类](#第十四章-es语言函数和类)
        - [第十五章 ES语言：脚本和模块](#第十五章-es语言脚本和模块)
        - [第十六章 错误处理和语言扩展](#第十六章-错误处理和语言扩展)
        - [第十七章 ES标准内建对象](#第十七章-es标准内建对象)
        - [第十八章 全局对象](#第十八章-全局对象)
        - [第十九章 基本对象](#第十九章-基本对象)
        - [第二十章 数字和对象](#第二十章-数字和对象)
    - [理解抽象](#理解抽象)

<!-- /TOC -->

# ECMACcript 8th

## 概述

地址：http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm

## 标准目录

1. Scope
    - 该标准定义了es7通用编程语言
2. Conformance
    - 一致性、合格性（即，该标准对于实现（implementation）合格的一些要求）
    - 对于标准实现方，提出了一些要求，详情见标准
3. Normative references
    - 标准参考
    - 对于本标准的实现的应用，下列参考标准也是“实现方”必不可少的。
    - 例如：
        - [ECMA‑402, ECMAScript 2015 Internationalization API Specification.](http://www.ecma-international.org/publications/standards/Ecma-402.htm)
        - [ECMA‑404, The JSON Data Interchange Format.](http://www.ecma-international.org/publications/standards/Ecma-404.htm)
            - 关于JOSN格式的标准
        - ...
    - 理解：
        - 也就是说，比方浏览器作为JavaScript的实现方，其不仅要实现ECMAScript标准，也还要实现上面的ecma-402，ecma-404标准
        - 作为“实现方”，要能运行应用、开发应用的完成功能，其实现遵循多个标准

4. Overview
    1. [Web Scripting](#)
    2. [ECMAScript Overview](#)
        1. [Objects](#)
        2. [The Strict Variant OF ECMAScript ](#)
    3. [Terms and definitions](#)
    4. [Organization or This Specification](#)
        - p41
        - 本标准文档的目录组织
        - 本标准后面的章节这样划分：
            1. 第 5 章：规定了在本标准文档中使用的符号约定
            2. 第 6-9 章：规定了ECMAScript程序运行的执行环境
            3. 第 10-16 章：规定了ECMAScript编程语言，包括它的的语法编码和该语言特征的执行语义
            4. 第 17-26 章：规定了ECMAScript的标准库。其包含了所有给ECMAScript程序使用的标准对象的定义。
    5. [Notational Conventions](#)
        - p47
        1. 语/句法和词法
            1. 上下文无关文法
            2. 词法和正则文法
            3. 将字符串数字化文法
            4. 句法文法
            5. 文法符号
        2. 算法约定
        3. 静态语义规则
    6. [ECMAScript Data Types and Values](#)
        - p55
        - ES数据类型和值
        1. ECMAScript 语言类型
        2. ECMAScript 规范类型
    7. [Abstract Operations](#)
        - p76
        - 抽象操作
    8. [Executable Code and Execution Contexts](#)
        - p96
        - 执行代码和执行上下文
    9. [Ordinary and Exotic Objects Behaviours](#)
        - p119
        - 普通和其它对象行为
    10. [ECMAScript Language: Source Code](#)
        - p158
        - ES语言：源代码
    11. [ECMAScript Language: Lexical Grammar](#)
        - p160
        - ES语言：词法
    12. [ECMAScript Language: Expressions](#)
        - p178
        - ES语言：表达式
    13. [ECMAScript Language: Statements and Declarations](#)
        - p226
        - ES语言：语句和声明
    14. [ECMAScript Language: Functions and Classes](#)
        - p275
        - ES语言：函数和类
    15. [ECMAScript Language: Scripts and Modules](#)
        - p304
        - ES语言：脚本和模块
    16. [Error Handling and Language Extensions](#)
        - p329
        - 错误处理和语言扩展
    17. [ECMAScript Standard Built-in Objects](#)
        - p331
        - ES标准内建对象
    18. [The Global Object](#)
        - p332
        - 全局对象
    19. [Fundamental Objects](#)
        - p344
        - 基本对象
    20. [Numbers and Dates](#)
        - p362
        - 数字和日期
    21. [Text Processing](#)
        - p394
        - 文本处理
    22. [Indexed Collections](#)
        - p436
        - 索引集合
    23. [Keyed Collection](#)
        - p478
        - 键集合
    24. [Structured Data](#)
        - p494
        - 结构化数据
    25. [Control Abstraction Objects](#)
        - p510
        - 控制抽象对象
    26. [Reflection](#)
        - p527
        - 反射
    27. 附录
        - [Annex A: (informative) Grammar Summary](#)
            - page533
            1. [Lexical Grammar](#)
            2. [Expressions](#)
            3. [Statements](#)
            4. [Functions and Classes](#)
            5. [Scripts and Modules](#)
            6. [Number Conversions](#)
            7. [Universal Resource Identifier Character Classes](#)
            8. [Regular Expressions](#)
        - [Annex B: (normative) Additional ECMAScript Features for Web Browers](#)
            - p557
        - [Annex C: (informative) The Strict Mode of ECMAScript](#)
            - p575
        - [Annex D: (informative) Corrections and Clarifications in ECMAScript 2015 with Possible Compatibility Impact](#)
            - p577
            - 更正和说明在es 2015中可能的兼容性影响
        - [Annex E: (informative) Additions and Changes That introduce Incompatibilities with Prior Editions](#)
            - p579
            - 与之前版本不兼容的 “添加” 和 “修改”
        - [Bibliography](#)
            - 参考书目/文献
[](#)

## 标准章节

### 第六章 ES数据类型和值

- 章名
    - ECMAScript Data Types and Values
- 前言 
    - Types 被细分为ECMAScript语言类型和规范类型
1. [ECMAScript Language Types](#)
    1. `Undefined`
        - 该类型下只有一个值：**undefined**，故`undefined === undefined`
        - 任何没有被赋值的变量，其默认值就是：undefined
    2. `Null`
        - 该类型下只有一个值：**null**，故`null === null`
    3. `Boolean`
        - 该类型表示一个逻辑实体有两种值：**true** 或 **false**
    4. `String`
        - 该类型是有序序列的集合，该序列由0个或多个字符组成，最长可以达到(2^53-1)个字符。
        - 字符：值为16位的无符号整数的元素，即utf-16的编码单元值
        - 在ECMAScript程序中，字符串类型通常用来表示文本数据，其中的每个字符会被当作utf-16编码单元值。例如：
            - 字符：“忠”
            - Unicode编号，即码点：“U+5FE0”
            - UTF8编码：“E5 BF A0”
            - UTF-16BE编码：“5F E0”
            - UTF-16LE编码：“E0 5F”
        - 字符串序列中的每个字符/元素均占用了一个位置，就像数组一样，依次为：0 1 2 ...，字符串的长度就是这些字符的个数
        - 空字符串的长度为0，因为它不包含字符
        - ECMAScript 处理字符串值时，其将序列中的每个元素解释成一个UTF-16编码单元。然而，es并没有对字符串序列的编码单元有什么限制或要求，所以被翻译/解释成的UTF-16编码单元序列可能是不规范的（不过这部分，我暂时不用关心）。
        - ...
    5. `Symbol`
        - 待了解...
    6. `Number`
    7. `Object`
2. [ECMAScript Specification Types](#)

### 第七章 抽象运算/操作

1. 类型转换
2. 测试和比较运算/操作
3. 对象运算/操作
4. 迭代对象运算/操作

### 第十一章 ES语言：词法

- 前言
    - ECMAScript脚本或模块，首先被转化成一序列输入元素：token、行终止符、注释、空白。
    - ...
1. Unicode 格式控制字符
2. 空白
3. 行终止符
4. 注释
5. Token
6. 名称和关键字
7. 标点符号
8. 字面量
9. 自动分号插入
    - 前言
    - 分号自动插入规则
    - 分号自动插入例子

### 第十二章 ES语言：表达式

1. 标识符
2. 基本表达式
3. 左手边表达式
4. 后缀表达式
5. 一元运算符
6. 乘法运算符
7. 加法运算符
8. 二进制移位运算符
9. 关系运算符
10. 相等运算符
11. 二进制位运算符
12. 二进制逻辑运算符
13. 条件运算符
14. 赋值运算符
15. 逗号运算符

### 第十三章 ES语言：语句和声明

1. 语句语义
2. 块
3. 声明和变量的声明
4. 空语句
5. 表达式语句
6. if 语句
7. 迭代语句
8. continue 语句
9. break 语句
10. return 语句
11. with 语句
12. switch 语句
13. labelled 标签语句
14. throw 语句
15. try 语句
16. debugger 语句

### 第十四章 ES语言：函数和类

1. 函数定义
2. 箭头函数定义
3. 方法定义
4. 生成器函数定义
5. 类定义
6. 尾调用

### 第十五章 ES语言：脚本和模块

1. 脚本
2. 模块

### 第十六章 错误处理和语言扩展

1. 禁止扩展

### 第十七章 ES标准内建对象

### 第十八章 全局对象

### 第十九章 基本对象

### 第二十章 数字和对象

## 理解抽象



