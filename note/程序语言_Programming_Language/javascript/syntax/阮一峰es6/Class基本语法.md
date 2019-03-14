<!-- TOC -->

- [Class 基本语法](#class-基本语法)
    - [简介](#简介)
        - [类的由来](#类的由来)
        - [constructor 方法](#constructor-方法)
        - [类的实例](#类的实例)
        - [取值函数（getter）和存值函数（setter）](#取值函数getter和存值函数setter)
        - [属性表达式/计算属性](#属性表达式计算属性)
        - [Class 表达式](#class-表达式)
        - [注意](#注意)
    - [静态方法](#静态方法)
    - [实例属性的新写法](#实例属性的新写法)
    - [静态属性](#静态属性)
    - [私有方法和私有属性](#私有方法和私有属性)
        - [现有解决方案](#现有解决方案)
        - [私有属性提案](#私有属性提案)
    - [new.target 属性](#newtarget-属性)

<!-- /TOC -->

# Class 基本语法

## 简介

### 类的由来

```js
class Base {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    toString () {
        return `( ${this.x}, ${this.y} )`;
    }
}
```
- 概要
    - 基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已；
- 相关限定
    - Class 内定义方法，方法名前面不需要加上 `function` 关键字；
    - 方法之间不需要逗号分隔，加了会抛错；
    - 类的所有方法都定义在类的 `prototype` 上面；

### constructor 方法

- constructor 方法是类的默认构造方法，通过 new 命令生成对象实例时，自动调用该方法；
- 类必须具有该方法，没有显式定义，则会自动被添加一个空的方法；
- 类必须使用 new 调用，否则报错；

### 类的实例

### 取值函数（getter）和存值函数（setter）

- 在类的内部，可以使用 `get` 和 `set` 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为；
- 同样，其也是定义在类原型对象上面；

### 属性表达式/计算属性

- 类的属性名，可以采用表达式;
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

### Class 表达式

- 与函数一样，类也可以使用表达式子形式;
    - 在下面例子中，这个类的名字为 Me，但这个名字只能在类内部使用，指当前类；在类外部，这个类只能用 MyClass 引用；
    - 如果内部没用到类名，则可以省略 Me；
        ```js
        const myClass = class Me {
            getClassName() {
                return Me.name;
            }
        }
        ```
- 立即执行的类
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

### 注意

1. 严格模式
    - 类和模块的内部，默认就是严格模式，不需要使用 `use strict` 来指定；
2. 不存在提升
    - 类不存在变量提升;
    - 即类在使用前，必须声明；
3. name属性
    - 本质上，类只是构造函数的一层包装，函数许多特性都被类继承，包括 name 属性；
        ```js
        class Base {}
        Base.name // Base

        let Second = class {}
        Second.name // Second
        ```
4. Generator 方法
    - 如果某个方法之前加上星号，就表示该方法是一个 Generator 函数；
    - 除了构造方法 `constructor`，该方法加星号，会抛错；
    - 示例
        ```js
        class Foo {
            constructor(...args) {
                this.args = args;
            }

            *[Symbol.iterator]() {
                for (let arg of this.args) {
                yield arg;
                }
            }
        }

        for (let x of new Foo('hello', 'world')) {
          console.log(x);
        }
        // hello
        // world
        ```
5. async 方法
    - 如果某个方法之前加上 async，就表示该方法是一个异步函数；
    - 除了构造方法 `constructor`，该方法加 async，会抛错；
6. this 的指向
    - 类的方法内部如果含有 this，它默认指向类的实例；
    - 一旦单独使用该方法，很可能会报错；
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
    - 一个简单的解决方法是，在构造方法中绑定this；
        ```js
        class Logger {
          constructor() {
            this.printName = this.printName.bind(this);
          }
        
          // ...
        }
        ```
    - 或者使用箭头函数
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
    - 还有一种解决方法是使用 Proxy，获取方法的时候，自动绑定 this;

## 静态方法

- 类相当于实例的原型，在类中定义的所有方法，都会被实例继承；
- 但是，如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为 “静态方法”；
- 静态方法中的 this 关键字，指向的是类，而不是实例；
- 父类的静态方法，可以被子类继承；
- 静态方法，也可以从 `super` 对象上调用；

## 实例属性的新写法

- 实例属性定义方式：
    - 在 constructor() 方法里面的 this 上面赋值；
    - 直接以赋值方式；（该方式在浏览器测试可以，在nodejs@v8.9版本不行）
        ```js
        Class A {
            prop = 1;
        }
        ```
- 两种方式效果一致；

## 静态属性

- 静态属性指 Class 本身的属性，而不是定义在实例对象（this）上的属性；
    ```js
    class A {
        static prop = 1;
    }
    ```
- （该方式在浏览器测试可以，在nodejs@v8.9版本不行）

## 私有方法和私有属性

### 现有解决方案
### 私有属性提案

## new.target 属性

- es6为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数中，返回 new 命令作用于的那个构造函数；
- 如果构造函数不是通过 new 命令或者 Relect.construct() 调用，new.target 会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的；
- Class 内部调用 new.target，会返回当前 Class；
- 子类继承父类时，new.target 会返回子类；
    - 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类；
- 示例
    ```js
    class Shape {
      constructor() {
        if (new.target === Shape) {
          throw new Error('本类不能实例化');
        }
      }
    }
    
    class Rectangle extends Shape {
      constructor(length, width) {
        super();
        // ...
      }
    }
    
    var x = new Shape();  // 报错
    var y = new Rectangle(3, 4);  // 正确
    ```
