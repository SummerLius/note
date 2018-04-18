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
    - [框架、框架模式、架构、设计模式](#框架框架模式架构设计模式)
    - [mvc、mvp、mvvm框架模式](#mvcmvpmvvm框架模式)
    - [node-sass、gulp-sass等不同node版本安装](#node-sassgulp-sass等不同node版本安装)
    - [块级盒和行内级盒](#块级盒和行内级盒)
    - [深入理解BFC和外边距合并、折叠以及解决方法](#深入理解bfc和外边距合并折叠以及解决方法)
    - [子元素自适应占满父元素的高度](#子元素自适应占满父元素的高度)
    - [标签可以继承的属性](#标签可以继承的属性)

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
    - `<img>`: inline
    - `<video>`: inline
    - `<span>`: inline
    - `<input>`:
        - type=text: inline-block
        - type=submit: inline-block
        - type=file: inline-block
        - ...
        - 绝大部分type均是inline-block，基本上均是inline-*
        - ...
        - type=date: inline-flex
        - ...
    - `<textarea>`: inline-block
    - ``: 

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

## 框架、框架模式、架构、设计模式

以下仅简单的理解，非权威：
- `框架`：是具有实体的一套代码等，例如vue
- `框架模式`：是一套抽象的框架设计的模式，例如vue.js框架是按照mvvm模式来设计的，框架模式有mvc、mvp、mvvm......
    - > `框架模式`不是一门写代码的学问，而是一门管理与组织代码的学问。其本质是一种软件开发模型。与`设计模式`不同，设计模式是在解决一类问题时总结抽象出的公共方法，它们与某种具体的技术栈无关。一种框架模式往往使用了多种设计模式，切记不要搞混。
- `架构`：架构是一个项目体系完整的蓝图，涉及到前端、客户端、后台服务等全部
- `设计模式`：也是模式，故也是一套抽象的设计理念。但感觉其比 “框架模式” 要具体一点，例如“框架模式” 是指导框架的设计，而 “设计模式” 可能是指导框架里面一个业务逻辑的设计。当然关于设计模式目前没做深入的理解，可能理解有些出入，仅供参考。


> 具体说法不一定，也有说mvc是软件架构。

> 感觉，详细的知识可以看一下，“框架/架构” 相关的书籍

## mvc、mvp、mvvm框架模式

- mvc
    - Model-View-Controller
- mvp
    - Model-View-Presenter
- mvvm
    - Model-View-ViewModel
- 参考
    - http://web.jobbole.com/89314/
    - http://www.cnblogs.com/indream/p/3602348.html
    - https://www.cnblogs.com/onepixel/p/6034307.html

## node-sass、gulp-sass等不同node版本安装

查看node-sass包针对不同node版本产生的问题
- node8.4.0 ==> node-sass@/vender/win32-64-57
- node6.9.4 ==> node-sass@/vender/win32-64-48
- node7.6.0 ==> node-sass@/vender/win32-64-51
- 知道了这个，对于前端使用的打包、编译等工程化的处理就不需要安装多个node版本来兼容了，只需要安装一个即可，只是node-sass/vender文件要注意

## 块级盒和行内级盒

1. 块级盒
    - 块级元素：是源文档中那些被格式化成视觉上的块的元素（例如，段落）
    - 每个块级元素生成一个主块级盒（principal block-level box），用来包含后代盒及生成的内容，并且任何定位方案都与该盒有关。有些块级元素可能会生成除主盒外的额外的盒：list-item元素，这些额外的盒根据主盒来放置。
    - 块级盒是参与块格式化上下文BFC的盒
    - 块级盒与块容器盒关系：
        1. 除了表格盒与替换元素外，一个块级盒也是块容器盒
        2. 不是所有的块容器盒都是块级盒：非替换的行内块（inline-block）与非替换的表格单元是块级容器，但不是块级盒。
        3. 作为块级容器的块级盒也叫块盒
    - 术语：
        - 块级盒：block-level box
        - 块容器盒：block container box
        - 块盒：block box
        - 块：block 在上面三个术语没有歧义的场景下，可以简称为“块”
2. 行内级盒
    - 行内级元素：源文档中那些不会形成新内容块的元素
    - 行内级元素生成行内级盒
    - 行内级盒，是参与行格式化上下文ifc的盒
    - 行内级盒分类：
        1. 行内盒：dispaly属性为inline的非替换元素，例如a、span等
            - 行内盒元素，其widht、height、padding/margin-top/bottom等属性都不生效，仅padding/maring-left/right生效
        2. 原子行内级盒：非行内盒，即为原子行内级盒，例如img、display为inline-block、inline-table的元素等
            - 原子行内级盒元素，其width、height、padding、margin属性正常生效
            - > 虽然标准里面没有，但是要注意：原子行内级盒，其里面也是有区别的，例如非替换的inline-block含有块容器盒，里面有bfc环境，而img元素里面不含块容器盒，里面没有bfc环境
    - 术语
        - 内联、行内：inline
        - 内联/行内级盒：inline-level box
        - 行内盒：inline box
        - 原子行内级盒：atomic inline-level box
3. 小节
    - 块级盒和行内级盒中，均有“块容器盒”

## 深入理解BFC和外边距合并、折叠以及解决方法


- 或查看自己整理的笔记，见font-end/html-css-js/css.md文档
- https://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html


**解决方法**：
1. 【首要方法】避免margin相邻的情况，可以从设计上面解决这个问题，（制定前端规范）
    - 尽量使用同一方向的margin，例如仅设置margin-top或margin-bottom
    - 或者使用padding、border等来代替margin的使用
2. 【次要方法】如果是已经margin相邻了，那么就破坏这种相邻（adjoining）的认定规则。具体的规则可以查看上面的笔记或链接。
    - 相邻的判定：
        1. 我们知道相邻情况有四种，垂直相邻：`兄弟`、`父与长子`、`父（height=auto）与幼子`、`空内容元素`
        2. 对元素的要求：`块级`、`处于同一BFC`、`margin之间相连中间没有间隔`
    - 破坏规则方法：
        1. 块级破坏
            - 使一方块级元素的display改为inline-block，同时width设置为100%，适用于兄弟和父子情况（更改display不是很好，破坏了可读性）
            - ...
        2. BFC破坏
            - 更改一方的BFC，例如float/absolute postion/overflow（not visible）/ block containers that are not block boxes（eg. inline-block），主要适用于父子情况
        3. 隔点东西
            - 设置padding、border使父子的margin隔开
            - 隔点元素，适用于兄弟或父子
                - 例如像这样：`<div style="font-size:0;height:0;visibility:hidden">xxx</div>`，注意要使用visibility:hidden而不是display:none，因为前者在文档中存在，而后则在文档中不存在
                - 注意：**完全空内容的元素 会忽略或合并掉而不起作用**，例如空元素`<div style="padding:0;margin:0;"></div>`是不会起作用的，


## 子元素自适应占满父元素的高度


- 基本格式：
    ```html
    <!-- 基本格式 -->
    <div style="overflow: hidden;">
        <div style="height:300px;margin-bottom:-10000px;padding-bottom:10000px;"></div>
        <div></div>
    </div>
    ```
- 目的：
    - 由于padding设置的很高，所以无论父元素的height是auto还是固定值，其看起来总会占满整个父元素，达到自适应父元素高度的布局效果
- 基本原理：
    - 首先设置了margin和padding的这个div，对其他元素来说其大小只是height的值，浏览器也按照其height尺寸依次布局，因为从布局的角度来看他的margin-bottom和padding-bottom抵消了
    - 虽然，从布局上其box模型大小就是height，但是从肉眼上看（如果给它设置了background的话；注意padding也会受背景影响），是能看到height+padding的，而此时其它元素是按照其只有height的尺寸来布局，所以padding部分是会遮住其它元素的
    - 所以，需要用一个父元素包裹，并给父元素设置overflow:hidden，使其padding部分的显示，被父元素拦截下来
 

## 标签可以继承的属性

- 规律：
    - 
- 可继承：
    - word-break
- 不可继承：
    - 




