<!-- TOC -->

- [Set](#set)
    - [简述](#简述)
    - [构造函数](#构造函数)
    - [属性和方法](#属性和方法)
        - [Set.length](#setlength)
        - [Set[@@species]](#setspecies)
        - [Set.prototype](#setprototype)
        - [Set.prototype.size](#setprototypesize)
        - [Set.prototype.constructor](#setprototypeconstructor)
        - [Set.prototype.add() - 向 Set 对象的末尾添加一个元素](#setprototypeadd---向-set-对象的末尾添加一个元素)
        - [Set.prototype.clear() - 清空 Set 对象中的所有元素](#setprototypeclear---清空-set-对象中的所有元素)
        - [Set.prototype.delete() - 删除 Set 对象中指定元素](#setprototypedelete---删除-set-对象中指定元素)
        - [Set.prototype.entries() - 返回一个新的迭代器对象，该对象元素是类似 [value, value] 形式的数组](#setprototypeentries---返回一个新的迭代器对象该对象元素是类似-value-value-形式的数组)
        - [Set.prototype.forEach() - 根据Set中元素顺序，遍历处理](#setprototypeforeach---根据set中元素顺序遍历处理)
        - [Set.prototype.has() - 判断 Set 对象中是否存在指定元素](#setprototypehas---判断-set-对象中是否存在指定元素)
        - [Set.prototype.values() - 返回一个新生成的可迭代对象，可以按插入顺序遍历Set对象的元素](#setprototypevalues---返回一个新生成的可迭代对象可以按插入顺序遍历set对象的元素)
        - [Set.prototype.keys() - 该方法是values()方法的别名](#setprototypekeys---该方法是values方法的别名)
        - [Set.prototype[@@iterator]() - 默认Symbol.iterator迭代接口，同values方法](#setprototypeiterator---默认symboliterator迭代接口同values方法)

<!-- /TOC -->

# Set

## 简述

- `Set` 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用；
- Set对象是值的集合，你可以按照插入的顺序迭代它的元素；
- 相等的判断
    - 因为 Set 中的值总是唯一的，所以需要判断两个值是否相等；
    - `NaN` 和 `undefined` 都可以被存储在Set中，并且 `NaN` 之间被视为相同的值；

## 构造函数

```js
/**
 * @description
 * @param {Iterable} iterable 可选，可迭代对象
 * @return {Set} 返回一个新的 Set 对象
 */
new Set([iterable])
```
- 参数iterable
    - 如果传递一个可迭代对象，它的所有元素将不重复的被添加到新的Set中；
    - 如果不指定此参数或者其值为null，则新的Set为空；
- 示例
    ```js
    new Set(1); // TypeError，不可迭代
    new Set(); // Set(0) {}
    new Set('abc'); // Set(3) {"a", "b", "c"}
    new Set([1, 2, 3]); // Set(3) {1, 2, 3}
    new Set([[1, 2], [1, 2]]); // Set(2) {Array(2), Array(2)}
    ```

## 属性和方法

### Set.length

### Set[@@species]

### Set.prototype

- Set原型对象

### Set.prototype.size

- 返回实例对象值的个数；

### Set.prototype.constructor

- 返回实例的构造函数，默认情况下是Set；

### Set.prototype.add() - 向 Set 对象的末尾添加一个元素

```js
/**
 * @description 向 Set 对象的末尾添加一个指定的值
 * @param {Any} value 任意数据，原始值或对象
 * @return {Set} 返回Set对象本身
 */
mySet.add(value);
```


### Set.prototype.clear() - 清空 Set 对象中的所有元素

```js
/**
 * @description 清空 Set 对象中的所有元素
 * @return {Undefined} 返回undefined
 */
mySet.clear();
```

### Set.prototype.delete() - 删除 Set 对象中指定元素

```js
/**
 * @description 删除 Set 对象中指定元素
 * @param {Any} value 任意数据，原始值或对象
 * @return {boolean} 成功删除返回true，否则返回false
 */
mySet.delete(value);
```

### Set.prototype.entries() - 返回一个新的迭代器对象，该对象元素是类似 [value, value] 形式的数组 

```js
/**
 * @description 返回一个新的迭代器对象，该对象元素是类似 [value, value] 形式的数组
 * @return {Iterator} 
 */
mySet.entries();
```
- 该方法返回一个新的迭代器对象，该对象元素是类似 [value, value] 形式的数组；
    - 其中value是Set对象的每个元素，迭代器对象元素的顺序即Set对象中元素插入的顺序；
    - 由于 Set 对象不向 Map 对象那样拥有 key，然而为了与 Map 对象的 API 形式保持一致，使的每一项的 key 和 value 有拥有相同的值，因而最终返回一个 `[value, value]` 形式的数组；
- 示例
    ```js
    let mySet = new Set([1, 2, 3]);

    for (let item of mySet.entries()) {
        console.log(item);
    }
    // [1, 1]
    // [2, 2]
    // [3, 3]
    
    console.log([...mySet.entries()]); // [ [1, 1], [2, 2], [3, 3] ]
    ```

### Set.prototype.forEach() - 根据Set中元素顺序，遍历处理

```js
/**
 * @description 根据Set中元素顺序，遍历处理
 * @param {Function} callback 
 * @param {Object} thisArg 可选，作为callback函数this对象
 * @return {Undefined} 
 */
mySet.forEach(callback[, thisArg]);
```
- callback 函数中前两个参数一样
- 示例
    ```js
    // callback 函数中前两个参数一样
    let mySet = new Set([1, 2, 3]);
    
    mySet.forEach((item, index, mySet) => {
        console.log(item, index);
    });
    // 1 1
    // 2 2
    // 3 3
    ```

### Set.prototype.has() - 判断 Set 对象中是否存在指定元素

```js
/**
 * @description 判断 Set 对象中是否存在指定元素
 * @param {Any} value 任意数据，原始值或对象
 * @return {boolean} 存在返回true，否则返回false
 */
mySet.has(value);
```

### Set.prototype.values() - 返回一个新生成的可迭代对象，可以按插入顺序遍历Set对象的元素

```js
/**
 * @description 返回一个新生成的可迭代对象，可以按插入顺序遍历Set对象的元素
 * @return {Iterator} 
 */
mySet.values();
```
- values() 方法返回一个 Iterator 对象，可以利用该对象按元素插入Set的顺序来遍历；
- `keys()` 方法是 `values()` 方法的别名，两者行为完全一致；
- 示例
    ```js
    let mySet = new Set([1, 2, 3]);
    
    for (let item of mySet.values()) {
        console.log(item); 
    }
    // 1
    // 2
    // 3

    console.log([...mySet.values()]); // [1, 2, 3]
    ```

### Set.prototype.keys() - 该方法是values()方法的别名

### Set.prototype[@@iterator]() - 默认Symbol.iterator迭代接口，同values方法

- 默认该属性 `SYmbol.iterator` 值，和其 `values` 属性一样；




