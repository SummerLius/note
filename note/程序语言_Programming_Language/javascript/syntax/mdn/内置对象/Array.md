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
        - [Array.prototype.entries() - 方法返回一个新的Array Iterator对象，可以迭代索引和成员组成的数据结构](#arrayprototypeentries---方法返回一个新的array-iterator对象可以迭代索引和成员组成的数据结构)
        - [Array.prototype.every() - 方法测试数组的所有元素是否都通过了指定函数的测试](#arrayprototypeevery---方法测试数组的所有元素是否都通过了指定函数的测试)
        - [Array.prototype.fill() - 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引](#arrayprototypefill---用一个固定值填充一个数组中从起始索引到终止索引内的全部元素不包括终止索引)
        - [Array.prototype.filter() - 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素](#arrayprototypefilter---创建一个新数组-其包含通过所提供函数实现的测试的所有元素)
        - [Array.prototype.find() - 返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined](#arrayprototypefind---返回数组中满足提供的测试函数的第一个元素的值否则返回-undefined)
        - [Array.prototype.findIndex() - 返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1](#arrayprototypefindindex---返回数组中满足提供的测试函数的第一个元素的索引否则返回-1)
        - [Array.prototype.flat() - 扁平化嵌套数组，返回新数组](#arrayprototypeflat---扁平化嵌套数组返回新数组)
        - [Array.prototype.flatMap()](#arrayprototypeflatmap)
        - [Array.prototype.forEach() - 数组循环](#arrayprototypeforeach---数组循环)
        - [Array.prototype.includes() - 用来判断一个数组是否包含一个指定的值](#arrayprototypeincludes---用来判断一个数组是否包含一个指定的值)
        - [Array.prototype.indexOf() - 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1](#arrayprototypeindexof---返回在数组中可以找到一个给定元素的第一个索引如果不存在则返回-1)
        - [Array.prototype.join() 连接数组元素成一个字符串](#arrayprototypejoin-连接数组元素成一个字符串)
        - [Array.prototype.keys() - 返回一个新的 Array Iterator 对象，可以遍历所有的索引](#arrayprototypekeys---返回一个新的-array-iterator-对象可以遍历所有的索引)
        - [Array.prototype.lastIndexOf() - 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1](#arrayprototypelastindexof---返回指定元素在数组中的最后一个的索引如果不存在则返回--1)
        - [Array.prototype.map() - 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果](#arrayprototypemap---创建一个新数组其结果是该数组中的每个元素都调用一个提供的函数后返回的结果)
        - [Array.prototype.pop() - 从数组中删除最后一个元素，并返回该元素的值，此方法更改原数组的长度](#arrayprototypepop---从数组中删除最后一个元素并返回该元素的值此方法更改原数组的长度)
        - [Array.prototype.push() - 将一个或多个元素添加到数组的末尾](#arrayprototypepush---将一个或多个元素添加到数组的末尾)
        - [Array.prototype.reduce() - 遍历数组，并将每个回调函数的返回值，作为下一次回调的第一个参数，最后一次回调返回作为redece方法返回](#arrayprototypereduce---遍历数组并将每个回调函数的返回值作为下一次回调的第一个参数最后一次回调返回作为redece方法返回)
        - [Array.prototype.reduceRight() - 同reduce()方法，只是该方法是从后往前遍历](#arrayprototypereduceright---同reduce方法只是该方法是从后往前遍历)
        - [Array.prototype.reverse() - 将数组中元素的位置颠倒，并返回该数组，该方法会改变原数组](#arrayprototypereverse---将数组中元素的位置颠倒并返回该数组该方法会改变原数组)
        - [Array.prototype.shift() - 删除数组第一个元素，并返回该元素的值，此方法更改数组的长度](#arrayprototypeshift---删除数组第一个元素并返回该元素的值此方法更改数组的长度)
        - [Array.prototype.slice() - 返回一个从开始索引到结束索引（不包括结束）的数组的一部分浅拷贝到一个新数组对象，元素数组不会被修改](#arrayprototypeslice---返回一个从开始索引到结束索引不包括结束的数组的一部分浅拷贝到一个新数组对象元素数组不会被修改)
        - [Array.prototype.some() - 测试是否至少有一个元素通过由callback提供的测试](#arrayprototypesome---测试是否至少有一个元素通过由callback提供的测试)
        - [Array.prototype.sort() - 对数组的元素进行排序，并返回原数组](#arrayprototypesort---对数组的元素进行排序并返回原数组)
        - [Array.prototype.splice() - 通过删除或替换现有元素来修改数组，并以数组形式返回被修改的内容，此方法会改变原数组](#arrayprototypesplice---通过删除或替换现有元素来修改数组并以数组形式返回被修改的内容此方法会改变原数组)
        - [Array.prototype.toLocaleString()](#arrayprototypetolocalestring)
        - [Array.prototype.toString()](#arrayprototypetostring)
        - [Array.prototype.unshift() - 将一个或多个元素添加到数组的开头，并返回该数组的新长度](#arrayprototypeunshift---将一个或多个元素添加到数组的开头并返回该数组的新长度)
        - [Array.prototype.values() - 返回一个新的 Array Iterator 对象，可以遍历所有成员](#arrayprototypevalues---返回一个新的-array-iterator-对象可以遍历所有成员)
        - [Array.prototype[@@iterator]() - 返回一个新的 Array Iterator 对象，同values方法，遍历键值](#arrayprototypeiterator---返回一个新的-array-iterator-对象同values方法遍历键值)
- [其它](#其它)
- [链接](#链接)

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
 * @param {Any} valueN 如果是普通元素直接连接到数组后面，如果是数组则会取数组里面的元素，而不是将整个数组作为单个元素
 * ...
 * @return {Array} 返回新的 Array 实例
 */
array.concat(value1[, value2[, ...[, valueN]]])
```
- 浅拷贝；
- 参数 valueN：
    - 如果是普通元素直接连接到数组后面；
    - 如果是数组则会取数组里面的元素，而不是将整个数组作为单个元素；
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
array.copyWithin(target[, start = 0 [, end = this.length ]])
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

#### Array.prototype.entries() - 方法返回一个新的Array Iterator对象，可以迭代索引和成员组成的数据结构

```js
/**
 * @description 方法返回一个新的Array Iterator对象，可以迭代索引和成员组成的数据结构
 * @return {Array Iterator} 返回一个新的Array Iterator对象
 */
array.entries()
```
- 返回一个新的 Array Iterator 对象，可遍历迭代器取得原数组的 `[key, value]`；
- 示例
    ```js
    var arr = ["a", "b", "c"];
    var iterator = arr.entries();
    
    for (let item of arr.entries()) {
        console.log(item);
    }
    // ['0', 'a']
    // ['1', 'b']
    // ['2', 'c']
    ```

#### Array.prototype.every() - 方法测试数组的所有元素是否都通过了指定函数的测试

```js
/**
 * @description 方法测试数组的所有元素是否都通过了指定函数的测试
 * @param {Function} callback 用来测试每个元素的函数，
 * @param {Object} thisArg
 * @return {Boolean}
 */
array.every(callback[, thisArg])
```
- 数组中所有元素符合条件时，那么array.every才返回true；
    - 空数组返回true（空数组所有元素都符合条件，因为空数组没有元素，囧）；
- callback 被传入三个参数：element、index、array；
- thisArg 提供为callback函数的this值，如果省略，则callback被调用时的this值，在非严格模式下为全局对象，在严格模式下为undefined；
- array.every 不会改变原数组；
- 注意：
    - every 遍历的元素范围在第一次调用 callback 之前就已确定了；
    - 在调用 every 之后添加到数组中的元素不会被 callback 访问到；
    - 如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值；
    - 那些被删除的元素或从来未被赋值的元素将不会被访问到；
- 示例
    ```js
    function isBigEnough(element, index, array) {
      return (element >= 10);
    }
    var passed = [12, 5, 8, 130, 44].every(isBigEnough);
    // passed is false
    passed = [12, 54, 18, 130, 44].every(isBigEnough);
    // passed is true
    ```

#### Array.prototype.fill() - 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引

```js
/**
 * @description 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引
 * @param {Any} value 用来填充数组元素的值
 * @param {Number} start 可选，起始索引，默认0
 * @param {Number} end 可选，终止索引，默认this.length
 * @return {Array} 返回被修改的原数组
 */
array.fill(value[, start = 0 [, end = this.length]])
```
- fill 方法故意被设计成通用的方法，该方法不要求 this 是数组对象；
- fill 方法是可变方法，它会改变调用它的 this 对象本身，然后返回它，而不是返回一个新的副本；
- 如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值；
- 如果 end 是个负数, 则结束索引会被自动计算成为 length+end；
- 示例
    ```js
    [1, 2, 3].fill(4);               // [4, 4, 4]
    [1, 2, 3].fill(4, 1);            // [1, 4, 4]
    [1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
    [1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
    [1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
    [1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
    [1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
    [1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
    Array(3).fill(4);                // [4, 4, 4]
    [].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
    
    // Objects by reference.
    var arr = Array(3).fill({}) // [{}, {}, {}];
    arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
    ```

#### Array.prototype.filter() - 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

```js
/**
 * @description 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
 * @param {Function} callback 回调函数，返回true保留元素，否则不保留
 * @param {Object} thisArg 可选
 * @return {Array} 返回一个新的通过测试的元素的集合的数组，如果没有通过测试则返回空数组
 */
array.filter(callback[, thisArg])
```
- callback
    - element、index、array
- thisArg
    - 如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值；
    - 否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined；
- 注意：
    - filter 遍历的元素范围在第一次调用 callback 之前就已经确定了；
    - 在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到；
    - 如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值；
    - 被删除或从来未被赋值的元素不会被遍历到；
- 示例
    ```js
    function isBigEnough(element) {
      return element >= 10;
    }
    var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
    // filtered is [12, 130, 44]
    ```

#### Array.prototype.find() - 返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined

```js
/**
 * @description 返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined
 * @param {Function} callback 回调函数
 * @param {Object} thisArg 可选
 * @return {Any} 数组中第一个满足所提供测试函数的元素的值，否则返回 undefined
 */
array.find(callback[, thisArg])
```
- callback
    - element、index、array
- find方法不会改变数组；
- 注意：
    - callback 函数会为数组中的每个索引调用即从 0 到 length - 1，而不仅仅是那些被赋值的索引，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法；

#### Array.prototype.findIndex() - 返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1

```js
/**
 * @description 返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1
 * @param {Function} callback 回调函数
 * @param {Object} thisArg 可选
 * @return {Number} 返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1
 */
array.findIndex(callback[, thisArg])
```
- 基本同array.find方法，只不过find方法返回值，而findIndex方法返回索引值；

#### Array.prototype.flat() - 扁平化嵌套数组，返回新数组

```js
/**
 * @description 递归到指定深度将所有子数组连接，并返回一个新数组
 * @param {Number} depth 可选，递归深度，默认为1
 * @return {Array} 递归到指定深度将所有子数组连接，并返回一个新数组
 */
array.flat([depth = 1])
```
- 扁平化嵌套数组；
- flat()方法会移除数组中的空项；
    - 例如：`[1, 2, , 4, 5].flat()` ==> `[1, 2, 4, 5]`
- 示例
    ```js
    var arr1 = [1, 2, [3, 4]];
    arr1.flat(); 
    // [1, 2, 3, 4]
    
    var arr2 = [1, 2, [3, 4, [5, 6]]];
    arr2.flat();
    // [1, 2, 3, 4, [5, 6]]
    
    var arr3 = [1, 2, [3, 4, [5, 6]]];
    arr3.flat(2);
    // [1, 2, 3, 4, 5, 6]
    
    //Infinity展开所有嵌套数组
    arr3.flat(Infinity); 
    // [1, 2, 3, 4, 5, 6]
    ```
- 替代array.flat
    ```js
    //使用reduce和concat递归
    var arr1 = [1,[2,[3,[4,[5,[6,7]]]]]];
    
    function _flatFunc(flatArray, dep=1){
       if(Number.isNaN(Number(dep))||Number(dep)<1) return flatArray;
       var curDep = 1;
       function recursionFun(flatArray, dep, curDep){
          return flatArray.reduce((acc,val) => (
             Array.isArray(val)&&(dep === Infinity || curDep< dep)
             ? acc.concat(_flatFunc(val, dep, curDep + 1))
             : acc.concat(val)
          ), []);
       }
       return recursionFun(flatArray, dep, curDep);
    }
    
    _flatFunc(arr1);
    //[1,2,[3,[4,[5,[6,7]]]]]
    
    _flatFunc(arr1,Infinity);
    //[1,2,3,4,5,6,7]
    
    
    //使用数组的toString方法
    
    arr1.toString().split(',').map(item => +item);
    //[1,2,3,4,5,6,7]  转换成了字符串，后面map转换一下数字
    ```

#### Array.prototype.flatMap()

```js
/**
 * @description 使用映射函数映射每个元素，然后将结果压缩成一个新数组
 * @param {Function} callback
 * @param {Object} thisArg 可选
 * @return {Array} 一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1
 */
array.flatMap(callback[, thisArg])
```
- 有关回调函数的详细描述，请参见 Array.prototype.map()，flatMap 方法与 map 方法和深度depth为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些；
- 示例
    ```js
    var arr1 = [1, 2, 3, 4];

    arr1.map(x => [x * 2]); 
    // [[2], [4], [6], [8]]
    
    arr1.flatMap(x => [x * 2]);
    // [2, 4, 6, 8]
    
    // 只会将 flatMap 中的函数返回的数组 “压平” 一层
    arr1.flatMap(x => [[x * 2]]);
    // [[2], [4], [6], [8]]
    ```
    ```js
    let arr = ["今天天气不错", "", "早上好"]

    arr.map(s => s.split(""))
    // [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
    
    arr.flatMap(s => s.split(''));
    // ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
    ```

#### Array.prototype.forEach() - 数组循环

```js
/**
 * @description 数组循环
 * @param {Function} callback
 * @param {Object} thisArg 可选
 * @return {Undefined} 返回undefined
 */
array.forEach(callback[, thisArg])
```
- 注意：
    - forEach 遍历的范围在第一次调用 callback 前就会确定；
    - 调用 forEach 后添加到数组中的项不会被 callback 访问到；
    - 如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值；
    - 那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）
    - **如果使用箭头函数表达式来传入函数参数，thisArg 参数会被忽略，因为箭头函数在词法上绑定了 this 值;**
        - 这个已经测试是这样，还要测试的是，其它数组方法是不是也是这样？？？？？？待测试...
- 示例
    ```js
    // 下面的例子会输出"one", "two", "four"。当到达包含值"two"的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four"现在在数组更前的位置，"three"会被跳过。 forEach()不会在迭代之前创建数组的副本。
    var words = ['one', 'two', 'three', 'four'];
    words.forEach(function(word) {
      console.log(word);
      if (word === 'two') {
        words.shift();
      }
    });
    // one
    // two
    // four
    ```

#### Array.prototype.includes() - 用来判断一个数组是否包含一个指定的值

```js
/**
 * @description 用来判断一个数组是否包含一个指定的值
 * @param {Any} valueToFind 需要查找的元素值
 * @param {Number} fromIndex 从该索引处开始查找，默认0
 * @return {Boolean} 返回true或false
 */
array.includes(valueToFind[, fromIndex = 0])
```
- 参数fromIndex
    - 默认为0；
    - 如果为负值，则按升序从 array.length - fromIndex 的索引开始搜索；
- includes() 方法有意设计为通用方法；
    - 它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)
        ```js
        (function() {
          console.log([].includes.call(arguments, 'a')); // true
          console.log([].includes.call(arguments, 'd')); // false
        })('a','b','c');
        ```
- 示例
    ```js
    [1, 2, 3].includes(2);     // true
    [1, 2, 3].includes(4);     // false
    [1, 2, 3].includes(3, 3);  // false
    [1, 2, 3].includes(3, -1); // true
    [1, 2, NaN].includes(NaN); // true
    ```

#### Array.prototype.indexOf() - 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1

```js
/**
 * @description 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1，查找顺序从前往后
 * @param {Any} searchElement 需要查找的元素值
 * @param {Number} fromIndex 可选，从该索引处开始查找，默认0
 * @return {Number} 返回索引
 */
array.indexOf(searchElement[, fromIndex = 0])
```
- 参数 fromIndex
    - 无论fromIndex是正数还是负数，查找的顺序都是从从前往后；
    - 如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1；
    - 如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推；

#### Array.prototype.join() 连接数组元素成一个字符串

```js
/**
 * @description 将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，如果数组只有一个元素，那么将返回该元素而不使用分隔符
 * @param {String} separator 可选，指定一个字符串来分隔数组的每个元素
 * @return {String} 
 */
array.join([separator = ','])
```
- 参数 separator
    - 默认为逗号 "," 分隔符号；
    - 如果指定为空串 ""，则元素之间没有任何字符分隔；
    - 如果元素为undefined或者null，其会被转换为空串，也会被分隔符分隔，详情见下例；
- 返回
    - 如果数组没有元素，则返回空串；
- 该方法也可以用在类数组对象上，例如 arguments；
- 示例
    ```js
    [null,1,undefined,2,null,3].join(',')// ',1,,2,,3'
    [null,1,undefined,2,null,3].join('')// '123'

    function f(a, b, c) {
      var s = Array.prototype.join.call(arguments);
      console.log(s); // '1,a,true'
    }
    f(1, 'a', true);
    ```

#### Array.prototype.keys() - 返回一个新的 Array Iterator 对象，可以遍历所有的索引

```js
/**
 * @description 返回一个新的 Array Iterator 对象，可以遍历所有的索引
 * @return {Array Iterator} 
 */
array.keys()
```
- 迭代器会包含那些没有对应元素的索引；
- 示例
    ```js
    var arr = ["a", , "c"];
    var sparseKeys = Object.keys(arr);
    var denseKeys = [...arr.keys()];
    console.log(sparseKeys); // ['0', '2']
    console.log(denseKeys);  // [0, 1, 2]
    ```

#### Array.prototype.lastIndexOf() - 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1

```js
/**
 * @description 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1，查找顺序从后往前
 * @param {Any} searchElement 需要查找的元素值
 * @param {Number} fromIndex 可选，从该索引处开始查找，默认this.length - 1
 * @return {Number} 返回索引
 */
array.lastIndexOf(searchElement[, fromIndex = this.length - 1])
```

#### Array.prototype.map() - 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果

```js
/**
 * @description 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
 * @param {Function} callback 
 * @param {Object} thisArg 可选
 * @return {Array} 返回新数组
 */
array.map(callback[, thisArg])
```
- map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数，callback 每次执行后的返回值（包括 undefined，null）组合起来形成一个新数组；
- 注意：
    - callback 函数只会在有值的索引上被调用；
    - 那些从来没被赋过值或者使用 delete 删除的索引则不会被调用；
    - 使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用之前就已经确定了；
    - 在 map 方法执行的过程中：原数组中新增加的元素将不会被 callback 访问到；若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们的那一时刻的值；
    - 而被删除的元素将不会被访问到；
- 示例
    ```js
    [null, undefined].map(() => null); // [null, null]
    [null, undefined].map(() => undefined); // [undefined, undefined]
    ```
    ```js
    var map = Array.prototype.map
    var a = map.call("Hello World", function(x) { 
      return x.charCodeAt(0); 
    })
    // a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
    ```

#### Array.prototype.pop() - 从数组中删除最后一个元素，并返回该元素的值，此方法更改原数组的长度

```js
/**
 * @description 从数组中删除最后一个元素，并返回该元素的值，此方法更改原数组的长度
 * @return {Array} 返回删除的元素，当数组为空时返回undefined
 */
array.pop()
```
- pop 方法有意具有通用性，该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上；
- pop方法根据 length属性来确定最后一个元素的位置。如果不包含length属性或length属性不能被转成一个数值，会将length置为0，并返回undefined；
- 如果你在一个空数组上调用 pop()，它返回  undefined；

删除数组最后一个元素，并返回该元素的值。此方法会修改数组的长度。

#### Array.prototype.push() - 将一个或多个元素添加到数组的末尾

```js
/**
 * @description 将一个或多个元素添加到数组的末尾
 * @param {Any} elementN
 * @return {Number} 返回该数组的新长度 
 */
array.push(element1, ..., elementN)
```
- push 方法有意具有通用性，该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上；
- push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时，当 length 不存在时，将会创建它；

#### Array.prototype.reduce() - 遍历数组，并将每个回调函数的返回值，作为下一次回调的第一个参数，最后一次回调返回作为redece方法返回

```js
/**
 * @description 遍历数组，并将每个回调函数的返回值，作为下一次回调的第一个参数，最后一次回调返回作为redece方法返回
 * @param {Function} callback
 * @param {Any} initialValue 可选
 * @return {Any} 最后一次回调的返回值
 */
array.reduce(callback[, initialValue])
```
- 函数 callback，有四个参数
    - accumulator：它是initialValue或上一次回调函数返回的值；
    - currentValue
    - currentIndex
    - array
- 函数 callback 第一次执行时，accumulator 和 currentValue 的取值有两种情况：
    - 如果调用reduce()时提供了initialValue，那么accumulator取值为initialValue，currentValue取数组中的第一个值；
    - 如果没有提供initialValue，那么accumulator取数组中第一个值，currentValue取数组中第二个值；
- 参数 initialValue
    - 作为第一次调用callback函数时的第一个参数accumulator的值；
- 注意：
    - 如果数组为空，且没有提供initialValue，会抛错；
    - 如果数组仅有一个元素，并且没有提供initialValue，或者提供了initialValue但是数组为空，那么此唯一值会被返回，并且callback不会被执行；
    - 所以：提供initialValue值会更加安全；
- 示例
    ```js
    // 求和
    [0, 1, 2, 3, 4].reduce((acc, cur) => acc + cur)
    ```
    ```js
    // 计算数组中每个元素出现的次数
    var names = ['a', 'b', 'a', 'c', 'b', 'a'];
    var countedNames = names.reduce((allNames, name) => {
        if(name in allNames) {
            allNames[name]++;
        } else {
            allNames[name] = 1;
        }
        return allNames;
    }, {})
    // {a: 3, b: 2, c: 1}
    ```
    ```js
    // 数组排序并去重
    let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
    let newArr = arr.sort().reduce((uniqueArr, item) => {
        if (unique.length === 0 || unique[unique.length - 1] !== item) {} else {
            uniqueArr.push(item);
        }

        return uniqueArr;
    }, []);
    ```

#### Array.prototype.reduceRight() - 同reduce()方法，只是该方法是从后往前遍历

- 同reduce()方法，只是该方法是从后往前遍历；
- 示例
    ```js
    // reduce 与 reduceRight 之间的区别
    var a = ['1', '2', '3', '4', '5']; 
    var left  = a.reduce(function(prev, cur)      { return prev + cur; }); 
    var right = a.reduceRight(function(prev, cur) { return prev + cur; }); 
    
    console.log(left);  // "12345"
    console.log(right); // "54321"
    ```

#### Array.prototype.reverse() - 将数组中元素的位置颠倒，并返回该数组，该方法会改变原数组

```js
/**
 * @description 将数组中元素的位置颠倒，并返回该数组，该方法会改变原数组
 * @return {Array} 返回颠倒后的原数组
 */
array.reverse()
```
- 示例
    ```js
    var sourceArray = ['one', 'two', 'three'];
    var reverseArray = sourceArray.reverse();
    
    console.log(sourceArray ) // ['three', 'two', 'one']
    console.log(sourceArray === reverseArray); // true
    ```

#### Array.prototype.shift() - 删除数组第一个元素，并返回该元素的值，此方法更改数组的长度

```js
/**
 * @description 删除数组第一个元素，并返回该元素的值，此方法更改数组的长度
 * @return {Any} 返回从数组中删除的元素，如果数组为空则返回undefined
 */
array.shift()
```
- shift 方法并不局限于数组：这个方法能够通过 call 或 apply 方法作用于类似数组的对象上；
    - 但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义；
- 示例
    ```js
    let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

    console.log('调用 shift 之前: ' + myFish);
    // "调用 shift 之前: angel,clown,mandarin,surgeon"
    
    var shifted = myFish.shift(); 
    
    console.log('调用 shift 之后: ' + myFish); 
    // "调用 shift 之后: clown,mandarin,surgeon" 
    
    console.log('被删除的元素: ' + shifted); 
    // "被删除的元素: angel"
    ```

删除数组中第一个元素，并返回该元素的值。此方法会修改数组的长度。


#### Array.prototype.slice() - 返回一个从开始索引到结束索引（不包括结束）的数组的一部分浅拷贝到一个新数组对象，元素数组不会被修改

```js
/**
 * @description 返回一个从开始索引到结束索引（不包括结束）的数组的一部分浅拷贝到一个新数组对象，元素数组不会被修改
 * @param {Number} begin 可选，默认为0
 * @param {Number} end 可选，不包括end索引处，默认为 this.length，即到末尾
 * @return {Array} 返回新数组
 */
array.slice([begin = 0 [, end = this.length]])
```
- 参数 begin
    - 默认0；
    - 如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取；
        - 例如，slice(-2)表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）；
- 参数 end
    - 不包括end；
    - 默认this.length，即到末尾;
    - 如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取；
        - 例如，slice(-2,-1)表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）；
    - 如果 end 大于数组长度，slice 也会一直提取到原数组末尾；
- slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组，例如arguments；
- 示例
    ```js
    var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
    var citrus = fruits.slice(1, 3);
    
    // fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
    // citrus contains ['Orange','Lemon']
    ```
    ```js
    // slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组
    functioin listArgs() {
        // 或 [].slice.slice.call(arguments)
        return Array.prototype.slice.call(arguments);
    }
    
    var = listArgs(1, 2, 3); // [1, 2, 3]
    ```

#### Array.prototype.some() - 测试是否至少有一个元素通过由callback提供的测试

```js
/**
 * @description 测试是否至少有一个元素通过由callback提供的测试
 * @param {Function} callback 
 * @param {Object} thisArg 可选
 * @return {Boolean} 
 */
array.some(callback[, thisArg])
```
- some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）；
- 注意：
    - some() 遍历的元素的范围在第一次调用 callback 时就已经确定了；
    - 在调用 some() 后被添加到数组中的值不会被 callback 访问到；
    - 如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some() 访问到它那一刻的值；
    - callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用；
- 示例
    ```js
    // 判断是否含有大于10的数字
    [1,2,3,45].some(item => item > 10);
    ```
    ```js
    // 模仿 includes() 方法，若元素在数组中存在则返回true

    function iincludes(arr, checkItem) {
        return arr.some(item => item === checkItem);
    };
    ```

#### Array.prototype.sort() - 对数组的元素进行排序，并返回原数组

```js
/**
 * @description 对数组的元素进行排序，并返回原数组
 * @param {Function} compareFunction 可选，用来指定按某种顺序进行排列的函数，如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序
 * @return {Array} 排序后的原数组 
 */
array.sort([compareFunction])
```
- sort 方法使用 [原地算法](https://en.wikipedia.org/wiki/In-place_algorithm) 对数组的元素进行排序；
    - 排序算法现在是稳定的；
    - 默认排序顺序是根据字符串Unicode码点；
    - 由于它取决于具体实现，因此无法保证排序的时间和空间复杂性
- 参数 compareFunction
    - 可选，用来指定按某种顺序进行排列的函数，如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序
    - 该函数含有两个参数：第一个用于比较的元素 和 第二个用于比较的元素；
    - 例如：
        - 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
        - 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前；
        - 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变；
            - 备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守；
- **注意**：
    - 默认比较是将元素转换为字符串后，比较unicode码点，故默认的不能直接用来比较**数字**，单位的数字可以借用unicode比较，但是多位数字不能直接比较，例如sort会认为 `13` 小于 `2`，因为其应该是一位一位比较，前者第一位数字 `1` 小于后者第一位数字 `2`；
    - 故，若比较数字，最好指定compareFunciton比较函数，例如：`arr.sort((a, b) => a - b)`
- 示例
    ```js
    // 比较函数逻辑
    function compare(a, b) {
      if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
        return -1;
      }
      if (a > b ) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
    ```
    ```js
    // 比较数字
    [4,2,1].sort((a, b) => a -b);
    ```
    ```js
    // compareFunction 可能需要对元素做多次映射以实现排序，尤其当 compareFunction 较为复杂，且元素较多的时候，某些 compareFunction 可能会导致很高的负载。使用 map 辅助排序将会是一个好主意。基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复
    
    
    // 需要被排序的数组
    var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];
    
    // 对需要排序的数字和位置的临时存储
    var mapped = list.map(function(el, i) {
      return { index: i, value: el.toLowerCase() };
    })
    
    // 按照多个值排序数组
    mapped.sort(function(a, b) {
      return +(a.value > b.value) || +(a.value === b.value) - 1;
    });
    
    // 根据索引得到排序的结果
    var result = mapped.map(function(el){
      return list[el.index];
    });
    ```


#### Array.prototype.splice() - 通过删除或替换现有元素来修改数组，并以数组形式返回被修改的内容，此方法会改变原数组

```js
/**
 * @description 通过删除或替换现有元素来修改数组，并以数组形式返回被修改的内容，此方法会改变原数组
 * @param {Number} start 指定修改的开始位置
 * @param {Number} deleteCount 可选，指定要移除数组元素的个数
 * @param {Any} itemN 可选，要添加进数组的元素，从start位置开始，如果省略，那么splice将只删除元素
 * @return {Array} 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组；如果没有删除元素，则返回空数组
 */
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
- 不传任何参数，返回空数组，对原数组不做任何修改：`splice() // []`；
- 流程：先删除，再插入；
    - 在start位置删除，同时也是在start位置插入；
- 参数start
    - 指定修改的开始位置；
    - 如果超出了数组的长度，则从数组末尾开始添加内容；
    - 如果是负值，则表示从数组末位开始的第几位；
    - 如果负数的绝对值大于数组的长度，则表示开始位置为第0位；
- 参数deleteCount
    - 指定要移除的数组元素的个数；
    - 如果 deleteCount 是 0或者负数，则不移除元素；
    - 如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）；
    - deleteCount默认值为`this.length - start`，即从start开始（包括start），后面全部删除；
- 参数itemN
    - 要添加进数组的元素,从start 位置开始；
    - 如果不指定，则 splice() 将只删除数组元素；
- 注意：
    - 如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变；
- 示例
    ```js
    // 不传任何参数，不做任何处理
    
    let arr = [1,2,3];
    let delArr = arr.splice();

    console.log(arr); // [1, 2, 3]
    console.log(delArr); // []
    ```
    ```js
    // 从第2位开始删除1个元素，然后插入“trumpet”
    var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
    var removed = myFish.splice(2, 1, "trumpet"); 
    //运算后的myFish: ["angel", "clown", "trumpet", "surgeon"] 
    //被删除元素数组：["drum"]
    ```

#### Array.prototype.toLocaleString()

覆盖了Object.prototype.toLocaleString()

#### Array.prototype.toString()

```js
/**
 * @description 
 * @return {String} 
 */
array.toString()
```
- Array对象覆盖了Object的 toString 方法;
- 对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素；
- 当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法；
- 示例
    ```js
    ['a','b','c',['d',['e']]].toString(); // 'a,b,c,d,e'

    [1,2,3,4].toString(); // '1,2,3,4'

    [{a:1}].toString(); // '[object Object]'
    ```

#### Array.prototype.unshift() - 将一个或多个元素添加到数组的开头，并返回该数组的新长度

```js
/**
 * @description 将一个或多个元素添加到数组的开头，并返回该数组的新长度
 * @param elementN 可选，要添加到数组开头的元素
 * @return {Number} 该数组的新长度
 */
array.unshift([element1, ..., elementN])
```
- 注意：
    - unshift 特意被设计成具有通用性；这个方法能够通过 call 或 apply 方法作用于类数组对象上；
    - 不过对于没有 length 属性的对象，调用该方法可能没有任何意义；
- 示例
    ```js
    var arr = [1, 2];

    arr.unshift(0); //result of call is 3, the new array length
    //arr is [0, 1, 2]
    
    arr.unshift(-2, -1); // = 5
    //arr is [-2, -1, 0, 1, 2]
    
    arr.unshift( [-3] );
    //arr is [[-3], -2, -1, 0, 1, 2]
    ```

#### Array.prototype.values() - 返回一个新的 Array Iterator 对象，可以遍历所有成员

```js
/**
 * @description 返回一个新的 Array Iterator 对象，可以遍历所有成员
 * @return {Array Iterator} 
 */
array.values()
```
- 示例
    ```js
    let arr = ['w', 'y', 'k', 'o', 'p'];
    let eArr = arr.values();
    for (let letter of eArr) {
      console.log(letter);
    }
    // w
    // y
    // k
    // o
    // p
    ```
    ```js
    let arr = ['w', 'y', 'k', 'o', 'p'];
    let eArr = arr.values();
    console.log(eArr.next().value); // w
    console.log(eArr.next().value); // y
    console.log(eArr.next().value); // k
    console.log(eArr.next().value); // o
    console.log(eArr.next().value); // p
    ```

#### Array.prototype[@@iterator]() - 返回一个新的 Array Iterator 对象，同values方法，遍历键值

```js
/**
 * @description 数组的 iterator 方法，默认情况下与 values() 返回值相同
 * @return {Array Iterator} 
 */
array[Symbol.iterator]()
```
- 数组的 iterator 方法，默认情况下与 values() 返回值相同
- 示例
    ```js
    let arr = ['w', 'y', 'k', 'o', 'p'];
    let eArr = arr[Symbol.iterator]();
    for (let letter of eArr) {
      console.log(letter);
    }
    ```
    ```js
    let arr = ['w', 'y', 'k', 'o', 'p'];
    let eArr = arr[Symbol.iterator]();
    console.log(eArr.next().value); // w
    console.log(eArr.next().value); // y
    console.log(eArr.next().value); // k
    console.log(eArr.next().value); // o
    console.log(eArr.next().value); // p
    ```

## 其它

- 许多Array方法在处理String时非常有用，虽然这些方法不属于String，但是String可以借用
    - Array.prototype.join
    - Array.prototype.map
    - Array.prototype.reverse
    - ...（思考有哪些array方法可以用在string上面）
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

## 链接

- [MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Github](https://github.com/SummerLius/note/blob/master/note/%E7%A8%8B%E5%BA%8F%E8%AF%AD%E8%A8%80_Programming_Language/javascript/syntax/mdn/%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1/Array.md)

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