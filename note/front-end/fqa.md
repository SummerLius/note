<!-- TOC -->

- [问题集结](#问题集结)
    - [IE兼容判断处理](#ie兼容判断处理)
    - [shortcut icon 和 icon 的区别?](#shortcut-icon-和-icon-的区别)
    - [display：inline block inline-block的区别，以及float](#displayinline-block-inline-block的区别以及float)
    - [替换元素和非替换元素](#替换元素和非替换元素)
    - [各种元素width height margin padding特性](#各种元素width-height-margin-padding特性)
    - [清除浮动](#清除浮动)
    - [html标签默认对应的display属性值](#html标签默认对应的display属性值)
    - [web单页面应用与多页面应用的区别，以及应用场景的不同](#web单页面应用与多页面应用的区别以及应用场景的不同)
    - [mvc、mvp、mvvm等模型区别](#mvcmvpmvvm等模型区别)
    - [word-break与word-wrap区别](#word-break与word-wrap区别)
    - [margin负值应用](#margin负值应用)

<!-- /TOC -->

# 问题集结

## IE兼容判断处理

IE对于HTML文档支持这样一种语法：条件注释 `<!--[if lt IE 8]>`xxx`<![endif]-->`

IE会判断版本，如果if判断为true则其中内容`xxx`生效，否则当作注释。

而其它浏览器不会识别这种语法，直接当作注释，所以该代码仅对IE起作用。


```html
<!--[if lt IE 8]>

这里自定义兼容处理，或给出版本过低提示，或引入js脚本兼容处理等等

<div class="low-v-tip">
    版本过低
</div>

<script src="http://xxxx/compat.js" type="text/javascript"></script>

<![endif]-->
```

## shortcut icon 和 icon 的区别?

待整理

## display：inline block inline-block的区别，以及float

- **block**
    - block元素会独占一行，默认情况下，block元素宽度自动填满父元素宽度
    - block元素可以设置width、height属性。block元素即使设置了width，仍然独占一行。
    - block元素可以设置，margin和padding属性
- **inline**
    - inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化
    - inline元素设置width、height属性无效
    - inline元素的margin和padding属性：
        - 水平方向**会**产生边距效果：padding-left、padding-right、margin-left、margin-right
        - 竖直方向**不会**产生边距效果：padding-top、padding-bottom、margin-top、maring-bottom
- **inline-block**
    - 具备inline的同行特性
    - 具备block的设置width、height、padding、margin特性
    - inline-block的宽度不会占满父元素的宽度，而是根据元素内容自适应

float设置后特性：
- 只要是设置了float样式的元素，都会变为块级框，类似与inline-block

## 替换元素和非替换元素

元素可分类两类：
- 不可替换元素：
    - 大多数元素是不可替换元素，即其内容直接表现给浏览器
- 替换元素：
    - 替换元素会根据元素的标签和属性，来决定元素的具体显示
    - img、input、textarea、select、object等等都是替换元素。这些元素往往没有实际的内容，即是一个空元素，浏览器会根据元素的标签类型和属性来显示这些元素
    - 例子：
        - 浏览器会根据`<img>`标签的`src`属性的值来读取图片信息并显示出来，如果直接查看`html`代码是看不到图片的实际内容、尺寸
        - 浏览器会根据`<input>`标签的`type`属性来决定是显示输入框、还是单选按钮等

## 各种元素width height margin padding特性

- 块级元素
    - width、height、margin、padding都正常作用，例如div
- 行内替换元素
    - width、height、margin、padding都正常作用，例如img
- 行内非替换元素
    - width、height不起作用，用line-height控制高度
    - padding左右作用，上下不起作用
    - margin左右作用，上下不起作用

## 清除浮动

- 网上博客
    - http://www.daqianduan.com/3606.html
    - https://segmentfault.com/q/1010000005947736?_ea=960916
    - http://blog.csdn.net/FE_dev/article/details/68954481


解决办法，方案有很多中，主要常用两种：
1. 使用overflow:auto|hidden
    - 注意：overflow比:after可以兼容的更低
2. 使用:after，clear:both
    - 注意:after仅兼容到ie8，::after仅兼容到ie9

## html标签默认对应的display属性值

首先display的可选值有：
- 基本值（css1）：
    - none：使元素不显示
    - block：使元素显示为块级元素，前后会带有换行符
    - inline：默认。使元素显示为内联元素，前后没有换行符
    - list-item：
- 扩展值（css2.1）
    - inline-block：
- 表格模型值（css2.1）
    - inline-table
    - table
    - table-caption
    - table-cell
    - table-column
    - table-column-group
    - table-footer-group
    - table-header-group
    - table-row
    - table-row-table
- 其它值（css3）
    - flex
    - inline-flex
    - grid
    - inline-grid
    - ...

常见标签对应display值：
- 表格table
    - `<table>`：table
    - `<thead>`：table-header-group
    - `<tbody>`：table-row-group
    - `<tfoot>`：table-footer-group
    - `<caption>`：table-caption
    - `<tr>`：table-row
    - `<th>`：table-cell
    - `<td>`：table-cell
    - `<col>`：
    - `<colgroup>`：`col`、`colgroup`标签，兼容不佳，暂不做了解
- 列表list
    - `<ul>`：block
    - `<ol>`：block
    - `<li>`：list-item
    - `<dir>`：已废弃
    - `<dl>`：block
    - `<dt>`：block
    - `<dd>`：block
    - `<menu>`：该标签目前兼容不佳，暂不做了解
    - `<menuitem>`：该标签目前兼容不佳，暂不做了解
    - `<command>`：该标签目前兼容不佳，暂不做了解
- 表单
- 其它
    - `<img>`：inline
    - `<span>`：inline
    - ``：
    - ``：
    - ``：

## web单页面应用与多页面应用的区别，以及应用场景的不同

临时记录，后续整理
- [react.js,angular.js,vue.js学习哪个好？](https://www.zhihu.com/question/39943474)
- [SPA单页应用模式目前挺热，很多项目网站都在用，为何去哪儿百度淘宝等完全有能力支持的技术团队却没采用？](https://www.zhihu.com/question/31782625?sort=created)
- [简书： 单页应用 VS 多页应用](https://www.jianshu.com/p/035bc1d53810)
- [多页和单页应用模式区别](http://blog.csdn.net/u013291076/article/details/53667382)
- [徐峰：构建单页Web应用](https://github.com/xufei/blog/issues/5)

## mvc、mvp、mvvm等模型区别

待整理

## word-break与word-wrap区别

待整理：
- `word-break: break-all`
- `word-wrap: break-word`

## margin负值应用

- https://www.w3cplus.com/css/the-definitive-guide-to-using-negative-margins.html


