## 运算符

### typeof

返回一个字符串，表示操作对象的类型

`typeof operand`

|类型|返回值|
|:-:|:-:|
|Undefined|"undefined"|
|Null|"object"|
|Boolean|"boolean"|
|Number|"number"|
|String|"string"|
|Symbol|"symbol"|
|Function object|"function"|
|Any other object|"object"|

### instanceof

用来测试一个对象在其原型链中是否存在一个构造函数的prototype属性

`object instanceof constructor`

很显然，也可以使用Object.prototype.isPrototypeOf()方法：

`constructor.prototype.isPrototypeOf(object)`    