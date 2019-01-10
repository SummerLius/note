<!-- TOC -->

- [IEEE Std 754-2008](#ieee-std-754-2008)
    - [1. 概要（Overview）](#1-概要overview)
        - [范围（Scope）](#范围scope)
        - [目的（Purpose）](#目的purpose)
        - [（Inclusions）](#inclusions)
        - [（Exclusions）](#exclusions)
        - [编程环境注意事项（Programming environment considerations）](#编程环境注意事项programming-environment-considerations)
        - [单词用法（Word usage）](#单词用法word-usage)
    - [2. 定义，缩写词和首字母缩写词（Definitions，abbreviations，and acronyms）](#2-定义缩写词和首字母缩写词definitionsabbreviationsand-acronyms)
        - [定义（Definitions）](#定义definitions)
        - [缩写词和首字母缩写词（Abbreviations and acronyms）](#缩写词和首字母缩写词abbreviations-and-acronyms)
    - [3. 浮点格式（Floating-point formats）](#3-浮点格式floating-point-formats)
        - [概要（Overview）](#概要overview)
        - [（Specification levels）](#specification-levels)
        - [浮点数据集（Sets of floating-point data）](#浮点数据集sets-of-floating-point-data)
        - [二进制交换格式编码（Binary interchange format encodings）](#二进制交换格式编码binary-interchange-format-encodings)
        - [十进制交换格式编码（Decimal interchange format encodings）](#十进制交换格式编码decimal-interchange-format-encodings)
        - [交换格式参数（Interchange format parameters）](#交换格式参数interchange-format-parameters)
        - [扩展和可扩展的精度（Extended and extendable precisions）](#扩展和可扩展的精度extended-and-extendable-precisions)
    - [4. 属性和舍入（Attributes and rounding）](#4-属性和舍入attributes-and-rounding)
        - [属性规范（Attribute specification）](#属性规范attribute-specification)
        - [属性的动态模式（Dynamic modes for attributes）](#属性的动态模式dynamic-modes-for-attributes)
        - [舍入方向属性（Rounding-direction attributes）](#舍入方向属性rounding-direction-attributes)
    - [5. 操作（Operations）](#5-操作operations)
    - [6. Infinity，NaNs，和符号位（sign bit）](#6-infinitynans和符号位sign-bit)
    - [7. 默认的异常处理（Default exception handling）](#7-默认的异常处理default-exception-handling)
    - [8. 备用异常处理属性（Alternate exception handling attributes）](#8-备用异常处理属性alternate-exception-handling-attributes)
    - [9. 推荐操作（Recommended operations）](#9-推荐操作recommended-operations)
    - [10. 表达式求值（Expression evaluation）](#10-表达式求值expression-evaluation)
    - [11. （Reproducible floating-point result）](#11-reproducible-floating-point-result)
    - [临时记录](#临时记录)

<!-- /TOC -->

# IEEE Std 754-2008

## 1. 概要（Overview）

### 范围（Scope）

- 该标准规定了计算机系统中浮点运算的格式和方法，以及推荐用于数据交换的格式。
- 定义了异常情况，并指定了对这些异常情况的标准处理。

### 目的（Purpose）

- 该标准提供了一种使用浮点数进行计算的方法，无论处理是在硬件，软件还是两者的组合中完成，都将产生相同的结果。
- 对于相同的输入数据，计算结果将是相同的，与实现无关。

### （Inclusions）

- 此标准文档指定：
    - 二进制和十进制浮点数据的格式，用于计算和数据交换；
    - 加法，减法，乘法，除法，fused multiply add，平方根，比较和其它运算；
    - 整数和浮点格式之间的转换；
    - 不同浮点格式之间的转换；
    - 浮点格式和字符序列之间的转换；
    - 浮点异常及其处理，包括那些不是数字的数据（例如，NaN）


### （Exclusions）

- 此标准文档不指定：
    - 整数格式
    - “Interpretation of the sign and significand fields of NaNs.”

### 编程环境注意事项（Programming environment considerations）

- 该标准规定了两个基数（2和10）的浮点运算。
- ...

### 单词用法（Word usage）

- 此标准文档中，用3个单词来描述区分要求和可选择性的等级：
    - may
        - (“may” means “is permitted to”)
    - shall
        - (“shall” means “is required to”)
    - should
        - (“should” means “is recommended to”)
- 进一步：
    - might
        - (“might” means “could possibly”)

## 2. 定义，缩写词和首字母缩写词（Definitions，abbreviations，and acronyms）

### 定义（Definitions）

就本标准文档，定义了一下术语（1~55）：
1. **applicable attribute**
2. **arithmetic format**
3. **attribute**
4. **basic format**
5. **biased exponent**
6. **binary floating-point number**
7. **block**
8. **canonical encoding**
9. **canonicalized number**
10. **cohort**
11. **computational operation**
12. **correct rounding**
13. **decimal floating-point number**
14. **declet**
15. **denormalized number**
16. **destination**
17. **dynamic mode**
18. **exception**
19. **exponent**
20. **extendable precision format**
21. **extended precision format**
22. **external character sequence**
23. **flag**
24. **floating-point datum**
25. **floating-point number**
26. **floating-point representation**
27. **format**
28. **fusedMultiplyAdd:**
29. **generic operation**
30. **homogeneous operation**
31. **implementation-defined**
32. **integer format**
33. **interchange format**
34. **language-defined**
35. **NaN**
36. **narrower/wider format**
37. **non-computational operation**
38. **normal number**
39. **not a number**
40. **payload**
41. **precision**
42. **preferred exponent**
43. **preferredWidth method**
44. **quantum**
45. **quiet operation**
46. **radix**
47. **result**
48. **signal**
49. **significand**
50. **status flag**
51. **subnormal number**
52. **supported format**
53. **trailing significand field**
54. **user**
55. **width of an operation**


### 缩写词和首字母缩写词（Abbreviations and acronyms）

- LSB
    - least significant bit
    - 最低有效位
- MSB
    - most significant bit
    - 最高有效位
- NaN
    - not a number
    - 非数字
- qNaN
    - quiet NaN
- sNaN
    - signaling NaN

## 3. 浮点格式（Floating-point formats）

### 概要（Overview）

1. 格式
    - 此标准文档定义了5种基本格式：
        - 3个二进制格式，编码长度分别为32，64和128位
        - 2个十进制格式，编码长度分别为64和128位
2. 一致性

### （Specification levels）



### 浮点数据集（Sets of floating-point data）
### 二进制交换格式编码（Binary interchange format encodings）
### 十进制交换格式编码（Decimal interchange format encodings）
### 交换格式参数（Interchange format parameters）
### 扩展和可扩展的精度（Extended and extendable precisions）

## 4. 属性和舍入（Attributes and rounding）
### 属性规范（Attribute specification）
### 属性的动态模式（Dynamic modes for attributes）
### 舍入方向属性（Rounding-direction attributes）

## 5. 操作（Operations）
## 6. Infinity，NaNs，和符号位（sign bit）
## 7. 默认的异常处理（Default exception handling）
## 8. 备用异常处理属性（Alternate exception handling attributes）
## 9. 推荐操作（Recommended operations）
## 10. 表达式求值（Expression evaluation）
## 11. （Reproducible floating-point result）

## 临时记录

- 3.2
    - 浮点数表示格式有：
        - (−1)^sign × b^exponent × significand
        - +∞, −∞
        - qNaN (quiet), sNaN (signaling)
- 3.3
    - 