<!-- TOC -->

- [语句和声明](#语句和声明)
    - [async function](#async-function)
    - [function*](#function)

<!-- /TOC -->

# 语句和声明

## async function

```js
/**
 * @decription 声明一个异步函数
 * @param 
 * @return {Promise} 返回 Promise 对象
 */
 async function name([param[, param[, ... param]]]) { statements }
```
- 概要
    - 异步函数会返回一个 Promise 对象；
        - 当异步函数正常返回一个值时，Promise 的 resolve 方法会负责传递这个值；
        - 当异步函数抛出异常时，Promise 的 reject 方法也会传递这个异常值；
    - 异步函数中可能会有 await 表达式，这回使异步函数暂停执行，而等待 await 表达式中的 Promise 结果出来；

## function*

```js
/**
 * @decription 声明一个生成器函数
 * @param 
 * @return 返回一个生成器对象，既是可迭代对象又是迭代器
 */
 function* name([param[, param[, ... param]]]) { statements }
```
- 概要
    - `function*` 这种函数声明会定义一个生成器函数（generator function）；
    - 调用该函数不会立马执行它里面的语句，而是返回一个生成器对象，该对象符合可迭代协议和迭代器协议，即该对象既是可迭代对象，又是迭代器；
- 生成器对象执行
    - 当该生成器对象的next方法被首次调用时，生成器函数内的语句会执行到第一个出现 `yield` 的位置，并且yield后面表达式的值，便是此次next方法返回的值；
    - 如果遇到 `yield*`，则表示将执行权交给另一个生成器函数，当前的暂停；
    - next 方法返回一个对象，这个对象包含两个属性：value 和 done；
        - value 属性表示本次 yield 表达式返回的值；
        - done 为布尔类型，表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回；
    - 如果将参数传递给生成器对象的 next() 方法，则该值将成为当前yield操作返回的值；yield 操作默认返回undefined；
    - 当在生成器函数中显式 return 时，会导致生成器立即变为完成状态，即调用 next 方法返回的对象的 done 为 true；
        - 如果 return 后面跟了一个值，那么这个值会作为当前调用 next 方法返回的 value 值；
- 示例
    ```js
    // 注意 return 返回的值，不会被迭代语法所使用，因为此时返回的 done 属性为 true
    function* generatorFn () {
        yield 1;
        yield 2;
        return 3;
    }
    
    
    let generatorObj = generatorFn();
    console.log(generatorObj.next()); // {value: 1, done: false}
    console.log(generatorObj.next()); // {value: 2, done: false}
    console.log(generatorObj.next()); // {value: 3, done: true}
    console.log(generatorObj.next()); // {value: undefined, done: true}
    
    console.log([...generatorFn()]); // [1, 2]，不会显示3，因为此时done为true，表示已经结束迭代
    ```
    ```js
    // 显示返回
    function* yieldAndReturn() {
      yield "Y";
      return "R";//显式返回处，可以观察到 done 也立即变为了 true
      yield "unreachable";// 不会被执行了
    }
    
    var gen = yieldAndReturn()
    console.log(gen.next()); // { value: "Y", done: false }
    console.log(gen.next()); // { value: "R", done: true }
    console.log(gen.next()); // { value: undefined, done: true }
    ```
    ```js
    // 生成器函数不能当构造器使用
    function* f() {}
    var obj = new f; // throws "TypeError: f is not a constructor"
    ```
    ```js
    // yield*的示例
    function* anotherGenerator(i) {
      yield i + 1;
      yield i + 2;
      yield i + 3;
    }
    
    function* generator(i){
      yield i;
      yield* anotherGenerator(i);// 移交执行权
      yield i + 10;
    }
    
    var gen = generator(10);
    
    console.log(gen.next().value); // 10
    console.log(gen.next().value); // 11
    console.log(gen.next().value); // 12
    console.log(gen.next().value); // 13
    console.log(gen.next().value); // 20
    ```