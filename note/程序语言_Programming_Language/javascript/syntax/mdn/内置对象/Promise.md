# Promise

## Methods

### Promise.resolve()

- 格式
    `Promise.resolve(value)`
- 参数
    - 普通的 js 值，或者是 promise 对象、thenable 对象
- 返回值
    - 如果 value 是普通值，则返回一个 resolved 状态的 promise，且值为 value
    - 如果 value 是 promise 对象，则返回该 promise，其状态不可控
- 概要
    - 该方法返回一个 resolved 状态的 promise，并用给定的参数 value
    - 如果参数 value 本身就是一个 promise，那么会将该 promise 返回，那么 Promise.resolve() 后面的 .then 会跟随该 promise 状态
    - 该函数会将嵌套的 promise 对象展开平铺

### Promise.reject()
### Promise.race()
### Promise.all()
### Promise.allSettled()
### Promise.prototype.then()
### Promise.prototype.catch()
### Promise.prototype.finally()