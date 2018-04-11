<!-- TOC -->

- [ECMACcript 7th](#ecmaccript-7th)
    - [概述](#概述)
    - [标准目录](#标准目录)
    - [理解抽象](#理解抽象)

<!-- /TOC -->

# ECMACcript 7th

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
    6. [ECMAScript Data Types and Values](#)
        - p55
    7. [Abstract Operations](#)
        - p76
    8. [Executable Code and Execution Contexts](#)
        - p96
    9. [Ordinary and Exotic Objects Behaviours](#)
        - p119
    10. [ECMAScript Language: Source Code](#)
        - p158
    11. [ECMAScript Language: Lexical Grammar](#)
        - p160
    12. [ECMAScript Language: Expressions](#)
        - p178
    13. [ECMAScript Language: Statements and Declarations](#)
        - p226
    14. [ECMAScript Language: Functions and Classes](#)
        - p275
    15. [ECMAScript Language: Scripts and Modules](#)
        - p304
    16. [Error Handling and Language Extensions](#)
        - p329
    17. [ECMAScript Standard Built-in Objects](#)
        - p331
    18. [The Global Object](#)
        - p332
    19. [Fundamental Objects](#)
        - p344
    20. [Numbers and Dates](#)
        - p362
    21. [Text Processing](#)
        - p394
    22. [Indexed Collections](#)
        - p436
    23. [Keyed Collection](#)
        - p478
    24. [Structured Data](#)
        - p494
    25. [Control Abstraction Objects](#)
        - p510
    26. [Reflection](#)
        - p527
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

## 理解抽象


