
<!-- TOC -->

- [Symbol函数](#symbol函数)
    - [静态属性](#静态属性)
        - [Symbol.hasInstance](#symbolhasinstance)
        - [Symbol.isConcatSpreadable](#symbolisconcatspreadable)
        - [Symbol.iterator](#symboliterator)
        - [Symbol.match](#symbolmatch)
        - [Symbol.prototype](#symbolprototype)
        - [Symbol.replace](#symbolreplace)
        - [Symbol.search](#symbolsearch)
        - [Symbol.species](#symbolspecies)
        - [Symbol.split](#symbolsplit)
        - [Symbol.toPrimitive](#symboltoprimitive)
        - [Symbol.toStringTag](#symboltostringtag)
        - [Symbol.unscopables](#symbolunscopables)
    - [静态方法](#静态方法)
        - [Symbol.for()](#symbolfor)
        - [Symbol.keyFor()](#symbolkeyfor)
    - [原型方法](#原型方法)
        - [Symbol.prototype.toSource()](#symbolprototypetosource)
        - [Symbol.prototype.toString()](#symbolprototypetostring)
        - [Symbol.prototype.valueOf()](#symbolprototypevalueof)
- [详细](#详细)
    - [简介](#简介)

<!-- /TOC -->



## Symbol函数

### 静态属性

#### Symbol.hasInstance

#### Symbol.isConcatSpreadable

#### Symbol.iterator

#### Symbol.match

#### Symbol.prototype

#### Symbol.replace

#### Symbol.search

#### Symbol.species

#### Symbol.split

#### Symbol.toPrimitive

#### Symbol.toStringTag

#### Symbol.unscopables

### 静态方法

#### Symbol.for()

#### Symbol.keyFor()

### 原型方法

#### Symbol.prototype.toSource()

#### Symbol.prototype.toString()

#### Symbol.prototype.valueOf()

## 详细

### 简介

- 概要
    - symbol是JavaScript六种基本数据类型之一，该数据类型没有对应的字面量（例如，'abc' 1 2）
    - 这种类型的值只能由`Symbol()`函数生成，且该函数不支持构造函数运行：`new Symbol()`
    - 函数`Symbol()`，返回symbol类型值，这种值是原始值
    - 每个从 Symbol() 返回的 symbol 值都是唯一的
    - 一个 symbol 的值能作为对象属性的标识符
- 全局共享的 Symbol
    - Symbol() 的执行，不会在你的整个代码库中创建一个可用的全局 symbol 类型
    - 要创建跨文件可用的 symbol，甚至是跨域，使用 Symbol.for() 方法 和 symbol.keyFor() 方法，从全局的 symbol 注册表设置和获取 symbol
- 在对象中查找 Symbol 属性
    - Object.getOwnPropertySymbols() 方法让你在查找一个给定对象的 symbol 属性时返回一个 symbol 类型数组


```javascript
let s = Symbol();

s.__proto__ === Symbol.prototype; // true

Symbol.prototype.__proto__ === Object.prototype; // true
Symbol.__proto__ === Function.__proto__ === Function.prototype; // true
```




<!-- - symbol数据类型值，没有字面量形式（例如 'str'，1），只能通过函数`Symbol`创建，返回一个symbol原始值的包装对象，类似于`new String()`、`new Number()`、`new Boolean()`这样的原始类型值的包装对象，不过`Symbol`函数有点特别，其不能作为构造函数，不能使用new关键字，直接运行函数`let s = Symbol()`
- 值唯一，Symbol() !== Symbol()
- 可作为对象的属性名（key），也可以作为值（value）
- typeof Symbol; // 'Function'，Symbol本身是一个函数，和构造函数一样，`Symbol.__proto__ === Function.__proto__ === Function.prototype`，`Symbol.prototype.__proto__ === Object.prototype`，但是ES6语法不允许使用当作构造函数`new Symbol()`，可能是语法底层做了限制，又不同于普通函数
- symbol是一种基本数据类型，typeof Symbol(); // 'symbol'  -->