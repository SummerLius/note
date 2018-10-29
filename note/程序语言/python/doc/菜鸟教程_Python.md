<!-- TOC -->

- [菜鸟教程 Python](#菜鸟教程-python)
    - [引言](#引言)
    - [中文编码](#中文编码)
    - [基础语法](#基础语法)
    - [变量类型](#变量类型)
    - [运算符](#运算符)
    - [条件语句](#条件语句)
    - [循环语句](#循环语句)
    - [数字](#数字)
    - [字符串](#字符串)
    - [列表](#列表)
    - [元组](#元组)
    - [字典](#字典)
    - [函数](#函数)
    - [模块](#模块)
    - [异常处理](#异常处理)
    - [面向对象](#面向对象)

<!-- /TOC -->

#  菜鸟教程 Python

## 引言

- 目前仅想快速了解一下python，故选择菜鸟教程过一遍。
- 本笔记文档按照菜鸟教程来整理：[地址：菜鸟教程python](http://www.runoob.com/python/python-tutorial.html)
- 注意：
    - 本文档大部分针对python@2.x，使用3.x时，需要注意下。
    - **本文档内容较少，仅供入门了解一下，详细学习须需步官方文档。**

## 中文编码

- 默认编码：
    - python@2.x默认为ASCII
    - python@3.x默认为utf8
- 故，如果2.x源码中有中文字符，需要在文件头指定编码格式：
    ```python
    #!/usr/bin/python
    # -*- coding: utf-8 -*- 或者 #coding=utf-8

    print "你好，世界";
    ```

## 基础语法

1. python标识符
    - 在 Python 里，标识符由字母、数字、下划线组成。
    - 在 Python 中，所有标识符可以包括英文、数字以及下划线(_)，但不能以数字开头。
    - Python 中的标识符是区分大小写的。
    - 以下划线开头的标识符是有特殊意义的。
        - 以单下划线开头 _foo 的代表不能直接访问的类属性，需通过类提供的接口进行访问，不能用 from xxx import * 而导入；
        - 以双下划线开头的 __foo 代表类的私有成员；
        - 以双下划线开头和结尾的 `__foo__` 代表 Python 里特殊方法专用的标识，如 `__init__()` 代表类的构造函数。
2. python保留字
    - 下面的列表显示了在Python中的保留字。这些保留字不能用作常数或变数，或任何其他标识符名称。
    - 所有 Python 的关键字只包含小写字母。
        ```
        and         exec        not
        assert      finally     or
        break       for         pass
        class       from        print
        continue    global      raise
        def         if          return
        del         import      try
        elif        in          while
        else        is          with
        except      lambda      yield
        ```
3. 行和缩进
    - 学习 Python 与其他语言最大的区别就是，Python 的代码块不使用大括号 {} 来控制类，函数以及其他逻辑判断。python 最具特色的就是用缩进来写模块。
    - 缩进的空白数量是可变的，但是所有代码块语句必须包含相同的缩进空白数量，这个必须严格执行，否则报错。
    - 建议你在每个缩进层次使用 **单个制表符** 或 **两个空格** 或 **四个空格** , 切记不能混用。
4. 多行语句
    - Python语句中一般以新行作为语句的结束符。
    - 但是我们可以使用斜杠（ \）将一行的语句分为多行显示，如下所示：
        ```python
        total = item_one + \
                item_two + \
                item_three
        ```
    - 语句中包含 [], {} 或 () 括号就不需要使用多行连接符。
        ```python
        days = ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday']
        ```
5. python引号
    - Python 可以使用引号( ' )、双引号( " )、三引号( ''' 或 """ ) 来表示字符串，引号的开始与结束必须的相同类型的。
    - 其中三引号可以由多行组成，编写多行文本的快捷语法，常用于文档字符串，在文件的特定地点，被当做注释。
        ```python
        word = 'word'
        sentence = "这是一个句子。"
        paragraph = """这是一个段落。
        包含了多个语句"""
        ```
6. python注释
    - python中单行注释采用 # 开头。
    - python 中多行注释使用三个单引号(''')或三个双引号(""")。
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        # 文件名：test.py
        
        
        '''
        这是多行注释，使用单引号。
        这是多行注释，使用单引号。
        这是多行注释，使用单引号。
        '''
        
        """
        这是多行注释，使用双引号。
        这是多行注释，使用双引号。
        这是多行注释，使用双引号。
        """
        ```
7. python空行
    - 空行与代码缩进不同，空行并不是Python语法的一部分。书写时不插入空行，Python解释器运行也不会出错。
    - 但是空行的作用在于分隔两段不同功能或含义的代码，便于日后代码的维护或重构。
    - 函数之间或类的方法之间用空行分隔，表示一段新的代码的开始。类和函数入口之间也用一行空行分隔，以突出函数入口的开始。
8. 等待用户输入
    - 下面的程序执行后就会等待用户输入，按回车键后就会退出：
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        raw_input("按下 enter 键退出，其他任意键显示...\n")
        ```
9. 同一行显示多条语句
    - Python可以在同一行中使用多条语句，语句之间使用分号`;`分割。
        ```python
        #!/usr/bin/python

        import sys; x = 'runoob'; sys.stdout.write(x + '\n')
        ```
10. print输出
    - print 默认输出是换行的，如果要实现不换行需要在变量末尾加上逗号 `,`
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        x="a"
        y="b"
        # 换行输出
        print x
        print y
        
        print '---------'
        # 不换行输出
        print x,
        print y,
        
        # 不换行输出
        print x,y
        ```
        ```python
        # 结果
        a
        b
        ---------
        a b a b
        ```
11. 多个语句构成代码组
    - 缩进相同的一组语句构成一个代码块，我们称之代码组。
    - 像if、while、def和class这样的复合语句，首行以关键字开始，以冒号( : )结束，该行之后的一行或多行代码构成代码组。
    - 我们将首行及后面的代码组称为一个子句(clause)。
        ```python
        if expression : 
           suite 
        elif expression :  
           suite  
        else :  
           suite 
        ```
12. 命令行参数
    - 很多程序可以执行一些操作来查看一些基本信息，Python 可以使用 -h 参数查看各参数帮助信息：`python -h`
    

## 变量类型

1. 变量赋值
    - Python 中的变量赋值不需要类型声明。
    - 每个变量在内存中创建，都包括变量的标识，名称和数据这些信息。
    - 每个变量在使用前都必须赋值，变量赋值以后该变量才会被创建。
    - 等号（=）用来给变量赋值。
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        counter = 100 # 赋值整型变量
        miles = 1000.0 # 浮点型
        name = "John" # 字符串
        
        print counter
        print miles
        print name
        ``` 
2. 多个变量赋值
    - Python允许你同时为多个变量赋值。例如：`a = b = c = 1`
    - 以上实例，创建一个整型对象，值为1，三个变量被分配到相同的内存空间上。
    - 您也可以为多个对象指定多个变量。例如：`a, b, c = 1, 2, "john"`
    - 以上实例，两个整型对象 1 和 2 分别分配给变量 a 和 b，字符串对象 "john" 分配给变量 c。
3. 标准数据类型
    - 在内存中存储的数据可以有多种类型。
    - Python有五个标准的数据类型：
        - Numbers（数字）
        - String（字符串）
        - List（列表）
        - Tuple（元组）
        - Dictionary（字典）
4. 数字
    - 数字数据类型用于存储数值。
    - 他们是不可改变的数据类型，这意味着改变数字数据类型会分配一个新的对象。
    - 当你指定一个值时，Number对象就会被创建：
        ```python
        var1 = 1
        var2 = 10
        ```
    - 您也可以使用del语句删除一些对象的引用。
    - del语句的语法是：`del var1[,var2[,var3[....,varN]]]]`
    - 您可以通过使用del语句删除单个或多个对象的引用。例如：
        ```python
        del var
        del var_a, var_b
        ```
    - Python支持四种不同的数字类型：
        - int（有符号整型）
        - long（长整型（也可以代表八进制和十六进制））
        - float（浮点型）
        - complex（复数）
    - 实例：
        |int|long|float|complex|
        |:--:|:--:|:--:|:--:|
        |10|51924361L|0.0|3.14j|
        |100|-0x19323L|15.20|45.j|
        |-786|0122L|-21.9|9.322e-36j|
        |080|0xDEFABCECBDAECBFBAEl|32.3e+18|.876j|
        |-0490|535633629843L|-90.|-.6545+0J|
        |-0x260|-052318172735L|-32.54e100|3e+26J|
        |0x69|-4721885298529L|70.2E-12|4.53e-7j|
        |||||
    - 长整型也可以使用小写 l，但是还是建议您使用大写 L，避免与数字 1 混淆。Python使用 L 来显示长整型。
    - Python 还支持复数，复数由实数部分和虚数部分构成，可以用 a + bj,或者 complex(a,b) 表示， 复数的实部 a 和虚部 b 都是浮点型。
    - 注意：long 类型只存在于 Python2.X 版本中，在 2.2 以后的版本中，int 类型数据溢出后会自动转为long类型。在 Python3.X 版本中 long 类型被移除，使用 int 替代。
5. 字符串
    - 字符串或串(String)是由数字、字母、下划线组成的一串字符。
    - 它是编程语言中表示文本的数据类型。
    - python的字串列表有2种取值顺序:
        - 从左到右索引默认0开始的，最大范围是字符串长度少1
        - 从右到左索引默认-1开始的，最大范围是字符串开头
            ```
             r  u  n  o  o  b
             0  1  2  3  4  5
            -6 -5 -4 -3 -2 -1
            ```
    - 如果你要实现从字符串中获取一段子字符串的话，可以使用 `[头下标:尾下标]` 来截取相应的字符串，其中下标是从 0 开始算起，可以是正数或负数，下标可以为空表示取到头或尾。
    - `[头下标:尾下标]` 获取的子字符串包含头下标的字符，但不包含尾下标的字符。
    - 加号（+）是字符串连接运算符，星号（*）是重复操作。
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        str = 'Hello World!'
        
        print str           # 输出完整字符串
        print str[0]        # 输出字符串中的第一个字符
        print str[2:5]      # 输出字符串中第三个至第五个之间的字符串
        print str[2:]       # 输出从第三个字符开始的字符串
        print str * 2       # 输出字符串两次
        print str + "TEST"  # 输出连接的字符串
        ```
        ```sh
        # 上面实例输出结果
        
        Hello World!
        H
        llo
        llo World!
        Hello World!Hello World!
        Hello World!TEST
        ```
6. 列表
    - List（列表） 是 Python 中使用最频繁的数据类型。
    - 列表可以完成大多数集合类的数据结构实现。它支持字符，数字，字符串甚至可以包含列表（即嵌套）。
    - 列表用 `[ ]` 标识，是 python 最通用的复合数据类型。
    - 列表中值的切割也可以用到`变量[头下标:尾下标]` ，就可以截取相应的列表，从左到右索引默认 0 开始，从右到左索引默认 -1 开始，下标可以为空表示取到头或尾。（类似于字符串类型）
        ```python
         t = ['a','b','c','d','e' ]
               0   1   2   3   4
              -5  -4  -3  -2  -1
        ```
    - 加号 + 是列表连接运算符，星号 * 是重复操作。
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        list = [ 'runoob', 786 , 2.23, 'john', 70.2 ]
        tinylist = [123, 'john']
        
        print list               # 输出完整列表
        print list[0]            # 输出列表的第一个元素
        print list[1:3]          # 输出第二个至第三个元素 
        print list[2:]           # 输出从第三个开始至列表末尾的所有元素
        print tinylist * 2       # 输出列表两次
        print list + tinylist    # 打印组合的列表
        ```
        ```python
        # 上面实例输出结果

        ['runoob', 786, 2.23, 'john', 70.2]
        runoob
        [786, 2.23]
        [2.23, 'john', 70.2]
        [123, 'john', 123, 'john']
        ['runoob', 786, 2.23, 'john', 70.2, 123, 'john']
        ```
7. 元组
    - 元组是另一个数据类型，类似于List（列表）。
    - 元组用"()"标识。内部元素用逗号隔开。但是元组不能二次赋值，相当于只读列表。
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        tuple = ( 'runoob', 786 , 2.23, 'john', 70.2 )
        tinytuple = (123, 'john')
        
        print tuple               # 输出完整元组
        print tuple[0]            # 输出元组的第一个元素
        print tuple[1:3]          # 输出第二个至第三个的元素 
        print tuple[2:]           # 输出从第三个开始至列表末尾的所有元素
        print tinytuple * 2       # 输出元组两次
        print tuple + tinytuple   # 打印组合的元组
        ```
        ```python
        # 上面实例输出结果

        ('runoob', 786, 2.23, 'john', 70.2)
        runoob
        (786, 2.23)
        (2.23, 'john', 70.2)
        (123, 'john', 123, 'john')
        ('runoob', 786, 2.23, 'john', 70.2, 123, 'john')
        ```
    - 以下是元组无效的，因为元组是不允许更新的。而列表是允许更新的：
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        tuple = ( 'runoob', 786 , 2.23, 'john', 70.2 )
        list = [ 'runoob', 786 , 2.23, 'john', 70.2 ]
        tuple[2] = 1000    # 元组中是非法应用
        list[2] = 1000     # 列表中是合法应用
        ```
8. 字典
    - 字典(dictionary)是除列表以外python之中最灵活的内置数据结构类型。列表是有序的对象集合，字典是无序的对象集合。
    - 两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。
    - 字典用"{ }"标识。字典由索引(key)和它对应的值value组成。
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        dict = {}
        dict['one'] = "This is one"
        dict[2] = "This is two"
        
        tinydict = {'name': 'john','code':6734, 'dept': 'sales'}
        
        
        print dict['one']          # 输出键为'one' 的值
        print dict[2]              # 输出键为 2 的值
        print tinydict             # 输出完整的字典
        print tinydict.keys()      # 输出所有键
        print tinydict.values()    # 输出所有值
        ```
        ```python
        # 输出结果

        This is one
        This is two
        {'dept': 'sales', 'code': 6734, 'name': 'john'}
        ['dept', 'code', 'name']
        ['sales', 6734, 'john']
        ```
9. 数据类型转换
    - 有时候，我们需要对数据内置的类型进行转换，数据类型的转换，你只需要将数据类型作为函数名即可。
    - 以下几个内置的函数可以执行数据类型之间的转换。这些函数返回一个新的对象，表示转换的值。
        |函数|描述|
        |:--:|:--:|
        |int(x [,base])|将x转换为一个整数|
        |long(x [,base] )|将x转换为一个长整数|
        |float(x)|将x转换到一个浮点数|
        |complex(real [,imag])|创建一个复数|
        |str(x)|将对象 x 转换为字符串|
        |repr(x)|将对象 x 转换为表达式字符串|
        |eval(str)|用来计算在字符串中的有效Python表达式,并返回一个对象|
        |tuple(s)|将序列 s 转换为一个元组|
        |list(s)|将序列 s 转换为一个列表|
        |set(s)|转换为可变集合|
        |dict(d)|创建一个字典。d 必须是一个序列 (key,value)元组。|
        |frozenset(s)|转换为不可变集合|
        |chr(x)|将一个整数转换为一个字符|
        |unichr(x)|将一个整数转换为Unicode字符|
        |ord(x)|将一个字符转换为它的整数值|
        |hex(x)|将一个整数转换为一个十六进制字符串|
        |oct(x)|将一个整数转换为一个八进制字符串|
        |||

## 运算符

1. 算符运算符
    - `+`：
    - `-`：
    - `*`：
    - `/`：
    - `%`：取模
    - `**`：幂
    - `//`：取整除 - 返回商的整数部分（向下取整）
    - 注意：Python2.x 里，整数除整数，只能得出整数。如果要得到小数部分，把其中一个数改成浮点数即可。
2. 比较（关系）运算符
    - `==`：等于
    - `!=`：不等于
    - `<>`：不等于
    - `>`：大于
    - `<`：小于
    - `>=`：大于等于
    - `<=`：小于等于
3. 赋值运算符
    - `=`：简单的赋值运算符
    - `+=`：加法赋值运算符
    - `-=`：
    - `*=`：
    - `/=`：
    - `%=`：
    - `**=`：
    - `=//`：
4. 位运算符
    - 按位运算符是把数字看作二进制来进行计算的。
    - `&`：按位与运算符：参与运算的两个值,如果两个相应位都为1,则该位的结果为1,否则为0
    - `|`：按位或运算符：只要对应的二个二进位有一个为1时，结果位就为1。
    - `^`：按位异或运算符：当两对应的二进位相异时，结果为1
    - `~`：按位取反运算符：对数据的每个二进制位取反,即把1变为0,把0变为1 。~x 类似于 -x-1
    - `<<`：左移动运算符：运算数的各二进位全部左移若干位，由 << 右边的数字指定了移动的位数，高位丢弃，低位补0。
    - `>>`：右移动运算符：把">>"左边的运算数的各二进位全部右移若干位，>> 右边的数字指定了移动的位数
5. 逻辑运算符
    - `and`：x and y，布尔"与" - 如果 x 为 False，x and y 返回 False，否则它返回 y 的计算值。
    - `or`：x or y，布尔"或" - 如果 x 是非 0，它返回 x 的值，否则它返回 y 的计算值。
    - `not`：not x，布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。
6. 成员运算符
    - `in`：如果在指定的序列中找到值返回 True，否则返回 False。
    - `not in`：如果在指定的序列中没有找到值返回 True，否则返回 False。
7. 身份运算符
    - 身份运算符用于比较两个对象的存储单元
    - `is`：is 是判断两个标识符是不是引用自一个对象。
        - x is y, 类似 id(x) == id(y) , 如果引用的是同一个对象则返回 True，否则返回 False
    - `is not`：is not 是判断两个标识符是不是引用自不同对象。
        - x is not y ， 类似 id(a) != id(b)。如果引用的不是同一个对象则返回结果 True，否则返回 False。
    - 注： id() 函数用于获取对象内存地址。
8. 运算符优先级
    - 以下表格列出了从最高到最低优先级的所有运算符：
        |函数|描述|
        |:--:|:--:|
        |`**`	|指数 (最高优先级)|
        |`~ + -`|	按位翻转, 一元加号和减号 (最后两个的方法名为 +@ 和 -@)|
        |`* / % //`|	乘，除，取模和取整除|
        |`+ -`|	加法减法|
        |`>> <<`|	右移，左移运算符|
        |`&`|	位 'AND'|
        |`^ |`|	位运算符|
        |`<= < > >=`|	比较运算符|
        |`<> == !=`|	等于运算符|
        |`= %= /= //= -= += *= **=`|	赋值运算符|
        |`is is not`|	身份运算符|
        |`in not in`|	成员运算符|
        |`not and or`|逻辑运算符|
        |||

## 条件语句

- Python程序语言指定任何非0和非空（null）值为true，0 或者 null为false。
- Python 编程中 if 语句用于控制程序的执行，基本形式为：
    ```python
    if 判断条件：
        执行语句……
    else：
        执行语句……
    ```
- 当判断条件为多个值时，可以使用以下形式：
    ```python
    if 判断条件1:
        执行语句1……
    elif 判断条件2:
        执行语句2……
    elif 判断条件3:
        执行语句3……
    else:
        执行语句4……
    ```
- 由于 python 并不支持 switch 语句，所以多个条件判断，只能用 elif 来实现。
- 你也可以在同一行的位置上使用if条件判断语句。
    ```python
    #!/usr/bin/python 
    # -*- coding: UTF-8 -*-
    
    var = 100 
    
    if ( var  == 100 ) : print "变量 var 的值为100" 
    
    print "Good bye!"
    ```

## 循环语句

1. 概述
    - Python提供了for循环和while循环（在Python中没有do..while循环）
        - `while`：在给定的判断条件为 true 时执行循环体，否则退出循环体。
        - `for`：重复执行语句
        - `嵌套`：你可以在while循环体中嵌套for循环
    - 循环控制语句：循环控制语句可以更改语句执行的顺序。Python支持以下循环控制语句。
        - `break`：	在语句块执行过程中终止循环，并且跳出整个循环
        - `continue`：在语句块执行过程中终止当前循环，跳出该次循环，执行下一次循环
        - `pass`：pass是空语句，是为了保持程序结构的完整性
2. while循环语句
    - 其基本形式为：
        ```python
        while 判断条件：
        执行语句……
        ```
    - 执行语句可以是单个语句或语句块。判断条件可以是任何表达式，任何非零、或非空（null）的值均为true。
        ```python
        #!/usr/bin/python
 
        count = 0
        while (count < 9):
           print 'The count is:', count
           count = count + 1
        
        print "Good bye!"
        ```
    - while 语句时还有另外两个重要的命令 continue，break 来跳过循环，continue 用于跳过该次循环，break 则是用于退出循环，此外"判断条件"还可以是个常值，表示循环必定成立。
        ```python
        # continue 和 break 用法
 
        i = 1
        while i < 10:   
            i += 1
            if i%2 > 0:     # 非双数时跳过输出
                continue
            print i         # 输出双数2、4、6、8、10
        
        i = 1
        while 1:            # 循环条件为1必定成立
            print i         # 输出1~10
            i += 1
            if i > 10:     # 当i大于10时跳出循环
                break
        ```
    - 无限循环
        - 如果条件判断语句永远为 true，循环将会无限的执行下去。
    - 循环使用 else 语句
        - 在 python 中，while … else 在循环条件为 false 时执行 else 语句块。
            ```python
            #!/usr/bin/python
 
            count = 0
            while count < 5:
               print count, " is  less than 5"
               count = count + 1
            else:
               print count, " is not less than 5"
            ```
    - 简单语句组
        - 类似 if 语句的语法，如果你的 while 循环体中只有一条语句，你可以将该语句与while写在同一行中， 如下所示：
            ```python
            #!/usr/bin/python
 
            flag = 1
            
            while (flag): print 'Given flag is really true!'
            
            print "Good bye!"
            ```
3. for循环语句
    - Python for循环可以遍历任何序列的项目，如一个列表或者一个字符串。
    - 语法格式：
        ```python
        for iterating_var in sequence:
            statements(s)
        ```
    - 例子：
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        for letter in 'Python':     # 第一个实例
           print '当前字母 :', letter
        
        fruits = ['banana', 'apple',  'mango']
        for fruit in fruits:        # 第二个实例
           print '当前水果 :', fruit
        
        print "Good bye!"
        ```
    - 通过序列索引迭代
        - 另外一种执行循环的遍历方式是通过索引。
            ```python
            #!/usr/bin/python
            # -*- coding: UTF-8 -*-
            
            fruits = ['banana', 'apple',  'mango']
            for index in range(len(fruits)):
               print '当前水果 :', fruits[index]
            
            print "Good bye!"
            ```
    - 循环使用 else 语句
        - 在 python 中，for … else 表示这样的意思，for 中的语句和普通的没有区别，else 中的语句会在循环正常执行完（即 for 不是通过 break 跳出而中断的）的情况下执行，while … else 也是一样。
            ```python
            #!/usr/bin/python
            # -*- coding: UTF-8 -*-
            
            for num in range(10,20):  # 迭代 10 到 20 之间的数字
               for i in range(2,num): # 根据因子迭代
                  if num%i == 0:      # 确定第一个因子
                     j=num/i          # 计算第二个因子
                     print '%d 等于 %d * %d' % (num,i,j)
                     break            # 跳出当前循环
               else:                  # 循环的 else 部分
                  print num, '是一个质数'
            ```
4. 嵌套循环
    - Python 语言允许在一个循环体里面嵌入另一个循环。
    - for和while可以相互嵌套。
5. break语句
    - Python break语句，就像在C语言中，打破了最小封闭for或while循环。
    - break语句用来终止循环语句，即循环条件没有False条件或者序列还没被完全递归完，也会停止执行循环语句。
    - break语句用在while和for循环中。
6. continue语句
    - Python continue 语句跳出本次循环，而break跳出整个循环。
    - continue 语句用来告诉Python跳过当前循环的剩余语句，然后继续进行下一轮循环。
    - continue语句用在while和for循环中。
7. pass语句
    - Python pass是空语句，是为了保持程序结构的完整性。
    - pass 不做任何事情，一般用做占位语句。

## 数字

1. 概要
    - Number 数据类型用于存储数值
    - 数据类型是不允许改变的,这就意味着如果改变 Number 数据类型的值，将重新分配内存空间
    - del语句删除一些 Number 对象引用。
        - `del var1[,var2[,var3[....,varN]]]]`
    - 四种不同类型数值类型
        - 整型(Int) - 通常被称为是整型或整数，是正或负整数，不带小数点。
        - 长整型(long integers) - 无限大小的整数，整数最后是一个大写或小写的L。
        - 浮点型(floating point real values) - 浮点型由整数部分与小数部分组成，浮点型也可以使用科学计数法表示（2.5e2 = 2.5 x 102 = 250）
        - 复数(complex numbers) - 复数由实数部分和虚数部分构成，可以用a + bj,或者complex(a,b)表示， 复数的实部a和虚部b都是浮点型。
    - 长整型也可以使用小写"L"，但是还是建议您使用大写"L"，避免与数字"1"混淆。Python使用"L"来显示长整型。
    - Python还支持复数，复数由实数部分和虚数部分构成，可以用a + bj,或者complex(a,b)表示， 复数的实部a和虚部b都是浮点型
    - 注意：long 类型只存在于 Python2.X 版本中，在 2.2 以后的版本中，int 类型数据溢出后会自动转为long类型。在 Python3.X 版本中 long 类型被移除，使用 int 替代。
2. Number类型转换
    ```
    int(x [,base ])         将x转换为一个整数  
    long(x [,base ])        将x转换为一个长整数  
    float(x )               将x转换到一个浮点数  
    complex(real [,imag ])  创建一个复数  
    str(x )                 将对象 x 转换为字符串  
    repr(x )                将对象 x 转换为表达式字符串  
    eval(str )              用来计算在字符串中的有效Python表达式,并返回一个对象  
    tuple(s )               将序列 s 转换为一个元组  
    list(s )                将序列 s 转换为一个列表  
    chr(x )                 将一个整数转换为一个字符  
    unichr(x )              将一个整数转换为Unicode字符  
    ord(x )                 将一个字符转换为它的整数值  
    hex(x )                 将一个整数转换为一个十六进制字符串  
    oct(x )                 将一个整数转换为一个八进制字符串  
    ```
3. Python math 模块、cmath 模块
    - Python 中数学运算常用的函数基本都在 math 模块、cmath 模块中。
    - Python math 模块提供了许多对浮点数的数学运算函数。
    - Python cmath 模块包含了一些用于复数运算的函数。
    - cmath 模块的函数跟 math 模块函数基本一致，区别是 cmath 模块运算的是复数，math 模块运算的是数学运算。
4. Number相关函数
    - 略

## 字符串

1. 概要
    - 字符串是 Python 中最常用的数据类型。我们可以使用引号('或")来创建字符串。
2. 访问字符串中的值
    - Python不支持单字符类型，单字符在 Python 中也是作为一个字符串使用。
    - Python访问子字符串，可以使用方括号来截取字符串
        ```python
        #!/usr/bin/python
 
        var1 = 'Hello World!'
        var2 = "Python Runoob"
        
        print "var1[0]: ", var1[0]
        print "var2[1:5]: ", var2[1:5]
        ```
3. 字符串修改
4. 字符串转义字符
    ```
    \(在行尾时)	续行符
    \\	反斜杠符号
    \'	单引号
    \"	双引号
    \a	响铃
    \b	退格(Backspace)
    \e	转义
    \000	空
    \n	换行
    \v	纵向制表符
    \t	横向制表符
    \r	回车
    \f	换页
    \oyy	八进制数，yy代表的字符，例如：\o12代表换行
    \xyy	十六进制数，yy代表的字符，例如：\x0a代表换行
    \other	其它的字符以普通格式输出
    ```
5. 字符串运算符
    - 下表实例变量 a 值为字符串 "Hello"，b 变量值为 "Python"：
        |操作符|描述|实例|
        |:--:|:--:|:--:|
        |+|字符串连接|>>>a + b -> 'HelloPython'|
        |-|重复输出字符串|>>>a * 2 -> 'HelloHello'|
        |[]|通过索引获取字符串中字符| >>>a[1] -> 'e'|
        |[:]|截取字符串中的一部分|>>>a[1:4] -> 'ell'|
        |in|成员运算符 - 如果字符串中包含给定的字符返回 True|>>>"H" in a -> True|
        |not in|成员运算符 - 如果字符串中不包含给定的字符返回 True|>>>"M" not in a -> True|
        |r/R|原始字符串 - 原始字符串：所有的字符串都是直接按照字面的意思来使用，没有转义特殊或不能打印的字符。 原始字符串除在字符串的第一个引号前加上字母"r"（可以大小写）以外，与普通字符串有着几乎完全相同的语法。||
        |%|格式字符串||
6. 字符串格式化
    - Python 支持格式化字符串的输出 。尽管这样可能会用到非常复杂的表达式，但最基本的用法是将一个值插入到一个有字符串格式符 %s 的字符串中。
    - 在 Python 中，字符串格式化使用与 C 中 sprintf 函数一样的语法。
        ```python
        #!/usr/bin/python

        print "My name is %s and weight is %d kg!" % ('Zara', 21) 
        ```
    - python字符串格式化符号:
        ```
        符   号	描述
        %c	 格式化字符及其ASCII码
        %s	 格式化字符串
        %d	 格式化整数
        %u	 格式化无符号整型
        %o	 格式化无符号八进制数
        %x	 格式化无符号十六进制数
        %X	 格式化无符号十六进制数（大写）
        %f	 格式化浮点数字，可指定小数点后的精度
        %e	 用科学计数法格式化浮点数
        %E	 作用同%e，用科学计数法格式化浮点数
        %g	 %f和%e的简写
        %G	 %f 和 %E 的简写
        %p	 用十六进制数格式化变量的地址
        ```
    - 格式化操作符辅助指令:
        ```
        *	定义宽度或者小数点精度
        -	用做左对齐
        +	在正数前面显示加号( + )
        <sp>	在正数前面显示空格
        #	在八进制数前面显示零('0')，在十六进制前面显示'0x'或者'0X'(取决于用的是'x'还是'X')
        0	显示的数字前面填充'0'而不是默认的空格
        %	'%%'输出一个单一的'%'
        (var)	映射变量(字典参数)
        m.n.	m 是显示的最小总宽度,n 是小数点后的位数(如果可用的话)
        ```
    - Python2.6 开始，新增了一种格式化字符串的函数 str.format()，它增强了字符串格式化的功能。
7. 三引号
    - python中三引号可以将复杂的字符串进行复制
    - python三引号允许一个字符串跨多行，字符串中可以包含换行符、制表符以及其他特殊字符。
    - 三引号的语法是一对连续的单引号或者双引号（通常都是成对的用）。
        ```python
        >>> hi = '''hi 
        there'''
        >>> hi   # repr()
        'hi\nthere'
        >>> print hi  # str()
        hi 
        there  
        ```
    - 三引号让程序员从引号和特殊字符串的泥潭里面解脱出来，自始至终保持一小块字符串的格式是所谓的WYSIWYG（所见即所得）格式的。
    - 一个典型的用例是，当你需要一块HTML或者SQL时，这时用字符串组合，特殊字符串转义将会非常的繁琐。
        ```python
         errHTML = '''
        <HTML><HEAD><TITLE>
        Friends CGI Demo</TITLE></HEAD>
        <BODY><H3>ERROR</H3>
        <B>%s</B><P>
        <FORM><INPUT TYPE=button VALUE=Back
        ONCLICK="window.history.back()"></FORM>
        </BODY></HTML>
        '''
        cursor.execute('''
        CREATE TABLE users (  
        login VARCHAR(8), 
        uid INTEGER,
        prid INTEGER)
        ''')
        ```
8. unicode字符串
    - Python 中定义一个 Unicode 字符串和定义一个普通字符串一样简单：
        ```python
        >>> u'Hello World !'
        u'Hello World !'
        ```
    - 引号前小写的"u"表示这里创建的是一个 Unicode 字符串。如果你想加入一个特殊字符，可以使用 Python 的 Unicode-Escape 编码。如下例所示：
        ```python
        >>> u'Hello\u0020World !'
        u'Hello World !'
        ```
    - 被替换的 \u0020 标识表示在给定位置插入编码值为 0x0020 的 Unicode 字符（空格符）。


## 列表

1. 概要
    - 列表是Python中最基本的数据结构。列表中的每个元素都分配一个数字，即它的位置，或索引，第一个索引是0，第二个索引是1，依此类推。
    - 列表都可以进行的操作包括索引，切片，加，乘，检查成员。
    - 列表是最常用的Python数据类型，它可以作为一个方括号内的逗号分隔值出现。
    - 列表的数据项不需要具有相同的类型。
    - 与字符串的索引一样，列表索引从0开始。列表可以进行截取、组合等。
    - 创建一个列表，只要把逗号分隔的不同的数据项使用方括号括起来即可。如下所示：
        ```python
        list1 = ['physics', 'chemistry', 1997, 2000]
        list2 = [1, 2, 3, 4, 5 ]
        list3 = ["a", "b", "c", "d"]
        ```
2. 访问列表中的值
    - 使用下标索引来访问列表中的值
    - 同样你也可以使用方括号的形式截取字符
3. 修改列表
    - 你可以对列表的数据项进行修改或更新，你也可以使用append()方法来添加列表项
4. 删除列表元素
    - 可以使用 del 语句来删除列表的元素
5. 运算符操作
    - 列表对 `+` 和 `*` 的操作符与字符串相似。`+` 号用于组合列表，`*` 号用于重复列表。
6. 列表截取
    - 下标截取
7. 列表函数和方法
    - 略


## 元组

1. 概述
    - Python的元组与列表类似，不同之处在于元组的元素不能修改。
    - 元组使用小括号，列表使用方括号。
    - 元组创建很简单，只需要在括号中添加元素，并使用逗号隔开即可。
        ```python
        tup1 = ('physics', 'chemistry', 1997, 2000)
        tup2 = (1, 2, 3, 4, 5 )
        tup3 = "a", "b", "c", "d"
        ```
    - 创建空元组。`tup1 = ()`
    - 元组中只包含一个元素时，需要在元素后面添加逗号。`tup1 = (50,)`
    - 元组与字符串类似，下标索引从0开始，可以进行截取，组合等。
2. 访问元组
    - 元组可以使用下标索引来访问元组中的值
        ```python
        #!/usr/bin/python
 
        tup1 = ('physics', 'chemistry', 1997, 2000)
        tup2 = (1, 2, 3, 4, 5, 6, 7 )
        
        print "tup1[0]: ", tup1[0]
        print "tup2[1:5]: ", tup2[1:5]
        ```
3. 修改元组
    - 元组中的元素值是不允许修改的，但我们可以对元组进行连接组合
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        tup1 = (12, 34.56)
        tup2 = ('abc', 'xyz')
        
        # 以下修改元组元素操作是非法的。
        # tup1[0] = 100
        
        # 创建一个新的元组
        tup3 = tup1 + tup2
        print tup3
        ```
4. 删除元组
    - 元组中的元素值是不允许删除的，但我们可以使用del语句来删除整个元组
        ```python
        #!/usr/bin/python
 
        tup = ('physics', 'chemistry', 1997, 2000)
        
        print tup
        del tup
        print "After deleting tup : "
        print tup
        ```
5. 元组运算符
    - 与字符串一样，元组之间可以使用 `+` 号和 `*` 号进行运算。
    - 这就意味着他们可以组合和复制，运算后会生成一个新的元组。
        ```python
        len((1, 2, 3)) # 3 计算元素个数
        (1, 2, 3) + (4, 5, 6) # (1, 2, 3, 4, 5, 6)	连接
        ('Hi!',) * 4 # ('Hi!', 'Hi!', 'Hi!', 'Hi!')	复制
        3 in (1, 2, 3) #True 元素是否存在
        for x in (1, 2, 3): print x, #1 2 3	迭代
        ```
6. 元组索引，截取
    - 因为元组也是一个序列，所以我们可以访问元组中的指定位置的元素，也可以截取索引中的一段元素
7. 无关闭分隔符
    - 任意无符号的对象，以逗号隔开，默认为元组
        ```python
        #!/usr/bin/python
 
        print 'abc', -4.24e93, 18+6.6j, 'xyz'
        x, y = 1, 2
        print "Value of x , y : ", x,y
        ```
8. 元组内置函数
    - 略



## 字典

1. 概述
    - 字典是另一种可变容器模型，且可存储任意类型对象。
    - 字典的每个键值 `key=>value` 对用冒号 `:` 分割，每个键值对之间用逗号 `,` 分割，整个字典包括在花括号 `{}` 中。
    - 格式：`d = {key1 : value1, key2 : value2 }`
    - 键一般是唯一的，如果重复最后的一个键值对会替换前面的，值不需要唯一。
    - 值可以取任何数据类型，但键必须是不可变的，如字符串，数字或元组。
2. 访问字典里的值
    - 把相应的键放入熟悉的方括弧
    - 如果用字典里没有的键访问数据，会输出错误
3. 修改字典
    - 向字典添加新内容的方法是增加新的键/值对
4. 删除字典元素
    - 能删单一的元素也能清空字典，清空只需一项操作
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'};
        
        del dict['Name']; # 删除键是'Name'的条目
        dict.clear();     # 清空词典所有条目
        del dict ;        # 删除词典
        
        print "dict['Age']: ", dict['Age'];
        print "dict['School']: ", dict['School'];
        ```
5. 字典键的特性
    - 字典值可以没有限制地取任何python对象，既可以是标准的对象，也可以是用户定义的，但键不行。
    - 两个重要的点需要记住：
        1. 不允许同一个键出现两次。创建时如果同一个键被赋值两次，后一个值会被记住
        2. 键必须不可变，所以可以用数字，字符串或元组充当，所以用列表就不行
6. 字典内置函数和方法
    - 略

## 函数

1. 概述
    - 函数是组织好的，可重复使用的，用来实现单一，或相关联功能的代码段。
    - 函数能提高应用的模块性，和代码的重复利用率。你已经知道Python提供了许多内建函数，比如print()。但你也可以自己创建函数，这被叫做用户自定义函数。
2. 定义一个函数
    - 函数代码块以 def 关键词开头，后接函数标识符名称和圆括号()。
    - 任何传入参数和自变量必须放在圆括号中间。圆括号之间可以用于定义参数。
    - 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。
    - 函数内容以冒号起始，并且缩进。
    - return [表达式] 结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None。

    - 语法：
        ```python
        def functionname( parameters ):
            "函数_文档字符串"
            function_suite
            return [expression]
        ```
    - 例子：
        ```python
        def printme( str ):
            "打印传入的字符串到标准显示设备上"
            print str
            return
        ```
3. 函数调用
    - 定义一个函数给了函数一个名称，指定了函数里包含的参数，和代码块结构。
    - 这个函数的基本结构完成以后，你可以通过另一个函数调用执行，也可以直接从Python提示符执行。
4. 参数传递
    - 在 python 中，类型属于对象，变量是没有类型的：
    - 以下代码中，`[1,2,3]` 是 List 类型，"Runoob" 是 String 类型，而变量 a 是没有类型，她仅仅是一个对象的引用（一个指针），可以是 List 类型对象，也可以指向 String 类型对象。
        ```python
        a=[1,2,3]
 
        a="Runoob"
        ```
    - 可更改(mutable)与不可更改(immutable)对象
        - 在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list,dict 等则是可以修改的对象。
        - 不可变类型：变量赋值 a=5 后再赋值 a=10，这里实际是新生成一个 int 值对象 10，再让 a 指向它，而 5 被丢弃，不是改变a的值，相当于新生成了a。
        - 可变类型：变量赋值 la=[1,2,3,4] 后再赋值 la[2]=5 则是将 list la 的第三个元素值更改，本身la没有动，只是其内部的一部分值被修改了。
    - python 函数的参数传递：
        - 不可变类型：类似 c++ 的值传递，如 整数、字符串、元组。如fun（a），传递的只是a的值，没有影响a对象本身。比如在 fun（a）内部修改 a 的值，只是修改另一个复制的对象，不会影响 a 本身。
        - 可变类型：类似 c++ 的引用传递，如 列表，字典。如 fun（la），则是将 la 真正的传过去，修改后fun外部的la也会受影响
    - python 中一切都是对象，严格意义我们不能说值传递还是引用传递，我们应该说传不可变对象和传可变对象。
5. 参数
    - 以下是调用函数时可使用的正式参数类型：
        - 必备参数
        - 关键字参数
        - 默认参数
        - 不定长参数
    - 必备参数
        - 必备参数须以正确的顺序传入函数。调用时的数量必须和声明时的一样。
    - 关键字参数
        - 关键字参数和函数调用关系紧密，函数调用使用关键字参数来确定传入的参数值。
        - 使用关键字参数允许函数调用时参数的顺序与声明时不一致，因为 Python 解释器能够用参数名匹配参数值。
            ```python
            #!/usr/bin/python
            # -*- coding: UTF-8 -*-
            
            #可写函数说明
            def printinfo( name, age ):
               "打印任何传入的字符串"
               print "Name: ", name;
               print "Age ", age;
               return;
            
            #调用printinfo函数
            printinfo( age=50, name="miki" );
            ```
    - 默认参数
        - 调用函数时，默认参数的值如果没有传入，则被认为是默认值。
            ```python
            #!/usr/bin/python
            # -*- coding: UTF-8 -*-
            
            #可写函数说明
            def printinfo( name, age = 35 ):
               "打印任何传入的字符串"
               print "Name: ", name;
               print "Age ", age;
               return;
            
            #调用printinfo函数
            printinfo( age=50, name="miki" );
            printinfo( name="miki" );
            ```
    - 不定长参数
        - 你可能需要一个函数能处理比当初声明时更多的参数。这些参数叫做不定长参数，和上述2种参数不同，声明时不会命名。
        - 加了星号（*）的变量名会存放所有未命名的变量参数。
        - 基本语法如下：
            ```python
            def functionname([formal_args,] *var_args_tuple ):
                "函数_文档字符串"
                function_suite
                return [expression]
            ```
        - 实例：
            ```python
            #!/usr/bin/python
            # -*- coding: UTF-8 -*-
            
            # 可写函数说明
            def printinfo( arg1, *vartuple ):
               "打印任何传入的参数"
               print "输出: "
               print arg1
               for var in vartuple:
                  print var
               return;
            
            # 调用printinfo 函数
            printinfo( 10 );
            printinfo( 70, 60, 50 );
            ```
6. 匿名函数
    - python 使用 lambda 来创建匿名函数。
        - lambda只是一个表达式，函数体比def简单很多。
        - lambda的主体是一个表达式，而不是一个代码块。仅仅能在lambda表达式中封装有限的逻辑进去。
        - lambda函数拥有自己的命名空间，且不能访问自有参数列表之外或全局命名空间里的参数。
        - 然lambda函数看起来只能写一行，却不等同于C或C++的内联函数，后者的目的是调用小函数时不占用栈内存从而增加运行效率。
    - 语法：`lambda [arg1 [,arg2,.....argn]]:expression`
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        # 可写函数说明
        sum = lambda arg1, arg2: arg1 + arg2;
        
        # 调用sum函数
        print "相加后的值为 : ", sum( 10, 20 )
        print "相加后的值为 : ", sum( 20, 20 )
        ```
7. return语句
    - return语句退出函数，选择性地向调用方返回一个表达式。不带参数值的return语句返回None。
8. 变量作用域
    - 一个程序的所有的变量并不是在哪个位置都可以访问的。访问权限决定于这个变量是在哪里赋值的。
    - 变量的作用域决定了在哪一部分程序你可以访问哪个特定的变量名称。两种最基本的变量作用域如下：
        - 全局变量
        - 局部变量
9. 全局变量和局部变量
    - 定义在函数内部的变量拥有一个局部作用域，定义在函数外的拥有全局作用域。
    - 局部变量只能在其被声明的函数内部访问，而全局变量可以在整个程序范围内访问。
    - 调用函数时，所有在函数内声明的变量名称都将被加入到作用域中。如下实例：
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        total = 0; # 这是一个全局变量
        # 可写函数说明
        def sum( arg1, arg2 ):
           #返回2个参数的和."
           total = arg1 + arg2; # total在这里是局部变量.
           print "函数内是局部变量 : ", total
           return total;
        
        #调用sum函数
        sum( 10, 20 );
        print "函数外是全局变量 : ", total
        ```

## 模块

1. 概述
    - Python 模块(Module)，是一个 Python 文件，以 .py 结尾，包含了 Python 对象定义和Python语句。
    - 模块让你能够有逻辑地组织你的 Python 代码段。
    - 把相关的代码分配到一个模块里能让你的代码更好用，更易懂。
    - 块能定义函数，类和变量，模块里也能包含可执行的代码。
2. import语句
    - 模块定义好后，我们可以使用 import 语句来引入模块，语法如下：
        ```python
        import module1[, module2[,... moduleN]]
        ```
    - 一个模块只会被导入一次，不管你执行了多少次import。这样可以防止导入模块被一遍又一遍地执行。
    - 比如要引用模块 math，就可以在文件最开始的地方用 import math 来引入。在调用 math 模块中的函数时，必须这样引用：`模块名.函数名`
3. from...import语句
    - Python 的 from 语句让你从模块中导入一个指定的部分到当前命名空间中。
        ```python
        from modname import name1[, name2[, ... nameN]]
        ```
    - 例如，要导入模块 fib 的 fibonacci 函数，使用如下语句：
        ```python
        from fib import fibonacci
        ```
    - 这个声明不会把整个 fib 模块导入到当前的命名空间中，它只会将 fib 里的 fibonacci 单个引入到执行这个声明的模块的全局符号表。
4. from...import *语句
    - 把一个模块的所有内容全都导入到当前的命名空间也是可行的，只需使用如下声明：
        ```python
        from modname import *
        ```
    - 这提供了一个简单的方法来导入一个模块中的所有项目。然而这种声明不该被过多地使用。
    - 例如我们想一次性引入 math 模块中所有的东西，语句如下：
        ```python
        from math import *
        ```
5. 搜索路径
    - 当你导入一个模块，Python 解析器对模块位置的搜索顺序是：
        1. 当前目录
        2. 如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录
        3. 如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为/usr/local/lib/python/
6. PYTHONPATH 变量
    - 作为环境变量，PYTHONPATH 由装在一个列表里的许多目录组成。PYTHONPATH 的语法和 shell 变量 PATH 的一样。
    - 在 Windows 系统，典型的 PYTHONPATH 如下：
        ```
        set PYTHONPATH=c:\python27\lib;
        ```
    - 在 UNIX 系统，典型的 PYTHONPATH 如下：
        ```
        set PYTHONPATH=/usr/local/lib/python
        ```
7. 命名空间和作用域
    - 命名空间是一个包含了变量名称们（键）和它们各自相应的对象们（值）的字典。
    - 一个 Python 表达式可以访问局部命名空间和全局命名空间里的变量。
    - 如果一个局部变量和一个全局变量重名，则局部变量会覆盖全局变量。
    - 每个函数都有自己的命名空间。类的方法的作用域规则和通常函数的一样。
    - Python 会智能地猜测一个变量是局部的还是全局的，它假设任何在函数内赋值的变量都是局部的。
    - 因此，如果要给函数内的全局变量赋值，必须使用 global 语句。
    - global VarName 的表达式会告诉 Python， VarName 是一个全局变量，这样 Python 就不会在局部命名空间里寻找这个变量了。
8. dir()函数
    - dir() 函数一个排好序的字符串列表，内容是一个模块里定义过的名字。
    - 返回的列表容纳了在一个模块里定义的所有模块，变量和函数。如下一个简单的实例：
        ```python
        #!/usr/bin/python
        # -*- coding: UTF-8 -*-
        
        # 导入内置math模块
        import math
        
        content = dir(math)
        
        print content;
        ```
        ```python
        # 结果
        ['__doc__', '__file__', '__name__', 'acos', 'asin', 'atan', 
        'atan2', 'ceil', 'cos', 'cosh', 'degrees', 'e', 'exp', 
        'fabs', 'floor', 'fmod', 'frexp', 'hypot', 'ldexp', 'log',
        'log10', 'modf', 'pi', 'pow', 'radians', 'sin', 'sinh', 
        'sqrt', 'tan', 'tanh']
        ```
    - 在这里，特殊字符串变量`__name__`指向模块的名字，`__file__`指向该模块的导入文件名。
9. globals()和locals()函数
    - 根据调用地方的不同，globals() 和 locals() 函数可被用来返回全局和局部命名空间里的名字。
    - 如果在函数内部调用 locals()，返回的是所有能在该函数里访问的命名。
    - 如果在函数内部调用 globals()，返回的是所有在该函数里能访问的全局名字。
    - 两个函数的返回类型都是字典。所以名字们能用 keys() 函数摘取。
10. reload()函数
    - 当一个模块被导入到一个脚本，模块顶层部分的代码只会被执行一次。
    - 因此，如果你想重新执行模块里顶层部分的代码，可以用 reload() 函数。该函数会重新导入之前导入过的模块。语法如下：
        ```python
        reload(module_name)
        ```
    - 在这里，module_name要直接放模块的名字，而不是一个字符串形式。比如想重载 hello 模块，如下：
        ```python
        reload(hello)
        ```
11. python中的包
    - 包是一个分层次的文件目录结构，它定义了一个由模块及子包，和子包下的子包等组成的 Python 的应用环境。
    - 简单来说，包就是文件夹，但该文件夹下必须存在 `__init__.py` 文件, 该文件的内容可以为空。`__init__.py` 用于标识当前文件夹是一个包。

## 异常处理

## 面向对象



