<!-- TOC -->

- [表达式和运算符](#表达式和运算符)
    - [await](#await)
    - [in](#in)
    - [yield](#yield)
    - [yield*](#yield)
    - [async function expresstion](#async-function-expresstion)
    - [function* expresstion](#function-expresstion)

<!-- /TOC -->

# 表达式和运算符

## await

- 语法
    - `[return_value] = await expression;`
    - return_value：返回 Promise 对象处理的结果，如果等待的不是 Promise 对象，则返回该值本身；
- 概要
    - await 表达式会暂停当前异步函数的执行，等待 await 后面表达式处理完成；
        - 如果 await 后面表达式的值是 Promise，则会等待其状态确定，resovled 或 rejected；
        - 如果后面表达式的值不是 Promise，则直接返回该值本身；

## in
## yield

- 语法
    - `[return_value] = yield [expresstion];`
    - expresstion：定义 next() 方法返回的值，如果省略，则返回 undefined；
    - return_value：yield 操作返回的值，其值为 next(return_value) 方法中的参数，默认为 undefind；
- 概要
    - yield 可以用来暂停和恢复一个生成器函数内部语句的执行；
    - yield 实际返回一个迭代结果对象（IteratorResult），它有两个属性，value 和 done；
        - value 是 yield 表达式求值的结果；
        - 而 done 是 false，表示生成器函数尚未完全完成，即 yeild 返回结果中 done 固定为 false；
    - 一旦遇到 yield，生成器函数内部代码将暂停执行，直到生成器对象的 next() 方法再次被调用；每次调用生成器对象 next() 方法时，生成器函数内部代码恢复执行，直到遇到下面某个情况：
        - `yield`，导致生成器函数内部代码的执行再次暂停，并返回生成器对象新值；下一次调用 next() 时，该 yield 后面的语句才继续执行；
        - `throw`，抛出异常；
        - `函数结尾`，在这种情况下，生成器函数执行结束，并且返回 IteratorResult 为 `{value: undefined, done: true}`；
        - `return`，在这种情况下，生成器函数执行结束，并且返回 IteratorResult 为 `{value: 'return语句指定', done: true}`
    - **如果将参数传递给生成器的 next() 方法，则该值将成为生成器当前yield操作返回的值；yield 操作默认返回undefined；**

## yield*

## async function expresstion

- 异步函数声明对应的表达式方式；
- 异步函数表达式和异步函数声明比较相似，并且具有几乎相同的语法；
    - 两者之间主要区别就是函数名，表达式方式可以省略函数名，即匿名；

## function* expresstion

- 生成器函数的声明对应的表达式方式；
- 生成器函数表达式和生成器函数声明比较相似，并且具有几乎相同的语法；
    - 两者之间主要区别就是函数名，表达式方式可以省略函数名，即匿名；
- 示例
    ```js
    var x = function*(y) {
       yield y * y;
    };
    ```