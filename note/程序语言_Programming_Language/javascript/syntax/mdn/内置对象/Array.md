<!-- TOC -->

- [Array构造函数](#array构造函数)
    - [Static Properties](#static-properties)
        - [Array.length](#arraylength)
        - [Array.prototype](#arrayprototype)
    - [Prototype Properties](#prototype-properties)
        - [Array.prototype.length](#arrayprototypelength)
    - [Static Methods](#static-methods)
        - [Array.from() - 从类似数组或可迭代对象中创建新数组对象](#arrayfrom---从类似数组或可迭代对象中创建新数组对象)
        - [Array.isArray() - 判断是否是数组](#arrayisarray---判断是否是数组)
        - [Array.of() - 创建新数组实例](#arrayof---创建新数组实例)
    - [Prototype Methods](#prototype-methods)
        - [Array.prototype.concat() - 合并多个数组，返回新数组](#arrayprototypeconcat---合并多个数组返回新数组)
        - [Array.prototype.copyWithin() - 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小](#arrayprototypecopywithin---方法浅复制数组的一部分到同一数组中的另一个位置并返回它而不修改其大小)
        - [Array.prototype.entries() - 方法返回一个新的Array Iterator对象](#arrayprototypeentries---方法返回一个新的array-iterator对象)
        - [Array.prototype.every() - 方法测试数组的所有元素是否都通过了指定函数的测试](#arrayprototypeevery---方法测试数组的所有元素是否都通过了指定函数的测试)
        - [Array.prototype.fill()](#arrayprototypefill)
        - [Array.prototype.filter()集合](#arrayprototypefilter集合)
        - [Array.prototype.find()集合](#arrayprototypefind集合)
        - [Array.prototype.findIndex()集合](#arrayprototypefindindex集合)
        - [Array.prototype.forEach()集合](#arrayprototypeforeach集合)
        - [Array.prototype.includes()](#arrayprototypeincludes)
        - [Array.prototype.indexOf()](#arrayprototypeindexof)
        - [Array.prototype.join()](#arrayprototypejoin)
        - [Array.prototype.keys()](#arrayprototypekeys)
        - [Array.prototype.lastIndexOf()](#arrayprototypelastindexof)
        - [Array.prototype.map()集合](#arrayprototypemap集合)
        - [Array.prototype.pop()](#arrayprototypepop)
        - [Array.prototype.push()](#arrayprototypepush)
        - [Array.prototype.reduce()集合](#arrayprototypereduce集合)
        - [Array.prototype.reduceRight()集合](#arrayprototypereduceright集合)
        - [Array.prototype.reverse()](#arrayprototypereverse)
        - [Array.prototype.shift()](#arrayprototypeshift)
        - [Array.prototype.unshift()](#arrayprototypeunshift)
        - [Array.prototype.slice()](#arrayprototypeslice)
        - [Array.prototype.some()集合](#arrayprototypesome集合)
        - [Array.prototype.sort()](#arrayprototypesort)
        - [Array.prototype.splice()](#arrayprototypesplice)
        - [Array.prototype.toLocaleString()](#arrayprototypetolocalestring)
        - [Array.prototype.toString()](#arrayprototypetostring)
        - [Array.prototype.values()](#arrayprototypevalues)
- [其它](#其它)

<!-- /TOC -->

## Array构造函数

### Static Properties

```javascript
Array.length
Array.prototype
```

#### Array.length

#### Array.prototype

### Prototype Properties

```javascript
Array.prototype.length
```
#### Array.prototype.length

### Static Methods

```javascript
Array.from()
Array.isArray()
Array.of()
```

#### Array.from() - 从类似数组或可迭代对象中创建新数组对象

```js
/**
 * @description 该方法从一个类似数组或可迭代的对象中创建一个新的数组实例
 * @param {ArrayLike} arrayLike 想要转换成数组的伪数组对象或可迭代对象
 * @param {Function} mapFn  可选，如果指定该参数，新数组中的每个元素会执行该回调函数，相当于Array.from(obj).map(mapFn, thisArg)，该元素值会被mapFn函数的返回值替换
 * @param {Object} thisArg  可选，执行回调函数 mapFn 时 this 对象
 * @return {Array} 返回一个新的数组实例
 */
Array.from(arrayLike[, mapFn[, thisArg]])
```
- Array.from() 可以通过以下方式来创建数组对象：
    1. 伪数组对象（拥有一个length属性和若干索引属性的任意对象）；
    2. 可迭代对象（可以获取对象中的元素，如Map和Set等）
- 示例：
    ```javascript
    Array.from([1, 2, 3]); // Array，[1,2,3]
    Array.from('abc'); // String，['a', 'b', 'c']
    Array.from(new Set([1, 2, 3])); // Set，[1,2,3]
    Array.from(new Map([[1, 2], [3, 4]])); // Map，[[1, 2], [3, 4]]
    
    // Array-like 对象 (arguments)
    function f() {
        return Array.from(arguments);
    }

    // 使用箭头函数
    Array.from({length: 5}, (v, i) => i); // [0,1,2,3,4]

    // 数组去重
    Array.from(new Set([1,2,2,3,3,1])); // [1,2,3]
    ```

#### Array.isArray() - 判断是否是数组

#### Array.of() - 创建新数组实例

```js
/**
 * @description 以参数为数组元素，创建新的数组实例
 * @param {Any} element0 数组元素
 * @param {Any} element1 数组元素
 * ...
 * @return {Array} 返回一个新的数组实例
 */
Array.of(element0[, element1[, ...[, elementN]]])
```
- `Array.of()` 和 `Array 构造函数` 之间的区别在于处理仅有一个参数且为整数时不同，对于处理多个参数时是一样的，例如：
    - Array.of(5)，创建一个length为1，元素为 5 的新数组；
    - Array(5)，创建一个length为5的空数组（这里指有5个空位的数组，而不是由5个undefined组成的数组）；
- 示例：
    ```js
    Array.of(7);       // [7] 
    Array.of(1, 2, 3); // [1, 2, 3]
    
    Array(7);          // [ , , , , , , ]
    Array(1, 2, 3);    // [1, 2, 3]
    ```

### Prototype Methods

```javascript
Array.prototype.concat()
Array.prototype.copyWithin()
Array.prototype.entries()
Array.prototype.every()
Array.prototype.fill()
Array.prototype.filter()
Array.prototype.find()
Array.prototype.findIndex()
Array.prototype.flat()
Array.prototype.flatMap()
Array.prototype.forEach()
Array.prototype.includes()
Array.prototype.indexOf()
Array.prototype.join()
Array.prototype.keys()
Array.prototype.lastIndexOf()
Array.prototype.map()
Array.prototype.pop()
Array.prototype.push()
Array.prototype.reduce()
Array.prototype.reduceRight()
Array.prototype.reverse()
Array.prototype.shift()
Array.prototype.slice()
Array.prototype.some()
Array.prototype.sort()
Array.prototype.splice()
Array.prototype.toLocaleString()
Array.prototype.toString()
Array.prototype.unshift()
Array.prototype.values()
Array.prototype[@@iterator]()
```

#### Array.prototype.concat() - 合并多个数组，返回新数组

```js
/**
 * @description 用于合并两个或多个数组，不会更改现在有数组，返回新数组
 * @param {Any} valueN 
 * ...
 * @return {Array} 返回新的 Array 实例
 */
array.concat(value1[, value2[, ...[, valueN]]])
```
- 浅拷贝；
- 示例：
    ```js
    [1,2].concat(3, 4, [5, 6], [7], [[8]], {}); // [ 1, 2, 3, 4, 5, 6, 7, [ 8 ], {} ]
    ```

#### Array.prototype.copyWithin() - 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小

```js
/**
 * @description 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小
 * @param {Number} target 被覆盖的起始位置，如果为负数，将从末尾开始计算；如果target大于等于arr.length，将不会发生拷贝
 * @param {Number} start 待复制元素起始位置，默认为0，如果为负数，则从末尾开始计算
 * @param {Number} end 待复制元素的结束位置，不包括end这个索引处，如果是负数，则从末尾计算，默认值到最后
 * @return {Array} 返回原本数组
 */
array.copyWithin(target[, start[, end]])
```
- 浅复制；
- copyWithin 函数是设计为通用的，其不要求其 this 值必须是一个数组对象；
- copyWithin 就像 C 和 C++ 的 memcpy 函数一样，且它是用来移动 Array 或者 TypedArray 数据的一个高性能的方法。复制以及粘贴序列这两者是为一体的操作;即使复制和粘贴区域重叠，粘贴的序列也会有拷贝来的值；
- 示例
    ```js
    [1, 2, 3, 4, 5].copyWithin(-2);
    // [1, 2, 3, 1, 2]
    
    [1, 2, 3, 4, 5].copyWithin(0, 3);
    // [4, 5, 3, 4, 5]
    
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4);
    // [4, 2, 3, 4, 5]
    
    [1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
    // [1, 2, 3, 3, 4]
    
    [].copyWithin.call({length: 5, 3: 1}, 0, 3);
    // {0: 1, 3: 1, length: 5}
    
    // ES2015 Typed Arrays are subclasses of Array
    var i32a = new Int32Array([1, 2, 3, 4, 5]);
    
    i32a.copyWithin(0, 2);
    // Int32Array [3, 4, 5, 4, 5]
    
    // On platforms that are not yet ES2015 compliant: 
    [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
    // Int32Array [4, 2, 3, 4, 5]
    ```

#### Array.prototype.entries() - 方法返回一个新的Array Iterator对象

```js
/**
 * @description 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对
 * @return {Array Iterator} 返回一个新的Array Iterator对象
 */
array.entries()
```
- 返回一个新的 Array Iterator 对象，可遍历迭代器取得原数组的 `[key, value]`；
- 示例
    ```js
    var arr = ["a", "b", "c"];
    var iterator = arr.entries();
    console.log(iterator);
    
    /*Array Iterator {}
             __proto__:Array Iterator
             next:ƒ next()
             Symbol(Symbol.toStringTag):"Array Iterator"
             __proto__:Object
    */
    ```

#### Array.prototype.every() - 方法测试数组的所有元素是否都通过了指定函数的测试

```js
/**
 * @description 方法测试数组的所有元素是否都通过了指定函数的测试
 * @param {Function} callback 用来测试每个元素的函数，
 * @param {Object} thisArg
 * @return {Array Iterator} 返回一个新的Array Iterator对象
 */
arr.every(callback[, thisArg])
```

#### Array.prototype.fill()

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素

`arr.fill(value[, start[, end]])`  

#### Array.prototype.filter()集合

#### Array.prototype.find()集合

#### Array.prototype.findIndex()集合

#### Array.prototype.forEach()集合

#### Array.prototype.includes()

用来判断一个数组是否包含一个指定的值。注意该方法在nodejs低版本没有实现，高一点版本才实现。

`arr.includes(searchElement[, fromIndex])`    

#### Array.prototype.indexOf()

返回数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1

`arr.indexOf(searchElement[, fromIndex])`  

#### Array.prototype.join()

将数组（或一个类数组对象）的所有元素连接到一个字符串中。

`arr.join(separator)`  

#### Array.prototype.keys()

返回一个新的Array迭代器，它包含数组中每个索引的键。

- 待了解

#### Array.prototype.lastIndexOf()

返回指定元素在数组中最后一个的索引，如果不存在则返回-1。从数组的后面向前找，从fromIndex处开始。

`arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])`  

#### Array.prototype.map()集合

#### Array.prototype.pop()

删除数组最后一个元素，并返回该元素的值。此方法会修改数组的长度。

#### Array.prototype.push()

将一个或多个元素添加到数组的末尾，并返回数组的长度

`arr.push(element1, element2, ...)`  

#### Array.prototype.reduce()集合


#### Array.prototype.reduceRight()集合

#### Array.prototype.reverse()

将数组中元素位置颠倒

#### Array.prototype.shift()

`arr.shift()`  

删除数组中第一个元素，并返回该元素的值。此方法会修改数组的长度。

#### Array.prototype.unshift()

`arr.unshift(ele1, ele2, ...)`  

将一个或多个元素添加到数组的开头，并返回新数组的长度。

#### Array.prototype.slice()

返回一个从开始索引到结束索引（不包括结束）的数组的一部分浅拷贝到一个新数组对象。原数组不会被修改。

`arr.slice()`           // [0, end]  
`arr.slice(begin)`      // [begin, end]  
`arr.slice(begin, end)` // [begin, end)  

#### Array.prototype.some()集合

#### Array.prototype.sort()

#### Array.prototype.splice()

删除数组元素或添加新元素，更改原始数组

#### Array.prototype.toLocaleString()

覆盖了Object.prototype.toLocaleString()

#### Array.prototype.toString()

覆盖了Object.prototype.toString()

#### Array.prototype.values()

## 其它

- 许多Array方法在处理String时非常有用，虽然这些方法不属于String，但是String可以借用
    - Array.prototype.join
    - Array.prototype.map
    - Array.prototype.reverse
    - ...
- 示例
    ```js
    var a = 'foo';
    a.join;            // undefined
    a.map;            // undefined
    
    var c = Array.prototype.join.call( a, "-" );
    var d = Array.prototype.map.call( a, function(v){
        return v.toUpperCase() + ".";
    } ).join( "" );
    
    c;                // "f-o-o"
    d;                // "F.O.O."


    /////////////////////////////
    Array.prototype.reverse.call( a );
    // 仍然返回一个“foo”的String对象包装器（见第三章），这种“借用”array修改器不起作用，因为string是不可变的，因此它不能被原地修改

    // 另一种迂回的做法（也是黑科技）是，将string转换为一个array，实施我们想做的操作，然后将它转回string。
    var c = a
    // 将`a`切分成一个字符的数组
    .split( "" )
    // 翻转字符的数组
    .reverse()
    // 将字符的数组连接回一个字符串
    .join( "" );

    c; // "oof"
    ```
- 警告： 小心！这种方法对含有复杂（unicode）字符（星号，多字节字符等）的string 不起作用。你需要支持unicode的更精巧的工具库来准确地处理这种操作。在这个问题上可以咨询Mathias Bynens的作品：Esrever（https://github.com/mathiasbynens/esrever）。
- 另外一种考虑这个问题的方式是：如果你更经常地将你的“string”基本上作为 字符的数组 来执行一些任务的话，也许就将它们作为array而不是作为string存储更好。你可能会因此省去很多每次都将string转换为array的麻烦。无论何时你确实需要string的表现形式的话，你总是可以调用 字符的 array的join("")方法。

<!-- - Array.length

- Array.from()
- Array.isArray()
- Array.of()

- Array.prototype.concat()
- Array.prototype.copyWithin()
- Array.prototype.entries()
- Array.prototype.every()
- Array.prototype.fill()
- Array.prototype.filter()
- Array.prototype.find()
- Array.prototype.findIndex()
- Array.prototype.forEach()
- Array.prototype.includes()
- Array.prototype.indexOf()
- Array.prototype.join()
- Array.prototype.keys()
- Array.prototype.lastIndexOf()
- Array.prototype.map()
- Array.prototype.pop()
- Array.prototype.push()
- Array.prototype.reduce()
- Array.prototype.reduceRight()
- Array.prototype.reverse()
- Array.prototype.shift()
- Array.prototype.slice()
- Array.prototype.some()
- Array.prototype.sort()
- Array.prototype.splice()
- Array.prototype.toLocaleString()
- Array.prototype.toSource()
- Array.prototype.toString()
- Array.prototype.unshift()
- Array.prototype.values()
- Array.prototype.
- Array.prototype.
- Array.prototype. 

```js
/**
 * @description 
 * @param {Any} 
 * @param {Any} 
 * ...
 * @return {Array} 
 */
Array.of()
```

-->