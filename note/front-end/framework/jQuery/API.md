<!-- TOC -->

- [jQuery API](#jquery-api)
    - [w3school jQuery API](#w3school-jquery-api)
    - [jquery123 jQuery API](#jquery123-jquery-api)
        - [类型](#类型)
        - [延迟对象](#延迟对象)
        - [AJAX](#ajax)

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

### 类型

- [官方](http://api.jquery.com/Types/#Deferred)

### 延迟对象

> 注意：
> - jQuery此处的延迟对象Deferred和Nodejs中使用的Promise还是有点区别：
>   - Nodejs Promise Chain 中每个链条节点方法中，返回的都是新的Promise对象，并决定Chain后面方法的调用；

- jQuery deferred 对象
    ```
    always
    done
    fail
    notify
    notifyWith
    pipe
    progress
    promise
    reject
    rejectWith
    resolve
    resolveWith
    state
    then
    ```
- jQuery promise 对象
    ```
    always
    done
    fail
    pipe
    progress
    promise
    state
    then
    ```
- 详细API
    - **jQuery.Deferred()**
        ```js
        /**
         * @param {Function} beforeStart 一个可选函数参数，可以在jQuery.Deferred()返回之前被调用
         * @return {Deferred} 返回延迟对象
         */
        jQuery.Deferred([beforeStart])
        ```
        - jQuery Deferred 延迟对象基于[CommonJS Promises/A](http://wiki.commonjs.org/wiki/Promises/A)设计；
        - jQuery.Deferred() 构造函数创建一个新的Deferred延迟对象，new 运算是可选的；
        - 可选参数 `beforeStart` 是一个函数，会在jQuery.Deferred()返回之前被调用，并且新创建的deferred对象会作为beforeStart函数的参数和this对象；
        - 一个Deferred延迟对象刚开始处于 *pending* 状态；
        - 调用deferred.resolve()或deferred.resolveWith()方法可以将其状态转换为 *resolved*，并立即执行 *doneCallbacks* 回调函数；
        - 调用deferred.reject()或deferred.rejectWith()方法可以将其状态转换为 *rejected*，并立即执行 *failCallbacks* 回调函数；
    - **deferred.always()**
        - 类似done()、fail()方法，只不过该方法无论延迟对象resolved或rejected，其回调方法都会调用
    - **deferred.catch()**
        ```js
        /**
         * @param {Function} failFilter 一个函数，当Deferfed被rejected时调用
         * @return {Promise} 返回Promise对象
         */
        deferred.catch(failFilter);
        ```
        - `deferred.catch(fn)` 是 `deferred.then(null, fn)` 别称；
    - **deferred.then()**
        ```js
        /**
         * @param {Function} doneFilter 一个函数，当Deferfed被resolved时调用
         * @param {Function} failFilter 一个函数，当Deferfed被rejected时调用
         * @param {Function} progressFilter 一个函数，当Deferfed对象生成进度通知时调用
         * @return {Promise} 返回Promise对象
         */
        deferred.then(doneFilter[, failFilter][, progressFilter]);
        ```
        - 返回一个新的Promise对象；
    - **deferred.done()**
        ```js
        /**
         * @param {Function|Array<Function>} doneCallbacks  一个函数，或者函数数组，当延迟对象resolved时调用
         * @return {Deferred} 返回延迟对象
         */
        deferred.done(doneCallbacks[, doneCallbacks [, ...]]);
        ```
        - 该方法可接受一个或多个参数，参数可为函数，或函数数组；
    - **deferred.fail()**
        ```js
        /**
         * @param {Function|Array<Function>} failCallbacks  一个函数，或者函数数组，当延迟对象rejected时调用
         * @return {Deferred} 返回延迟对象
         */
        deferred.fail(failCallbacks[, failCallbacks [, ...]]);
        ```
        - 该方法可接受一个或多个参数，参数可为函数，或函数数组；
    - **deferred.notify()**
    - **deferred.notifyWith()**
    - **deferred.progress()**
    - **deferred.promise()**
        ```js
        /**
         * @param {Object} target 
         * @return {Promise} 返回Promise对象
         */
        deferred.promise([target]);
        ```
        - 将deferred对象以promise链下去；
    - **deferred.reject()**
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
    - **deferred.rejectWith()**
        ```js
        /**
         * @param {Object} context context作为this对象传递给failCallbacks 
         * @param {Array} args  传递一个可选的参数数组给failCallbacks
         * @return {Deferred} 返回延迟对象
         */
        deferred.rejectWith(context[, args]);
        ```
    - **deferred.resolve()**
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
    - **deferred.resolveWith()**
        ```js
        /**
         * @param {Object} context context作为this对象传递给doneCallbacks 
         * @param {Array} args  传递一个可选的参数数组给doneCallbacks
         * @return {Deferred} 返回延迟对象
         */
        deferred.resolveWith(context[, args]);
        ```
    - **deferred.state()**
        ```js
        /**
         * @return {String} pending/resolved/rejected
         */
        deferred.state();
        ```
        - 返回延迟对象的当前状态
    - **jQuery.when()**
        ```js
        /**
         * @param {Object} deferreds 一个或多个deferred对象，promise对象或者普通的js对象
         * @return {Promise} 返回Promise对象
         */
        jQuery.when(deferreds);
        ```
        - 该方法支持执行一个或多个对象的回调函数；
        - 传入该方法的参数可以是deferred对象、promise对象、普通js对象（普通js对象直接以resolved状态触发）；
        - 如果没有参数，那么jQuery.when()会返回一个resolved状态的promise对象；
        - 如果参数为Deferred对象，那么会将其promise对象返回，即deferred.promise();
        - 如果参数不是Deferred或Promise对象，那么该参数会被当做resolved状态的Deferred对象，并且其doneCallbacks会被立即调用；
            ```js
            function getLatestNews() {
                return $.get( "latestNews.php", function( data ) {
                    console.log( "news data received" );
                    $( ".news" ).html( data );
                });
            }
            
            function getLatestReactions() {
                return $.get( "latestReactions.php", function( data ) {
                    console.log( "reactions data received" );
                    $( ".reactions" ).html( data );
                });
            }
            
            function showAjaxedContent() {
                // The .promise() is resolved *once*, after all animations complete
                return $( ".news, .reactions" ).slideDown( 500, function() {
                    // Called once *for each element* when animation completes
                    $(this).addClass( "active" );
                }).promise();
            }
            
            function removeActiveClass() {
                return $.Deferred(function( dfd ) {
                    setTimeout(function () {
                        $( ".news, .reactions" ).removeClass( "active" );
                        dfd.resolve();
                    }, 4000);
                }).promise();
            }
            
            $.when(
                getLatestNews(),
                getLatestReactions()
            )
            .then(showAjaxedContent)
            .then(removeActiveClass)
            .then(function() {
                console.log( "Requests succeeded and animations completed" );
            }).fail(function() {
                console.log( "something went wrong!" );
            });
            ```
    - **.promise()**
        - todo

```js
var dfd = $.Deferred();

// deferred对象和promise对象不同，deferred调用方法返回的是其本身，而promise调用方法，返回的是一个新的promise对象
dfd.done() === dfd // true
```

### AJAX

1. 全局Ajax事件处理器
2. 辅助函数
    - 概要
        - 这些函数用于辅助完成Ajax任务；
    - **jQuery.param()**
    - **.serialize()**
    - **.serializeArray()**
3. 底层接口
    - 概要
        - 这些函数可以用于发起任意Ajax请求；
    - **jQuery.ajax()**
        ```js
        /**
         * @param {String} url 一个用来包含发送请求的url字符串
         * @param {PlainObject} settings  一个键值对对象，组成ajax请求设置，所有的选项都是可选的；可以使用$.ajaxSetup()设置任何默认参数；
         * @return {jqXHR} 返回延迟对象
         */
        deferred.ajax(url[, settings]);
        deferred.ajax([settings]);
        ```
        - jQuery发送的所有ajax请求，内部都会通过调用$.ajax()函数来实现；通常没有必要直接调用这个函数，可以使用几个已经封装的简便方法，如$.get()、.load()等；
        - 所有的选项都可以通过 $.ajaxSetup() 函数来全局设置；
        - jqXHR对象
            - $.ajax()返回jqXHR对象，该对象是浏览器的原生XMLHttpRequest对象的一个超集；
            - $.ajax()返回的jqXHR对象实现了Promise接口，使它拥有了Promise的所有属性，方法和行为；
                ```js
                // console.log( $.ajax() )
                abort: ƒ (e)
                always: ƒ ()
                catch: ƒ (e)
                done: ƒ ()
                fail: ƒ ()
                getAllResponseHeaders: ƒ ()
                getResponseHeader: ƒ (e)
                overrideMimeType: ƒ (e)
                pipe: ƒ ()
                progress: ƒ ()
                promise: ƒ (e)
                readyState: 0
                setRequestHeader: ƒ (e,t)
                state: ƒ ()
                status: 0
                statusCode: ƒ (e)
                statusText: "error"
                then: ƒ (t,r,i)
                __proto__: Object
                ```
            - jqXHR.done()
            - jqXHR.fail()
            - jqXHR.always()
            - jqXHR.then()
            - 注意：
                - jqXHR.success()、jqXHR.error()、jqXHR.complete()回调从jQuery 1.8开始弃用；它们将最终被取消，您的代码应做好准备，使用jqXHR.done()、jqXHR.fail()、jqXHR.always等代替；
            - 在ajax所有回调函数中的 **this** 对象，引用的是在$.ajax() settings参数中设置的context选项，如果没有指定该选项，那么引用 settings 对象本身；
                ```js
                // 此处设置为dom对象
                $.ajax({
                  url: "test.html",
                  context: document.body
                }).done(function() {
                  $(this).addClass("done");
                });
                ```
    - **jQuery.ajaxPrefilter()**
    - **jQuery.ajaxSetup()**
    - **jQuery.ajaxTransport()**
4. 快捷方法
    - 概要
        - 这些方法帮你用最少的代码发送常见的Ajax请求；
    - **jQuery.get()**
    - **jQuery.getJSON()**
    - **jQuery.getScript()**
    - **jQuery.post()**
    - **.load()**




