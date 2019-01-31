<!-- TOC -->

- [jQuery API](#jquery-api)
    - [w3school jQuery API](#w3school-jquery-api)
    - [jquery123 jQuery API](#jquery123-jquery-api)
        - [延迟对象](#延迟对象)

<!-- /TOC -->

# jQuery API

## w3school jQuery API

- [W3C jQuery 参考手册](http://www.w3school.com.cn/jquery/jquery_reference.asp)
    - [选择器](http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp)
    - [事件](http://www.w3school.com.cn/jquery/jquery_ref_events.asp)
    - [效果](http://www.w3school.com.cn/jquery/jquery_ref_effects.asp)
    - [文档操作](http://www.w3school.com.cn/jquery/jquery_ref_manipulation.asp)
    - [属性](http://www.w3school.com.cn/jquery/jquery_ref_attributes.asp)
    - [CSS](http://www.w3school.com.cn/jquery/jquery_ref_css.asp)
    - [AJAX](http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp)
    - [遍历](http://www.w3school.com.cn/jquery/jquery_ref_traversing.asp)
    - [数据](http://www.w3school.com.cn/jquery/jquery_ref_data.asp)
    - [DOM 元素](http://www.w3school.com.cn/jquery/jquery_ref_dom_element_methods.asp)
    - [核心](http://www.w3school.com.cn/jquery/jquery_ref_core.asp)


## jquery123 jQuery API

### 延迟对象

> 注意：
> - jQuery此处的延迟对象Deferred和Nodejs中使用的Promise还是有点区别：
>   - Nodejs Promise Chain 中每个链条节点方法中，返回的都是新的Promise对象，并决定Chain后面方法的调用；

- jQuery.Deferred()
    - jQuery Deferred 延迟对象基于[CommonJS Promises/A](http://wiki.commonjs.org/wiki/Promises/A)设计；
    - jQuery.Deferred() 构造函数创建一个新的Deferred延迟对象，new 运算是可选的；
    - 一个Deferred延迟对象刚开始处于 *pending* 状态；
    - 调用deferred.resolve()或deferred.resolveWith()方法可以将其状态转换为 *resolved*，并立即执行 *doneCallbacks* 回调函数；
    - 调用deferred.reject()或deferred.rejectWith()方法可以将其状态转换为 *rejected*，并立即执行 *failCallbacks* 回调函数；
- deferred.always()
    - 类似done()、fail()方法，只不过该方法无论延迟对象resolved或rejected，其回调方法都会调用
- deferred.catch()
    ```js
    /**
     * @param {Function} failFilter 一个函数，当Deferfed被rejected时调用
     * @return {Promise} 返回Promise对象
     */
    deferred.catch(failFilter);
    ```
- deferred.then()
- deferred.done()
    ```js
    /**
     * @param {Function|Array<Function>} doneCallbacks  一个函数，或者函数数组，当延迟对象resolved时调用
     * @return {Deferred} 返回延迟对象
     */
    deferred.done(doneCallbacks[, doneCallbacks [, ...]]);
    ```
    - 该方法可接受一个或多个参数，参数可为函数，或函数数组；
- deferred.fail()
    ```js
    /**
     * @param {Function|Array<Function>} failCallbacks  一个函数，或者函数数组，当延迟对象rejected时调用
     * @return {Deferred} 返回延迟对象
     */
    deferred.fail(failCallbacks[, failCallbacks [, ...]]);
    ```
    - 该方法可接受一个或多个参数，参数可为函数，或函数数组；
- deferred.notify()
- deferred.notifyWith()
- deferred.progress()
- deferred.promise()
- deferred.reject()
    ```js
    /**
     * @param {Object} args 传递给doneCallbacks回调函数的可选的参数
     * @return {Deferred} 返回延迟对象
     */
    deferred.reject(args);
    ```
    - 当延迟对象呗rejected时，任何通过deferred.then或deferred.fail添加的failCallbacks都会被调用，回调函数执行的顺序和他们被添加的顺序是一样的；
    - 传递给deferred.reject()的args参数，会传给每个回调函数；
    - 当延迟对象进入rejected状态后，再添加任何failCallbacks回调函数，会被立刻执行，并带上args参数；
- deferred.rejectWith()
    ```js
    /**
     * @param {Object} context context作为this对象传递给failCallbacks 
     * @param {Array} args  传递一个可选的参数数组给failCallbacks
     * @return {Deferred} 返回延迟对象
     */
    deferred.rejectWith(context[, args]);
    ```
- deferred.resolve()
    ```js
    /**
     * @param {Object} args 传递给failCallbacks回调函数的可选的参数
     * @return {Deferred} 返回延迟对象
     */
    deferred.resolve(args);
    ```
    - 当延迟对象呗resolved时，任何通过deferred.then或deferred.done添加的doneCallbacks都会被调用，回调函数执行的顺序和他们被添加的顺序是一样的；
    - 传递给deferred.resolve()的args参数，会传给每个回调函数；
    - 当延迟对象进入resolved状态后，再添加任何doneCallbacks回调函数，会被立刻执行，并带上args参数；
- deferred.resolveWith()
    ```js
    /**
     * @param {Object} context context作为this对象传递给doneCallbacks 
     * @param {Array} args  传递一个可选的参数数组给doneCallbacks
     * @return {Deferred} 返回延迟对象
     */
    deferred.resolveWith(context[, args]);
    ```
- deferred.state()
    ```js
    /**
     * @return {String} pending/resolved/rejected
     */
    deferred.state();
    ```
    - 返回延迟对象的当前状态
- jQuery.when()
- .promise()


