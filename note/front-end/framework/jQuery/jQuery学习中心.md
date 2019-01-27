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
            - `.html()`
    - 移动，复制和删除元素
    - 克隆元素
    - 删除元素
    - 创建新元素
    - 操纵属性
- [jQuery对象（The jQuery Object）](#)
- [Traversing](#)
- [CSS, Styling, & Dimensions](#)
- [Data Methods](#)
- [Utility Methods](#)
- [Iterating over jQuery and non-jQuery Objects](#)
- [Using jQuery’s .index() Function](#)



## 事件
## 效果
## Ajax
## 插件
## 性能
## 代码组织
## jQuery UI
## jQuery Mobile

