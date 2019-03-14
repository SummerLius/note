<!-- TOC -->

- [Class 继承](#class-继承)
    - [简介](#简介)
    - [Object.getPrototypeOf()](#objectgetprototypeof)
    - [super 关键字](#super-关键字)
    - [类的 prototype 属性和 __proto__ 属性](#类的-prototype-属性和-__proto__-属性)
    - [原生构造函数的继承](#原生构造函数的继承)
    - [Mixin 模式的实现](#mixin-模式的实现)

<!-- /TOC -->

# Class 继承

## 简介

- Class 通过 `extends` 关键字实现继承；
    ```js
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return `( ${x}, ${y} )`;
        }
    }

    class ColorPint extends Point() {
        constructor(x, y, color) {
            super(x, y); // 调用父类的 constructor(x, y)
            this.color = color;
        }

        toString() {
            return `${this.color} ${super.toString()}`;
        }
    }
    ```
- 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错；
    - 这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样实例的属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法；
    - 如果不调用 super 方法，子类就得不到 this 对象；
    - super 方法必须在子类 constructor 方法顶层中调用；
- es5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面；
- es6 的继承机制与 es5 完全不同，其实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this；
- 如果子类没有定义 constructor 方法，这个方法会被默认添加；
    ```js
    class ColorPoint extends Point {}

    // 等同于
    class ColorPoint extends Point {
        constructor(...args) {
            super(...args);
        }
    }
    ```
- 父类的静态方法，也会被子类继承

## Object.getPrototypeOf()

- `Object.getPrototypeOf` 方法可以用来从子类上获取父类
    ```js
    Object.getPrototypeOf(ColorPoint) === Point
    // true
    ```

## super 关键字

- super 这个关键字，既可以当做函数使用，也可以当做对象使用，在这两种情况下，它的用法完全不同；
    1. 函数使用
        - 代表父类的构造函数；
        - es6 要求，子类的构造函数必须先执行 super 函数；
        - 示例
            ```js
            class A {}
            
            class B extends A {
              constructor() {
                super();
              }
            }
            ```
        - 虽然，super 表示父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指向子类 B 的实例，因此 super() 在这里相当于 `A.prototype.constructor.call(this)`；
        - 作为函数时，super() 只能用在子类的构造函数中，否则报错；
    2. 对象使用
        - 在普通方法中，指向父类的原型对象；
            - es6规定，在子类方法中通过 super 调用父类方法时，方法内部的 this 指向当前的子类实例；
                - 例如，在子类普通方法内调用 `super.print()`，相当于 `super.print.call(this)`；
            - 由于 this 指向子类实例，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性；
                ```js
                class A {
                  constructor() {
                    this.x = 1;
                  }
                }
                
                class B extends A {
                  constructor() {
                    super();
                    this.x = 2;
                    super.x = 3;
                    console.log(super.x); // undefined
                    console.log(this.x); // 3
                  }
                }
                
                let b = new B();
                ```
        - 在静态方法中，指向父类，而不是父类的原型对象；
            - 在子类的静态方法通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类实例；
            - 注意，使用 super 的时候，必须显式指定是作为函数，还是作为对象使用，否则报错；
                ```js
                class A {}
                
                class B extends A {
                  constructor() {
                    super();
                    console.log(super); // 报错
                  }
                }
                ```
- 最后，由于对象总是继承其它对象的，所以可以在任意一个对象中，使用 super 关键字；
    ```js
    var obj = {
      toString() {
        return "MyObject: " + super.toString();
      }
    };
    
    obj.toString(); // MyObject: [object Object]
    ```

## 类的 prototype 属性和 __proto__ 属性

- 大多数浏览器 es5 实现之中，每一个对象都有 `__proto__` 属性，指向对应的构造函数的 prototype 属性；
- Class 作为构造函数的语法糖，同时拥有 `prototype` 和 `__proto__` 两个属性；
    1. 子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类；
    2. 子类的 `prototype.__proto__` 属性，总是指向父类的 `prototype`；
        ```js
        class A {
        }
        
        class B extends A {
        }
        
        B.__proto__ === A // true
        B.prototype.__proto__ === A.prototype // true
        ```
- 类的继承可以认为是按照下面的模式实现的
    ```js
    class A {
    }
    
    class B {
    }
    
    // B 的实例继承 A 的实例
    // 等同于 B.prototype.__proto__ = A.prototype;
    Object.setPrototypeOf(B.prototype, A.prototype);
    
    // B 继承 A 的静态属性
    // 等同于 B.__proto__ = A
    Object.setPrototypeOf(B, A);
    
    const b = new B();
    ```
    ```js
    // `Object.setPrototypeOf` 方法大致实现如下
    Object.setPrototypeOf = function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }
    ```
- extends 关键字后面可以跟多种类型的值，只要是一个具有 prototype 属性的函数，就能够被继承，即任意函数；
    ```js
    // 继承 Object
    class A extends Object {
    }
    
    A.__proto__ === Object // true
    A.prototype.__proto__ === Object.prototype // true
    ```
    ```js
    // 不存在任何继承
    class A {
    }
    
    A.__proto__ === Function.prototype // true
    A.prototype.__proto__ === Object.prototype // true
    ```

## 原生构造函数的继承

- 原生构造函数是指语言内置的构造函数，通常用来生成数据结构，例如
    - Boolean()
    - Number()
    - String()
    - Array()
    - Date()
    - Function()
    - RegExp()
    - Error()
    - Object()
    - ...
- 以前原生构造函数是无法继承的；
- 而 ES6 允许子类继承原生构造函数；

## Mixin 模式的实现

- 