<!-- TOC -->

- [Array构造函数](#array构造函数)
    - [Static Properties](#static-properties)
        - [Array.length](#arraylength)
        - [Array.prototype](#arrayprototype)
    - [Prototype Properties](#prototype-properties)
        - [Array.prototype.length](#arrayprototypelength)
    - [Static Methods](#static-methods)
        - [Array.from()](#arrayfrom)
        - [Array.isArray()](#arrayisarray)
        - [Array.of()](#arrayof)
    - [Prototype Methods](#prototype-methods)
        - [Array.prototype.concat()](#arrayprototypeconcat)
        - [Array.prototype.copyWithin()](#arrayprototypecopywithin)
        - [Array.prototype.entries()](#arrayprototypeentries)
        - [Array.prototype.every()集合](#arrayprototypeevery集合)
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

#### Array.from()

该方法从一个类似数组或可迭代的对象中创建一个新的数组实例。

`Array.from(arrayLike[, mapFn[, thisArg]])`

- arrayLike：
- mapFn：
- thisArg：
- @return：一个新Array实例

```javascript
Array.from([1, 2, 3]);// [1,2,3]
Array.from('abc12');// ['a', 'b', 'c', '1', '2']
```

#### Array.isArray()

#### Array.of()

### Prototype Methods

```javascript
Array.prototype.concat()
Array.prototype.copyWithin()
Array.prototype.entries()
Array.prototype.every()集合
Array.prototype.fill()
Array.prototype.filter()集合
Array.prototype.find()集合
Array.prototype.findIndex()集合
Array.prototype.forEach()集合
Array.prototype.includes()
Array.prototype.indexOf()
Array.prototype.join()
Array.prototype.keys()
Array.prototype.lastIndexOf()
Array.prototype.map()集合
Array.prototype.pop()
Array.prototype.push()
Array.prototype.reduce()集合
Array.prototype.reduceRight()集合
Array.prototype.reverse()
Array.prototype.shift()
Array.prototype.unshift()
Array.prototype.slice()
Array.prototype.some()集合
Array.prototype.sort()
Array.prototype.splice()
Array.prototype.toLocaleString()
Array.prototype.toString()
Array.prototype.values()
```

#### Array.prototype.concat()

用于合并两个或多个数组。不会更改现在有数组，返回新数组。

`var new_array = old_array.concat(value1, value2, ...)`

- 浅复制
- @return：返回新Array对象


#### Array.prototype.copyWithin()

- 浅复制

#### Array.prototype.entries()

返回一个新的Array Iterator对象

- 待了解

#### Array.prototype.every()集合

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
- Array.prototype. -->