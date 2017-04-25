## events模块下对象的初始值 

```javascript
module.exports = EventEmitter;

function EventEmitter() {
    // 新对象属性
    this.domain = null;
    this._events = {};
    this._eventsCount = 0;
    this._maxListeners = undefined;
}

// 函数属性
EventEmitter.defaultMaxListeners     = 10;

// 原型属性和方法
EventEmitter.prototype.domain        = undefined;
EventEmitter.prototype._events       = undefined;
EventEmitter.prototype._maxListeners = undefined;

EventEmitter.prototype.setMaxListeners = function(n) {
    this._maxListeners;
    return this;
}

EventEmitter.prototype.getMaxListeners = function(n) {
    // 优先级：emitter -> EventEmitter(对象 -> 函数)
    return this._maxListeners === undefined 
        ? EventEmitter.defaultMaxListeners
        : this._maxListeners;
}

//on 和 addListener 一毛一样(引用的同一个方法)
EventEmitter.prototype.on = function(eventName, listener) {}

```

## this._event 结构

如下，结构还是很清晰的

```javascript
this._event = {
    eventName1: listener1,
    eventName2: [listener2, listener3]
}
```

## on|addListener(eventName, listener)
```javascript
EventEmitter.prototype.on = function(eventName, listener) {
    // 触发新监听事件
    if (this._events.newListener) {
        this.emit('newListener', xx, xx)
    }

    // 添加监听
    const existing = this._events[eventName];
    if (existing) {
        existing = .isFunction(existing) 
            ? [existing, listener]
            : existing.push(listener);
    } else {
        events[type] = listener;
        ++target._eventsCount;
    }

    // 判断maxListeners是否超标
    // 只是判断这个eventName的监听器个数，不是判断实例emitter所有事件的所有监听器
    // 超标只warn一次，如果此eventName再次addListener，则不会warn
    if (!existing.warned) {
      const max = this.getMaxListeners();
      if (max && max > 0 && existing.length > max) {
        existing.warned = true;
        const w = new Error('Possible EventEmitter memory leak detected. ' +
                            `${existing.length} ${type} listeners added. ` +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'Warning';
        w.emitter = this;
        w.type = eventName;
        w.count = existing.length;
        process.emitWarning(w);
      }
    }
}

```

## removeListener(eventName, listener)
```javascript
EventEmitter.prototype.removeListener = function(eventName, listener) {
    // 若this._events[eventName]的listener只有一个，则直接移除这个eventName属性；否则从对应的监听数组里面移除对应的listener

    // 若this._events.removeListener存在，则this.emit('removeListener', xx,xx);
}
```

## emit(eventName, xx,xx, ..)
```javascript
EventEmitter.prototype.emit = function(eventName, xx, xx,..) {
    // 若this._events不存在，且eventName !== 'error', 则直接return false；终止函数

    // 若this._event存在，
    // var doError = ((eventName === 'error') && events.error == null);

    // 若doError===true，表示用户emit个error事件，但是this._events没有对应监听器，那么做直接throw处理，如果都一直没被上层捕获，则终止程序exit 1；

    // 若doError===false，则
    // handler = this._events[eventName];
    // ...
    // 正常处理
    // ...


}
```