<!-- TOC -->

- [less](#less)
    - [概要](#概要)
    - [新手指南](#新手指南)
        - [快速入门](#快速入门)
        - [使用方法](#使用方法)
        - [下载](#下载)
        - [许可证](#许可证)
    - [语言特性](#语言特性)
        - [概述](#概述)
        - [变量](#变量)
        - [继承](#继承)
        - [混入](#混入)
        - [参数混入](#参数混入)
        - [Mixins as Functions](#mixins-as-functions)
        - [Passing Rulesets to Mixins](#passing-rulesets-to-mixins)
        - [导入命令](#导入命令)
        - [导入选项](#导入选项)
        - [Mixin Guards](#mixin-guards)
        - [CSS Guards](#css-guards)
        - [循环](#循环)
        - [合并](#合并)
        - [父选择器](#父选择器)
    - [函数手册](#函数手册)

<!-- /TOC -->

# less

## 概要

- [官网](http://lesscss.org/)
- [中文网](http://lesscss.cn/)
- [Github](https://github.com/less/less.js)

## 新手指南

### 快速入门

- less是一门css预处理语言，它扩展了css语言，增加了变量、mixin、函数等特性，使用css更易维护和扩展。
- less可以运行在Node或浏览器端。

### 使用方法

- 安装：`npm install -g less`
- 命令行用法：`lessc styles.less styles.css`
- 代码用法：`var less = require('less')`
- 浏览器用法：
    - `<link rel="stylesheet/less" type="text/css" href="styles.less" />`
    - `<script src="less.js" type="text/javascript"></script>`

### 下载

### 许可证

## 语言特性

### 概述

- 变量
    ```less
    @nice-blue: #5B83AD;
    @light-blue: @nice-blue + #111;
    
    #header {
      color: @light-blue;
    }
    ```
    ```css
    #header {
      color: #6c94be;
    }
    ```
- 混入
    ```less
    .bordered {
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }
    
    #menu a {
      color: #111;
      .bordered;
    }
    
    .post a {
      color: red;
      .bordered;
    }
    ```
    ```css
    .bordered {
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }
    #menu a {
      color: #111;
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }
    .post a {
      color: red;
      border-top: dotted 1px black;
      border-bottom: solid 2px black;
    }
    ```
- 嵌套规则
    ```less
    // 嵌套写法
    #header {
      color: black;
      .navigation {
        font-size: 12px;
      }
      .logo {
        width: 300px;
      }
    }
    ```
    ```css
    /* 普通写法 */
    #header {
      color: black;
    }
    #header .navigation {
      font-size: 12px;
    }
    #header .logo {
      width: 300px;
    }
    ```
    - 嵌套写法中：`&` 字符代表当前选择器的父级
        ```less
        .clearfix {
          display: block;
          zoom: 1;
        
          &:after {
            content: " ";
            display: block;
            font-size: 0;
            height: 0;
            clear: both;
            visibility: hidden;
          }
        }
        ```
        ```css
        .clearfix {
          display: block;
          zoom: 1;
        }
        .clearfix:after {
          content: " ";
          display: block;
          font-size: 0;
          height: 0;
          clear: both;
          visibility: hidden;
        }
        ```
- 嵌套命令和冒泡
    - 像`media`或`keyframe`的指令也可以像选择器一样嵌套。
    - 指令位于顶部，相对于同一规则集内的其它元素的相对顺序保持不变。这叫做冒泡。
    - 条件指令，例如`@Media`、`@supports`、`@document`，也会将选择器复制到其内部：
        ```less
        .screen-color {
          @media screen {
            color: green;
            @media (min-width: 768px) {
              color: red;
            }
          }
          @media tv {
            color: black;
          }
        }
        ```
        ```css
        @media screen {
          .screen-color {
            color: green;
          }
        }
        @media screen and (min-width: 768px) {
          .screen-color {
            color: red;
          }
        }
        @media tv {
          .screen-color {
            color: black;
          }
        }
        ```
    - 其它非条件指令，例如`font-face`、`keyframes`也会被冒泡。但是其内部不会改变，不像条件指令将选择器复制到里面。
        ```less
        // less
        #a {
          color: blue;
          @font-face {
            src: made-up-url;
          }
          padding: 2 2 2 2;
        }
        ```
        ```css
        #a {
          color: blue;
        }
        @font-face {
          src: made-up-url;
        }
        #a {
          padding: 2 2 2 2;
        }
        ```
- 操作符
    - 算术操作符（`+`，`-`，`*`，`/`）可以操作任何数字、颜色或变量
    - 可能的话，算数运算会考虑单位的转换，会在添加、减去、比较等操作之前转换数字
    - 如果单位的转换不可能或没有意义，则忽略单位。例如px转换到cm
        ```less
        // numbers are converted into the same units
        @conversion-1: 5cm + 10mm; // result is 6cm
        @conversion-2: 2 - 3cm - 5mm; // result is 1.5cm
        
        // conversion is impossible
        @incompatible-units: 2 + 5px - 3cm; // result is 4px
        
        // example with variables
        @base: 5%;
        @filler: @base * 2; // result is 10%
        @other: @base + @filler; // result is 15%
        ```
    - `*` 和 `/` 不会根据单位转换数字
        ```less
        @base: 2cm * 3mm; // result is 6cm
        ```
    - 颜色值会被分为：红、绿、蓝、透明四个维度。对颜色的算术操作会具体应用到这四个维度上运算。
    - > 注意：未定义对透明度（alpha）的算术运算，因为对颜色的数学运算没有标准的商定含义。不要依赖当前的实现，因为它可能会在以后的版本中发生变化。
    - 对颜色的操作总会产生一个有效值，rgb会自动限制在`[00, ff]`范围内，alpha会自动限制在`[00, 1.0]`
        ```less
        @color: #224488 / 2; //results in #112244
        background-color: #112244 + #111; // result is #223355
        ```
- 转义
    - 转义允许您使用任意字符串作为属性或变量值
    - 内部的任何内容 `~"anything"` 或 `~'anything'` 都是按原样使用，除了插值（interpolation）。
        ```less
        // less
        .weird-element {
          content: ~"^//* some horrible but needed css hack";
        }
        ```
        ```css
        <!-- css -->
        .weird-element {
          content: ^//* some horrible but needed css hack;
        }
        ```
- 函数
    - less提供了各种函数，可以转换颜色，操作字符串和进行数学运算。
    - 使用它们非常简单。以下示例使用百分比将0.5％转换为50％，将基色的饱和度增加5％，然后将背景颜色设置为减轻25％并旋转8度的颜色：
        ```less
        @base: #f04615;
        @width: 0.5;
        
        .class {
          width: percentage(@width); // returns `50%`
          color: saturate(@base, 5%);
          background-color: spin(lighten(@base, 25%), 8);
        }
        ```
- 命名空间和访问器
    - （不要与CSS @namespace或命名空间选择器混淆）
    - 有时，您可能希望将mixin分组，用于组织目的，或者仅提供一些封装。你可以在Less中非常直观地做到这一点，比如你想在#bundle下捆绑一些mixins和变量，以便以后重用或分发：
        ```less
        #bundle {
          .button {
            display: block;
            border: 1px solid black;
            background-color: grey;
            &:hover {
              background-color: white
            }
          }
          .tab { ... }
          .citation { ... }
        }
        ```
    - 现在，如果我们想在#header a中混合.button类，我们可以：
        ```less
        #header a {
          color: orange;
          #bundle > .button;
        }
        ```
- 范围
    - Less中的Scope与编程语言非常相似。首先在本地查找变量和mixin，如果找不到它们，编译器将查找父作用域，依此类推。
        ```less
        @var: red;

        #page {
          @var: white;
          #header {
            color: @var; // white
          }
        }
        ```
    - 变量和mixin在使用之前不必声明，因此以下Less代码与前面的示例相同：
        ```less
        @var: red;

        #page {
          #header {
            color: @var; // white
          }
          @var: white;
        }
        ```
- 注释
    - 可以使用块样式和内联注释
        ```less
        /* One hell of a block
        style comment! */
        @var: red;
        
        // Get in line!
        @var: white;
        ```
- 导入
    - 导入工作几乎与预期一致。您可以导入.less文件，其中的所有变量都可用。可以选择为.less文件指定扩展名。
        ```less
        @import "library"; // library.less
        @import "typo.css";
        ```

<!-- 

```less
```
```css
```
 -->

### 变量

- 概述
    - 在样式表中看到相同的值重复数十甚至数百次，这种情况并不罕见：
        ```css
        a,
        .link {
          color: #428bca;
        }
        .widget {
          color: #fff;
          background: #428bca;
        }
        ```
    - 通过为您提供从单个位置控制这些值的方法，变量使您的代码更易于维护：
        ```less
        // Variables
        @link-color:        #428bca; // sea blue
        @link-color-hover:  darken(@link-color, 10%);
        
        // Usage
        a,
        .link {
          color: @link-color;
        }
        a:hover {
          color: @link-color-hover;
        }
        .widget {
          color: #fff;
          background: @link-color;
        }
        ```
- 变量插值
    - 上面的示例着重于使用变量来控制CSS规则中的值，但它们也可以在其他地方使用，例如选择器名称，属性名称，URL和@import语句。
- 选择器
    - 变量用作选择器名称
        ```less
        // Variables
        @my-selector: banner;
        
        // Usage
        .@{my-selector} {
          font-weight: bold;
          line-height: 40px;
          margin: 0 auto;
        }
        ```
    - 编译为：
        ```css
        .banner {
          font-weight: bold;
          line-height: 40px;
          margin: 0 auto;
        }
        ```
- URLs
    - 变量用在URLs上
        ```less
        // Variables
        @images: "../img";
        
        // Usage
        body {
          color: #444;
          background: url("@{images}/white-sand.png");
        }
        ```
- 导入语句
    - 变量用在导入语句上
    - 语法：`Syntax: @import "@{themes}/tidal-wave.less"`
    - 请注意，在v2.0.0之前，只考虑在根或当前作用域中声明的变量，并且在查找变量时仅考虑当前文件和调用文件。
        ```less
        // Variables
        @themes: "../../src/themes";
        
        // Usage
        @import "@{themes}/tidal-wave.less";
        ```
- 属性
    - 变量用在属性上
        ```less
        @property: color;
        
        .widget {
          @{property}: #0ee;
          background-@{property}: #999;
        }
        ```
    - 编译为：
        ```css
        .widget {
          color: #0ee;
          background-color: #999;
        }
        ```
- 变量名
    - 变量用在变量名上
        ```less
        @fnord: "I am fnord";
        @var: "fnord";
        content: @@var;
        ```
    - 编译为：
        ```css
        content: "I am fnord";
        ```
- 懒加载
    - 变量是延迟加载的，不必在使用之前声明
    - 以下均为有效
        ```less
        .lazy-eval {
          width: @var;
        }
        
        @var: @a;
        @a: 9%;
        ```
        ```less
        .lazy-eval {
          width: @var;
          @a: 9%;
        }
        
        @var: @a;
        @a: 100%;
        ```
    - 两个都会编译为：
        ```less
        .lazy-eval-scope {
          width: 9%;
        }
        ```
    - 义变量两次时，使用变量的最后一个定义，从当前范围向上搜索。这与css本身类似，其中定义中的最后一个属性用于确定值。
    - 例如：
        ```less
        @var: 0;
        .class {
          @var: 1;
          .brass {
            @var: 2;
            three: @var;
            @var: 3;
          }
          one: @var;
        }
        ```
    - 编译为：
        ```css
        .class {
          one: 1;
        }
        .class .brass {
          three: 3;
        }
        ```
- 默认变量
    - 我们有时会收到默认变量的请求 - 只有在尚未设置变量时才能设置变量。此功能不是必需的，因为您可以通过后面的定义轻松覆盖变量。
    - 例如：
        ```less
        // library
        @base-color: green;
        @dark-color: darken(@base-color, 10%);
        
        // use of library
        @import "library.less";
        @base-color: red;
        ```
    - **这可以正常工作，因为延迟加载 - 基色被覆盖，深色是深红色。**

### 继承

- 继承
- Extend 语法
    - extend可以附加到选择器，也可以放在规则集中。它看起来像一个带有selector参数的伪类，可选地后跟关键字`all`：
    - 例如：
        ```less
        .a:extend(.b) {}

        // the above block does the same thing as the below block
        .a {
          &:extend(.b);
        }
        ```
        ```less
        .c:extend(.d all) {
          // extends all instances of ".d" e.g. ".x.d" or ".d.x"
        }
        .c:extend(.d) {
          // extends only instances where the selector will be output as        just ".d"
        }
        ```
    - 它可以包含一个或多个要扩展的类，用逗号分隔。
        ```less
        .e:extend(.f) {}
        .e:extend(.g) {}
        
        // the above an the below do the same thing
        .e:extend(.f, .g) {}
        ```
- Extend Attached to Selector
    - 附加到选择器的Extend看起来像普通的伪类，并以选择器作为参数。选择器可以包含多个extend子句，但所有extends都必须位于选择器的末尾。
        - 选择器后面继承：`pre:hover:extend(div pre)`
        - 允许选择器和Extend之间有空格：`pre:hover :extend(div pre)`
        - 允许多个Extend：`pre:hover:extend(div pre):extend(.bucket tr)`，注意同这个写法一样：`pre:hover:extend(div pre, .bucket tr)`
        - Extend必须放在最后，这是不允许的：`pre:hover:extend(div pre).nth-child(odd)`
    - 如果规则集包含多个选择器，则其中任何一个都可以包含extend关键字。在一个规则集中扩展的多个选择器：
        ```less
        .big-division,
        .big-bag:extend(.bag),
        .big-bucket:extend(.bucket) {
          // body
        }
        ```
- Extend Inside Ruleset
    - 可以使用 `&:extend(selector)` 语法将Extend放入规则集的正文中。将extend放置到body中是将其放入该规则集的每个选择器的快捷方式
    - 例子：
        ```less
        pre:hover, .some-class {
          &:extend(div pre);
        }
        ```
    - 以下附加到选择器后面的写法，和body内的写法一样：
        ```less
        pre:hover:extend(div pre),
        .some-class:extend(div pre) {}
        ```
- Extending Nested Selectors
    - 继承可以匹配到嵌套的选择器
    - 例如：
        ```less
        .bucket {
          tr { // nested ruleset with target selector
            color: blue;
          }
        }
        .some-class:extend(.bucket tr) {} // nested ruleset is recognized
        ```
    - 编译为：
        ```css
        .bucket tr,
        .some-class {
          color: blue;
        }
        ```
    - 本质上，Extend会查看已编译的css，而不是原始的less
        ```less
        .bucket {
          tr & { // nested ruleset with target selector
            color: blue;
          }
        }
        .some-class:extend(tr .bucket) {} // nested ruleset is recognized
        ```
    - 编译为：
        ```css
        tr .bucket,
        .some-class {
          color: blue;
        }
        ```
- Exact Matching with Extend
    - 默认情况下，Extend会查找选择器中完全匹配的。
    - ...待补充...
    - 例如：
        ```less
        .a.class,
        .class.a,
        .class > .a {
          color: blue;
        }
        .test:extend(.class) {} // this will NOT match the any selectors        above
        ```
    - 选择器前面是否有`*`符号会对Extend有影响。选择器`*.class`和`.class`是等价的，但extend不匹配它们：
        ```less
        *.class {
          color: blue;
        }
        .noStar:extend(.class) {} // this will NOT match the *.class selector
        ```
    - 编译为：
        ```css
        *.class {
          color: blue;
        }
        ```
    - 伪类的顺序重要。选择器`link:hover:visited`和`link:visited:hover`会匹配到相同的元素，但是Extend会视它们不同：
        ```less
        link:hover:visited {
          color: blue;
        }
        .selector:extend(link:visited:hover) {}
        ```
    - 编译为：
        ```css
        link:hover:visited {
          color: blue;
        }
        ```
- nth Expression
    - `Nth`表达式形式重要。Nth-expressions `1n+3` 和 `n+3` 是等价的。但是Extend匹配时视它们不同
        ```less
        // 原less代码
        :nth-child(1n+3) {
          color: blue;
        }
        .child:extend(:nth-child(n+3)) {}

        // 编译后结果
        :nth-child(1n+3) {
          color: blue;
        }
        ```
    - 属性选择器中的引用类型(`"`、`'`)无关紧要。以下所有内容都是等效的。
        ```less
        // 原less代码
        [title=identifier] {
          color: blue;
        }
        [title='identifier'] {
          color: blue;
        }
        [title="identifier"] {
          color: blue;
        }
        
        .noQuote:extend([title=identifier]) {}
        .singleQuote:extend([title='identifier']) {}
        .doubleQuote:extend([title="identifier"]) {}

        // 编译后结果
        [title=identifier],
        .noQuote,
        .singleQuote,
        .doubleQuote {
          color: blue;
        }
        
        [title='identifier'],
        .noQuote,
        .singleQuote,
        .doubleQuote {
          color: blue;
        }
        
        [title="identifier"],
        .noQuote,
        .singleQuote,
        .doubleQuote {
          color: blue;
        }
        ```
- Extend "all"
    - 当你在extend参数中指定all关键字时，它会告诉Less将该选择器与另一个选择器的一部分相匹配。将复制原选择器，然后仅使用extend替换选择器的匹配部分，从而生成新的选择器
        ```less
        // 原less代码
        .a.b.test,
        .test.c {
          color: orange;
        }
        .test {
          &:hover {
            color: green;
          }
        }
        
        .replacement:extend(.test all) {}
        
        // 编译后结果
        .a.b.test,
        .test.c,
        .a.b.replacement,
        .replacement.c {
          color: orange;
        }
        .test:hover,
        .replacement:hover {
          color: green;
        }
        ```
    - > 您可以将此操作模式视为基本上进行非破坏性搜索和替换
- Selector Interpolation with Extend
    - Extend无法将选择器与变量匹配。如果selector包含变量，则extend将忽略它。
    - 有一个待处理的功能请求，但这不是一个简单的改变。但是，extend可以附加到插值选择器。
    - 变量选择器将不匹配：
        ```less
        @variable: .bucket;
        @{variable} { // interpolated selector
          color: blue;
        }
        .some-class:extend(.bucket) {} // does nothing, no match is found
        ```
    - Extend使用变量选择器匹配，也匹配不到任何选择器
        ```less
        .bucket {
          color: blue;
        }
        .some-class:extend(@{variable}) {} // interpolated selector matches         nothing
        @variable: .bucket;
        ```
    - 以上两个less例子会被编译为:
        ```css
        .bucket {
          color: blue;
        }
        ```
    - 但是，`:extend`附加到插值选择器的后面可以生效、匹配：
        ```less
        // 原less代码
        .bucket {
          color: blue;
        }
        @{variable}:extend(.bucket) {}
        @variable: .selector;

        // 编译结果
        .bucket, .selector {
          color: blue;
        }
        ```
- Scoping / Extend Inside @media
    - 在 `@meida` 规则集内部的Extend，也只能匹配其内部的选择器，否则匹配不到
        ```less
        // 原less代码
        @media print {
          .screenClass:extend(.selector) {} // extend inside media
          .selector { // this will be matched - it is in the same media
            color: black;
          }
        }
        .selector { // ruleset on top of style sheet - extend ignores it
          color: red;
        }
        @media screen {
          .selector {  // ruleset inside another media - extend ignores it
            color: blue;
          }
        }

        // 编译后css代码
        @media print {
          .selector,
          .screenClass { /*  ruleset inside the same media was extended */
            color: black;
          }
        }
        .selector { /* ruleset on top of style sheet was ignored */
          color: red;
        }
        @media screen {
          .selector { /* ruleset inside another media was ignored */
            color: blue;
          }
        }
        ```
    - 在 `@meida` 规则集内部的Extend，不能匹配到其内部嵌套的选择器
        ```less
        // 原less代码
        @media screen {
          .screenClass:extend(.selector) {} // extend inside media
          @media (min-width: 1023px) {
            .selector {  // ruleset inside nested media - extend ignores it
              color: blue;
            }
          }
        }

        // 编译后的css代码
        @media screen and (min-width: 1023px) {
          .selector { /* ruleset inside another nested media was ignored */
            color: blue;
          }
        }
        ```
    - 顶层Extend可以匹配包括嵌套在`@media`在内的所有选择器
        ```less
        // 原less代码
        @media screen {
          .selector {  /* ruleset inside nested media - top level extend        works */
            color: blue;
          }
          @media (min-width: 1023px) {
            .selector {  /* ruleset inside nested media - top level extend      works */
              color: blue;
            }
          }
        }
        
        .topLevel:extend(.selector) {} /* top level extend matches      everything */

        @media screen {
          .selector,
          .topLevel { /* ruleset inside media was extended */
            color: blue;
          }
        }
        @media screen and (min-width: 1023px) {
          .selector,
          .topLevel { /* ruleset inside nested media was extended */
            color: blue;
          }
        }
        // 编译后css代码
        ```
- Duplication Detection
    - 重复检测
    - 当前没有重复检测。例如
        ```less
        // 原less代码
        .alert-info,
        .widget {
          /* declarations */
        }
        
        .alert:extend(.alert-info, .widget) {}

        // 编译后的css代码
        .alert-info,
        .widget,
        .alert,
        .alert {
          /* declarations */
        }
        ```
- Use Cases for Extend
    - 继承（Extend）使用案例
- Classic Use Case
    - 经典用例
    - 经典用例可以避免添加基类。例如，如果你有
        ```css
        .animal {
          background-color: black;
          color: white;
        }
        ```
    - 并且您希望拥有一个覆盖背景颜色的动物子类型，那么您有两个选择，首先更改您的HTML
        ```html
        <a class="animal bear">Bear</a>
        ```
        ```css
        .animal {
          background-color: black;
          color: white;
        }
        .bear {
          background-color: brown;
        }
        ```
    - 或者简化了html并使用了更少的继承Extend。例如
        ```less
        .animal {
          background-color: black;
          color: white;
        }
        .bear {
          &:extend(.animal);
          background-color: brown;
        }
        ```
- Reducing CSS Size
    - 缩小css尺寸
    - Mixins将所有属性复制到选择器中，这可能导致不必要的重复。
    - 因此，你可以使用Extends而不是Mixins将选择器移动到你希望使用的属性，从而减少生成的CSS
    - 例如，使用Mixins
        ```less
        // 原less代码
        .my-inline-block() {
            display: inline-block;
          font-size: 0;
        }
        .thing1 {
          .my-inline-block;
        }
        .thing2 {
          .my-inline-block;
        }
        
        // 编译后的css代码
        .thing1 {
          display: inline-block;
          font-size: 0;
        }
        .thing2 {
          display: inline-block;
          font-size: 0;
        }
        ```
    - 例如，使用功能Extends
        ```less
        // 原less代码
        .my-inline-block {
          display: inline-block;
          font-size: 0;
        }
        .thing1 {
          &:extend(.my-inline-block);
        }
        .thing2 {
          &:extend(.my-inline-block);
        }

        // 编译后css代码
        .my-inline-block,
        .thing1,
        .thing2 {
          display: inline-block;
          font-size: 0;
        }
        ```
- Combining Styles / A More Advanced Mixin
    - 另一个用例是mixin的替代方案 - 因为mixins只能用于简单的选择器，如果你有两个不同的html块，但需要将相同的样式应用于两者，你可以使用extends来关联两个区域
    - 例如：
        ```less
        // 原less代码
        li.list > a {
          // list styles
        }
        button.list-style {
          &:extend(li.list > a); // use the same list styles
        }
        ```

### 混入

- 混入
    - 混合现有style的属性
    - 您可以混合使用类选择器和id选择器，例如
        ```less
        // 原less代码
        .a, #b {
          color: red;
        }
        .mixin-class {
          .a();
        }
        .mixin-id {
          #b();
        }

        // 编译后css代码
        .a, #b {
          color: red;
        }
        .mixin-class {
          color: red;
        }
        .mixin-id {
          color: red;
        }
        ```
    - 请注意，当您调用mixin时，括号是可选的。
        ```less
        // these two statements do the same thing:
        .a(); 
        .a;
        ```
- Not Outputting the Mixin
    - 不输出Mixin
    - 如果你想创建一个mixin，但是你不想输出mixin，你可以在它后面添加括号
    - 例如：
        ```less
        // 原less代码
        .my-mixin {
          color: black;
        }
        .my-other-mixin() {
          background: white;
        }
        .class {
          .my-mixin;
          .my-other-mixin;
        }
        
        // 编译后css代码
        .my-mixin {
          color: black;
        }
        .class {
          color: black;
          background: white;
        }
        ```
- Selectors in Mixins
    - Mixins中的选择器
    - Mixins可以不仅包含属性，也可以包含选择器
        ```less
        // 原less代码
        .my-hover-mixin() {
          &:hover {
            border: 1px solid red;
          }
        }
        button {
          .my-hover-mixin();
        }
        
        // 编译后css代码
        button:hover {
          border: 1px solid red;
        }
        ```
- Namespaces
    - 如果要在更复杂的选择器中混合属性，可以堆叠多个id或类。
        ```less
        // 原less代码
        #outer {
          .inner {
            color: red;
          }
        }
        
        .c {
          #outer > .inner;
        }
        ```
    - 并且 `>` 和 `空格` 是可选的
        ```less
        // all do the same thing
        #outer > .inner;
        #outer > .inner();
        #outer .inner;
        #outer .inner();
        #outer.inner;
        #outer.inner();
        ```
    - 其中一种用法称为命名空间。您可以将您的mixins放在一个id选择器下，这样可以确保它不会与另一个库冲突。
    - 例如：
        ```less
        #my-library {
          .my-mixin() {
            color: black;
          }
        }
        // which can be used like this
        .class {
          #my-library > .my-mixin();
        }
        ```
- Guarded Namespaces（这个目前还没看懂！！！！！！！！）
    - 受保护的命名空间
    - 如果名称空间具有保护，则仅在guard条件返回true时才使用由其定义的mixins。
    - 命名空间guard的评估方式与mixin的guard完全相同，因此接下来的两个mixin以相同的方式工作：
        ```less
        #namespace when (@mode=huge) {
          .mixin() { /* */ }
        }
        
        #namespace {
          .mixin() when (@mode=huge) { /* */ }
        }
        ```
    - 所有嵌套命名空间和mixin的 `default` 函数具有相同的值。
    - 以下mixin从未被评估过，其中一名guards是false：
        ```less
        #sp_1 when (default()) {
          #sp_2 when (default()) {
            .mixin() when not(default()) { /* */ }
          }
        }
        ```
- The `!important` keyword
    - 在mixin调用之后使用`!important`关键字，那么所有属性将标记为`!important`，例如：
        ```less
        // 原less代码
        .foo (@bg: #f5f5f5, @color: #900) {
          background: @bg;
          color: @color;
        }
        .unimportant {
          .foo();
        }
        .important {
          .foo() !important;
        }
        
        // 编译后css代码
        .unimportant {
          background: #f5f5f5;
          color: #900;
        }
        .important {
          background: #f5f5f5 !important;
          color: #900 !important;
        }
        ```

### 参数混入

- 参数混入
    - 如何传递参数给Mixins
    - Mixins也可以接受参数，这些参数是混合在一起传递给选择器块的变量
    - 例如：
        ```less
        // 原less代码
        .border-radius(@radius) {
          -webkit-border-radius: @radius;
             -moz-border-radius: @radius;
                  border-radius: @radius;
        }
        ```
    - 以下是我们如何将其混合到各种规则集中
        ```less
        // 原less代码
        #header {
          .border-radius(4px);
        }
        .button {
          .border-radius(6px);
        }
        ```
    - 参数mixins也可以为其参数设置默认值：
        ```less
        // 原less代码
        .border-radius(@radius: 5px) {
          -webkit-border-radius: @radius;
             -moz-border-radius: @radius;
                  border-radius: @radius;
        }

        // 调用，默认radius为5px
        #header {
          .border-radius;
        }
        ```
    - 您还可以使用不带参数的参数化mixins。如果要从CSS输出中隐藏规则集，但希望将其属性包含在其他规则集中，则此选项非常有用。
    - 如果mixins不带参数或者使用默认参数，则可以隐藏。
        ```less
        // 原less代码
        .wrap() {
          text-wrap: wrap;
          white-space: -moz-pre-wrap;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        pre { .wrap }
        
        // 编译后css代码
        pre {
          text-wrap: wrap;
          white-space: -moz-pre-wrap;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        ```
- Mixins with Multiple Parameters
    - 多参数的Mixins
    - 参数可以是分号`;`或逗号`,`分隔。建议使用分号。
    - 符号逗号具有双重含义：它可以解释为mixin参数分隔符或css列表分隔符。
    - 使用逗号作为mixin分隔符使得无法将逗号分隔列表创建为参数。另一方面，如果编译器在mixins调用或声明中看到至少一个分号，则它假定参数由分号分隔，并且所有逗号都属于css列表：
        - 两个参数，每个参数包含以逗号分隔的列表：`.name(1, 2, 3; something, else)`
        - 三个参数，每个包含一个数字：`.name(1, 2, 3)`
        - 一个参数：`.name(1, 2, 3;)`
        - 逗号分隔的默认值：`.name(@param1: red, blue;)`
    - 定义具有相同名称和参数数量的多个mixin是合法的。Less将使用所有可应用的属性。如果你使用带有一个参数的mixin，例如 `.mixin(green);`，然后将使用具有一个强制参数的所有mixin的属性
        ```less
        // 原less代码
        .mixin(@color) {
          color-1: @color;
        }
        .mixin(@color; @padding: 2) {
          color-2: @color;
          padding-2: @padding;
        }
        .mixin(@color; @padding; @margin: 2) {
          color-3: @color;
          padding-3: @padding;
          margin: @margin @margin @margin @margin;
        }
        .some .selector div {
          .mixin(#008000);
        }
        
        // 编译后css代码
        .some .selector div {
          color-1: #008000;
          color-2: #008000;
          padding-2: 2;
        }
        ```
- Named Parameters
    - mixin可以通过其名称而不仅仅是位置来提供参数值。任何参数都可以通过其名称引用，并且它们不必具有任何特殊顺序：
        ```less
        // 原less代码
        .mixin(@color: black; @margin: 10px; @padding: 20px) {
          color: @color;
          margin: @margin;
          padding: @padding;
        }
        .class1 {
          .mixin(@margin: 20px; @color: #33acfe);
        }
        .class2 {
          .mixin(#efca44; @padding: 40px);
        }
        
        // 编译后css代码
        .class1 {
          color: #33acfe;
          margin: 20px;
          padding: 20px;
        }
        .class2 {
          color: #efca44;
          margin: 10px;
          padding: 40px;
        }
        ```
- The `@arguments` Variable
    - `@arguments` 在mixins中有一个特殊含义，它包含调用mixin时传递的所有参数。如果您不想处理单个参数，这非常有用：
        ```less
        // 原less代码
        .box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
          -webkit-box-shadow: @arguments;
             -moz-box-shadow: @arguments;
                  box-shadow: @arguments;
        }
        .big-block {
          .box-shadow(2px; 5px);
        }
        
        // 编译后css代码
        .big-block {
          -webkit-box-shadow: 2px 5px 1px #000;
             -moz-box-shadow: 2px 5px 1px #000;
                  box-shadow: 2px 5px 1px #000;
        }
        ```
- Advanced Arguments and the `@rest` Variable
    - 高级参数和`@rest`变量
    - 如果你希望mixin采用可变数量的参数，你可以使用符号：`...`。在变量名之后使用它将把这些参数分配给变量。
        ```less
        // 原less代码
        .mixin(...) {        // matches 0-N arguments
        .mixin() {           // matches exactly 0 arguments
        .mixin(@a: 1) {      // matches 0-1 arguments
        .mixin(@a: 1; ...) { // matches 0-N arguments
        .mixin(@a; ...) {    // matches 1-N arguments

        .mixin(@a; @rest...) {
           // @rest is bound to arguments after @a
           // @arguments is bound to all arguments
        }
        ```
- Pattern-matching
    - 有时，您可能希望根据传递给它的参数更改mixin的行为。让我们从基本的东西开始：
        ```less
        .mixin(@s; @color) { ... }

        .class {
          .mixin(@switch; #888);
        }
        ``` 
    - 现在，我们想基于`@switch`的值，来使`.mixin`的行为不同，那么可以这样定义`.mixin`：
        ```less
        // 原less代码
        .mixin(dark; @color) {
          color: darken(@color, 10%);
        }
        .mixin(light; @color) {
          color: lighten(@color, 10%);
        }
        .mixin(@_; @color) {
          display: block;
        }

        @switch: light;

        .class {
          .mixin(@switch; #888);
        }

        // 编译后css代码
        .class {
          color: #a2a2a2;
          display: block;
        }
        ```
    - 上述代码流程：
        1. 第一个mixin定义不匹配，因为它期望dark作为第一个参数。
        2. 第二个mixin定义匹配，因为它预期light
        3. 第三个mixin定义匹配，因为它期望任何值。
    - 只有匹配的mixin才会被应用。变量为任何值，都可以匹配。非变量匹配时，则必须值是一致的。
    - 我们还可以根据参数个数来匹配：
        ```less
        .mixin(@a) {
          color: @a;
        }
        .mixin(@a; @b) {
          color: fade(@a; @b);
        }
        ```
    - 现在如果我们用一个参数调用.mixin，我们将得到第一个定义的输出，但如果我们用两个参数调用它，我们将得到第二个定义，即@a淡化为@b。

### Mixins as Functions

- Mixins as Functions
- 作为函数的mixins，返回变量或mixins
- 在mixin中定义的变量和mixin是可见的，并且可以在可调用范围内使用。
- 只有一个例外，如果调用者包含一个具有相同名称的变量（包括由另一个mixin调用定义的变量），则不会复制变量。只有受调用者本地范围中存在的变量才受到保护。从父作用域继承的变量将被重写。
- 例如：
    ```less
    // 原less代码
    .mixin() {
      @width:  100%;
      @height: 200px;
    }
    
    .caller {
      .mixin();
      width:  @width;
      height: @height;
    }

    // 编译后css代码
    .caller {
      width:  100%;
      height: 200px;
    }
    ```
- 因此，mixin中定义的变量可以作为其返回值。这允许我们创建一个几乎可以像函数一样使用的mixin。
- 例如：
    ```less
    // 原less代码
    .average(@x, @y) {
      @average: ((@x + @y) / 2);
    }
    
    div {
      .average(16px, 50px); // "call" the mixin
      padding: @average;    // use its "return" value
    }

    // 编译后css代码
    div {
      padding: 33px;
    }
    ```
- 直接在调用者范围中定义的变量不能被覆盖。但是，调用者父作用域中定义的变量不受保护，将被覆盖：
- 例如：
    ```less
    // 原less代码
    .mixin() {
      @size: in-mixin;
      @definedOnlyInMixin: in-mixin;
    }
    
    .class {
      margin: @size @definedOnlyInMixin;
      .mixin();
    }
    
    @size: globaly-defined-value; // callers parent scope - no  protection

    // 编译后css代码
    .class {
      margin: in-mixin in-mixin;
    }
    ```
- 最后，mixin中定义的mixin也作为返回值
    ```less
    // 原less代码
    .unlock(@value) { // outer mixin
      .doSomething() { // nested mixin
        declaration: @value;
      }
    }
    
    #namespace {
      .unlock(5); // unlock doSomething mixin
      .doSomething(); //nested mixin was copied here and is usable
    }

    // 编译后css代码
    #namespace {
      declaration: 5;
    }
    ```

### Passing Rulesets to Mixins

- Passing Rulesets to Mixins
- 将规则集传递给Mixins
- 
- Scoping

### 导入命令

- 导入命令
    - 从其他样式表导入样式
    - 在标准CSS中，`@import` at-rules必须在所有其他类型的规则之前。但Less.js并不关心你放置`@import`语句的位置。
    - 例如：
        ```less
        // 原less代码
        .foo {
          background: #900;
        }
        @import "this-is-valid.less";
        ```
- File Extensions
    - 根据文件扩展名，less可以区别对待`@import`
        1. 如果文件具有.css扩展名，则将其视为CSS，并将@import语句保留为原样（请参阅下面的：inline options）。
        2. 如果它有任何其他扩展名，它将被视为less并导入。
        3. 如果它没有扩展名，则会附加.less，它将作为导入的Less文件包含在内。
    - 例如：
        ```less
        // 原less代码
        @import "foo";      // foo.less is imported
        @import "foo.less"; // foo.less is imported
        @import "foo.php";  // foo.php imported as a less file
        @import "foo.css";  // statement left in place, as-is
        ```
    - 可以使用以下options覆盖此行为。


### 导入选项

- 导入选项
    - less为css的`@import`规则提供了几个扩展，以提供比外部文件更多的灵活性。
    - 语法：`@import (keyword) "filename";`
    - 以下import directives已经被实现：
        1. `reference`：使用Less文件但不输出
        2. `inline`：在输出中包含源文件但不处理它
        3. `less`：无论文件扩展名是什么，都将文件视为Less文件
        4. `css`：无论文件扩展名是什么，都将文件视为CSS文件
        5. `once`：仅包含文件一次（这是默认行为）
        6. `multiple`：多次包含该文件
        7. `optional`：在找不到文件时继续编译
    - 每个`@import`允许多个关键字，您必须使用逗号分隔关键字
    - 例如：`@import (optional, reference) "foo.less";`
- reference
    - 例如：`@import (reference) "foo.less";`
    - 想象一下，在导入的文件里面，`reference`选项会标记每个指令和选择器，正常导入，但是当编译生成css时，标记为reference的选择器不会输出。
    - `reference`样式将不会出现到你生成的css文件中，除非其作为`mixins`或`extended`被使用
    - 此外，根据被使用的方法（mixin或extend），reference会产生不同的结果：
        - extend：当一个选择器被继承时，只有新选择器被标记为not reference时，它在引用@import语句的位置被拉入。（When a selector is extended, only the new selector is marked as not referenced, and it is pulled in at the position of the reference @import statement.）
        - mixins：（When a reference style is used as an implicit mixin, its rules are mixed-in, marked "not reference", and appear in the referenced place as normal.）
- reference example
    - 下面允许您通过执行以下操作从Bootstrap等库中仅提取特定的，有针对性的样式：
        ```less
        // 原less代码
        .navbar:extend(.navbar all) {}
        ```
    - 并且您将仅从Bootstrap中提取.navbar相关样式。
- inline（目前不是很理解）
    - 使用`@import (inline)`引入外部文件，但不处理它们
    - 例如：`@import (inline) "not-less-compatible.css";`
    - 当CSS文件可能Less不兼容时，您将使用此选项;这是因为虽然Less支持大多数已知标准CSS，但它不支持某些地方的注释，并且不支持所有已知的CSS hacks。
    - 因此，您可以使用它将文件包含在输出中，以便所有CSS都在一个文件中
- less
    - 使用`@import (less)`将导入的文件视为Less，无论文件扩展名如何。
        ```less
        // 原less代码
        @import (less) "foo.css";
        ```
- css
    - 使用`@import (css)`将导入的文件视为常规CSS，无论文件扩展名如何。这意味着import语句将保持原样。
        ```less
        // 原less代码
        @import (css) "foo.less";
        ```
- once
    - `@import` 语句的默认行为。这意味着文件仅导入一次，并且将忽略该文件的后续导入语句。
        ```less
        // 原less代码
        @import (once) "foo.less";
        @import (once) "foo.less"; // this statement will be ignored
        ```
- multiple
    - 使用`@import (multiple)`允许导入具有相同名称的多个文件。这是once的相反行为。
        ```less
        // 原less代码
        
        // file: foo.less
        .a {
          color: green;
        }
        // file: main.less
        @import (multiple) "foo.less";
        @import (multiple) "foo.less";
        
        
        // 编译后css代码
        .a {
          color: green;
        }
        .a {
          color: green;
        }
        ```
- optional
    - 使用`@import (optional)`仅允许在文件存在时导入文件。没有optional关键字Less会抛出FileError并在导入无法找到的文件时停止编译。

### Mixin Guards

- Mixin Guards
    - 条件混合
    - 当你想要匹配表达式，而不是简单的值或数量，Guards很有用。如果你熟悉函数式编程，则可能已经遇到过它们。
    - 为了尽可能接近css声明性质，Less选择通过 **guarded mixins** 来实现条件执行，这是@media查询功能规范的一部分。
    - 让我们从一个例子开始：
        ```less
        // 原生less代码
        .mixin (@a) when (lightness(@a) >= 50%) {
          background-color: black;
        }
        .mixin (@a) when (lightness(@a) < 50%) {
          background-color: white;
        }
        .mixin (@a) {
          color: @a;
        }
        ```
    - 这里代码关键部分是是`when`关键字，它引入了一个保护序列（这里只有一个保护）。现在，如果我们运行以下代码：
        ```less
        // 原生less代码
        .class1 { .mixin(#ddd) }
        .class2 { .mixin(#555) }

        // 编译后css代码
        .class1 {
          background-color: black;
          color: #ddd;
        }
        .class2 {
          background-color: white;
          color: #555;
        }
        ```
- Guard Comparison Operators
    - guards中可用的比较运算符完整的列表是：`>`，`>=`，`=`，`=<`，`<`。
    - 此外，关键词 `true` 是唯一的truthy值，使这两个mixins相等。
        ```less
        // 原生less代码
        .truth (@a) when (@a) { ... }
        .truth (@a) when (@a = true) { ... }
        ```
    - 除关键字`true`之外的任何值都为`false`
        ```less
        .class {
          .truth(40); // Will not match any of the above definitions.
        }
        ```
    - 请注意，您还可以相互比较参数，或使用非参数：
        ```less
        // 原生less代码
        @media: mobile;

        .mixin (@a) when (@media = mobile) { ... }
        .mixin (@a) when (@media = desktop) { ... }
        
        .max (@a; @b) when (@a > @b) { width: @a }
        .max (@a; @b) when (@a < @b) { width: @b }
        ```
- Guard Logical Operators
    - 您可以将逻辑运算符与guards一起使用。语法基于CSS媒体查询。
    - 使用 `and` 关键字组合guards：
        ```less
        // 原生less代码
        .mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }
        ```
    - 你可以通过逗号分隔guards来模拟 `or` 运算符。如果任何guards计算为真，则认为是匹配：
        ```less
        // 原生less代码
        .mixin (@a) when (@a > 10), (@a < -10) { ... }
        ``` 
    - 使用 `not` 关键字否定条件：
        ```less
        // 原生less代码
        .mixin (@b) when not (@b > 0) { ... }
        ```
- Type Checking Functions
    - 最后，如果要根据值类型匹配mixins，可以使用is函数：
        ```less
        .mixin (@a; @b: 0) when (isnumber(@b)) { ... }
        .mixin (@a; @b: black) when (iscolor(@b)) { ... }
        ```
    - 以下是基本类型检查功能:
        - iscolor
        - isnumber
        - isstring
        - iskeyword
        - isurl
    - 如果您想检查某个值是否在某个特定单位中而不是数字，您可以使用以下方法之一：
        - ispixel
        - ispercentage
        - isem
        - isunit
- Conditional Mixins
    - 此外，default函数可用于根据其他混合匹配进行混合匹配，您可以使用它来创建类似于else或default语句的“条件混合”（分别为if和case结构）：
        ```less
        // 原生less代码
        .mixin (@a) when (@a > 0) { ...  }
        .mixin (@a) when (default()) { ... } // matches only if first mixin         does not, i.e. when @a <= 0
        ```
### CSS Guards

- CSS Guards
    - guards也可以应用于css选择器，这是用于声明mixin然后立即调用它的语法糖。
    - 例如，在1.5.0之前你必须这样做：
        ```less
        // 原less代码
        .my-optional-style() when (@my-option = true) {
          button {
            color: white;
          }
        }
        .my-optional-style();
        ```
    - 现在，您可以将guards直接应用于样式。
        ```less
        // 原less代码
        button when (@my-option = true) {
          color: white;
        }
        ```
    - 您还可以通过将此功能与`&`功能相结合来实现`if`类型语句，从而允许您对多个guards进行分组。
        ```less
        // 原less代码
        & when (@my-option = true) {
          button {
            color: white;
          }
          a {
            color: blue;
          }
        }
        ```

### 循环

- 循环
    - 在Less中，mixin可以调用它自己，这种递归的mixins，当和[Guard Expressions](#)和[Pattern Matching](#)绑定时，其可以用来创建循环结构
    - 例如：
        ```less
        // 原less代码
        .loop(@counter) when (@counter > 0) {
          .loop((@counter - 1));    // next iteration
          width: (10px * @counter); // code for each iteration
        }
        
        div {
          .loop(5); // launch the loop
        }

        
        // 编译后css代码
        div {
          width: 10px;
          width: 20px;
          width: 30px;
          width: 40px;
          width: 50px;
        }
        ```
    - 使用递归循环生成CSS网格类的一般示例：
        ```less
        // 原less代码
        .generate-columns(4);

        .generate-columns(@n, @i: 1) when (@i =< @n) {
          .column-@{i} {
            width: (@i * 100% / @n);
          }
          .generate-columns(@n, (@i + 1));
        }

        // 编译后 css代码
        .column-1 {
          width: 25%;
        }
        .column-2 {
          width: 50%;
        }
        .column-3 {
          width: 75%;
        }
        .column-4 {
          width: 100%;
        }
        ```

### 合并

- 合并
    - 并功能允许将多个属性中的值聚合到单个属性下的逗号或空格分隔列表中。 merge对于背景和变换等属性很有用。
- Comma
    - 使用逗号附加属性值
        ```less
        // 原less代码
        .mixin() {
          box-shadow+: inset 0 0 10px #555;
        }
        .myclass {
          .mixin();
          box-shadow+: 0 0 20px black;
        }

        // 编译的css代码
        .myclass {
          box-shadow: inset 0 0 10px #555, 0 0 20px black;
        }
        ```
- Space
    - 使用空格附加属性值
        ```less
        // 原less代码
        .mixin() {
          transform+_: scale(2);
        }
        .myclass {
          .mixin();
          transform+_: rotate(15deg);
        }

        // 编译的css代码
        .myclass {
          transform: scale(2) rotate(15deg);
        }
        ```
- 为了避免任何无意的连接，merge需要在每个连接挂起声明上使用显式的 `+` 或 `+_` 标志。

### 父选择器

- 父选择器
    - 使用`&`引用父选择器
    - `&`运算符表示嵌套规则的父选择器
        ```less
        // 原less代码
        a {
          color: blue;
          &:hover {
            color: green;
          }
        }
        
        // 编译的css代码
        a {
          color: blue;
        }
        
        a:hover {
          color: green;
        }
        ```
    - “父选择器”运算符具有多种用途。例如，`&`的另一个典型用法是产生重复的类名：
        ```less
        // 原less代码
        .button {
          &-ok {
            background-image: url("ok.png");
          }
          &-cancel {
            background-image: url("cancel.png");
          }
        
          &-custom {
            background-image: url("custom.png");
          }
        }
        
        // 编译的css代码
        .button-ok {
          background-image: url("ok.png");
        }
        .button-cancel {
          background-image: url("cancel.png");
        }
        .button-custom {
          background-image: url("custom.png");
        }
        ```
- Multiple `&`
    - `&` 可能会在选择器中出现多次。这使得可以重复引用父选择器而不重复其名称。
        ```less
        // 原less代码
        .link {
          & + & {
            color: red;
          }
        
          & & {
            color: green;
          }
        
          && {
            color: blue;
          }
        
          &, &ish {
            color: cyan;
          }
        }

        // 编译的css代码
        .link + .link {
          color: red;
        }
        .link .link {
          color: green;
        }
        .link.link {
          color: blue;
        }
        .link, .linkish {
          color: cyan;
        }
        ```
    - 请注意`&`表示所有父选择器（不仅仅是最近的祖先），因此以下示例：
        ```less
        // 原less代码
        .grand {
          .parent {
            & > & {
              color: red;
            }
        
            & & {
              color: green;
            }
        
            && {
              color: blue;
            }
        
            &, &ish {
              color: cyan;
            }
          }
        }

        // 编译的css代码
        .grand .parent > .grand .parent {
          color: red;
        }
        .grand .parent .grand .parent {
          color: green;
        }
        .grand .parent.grand .parent {
          color: blue;
        }
        .grand .parent,
        .grand .parentish {
          color: cyan;
        }
        ```
- Changing Selector Order
    - 更改选择器顺序
    - 将选择器添加到继承的（父）选择器可能很有用。这可以通过在当前选择器来完成后面放置`&`来处理。
        ```less
        // 原less代码
        .header {
          .menu {
            border-radius: 5px;
            .no-borderradius & {
              background-image: url('images/button-background.png');
            }
          }
        }
        
        // 编译的css代码
        .header .menu {
          border-radius: 5px;
        }
        .no-borderradius .header .menu {
          background-image: url('images/button-background.png');
        }
        ```
- Combinatorial Explosion
    - `&`还可用于生成逗号分隔列表中每个可能的选择器排列：
        ```less
        // 原less代码
        p, a, ul, li {
          border-top: 2px dotted #366;
          & + & {
            border-top: 0;
          }
        }

        // 编译后css代码
        p,
        a,
        ul,
        li {
          border-top: 2px dotted #366;
        }
        p + p,
        p + a,
        p + ul,
        p + li,
        a + p,
        a + a,
        a + ul,
        a + li,
        ul + p,
        ul + a,
        ul + ul,
        ul + li,
        li + p,
        li + a,
        li + ul,
        li + li {
          border-top: 0;
        }
        ```

## 函数手册


