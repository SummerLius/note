<!-- TOC -->

- [Array构造函数](#array构造函数)
    - [Static Properties](#static-properties)
        - [Number.IPSILON](#numberipsilon)
        - [Number.MAX_SAFE_INTEGER](#numbermax_safe_integer)
        - [Number.MAX_VALUE](#numbermax_value)
        - [Number.MIN_SAFE_INTEGER](#numbermin_safe_integer)
        - [Number.MIN_VALUE](#numbermin_value)
        - [Number.NaN](#numbernan)
        - [Number.POSITIVE_INFINITY](#numberpositive_infinity)
        - [Number.NEGATIVE_INFINITY](#numbernegative_infinity)
        - [Number.prototype](#numberprototype)
    - [Static Methods](#static-methods)
        - [Number.isFinite()](#numberisfinite)
        - [Number.isInteger()](#numberisinteger)
        - [Number.isNaN()](#numberisnan)
        - [Number.isSafeInteger()](#numberissafeinteger)
        - [Number.parseFloat()](#numberparsefloat)
        - [Number.parseInt()](#numberparseint)
        - [Number.isNaN()](#numberisnan-1)
    - [Prototype Methods](#prototype-methods)
        - [Number.prototype.toExponential()](#numberprototypetoexponential)
        - [Number.prototype.toFixed()](#numberprototypetofixed)
        - [Number.prototype.toLocaleString()](#numberprototypetolocalestring)
        - [Number.prototype.toPrecision()](#numberprototypetoprecision)
        - [Number.prototype.toSource()](#numberprototypetosource)
        - [Number.prototype.toString()](#numberprototypetostring)
        - [Number.prototype.valueOf()](#numberprototypevalueof)
- [详解](#详解)

<!-- /TOC -->

## Array构造函数

### Static Properties

#### Number.IPSILON

- Number.EPSILON 属性表示 1 和大于 1 的最小的浮点数（可表示为 Number）的差值。
- EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16，或者 2-52。

#### Number.MAX_SAFE_INTEGER

- 该常量表示在JavaScript中最大的安全整数：9007199254740991，即（2**53-1）。
- MAX_SAFE_INTEGER 常量值为：9007199254740991。
- 这个数字形成的原因是，js使用 [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point) 中规定的 [double-precision floating-point format numbers](http://en.wikipedia.org/wiki/Double_precision_floating-point_format)，在这个规定中，能安全的表示数字的范围在：`[-(2**53 -1), 2**53 -1]`
- **安全**，在本文中的意思是，能够准确地的表示：**整数和正确地比较整数**。例如,`Number.MAX_SAFE_INTEGER+1 === Number.MAX_SAFE_INTEGER+2`，将返回true。显然，这在逻辑上是错误的。

#### Number.MAX_VALUE

- Number.MAX_VALUE，表示在JavaScript里面，所能表示的最大数值
- `MAX_VALUE`，属性值接近于 `1.79e+308`。大于`MAX_VALUE`的值用`Infinity`来表示 

#### Number.MIN_SAFE_INTEGER

- Number.MIN_SAFE_INTEGER 代表在 JavaScript中最小的安全的integer型数字 (-(253 - 1))

#### Number.MIN_VALUE

- Number.MIN_VALUE 属性表示在 JavaScript 中所能表示的最小的正值。
- MIN_VALUE 属性是 JavaScript 里最接近 0 的正值，而不是最小的负值。
- MIN_VALUE 的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。

#### Number.NaN

- `Number.NaN` 表示“非数字”（Not-A-Number）。和 `NaN` 相同。

#### Number.POSITIVE_INFINITY

- Number.POSITIVE_INFINITY 属性表示正无穷大。
- Number.POSITIVE_INFINITY 的值同全局对象 Infinity 属性的值相同。
- 该值的表现同数学上的无穷大有点儿不同：
    - 任何正值，包括 POSITIVE_INFINITY，乘以 POSITIVE_INFINITY 为 POSITIVE_INFINITY。
    - 任何负值，包括 NEGATIVE_INFINITY，乘以 POSITIVE_INFINITY 为 NEGATIVE_INFINITY。
    - 0 乘以 POSITIVE_INFINITY 为 NaN。
    - NaN 乘以 POSITIVE_INFINITY 为 NaN。
    - POSITIVE_INFINITY 除以 NEGATIVE_INFINITY 以外的任何负值为 NEGATIVE_INFINITY。
    - POSITIVE_INFINITY 除以 POSITIVE_INFINITY 以外的任何正值为 POSITIVE_INFINITY。
    - POSITIVE_INFINITY 除以 NEGATIVE_INFINITY 或 POSITIVE_INFINITY 为 NaN。
    - 任何数除以 POSITIVE_INFINITY 为 0。

#### Number.NEGATIVE_INFINITY

- Number.NEGATIVE_INFINITY 属性表示负无穷大
- Number.NEGATIVE_INFINITY 的值和全局对象的 Infinity 属性的负值相同
- 该值的行为同数学上的无穷大（infinity）有一点儿不同：
    - 任何正值，包括 POSITIVE_INFINITY，乘以 NEGATIVE_INFINITY 为 NEGATIVE_INFINITY。
    - 任何负值，包括 NEGATIVE_INFINITY，乘以 NEGATIVE_INFINITY 为 POSITIVE_INFINITY。
    - 0 乘以 NEGATIVE_INFINITY 为 NaN.
    - NaN 乘以 NEGATIVE_INFINITY 为 NaN.
    - NEGATIVE_INFINITY 除以任何负值（除了 NEGATIVE_INFINITY）为 POSITIVE_INFINITY。
    - NEGATIVE_INFINITY 除以任何正值（除了 POSITIVE_INFINITY）为 NEGATIVE_INFINITY。
    - NEGATIVE_INFINITY 除以 NEGATIVE_INFINITY 或 POSITIVE_INFINITY 是 NaN。
    - 任何数除以 NEGATIVE_INFINITY 为 0。

#### Number.prototype

### Static Methods

#### Number.isFinite()

- Number.isFinite() 方法用来检测传入的参数是否是一个有穷数（finite number）
- 和全局的 `isFinite()` 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是又穷的，才会返回true

#### Number.isInteger()

- 作用：判断给定参数是否为整数
- 如果被检测值是整数，则返回true，否则返回fasle
- 注意：`NaN` 和 正负 `Infinity` 不是整数

#### Number.isNaN()

#### Number.isSafeInteger()

- 作用：用来判断传入的参数值是否是一个 “安全整数”（safe integer）
- 一个安全整数是一个符合下面条件的整数：
    1. 能够精确的被IEEE-754双精度数字所表示
    2. 其IEEE-754表示，不能是舍入其它整数以适应IEEE-754表示的结果
- 比如，`2**53-1` 是一个安全整数，它能被精确表示，在任何 IEEE-754 舍入模式（rounding mode）下，没有其它整数舍入结果为该整数。
- 作为对比，`2**53` 就不是一个安全整数，它能够使用IEEE-754表示，但是 `2**53 + 1` 不能使用IEEE-754直接表示，在就近舍入（round-to-nearest）和像零舍入中，会被舍入为 `2**53`
- 安全整数范围为：[`-(2**53 - 1)`, `2**53-1`]

#### Number.parseFloat()

#### Number.parseInt()

#### Number.isNaN()

- `Number.isNaN()` 方法确定传递的值是否为NaN和其类型是 Number。
- 和全局函数 `isNaN()` 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为NaN的时候才会返回true

### Prototype Methods

#### Number.prototype.toExponential()
#### Number.prototype.toFixed()
#### Number.prototype.toLocaleString()
#### Number.prototype.toPrecision()
#### Number.prototype.toSource()
#### Number.prototype.toString()
#### Number.prototype.valueOf()


## 详解

