<!-- TOC -->

- [Function构造函数](#function构造函数)
    - [Properties](#properties)
    - [Static Methods](#static-methods)
    - [Prototype Methods](#prototype-methods)
- [详解](#详解)
    - [函数定义](#函数定义)
        - [三种定义](#三种定义)
        - [不同定义区别](#不同定义区别)
            - [为什么js下没有重载？](#为什么js下没有重载)
            - [函数声明与函数表达式](#函数声明与函数表达式)
    - [函数运行时](#函数运行时)
    - [函数四种调用方式与this对象](#函数四种调用方式与this对象)
        - [声明函数调用](#声明函数调用)
        - [对象方法调用](#对象方法调用)
        - [构造函数调用](#构造函数调用)
        - [apply、call、bind调用](#applycallbind调用)
    - [函数与对象的源头](#函数与对象的源头)
- [参考](#参考)

<!-- /TOC -->

## Function构造函数

### Properties

- Function.prototype
- Functoin.length
- ...

### Static Methods

- 无

### Prototype Methods

- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()
- Function.prototype.isGenerator()
- Function.prototype.toSource()
- Function.prototype.toString()

## 详解

<!-- ----------------------------------------------------------- -->
### 函数定义

每个函数都是Function类型的实例。由于函数是对象，因此函数名实际上也是指向函数对象的指针、引用，不会与某个函数绑定，可以再赋值。

#### 三种定义

函数定义三种方式:
- `声明式定义`：**可以把函数名看作变量**，指向或者引用这个函数对象
- `函数表达式定义`：可以不指定函数名，直接将函数对象赋值给一个变量
- `构造函数式定义`：直接使用Functiong构造函数，不推荐使用，这种语法会导致解析两次代码（第一次解析常规js代码，第二次是解析传入构造函数中的字符串），从而影响性能。不过，这种语法对于理解“函数是对象，函数名是指针”的概念较直观。

```javascript
// 声明式定义
function sum (p1, p2) {
    return p1 + p2;
}

// 函数表达式定义
var sum = function (p1, p2) {
    return p1 + p2;
};

// 构造函数定义，不推荐
var sum = new Function("p1", "p2", "return p1 + p2");
```

#### 不同定义区别

##### 为什么js下没有重载？


##### 函数声明与函数表达式

在代码执行之前，解析器先执行一个函数声明的提升过程，读取并将函数声明添加到执行环境中。而函数表达式，必须等到解析器执行到它所在的代码行，才会被解释执行。

而我们之前也说过，函数声明时函数名实际上就是一个变量，也就是说声明+定义了一个变量。

需要注意的是，即使函数声明放在代码的最后，但是在执行代码的第一行时就已经起作用了，如果之后声明定义一个同名的变量，会形成重复声明。

```javascript
/**
 * 错误示例
 *
 *      执行环境先函数声明，声明并定义了
 *      函数名变量 var a = function(){}，
 *      之后又执行 let a = {}，形成重复
 *      声明变量a
 *
 */
'use strict'
let a = {}; // 这里抛错：SyntaxError: Identifier 'a' has already been declared
function a() {}
console.log(typeof a);

/**
 * 正确示例
 */
'use strict'
a = {};
function a() {}
console.log(typeof a); // "object"
```
<!-- ----------------------------------------------------------- -->
### 函数运行时

函数运行时其内部执行环境存在两个局部变量：
- arguments
- this

<!-- ----------------------------------------------------------- -->
### 函数四种调用方式与this对象

#### 声明函数调用

函数定义在执行环境中（全局函数或其它函数执行体内），调用时直接 "函数名+()"。无论在哪里调用（甚至在一个对象的属性方法内的方法内...），**严格模式下，调用上下文this为undefined，非严格模式下为global**。

#### 对象方法调用

函数作为对象的一个属性，obj.f = function(){}，调用的时候obj.f()，这样方法内调用上下文this为obj。

#### 构造函数调用

使用`new`关键字执行函数时，都作为构造函数。
1. 构造函数执行时，首先会创建一个新的空对象，然后将对象的__proto__指向函数prototype对象；
2. 然后将此新空对象作为此次函数执行的上下文this，末尾自动return新对象。

#### apply、call、bind调用

```javascript
fun.apply(thisArg, [argsArray])
fun.call(thisArg[, arg1[, arg2[, ...]]])
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```
<!-- ----------------------------------------------------------- -->

### 函数与对象的源头

![js_function](../../../assets/js_function.png)

看下起始，按照创建时间：
1. null对象出世
2. 定义Object.prototype对象，将其__proto__属性指向null
3. 定义Function.prototype对象，并将其__proto__属性指向Object.prototype
4. 定义Function构造函数，其__proto__属性指向Function.prototype，这个比较特殊。
5. 定义Object构造函数，由Function构造函数创建，var Object = new Function(xxx)。显然，通过new产生的Object的__proto__属性指向Function.prototype
6. 这样两个原始构造函数Function、Object都有了，其它所有的对象即函数均通过两者创建，可谓

**每个函数的prototype属性都是新生成对象赋值，而__proto__属性都是指向一个已存在的对象。**

- new Function()：函数本质上可以理解都是通过new Function()创建，新生成的函数f其__proto__属性指向Function.prototype；而f.prototype是新创建的对象，f.prototype.__proto__指向Object.prototype
- new Object()：对象没有prototype属性，有__proto__属性指向Object.prototype

## 参考

- JS权威指南
- JS高级程序设计



