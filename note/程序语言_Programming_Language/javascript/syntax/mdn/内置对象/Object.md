<!-- TOC -->

- [Object构造函数](#object构造函数)
    - [Properties](#properties)
    - [Static Methods](#static-methods)
        - [Object.assign()](#objectassign)
        - [Object.create()](#objectcreate)
        - [Object.is()](#objectis)
        - [Object.keys()](#objectkeys)
        - [Object.entries()](#objectentries)
        - [Object.values()](#objectvalues)
        - [Object.defineProperty()](#objectdefineproperty)
        - [Object.defineProperties()](#objectdefineproperties)
        - [Object.getOwnPropertyDescriptor()](#objectgetownpropertydescriptor)
        - [Object.getOwnPropertyDescriptors()](#objectgetownpropertydescriptors)
        - [Object.getOwnPropertyNames()](#objectgetownpropertynames)
        - [Object.getOwnPropertySymbols()](#objectgetownpropertysymbols)
        - [Object.getPrototypeOf()](#objectgetprototypeof)
        - [Object.setPrototypeOf()](#objectsetprototypeof)
        - [Object.preventExtensions()](#objectpreventextensions)
        - [Object.freeze()](#objectfreeze)
        - [Object.seal()](#objectseal)
        - [Object.isExtensible()](#objectisextensible)
        - [Object.isFrozen()](#objectisfrozen)
        - [Object.isSealed()](#objectissealed)
    - [Prototype Methods](#prototype-methods)
        - [Object.prototype.hasOwnProperty()](#objectprototypehasownproperty)
        - [Object.prototype.isPrototypeOf()](#objectprototypeisprototypeof)
        - [Object.prototype.propertyIsEnumerable()](#objectprototypepropertyisenumerable)
        - [Object.prototype.toString()](#objectprototypetostring)
        - [Object.prototype.toLocaleString()](#objectprototypetolocalestring)
        - [Object.prototype.valueOf()](#objectprototypevalueof)
        - [Object.prototype.toSource()-✖](#objectprototypetosource-✖)
- [详细](#详细)
    - [创建对象](#创建对象)
        - [对象直接量](#对象直接量)
        - [通过new创建对象](#通过new创建对象)
        - [Object.create()](#objectcreate-1)
    - [对象属性描述符](#对象属性描述符)
        - [configurable](#configurable)
    - [属性查询和设置](#属性查询和设置)
    - [删除属性](#删除属性)
    - [检测属性](#检测属性)
    - [枚举属性](#枚举属性)
    - [属性getter和setter](#属性getter和setter)
    - [属性的特性](#属性的特性)
    - [对象内置的三个属性](#对象内置的三个属性)
- [参考](#参考)

<!-- /TOC -->

## Object构造函数

### Properties
```javascript
Object.length
Object.prototype
```

### Static Methods

```javascript
Object.assign()
Object.create()
Object.is()
Object.keys()
Object.entries()
Object.values()


Object.defineProperty()
Object.defineProperties()
Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptors()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.getPrototypeOf()
Object.setPrototypeOf()

Object.preventExtensions()
Object.freeze()
Object.seal()
Object.isExtensible()
Object.isFrozen()
Object.isSealed()
```
---
#### Object.assign()

将一个或多个源对象可枚举的属性（不包括继承），复制到目标对象。它将返回目标对象。

`Object.assign(target, ...sources)`  

- @return：返回目标对象target

如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似的覆盖早先的属性。

注意：
- Object.assign方法只会拷贝源对象**自身**并且**可枚举**的属性到目标对象上，不包括继承的属性
- Object.assign，会跳过值为null或undefined的源对象
- Object.assign 为浅拷贝

---
#### Object.create()

使用指定的原型对象及属性去创建一个新对象。

`Object.create(proto[, propertiesObject])`  

- @proto：一个对象，新创建的对象的原型
- @propertiesObject：可选，给新创建的对象定义一些属性，该参数与Object.defineProperties()的第二个参数一样
- @return：返回新对象

```javascript
var obj = Ojbect.create({a: 'protoValue'}, {
        a: {
            value: 'selfValue',
            enumerable: true,
            writable: true
        }
    }
    );

obj.__proto__a;// 'protoValue'
obj.a;// 'selfValue'
```

---
#### Object.is()

比较两个值是否相等

`Object.is(value1, value2)`  

该方法和`===`差不多，两者区别点为：
- `===`认为　+0 和　-0 两者相同，而Object.is认为不等
- `===`认为 NaN 和 NaN 不等，而Object.is认为相等

---
#### Object.keys()

返回一个由指定对象**自身可枚举**属性组成的数组，数组中属性名的排列顺序和使用`for...in`循环遍历该对象时返回的顺序一致。

---
#### Object.entries()

返回一个指定对象**自身可枚举**属性[key, value]对的数组，排列顺序和`for...in`一致

```javascript
var obj = {a: 1, c: {}, d: function(){}};
var arr = Object.entries(obj);

console.log(arr);// [['a', 1], ['c', {}], ['d', function(){}]]
console.log(a.c === arr[1][1]); // true，引用值
```

---
#### Object.values()

返回一个指定对象**自身可枚举**属性值的数组，顺序和`for...in`一致

```javascript
var obj = var obj = {a: 1, c: {}, d: function(){}};
var arr = Object.values(obj);

console.log(arr);// [1, {}, function(){}]
obj.a === arr[0];// true
obj.c === arr[1];// true
obj.d === arr[2];// true
```
---
#### Object.defineProperty()

#### Object.defineProperties()

#### Object.getOwnPropertyDescriptor()

#### Object.getOwnPropertyDescriptors()

#### Object.getOwnPropertyNames()

- 该方法返回一个由指定对象的所有自身属性的属性名组成的数组
- 包括枚举和不可枚举属性，但不包括Symbol值作为名称的属性
- 数组中枚举属性的顺序与通过 for...in 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

#### Object.getOwnPropertySymbols()

#### Object.getPrototypeOf()

#### Object.setPrototypeOf()

`Object.setPrototypeOf(obj, prototype)`  

如果设置成功，则`obj.__proto__ === prototype`  

#### Object.preventExtensions()

#### Object.freeze()

#### Object.seal()

#### Object.isExtensible()

#### Object.isFrozen()

#### Object.isSealed()


### Prototype Methods

```javascript
Object.prototype.hasOwnProperty()
Object.prototype.isPrototypeOf()
Object.prototype.propertyIsEnumerable()

Object.prototype.toString()
Object.prototype.toLocaleString()
Object.prototype.valueOf()
```

#### Object.prototype.hasOwnProperty()

#### Object.prototype.isPrototypeOf()

#### Object.prototype.propertyIsEnumerable()

---
#### Object.prototype.toString()

返回一个表示该对象的字符串。

`obj.toString()`

每个对象都有一个toString()方法。默认下，toString()方法继承Object.prototype.toString()，该方法返回格式为"[object type]"，其中type为对象类型。

不过很多对象都会自定义toString()方法，覆盖Object原型方法，例如Boolean、String、Function...等都会自定义该方法。

---
#### Object.prototype.toLocaleString()

该方法也返回一个该对象的字符串表示。该方法主要用于本地化相关对象覆盖。

`obj.toLocaleString()`  

Object.toLocaleString()，默认返回调用toString()方法的结果。

也有一些对象覆盖了该原始方法，例如Array、Number、Date

---
#### Object.prototype.valueOf()

该方法返回指定对象的原始值。

`obj.valueOf()`  

js调用valueOf()方法来把对象转换成原始类型值（数值、字符串、布尔值）。我们一般不会自己手动调用该方法，而是当代码遇到一种需要转换成一个原始值情况的时候，js会自动调用此函数。

默认下，对象会继承Object.prototype.valueOf()。每个内置对象都会覆盖该方法为了返回一个合理的值，**如果对象没有原始值，valueOf()会返回对象自身**。

```javascript
var num  = new Number(123);
var bool = new Boolean(true);
var str  = new String('abc');
var obj  = {a: 1};
var arr  = [1, 2, 3];
var func = function() {}

num.valueOf();    // 123
bool.valueOF();   // true
str.valueOF();    // 'abc'
obj.valueOF();    // 无原始值，返回引用，即obj.valueOf() === obj
arr.valueOF();    // 无原始值，返回引用，即arr.valueOf() === arr
func.valueOF();   // 无原始值，返回引用，即func.valueOf() === func
```

---
#### Object.prototype.toSource()-✖

浏览器和nodejs都没有提供该方法

## 详细

### 创建对象

#### 对象直接量

对象直接量是一个**表达式**，这个表达式每次运算都会创建并初始化一个新的对象。每次计算对象直接量的时候，也都会计算它的每个属性的值。也就是说，如果在一个重复调用的函数中的循环体内使用了对象直接量，它将会创建很多新对象，并且每次创建的对象的属性值也有可能不同。

#### 通过new创建对象

new运算符创建并初始化一个新对象。关键字new后跟随一个函数调用，称为构造函数（constructor），构造函数用以初始化一个新创建的对象。

JavaScript语言核心中的原始类型都包含内置构造函数。例如：
```javascript
var o = new Object();     // 创建空对象，和{}一样
var a = new Array();      // 创建空数组，和[]一样
var d = new Date();
var r = new RegExp("js");

function My(){}
var m = new My();
```

#### Object.create()

Object.create()，利用第一个参数作为原型对象来创建对象

```javascript
/**
 * 创建指定原型的新对象
 */
var a = {b: {c: 1}};
var obj = Object.create(a.b);
obj.__proto__ === a.b; // true



/**
 * 创建空对象，继承原始原型
 *
 *      empty1,empty2,empty3
 *      三者效果其实一致
 */
var empty1 = Object.create(Object.prototype);
var empty2 = {};
var empty3 = new Object();


/**
 * 创建空对象，没有继承
 * 
 *      没有继承Object.prototype, 说明
 *      也没有继承任何方法、属性，例如,
 *      toString()等方法都没有，这是纯净
 *      的对象
 */
var realEmpty = Object.create(null);

```

### 对象属性描述符

对象的属性存在的控制特性：
- configurable：该值为true时，才有权限更改该属性描述符或使用delete删除该属性。
- enumerable：该值为true时，此属性才能出现在对象的枚举属性中。
- value：该属性对应的值，可以是任何有效的js值，数值、对象、函数等。
- writable：该值为true时，此属性才能够被**赋值运算符**改变。
- get：给属性提供getter方法。该方法返回值被用作属性的值。
- set：给属性提供setter方法。该方法接受唯一参数，并将参数分配给该属性。

```javascript
// 属性默认值查看

// 设置3个属性：attr1 attr2 attr3
let obj = {attr1: 1};
Object.defineProperty(obj, 'attr2', {});
Object.defineProperty(obj, 'attr3', { get(){return 1;} });

// 查看属性描述符
Object.getOwnPropertyDescriptors(obj);

// 结果
{ attr1:
   { value: 1,
     writable: true,
     enumerable: true,
     configurable: true },
  attr2:
   { value: undefined,
     writable: false,
     enumerable: false,
     configurable: false },
  attr3:
   { get: [Function: get],
     set: undefined,
     enumerable: false,
     configurable: false } }

```

#### configurable

```javascript
/**
 * Configurable - 数据属性
 *
 *      true：没有限制
 *      false：有限制
 *          1. 该属性不能使用delete
 *          2. 该属性不能更改enumerable，不论是true->false，还是false->true
 *          3. 对于writable的更改，true->false可以，false->true不可以
 *          4. 对于value的更改，若当前writable为true时可以，否者不可以
 *
 *
 */

var obj = {};

// 首次定义属性 "attr"
Object.defineProperty(a, 'attr', {
  configurable: false,
  enumerable: true,
  writable: false,
  value: 1
});
 
 // 以下操作均会抛错
 delete obj.attr

 Object.defineProperty(a, 'attr', {configurable: true});

 Object.defineProperty(a, 'attr', {enumerable: false});

 Object.defineProperty(a, 'attr', {writable: true});

 Object.defineProperty(a, 'attr', {value: 2});
```
```javascript
/**
 * Configurable - 访问器属性
 *
 *      true：没有限制
 *      false：有限制
 *          1. 该属性不能使用delete
 *          2. 该属性不能更改enumerable，不论是true->false，还是false->true
 *          3. 不能更改get，即使没定义
 *          4. 不能更改set，即使没定义
 *
 *
 */

var obj = {};

// 首次定义属性 "attr"
Object.defineProperty(a, 'attr', {
  configurable: false,
  enumerable: true,
  get(){return 1;}
});
 
 // 以下操作均会抛错
 delete obj.attr

 Object.defineProperty(a, 'attr', {configurable: true});

 Object.defineProperty(a, 'attr', {enumerable: false});

 Object.defineProperty(a, 'attr', {get(){return 1;}});

 Object.defineProperty(a, 'attr', {set(){}});
```

> 欲想使对象某个属性为const，不可修改，可见至少将configurable和writable都设置为false。

### 属性查询和设置

### 删除属性

使用delete运算符，只会断开属性和宿主的联系，不会摧毁属性引用对象

delete a.b

### 检测属性

- in运算符：判断对象中是否存在属性，包括继承，不论属性是否可枚举
- Object.prototype.hasOwnProperty()：判断对象是否存在属性，不包括继承，不论属性是否可枚举
- Object.prototype.propertyIsEnumerable()：判断对象是否存在属性，不包括继承，要求可枚举属性
- obj.attr !== undefined：直接通过操作符判断，这种只能判断属性值是否为undefined，不能判断属性是否存在

属性是否存在和属性的值为undefined，还是有区别的，

```javascript
var obj = {};

'attr' in obj;                    // false
obj.hasOwnProperty('attr');       // false
obj.propertyIsEnumerable('attr'); // false
obj.attr === undefined;           // true

obj.attr = undefined;
'attr' in obj;                    // true
obj.hasOwnProperty('attr');       // true
obj.propertyIsEnumerable('attr'); // true
obj.attr === undefined;           // true
```

### 枚举属性

- for/in：遍历对象所有可枚举属性，包括自身和继承的。
- Object.keys()：返回对象中可枚举的自身属性名称的数组，不含继承。
- Object.getOwnPropertyNames()：返回对象自身所有属性名称，枚举和不可枚举的，不含继承

### 属性getter和setter

对象属性有两种类别，分别对应着两套属性描述符：
- 数据属性
    - configurable
    - enumerable
    - writable
    - value
- 访问器属性
    - configurable
    - enumerable
    - get
    - set

> **NOTE：writable、value和get、set不能并存，这是两套，不能交叉，但是可以使用Object.defineProperty使属性从两种类别间转换，只要configurable为true** 


**访问器属性的值get/set，不能借助自身属性，只能借助常量或此对象其它属性**
```javascript
/**
 * 一个错误示例
 *
 *      定义了一个属性名称为"attr"的访问器属性，
 *      然后，get/set函数操作的是this.attr属性，
 *      及本身，然而"this.attr"这种访问形式又会
 *      触发"attr"属性的get/set函数，最后形成
 *      无限递归，直至抛出错误：
 *
 *      RangeError: Maximum call stack size exceeded
 *
 */
var obj = {};
Object.defineProperty(obj, 'attr', {
    configurable: true,
    enumerable: true,
    get() {return this.attr},
    set(value) {this.attr = value;}
});
console.log()
```
```javascript
/**
 * 正确实例
 *
 */
var obj = {
    _value_: 0
};

// 借助obj._value_属性
Object.defineProperty(obj, 'attr', {
    configurable: true,
    enumerable: true,
    get() {return this._value_},
    set(value) {this._value_ = value;}
});

// 借助与此对象无关的量
Object.defineProperty(obj, 'random', {
    configurable: true,
    enumerable: true,
    get() {return Math.random();}
});

// 字面量创建形式
var obj2 = {
    _value_: 0,
    get value() {
        return this._value_;
    },
    set value(newValue) {
        this._value_ = newValue;
    }
};
```



### 属性的特性

### 对象内置的三个属性

- 原型属性
    - __proto__, a.isPropertyOf(b)，a是否是b的原型
    - 原型属性在实例对象创建之初就设置好的
- 类属性
    - 对象的类属性是一个字符串，用以表示对象类型信息
    - 这个后续理解
- 可扩展性
    - 对象的可扩展性表示是否可以给对象添加新属性。所有内置对象和自定义对象都是显示可扩展的
    - Object.preventExtensions(obj)：禁止对象扩展性，不能添加新属性了。注意这种限制只是对象本身，并没有限制到对象的原型上，原型对象还是可以添加新属性的
    - Object.seal(obj)：除了禁止扩展性外，还将所有自身属性设置为不可配置，即configurable设置为false
    - Object.freeeze(obj)：除了禁止扩展性外，将自身所有属性configurable和writable设置为false



## 参考

- JS权威指南
- JS高级程序设计
- MDN web docs



