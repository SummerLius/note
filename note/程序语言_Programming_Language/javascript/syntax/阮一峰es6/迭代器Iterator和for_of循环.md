<!-- TOC -->

- [迭代器Iterator和for...of循环](#迭代器iterator和forof循环)
    - [迭代器 Iterator 的概念](#迭代器-iterator-的概念)
    - [默认 Iterator 接口](#默认-iterator-接口)
    - [调用 Iterator 接口的场合](#调用-iterator-接口的场合)
    - [Iterator 接口与 Generator 函数](#iterator-接口与-generator-函数)
    - [迭代器对象的 return()，throw()](#迭代器对象的-returnthrow)
    - [for...of 循环](#forof-循环)
    - [链接](#链接)

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
    - **注意**：如果 `Symbol.iterator` 属性对应的不是迭代器生成函数（即会返回一个迭代器对象），解释引擎将会报错；
- ES6有些数据结构就是可迭代的，这些数据结构原生部署了 `Symbol.iterator` 属性，原生具备Iterator接口的数据结构如下：
    - Array
    - String
    - Set
    - Map
    - TypedArray
    - 函数arguments对象
    - NodeList对象
- 对象（Object）没有默认部署 Iterator 接口，是因为对象哪个属性先遍历或后遍历是不确定的，需要开发者手动指定；
    - 严格的说，Object 部署 Iterator 接口并不是很有必要，因为这时Object实际上被当做Map使用了，那还不如直接使用Map结构；
- 一个对象（或者其原型链的对象上）如果在其 `Symbol.iterator` 的属性上部署了迭代器生成的方法，那么该对象是可迭代的，可以被 `for...of` 使用；
    ```js
    // 为Object添加Iterator接口例子
    let obj = {
      data: [ 'hello', 'world' ],
      [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
          next() {
            if (index < self.data.length) {
              return {
                value: self.data[index++],
                done: false
              };
            } else {
              return { value: undefined, done: true };
            }
          }
        };
      }
    };
    ```
- 对于类数组对象（存在数值键名和length属性的对象），部署 Iterator 接口，有一个简便的方法，就是 `Symbol.iterator` 方法直接引用数组 Array 的 Iterator 接口；
    ```js
    // 类数组对象，部署 Iterator 接口
    let o = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
    }
    
    for (let item of o) {
        console.log(item);
    }
    ```

## 调用 Iterator 接口的场合

- 有一些语法场合会默认调用 Iterator 接口（即 Symbol.iterator 方法）
    1. 解构赋值
        - 对可迭代数据结构进行结构赋值时，会默认调用 `Symbol.iterator` 方法；
            ```js
            let str1 = '12';
            let set1 = new Set().add('1').add('2');
            let map1 = new Map().set('1', '1').set('2', '2');
            let arr1 = ['1', '2']
            
            let a,b;
            
            [a, b] = str1;
            console.log(a, b); // '1' '2'
            
            [a, b] = set1;
            console.log(a, b); // '1' '2'
            
            [a, b] = map1;
            console.log(a, b); // ['1', '1'] ['2', '2']
            
            [a, b] = arr1;
            console.log(a, b); // '1' '2'
            ```
    2. 扩展运算符
        - 扩展运算符（...）会调用默认的 Iterator 接口；
        - 易见，任何可迭代数据结构，都可以使用扩展运算符，将其转为数组；
            ```js
            let arr = [...iterable];
            ```
            ```js
            let str1 = '12';
            let set1 = new Set().add('1').add('2');
            let map1 = new Map().set('1', '1').set('2', '2');
            let arr1 = ['1', '2']
            
            console.log([...str1]); // ['1', '2']
            console.log([...set1]); // ['1', '2']
            console.log([...map1]); // [['1','1'], ['2', '2']]
            console.log([...arr1]); // ['1', '2']
            ```
    3. yield*
        - `yield*` 后面跟的是一个可迭代的结构，它会调用该结构的迭代接口；
            ```js
            let generator = function* () {
              yield 1;
              yield* [2,3,4];
              yield 5;
            };
            
            var iterator = generator();
            
            iterator.next() // { value: 1, done: false }
            iterator.next() // { value: 2, done: false }
            iterator.next() // { value: 3, done: false }
            iterator.next() // { value: 4, done: false }
            iterator.next() // { value: 5, done: false }
            iterator.next() // { value: undefined, done: true }
            ```
    4. 其它场合
        - for...of
        - Array.from()
        - Map(), Set(), WeekMap(), WeekSet()
        - Promise.all()
        - Promise.race()
        - ...

## Iterator 接口与 Generator 函数

- `Symbol.iterator` 方法的最简单实现，还是使用下一章要介绍的 Generator 函数；
    ```js
    let myIterable = {
      [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
      }
    }
    [...myIterable] // [1, 2, 3]
    
    // 或者采用下面的简洁写法
    
    let obj = {
      * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
      }
    };
    
    for (let x of obj) {
      console.log(x);
    }
    // "hello"
    // "world"
    ```

## 迭代器对象的 return()，throw()

- 迭代器除了具有 `next` 方法外，还可以具有 `return` 方法和 `throw` 方法；
- 如果自己编写迭代器生成函数，那么 `next` 方法是必须部署的，`return` 方法和 `throw` 方法可选；
- `return` 使用的场景是，如果 `for...of` 循环提前退出（通常因为抛错，或者 `break` 语句），就会自动调用 `return` 方法；
    - 例如，一个对象在完成迭代之前，需要清理或释放资源（例如文件），就可以部署 return 方法；
- `throw` 方法主要配合 Generator 函数使用，一般的迭代器用不到这个方法；

## for...of 循环

- es6借鉴其它语言，引入了 `for...of` 循环，作为一种遍历各类数据结构的统一的方法；
- 一个数据结构只要部署了 `Symbol.iterator` 属性，就被视为具有 Iterator 接口，就可以使用 `for...of` 循环遍历其所有成员；
- 与 `for...in` 不同，`for...of` 读取键值，而不是键名；
- **计算生成的数据结构**
    - 有些数据结构是在现有的数据结构基础上，计算生成的；
    - 比如，es6的Array、Set、Map都部署了以下三个方法，调用后都返回迭代器对象：
        - `entries()`：返回一个迭代器对象，用来遍历 `[键名, 键值]` 组成的数组；
            - 对于Array，键名就是索引值；
            - 对于Set，键名和键值相同；
            - 对于Map，Map结构的 Iterator 接口，默认就是调用 entries 方法；
        - `keys()`：返回一个迭代器对象，用来遍历所有的键名；
        - `values()`：返回一个迭代器对象，用来遍历所有的键值；
    - 这三个方法调用后生成的迭代器对象，所遍历的都是计算生成的数据结构；
- **类数组对象**
    - 有些类数组对象默认是可迭代的，例如String、DOM NodeList、arguments；
    - 对于不具备 Iterator 接口的对象，可以将类数组转换为数组处理，或者将Array的 `Symbol.iterator` 属性赋值到类数组对象上；
- **与其它遍历语法的比较**
    - 以 Array 为例，JS提供了多种遍历的语法，最原始的写法就是 `for` 循环；但是，这种写法比较麻烦，因此数组提供了内置的 `forEach` 方法，这种写法的问题在于，无法中途跳出 `forEach` 循环，`break` 命令或 `return` 命令都不能奏效；
    - `for...in` 可以遍历数组键名，但是其有几个缺点：
        1. 数组的键名是数字，但是 `for...in` 循环是以字符串作为键名，"0"、"1"等；
        2. `for...in` 循环不仅遍历数字键名，还会遍历手动添加的其它键，甚至包括原型链上的键；
        3. 某些情况下，`for...in` 循环会以任意顺序遍历键名；
    - 总之，`for...in` 循环主要是为遍历对象Object而设计的，不适用于遍历数组；
    - `for...of` 循环相比上面几种做法，有一些显著的特点：
        1. 有着同 `for...of` 一样简洁的语法，但是没有 `for...in` 那些缺点；
        2. 不同于 `forEach` 方法，它可以 `break`、`continue` 和 `return`配合使用；
        3. 提供了遍历所有数据结构的统一操作接口；

## 链接

- [MDN 迭代器和生成器
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- [MDN 迭代协议
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)