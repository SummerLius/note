

## Generator

Generator函数是ES6提供的一种异步编程解决方案。

Generator函数是一个状态机，内部封装了多个状态。

Generator函数会返回一个普通函数，可以依次遍历Generator函数内部的每一个状态。

形式上，Generator函数是一个普通函数，但是有两个特征：
1. function关键字和函数名之间有一个星号*
2. 函数体内部使用yield表达式，定义不同的内部状态

```javascript
function* () {
    yield  '11';
    yield  '22';
    return '33';
}
```


- yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

### Generator函数的异步控制

异步编程方法：
1. 回调函数
2. 事件监听
3. 发布/订阅
4. Promise对象
5. Generator函数
6. ...

Generator 函数可以认为是一个协程，里面的yield用于控制权的转换。

## Async/await

es7标准引入了async函数，它是Generator函数的语法糖，使得异步操作变得更加方便。

```javascript
async function () {
    let await readFile('/file');
}
```
Async函数在Generator函数上改进：
1. 内置执行器：
    - Generator函数执行必须要有执行器（执行完迭代器next()函数），co模块便是这样一种执行器，而async函数自带执行器。也就是说执行async函数，其就直接自动运行该函数体代码，而不是只返回一个遍历器对象Iterator。
2. 更好的语义：
    - async和await，比起*和yield，有更好的语义。
3. 更广的实用性：
    - co模块，yield命令后面只能是Thunk函数或Promise对象；而async函数的await命令后面，可以是Promise对象和原始类型的值（数值、字符串、布尔值等）
4. async函数返回的是Promise
    - async函数返回的值是Promise对象，这比Generator函数的返回值是Iterator对象方便多了。可以用then方法指定下一步操作。




