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
    - [CSS @规则](#css-规则)
    - [在前端中，什么是框架？什么是库？](#在前端中什么是框架什么是库)
    - [框架解决了什么问题？框架存在的原因？](#框架解决了什么问题框架存在的原因)

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

## CSS @规则

[MDN 参考地址](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)

<!-- 规则:
- 嵌套@规则：是嵌套语句的子集，不仅可以作为样式表里面的一个语句，也可以用在条件规则组里。
- 条件规则组：
    1. 每条@规则都有不同的语法，不过一些@规则可以归为一类：**条件规则组**
    2. 这些语句使用相同的语法，它们都嵌套语句，它们都表达：它们所指的条件总等效于true或false，如果为true，那么它们里面的语句生效。 -->

@规则列表：
- `@charset`：
    1. 作用：定义样式表中使用的字符集。
    2. 它必须是样式表的第一个元素，而前面不得有任何字符。
    3. 因为它不是一个嵌套语句，所以不能在@规则条件组中使用。
    4. 如果由多个@charset规则被声明，只有第一个会被使用。
    5. 此@charset在某些CSS属性中，使用非ASCII字符时，非常有用，例如 content 属性
    6. 在样式表中有多种方法去声明字符编码，浏览器会按照以下顺序尝试下边的方法，一旦找到就停止并得出结果：
        1. 文件开头的 `Unicode byte-order` 字符值
        2. 由Content-Type: HTTP header 中的 charset 属性给出的值
        3. CSS @charset 规则
        4. 假设文档是UTF-8
        ```css
        @charset "UTF-8";
        @charset "utf-8";
        @charset "iso-8859-15";
        ```
- `@import`：
    1. 作用：告诉CSS引擎引入一个外部样式表
    2. @import规则必须先于所有其他类型的规则，@charset规则除外
    3. 其不是嵌套语句，@import不能在条件组规则中使用
    4. 用户代理可以避免为不支持的媒体类型检索资源，作者可以指定依赖媒体@import规则
    5. 这些条件导入在URI之后指定逗号分隔的媒体查询。在没有任何媒体查询的情况下，导入是无条件的。指定所有的媒体具有相同的效果。
        ```css
        @import url;
        @import url list-of-media-queries;
        ```
    6. url：表示要引入资源位置的地址。这个URL可以是绝对路径或相对路径。
    7. list-of-media-queries：是一个逗号分隔的 媒体查询 条件列表，决定通过URL引入的CSS规则在什么条件下应用。如果浏览器不支持列表中的任何一条媒体查询条件，就不会引入URL指明的CSS文件。
        ```css
        @import [ <string> | <url> ] [ <media-query-list> ]?;
        where 
        <media-query-list> = <media-query>#
        
        where 
        <media-query> = <media-condition> | [ not | only ]? <media-type> [ and <media-condition-without-or> ]?
        
        where 
        <media-condition> = <media-not> | <media-and> | <media-or> | <media-in-parens>
        <media-type> = <ident>
        <media-condition-without-or> = <media-not> | <media-and> | <media-in-parens>
        
        where 
        <media-not> = not <media-in-parens>
        <media-and> = <media-in-parens> [ and <media-in-parens> ]+
        <media-or> = <media-in-parens> [ or <media-in-parens> ]+
        <media-in-parens> = ( <media-condition> ) | <media-feature> | <general-enclosed>
        
        where 
        <media-feature> = ( [ <mf-plain> | <mf-boolean> | <mf-range> ] )
        <general-enclosed> = [ <function-token> <any-value> ) ] | ( <ident> <any-value> )
        
        where 
        <mf-plain> = <mf-name> : <mf-value>
        <mf-boolean> = <mf-name>
        <mf-range> = <mf-name> [ '<' | '>' ]? '='? <mf-value> | <mf-value> [ '<' | '>' ]? '='? <mf-name> | <mf-value> '<' '='? <mf-name> '<' '='? <mf-value> | <mf-value> '>' '='? <mf-name> '>' '='?         <mf-value>
        
        where 
        <mf-name> = <ident>
        <mf-value> = <number> | <dimension> | <ident> | <ratio>
        ```
        ```css
        @import url("fineprint.css") print;
        @import url("bluish.css") projection, tv;
        @import 'custom.css';
        @import url("chrome://communicator/skin/");
        @import "common.css" screen, projection;
        @import url('landscape.css') screen and (orientation:landscape);
        ```
- `@namespace`：
- 嵌套规则
    - `@media`
        1. @media规则可以根据一个或多个基于设备类型、具体特点和环境的媒体查询来应用样式
        2. 在CSS中，@media规则可以置于样式表代码的顶层，或位于其他任何@条件规则组内。
            ```css
            /* Media query */
            @media screen and (min-width: 900px) {
              html {
                font-size: 100px;
              }
            }
            
            /* Nested media query */
            @supports (display: flex) {
              @media screen and (min-width: 900px) {
                article {
                  display: flex;
                }
              }
            }
            ```
        3. 除了在css @media规则中使用外，媒体查询也可应用于html标签`<link>`以将样式表应用限于某个特定媒体
            ```html
            <!-- Media-dependent style sheet included in HTML -->
            <link rel="stylesheet" media="screen and (min-width: 900px)" href="widescreen-styles.css" />
            ```
        4. 媒体类型：
            - all：适用所有设备
            - print：
            - screen：彩色的电脑屏幕
            - speech：
            - 废弃的媒体类型，css2.1和媒体查询3定义了几种额外的媒体类型，（tty，tv、projection、handled，braille，embossed，aural），但它们在媒体查询4中被废弃因而不应被适用
        5. 媒体特性：
            - ...
    - `@page`
        1. 暂忽略
    - `@font-face`
        1. 作用：它允许网页开发者为其网页指定在线字体。通过这种作者自备字体的方式，@font-face可以消除对用户电脑字体的依赖。
        2. @font-face不仅可以放在CSS的最顶层，也可以放在@条件规则组中
        3. 语法
            ```css
            @font-face {
              [ font-family: <family-name>; ] ||
              [ src: [ <url> [ format(<string>#) ]? | <font-face-name> ]#; ] ||
              [ unicode-range: <urange>#; ] ||
              [ font-variant: <font-variant>; ] ||
              [ font-feature-settings: normal | <feature-tag-value>#; ] ||
              [ font-variation-settings: normal | [ <string> <number>] # ||
              [ font-stretch: <font-stretch>; ] ||
              [ font-weight: <weight>; ] ||
              [ font-style: <style>; ]
            }
            where 
            <family-name> = <string> | <custom-ident>+
            <feature-tag-value> = <string> [ <integer> | on | off ]?
            ```
            ```css
            /* gujarati */
            @font-face {
              font-family: 'Kumar One Outline';
              font-style: normal;
              font-weight: 400;
              src: local('Kumar One Outline'), local('KumarOneOutline-Regular'), url(https://fonts.gstatic.com/s/kumaroneoutline/v3/Noao6VH62pyLP0fsrZ-v18wlUEcX9wDsTwqMEA.woff2) format('woff2');
              unicode-range: U+0964-0965, U+0A80-0AFF, U+200C-200D, U+20B9, U+25CC, U+A830-A839;
            }
            /* latin-ext */
            @font-face {
              font-family: 'Kumar One Outline';
              font-style: normal;
              font-weight: 400;
              src: local('Kumar One Outline'), local('KumarOneOutline-Regular'), url(https://fonts.gstatic.com/s/kumaroneoutline/v3/Noao6VH62pyLP0fsrZ-v18wlUEcX9wD5TwqMEA.woff2) format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Kumar One Outline';
              font-style: normal;
              font-weight: 400;
              src: local('Kumar One Outline'), local('KumarOneOutline-Regular'), url(https://fonts.gstatic.com/s/kumaroneoutline/v3/Noao6VH62pyLP0fsrZ-v18wlUEcX9wD3Two.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            ```
    - `@keyframes`
    - `@supports`
    - `@document`

## 在前端中，什么是框架？什么是库？

- 前端项目中的角色有：
    - 开发者的代码：
        - 遵循框架的规范下进行开发，处理具体的业务代码
        - 在项目中，可以调用库，本身被框架调用
    - 库：
        - 是具体的
        - 是解决某一类问题，而封装起来的函数集、对象集或类集等，可以认为是项目使用的一种工具
        - 不影响项目的整体结构
        - 在项目中，是被调用方，没有控制权
    - 框架：
        - “框架就是制定一套规范或者规则（思想），大家（程序员）在该规范或者规则（思想）下工作”
        - 对前端来说，框架还可能进一步划分为js框架，css框架（这种说法待商榷）
        - 对前端来说，框架是针对设计html（结构）、js（行为）和css（表现）这三者如何开发、运行、配合的一种结构设计
            - 使项目开发上更加便利、清晰、复用等
            - 使浏览器运行上，更好的相互作用、配合
            - **思考**：此处抽象的说了下框架的作用，但是框架具体解决了前端什么问题？为什么要用它？
        - 是项目的骨架，是项目的主动方，调用库、调用开发者代码等
        - 框架的设计一般也会遵循一定的框架模式，例如mvc、mvp、mvvm等
    - 等等其他角色
- 参考
    - https://www.cnblogs.com/coco1s/p/4040108.html
    - https://zhuanlan.zhihu.com/p/26078359
    - https://stackoverflow.com/questions/148747/what-is-the-difference-between-a-framework-and-a-library?noredirect=1&lq=1#answer-148788

## 框架解决了什么问题？框架存在的原因？

- 为什么要有框架
    > 尤雨溪  
    > - 框架的存在是为了帮助我们应对复杂度
    >   - 前端框架特别多，那么为什么要有框架呢？我个人的看法是，框架的存在是为了帮助我们应对复杂度。当我们需要解决一些前端上工程问题的时候，这些问题会有不同的复杂度。
    >   - 如果你用太简陋的工具应对非常复杂的需求，就会极大地影响你的生产力。所以，框架本身是帮我们把一些重复的并且已经受过验证的模式，抽象到一个已经帮你设计好的API封装当中，帮助我们去应对这些复杂的问题。
- 现代 js 框架存在的根本原因
    > Alberto Gimeno
    > - 前端项目的复杂度中最重要的一点是：**UI 与状态同步非常困难**
    >   - 详细可以参考[该中文地址](http://web.jobbole.com/94756/)
    >   - 这篇文章最后的结论
    >       - 现代 js 框架解决的主要问题是保持 UI 与状态同步。
    >       - 使用原生 JavaScript 编写复杂、高效而又易于维护的 UI 界面几乎是不可能的。
    >       - Web components 并未提供解决同步问题的方案。
    >       - 使用现有的虚拟 DOM 库去搭建自己的框架并不困难。但并不建议这么做！


- 参考
    - https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445
    - http://web.jobbole.com/94756/
    - https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA%3D%3D&mid=2650994529&idx=1&sn=953bf1d92cc2a7b278d0761d3e433803&chksm=bdbf0f328ac886245652735e4dfa1b39b1357b9f36ccf1b337714ac81810f8441d189ce89615


