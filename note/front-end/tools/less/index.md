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
- Combining Styles / A More Advanced Mixin

### 混入

- Not Outputting the Mixin
- Selectors in Mixins
- Namespaces
- Guarded Namespaces
- The `!important` keyword

### 参数混入

- Mixins with Multiple Parameters
- Named Parameters
- The `@arguments` Variable
- Advanced Arguments and the `@rest` Variable
- Pattern-matching

### Mixins as Functions

- Mixins as Functions

### Passing Rulesets to Mixins

- Passing Rulesets to Mixins
- Scoping

### 导入命令

- 导入命令
- File Extensions


### 导入选项

- 导入选项
- reference
- reference example
- inline
- less
- css
- once
- multiple
- optional

### Mixin Guards

- Mixin Guards
- Guard Comparison Operators
- Guard Logical Operators
- Type Checking Functions
- Conditional Mixins

### CSS Guards

- CSS Guards

### 循环

- 循环

### 合并

- 合并
- Comma
- Space

### 父选择器

- 父选择器
- Multiple `&`
- Changing Selector Order
- Combinatorial Explosion

## 函数手册


