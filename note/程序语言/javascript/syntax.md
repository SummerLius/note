<!-- TOC -->

- [JS作用域](#js作用域)
- [数据类型](#数据类型)
    - [原始类型](#原始类型)
    - [引用类型](#引用类型)
    - [原始类型包装对象](#原始类型包装对象)
    - [原始值与包装对象的转换](#原始值与包装对象的转换)
- [变量](#变量)
    - [var](#var)
    - [let、const](#letconst)

<!-- /TOC -->

## JS作用域 

JavaScript只有两个范围：**全局**和**局部**。

- `全局`：函数之外声明的变量，它的值可在整个程序中访问和修改。
- `局部`：在函数类声明的变量。每当执行函数时，都会创建该变量，执行完后自动销毁。
- `注意`：局部作用域，只有函数，不支持块范围（通过一组大括号{...}定义的新范围，例如if...else...、for、while、switch...case等）。定义在这些块中的局部变量，在整个函数中都声明有效，不受块范围限制。



## 数据类型

- 原始类型
    - undefined
    - null
    - boolean
    - number
    - string
    - symbol
- 引用类型
    - object

### 原始类型

一个原始类型数据，不是对象Object，没有属性方法。大多数情况下，基本类型在编程语言最底层面实现。所有的基本类型值都是不可变的。

在js中存在6中基本数据类型：string、number、boolean、null、undefined、symbol(es6)

### 引用类型

object

### 原始类型包装对象

除了`null`和`undefined`，其它所有的原始类型值存在一个包装对象
- `String`函数包装string：new String('')
- `Number`函数包装number：new Number(1)
- `Boolean`函数包装boolean：new Boolean(true)
- `Symbol`函数包装symbol：Object(Symbol())，显然Symbol原始值的包装对象不能通过new方式创建

这些包装对象的`valueOf()`方法返回原始值。

```javascript
typeof new String('') // object，包装对象
typeof String('') // string，原始值

typeof new Number(1) // object，包装对象
typeof Number(1) // number，原始值

typeof new Boolean(true) // object，包装对象
typeof Boolean(true) // boolean，原始值

typeof Symbol() // symbol，原始值
```

### 原始值与包装对象的转换

上述我们讲到原始类型值是不可变的，也不是对象故无法调用方法。但是从JS语法上可以对原始值调用方法，例如

```javascript
let str = 'abc' // 原始值
let num = 1; // 原始值
let sym = Symbol(); // 原始值

// 可以直接调用方法
str.toString()
num.toString()
sym.toString()
```

这是为什么？ 原因是，当对原始值以对象的形式调用属性或方法时(xx.attr，xx.method())，JS会将这个原始值包装成对象，然后继承该构造函数的原型对象，一旦调用属性或方法结束，这个新创建的包装对象就会销毁，这个过程是JS引擎背后完成的。

> - == 视原始值和其包装对象是相等的，=== 视为不等  
> - typeof 可以区分出基本类型和引用类型



## 变量

ECMAScript的变量是松散类型的，即可以用来保存任何类型的数据。定义变量可以使用var操作符，es6后又补充了let、const等操作符。

### var

var可以说是一个非常赖皮的定义变量的操作符，主要是对它的限制太宽松了。

### let、const