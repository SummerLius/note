<!-- TOC -->

- [CSS](#css)
    - [概述](#概述)
    - [语法](#语法)
        - [@规则](#规则)
        - [选择器](#选择器)
            - [选择器分组](#选择器分组)
            - [元素选择器](#元素选择器)
            - [类选择器](#类选择器)
            - [ID选择器](#id选择器)
            - [通配选择器](#通配选择器)
            - [属性选择器](#属性选择器)
            - [相邻兄弟选择器](#相邻兄弟选择器)
            - [普通兄弟选择器](#普通兄弟选择器)
            - [子选择器](#子选择器)
            - [后代选择器](#后代选择器)
            - [伪类 Pseudo-class](#伪类-pseudo-class)
            - [伪元素 Pseudo-elements](#伪元素-pseudo-elements)
    - [结构和层叠](#结构和层叠)
        - [特殊性](#特殊性)
        - [继承](#继承)
        - [层叠](#层叠)
        - [小节](#小节)
    - [CSS声明](#css声明)
        - [尺寸属性](#尺寸属性)
        - [定位声明](#定位声明)
        - [文本声明](#文本声明)
        - [背景属性](#背景属性)
    - [//////////////////////////////////////](#)
    - [单位](#单位)
    - [//////////////////////////////////////](#-1)
    - [css权威指南书籍](#css权威指南书籍)
        - [第五章 字体](#第五章-字体)
        - [第六章 文本属性](#第六章-文本属性)
        - [第七章 基本视觉格式化](#第七章-基本视觉格式化)
        - [第八章 内边距、边框和外边距](#第八章-内边距边框和外边距)
        - [第九章 颜色和背景](#第九章-颜色和背景)
        - [第十章 浮动和定位](#第十章-浮动和定位)
    - [//////////////////////////////////////](#-2)
    - [w3c官网css2.2标准](#w3c官网css22标准)
        - [第八章 盒模型](#第八章-盒模型)
        - [第九章 视觉格式化模型](#第九章-视觉格式化模型)
        - [第十章 视觉格式化模型细节](#第十章-视觉格式化模型细节)
        - [第十一章 可视化效果](#第十一章-可视化效果)
        - [第十二章 内容生成，自动编号与列表](#第十二章-内容生成自动编号与列表)
        - [第十四章 颜色与背景](#第十四章-颜色与背景)
        - [第十五章 字体](#第十五章-字体)
        - [第十六章 文本](#第十六章-文本)
        - [第十七章 表格](#第十七章-表格)
        - [第十八章 用户界面](#第十八章-用户界面)
    - [w3c官网css3-box标准：CSS basic box model](#w3c官网css3-box标准css-basic-box-model)
        - [第四章 Types of boxes](#第四章-types-of-boxes)
        - [第五章 The padding properties](#第五章-the-padding-properties)
        - [第十章 Floating boxes](#第十章-floating-boxes)
        - [第十一章 Overflow](#第十一章-overflow)
    - [参考](#参考)

<!-- /TOC -->

# CSS

## 概述

- CSS指层叠样式表（Cascading Style Sheets）
- 作用：样式决定如何显示HTML元素
- 样式除了在样式表css中定义外，还可以在html文档内定义
- 把样式从html抽离出来定义，是为了将**内容和表现分离，从而提高工作效率**


样式层叠次序，优先级由低到高：
1. 浏览器缺省设置
2. 外部样式表
3. 内部样式表（位于head标签内部）
4. 内联样式（HTML元素内部）

## 语法

- **CSS规则**：
    - CSS规则由两个主要部分构成：**选择器**，**声明**
    - 一对选择器与声明块称为规则集（ruleset），简称为规则（rule）。
    - 一个元素Element可能被多个选择器选中，因此会有多个规则，有可能以不同的值去设置同一属性。CSS标准会规定优先级最高的那个生效，称之为 **层叠 cascade** 算法。
- **CSS语句**：
    - 规则是样式表的主体，通常样式表会包括大量的规则列表。
    - 除了规则语句外，还包括一些其它信息语句，用于设置字符集、引入其它外部样式表、引入字体等等
    - 语句类型：
        1. 规则。即选择器和声明对。
        2. at规则。以`@`开始，随后是标识符，一直到分号`;`或右大括号`}`结束。每个at规则由其标识符定义，可能有它自己的语法。at规则涵盖了meta信息（如@charset @import），条件信息（如 @media @document），描述信息（@font-face）。
        3. 不是上面类型的语句则是非法，被忽略
    - 条件规则组（conditional group rules）是特殊的at规则，可以嵌套语句。
- **注释**：
    - `/* xxx */`
- **选择器**：
    - 作用：选择HTML元素
- **声明**：
    - 构成：每条声明由一个属性和一个值组成
    - 属性：样式属性（style attribute）
    - 值：每个属性对应值
    - 属性和值被冒号分开
    - 格式：`h1 {color:red; font-size:14px;}`






### @规则

一个@规则是一个CSS语句，以`@`符号开头，后跟一个标识符，并包括到下一个分号`;`或右大括号`}`。

下面是一些@规则，由它们的标识符指定，每种规则都有不同的语法：
- `@charset`：定义样式表使用的字符集
- `@import`：告诉CSS引擎引入一个外部样式表
- `@namespace`：告诉CSS引擎必须考虑XML命名空间
- 嵌套@规则，是嵌套语句的子集，不仅可以作为样式表里的一个语句，也可以用在条件规则组里：
    - `@media`：如果满足媒介查询条件则条件规则组里的规则生效
    - `@page`：描述打印文档时布局的变化
    - `@font-face`：描述将下载的外部的字体
    - `@keyframes`：描述CSS动画的中间步骤
    - `@supports`：如果满足给定条件规则，条件规则组里的规则生效
    - `@document`：如果文档样式表满足给定条件规则，条件规则组里的规则生效（推延至CSS4 规范）
- [详情见MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)



条件规则组：
- 有一些@规则可以归为一类：**条件规则组**
- 这些语句使用相同的语法，都嵌套语句，或者是规则或@规则
- 条件规则组作用：它们所指的条件总等于true或false，如果为true，那么它们里面的语句生效。
- 条件规则组由**CSS3**定义：
    - `@media`
    - `@supports`
    - `@document`：（推延至CSS4规范）

### 选择器

- 基本选择器
    - 元素选择器
    - 类选择器
    - ID选择器
    - 通配选择器
    - 属性选择器
- 组合选择器
    - 相邻兄弟选择器：`+`
    - 普通兄弟选择器：`~`
    - 子选择器：`>`
    - 后代选择器：`_`
- 伪类
- 伪元素

#### 选择器分组

同时指定多个选择器对应同一个声明块

```css
p,div {xxx;}
```

#### 元素选择器

通过node节点名称匹配元素

语法：`元素 { 样式声明 }`

```css
span {
    color: #ffffff
}
```

#### 类选择器

使用 `.` 符号，类选择器会根据**元素的类属性中的内容匹配元素**。

可以指定元素名使用class组合使用，可以多个class组合使用。

语法：`.类名 { 样式声明 }`、`元素名.类名 { 样式声明}`、`.类名.类名 {}`

> 注意class名第一个字符不能使用数字，它无法在mozilla和firefox中起作用

```css
.myclass {xxx;}

span.myclass {xxx;}

.myclass1.myclass2 {xxx;}
```

#### ID选择器

匹配元素ID属性

语法：`#id属性 { 样式声明 }`

```css
#myid {xxx;}

div#sidebar {xxx;}

p#main[href] {xxx;}
```

#### 通配选择器

星号（\*）是通配选择器，它可以匹配任意类型的HTML元素。通配符号可以和其它选择器组合。

在CSS3中，星号可以和命名空间组合使用：
- xx
- xx
- xx

```css
*#myid {xxx;}
*.warning {xxx;}
```

#### 属性选择器

属性选择器通过元素**属性名**或**属性值**匹配元素。

语法：
- `[attr]`
    - 匹配含有以attr命名的属性的元素
- `[attr=value]`
    - 匹配含有以attr命名的属性，且值为value的元素
- `[attr~=value]`
    - 匹配含有以attr命名的属性，并且该属性是一个以空格space作为分隔的值列表，其中至少含有一个值为value
- `[attr|=value]`
    - 匹配含有以attr命名的属性，且该属性值是以"value"或"value-"为开头的元素
- `[attr^=value]`
    - 匹配含有以attr命名的属性，且该属性值以value开头的元素
- `[attr$=value]`
    - 匹配含有以attr命名的属性，且该属性值以value结尾的元素
- `[attr*=value]`
    - 匹配含有以attr命名的属性，且该属性值含有value的元素
- `[attr operator value i]`
    - 在上述所有选择器中，可以添加一个字符 `i` ，表示可以忽略属性值大小写（ascii范围内字母）


```css
a[href] {xxx;}

a[href="https://www.duoyi.com"] { xxx; }

a[href^="https"] { xxx; }

a[href$="https" i] { xxx; }
```

#### 相邻兄弟选择器

也被称为相邻选择器，它只会匹配紧跟前方元素的同胞元素。（同胞元素：表示元素处于同一层次，有同一个父元素）

语法：`前方元素 + 目标元素 { 样式声明 }`

```css
li + li {
    color: red;
}
```

#### 普通兄弟选择器

在使用 `~` 连接两个元素的时候，它会匹配第二个元素，条件是它必须在第二个元素之后（不一定相邻），且他们都有同一个父元素（即同胞元素，处于同一层次）

语法：`元素 ~ 元素 { 样式声明 }`

```css
p ~ span {
    xxx;
}
```

#### 子选择器

使用 `>` 连接两个元素时，它只会匹配那些作为第一个元素直接后代（子元素）的第二元素。

语法：`父元素 > 子元素 { 样式声明 }`

```css
div > span { xxx; }
```

#### 后代选择器
 使用 `_`（空白字符，一个或多个空白字符）连接两个元素时，仅匹配祖先是第一个元素的第二个元素。

 后代选择器和子选择器比较相似，前者仅要求同祖同族，后者严格要求父子。

 语法：`祖先元素 后代元素 { 样式声明 }`

 ```css
 div span {xxx;}
 ```

#### 伪类 Pseudo-class

CSS伪类：是添加到选择器的关键字，指定元素的特殊状态。

**伪类和伪元素，它们允许你不仅仅根据文档DOM树中的内容（元素名、属性、dom树结构等）对元素应用样式，而且还允许你根据外部动态因素来应用样式，例如内容的状态、鼠标的位置等等。**

语法：`selector:pseudo-class {样式声明}`

详情见：
- [MDN 伪类参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)
- [MDN CSS参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)


#### 伪元素 Pseudo-elements

伪元素同伪类相似，伪元素添加到选择器，但不描述特殊状态，它们允许你为元素的某些部分（或子元素）设置样式。

语法：`selector::pseudo-element { 样式声明 }`

- ::after
- ::before
- ::first-letter
- ::first-line
- ::selection
- ...
- [MDN CSS参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)
- [MDN 伪元素参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)

## 结构和层叠

每个合法的HTML文档，都会生成一个结构树。有了这个结构树，选择器才能起作用，这也是CSS另外一个重要方面（继承）的核心。

继承，是从一个元素向其后代元素传递属性值所采用的机制。确定向一个元素具体应用那些样式时，用户代理不仅要考虑继承，还要考虑声明的特殊性，例外需要考虑声明本身的来源，这个过程就称为层叠（cascade）。

### 特殊性

对于每个规则（选择器+声明块），用户代理会计算选择器的特殊性，并将这个特殊性附加到规则中的各个声明。如果元素有两个或多个冲突的属性声明，那么有最高特殊性的声明就会胜出。

选择器特殊性规则如下：
1. ID属性值，加 0.1.0.0
2. 类属性值、属性选择或伪类，加 0.0.1.0
3. 元素或伪元素，加 0.0.0.1
4. 结合符和通配符，没有任何贡献，即0特殊性

```css
h1 { color: red; } /* 0.0.0.1 */
p em { color: purple; } /* 0.0.0.2 */
.grape { color: purple; } /* 0.0.1.0 */
*.bright { color: yellow; } /* 0.0.0.1 */
p.bright em.dark { color: maroon; } /* 0.0.2.2 */
#id110 {  color: blue; } /* 0.1.0.0 */
div#sidebar *[href] { color: silver; } /* 0.1.1.1 */
```

- **声明和特殊性**
    - 一旦确定一个选择器的特殊性，这个值将会赋予对应每条相关声明
    - 对于每个CSS规则，由于特殊性的缘故，用户代理会将每个CSS规则 “解组” 为单独的规则，即将“分组选择器”和“声明块”解组为最小规则：单个选择器+单条声明，显然用户代理这样做是为了更好的处理
    - 若多个规则匹配同一个元素，且样式声明相互冲突时，特殊性则其作用

    ```css
    h1, h2.section { color: silver; background: black;}

    </* 用户代理解组 */>
    h1 { color: silver; }
    h1 { background: black; }
    h2.section { color: silver; }
    h2.section { background: black; }
    ```
- **通配选择器特殊性**
- **ID和属性选择器的特殊性**
    - ID特殊性 `#id`：0.1.0.0
    - 属性特殊性　`[id=id]`：0.0.1.0
- **内联样式特殊性**
    - 特殊性的第一位0，是为内联样式声明保留，它比所有其它声明的特殊性都高。
    - `<h1 style="color: green;">The head title</h1>`：1.0.0.0
- **重要性**
    - `!important`：使用重要标志的声明，不会添加特殊性值，用户代理不会将“重要性”和“特殊性”分为两类规则处理
    - 用户代理将声明分为：“重要声明” 和 “非重要声明” 两类处理
        - “重要声明”的特殊值冲突，会在重要声明内部处理
        - “非重要声明”的特殊值冲突，会在非重要声明内部处理
        - 若“重要声明”和“非重要声明”冲突，则总是“重要声明”胜出
    - 使用：`!important`总放在声明的最后，即分号的前面

### 继承

- 概念：
    - 基于继承机制，指定样式应用某元素，则样式不仅应用该元素，还可能会应用到它的后代元素。
- 继承是CSS最基本的内容，除非有必要的理由，否则一般不会特别考虑。
- 注意点：
    - 有些属性不能继承。例如，属性border就不能继承，其用于设置元素边框。如果border能继承，文档会变得更混乱，除非创作人员另外花功夫去掉继承的边框。
    - 一般的，大多数框模型属性都不能继承，例如外边距、内边距、背景和边框都不能继承，原因和上面也是一样。毕竟你肯定不希望一个段落中的所有链接都从其父元素继承30像素的左外边距。
    - 继承的值没有特殊性，甚至连0特殊性也没有。即css中0特殊性的规则（如通配符）要胜于继承的值。

### 层叠

层叠规则是最终决定元素的样式应用，其结合了特殊性和继承特性，**CSS2.1**层叠规则如下：

1. 找出所有相关规则，这些规则都包含与一个给定元素匹配的选择器。
2. 按显示权重对应用到该元素的所有声明排序。
    - 标志`!important`的规则的权重高于没有`!important`的标志的规则。
    - 按照来源对应用到给定元素的所有声明排序。
        - 来源：创作人员、读者、用户代理
        - 正常情况下，创作人员的样式要胜于读者的样式
        - 有`!important`标志的读者样式要强于其它所有样式，包括强于有`!important`标志的创作人员样式
        - 创作人员和读者样式都比用户代理默认样式强
3. 按特殊性对应用到给定元素的所有声明排序。有较高特殊性的声明的权重高于较低的。
4. 按出现的顺序排序。
    - 一个声明在样式表或文档中越后出现，它的权重越大。
    - 如果样式表中有导入样式表，一般认为导入的样式在前，主样式表中的所有声明在后


**具体的规则流程**：
- **按权重与来源排序**
    - 在规则声明的权重方面可以分为5级，权重由大到小顺序依次为：
        1. 读者的重要声明
        2. 创作人员的重要声明
        3. 创作人员的正常声明
        4. 读者的正常声明
        5. 用于代理声明
    - 创作人员通常只需要考虑前4个权重级别，因为任何声明都会胜过用户代理样式。
    - 虽说如此，作为创作人员，感觉仅需要考虑2个即可，即创作人员重要声明和创作人员正常声明。因为创作人员仅能控制自己的样式，无法控制读者样式。故创作人员样式处理时，仅需要考虑特殊性排序和顺序排序。
- **按特殊性排序**
    - 如果向一个元素应用多个声明并产生了冲突，而且他们的**权重相同**，则按特殊性排序，最特殊的声明优先。
- **按顺序排序**
    - 如果权重、特殊性都相同，那么在样式表中**后出现**的一个胜出
    - 一个应用顺序排序的重要例子就是：链接样式，如下代码，可见其权重、特殊性均相同，则按顺序最后一个胜出。一般推荐排序为link-visited-hover-active (LVHA)，当然搞清楚其中逻辑之后，你可以自定义不同的顺序，从而产生不同的效果。
    ```css
    <!-- 推荐顺序为：lvha -->
    a:link { color: blue;}
    a:visited { color:gray;}
    a:hover { color: red;}
    a:active { color: orange;}
    ```

### 小节

层叠样式表中最基本方面即层叠：冲突的声明要通过这个层叠过程排序，并由此最终决定最终的文档样式显示。

这个过程的核心是选择器及其相关声明的特殊性、继承机制。


## CSS声明

### 尺寸属性

- `height`：
    - 作用：设置元素高度，具体来讲是**元素内容区**高度，整个元素高度还包括margin、border、padding
    - 值选项：
        - auto：默认，浏览器默认将内容区高度设置包含内容的高度
        - length：
        - %：基于包含它的块级对象百分比高度
        - inherit
- `max-height`
    - 作用：给元素的高度设置一个最高限制，**不允许负值**
    - 值选项：
        - auto：默认值。没有最高限制。
        - ...
- `min-height`
    - 作用：给元素高度设置一个最低限制，**不允许负值**
- `width`
    - 作用：设置元素内容区宽度，内容区外边还有padding、border、margin
    - 值选项：
        - auto：默认。对于块级元素，浏览器设置该元素width，默认使其占满父元素宽度。
        - length
        - %：定义基于包含块（父元素）宽度的百分比
        - inherit：
- `max-width`
- `min-width`

### 定位声明

- `display`
    - 作用：设置元素如何显示
    - 值选项：
        - none：使元素不显示
        - block：使元素显示为块级元素，前后会带有换行符
        - inline：默认。使元素显示为内联元素，前后没有换行符
        - table：使元素以块级元素显示，类似table元素
        - list-item：
        - run-in：
        - ...
- `visibility`
    - 作用：设置元素是否可见
    - 区别：注意`visibility:hidden` 和 `display:none` 区别，前者元素还在渲染树上占一个位置，可以看作仅透明；而后者是直接没有在渲染树上，不会占位置
    - 值选项：
        - visible：显示，默认
        - hidden：隐藏
        - collapse：
        - inherit
- `position`
    - 作用：设置元素的定位类型，与left、right、top、bottom一起起作用
    - 说明：建立元素布局所用的定位机制，任何元素都可以定位，**不过absolute或fixed元素会生成一个块级框**，而不论元素本身是什么类型。relative定位元素会相对于它在正常流中的默认位置偏移。
    - 值选项：
        - static：
            - 默认。元素正常布局,即元素在文档常规流中当前布局位置。此时top、right、bottom、left、z-index属性无效。
        - absolute：
            - 不为该元素在正常文档流中预留位置。
            - 通过相对于该元素最近的非static定位的祖先元素偏移，如果沿着父元素依次向上，只要发现是非static定位，则对其偏移，否则直到根元素html
        - fixed：
            - 不为该元素在正常文档流中预留位置。
            - 且相对与屏幕视口位置偏移。
        - relative：
        - inherit：
    - 注意：
        - 定位相对偏移时，fixed、absolute、relative，如果没有指定top、right、bottom、left值，但是浏览器可能会根据元素当前的位置来绘制，不会默认top、right等这些值为0，这点需要注意，例如如果定位设置为fixed，按理说相对屏幕偏移，应该在最左上方，当实际可能不是，除非开发者指定top:0、right:0等属性
- `left`
    - 作用：规定元素的左边缘。定义了定位元素左外边距与其包含块左边界之间的偏移。
    - 值选项：
        - auto：默认值。
        - %：元素包含块的宽度的百分比。可负值
        - length：使用px、cm等单位设置元素左边位置。可负值
        - inherit：
- `right`
- `top`
- `bottom`
- `float`
    - 作用：定义元素向那个方向浮动
    - 说明：
        - **浮动元素会生成一个块级框，而不论它本身是何种元素**
        - 该float影响的block，其不会单独占一行，也不会宽度占满父元素，而是宽度随内容变化，有点类似与display:inline-block
    - 值选项：
        - left：
        - right：
        - none：默认值
        - inherit：
- `clear`
    - 作用：规定元素哪一侧不允许其它浮动元素，与 `float` 作用相反
    - 值选项：
        - none：默认
        - left：
        - right：
        - both：
        - inherit：
- `overflow`
    - 作用：规定当内容溢出元素框时处理的方式
    - 值选项：
        - visible：默认值。内容不会被修剪，会呈现在元素框之外
        - hidden：内容会被修剪，故其余内容是不可见的
        - scroll：内容会被修剪，当可以通过滚动条查看其余内容（不管是否修剪，强制会出现滚动条）
        - auto：如果内容被修剪时，才会出现滚动条
        - inherit：
- `z-index`
    - 作用：
        - 设置当前元素的堆叠顺序
        - 设置当前元素是否建立新的堆叠上下文
    - 适用元素：
        - 仅适用与定位元素，即position值不为static的元素，即relative、absolute、fixed
    - 值选项：
- ``
- ``
- ``
- ``
- ``

### 文本声明

- `line-height`：
    - 作用：设置行高
    - 说明：
        - 不允许使用负值
        - line-height和font-size的计算之差，即为行间距，其分为两半，分别加到行内容的顶部和底部。
        - 对于block元素，它指定了元素中的最小宽度
    - 值选项：
        - normal：默认
        - number：此数字会与当前的字体尺寸相乘来设置行间距
        - length：设置固定的行间距
        - %：基于当前字体尺寸百分比行间距
        - inherit：

### 背景属性

- `background-color`
    - 作用：设置元素的背景颜色
    - 说明：
        - 范围：content-area、padding、border，不包括margin
        - margin总是透明背景
    - 值选项：
        - *color_name*：
        - *hex_number*：
        - *rgb_number*：
        - *transparent*：默认值，透明
        - *inherit*：

## //////////////////////////////////////

## 单位

- 尺寸：%、in、cm、mm、em、ex、pt、pc、px等等
    - 常用：
        - %
        - em：1em与当前元素的字体大小相同（更具体地说，一个大写字母M的宽度）。CSS样式被应用之前，浏览器给网页设置的默认基础字体大小是16像素，这意味着对一个元素来说1em的计算值默认为16像素。但是要小心—em单位是会继承父元素的字体大小，所以如果在父元素上设置了不同的字体大小，em的像素值就会变得复杂。现在不要过于担心这个问题，我们将在后面的文章和模块中更详细地介绍继承和字体大小设置。em是Web开发中最常用的相对单位。
        - px： 是一种绝对单位（absolute units）， 因为无论其他相关的设置怎么变化，像素指定的值是不会变化的
- 颜色
    - 颜色名
    - rgb(x,x,x)
    - rgb(x%, x%, x%)
    - #rrggbb

## //////////////////////////////////////

## css权威指南书籍

### 第五章 字体

### 第六章 文本属性

### 第七章 基本视觉格式化

- **包含块**
    - 包含块是一个元素的 “布局上下文”，每个元素都相对于包含块摆放。
- **快速复习**
    - 正常流
    - 非替换元素
    - 替换元素
    - 块级元素
    - 行内元素，即内联元素
- **块级元素**
- **水平格式化**
- **水平属性**
    - 只有margin可以为负值，width、height、border、padding不可以为负值
- **负外边距**
- **百分数**
- **替换元素**
- **垂直格式化**
- **垂直属性**
- **合并垂直外边距**


### 第八章 内边距、边框和外边距

### 第九章 颜色和背景

### 第十章 浮动和定位

## //////////////////////////////////////

## w3c官网css2.2标准

- 地址：https://www.w3.org/TR/CSS22/visuren.html

### 第八章 盒模型

### 第九章 视觉格式化模型

1. **简介**
    1. 可视化格式模型下，根据盒模型box model，dom-tree上的每个元素产生0至多个box，这些boxs的布局通过一下几个方面控制：
        1. box尺寸和类型
        2. 定位方案（正常流，浮动，绝对定位）
        3. dom-tree上元素的相互关系
        4. 外部信息（例如，视口尺寸，图片的固定尺寸等等）
    2. 视口 viewport
    3. 包含块 containing blocks
        - 在css2.2中，许多盒子的位置和大小是相对于称为**包含块**的矩形盒的边缘计算的。一般而言，当前的box充当后代box的包含块。
        - 每个box相对于其包含块被赋予一个位置，但是它的尺寸显示不受包含块的限制，它可能溢出
2. **控制box生成**
    1. 块级元素与块盒
        1. 术语：
            1. 块级盒：block-level box
            2. 块容器盒：block container box
            3. 块盒：block box
            4. 块：block 在上面三个术语没有歧义的场景下，可以简称为“块”
        2. 介绍：
            - **块级元素**（lock-level elements）是源文档中那些被格式化成视觉上的块的元素（例如，段落）。display属性的下列值能让一个元素变成块级的：block、list-item和table。
            - 块级盒是参与块格式化上下文BFC的盒。每个块级元素生成一个主块级盒（principal block-level box），用来包含后代盒及生成的内容，并且任何定位方案都与该盒有关。
            - 有些块级元素可能会生成除主盒外的额外的盒：list-item元素。这些额外的盒根据主盒来放置。
            - **除了表格盒（table box）和替换元素外**，块级盒也是块容器盒。一个块容器盒，里面要么只包含块级盒，要么只包含行内盒，即要么是BFC，要么是IFC，只能其一。
            - 不是所以的块容器盒都是块级盒：非替换的行内块，非替换的表格单元，是块容器，但不是块级盒，例如display:inline-block。
            - 关系：
                - 块容器盒 不一定是 块级盒，例如display:inline-block
                - 块级盒 不一定是 块容器盒，例如表格盒、替换元素（待确定）
                - 块盒两者都是
    <!-- 1. 块级元素和块级盒
        - 块级元素会生成块级主盒（block-level principal box）
        - 使元素生成块级的 display为：block、list-item、table
        - 块级盒（block-level box）参与进BFC
        - 一般情况下，块级box是块容器box，除了一些特例，例如table box、或替换元素的主盒
        - 一个block container box，期内要么只包含块级盒，要么建立一个IFC内联格式上下文，该ifc内只包含内联盒子
        - 主盒为块容器盒的元素，是**块容器元素**
        - 重点：
            - 块级元素，即对应display为block、list-item、table的元素，肯定对应是 block-level box
            - block-level box 不一定是 block container box
            - block container box 不一定是 block-level box
            - block box：既是block-level box，也是block container box
            - 举例：
                - display:inlie-block的元素是container box，不是block-level box -->
    2. 匿名块盒
        - 亟待整理
    3. 内联级元素和内联盒
        1. 术语
            - 内联、行内：inline
            - 内联/行内级盒：inline-level box
            - 行内盒：inline box
            - 原子行内级盒：atomic inline-level box
        2. 介绍
            - **内联/行内级元素**（Inline-level elements）是源文档中那些不会形成新内容块的元素，内容分布于多行（例如，段落中的一部分文本，行内图片等）。
            - display属性的下列值可以让一个元素变成行内级：inline、inline-table、inline-block。
            - 行内级元素生成行内级盒（inline-level box），即参与行内格式化上下文IFC的盒
            - 行内盒（inline box）是一种行内级盒，其内容参与了它的包含行内格式上下文IFC。
            - dispaly值为inline的非替换元素会生成一个**行内盒**，例如一个span元素。
            - 不属于行内盒的行内级盒被称为原子行内级盒（例如，行内级替换元素img，inline-block元素，inline-table元素等），因为它们作为单一的不透明盒参与其行内格式化上下文。
            - 小节一下：
                - 行内级盒大概分为两类：
                    1. 行内盒：display值为inline的非替换元素生成，例如span、a等
                    2. 原子行内级盒：非行内盒，例如img、dispaly:inline-block等
                - 异同点：
                    1. 对外肯定都是表示“行内”的特性
                    2. 对内，行内盒里面也是“行”特性，widht、height等属性都不生效，而原子行内级盒里面则是“块”的特性，width、height、padding、maring等属性会生效
                    3. 等等
        <!-- - 内联级元素，不构成新内容块，其内容按行分布
        - 使元素为内联级：display：inline、inline-table、inline-block
        - 内联级元素生成内联级盒（inline-level boxes），这些boxes参与内联格式化上下文ifc
        - inline box，既是内联级别的，其contents也参与其内的ifc（内联格式化上下文）。
        - **display值为inline的非替换元素**，会生成inline box
        - 不是inline boxes的inline-level boxes称为**atomic inline-level boxes**，因为它们参与它们的ifc，作为单个不透明的box。（例如替换的inline-level元素，inline-block元素，inline-table元素） -->
    4. 匿名行内盒
        - 亟待整理
    5. Run-in boxes
        - 详情见[see CSS basic box model](https://www.w3.org/TR/css3-box/)
    6. Display属性
        - 值选项：
            - inline
                - 该值会让元素生成一个或多个行内盒（可能要区分替换和非替换元素）
            - block
                - 该值让元素生成一个块盒
            - inline-block
                - 该值会让元素生成一个行内级块容器（inline-level block container）。一个inline-block的内部会被格式化成一个块盒（block box），而该元素本身会被格式化成一个原子行内级盒。
            - list-item
                - 该值会让元素生成一个主块盒和一个标记盒。关于列表级列表格式化更多信息，查看[列表](#)章节
            - none
            - table-*、inline-table
                - 这些值会让元素表现的像个表格元素一样，更多table讨论见[表格](#)章节
            - ...
3. **定位方案**
    1. 介绍：在CSS2.2标准内，一个box根据三种定位方案来布局
        - Normal flow：
            - block formatting of block-level boxes
            - inline formatting of inline-level boxes
            - relative positioning of block-level and inline-level boxes
        - Floats：
            - 在浮动模式下，box首先根据当前的正常流进行布局，然后把box脱出正常流，然后向左右浮动
        - Absolute positioning：
            - 据对定位模式下，box完全直接从正常流中脱出，即正常流中不会为该元素预留位置，并根据包含块确定位置
        - 浮动、绝对定位或根元素可以称为：**out of flow**，其它的称为：**in-flow**。
    2. 通过 position 属性来选择一个定位方案
        - 值选项：
            - static：**默认值**。box根据正常流布局，top、right、bottom、left属性无效。
            - relative：盒的位置是根据正常流（或浮动定位也可以使用relative）计算的，然后盒相对于流中的正常、原先位置偏移（不是根据其包含块偏移）。注意，table-*等display的元素上position：relative效果是未定义的，不同浏览器可能效果不同
            - absolute：相对与盒子包含块（containing block）偏移，根据top、right、bottom、left属性。虽然绝对定位的盒有margin，但是它们不会与任何其它外边距折叠。
            - fixed：盒的位置基本上使用absolute模型计算，除了其包含块是固定的，例如对于连续媒体来说是viewport。
        - UA可以把根元素的position视为static
    3. Box偏移：top right bottom left
        - **positioned element**：先共同申明下，positioned元素表示其position属性不是static
        - positioned元素会生成positioned boxes，其会根据四个属性布局：top、right、bottom、left
        - **top**：默认auto
        - **right**：默认auto
        - **bottom**：默认auto
        - **left**：默认auto
        - top、right、bottom、left：对于同一个元素，一对中只能有一个生效
4. **正常流 Normal flow**
    1. 介绍：正常流中的box属于一个格式化上下文，formatting context，可能是table、block或inline格式化上下文之一，可能在未来会增加更多的类型上下文
        - block-level boxes参与block formatting context
        - inline-level boxes参与inline formatting context
        - table formatting context在其它章节描述，此处不做介绍
        - 目前大多数情况下，正常流属于BFC
    2. BFC
        - 在bfc中，boxes从包含块的顶部开始，垂直的，一个接着一个的布局。
        - 上下两个box的间隔是通过margin属性决定，注意上下相邻的box的margin会发生折叠
        - **那些元素在它们内容里面会建立新的BFC**
            - floats
            - absolute positioned
            - block containers that are not block boxes，例如inline-block、table-cell等等
            - blocs boxes with 'overflow' other than 'visible'
            - 浮动，绝对定位的元素，非块盒的块容器（例如inline-blocks，table-cells和table-captions），以及’overflow’不为’visible’的块盒会为其内容建立新的块格式化上下文
    3. IFC
        - [见中文翻译](http://www.ayqy.net/doc/css2-1/visuren.html#inline-formatting)
        - 太多，亟待整理
    4. 相对定位
        - 一旦一个box根据正常流布局或浮动，它可以相对于这个位置来移动，这被称为**相对定位**。
        - 以这种方式偏移的box对后面的box没有影响，正常流会保留box的正常的位置，box动态更改偏移属性后，后面的box不会重新定位布局。这意味着，相对定位可能会导致**box重叠**。
        - 但是如果，相对定位导致'overflow:auto'或'overflow:scroll'溢出，则UA必须允许用户访问此内容（在其偏移位置），该内容通过创建滚动条可能会影响布局
        - 相对定位的box保持其在正常流中的尺寸，包括换行符和原来为期保留的空间。
        - 水平移动
            - 如果left和right属性值都是auto，即它们的初始值，那么实际UA使用的的值为0（即，box保持原始位置）
            - 如果left为auto，而right给定确定值，则left实际值为：-right，反之亦然
            - 如果left、right给定了确切值，那么该定位被过度约束了，其中一个会被忽略掉。如果，包含块的direction属性为ltr，则left胜出；反之right胜出。
        - 垂直移动
            - 如果top和bottom都是auto，则实际值为0，即box保持原位置
            - 如果top为auto，bottom为确切值，则top实际值为：-bottom，反之亦然
            - 如果top和bottom都不是auto，均有确切值，则top直接胜出，bottom忽略
5. **浮动 Floats**
    1. 介绍：float是一个在当前行上向左或向右浮动的box。最有趣的特征是content会沿着float box的边沿、侧面流动（当然，可以使用clear属性禁止该特征）。内容沿着左浮动框的右侧向下流动，沿着右浮动框的左侧向下流动。以下是浮动定位和内容流的介绍：
        - 浮动的box向左或右移动，直到其外边缘接触到包含块边缘或另一个浮动块的外边缘。如果存在一个line box线框，浮动框的外部顶部与当前线框的顶部对齐。
        - 如果当前位置没有足够的水平空间给浮动box，那么它会向下移动，直到找到合适位置
        - 由于浮动框不在正常流中，所以浮动box之前之后创建的的位于正常流中的块元素垂直流动，仿佛视浮动box不存在一样。但是根据需要，需要缩短当前的和随后创建在浮动box旁边的线框line boxes，以便给浮动box腾出空间，这样就营造出content沿着浮动box侧面流动的现象。
        - 当满足以下四个条件的垂直位置时，线框line box会与浮动box相邻：
            1. 在相框顶部或以下
            2. 在线框底部或上方
            3. 在浮动box的top margin下方
            4. 在浮动box的bottom margin上方
        - 如果缩短了的线框太小而不能包含任何内容，则线框只能向下移动并重新计算宽度，直到位置合适或不存在浮动box。
        - 表格、块级替换元素或会在正常流中建立自己内部新的BFC的这几类元素的边框，不得与位于同一BFC中的浮动box的margin重叠（这个有待测试）。
    2. 浮动定位：float属性
        - 适用元素：除了绝对定位的absolutely positioned（待确定）
        - 值选项：
            - none：默认值，不浮动
            - left：
            - right：
        - 以下是控制浮动行为的准确规则：
            1. 左浮动框的左外边缘可能不在其包含块的左边缘的左边。类似的规则使用与右浮动元素。
            2. 如果文档前面存在左浮动box，则后续的左浮动box置于，前面的浮动box的右边或下面。
            3. xxx
            4. xxx
            5. 浮动box的外部顶部不得高于源文档中早期元素生成的任何block或浮动box的外部顶部
            6. 浮动box的外部顶部可能不会高于源文档中早期元素生成的任何线框line boxes的顶部
            7. xxx
            8. 浮动box尽可能置于高的位置
            9. xxx
    3. 控制float旁边的流：clear属性
    4. **float具体处理，还是有待理解、测试，读标准后一知半解**
6. **绝对定位 Absolute positioning**
    1. 介绍
        - 在绝对定位模型中，box**相对于其包含块**精确偏移。
        - 其完全脱离出正常流，和其它元素互相不影响。其内容也不会像float那样会和相邻的线框有影响，而是完全脱离，可能会遮蔽正常流上的，具体是否遮蔽取决于堆叠级别。
        - 一个绝对定位的box建立一个新的包含块给其后代元素。
        - 绝对定位通过position指定，有两种值：absolute和fixed
    2. Fixed定位
        - 固定定位是绝对定位的子类别。唯一的区别是，对于固定定位的box，其包含块是`viewport`建立的（可以说是相对于viewport偏移）。
        - 对于连续媒体，当文档滚动时，fixed盒子不会移动。在这一点上，它们和fixed背景图片类似。
        - 对于分页媒体，fixed定位的盒在每一页上重复出现。
7. **属性display、position、float之间关系**
    1. 介绍：这三个css属性影响box的生成和布局：
        1. 如果display为none，那么元素不生成box，因此position和float也不会生效。
        2. 否则，如果position值为absolute或fixed，此时float和display值不会生效，float值强制置为none，display根据下表来设置。盒的位置由top、right、bottom、left以及盒的包含块来决定。
        3. 否则，如果float值不为none，那么box是浮动的，display根据下表设置，此时position为static、relative都可以生效
        4. 否则，如果元素是根元素，display根据下表来设置，但指定值为list-item应该变成计算值为block还是list-item，在2.2中未明确定义
        5. 否则，其它display属性值（计算值）就用指定值
        6. |指定值|计算值|
           |:--:|:--:|
           |inline-table|table|
           |inline,inline-block,table-*|block|
           |其它|与指定值相同| 
    2. **小节**：
        - 定位优先级：元素不存在 > 绝对定位 > 浮动 > 正常流
        - 三种定位方案是不共存的，即通过display、position、float属性设置，最后只能确定其中的一种方案，确定的规则，即按照上面的定位优先级来
8. **比较：正常流、浮动、绝对定位**
    1. 介绍：
9. **分层展示**
    1. 指定堆叠层级：z-index属性
    2. 有待整理
    3. 网友博客
        - [z-index的工作原理](https://www.w3cplus.com/css/how-z-index-works.html)
        - [关于z-index 那些你不知道的事](https://webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892)
        - [深入理解CSS中的层叠上下文和层叠顺序](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
        - [解决和分析CSS中z-index属性无效的问题-十有三博客](http://shiyousan.com/post/635861461562038949)
        - [理解CSS的 z-index属性](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index)

### 第十章 视觉格式化模型细节

1. **“包含块” 的定义**
    1. 介绍：元素生成的box的位置和大小有时是根据一个特点的矩形计算的，叫做该元素的的**包含块（containing block）**。具体的定义如下：
        1. 根元素所在的包含块是一个称为初始包含块的矩形（initial containing block）。对于连续媒体，尺寸取自视口viewport的尺寸，并且被固定在画布开始的位置；初始化块的direction属性与根元素相同。
        2. 对于其它元素，如果该元素的position属性是relative或static，包含块由其最近的块容器祖先盒的内容边界形成。（待确定是否是祖先元素的content edge!?）
        3. 如果元素position为fixed，包含块由连续媒体的视口或分页媒体的页区建立
        4. 如果元素position为absolute，包含块由最近position为absolute、relative、fixed的祖先建立，即非static
            1. 如果该祖先是一个行内元素，包含块就是围绕着为该元素生成的第一个和最后一个行内盒的内边距框的边界框。在css2.2中，如果该行内元素被跨行分隔了，那么该包含块是未定义的。
            2. 否则，包含块由该祖先内边距边界（padding edge）形成（待确定是否是祖先元素的padding edge!?）
        - 如果没有这样的祖先，包含块就是初始包含块
2. **内容宽度：width属性**
3. **计算width和margin**
4. **最小、最大宽度：min-width与max-width**
5. **内容高度：height属性**
6. **计算height与margin**
7. **最小、最大高度：min-height与max-height**
8. **行高的计算：line-height与vertical-align属性**
    - 详细：
        - [中文css2.1标准文档](http://www.ayqy.net/doc/css2-1/visudet.html#line-height)
    - 感想：有点意思
        1. 对于一个行框/线框，也就是该行所有行内级盒的父元素，其基准线的确认问题！？？
            - 如果里面含有，文本或行内盒之类的，很明显其基准线按照 `x` 来
            - 否则，若不含有文本或行内盒之类的，即行框仅含有原子行内级盒时，其行框基准线不确定了：
                1. **假装存在一个`x`，并以其为baseline**：ie9及其以下，其它浏览器的旧版本
                2. **以行框下外边距边界为baseline**：ie10及其以上，其它浏览器的最新版本
                3. 小节：如果要考虑兼容问题采用1方案，如果不需要考虑兼容采用2，例如公司内部项目一般不需要考虑兼容
        2. 至于行框内的行内盒和原子行内级盒的基准线，就按照标准文档说的
            - inline-table盒的baseline是表格的第一行的baseline
            - inline-block盒的baseline是它的最后一个常规流中的行框的baseline，除非它没有流内行框或者其overflow属性的计算值不为visible，此时的baseline是下外边距边界。
    <!-- 1. 介绍
        - 如ifc章节中所述，UA把行内级盒排列在一个行框的垂直堆叠里。行框的高度由下列规则决定：
            1. 计算行框中每个行内级盒的高度时，对于原子行内级盒（行内级替换元素、inline-block元素、inline-table元素），这个值就是其外边距margin的高度；对于行内盒，这个值就是其line-height。
            2. 行内级盒是根据其vertical-align属性垂直对齐的。 -->

### 第十一章 可视化效果

### 第十二章 内容生成，自动编号与列表

### 第十四章 颜色与背景

### 第十五章 字体

### 第十六章 文本

### 第十七章 表格

### 第十八章 用户界面










## w3c官网css3-box标准：CSS basic box model

- 地址：https://www.w3.org/TR/css3-box/

### 第四章 Types of boxes

### 第五章 The padding properties

### 第十章 Floating boxes

### 第十一章 Overflow








<!-- - **长度单位**
    - 介绍：
        - 长度单位可为正数和负数，不过有些属性可能只接受正数。
        - 一个般情况下，数字后均需要带单位，只有一个例外：0
        - 长度单位可分为两类：绝对长度单位和相对长度单位
    -  -->




## 参考

- [MDN CSS参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)
- [w3c CSS参考](http://www.w3school.com.cn/cssref/index.asp)
- 《css权威指南》
- [CDN参考：值与单位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Values_and_units)
- [深入理解CSS中的长度单位](https://www.cnblogs.com/xiaohuochai/p/5485683.html)
- [w3c css2.2标准](https://www.w3.org/TR/CSS22)
