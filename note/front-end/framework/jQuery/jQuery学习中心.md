<!-- TOC -->

- [官网 jQuery学习中心](#官网-jquery学习中心)
    - [关于jQuery](#关于jquery)
    - [使用jQuery核心](#使用jquery核心)
    - [事件](#事件)
    - [效果](#效果)
    - [Ajax](#ajax)
    - [插件](#插件)
    - [性能](#性能)
    - [代码组织](#代码组织)
    - [jQuery UI](#jquery-ui)
    - [jQuery Mobile](#jquery-mobile)

<!-- /TOC -->

# 官网 jQuery学习中心

- [JQuery官网：学习中心](https://learn.jquery.com/)

## 关于jQuery

- 概要
    - jQuery仅仅是JavaScript库，学习时需要有JavaScript的基础；

## 使用jQuery核心

- [$ vs $()](#)
    - todo
- [$( document ).ready()](#)
    - `$(document).ready(function() {})` 当页面DOM准备好后，执行
    - `$(window).on('load', function() {})` 整个页面加载（dom、images、iframes等等）完成后，执行
        ```js
        // 页面dom加载好后执行
        $(document).ready(function() {});
        
        // 上面写法的快捷方式
        $(function() {});
        ```
- [和其它库避免冲突（Avoiding Conflicts with Other Libraries）](#)
    - jQuery库及其插件都包含在jQuery命名空间中；
    - 需要注意，jQuery使用 `$` 符号用作快捷方式 `jQuery`，因此，如果你正在使用另一个使用该`$`变量的JavaScript库，则会与jQuery产生冲突。为了避免这些冲突，你需要在jQuery加载到页面之后以及尝试在页面中使用jQuery之前，将jQuery置于无冲突模式；
    - 流程：
        - `<script src="jquery.js"></script>`，其中jquery.js文件执行时，会将当前全局变量`window.jQuery`和`window.$`保存下来（非jQuery.js设置的）
        - `jQuery.noConflict()`，该方法会做处理，如果当前`window.$ !== window.jQuery`，即变量`window.$`没有被jQuery占用，则不做处理；如果当前`window.$ === window.jQuery`，即当前`window.$`被jQuery占用，那么此时，jQuery会释放该变量，`window.$ = _$`，可能为undefined值或其它在jQuery.js之前被定义的值；
            ```js
            var

                // Map over jQuery in case of overwrite
                _jQuery = window.jQuery,

                // Map over the $ in case of overwrite
                _$ = window.$;

                jQuery.noConflict = function( deep ) {
                    if ( window.$ === jQuery ) {
                        window.$ = _$;
                }

                if ( deep && window.jQuery === jQuery ) {
                    window.jQuery = _jQuery;
                }

                return jQuery;
            };
            ```
    - 根据上面说将，当在其他库之前引入jQuery文件时，后面也就没有必要再执行 jQuery.noConflict() 方法；
    - 以下是当另一个库的存在与`$`变量的使用产生冲突时，相关处理方式：
        1. 创建别名
            - 该 `jQuery.noConflict()` 方法返回对jQuery函数的引用；
                ```js
                <script src="prototype.js"></script>
                <script src="jquery.js"></script>
                <script>
                
                // Give $ back to prototype.js; create new alias to jQuery.
                var $jq = jQuery.noConflict();
                
                </script>
                ```
        2. 使用立即执行函数表达式
            - 您可以 `$` 通过将代码包装在一个立即调用的函数表达式中继续使用该变量；
                ```js
                <!-- Using the $ inside an immediately-invoked function expression. -->
                <script src="prototype.js"></script>
                <script src="jquery.js"></script>
                <script>
                
                jQuery.noConflict();
                
                (function( $ ) {
                    // Your jQuery code here, using the $
                })( jQuery );
                
                </script>
                ```
        3. 使用传递给jQuery( document ).ready()函数的参数
            ```js
            <script src="jquery.js"></script>
            <script src="prototype.js"></script>
            <script>
            
            jQuery(document).ready(function( $ ) {
                // Your jQuery code here, using $ to refer to jQuery.
            });

            jQuery(function($){
                // Your jQuery code here, using the $
            });
            
            </script>
            ```
- [属性（Attributes）](#)
    - 元素的属性可以包含应用程序的有用信息，因此获取和设置它们非常重要；
    - `.attr()`方法
        - `.attr()` 方法可以充当getter和setter。
            1. 作为setter，attr()可以接受key和value，也可以接受包含多个key/value的对象；
            2. 作为getter，attr()接受key参数
                ```js
                // setter
                $( "a" ).attr( "href", "allMyHrefsAreTheSameNow.html" );
 
                $( "a" ).attr({
                    title: "all titles are the same too!",
                    href: "somethingNew.html"
                });

                // getter 
                $( "a" ).attr( "href" ); // Returns the href for the first a element in the document
                ```
- [选择元素（Selecting Elements）](#)
    - jQuery最基本的概念是： “选择一些元素并用它们做点什么”；
    - jQuery支持大多数CSS3选择器，以及一些非标准选择器；
    - 有关完整的选择器参考，请访问api.jquery.com上的[Selectors文档](https://www.jquery123.com/category/selectors/)
- [在选择器上工作（Working with Selections）](#)
    - Getters & Setters
        - 一些jQuery方法既可以用作赋值，也可以用作读取值；
            - 方法作为setter时，会影响所有选择的元素
            - 方法作为getter时，只会返回第一个元素的值，但是有个例外，就是`text()`方法，其会检索匹配的所有元素的值
                ```js
                // The .html() method sets all the h1 elements' html to be "hello world":
                $( "h1" ).html( "hello world" );

                // The .html() method returns the html of the first h1 element:
                $( "h1" ).html();
                // > "hello world"
                ```
        - Setters 会返回一个jQuery对象，允许你继续在当前选择器上继续调用jQuery方法；而 Getters 会返回用户想要的的值，而不是jQuery对象；
            ```js
            // Attempting to call a jQuery method after calling a getter.
            // This will NOT work:
            $( "h1" ).html().addClass( "test" );
            ```
    - Chaining
        - 如果你调用jQuery方法，并且该方法返回jQuery对象，那么你可以继续在该对象上调用jQuery方法，这叫做“chaining”；
            ```js
            $( "#content" )
                .find( "h3" )
                .eq( 2 )
                .html( "new text for the third h3!" );
            ```
        - 同时，jQuery也提供了 `.end()` 方法，返回到上一级选择器；
            ```js
            $( "#content" )
               .find( "h3" )
               .eq( 2 )
                   .html( "new text for the third h3!" )
                   .end() // Restores the selection to all h3s in #content
               .eq( 0 )
                   .html( "new text for the first h3!" );
            ```
- [操纵元素（Manipulating Elements）](#)
    - 有关jQuery操作方法的完整文档，请访问api.jquery.com上的[操纵元素](https://www.jquery123.com/category/manipulation/)
    - 获取和设置元素信息
        - 有许多方法可以更改现有元素，最常见的任务之一是更改元素HTML或属性；
        - jQuery库为这些类型的操作提供了许多简单的、跨浏览器平台的方法，以下是一些可用于获取和设置元素信息的方法：
            - `.html()` - 获取或设置HTML内容；
            - `.text()` - 获取或设置文本内容，HTML将被剥离；
            - `.attr()` - 获取或设置属性值；
            - `.width()` - 为匹配的元素集合中获取第一个元素的当前计算宽度值或给每个匹配的元素设置宽度；
            - `.height()` - 获取匹配元素集合中的第一个元素的当前计算高度值 或 设置每一个匹配元素的高度值；
            - `.position()` - 获取匹配元素中第一个元素的当前坐标，相对于offset parent的坐标；( 译者注：offset parent指离该元素最近的而且被定位过的祖先元素 )
            - `.val()` - 获取匹配的元素集合中第一个元素的当前值或设置匹配的元素集合中每个元素的值；
    - 移动，复制和删除元素
    - 克隆元素
    - 删除元素
    - 创建新元素
    - 操纵属性
- [jQuery对象（The jQuery Object）](#)
- [遍历（Traversing）](#)
    - 有关jQuery操作方法的完整文档，请访问api.jquery.com上的[遍历](https://www.jquery123.com/category/manipulation/)
    - 遍历可以分为三个基础部分：父、子和兄弟
- [CSS, Styling, & Dimensions](#)
- [Data Methods](#)
- [Utility Methods](#)
- [Iterating over jQuery and non-jQuery Objects](#)
- [Using jQuery’s .index() Function](#)

## 事件

- [概要](#)
    - jQuery可以简单的将Event处理函数添加到选择器上，当事件产生时，事件的监听函数会被执行，在该函数中，`this` 变量指向产生该事件的DOM元素；
    - 更多详细的jQuery事件，查看[Event API](https://www.jquery123.com/category/events/)
    - 事件处理函数可以接受可以接受一个事件对象，该对象可以用来确定事件的性质，也可以组织事件的默认行为；
    - 更多详细的jQuery事件对象，查看[Event Object API](https://www.jquery123.com/category/events/event-object/)
- [jQuery事件基础知识](#)
    - 设置DOM元素的事件响应
        - jQuery使得在页面元素上设置事件监听变得简单明了；
        - jQuery事件提供了便捷的方法，包括 `.click()`、`.focus()`、`.blur()`、`.change()` 等方法；同时也有一个速记方法 `.on()`，on方法可以允许传递多个事件或自定义事件；
            ```js
            // Event setup using a convenience method
            $( "p" ).click(function() {
                console.log( "You clicked a paragraph!" );
            });

            // Equivalent event setup using the `.on()` method
            $( "p" ).on( "click", function() {
                console.log( "click" );
            });
            ```
    - 将事件扩展到新页面元素
        - 注意，`.on()` 方法只会在已经存在的元素上添加监听器，如果元素是后来动态创建，则不会有绑定监听函数；
            ```js
            $( document ).ready(function(){
            
                // Sets up click behavior on all button elements with the alert class
                // that exist in the DOM when the instruction was executed
                $( "button.alert" ).on( "click", function() {
                    console.log( "A button with the alert class was clicked!" );
                });
                
                // Now create a new button element with the alert class. This button
                // was created after the click listeners were applied above, so it
                // will not have the same click behavior as its peers
                $( "<button class='alert'>Alert!</button>" ).appendTo( document.body );
            });
            ```
    - 事件处理函数内部
        - 每个事件处理函数都会收到一个事件对象，其中包含许多属性和方法。事件对象常使用`.preventDefault()`方法阻止事件的默认操作。但是，事件对象包含许多其它有用的属性和方法，包括：
            - pageX，pageY
                - 事件发生时的鼠标的位置，相对于页面显示区域的左上角（不是整个浏览器窗口）
            - type
                - 事件的类型（例如，“click”）
            - which
                - 按下的按钮或键位
            - data
                - 绑定事件时传入的任何数据，例如
                    ```js
                    // Event setup using the `.on()` method with data
                    $( "input" ).on(
                        "change",
                        { foo: "bar" }, // Associate data with event binding
                        function( eventObject ) {
                            console.log("An input value has changed! ", eventObject.data.foo);
                        }
                    );
                    ```
            - target
                - 产生事件的DOM元素
            - namespace
                - 触发事件时指定的命名空间
            - timeStamp
                - 在浏览器中发生事件的时间与1970年1月1日之间的毫秒差异
            - preventDefault()
                - 阻止事件的默认操作
            - stoPropagation()
                - 阻止事件冒泡到其他元素
            - 等等
        - 除了事件对象之外，事件处理函数内部可以使用关键词 `this` 来访问事件处理函数绑定的DOM元素；要将DOM元素转换为jQuery对象，只需要该操作即可：`$(this)`；
            ```js
            var element = $( this );
            
            // 一个更全面的例子是：
            // Preventing a link from being followed
            $( "a" ).click(function( eventObject ) {
                var elem = $( this );
                if ( elem.attr( "href" ).match( /evil/ ) ) {
                    eventObject.preventDefault();
                    elem.addClass( "evil" );
                }
            });
            ```
    - 设置多个事件响应
        - 如果多个事件要共享相同的处理函数，则可以将事件类型组成以空格分隔的列表传给方法`.on()`
            ```js
            // Multiple events, same handler
            $( "input" ).on(
                "click change", // Bind handlers for multiple events
                function() {
                    console.log( "An input was clicked or changed!" );
                }
            );
            ```
        - 当每个事件都有自己的处理函数时，你可以传递一个key/value对象给`.on()`函数，key是事件名称，value是处理事件的函数
            ```js
            // Binding multiple events with different handlers
            $("p").on({
                "click": function() { console.log("clicked!"); },
                "mouseover": function() { console.log("hoverd!"); }
            });
            ```
    - 命名空间事件
        - 对于你与其他人共享的应用程序和插件，将事件命名空间非常有用，这样你就不会无意中断开你不了解的事件
            ```js
            // Namespacing events
            $( "p" ).on( "click.myNamespace", function() { /* ... */ } );
            $( "p" ).off( "click.myNamespace" );
            $( "p" ).off( ".myNamespace" ); // Unbind all events in the namespace
            ```
    - 拆除事件监听器
        - 要删除事件监听器，请使用`.off()`方法并将事件类型传递给off()，同时也可以将事件处理函数作为第二个参数传递，从而仅仅将该处理函数与事件拆除，其它的处理函数依然存在；
            ```js
            // 拆除该选择器下所有click事件的处理函数
            $( "p" ).off( "click" );

            // 拆除某个处理函数，不是全部
            var foo = function() { console.log( "foo" ); };
            var bar = function() { console.log( "bar" ); };
            
            $( "p" ).on( "click", foo ).on( "click", bar );
            $( "p" ).off( "click", bar ); // foo依然绑定click事件
            ```
    - 设置仅执行一次的事件
        - 有时需要一个特定的处理函数仅仅运行一次，jQuery提供了`.one()`方法，其也可以绑定多个事件
            ```js
            // Switching handlers using the `.one()` method
            $( "p" ).one( "click", firstClick );
            
            function firstClick() {
                console.log( "You just clicked this for the first time!" );
            
                // Now set up the new handler for subsequent clicks;
                // omit this step if no further click responses are needed
                $( this ).click( function() { console.log( "You have clicked this before!" ); } );
            ```
- [事件助手](#)
    - jQuery提供了一些与事件相关的辅助函数，可以为你节省一些处理。
    - 这里以 `.hover()` 举例，
        - 该方法允许你传递一个或两个函数，以便在元素上发生`mouseenter`和`mouseleave`事件时运行；
        - 如果传递一个函数，它将为两个事件执行；如果传递两个函数，第一个将在`mouseenter`事件发生时执行，第二个在`mouseleave`事件发生时执行；
            ```js
            // The hover helper function
            $( "#menu li" ).hover(function() {
                $( this ).toggleClass( "hover" );
            });
            ```
    - 更多事件辅助函数，请查看[jQuery Event API](https://www.jquery123.com/category/events/)
- [事件介绍](#)
    - 简介
        - 网页都是互动的；
        - 用户执行的操作，例如在网页上移动鼠标，单击元素以及键入文本，这些都是事件的示例；
        - 除了这些用户事件之外，还有很多其他事件发生，比如加载页面、视频还是播放或暂停等；
    - 什么是DOM事件
        - 如上所述，有无数的事件类型，但最容易理解的是用户事件，例如点击元素；这些类型的事件发生在元素上，例如当用户单击某个按钮时，该按钮上发生了一个事件；
        - 虽然DOM事件不是用户交互的唯一类型，但是其是比较容易理解的；Mozilla Developer Network对[可用的DOM事件](https://developer.mozilla.org/en-US/docs/Web/Events)有很好的参考。
    - 听取事件的方式
        - 概要
            - 在网页上不断发生着事件，但只有监听这些事件时才会通知开发人员；
            - 监听事件意味着您正等待浏览器告诉你事件的发生，然后你将指定页面如何反应；
            - 要向浏览器指定时间发生时要执行的操作，请提供一个函数，也称为“事件处理程序（event handler）”，只要事件发生，就会执行此函数；
        - 对DOM对象添加事件监听器，方法几种
            - DOM元素中绑定
                - 直接在html中指定
                - 缺点：维护性差、扩展性差、代码冗余等
                - `<button onclick="alert('Hello')">Say hello</button>`
                - onclick、onkeyup、等等，更多查看[dom事件](http://www.runoob.com/jsref/dom-obj-event.html)
            - 在JavaScript代码中绑定
                - `document.getElementById('XX').onclick=function(){};`
                - 这种采用对象赋值的方式绑定
                - 缺点：是仅仅绑定一个处理函数，不能绑定多个
            - 绑定事件监听函数
                - `obj.addEventListener(event,fn,useCapture);` 或 `attachEvent(event,fn);`
                - 缺点：监听函数API跨浏览器平台兼容不够好
            - jQuery方法
                - 解决上面几种的缺点
    - 事件委托
        - 事件委托（Event delegation）因为事件冒泡的概念而其作用；
    - 事件对象
        - todo
- [处理事件](#)
    - 概要
        - jQuery提供了`.on()`方法可以响应所选元素上任何事件，这称为事件绑定（event binding）；
        - `.on()`方法提供了几个有用的功能：
            - 将所选元素上触发的任何一种类型事件绑定到事件处理程序
            - 将多个事件绑定到一个事件处理程序
            - 将多个事件和多个处理程序绑定到所选元素
            - 在事件处理程序中使用有关事件的详细信息
            - 将数据传递给自定义事件的事件处理程序
            - 将事件绑定到将来要呈现的元素
    - 示例
        ```js
        // 简单事件绑定
        // When any <p> tag is clicked, we expect to see '<p> was clicked' in the console.
        $( "p" ).on( "click", function() {
            console.log( "<p> was clicked" );
        });

        // 多个事件，但只有一个事件处理程序
        // When a user focuses on or changes any input element,
        // we expect a console message bind to multiple events
        $( "div" ).on( "mouseenter mouseleave", function() {
            console.log( "mouse hovered over or left a div" );
        });

        // 多个事件和多个处理程序
        $( "div" ).on({
            mouseenter: function() {
                console.log( "hovered over a div" );
            },
            mouseleave: function() {
                console.log( "mouse left a div" );
            },
            click: function() {
                console.log( "clicked on a div" );
            }
        });
        
        // 事件对象
        $( "div" ).on( "click", function( event ) {
            console.log( "event object:" );
            console.dir( event );
        });

        // 数据传递给事件处理程序
        $( "p" ).on( "click", {
            foo: "bar"
        }, function( event ) {
            console.log( "event data: " + event.data.foo + " (should be 'bar')" );
        });

        // 事件绑定到尚不存在的元素
        $( "ul" ).on( "click", "li", function() {
           console.log( "Something in a <ul> was clicked, and we detected that it was an <li> element." );
        });
        ```
    - 仅执行一次
        - .one()如果您需要在第一次单击元素时进行一些复杂的设置，而不是后续时间，则此方法特别有用；
        - .one()和.on()一样，接受相同的参数，这意味这该函数支持一个或多个处理程序、多个事件，传递自定义数据和事件委托；
            ```js
            // Switching handlers using the `.one()` method
            $( "p" ).one( "click", function() {
                console.log( "You just clicked this for the first time!" );
                $( this ).click(function() {
                    console.log( "You have clicked this before!" );
                });
            });
            ```
    - 断开事件
        - 使用.off()方法清理你不再需要的事件绑定;
            ```js
            // Unbinding a particular click handler, using a reference to the function
            var foo = function() {
                console.log( "foo" );
            };
            
            var bar = function() {
                console.log( "bar" );
            };
            
            $( "p" ).on( "click", foo ).on( "click", bar );
            
            // foo will stay bound to the click event
            $( "p" ).off( "click", bar );
            ```
- [事件处理函数内部](#)
    - todo
- [理解事件委托](#)
    - 介绍
        - 事件委托允许我们将事件侦听器附加到父元素，该元素将为匹配选择器的所有后代触发，无论这些后代现在是存在还是将来添加。
    - 示例
        - 普通的事件监听，对于后续新建的元素，不会自动应用事件处理程序
            ```html
            <html>
                <body>
                <div id="container">
                    <ul id="list">
                        <li><a href="http://domain1.com">Item #1</a></li>
                        <li><a href="/local/path/1">Item #2</a></li>
                        <li><a href="/local/path/2">Item #3</a></li>
                        <li><a href="http://domain4.com">Item #4</a></li>
                    </ul>
                </div>
                </body>
            </html>
            ```
            ```js
            // Attach a directly bound event handler
            $( "#list a" ).on( "click", function( event ) {
                event.preventDefault();
                console.log( $( this ).text() );
            });
            
            // Add a new element on to our existing list
            // 新添加的元素，不会应用click事件处理程序
            $( "#list" ).append( "<li><a href='http://newdomain.com'>Item #5</a></li>" );
            ```
    - 事件传播（Event Propagation）
        - 事件传播是事件委派的重要因素，借助上面例子，当点击`<a>`元素时，会触发器click事件，然后冒泡DOM树，触发每个父点击事件处理程序：
            - `<a>`
            - `<li>`
            - `<ul #list>`
            - `<div #container>`
            - `<body>`
            - `<html>`
            - `document root`
        - 这意味着，点击`<a>`，相当于有效的点击整个文档，这称为事件冒泡或事件传播；
        - 创建一个委托事件
            ```js
            // 目标：为<a>元素绑定click事件处理程序
            
            // 直接绑定
            $("#list a").on("click", function(event) {
                event.preventDefault();
                console.log($(this).text());
            });
            
            // 委托绑定
            $( "#list" ).on( "click", "a", function( event ) {
                event.preventDefault();
                console.log( $( this ).text() );
            });
            ```
        - 上例解释：
            - 直接绑定，是直接在`<a>`元素上添加click事件处理程序
            - 委托绑定，是在`<a>`元素的父元素上添加click事件处理程序
                - 当`<a>`元素上产生的Event冒泡到父元素上时，即$("#list")，其根据第二个参数 “a” 一起组合$("#list a")，判断该Event.target，即产生事件的DOM元素是否匹配，如果匹配则执行事件处理程序。（该分析，仅为猜测）
            - 委托绑定的优点就是，减少了绑定的数量，优化性能
    - 使用触发元素
        - 如果你需要在新窗口打开外部链接，该怎么办？（此处以 “http” 开头所示）
            ```js
            // Attach a delegated event handler
            $( "#list" ).on( "click", "a", function( event ) {
                var elem = $( this );
                if ( elem.is( "[href^='http']" ) ) {
                    elem.attr( "target", "_blank" );
                }
            });
            ```
        - 简化代码为：
            ```js
            // Attach a delegated event handler with a more refined selector
            $( "#list" ).on( "click", "a[href^='http']", function( event ) {
                $( this ).attr( "target", "_blank" );
            });
            ```
    - 小结
- [触发事件处理函数](#)
    - 概要
        - jQuery提供了方法`.trigger()`来触发绑定到元素上的事件处理程序，而不需要用户交互触发；
    - 什么事件处理程序可以被`.trigger()` 方法触发？
        - jQuery事件处理系统是一个基于本地浏览器事件的层；
        - 当使用jQuery添加事件处理程序时 `.on("click", function() {})`，那么可以用`.trigger()`触发它，另外也可以触发 `onclick` 属性中的代码；
        - 但是`.trigger()`不能用于模仿实际的本机浏览器事件；
            ```html
            <a href="http://learn.jquery.com">Learn jQuery</a>
            ```
            ```js
            // 不会生效
            // This will not change the current page
            $( "a" ).trigger( "click" );
            ```
    - 如果`.trigger()`方法不能模拟本地浏览器事件，那什么能模拟？
        - 若想要真正的触发一个本地浏览器事件，你必须使用`document.createEventObject`（ie9）或`document.createEvent`（其它浏览器）；
        - 使用这两个API，你可以以编程的方式创建一个事件，其行为等同于人交互触发的事件一般；
        - jQuery UI团队创建了[jquery.simulate.js](https://github.com/jquery/jquery-simulate/)，以简化触发本地浏览器事件以用于其自动化测试；
            ```js
            // Triggering a native browser event using the simulate plugin
            $( "a" ).simulate( "click" );
            ```
    - `.trigger()` VS `.triggerHandler()`
    - 不要用`.trigger()`去简单的执行特定函数
        ```js
        // Triggering an event handler the right way
        var foo = function( event ) {
            if ( event ) {
                console.log( event );
            } else {
                console.log( "this didn't come from an event!" );
            }
        };
        
        $( "p" ).on( "click", foo );
        
        foo(); // instead of $( "p" ).trigger( "click" )
        ```
    - 可以使用[jQuery插件](https://github.com/cowboy/jquery-tiny-pubsub)使用发布/订阅模式在触发器之上构造更复杂的体系结构；使用此技术，可用于通知代码
- [jQuery事件历史](#)
    - `.bind()`：jQuery v1.0 引入，已弃用
    - `.live()`：jQuery v1.3 引入，已弃用
    - `.delegate()`：jQuery v1.4.2 引入，已弃用
    - `.on()`：jQuery v1.7 引入
- [自定义事件介绍](#)
    - 定义事件
        - 一开始很难理解为什么你想要自定义事件，当内置事件看起来很适合你的需求时；
        - 事实证明，自定义事件提供了一种全新的思考事件驱动JS的方式；
        - todo
    - 命名自定义事件
        - 你可以为自定义事件使用任何名称，但是你应该注意谨防和未来DOM事件同名；
        - 因此，在文本中，我们选择使用`light:`这样的事件名称，因为未来的DOM规范不太可能使用冒号事件；
        - 回顾：`.on()`和`.trigger()`
            - 在自定义事件的世界中，有两个重要的jQuery方法：`.on()`和`.trigger()`；
            - 以下是两种情况下使用`.on()`和`.trigger()`使用自定义数据的示例
                ```js
                $( document ).on( "myCustomEvent", {
                    foo: "bar"
                }, function( event, arg1, arg2 ) {
                    console.log( event.data.foo ); // "bar"
                    console.log( arg1 );           // "bim"
                    console.log( arg2 );           // "baz"
                });
                
                $( document ).trigger( "myCustomEvent", [ "bim", "baz" ] );
                ```
    - 结论
        - 自定义事件提供了一种思考代码的新方法：它们强调行为的目标，而不是触发它的元素；
        - 如果您从一开始就花时间来说明您的应用程序的各个部分，以及这些部分需要展示的行为，那么自定义事件可以为您提供一种强大的方式来“跟踪”这些部分，一次一个或集体；
        - 一旦描述了一个片段的行为，从任何地方触发这些行为变得微不足道，允许快速创建和实验界面选项；
        - 最后，通过明确元素与其行为之间的关系，自定义事件可以增强代码的可读性和可维护性。
- [jQuery事件扩展](#)
    - todo

## 效果

- [概要](#)
    - jQuery可以为你的页面添加简单的效果。效果可以使用内置设置，或自定义持续时间，也可以通过CSS属性设置自定义动画；
- [效果简介](#)
- [使用 .animate() 自定义效果](#)
- [进队和出队说明](#)

## Ajax
## 插件
## 性能
## 代码组织

- [概要](#)
    - 构建应用程序的本质是理解如何组织代码，条理清晰、封装良好，而不是一大堆全局函数；
- [代码组织概念](#)
    - 概要
        - 当你不再仅仅使用jQuery向网站添加简单的功能，而是开始开发成熟的客户端应用程序时，你需要考虑如何组织代码；
        - 在本章中，我们将介绍可以在jQuery应用程序中使用的各种代码组织模式，并探索RequireJS依赖关系管理和构建系统；
    - 关键概念
        - 在我们深入研究代码组织模式之前，了解良好的代码组织模式共有的一些概念非常重要：
            - 你的代码应该分为功能单元。避免将所有代码放在一个巨大的`$(document).ready()`块中；
            - 不要重复。如果功能之间有相似之处，可以使用继承技术来避免重复代码；
            - 尽管jQuery以DOM为中心，但是JS应用程序不是所有都是关于DOM的，没有必要将所有功能代码都使用DOM表示；
            - 功能单元应该松散耦合，即功能单元应该能够独立存在，并且单元之间的通信应该通过消息传递系统来处理，例如自定义事件或发布/订阅。尽可能避免功能单元之间的直接通信；
    - 封装
        - 对象字面量
            - 对象字面量是封装代码的最简单的方法；
            - 这种封装，不提供私人属性或方法，都是公开的；
                ```js
                // An object literal
                var myFeature = {
                    myProperty: "hello",
                
                    myMethod: function() {
                        console.log( myFeature.myProperty );
                    },
                
                    init: function( settings ) {
                        myFeature.settings = settings;
                    },
                
                    readSettings: function() {
                        console.log( myFeature.settings );
                    }
                };
                
                myFeature.myProperty === "hello"; // true
                
                myFeature.myMethod(); // "hello"
                
                myFeature.init({
                    foo: "bar"
                });
                
                myFeature.readSettings(); // { foo: "bar" }
                ```
                ```js
                // Using an object literal for a jQuery feature
                var myFeature = {
                    init: function( settings ) {
                        myFeature.config = {
                            items: $( "#myFeature li" ),
                            container: $( "<div class='container'></div>" ),
                            urlBase: "/foo.php?item="
                        };
                
                        // Allow overriding the default config
                        $.extend( myFeature.config, settings );
                
                        myFeature.setup();
                    },
                
                    setup: function() {
                        myFeature.config.items
                            .each( myFeature.createContainer )
                            .click( myFeature.showItem );
                    },
                
                    createContainer: function() {
                        var item = $( this );
                        var container = myFeature.config.container
                            .clone()
                            .appendTo( item );
                        item.data( "container", container );
                    },
                
                    buildUrl: function() {
                        return myFeature.config.urlBase + myFeature.currentItem.attr( "id" );
                    },
                
                    showItem: function() {
                        myFeature.currentItem = $( this );
                        myFeature.getContent( myFeature.showContent );
                    },
                
                    getContent: function( callback ) {
                        var url = myFeature.buildUrl();
                        myFeature.currentItem.data( "container" ).load( url, callback );
                    },
                
                    showContent: function() {
                        myFeature.currentItem.data( "container" ).show();
                        myFeature.hideContent();
                    },
                
                    hideContent: function() {
                        myFeature.currentItem.siblings().each(function() {
                            $( this ).data( "container" ).hide();
                        });
                    }
                };
                
                $( document ).ready( myFeature.init );
                ```
        - 模块模式
            - 不同于“对象字面量”，模块模式不仅提供了公开的API，也提供了私人的属性和方法
            - 这种模式的实现，基于js“作用域/闭包”
                ```js
                    var feature = (function() {
                    
                    // Private variables and functions
                    var privateThing = "secret";
                    var publicThing = "not secret";
                
                    var changePrivateThing = function() {
                        privateThing = "super secret";
                    };
                
                    var sayPrivateThing = function() {
                        console.log( privateThing );
                        changePrivateThing();
                    };
                
                    // Public API
                    return {
                        publicThing: publicThing,
                        sayPrivateThing: sayPrivateThing
                    };
                })();
                
                feature.publicThing; // "not secret"
                
                // Logs "secret" and changes the value of privateThing
                feature.sayPrivateThing();
                ```
                ```js
                // Using the module pattern for a jQuery feature
                $( document ).ready(function() {
                    var feature = (function() {
                        var items = $( "#myFeature li" );
                        var container = $( "<div class='container'></div>" );
                        var currentItem = null;
                        var urlBase = "/foo.php?item=";
                
                        var createContainer = function() {
                            var item = $( this );
                            var _container = container.clone().appendTo( item );
                            item.data( "container", _container );
                        };
                
                        var buildUrl = function() {
                            return urlBase + currentItem.attr( "id" );
                        };
                
                        var showItem = function() {
                            currentItem = $( this );
                            getContent( showContent );
                        };
                
                        var showItemByIndex = function( idx ) {
                            $.proxy( showItem, items.get( idx ) );
                        };
                
                        var getContent = function( callback ) {
                            currentItem.data( "container" ).load( buildUrl(), callback );
                        };
                
                        var showContent = function() {
                            currentItem.data( "container" ).show();
                            hideContent();
                        };
                
                        var hideContent = function() {
                            currentItem.siblings().each(function() {
                                $( this ).data( "container" ).hide();
                            });
                        };
                
                        items.each( createContainer ).click( showItem );
                
                        return {
                            showItemByIndex: showItemByIndex
                        };
                    })();
                
                    feature.showItemByIndex( 0 );
                });
                ```
        - 面向对象：Class
- [注意匿名函数](#)
    - 代码中到处匿名函数是一种痛苦，它们很难调试，维护，测试或重用；可以使用对象字面量来组织和命名处理函数；
        ```js
        // BAD
        $( document ).ready(function() {
        
            $( "#magic" ).click(function( event ) {
                $( "#yayeffects" ).slideUp(function() {
                    // ...
                });
            });
        
            $( "#happiness" ).load( url + " #unicorns", function() {
                // ...
            });
        
        });
        
        // BETTER
        var PI = {
        
            onReady: function() {
                $( "#magic" ).click( PI.candyMtn );
                $( "#happiness" ).load( PI.url + " #unicorns", PI.unicornCb );
            },
        
            candyMtn: function( event ) {
                $( "#yayeffects" ).slideUp( PI.slideCb );
            },
        
            slideCb: function() { ... },
        
            unicornCb: function() { ... }
        
        };
        
        $( document ).ready( PI.onReady );
        ```
- [Keep Things DRY](#)
    - 不要重复代码，重复代码，那你就错了
        ```js
        // BAD
        if ( eventfade.data( "currently" ) !== "showing" ) {
            eventfade.stop();
        }
        
        if ( eventhover.data( "currently" ) !== "showing" ) {
            eventhover.stop();
        }
        
        if ( spans.data( "currently" ) !== "showing" ) {
            spans.stop();
        }
        
        // GOOD!!
        var elems = [ eventfade, eventhover, spans ];
        
        $.each( elems, function( i, elem ) {
            if ( elem.data( "currently" ) !== "showing" ) {
                elem.stop();
            }
        });
        ```
- [Feature & Browser Detection](#)
    - 有几种用的方法可以检查用户浏览器是否支持某种特定功能
        - 浏览器UA检测
            - 不建议：因为标以外的其他浏览器可能会遇到相同的问题；用户代理不可靠；
        - 特定特征检测
            - 方法：
                - 直接写js判断
                - 借助已有的第三方库
- [Deferreds](#)
    - 类似于“Promise”，详情查看[jQuery Deferred](https://www.jquery123.com/category/deferred-object/)

## jQuery UI
## jQuery Mobile

