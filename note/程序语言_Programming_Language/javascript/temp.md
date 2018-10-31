## 常见操作符

### `==` `!=`
在比较均会先**转换操作数**(强制转换)

转换规则如下：
- 如果有一个为boolean值,先转换为数值false->0,true->1
- 如果一个string一个number, 先把string转换为number在比较
- 如果一个Object另一个不是,调用Object的valueOf()得到基本类型再比较
    - 比较规则如下：
    - null与undefined相等
    - 比较之前,不能将null undefined转换成其它值(即undefined ==0为false,null == 0为false)
    - 只要存在NaN, ==比较为false, !=比较为true
    - 如果都是Object,比较是否指向同一个对象

### `===` `!==`

除了在比较之前**不转换操作数**,其他和相等操作一样(即若类型不同直接为false,undefined 与 null 不全等,类型不同)

undefined == null        //true  
undefined === null       //false  
undefined == 0           //false  
null      == 0           //false  
undefined === undefined  //true  
null === null            //true  


### `&&` `||` `!`

 基本的逻辑和其它语言一样,不同的是 "返回值",不一定返回boolean值

`!`：可应用于EcmaScript任何值,会将操作数先转换为一个boolean值,再求反  
- 规则如下：
- 调用Boolean()转换函数再求反
- 返回值为Boolean类型

`&&`：可应用任何类型,操作数不为boolean类型,返回值也不一定为boolean类型
- 规则如下：
- 内部比较的时候,是Boolean()转换后判断
- undefined/null/0/NaN/''，这5种情况都为false, 同时都会造成"断路",谁在前面就会返回谁,即使后有语法错误都不检测了
- 在整体结果为true的情况下,返回"最后一个操作数"
- undefined && null && 0 && NaN && '' //返回第一个 undefined
- {P: 1} && {p: 2} && {p: 3} //返回最后一个{p: 3}

`||`：任何类型,返回不一定为boolean类型
- 同样内部比较的时候转换为 Boolean()之后
- 返回true值得第一个操作数, 同时造成后面"短路"
- 全是false值, 返回最后一个操作数
- 0 || '' || undefined || null|| NaN // 返回 NaN


## 位操作符“&”“|”“~”和正码、反码、补码

+ 正码、反码、补码
+ 位操作符：全部都是直接对存储的“补码”进行操作，位操作符限定为32位，所以会将64位数先转换为32位在操作
    - `&`   ： 与
    - `|`   ： 或
    - `~`   ： 非，包括符号位，全部反转。非操作类似于“负值减一”
    - `^`   ： 异或
    - `>>>` ： 无符号右移
    - `>>`  ： 有符号右移
    - `<<`  ： 有符号左移



 + 一般只对于正数或者无符号数应用（不操作负数）：
    - 判断指定位是否为0或1：只需要与上一个此位为1其它位为0的正数即可。例如判断第五位，operatorNum & 16 === 0
    - 给指定位赋值为0：先非后或再非回来。
    - 给指定位赋值为1：直接或。
    - 指定位赋值目的 ：可以利用一个数字的各个二进制位的状态，来表示一个对象的多个属性的状态，例如“一条动态”的是否删除属性、是否有资格进入热门动态属性...


+ 给指定位赋值重点是采用或运算的原因是，一是意义更加清晰，可以用[000001000]指定位为1，其它位为0的数来或运算
操作数；二是可以不影响其它位，用0去或运算其它位，其它位保持不变；三是指定位赋值0或1，第二个操作数都是一样
的，只是位操作流程不一样。

```javascript
let i = 0;            //这是第一个操作数
let j = 0 | 2^3;      //8为第二个操作符，指定i的第四位为1，[1000]
let k = ~((~j)|2^3);  //将第四位重新置为0，第二个操作数8不变，只需要非和或运算
```


+ 为什么不用1去与运算其它位呢？效果不是一样吗？
No！不完全相同，因为用1去使其它位保持不变的话，我们需要指定一个最大的范围数值[...1110111]，这样含义不清晰，
不如[000100]清晰。

## 数据类型

- 基本类型：Undefined
- 基本类型：Null
- 基本类型：Number
- 基本类型：String
- 引用类型：Object  

### Undefined
- 此类型只有一个值undefined, 即 undefined === undefined //true

### Null
- 此类型只有一个值null, 即 null === null //true
- typeof null // object

### Boolean
- ECMAScript中所有类型的值都有与boolean的true和false等价的值,在需要的地方会自动转换为boolean值,例如 if(xx)、tt ? xx : yy 等里面
- 5大false：空字符串、0/NaN、null、undefined
- 转换规则如下
    - Stirng ： 非空字符串-->true  |  ''-->false
    - Number ： 非0数字值,含Infinity-->true  |  0和NaN-->false
    - Object ： 任何对象-->true  |  null-->false
    - Undefined ：N/A -->true  |  undefined-->false

## 函数

### 函数与原型

