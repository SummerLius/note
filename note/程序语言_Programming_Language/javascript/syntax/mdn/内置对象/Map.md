<!-- TOC -->

- [Map](#map)
    - [简述](#简述)
    - [构造函数](#构造函数)
    - [属性和方法](#属性和方法)
        - [Map.length - 属性 length 的值为 0](#maplength---属性-length-的值为-0)
        - [get Map[@@species]](#get-mapspecies)
        - [Map.prototype - Map函数原型对象](#mapprototype---map函数原型对象)
        - [Map.prototype.constructor - 指向Map函数](#mapprototypeconstructor---指向map函数)
        - [Map.prototype.size - 返回 Map 对象键值对的数量](#mapprototypesize---返回-map-对象键值对的数量)
        - [Map.prototype.clear() - 移除 Map 对象所有键值对](#mapprototypeclear---移除-map-对象所有键值对)
        - [Map.prototype.delete() - 移除指定的键](#mapprototypedelete---移除指定的键)
        - [Map.prototype.entries() - 返回新的迭代器，可以遍历获得所有键值对](#mapprototypeentries---返回新的迭代器可以遍历获得所有键值对)
        - [Map.prototype.forEach() - 遍历](#mapprototypeforeach---遍历)
        - [Map.prototype.get() - 获取指定键对应的值](#mapprototypeget---获取指定键对应的值)
        - [Map.prototype.has() - 判断是否含有指定键](#mapprototypehas---判断是否含有指定键)
        - [Map.prototype.keys() - 返回新的迭代器，可以遍历获得所有键](#mapprototypekeys---返回新的迭代器可以遍历获得所有键)
        - [Map.prototype.set() - 设置键值对](#mapprototypeset---设置键值对)
        - [Map.prototype.values() - 返回新的迭代器，可以遍历获得所有值](#mapprototypevalues---返回新的迭代器可以遍历获得所有值)
        - [Map.prototype[@@iterator]() - 同 entries() 方法](#mapprototypeiterator---同-entries-方法)

<!-- /TOC -->

# Map

## 简述

- Map 对象保持键值对，任何值（对象或原始值）都可以作为一个键或一个值；
- Map 对象在迭代时会根据元素插入的顺序来进行迭代，每次迭代会返回一个 `[key, value]` 形式的数组；
- 键相等的比较，同 Set 比较一样，基于 “SameValueZero” 算法：
    - `NaN` 与 `NaN` 是相等的，其它所有值根据全等符号 `===` 进行比较；
- **Object 和 Map 的比较**
    - 两者类似的是，都允许你按键key来存取一个值、删除键、检测键是否绑定值等；
    - 过去，我们一直把对象当做 Map 使用，不过两者还是有一些区别：
        - 一个 Object 的键只能是 String 或 Symbol，但一个 Map 的键可以是任意值，包括原始值、对象、函数等等；
        - Map 中的键是有序的，而添加到 Object 的不是；因此，遍历 Map 时，是有序的，而 Object 不一定有序；
        - 你可以通过 `size` 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数需要手动计算；
        - Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代；
            - 当然，你也可以使用 `for...in` 对 Object 进行遍历，注意其会遍历到原型链上；
        - Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突；
            - 虽然可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见；
        - Map 在涉及频繁增删键值对的场景下会有性能优势；

## 构造函数

```js
/**
 * @param {Iterable} iterable 可选，可迭代对象
 * @returns {Map}
 */
new Map([iterable])
```
- 参数iterable
    - 可迭代对象即可；
    - 该迭代对象每次迭代返回必须是这种格式：`[key, value]`；
- 示例
    ```js
    new Map([1]); // TypeError
    new Map([]); // 无元素，size为0
    new Map([[]]); // Map(1) {undefined => undefined}
    new Map([undefined]); // Map(1) {undefined => undefined}
    new Map([null]); // // Map(1) {null => undefined}
    new Map([undefined, null]); // Map(1) {undefined => null}
    new Map([[1, 2], [2, 3]]); // Map(2) {1 => 2, 3 => 4} 

    new Map(new Set([1, 2, 3])); // TypeError
    new Map(new Set([1, 2, 3]).entries()); // Map(3) {1 => 1, 2 => 2, 3 => 3}
    
    new Map([1, 2, 3]); // TypeError
    new Map([1, 2, 3].entries()); // Map(3) {0 => 1, 1 => 2, 2 => 3}

    new Map('abc'); // TypeError
    ```

## 属性和方法

### Map.length - 属性 length 的值为 0
### get Map[@@species]
### Map.prototype - Map函数原型对象
### Map.prototype.constructor - 指向Map函数
### Map.prototype.size - 返回 Map 对象键值对的数量

### Map.prototype.clear() - 移除 Map 对象所有键值对

```js
/**
 * @description 移除 Map 对象所有键值对
 * @return {Undefined}
 */
myMap.clear();
```
- 示例
    ```js
    var myMap = new Map();
    myMap.set("bar", "baz");
    myMap.set(1, "foo");
    
    myMap.size;       // 2
    myMap.has("bar"); // true
    
    myMap.clear();
    
    myMap.size;       // 0
    myMap.has("bar")  // false
    ```

### Map.prototype.delete() - 移除指定的键

```js
/**
 * @description 
 * @param {Any} key
 * @return {Boolean} 如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false
 */
myMap.delete(key);
```
- 示例
    ```js
    var myMap = new Map();
    myMap.set("bar", "foo");
    
    myMap.delete("bar"); // 返回 true。成功地移除元素
    myMap.has("bar");    // 返回 false。"bar" 元素将不再存在于 Map 实例中
    ```

### Map.prototype.entries() - 返回新的迭代器，可以遍历获得所有键值对

```js
/**
 * @description 
 * @return {Iterator}
 */
myMap.entries();
```
- 示例
    ```js
    var myMap = new Map();
    myMap
        .set('0', 'foo')
        .set(1, 'bar');
    
    for (let item of myMap.entries()) {
        console.log(item);
    }
    // ["0", "foo"]
    // [1, "bar"]

    console.log([...myMap.entries()]); // [["0", "foo"], [1, "bar"]]
    ```

### Map.prototype.forEach() - 遍历

```js
/**
 * @description 
 * @param {Function} callback
 * @param {Object} thisArg
 * @return {Undefined}
 */
myMap.forEach(callback[, thisArg]);
```
- 示例
    ```js
    new Map([["foo", 3], ["bar", {}], [null, 1]]).forEach((value, key) => {
        console.log(key, value);
    });
    // "foo" 3
    // "bar" {}
    // null 1
    ```

### Map.prototype.get() - 获取指定键对应的值

```js
/**
 * @description 
 * @param {Any} key
 * @return {Any} 返回指定键对应的值，如果找不到这个键就返回 undefined
 */
myMap.get(key);
```
- 示例
    ```js
    var myMap = new Map();
    myMap.set("bar", "foo");
    
    myMap.get("bar");  // 返回 "foo"
    myMap.get("baz");  // 返回 undefined
    ```


### Map.prototype.has() - 判断是否含有指定键

```js
/**
 * @description 
 * @param {Any} key
 * @return {Boolean}
 */
myMap.has(key);
```
- 示例
    ```js
    var myMap = new Map();
    myMap.set("bar", "foo");
    
    myMap.has("bar");  // returns true
    myMap.has("baz");  // returns false
    ```

### Map.prototype.keys() - 返回新的迭代器，可以遍历获得所有键

```js
/**
 * @description 
 * @return {Iterator}
 */
myMap.keys();
```
- 示例
    ```js
    var myMap = new Map();
    myMap.set("0", "foo")
        .set(1, "bar")
        .set({}, "baz");
    
    console.log([...myMap.keys()]); // ["0", 1, {}]
    ```

### Map.prototype.set() - 设置键值对

```js
/**
 * @description 设置键值对
 * @param {Any} key
 * @param {Any} value
 * @return {Map} 返回原Map对象
 */
myMap.set(key, value);
```
- 示例
    ```js
    let myMap = new Map();

    myMap.set('a', 'b')
        .set(1, 'c')
        .set(2, 'd');
    ```

### Map.prototype.values() - 返回新的迭代器，可以遍历获得所有值

```js
/**
 * @description 
 * @param {}
 * @return {Iterator}
 */
myMap.values();
```
- 示例
    ```js
    var myMap = new Map();
    myMap.set("0", "foo")
        .set(1, "bar")
        .set({}, "baz");

    console.log([...myMap.values()]); // ["foo", "bar", "baz"]
    ```

### Map.prototype[@@iterator]() - 同 entries() 方法
