<!-- TOC -->

- [迭代器Iterator和for...of循环](#迭代器iterator和forof循环)
    - [迭代器 Iterator 的概念](#迭代器-iterator-的概念)
    - [默认 Iterator 接口](#默认-iterator-接口)
    - [调用 Iterator 接口的场合](#调用-iterator-接口的场合)
    - [字符串的 Iterator 接口](#字符串的-iterator-接口)
    - [Iterator 接口与 Generator 函数](#iterator-接口与-generator-函数)
    - [遍历器对象的 return()，throw()](#遍历器对象的-returnthrow)
    - [for...of 循环](#forof-循环)

<!-- /TOC -->

# 迭代器Iterator和for...of循环

## 迭代器 Iterator 的概念

- 迭代器 Iterator 可以说是一种统一的接口机制，来处理所有不同的数据结构；（例如，Array、String、Set、Map、TypedArray等数据结构）
- 任何数据结构只要部署了 Iterator 接口，就可以完成迭代/遍历操作；
- Iterator主要作用有三个：
    1. 为各种数据结构，提供一个统一的、便捷的访问接口；
    2. 使得数据结构的成员能够按照某种次序排列；
    3. Iterator 接口可以被 for...of 消费；
- Iterator 迭代器是一个对象，它提供了一个 `next()` 方法，用来返回返回下一项数据，`next()` 方法返回一个对象，包含两个属性：`value` 和 `done`，前者表示当前位置数据，后者表示是否迭代结束；
    ```js
    // 迭代器模拟
    
    var it = makeIterator(['a', 'b']);
    
    it.next() // { value: "a", done: false }
    it.next() // { value: "b", done: false }
    it.next() // { value: undefined, done: true }
    
    function makeIterator(array) {
      var nextIndex = 0;
      return {
        next: function() {
          return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {value: undefined, done: true};
        }
      };
    }
    ```
- Iterator 只是将接口规格放置在数据结构上，实际上迭代器和数据结构是分开的；

<!-- -# # 可迭代对象

- 实现了迭代器的对象，称为可迭代对象；
- 为了实现可迭代，一个对象必须实现 `@@iterator` 方法，这意味着这个对象（或其原型链中的一个对象）必须含有 `Symbol.iterator` 键的属性；
- 内置可迭代对象
    - `String`，`Array`，`TypedArray`，`Map` 和 `Set` 都内置可迭代对象，因为它们的原型对象都有一个 Symbol.iterator 方法；
- 用于可迭代对象的语法
    - for...of
    - 扩散语法
    - yield*
    - 结构赋值 -->

## 默认 Iterator 接口

- 任何数据结构只要部署了 Iterator 接口，我们就称这种数据结构是可迭代的（iterable）；
- ES6规定，默认的 Iterator 接口部署在数据结构的 `Symble.iterator` 属性上，即，一个数据结构只要具有 `Symble.iterator` 属性，就可以认为是可迭代的（iterable）；
    - 数据结构`Symbol.iterator`属性是一个函数：`结构[Symbol.iterator] = function(){}`，该函数会返回一个迭代器，该迭代器至少含有`next()`方法；
- ES6有些数据结构就是可迭代的，这些数据结构原生部署了 `Symbol.iterator` 属性，原生具备Iterator接口的数据结构如下：
    - Array
    - String
    - Set
    - Map
    - TypedArray
    - 函数arguments对象
    - NodeList对象

## 调用 Iterator 接口的场合
## 字符串的 Iterator 接口
## Iterator 接口与 Generator 函数
## 遍历器对象的 return()，throw()
## for...of 循环