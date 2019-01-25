<!-- TOC -->

- [概述](#概述)
- [基本语法](#基本语法)
    - [选择器](#选择器)
    - [事件](#事件)
- [参考](#参考)

<!-- /TOC -->

## 概述

jQuery 是一个高效、精简并且功能丰富的 JavaScript 工具库。它提供的 API 易于使用且兼容众多浏览器，这让诸如 HTML 文档遍历和操作、事件处理、动画和 Ajax 操作更加简单。

也就是jQuery是对原生DOM API的包装，所以其提供的功能都是基于DOM，提供了：
- HTML 元素选取
- HTML 元素操作
- CSS 操作
- HTML 事件函数
- Javascript 特效和动画
- HTML DOM 遍历和修改
- AJAX
- Utilities
- ...

## 基本语法

- 功能：通过jQuery，可以选取HTML元素，并对它们执行操作。
- 基础语法：**`$(selector).action()`**
    - 美元符号定义jQuery
    - 选择符（selector）查询HTML元素，jQuery选择器的语法是XPath和CSS选择器语法的组合。
    - jQuery的action()执行对元素的操作
- 文档就绪函数：
    - 我们编写的js函数要注意时间点
    - `$(document).ready(){ xxxx }`：该代码作用是，在文档完全加载完后，才执行里面的代码
    - 如果在文档还没有加载完前就运行函数，可能会操作失败，例如视图隐藏一个不存在的元素、获得未完全加载的图像的大小、等等

### 选择器

大概和CSS选择器类似，不详述

### 事件

事件处理模块，也是jQuery框架比较重要的一部分。

详情可以直接参考jQuery API
- [w3c](http://www.w3school.com.cn/jquery/jquery_reference.asp)
- [jQuery 中文](https://www.jquery123.com/)

由于jQuery是为了处理HTML事件而特别设计的，那么当你遵循一下原则时，你的代码会更恰当且易维护：
- 把所有的jQuery代码置于事件处理函数中
- 把所有事件处理函数置于文档就绪事件处理器中
- 把jQuery代码置于单独的.js文件中
- 如果存在名称冲突，则重命名jQuery库


事例：
```javascript
$(document).ready(function);
$(selector).click(function);
$(selector).dblclick(function);
$(selector).focus(function);
$(selector).mouseover(function);
...
```
## 参考

- [w3school jQuery](http://www.w3school.com.cn/jquery/index.asp)
- [jQuery123：中文API](https://www.jquery123.com/)
- [jQuery官网：插件](http://plugins.jquery.com/)
- [jQuery官网：API](https://api.jquery.com/)
- [JQuery官网：学习中心](https://learn.jquery.com/)
- [其它网站：jQuery API 中文文档](https://www.html.cn/jqapi-1.9/)