函数：
- 当创建一个函数时，js会根据特定的规则为此函数创建一个prototype属性，这个属性是一个指针，指向函数的原型对象。
- 默认情况下，所有原型对象会自动获得一个constructor属性，指向prototype属性所在的函数。例如，Func.prototype.constructor = Func
- 创建了自定义构造函数后，其原型对象默认只会取得constructor属性，其它方法都是从Object继承而来。也就是说，默认的原型对象的原型是Object.prototype，而Object.prototype.__proto__===null
- 当使用构造函数创建一个实例后，改实例内部会包含一个指针（内部属性），指向构造函数的原型对象，但是目前可以通过obj.__proto__来访问原型对象
- Obj.__proto__和func.prototype都指向同一个原型对象
	var Obj = function(){}
	var obj = new Obj();
	summer.log()( obj.__proto__ === Obj.prototype); // --> true
- 所有构造器/函数的__proto__都指向Function.prototype，这是一个空函数。这意味着所有的构造器都来自于Function.prototype，继承了它的属性和方法，如length，call，apply，bind
	
对象：
- javascript中没有类（es6中新引进的）概念，所有的对象都是使用 new + 构造函数 来创建的
因为所有实例/对象都是构造函数构造出来的，所以所有实例都有属性__proto__指向构造函数的原型对象

### 普通函数和构造函数的区别？

一个函数Func既可以作为普通函数调用也可以作为构造函数调用，在于调用的方式。

如果使用`new`关键词调用函数`new Func()`，那么函数作为构造函数调用

执行区别：
- 普通函数：执行没有什么特点，顺序执行而已，函数内this默认为调用者，也可以使用call，apply，bind指定调用者
- 构造函数调用时会创建一个新对象，并将构造函数的作用域赋给新对象，即函数内this指向新对象，然后顺序执行函数代码，最后返回新对象，如果函数最后显示return一个对象，则以return内容优先

### 变量和属性的区别是什么？

变量和属性是不同的，术语`变量作用域`也只是针对变量  

属性是属于对象，只能通过对象才能访问，对象可以是一个变量，这个类似于面向对象中的类概念，访问属性不能脱离类和对象。

变量是执行环境中通过`var``let``const`定义的单独的变量，就像函数的大括号内。


### 函数的调用有几种？

- 函数调用

函数不属于谁，定义在执行环境中（全局函数或其他函数执行体内），调用时直接  "函数名+( )"，无论在哪里调用（甚至在一个对象的属性方法内的方法内的...），严格模式下，调用上下文this都是undefined，非严格下为global。  

- 属性方法调用

函数是某个对象的一个属性，obj.f = function(){}，调用的时候obj.f( )，这样方法内调用上下文this为obj。

- 构造函数调用

使用new执行函数都是作为构造函数，构造函数首先会创建一个新的空对象，然后将对象的__proto__指向函数的prototype对象；然后将新对象作为此次函数执行的上下文this，末尾
自动return 新对象。

- apply，call，bind调用

### 函数与对象与原型对象属性之间的访问禁忌？

首先明白一点，访问一个对象的属性，其查找的逻辑是沿着原型链（obj.__proto__）依次寻找，找到第一个即返回（也就是覆盖了后面的同名的）。  

函数没有任何途径访问对象本身属性，只能通过Func.prototype来访问对象原型属性；对象只能通过ptototype.constructor属性来访问函数属性，obj.constructor.xxx。


1. 为什么函数属性，其构造出来的对象不能直接访问？
 
构造流程：创建新一个新的空对象，并将其原型__proto__指向函数prototype属性指向的原型对象。所以很明显，新对象寻找属性路径：this自身 -->函数prototype对象，而函数属性
明显在函数本身上，不再prototype上，所以函数属性有且只有函数名直接才能访问。对象访问的话比较曲折，通过ptototype原型对象中constructor属性访问。


2. 为什么函数不能直接访问其prototype上的属性，不是可以按照原型链自动找到么?

如果有Jail.prototype.cb=1，那么只能通过Jail.prototype.cb访问而不能通过，Jail.cb访问。
原因很简单，因为tm函数Jail的原型对象是__proto__指向的对象，不是prototype的指向，其实任何对象的原型都是__proto__来指定的。prototype只是函数的一个属性，用于构建对象。所以当执行Jail.cb时，引擎自动的找其__proto__对象，但是显然没有。



## 表达式和语句的区别？

```javascript
// 逗号表达式，需要()括起来，返回值为最后一个逗号后的
var result = (1+2, 3+4);
// a=6也是一个特殊的表达式，返回的值就是赋值的值
var b = a = 6;
```

语句是程序执行的基本单位，而表达式是一个语句的主要组成部分；


每个表达式像是个任务，总会返回一个结果，一个值；

分类[权威指南]

- 原始表达式
- 运算符表达式
- 对象和数组初始化表达式：{a: 1}
- 函数定义表达式：var a = function() {}
- 属性访问表达式：obj.attr
- 调用表达式：Math.max(x, y, z)
- 对象创建表达式：new Object()


## js如何区分语句间隔？新一行？冒号？

- 主要还是冒号“；”来区分
- 大括号“｛｝”后也会自动认为是新语句

例如if, for, while等流程控制语句后的大括号，定义function后的大括号等

```javascript
function a() {} var a = 2;
```
上面代码，js解析器当作两个语句来处理

```javascript
function a() {}();
// 等同于
function a() {};();
```
再列一个特例，执行会出错，因为第二个语句是"()"，这不形成一个语句，也不是个表达式，只是一个运算符；

**运算符必须以来操作数才能形成表达式**

  



