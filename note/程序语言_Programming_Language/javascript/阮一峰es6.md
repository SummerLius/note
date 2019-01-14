<!-- TOC -->

- [阮一峰es6简单笔记记录](#阮一峰es6简单笔记记录)
    - [变量的结构赋值](#变量的结构赋值)
    - [字符串的扩展](#字符串的扩展)
    - [正则的扩展](#正则的扩展)
    - [数值的扩展](#数值的扩展)
    - [函数的扩展](#函数的扩展)
    - [数组的扩展](#数组的扩展)
    - [对象的扩展](#对象的扩展)
    - [Iterator 和 for...of 循环](#iterator-和-forof-循环)
    - [Class的基本用法](#class的基本用法)
    - [Class的继承](#class的继承)
    - [参考](#参考)

<!-- /TOC -->


# 阮一峰es6简单笔记记录

## 变量的结构赋值

ES6 允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，这被称为 **解构（Destructuring）**

1. 数组的解构赋值
2. 对象的解构赋值
3. 字符串的解构赋值
4. 数值和布尔值的解构赋值
5. 函数参数的解构赋值
6. 圆括号问题
7. 用途

## 字符串的扩展

## 正则的扩展

## 数值的扩展

## 函数的扩展

1. 函数参数的默认值
2. rest参数
3. 严格模式
4. name属性
5. 箭头函数
6. 双冒号运算符
7. 尾调用优化
8. 函数参数的尾逗号

## 数组的扩展

1. 扩展运算符
2. Array.from()
3. Array.of()
4. 数组实例的 copyWithin()
5. 数组实例的 find() 和 findIndex()
6. 数组实例的 fill()
7. 数组实例的 entries()，keys() 和 values()
8. 数组实例的 includes()
9. 数组的空位

## 对象的扩展

## Iterator 和 for...of 循环

1. Iterator（遍历器）的概念
2. 默认 Iterator 接口
3. 调用 Iterator 接口的场合
4. 字符串的 Iterator 接口
5. Iterator 接口与 Generator 函数
6. 遍历器对象的 return()，throw()
7. for...of 循环

## Class的基本用法

1. 简介
    - **类的由来**
        - es5中，构造函数这么写：
            ```js
            function Point(x, y) {
              this.x = x;
              this.y = y;
            }
            
            Point.prototype.toString = function () {
              return '(' + this.x + ', ' + this.y + ')';
            };
            
            var p = new Point(1, 2);
            ```
        - es6中，构造函数可以这么写，写在类`class`中
            ```js
            /**
             * 1. 这里代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，
             *    而this关键字则代表示例对象，也就是说，es5的构造函数Point，对应es6的Point类
             *    的构造方法；
             * 2. Point类除了构造方法，还定义了一个toString方法。注意，定义 “类” 方法的时候，
             *    前面不需要加上 function 这个关键字，直接把函数定义放进去就可以了。另外，方法
             *    之间不需要逗号分隔，加了会报错；
             */
            class Point {
                constructor(x, y) {
                    this.x = x;;
                    this.y = y;
                }

                toString() {
                    return `(${this.x}, ${this.y})`
                }
            }
            ```
        - es6，提供了更接近传统语言的写法（C++，java），引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类；
        - 基本上，es6的class可以看作是一个语法糖，它的绝大部分功能，es5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已；
        - es6 的类，完全可以看作 es5 构造函数的另一种写法
            - Class 类的数据类型就是函数，类本身就指向构造函数
            - 使用的时候，也是直接对类使用 new 命令，跟构造函数的用法完全一致
                ```js
                class Point {
                }
                
                typeof Point // "function"
                Point === Point.prototype.constructor // true

                var p = new Point();
                ```
        - 构造函数的 prototype 属性，在es6的“类”上面继续存在，事实上，类的所有方法都定义在类prototype属性上面
            ```js
            class Point {
              constructor() {
                // ...
              }
            
              toString() {
                // ...
              }
            
              toValue() {
                // ...
              }
            }
            
            // 等同于
            
            Point.prototype = {
              constructor() {},
              toString() {},
              toValue() {},
            };
            ```
        - es6，类的内部所有定义的方法，都是不可枚举的，而es5的写法是可以枚举的
            ```js
            /**
             * ES6 写法，不可枚举
             */
            class Point {
              constructor(x, y) {
                // ...
              }
            
              toString() {
                // ...
              }
            }
            
            Object.keys(Point.prototype)
            // []
            Object.getOwnPropertyNames(Point.prototype)
            // ["constructor","toString"]

            /**
             * ES5 写法，可以枚举
             */
             var Point = function (x, y) {
              // ...
            };
            
            Point.prototype.toString = function() {
              // ...
            };
            
            Object.keys(Point.prototype)
            // ["toString"]
            Object.getOwnPropertyNames(Point.prototype)
            // ["constructor","toString"]
            ```
    - **constructor方法**
        - constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法；
        - 一个类必须有constructor方法；
        - 如果没有显示定义，一个空的consturctor方法会被默认添加；
        - 类必须使用new调用，否则报错，这是它与普通构造函数的一个主要区别；
        - constructor方法默认返回实例对象，即this，同时也可以指定返回另外一个对象；
            ```js
            class Point {
            }
            
            // 等同于
            class Point {
              constructor() {}
            }
            ```
            ```js
            class Foo {
              constructor() {
                return Object.create(null);
              }
            }
            
            new Foo() instanceof Foo
            // false，constructor返回自定义对象，则导致该实例对象不是Foo类的实例
            ```
    - **类的示例**
        - 使用new关键字生成示例；
        - 实例的属性除非显式定义其本身，即定义在this对象上，否则都是定义在原型上；
        - 与es5一样，类的所有实例共享一个原型对象，所以改动原型对象需要谨慎，会影响所有实例；
            ```js
            //定义类
            class Point {
            
              constructor(x, y) {
                this.x = x;
                this.y = y;
              }
            
              toString() {
                return '(' + this.x + ', ' + this.y + ')';
              }
            
            }
            
            var point = new Point(2, 3);
            
            point.toString() // (2, 3)
            
            point.hasOwnProperty('x') // true
            point.hasOwnProperty('y') // true
            point.hasOwnProperty('toString') // false
            point.__proto__.hasOwnProperty('toString') // true
            ```
            ```js
            var p1 = new Point(2,3);
            var p2 = new Point(3,2);
            
            p1.__proto__ === p2.__proto__
            //true
            ```
    - **取值函数（getter）和存值函数（setter）**
        - 与es5一样，在“类”的内部可以使用 `get` 和 `set` 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为；
        - 该属性不是设置到实例对象this上，而是被设置到prototype对象上面；
            ```js
            class MyClass {
              constructor() {
                // ...
              }
              get prop() {
                return 'getter';
              }
              set prop(value) {
                console.log('setter: '+value);
              }
            }
            
            let inst = new MyClass();
            
            inst.prop = 123;
            // setter: 123
            
            inst.prop
            // 'getter'
            ```
            ```js
            class CustomHTMLElement {
              constructor(element) {
                this.element = element;
              }
            
              get html() {
                return this.element.innerHTML;
              }
            
              set html(value) {
                this.element.innerHTML = value;
              }
            }
            
            var descriptor = Object.getOwnPropertyDescriptor(
              CustomHTMLElement.prototype, "html"
            );
            
            "get" in descriptor  // true
            "set" in descriptor  // true
            ```
    - **属性表达式**
        - 类的属性名，可以采用表达式；
            ```js
            let methodName = 'getArea';

            class Square {
              constructor(length) {
                // ...
              }
            
              [methodName]() {
                // ...
              }
            }
            ```
    - **Class 表达式**
        - 与函数一样，类也可以使用表达式的形式定义；
            ```js
            const MyClass = class Me {
              getClassName() {
                return Me.name;
              }
            };
            ```
        - 上面代码使用表达式定义了一个类，需要注意，该类的名字是 MyClass 而不是 Me，Me只在类的内部代码可用，指代当前类；
            ```js
            let inst = new MyClass();
            inst.getClassName() // Me
            Me.name // ReferenceError: Me is not defined
            ```
        - 上面代码表示，Me 只在 Class 内部有定义；如果类的内部没有用到的话，可以省略 Me，也就是可以写成下面的形式；
            ```js
            const MyClass = class { /* ... */ };
            ```
        - 采用class表达式，可以写出立即执行的class；
            ```js
            let person = new class {
              constructor(name) {
                this.name = name;
              }
            
              sayName() {
                console.log(this.name);
              }
            }('张三');
            
            person.sayName(); // "张三"
            ```
    - **注意点**
        1. 严格模式
            - 类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式；
            - 只要你的代码写在类或模块之中，就只有严格模式可用；
        2. 不存在提升
            - 类不存在变量提升，这一点与es5完全不同；
                ```js
                new Foo(); // ReferenceError
                class Foo {}
                ```
            - 上面代码，会报错，因为es6不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义；
                ```js
                {
                  let Foo = class {};
                  class Bar extends Foo {
                  }
                }
                ```
            - 上面的代码不会报错，因为Bar继承Foo的时候，Foo已经定义了。但是如果存在class的提升，上面的代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义；
        3. name属性
            - 由于本质上，es6的类只是es5构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性；
            - name属性总是返回紧跟在class关键字后面的类名；
                ```js
                class Point {}
                Point.name // "Point"
                ```
        4. Generator方法
            - todo
        5. this的指向
            - 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
                ```js
                class Logger {
                  printName(name = 'there') {
                    this.print(`Hello ${name}`);
                  }
                
                  print(text) {
                    console.log(text);
                  }
                }
                
                const logger = new Logger();
                const { printName } = logger;
                printName(); // TypeError: Cannot read property 'print' of undefined
                ```
            - 上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。
            - 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
                ```js
                class Logger {
                  constructor() {
                    this.printName = this.printName.bind(this);
                  }
                
                  // ...
                }
                ```
            - 另一种解决方法是使用箭头函数。
                ```js
                class Logger {
                  constructor() {
                    this.printName = (name = 'there') => {
                      this.print(`Hello ${name}`);
                    };
                  }
                
                  // ...
                }
                ```
            - 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
                ```js
                function selfish (target) {
                  const cache = new WeakMap();
                  const handler = {
                    get (target, key) {
                      const value = Reflect.get(target, key);
                      if (typeof value !== 'function') {
                        return value;
                      }
                      if (!cache.has(value)) {
                        cache.set(value, value.bind(target));
                      }
                      return cache.get(value);
                    }
                  };
                  const proxy = new Proxy(target, handler);
                  return proxy;
                }
                
                const logger = selfish(new Logger());
                ```
2. 静态方法
3. 实例属性的新写法
4. 静态属性
5. 私有方法和私有属性
6. new.target属性

## Class的继承

1. 简介
2. Object.getPrototypeOf()
3. super关键字
4. 类 prototype 属性和`__proto__`属性
5. 原生构造函数的继承
6. Mixin模式的实现


## 参考

- http://es6.ruanyifeng.com/