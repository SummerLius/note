
## Iterator

### 简介

Iterator是这样一种机制，是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作，以提供访问数据结构所有成员。

例如目前的数据结构有：
- 不具备原生Iterator接口
    - Object 
- 具备原生Iterator接口
    - Array 
    - String
    - Set 
    - Map 
    - TypedArray
    - 函数arguments对象
    - ...

Iterator作用：
1. 为各种数据结构，提供一个统一的、简便的访问接口
2. 使得数据结构的成员能够按某种次序排列
3. ES6创造了一种新的**遍历**命令`for...of`循环，Iterator接口主要提供`for...of`类似功能

当使用for...of(es6语法)循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

> `for...in`主要遍历数据结构的索引或键，`for...of`主要遍历数据结构的值value

Iterator遍历过程：
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
3. 不断调用next方法，直到指向数据结构的结束位置


### 默认Iterator接口


一种数据结构只要部署了Iterator接口，这种数据结构是**可遍历的 Iterator**。

ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterators属性，就可以认为是“可遍历的”（iterator）。

### 调用Iterator接口的场合

有一些场合会默认调用Iterator接口，即`Symbol.iterator`方法

1. for...of
2. 解构赋值
3. 扩展运算符`...`
4. yield*
5. Array.from()
6. Promise.all()、Promise.race()
7. Map()、Set()、WeakMap()、WeakMap()，例如new Set([1,2,3])
8. ...





