<!-- TOC -->

- [第十一章 ES语言：词法](#第十一章-es语言词法)
    - [Unicode 格式控制符](#unicode-格式控制符)
    - [空白](#空白)
    - [行终止符](#行终止符)
    - [注释](#注释)
    - [Token](#token)
    - [名称和关键字](#名称和关键字)
    - [标点符号](#标点符号)
    - [字面量](#字面量)
    - [自动分号插入](#自动分号插入)
    - [参考](#参考)

<!-- /TOC -->

# 第十一章 ES语言：词法

<!-- - p160
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
    - 分号自动插入例子 -->

- 一个ESMAScript脚本或模块源文件，首先被转换为一个输入元素的序列，包括tokens（最小词法单元）、行终止符、注释、和空白。
- ... 有点晦涩，待整理？？？ ...

## Unicode 格式控制符

- 待整理...

## 空白

- 空白通常被用来提高源代码的可读性和分隔tokens（最小词法单元），然后也没啥其他作用了。
- 空白可能在两个tokens之间，或在input的前面或后面。
- 也可能作为字符串字面量、正则表达式字面量等中的一部分，在其中，空白也作为一个字面量的值，是具有实际意义的。
- 也可能出现在注释中，但是不能在任何token的内部，因为token就是以空白分隔的。

ECMAScript下的空白码点如下表：
|码点|名称|缩写|
|:--:|:--:|:--:|
|U+0009|水平制表符|TAB|
|U+000B|垂直制表符|VT|
|U+000C|换页键|FF|
|U+0020|空格|SP|
|U+00A0|不间断空格|NBSP|
|U+FEFF|零宽不间断空格|ZWNBSP|
|其他类别 “Zs”|任何其他Unicode “Separator，space” 码点|USP|

- ECMAScript标准实现方必须，将Unicode中属性类别为“Separator,space” (Zs)的字符识别为空白（WhiteSpace）
- Syntax
    - TAB
    - VT
    - FF
    - SP
    - NBSP
    - ZWNBSP
    - USP

> 如果不懂，可能需要看下unicode官网对于字符的组织结构并赋予每个字符的属性

## 行终止符

- 就像空白字符一样，行终止符也用来提高源代码的可读性和分隔tokens（最小词法单元）。然而与之不同的是，行终止符对于语法的行为有一定影响。

ECMAScript下的空白码点如下表：
|码点|名称|缩写|
|:--:|:--:|:--:|
|U+000A|换行|LF|
|U+000D|回车|CR|
|U+2028|行分隔符|LS|
|U+2029|段分隔符|PS|


## 注释

- 注释有单行和多行两种类型，多行注释不能嵌套
- 单行：`//`
- 多行：`/*  */`

## Token

- Token，词法最小单元
- CommonToken：
    - 标识符名称（IdentifierName）
    - 标点符号（Punctuator）
    - 数字字面量（NumberLiteral）
    - 字符串字面量（StringLiteral）
    - 模板（Template）
- 注意：`DivPunctuator`， `RegularExpressionLiteral`，`RightBracePunctuator`，`TemplateSubstitutionTail`属于其他Token，不属于CommonToken

## 名称和关键字

- 标识符名称（IdentifierName）和保留字（ReservedWord）均属于词法最小单元Token。其两者根据Unicode标准附件#31给出的默认标识符语法被解释。
- 保留字是标识符名称的可枚举子集，标识符（Identifier）的定义即为：不是保留字的标识符名称。
- 标识符名称语法
    - 标识符开始字符
        - `UnicodeIDStart`：具有Unicode属性“ID_Start”的任何Unicode代码点
        - `$`
        - `_`
        - `\ UnicodeEscapeSequence`：转义序列代表的字符只能为上面列举的字符，否则报错
    - 标识符非开始字符
        - `UnicodeIDContinue`：具有Unicode属性“ID_Continue”的任何Unicode代码点
        - `$`
        - `_`
        - `<zwnj>`：零宽无连接符，U+200C
        - `<zwj>`：零宽连接符，U+200D
        - `\ UnicodeEscapeSequence`：转义序列代表的字符只能为上面列举的字符，否则报错
- [标识符名称](#)
    - 静态语义：早期错误
        - 对于，标识符的开始字符，如果是转义序列`\ UnicodeEscapeSequence`，但是转义代表的不是其中的字符则报错：`$`，`_`，`UnicodeIDStart`
        - 对于，标识符非开始字符，如果含有转义序列`\ UnicodeEscapeSequence`，但是转义代表的不是其中的字符则报错：`$`，`_`，`UnicodeIDContinue`，`<zwnj>`，`<zwj>`
    - 静态语义：字符串值
        - 返回由与IdentifierName对应的编码单元序列组成的字符串值。
        - 在确定序列时，首先将其中的`\ UnicodeEscapeSequence`替换成码点，然后IdentifierName对应的所有码点通过[UTF16Encoding](#)编码成编码单元（code units）
- [保留字](#)
    - 保留字不能用作标识符（Identifier）的标识符名称（IdentifierName）
    - 保留字语法：
        - 关键字（keyword）
        - 未来保留字（FutureReservedWord）
        - 空字面量（NullLiteral）
        - 布尔字面量（Bool额按Literal）
    - 注意：保留字中的码点不能由转义序列（`\UnicodeEscapeSequence`）来表示
    - 关键字
        - await
        - break
        - case catch class const continue
        - debugger default delete do
        - else export extends
        - finally for function
        - if import in instanceof
        - new
        - return
        - super switch
        - this throw try typeof
        - var void
        - while with
        - yield
        - 注意：
            - 在某些上下文中，`yield` 和 `await` 可以作为标识符，见12.1.1章节；
            - 在严格模式下，通过静态语义限制而不是词法，`let` 和 `static` 也被当做保留关键字。
    - 未来保留字
        - 下面的tokens保留用作将来语言扩展中的关键字
        - 语法：
            - enum
        - 下面的tokens在严格模式下，也是当做保留字
            - implements interface
            - package private protected public


## 标点符号

- Punctuator
    - `{` `(` `)` `[` `]`
    - `.` `...` `;` `,` 
    - `<` `>` `<=` `>=` 
    - `==` `!=` `===` `!==` 
    - `+` `-` `*` `%` `**` 
    - `++` `--` 
    - `<<` `>>` `>>>` 
    - `&` `|` `^` 
    - `!` `~` 
    - `&&` `||` 
    - `? :` 
    - `=` `+=` `-=` `*=` `%=` `**=` `<<=` `>>=` `>>>=` `&=` `|=` `^=`
    - `=>`
- DivPunctuator
    - `/`
    - `/=`
- RightBracePunctuator
    - `}` 

## 字面量

- [Null 字面量](#)
    - NullLiteral
        - null
- [Boolean 字面量](#)
    - BooleanLiteral
        - true
        - false
- [Numeric 字面量](#)
    - [语法](#)
        - 提前约定：
            - NonZeroDigit：其中之一   1 2 3 4 5 6 7 8 9
            - DecimalDigit：其中之一 0 1 2 3 4 5 6 7 8 9
            - DecimalDigits：任意组合 DecimalDigit
            - DecimalIntegerLiteral:
                - `[0]`
                - `[NonZeroDigit] [DecimalDigits （可选）]`
            - ExponentIndicator（指数标志）：e 或 E
            - SignedInteger：有符号整数
                - `[DecimalDigits]`
                - `[+ DecimalDigits]`
                - `[- DecimalDigits]`
            - ExponentPart：
                - `[ExponentIndicator] [SignedInteger]`
            - BinaryDigit：其中之一 0 1
            - BinaryDigits：任意组合 BinaryDigit
            - OctalDigit：其中之一 0 1 2 3 4 5 6 7
            - OctalDigits：任意组合 OctalDigit
            - HexDigit：其中之一 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
            - Hexigits：任意组合 HexIntegerDigit
        - 十进制字面量
            - `[DecimalIntegerLiteral] . [DecimalDigits（可选）] [ExponentPart（可选）]`
            - `. [DecimalDigits] [ExponentPart（可选）]`
            - `[DecimalIntegerLiteral] [ExponentPart（可选）]`
        - 二进制字面量
            - `[0b] [BinaryDigits]`
            - `[0B] [BinaryDigits]`
        - 八进制字面量
            - `[0o] [OctalDigits]`
            - `[0O] [OctalDigits]`
        - 十六进制字面量
            - `[0x] [Hexigits]`
            - `[0X] [Hexigits]`
    - [静态语义：MV（mathematical value 数值）](#)
        - Numeric literal表示ES数字类型的值。该值分两步确定，首先mv由字面量得到；然后该mv有下面规则进一步确定：
            - [规则详情请点击该链接](http://www.ecma-international.org/ecma-262/8.0/index.html#sec-static-semantics-mv)
- [String 字面量](#)
    - [语法](#)
        - 提前约定
             - DoubleStringCharacter
             - DoubleStringCharacters：任意组合 DoubleStringCharacter
             - SingleStringCharacter
             - SingleStringCharacters: 任意组合 SingleStringCharacter
        - 字符串字面量
            - `" [DoubleStringCharacters（可选）] "`
            - `" [SingleStringCharacters（可选）] "`
    - [静态语义：早期错误](#)
    - [静态语义：StringValue](#)
    - [静态语义：SV （String Value）](#)
- [正则表达式 字面量](#)
- [模板 字面量](#)
- [注意1](#)
    - 字符串字面量是用单引号或双引号括起来的零个或多个Unicode码点。
    - Unicode码点也可以由转义序列表示。
    - 除了下面的码点，其它的码点可以按照字面含义出现在字符串字面量中
        - U+005C (REVERSE SOLIDUS)
        - U+000D (CARRIAGE RETURN)
        - U+2028 (LINE SEPARATOR)
        - U+2029 (PARAGRAPH SEPARATOR)
        - U+000A (LINE FEED)
    - 任何码点都可以以转义序列的形式出现。
    - ...还有几句待整理...
- [注意2](#)

## 自动分号插入

## 参考

- [ECMA ES7](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-ecmascript-language-lexical-grammar)
- [mdn 词法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar)
