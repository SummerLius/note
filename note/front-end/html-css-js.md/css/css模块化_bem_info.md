<!-- TOC -->

- [Bem Info](#bem-info)
    - [快速入门](#快速入门)
        - [Block](#block)
        - [Element](#element)
        - [我应该创建 block 还是 element](#我应该创建-block-还是-element)
        - [Modifier](#modifier)
        - [Mix](#mix)
        - [File structure](#file-structure)
    - [关键概念](#关键概念)
        - [Block](#block-1)
        - [Element](#element-1)
        - [Modifier](#modifier-1)
        - [BEM entity](#bem-entity)
        - [Mix](#mix-1)
        - [BEM Tree](#bem-tree)
        - [Block实现](#block实现)
        - [Block实现技术](#block实现技术)
        - [Block redefinition](#block-redefinition)
        - [Redefinition level](#redefinition-level)
    - [命名约定](#命名约定)
        - [概要](#概要)
        - [命名规则](#命名规则)
        - [可选的命名方案](#可选的命名方案)
    - [CSS](#css)
        - [HTMl for CSS](#html-for-css)
        - [Selectors](#selectors)
        - [Modifiers](#modifiers)
        - [Mixes](#mixes)
        - [划分代码](#划分代码)
        - [通过重定义级别来划分代码](#通过重定义级别来划分代码)
        - [如何将css迁移到BEM规范](#如何将css迁移到bem规范)
    - [HTML](#html)
        - [将blocks绑定到DOM节点](#将blocks绑定到dom节点)
        - [嵌套元素](#嵌套元素)
        - [使用HTML包装器](#使用html包装器)
        - [手动创建HTML](#手动创建html)
        - [自动创建HTML](#自动创建html)
    - [JavaScript](#javascript)
        - [BEM js组件基本原理](#bem-js组件基本原理)
        - [如何将js切换到BEM风格](#如何将js切换到bem风格)
        - [BEM js实现](#bem-js实现)
    - [文件结构](#文件结构)
        - [BEM项目文件结构指南](#bem项目文件结构指南)
        - [结构方式](#结构方式)
    - [重定义级别](#重定义级别)
        - [什么是重定义级别](#什么是重定义级别)
        - [重定义级别应用场景](#重定义级别应用场景)
        - [如何使用重定义级别](#如何使用重定义级别)
        - [使用重定义级别的示例](#使用重定义级别的示例)
    - [Block modification](#block-modification)
        - [如何选择block的修改方法](#如何选择block的修改方法)
        - [使用modifier修改block](#使用modifier修改block)
        - [使用mix修改block](#使用mix修改block)
        - [使用redefinition level修改block](#使用redefinition-level修改block)
        - [使用context修改block](#使用context修改block)
    - [Build](#build)
        - [介绍](#介绍)
        - [构建阶段](#构建阶段)
        - [构建结果](#构建结果)
        - [构建工具](#构建工具)
    - [Declarations](#declarations)
        - [获得声明的方式](#获得声明的方式)
        - [使用声明](#使用声明)
    - [Solved problems](#solved-problems)

<!-- /TOC -->

# Bem Info

- [Bem Info](https://en.bem.info)
- [Github bem-site/bem-method](https://github.com/bem-site/bem-method)
- [Github organization/bem](https://github.com/bem)

## 快速入门

BEM（块，元素，修饰符）是一种基于组件的Web开发方法。 其背后的想法是将用户界面划分为独立的块。 这使得即使使用复杂的UI也可以轻松快速地进行界面开发，并且无需复制和粘贴即可重用现有代码。

### Block

- Block是功能独立的页面组件，可以重复使用。在HTML中，block一般由 `class` 属性表示。
- 特性：
    - Block名字，描述block是什么，而不是描述状态；
    - Block作为页面独立可复用的组件，不能影响其所在环境，这意味着不应该给block设置外部的几何（例如margin属性）或定位；
        - > 可以将设置元素属性 `box-sizing: border-box`
    - 不应该在BEM中使用css标签或者ID选择器。
- 上面特征确保可复用的block的独立性。
- Block使用指南：
    - block可以嵌套在其它block中
    - 嵌套层次没有限制
        ```html
        <!-- `header` block -->
        <header class="header">
            <!-- Nested `logo` block -->
            <div class="logo"></div>
        
            <!-- Nested `search-form` block -->
            <form class="search-form"></form>
        </header>
        ```
### Element

- Element作为block的一部分，不能拿出来单独使用。
- 特征：
    - 同block类似，elment名字，描述element是什么，而不是状态；
    - element名字的完整结构为 `block-name__element-name`，中间通过两个下划线隔开；
        ```html
        <!-- `search-form` block -->
        <form class="search-form">
            <!-- `input` element in the `search-form` block -->
            <input class="search-form__input">
        
            <!-- `button` element in the `search-form` block -->
            <button class="search-form__button">Search</button>
        </form>
        ```
- Element使用指南：
    - 嵌套
        - element可以嵌套在其它element中
        - 嵌套层次没有限制
        - element总是block的成员，不能是其它element的成员。这个意思就是，element的命名只能以block为层级，不能以其它element为层级，例如命名不能为 “block__elem1__elem2”
        - block可以在DOM树具有嵌套的element结构，但是这种结构在BEM命名规范中不是嵌套的，而是平面的。
            ```html
            <div class="block">
                <div class="block__elem1">
                    <div class="block__elem2">
                        <div class="block__elem3"></div>
                    </div>
                </div>
            </div>
            ```
            ```css
            .block {}
            .block__elem1 {}
            .block__elem2 {}
            .block__elem3 {}
            ```
        - 上面BEM元素命名平面的规范特点，可以让你更改block的HTML DOM结构（嵌套等结构），而不需要BEM的element命名结构，因为其本来就是平面的。
    - 成员
        - Element总是block的成员，不能拿出来单独使用。
    - 可选
        - Element是block组件的可选成员，可有可无。

### 我应该创建 block 还是 element

1. 创建block
    - 一段代码可能被重复使用，也不依赖于其它页面组件
2. 创建element
    - 一段代码如果脱离了其父实体，不能被重复使用

### Modifier

- Modifier描述block或element的外观、状态、行为等。
- 特性：
    - Modifier名字描述外观、状态、行为
    - Modifier名字通过一个下划线和block或element名字隔开
- Modifier类型
    - Boolean
        - Modifier全名结构
            - `block-name_modifier-name`
            - `block-name__element-name_modifier-name`
    - key-value
        - 当modifier的值显得重要时，使用key-value命名。
            - `block-name_modifier-name_modifier-value`
            - `block-name__element-name_modifier-name_modifier-value`
    - 示例
        ```html
        <!-- The `search-form` block has the `theme` modifier with the value `islands` -->
        <form class="search-form search-form_theme_islands">
            <input class="search-form__input">
        
            <!-- The `button` element has the `size` modifier with the value `m` -->
            <button class="search-form__button search-form__button_size_m">Search</button>
        </form>
        
        <!-- You can't use two identical modifiers with different values simultaneously -->
        <form class="search-form
                     search-form_theme_islands
                     search-form_theme_lite">
        
            <input class="search-form__input">
        
            <button class="search-form__button
                           search-form__button_size_s
                           search-form__button_size_m">
                Search
            </button>
        </form>
        ```
- Modifier使用指南
    - Modifier不能单独使用

### Mix

- Mix是一种在单个DOM节点上使用不同BEM实体的技术
- Mix可以，结合多个实体的行为和样式，无需复制代码
- Mix可以，基于现有UI组件创建语义上的新UI组件
- 示例
    ```html
    <!-- `header` block -->
    <div class="header">
        <!--
            The `search-form` block is mixed with the `search-form` element
            from the `header` block
        -->
        <div class="search-form header__search-form"></div>
    </div>
    ```
- 在上面例子中，将block `search-form` 和 element `header__search-form` 一起使用。

### File structure

- BEM规范中采用的组件命名方法，也适用项目中的文件结构。Block、Element、Modifier可以划分为独立的文件。
- 特性：
    - 一个block对应一个目录，并且两者名字要一致
    - 一个block的实现划分为不同的技术文件，例如 `header.css` 和 `header.js`
    - block目录是其element和modifier子目录的根目录
    - element目录的命名以双下划线开头，例如 `header/__logo`，`menu/__item`
    - modifier目录的命名以单下划线开头，例如 `header/_fixed`，`menu/_theme_islands`
    - element和modifier的实现划分为不同的技术文件，例如 `header__input.js`，`header_theme_islands.css`
- 示例
    ```
    search-form/                       # Directory of the search-form

    __input/                           # Subdirectory of the search-form__input
        search-form__input.css         # CSS implementation of the
                                       # search-form__input element
        search-form__input.js          # JavaScript implementation of the
                                       # search-form__input element

    __button/                          # Subdirectory of the search-form__button
                                       # element
        search-form__button.css
        search-form__button.js

    _theme/                            # Subdirectory of the search-form_theme
                                       # modifier
        search-form_theme_islands.css  # CSS implementation of the search-form block
                                       # that has the theme modifier with the value
                                       # islands
        search-form_theme_lite.css     # CSS implementation of the search-form block
                                       # that has the theme modifier with the value
                                       # lite

    search-form.css                    # CSS implementation of the search-form block
    search-form.js                     # JavaScript implementation of the
                                       # search-form block
    ```
- **注意：**你不需要完全按照上面推荐的嵌套目录结构来组织项目。你可以选择其他遵循BEM原则的文件组织结构，例如flat、flex。具体在下面章节可见。

## 关键概念

### Block

- 逻辑和功能独立的页面组件，相当于Web组件中的组件。Block封装了行为（js）、模板（html）、样式（css）和其它技术。独立的block允许他们重复使用，以促进项目的开发。
- 特性：
    - 嵌套结构。block可以嵌套在其它block
    - 任意位置。
    - 可重用。

### Element

- Block的组成部分，不能在Block外使用。

### Modifier

- 一个BEM实体，定义了block或element的外观、行为、状态等。
- Modifier本质上类似于HTML的属性。使用不同的modifier，是相同的block外观看起来不同。

### BEM entity

- Block、element和modifier都称为BEM实体。

### Mix

- Mix就是将多个BEM实体应用在同一个DOM节点上
- Mix允许你：
    - 结合几个BEM实体，便面代码重复
    - 在现有的BEM实体的基础上创建新的组件

### BEM Tree

### Block实现

- BEM实体实现的不同方面
    - 行为——behavior
    - 外观——appearance
    - 测试——tests
    - 模板——templates
    - 文档——documentation
    - 依赖描述——description of dependencies
    - 额外数据——additional data (e.g., images)

### Block实现技术

- Blocks可以用一种或多种技术实现
    - behavior——JavaScript，CoffeeScript
    - appearance——CSS，Stylus，Sass
    - templates——BEMHTML，BH，Pug，Handlebars，XSL
    - documentation——Markdown，Wiki，XML

### Block redefinition
### Redefinition level

## 命名约定

### 概要

- BEM实体的命名是唯一的。相同的BEM实体在不同的技术（CSS、JavaScript、HTML）实现方面始终具有相同的名称。
- 命名约定的主要目的是赋予名称含义，以便他们为开发人员提供尽可能丰富的信息。

### 命名规则

- 命名格式：`block-name__elem-name_mod-name_mod-val`
    - 字母全为小写
    - 单词用连字符隔开（-）
    - block名字定义了它的element和modifier的命名空间
    - block和element，以双下划线隔开（__）
    - modifier和block或element，以单下划线隔开（_）
    - modifier的name和value，以单下划线隔开（_）

### 可选的命名方案

- 概要
    - 上面给的命名规则是BEM实体的经典方法。
    - 当然根据不同的情况，也可以使用不同的命名规则。
- 两个连字符（Two Dashes style）
    - `block-name__elem-name--mod-name--mod-val`
- 骆驼命名（CamelCase style）
    - `blockName-elemName_modName_modVal`
- React style
    - `BlockName-ElemName_modName_modVal`
- 无命名空间（No Namespace style）
    - `_available`
    - modifier的命名和block、element分开
- 自定义

## CSS

- 在BEM规范中，css用于页面布局，是block的实现技术之一。
- 以下部分介绍了使用css的核心原则

### HTMl for CSS

- 如何制作HTML包装器？
    - 通常来说，HTML包装器主要用于：
        - 相对于其它元素定位HTML元素
        - 在一个section内部定位HTML元素
    - 在BEM规范中，可以通过mix或创建额外的block来达到相同的结果，你不需要创建其它抽象包装器。
- 相对于其它block定位block
    - 相对于其它block定位block，最好的方法是使用混合（mix）
    - 示例
        ```html
        <body class="page">
            <!-- header and navigation-->
            <header class="header page__header">...</header>
        
            <!-- footer -->
            <footer class="footer page__footer">...</footer>
        </body>
        ```
        ```css
        .page__header {
            padding: 20px;
        }
        
        .page__footer {
            padding: 50px;
        }
        ```
- 在block内部定位元素
    - 在block内部定位元素，通常通过创建额外的block来实现。（例如，block__inner。）
    - 示例
        ```html
        <body class="page">
            <div class="page__inner">
              <!-- header and navigation-->
              <header class="header">...</header>
        
              <!-- footer -->
              <footer class="footer">...</footer>
            </div>
        </body>
        ```
        ```css
        .page__inner {
            margin-right: auto;
            margin-left: auto;
            width: 960px;
        }
        ```

### Selectors

- 概要
    - BEM规范不使用tag和ID选择器。
    - block和element的样式通过类选择器定义
- 类选择器
    - class属性是以空格隔开的列表。
    - 这允许你可以在单个DOM节点上使用不同的BEM实体。
- tag和class的组合选择器
    - BEM规范不推荐在选择器中组合tag和class
    - 选择器组合tag和class（例如，button.button）使CSS规则更加特定、具体、不通用，使得这种规则越难被覆盖，因为这种选择器优先级较高。
- 选择器嵌套
    - BEM规范允许使用嵌套选择器，但是建议尽量减少它们的使用。嵌套选择器增加了代码耦合，使得代码不够重用。
    - **如果需要相对于block的状态更改元素的样式，则嵌套是合适的。**（使用嵌套，可以在html上使用过相同的类名，却可以应用不同的样式，因为嵌套规则不一样，这个用的好，也会有趣，不过还是谨慎使用。）
        ```css
        .button_hovered .button__text
        {
            text-decoration: underline;
        }
        
        .button_theme_islands .button__text
        {
            line-height: 1.5;
        }
        ```
- 组合选择器
    - BEM规范不建议使用组合选择器。
    - 组合选择器（例如 .button.button_theme_islands）相对于简单选择器具有更高的CSS特异性，这样对于之后重新定义变得困难。
- Naming
    - 选择器的名称必须完整准确的描述它所代表的BEM实体。
    - 示例：
        ```html
        <!-- `logo` block -->
        <div class="logo logo_theme_islands">
            <img src="URL" alt="logo" class="logo__img">
        </div>
        
        <!-- `user` block-->
        <div class="user user_theme_islands">
            <img src="URL" alt="user-logo" class="user__img">
          ...
        </div>
        ```
        ```css
        .logo {}                  /* CSS class for the `logo` block */

        .logo__img {}             /* CSS class for the `logo__img` element */
        
        .logo_theme_islands {}    /* CSS class for the `logo_theme_islands` modifier */
        
        .user {}                  /* CSS class for the `user` block */
        
        .user__img {}             /* CSS class for the `user__img` element */
        
        .user_theme_islands {}    /* CSS class for the `user_theme_islands` modifier */
        ```

### Modifiers

- BEM modifier用来设置block的外观、状态、和行为。
- 通过设置或删除modifier来更改block的设计。
- 示例：
    ```html
    <button class="button button_size_s">...</button>
    ```
    ```css
    .button {
        font-family: Arial, sans-serif;
        text-align: center;
    }
    
    .button_size_s {
        font-size: 13px;
        line-height: 24px;
    }
    
    .button_size_m {
        font-size: 15px;
        line-height: 28px;
    }
    ```

### Mixes

- 概要
    - Mixes允许你：
        - 结合多个BEM实体的行为和样式于单个DOM节点，而不需要重复代码
        - 将相同的格式应用于不同的HTML元素
- 外部几何和定位
    - 使用BEM规范的css中，block的外部几何和定位通过设置父block来实现。（即block本身不影响环境，而是环境控制block的外部几何和定位）
    - 示例：
        ```html
        <!-- `header` block -->
        <header class="header">
              <button class="button header__button">...</button>
        </header>
        ```
        ```css
        .button {
            font-family: Arial, sans-serif;
            text-align: center;
            border: 1px solid black;    /* Frame */
        }
        .header__button {
            margin: 30px;               /* Padding */
            position: relative;
        }
        ```
    - 在上面示例中，button（block）的外部几何和定位通过header__button（element）设置。button（block）没有指定任何边距，因此可以在任何地方轻松重复使用。
- block的样式组
    - 有时需要同时将相同的格式应用于页面上的多个不同HTML元素。
    - 选择器组通常应用在这个场景，但是在BEM中不是很推荐这种方式。
    - 选择器组示例：
        ```html
        <article class="article">...</article>

        <footer class="footer">
            <div class="copyright">...</div>
        </footer>
        ```
        ```css
        article, .footer div {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #000;
        }
        ```
    - 在上面的例子中，article和copyright的block具有相同的颜色和字体。
    - 虽然，选择器组可以快速更改页面的设计，但是这种方式会增加代码的耦合。
    - 这就是BEM使用Mix来统一格式化整个HTML元素集的原因。
    - 示例：
        ```html
        <article class="article text">...</article>

        <footer class="footer">
            <div class="copyright text">...</div>
        </footer>
        ```
        ```css
        .text {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #000;
        }
        ```

### 划分代码

- 概要
    - 以下用于构造和存储代码的基本原则适用于BEM风格的CSS：
        - 代码划分为单独的部分。每个block的逻辑及其可选的element和modifier在单独的文件中定义。
        - 根据BEM项目的文件系统组织规则存储每个组件的css文件。
    - 将代码划分为几部分，并控制项目的文件结构使其成为可能：
        - 简化项目导航
        - 重用和移动组件
        - 使用重新定义级别并使用程序集（Work with redefinition levels and use an assembly.）
    - 示例：
        ```
        button/                      # Directory of the button
            _size
                button_size_s.css    # CSS implementation of the modifier

            button.css               # CSS implementation of the button block
        ```
    - 这种分离可以使你快速找到所需的文件。
- 单一责任原则（Single responsibility principle）
    - 就像面对对象编程一样，BEM规范中的单一责任原则意味着每个css实现模块都必须承担单一责任。
    - 单一责任选择器为代码提供了更大的灵活性
    - 示例
        ```html
        <header class="header">
            <button class="button header__button">...</button>
        </header>
        ```
        ```css
        .button {
            font-family: Arial, sans-serif;
            border: 1px solid black;
            background: #fff;
        }
        ```
    - 职责：外部几何和定位属性（示例如下，使用header_button来控制外部几何和定位）
        - 正确
            ```css
            .header__button {
                margin: 30px;
                position: relative;
            }
            ```
        - 错误
            ```css
            .header__button {
                font-family: Arial, sans-serif;
                position: relative;
                border: 1px solid black;
                margin: 30px;
            }
            ```
- 开闭原则（Open/closed principle）
    - 页面上任何HTML元素都应该通过modifier进行扩展，但是不可以删除以前的。
    - **也就是对于新的需求，应该开发新的css实现，而无需更改现有的css实现。**
- DRY
    - DRY（"don't repeat yourself"）是一种软件开发原则，旨在减少代码中的重复。
    - 对于BEM规范，该原则的本质是使每个BEM实体必须在系统内具有单一，明确的表示。
- 组合而不是继承（Composition instead of inheritance）
    - 继承是一种基于现有css类（父类或基类）定义新css类的机制。派生类可以添加自己的属性，也可以使用父属性。
    - 在BEM规范中，可以通过组合现有的css，来实现新的css。这使得代码保持解耦和灵活性。
    - 示例：
        - 假如目前存在三个已有的实现：
            - A button (the button block).
            - A menu (the menu block).
            - A popup window (the popup block).
        - 任务：实现一个drop-down列表（即 select block）
        - 思路：开发一个drop-down列表组件，并自定义外观，并不是一个简单的任务。但是我们借助现有的组件来组合。
            ```html
            <div class="select">
                <button class="button select__button">
                    <span class="button__text">Block</span>
                </button>
            </div>
            
            <div class="popup">
                <div class="menu">
                    <div class="menu__item">Block</div>
                    <div class="menu__item">Element</div>
                    <div class="menu__item">Modifier</div>
                </div>
            </div>
            ```
            
### 通过重定义级别来划分代码

- 将BEM原则应用于CSS，允许你将block分成不同的级别。
- 分离成各个级别可以：
    - 通过继承或扩展，在不同的重定义级别上为block实现新外观，同时保留原先的外观。
    - 完全覆盖block的外观（重新定义）
    - 添加具有新外观的block
- 你可以使用重定义级别（redefinition levels）来创建css block库。然后仅使用项目中需要的部分。
- 示例：
    - 基础结构
        ```
        common.blocks/
            button/
                button.css    # Basic CSS implementation of a button
        
        desktop.blocks/
            button/
                button.css    # Button specifics for desktop
        
        mobile.blocks/
            button/
                button.css    # Button specifics for mobile
        ```
    - 在构建期间，desktop.css文件会从common级别获取button的所有基本css规则和从desktop级别获取重定义的规则
        ```
        @import "common.blocks/button/button.css";    /* Basic CSS rules */
        @import "desktop.blocks/button/button.css";   /* Specifics for desktop */
        ```
    - 同上，mobile.css文件也会包含common级别的button规则和mobile级别的重定义规则。
        ```
        @import "common.blocks/button/button.css";    /* Basic CSS rules */
        @import "mobile.blocks/button/button.css";    /* Specifics for mobile */
        ```
    - 将button block划分成不同的级别，可以允许你：
        - 在其它级别中，完全覆盖block外观样式
        - 在其他啊级别中，添加或部分修改block的外观样式

### 如何将css迁移到BEM规范

- 如何切换到BEM风格的css
    - 抛开DOM模型，开始学习创建BEM的block
    - 不要使用ID和tag选择器
    - 最小化嵌套选择器的数量
    - 使用css的class命名约定，以避免命名冲突，并使选择器名称尽可能的清晰
    - 使用BEM规范中的block、element和modifier
    - 如果block的css属性可能会有变化，那么应该将这属性使用modifier来控制
    - 使用混合（mix）
    - 将代码分成小的独立部分，以便使用单个块
    - 重用block
- 如何在现有的项目中开始BEM概念
    - 使用BEM规范创建新组件，并根据需要更改旧组件
    - 在设计block时，请遵循上面的原则
    - 在css类名中使用前缀（例如，bem-），以便将新代码和旧代码区分开来

## HTML

### 将blocks绑定到DOM节点

- 概要
    - 页面元素以block、element、modifier的形式描述。
    - 如何应用block、element、modifier到HTML节点，将其名称写入html元素的class属性中即可。
    - 在最简单的情况下，单个DOM节点，对应于单个block
        ```html
        <span class="menu"></span>
        ```
- 多个block应用到单个DOM节点
    - 将多个BEM实体应用到HTML元素，仅需将多个BEM实体名字添加到HTML元素的class属性上。
    - 这种方法被称为混合（mix）。
    - 一个常用的mix例子为，将modifier应用到block或element，来应用不同的外观样式。
- 单个block应用到多个DOM节点
    - 在某些js任务上，例如在页面上需要同时初始化多个模块，那么可以将同一个BEM实体应用到这些模块上。

### 嵌套元素

- BEM规范中的命名约定不允许你层叠element名（例如，block__elem1__elem2）。
- 但是你可以随意嵌套html元素，不受限制。
    ```html
    <ul class="menu">
        <li class="menu__item">
            <a class="menu__link" href="https://">...</a>
        </li>
    </ul>
    ```

### 使用HTML包装器

- BEM规范，对于定位block
    - 不建议使用HTML包装器
    - 建议使用混合（mix）
- 相对其它block定位block
    - 方法：使用混合（mix）。
    - 示例：
        ```html
        <body class="page">
            <!-- Header and navigation -->
            <header class="header page__header">...</header>
            <!-- footer -->
            <footer class="footer page__footer">...</footer>
        </body>
        ```
        ```css
        .page__header {
            padding: 20px;
        }
        
        .page__footer {
            padding: 50px;
        }
        ```
    - 在上例中，`header`和`footer`块使用`page`内的element来定位：`page__header`、`page__footer`。同时block `header`、`header`、`footer`仍然保持独立性，因为其没有定位的属性。
- 在block内部定位html元素
    - 方法：使用额外的block。
    - 示例：
        ```html
        <button class="button">
            <span class="button__inner">
                <span class="icon"></span>
            </span>
        </button>
        ```
        ```css
        .button__inner {
            margin: auto;
            width: 10px;
        }
        ```
    - 上例中，button__inner元素含有定位的样式，来定位控制button内部的元素，类似于一个包装器的功能。

### 手动创建HTML

- 若是手动创建HTML，请遵循上述的规则。
- 在HTML中，block标记在多个html元素上，如果block名字更改，则需要更改html页面上的所有对应的旧名字。
- 因此，BEM项目，通常不手动编写HTML。

### 自动创建HTML

- html代码可以自动生成。
- BEM允许当你修改block实现时，可以动态的将修改应用到html上的block应用的元素。为了达到这种功能，需要使用模板。
- 模板（template）技术是一种block实现，会生成HTML代码。
- BEM规范中的模板以声明方式编写，这使我们能够应用BEM的主要原则：
    - 应用统一的主题域
    - 划分代码为几部分
    - 使用重定义级别
- 应用统一的主题域
    - 模板是根据block、element、modifier定义的。
    - 为此，在DOM tree上有一个用于处理模板的抽象级别：BEM tree。
    - BEM tree定义了BEM实体的名称及其状态、顺序和嵌套。
    - 模板引擎使用BEM树上的信息来构建DOM节点树。
    - BEM树可以使用支持分层树结构的任何格式。xml、json、yml等等。
        ```html
        <header class="header">
            <img class="logo">
            <form class="search-form">
                <input class="input">
                <button class="button"></button>
            </form>
            <ul class="lang-switcher">
                <li class="lang-switcher__item">
                    <a class="lang-switcher__link" href="url">en</a>
                </li>
                <li class="lang-switcher__item">
                    <a class="lang-switcher__link" href="url">ru</a>
                </li>
            </ul>
        </header>
        ```
        ```
        header
            logo
            search-form
                input
                button
            lang-switcher
                lang-switcher__item
                    lang-switcher__link
                lang-switcher__item
                    lang-switcher__link
        ```
- 划分代码为几部分
    - 根据BEM项目的文件结构组织规则，模板代码存储在单独的block文件中。
    - 你可以为整个block创建模板，也可以为单独的element和modifier创建模板。
    - 例如：
        - 此处有 `menu` block的文件结构
            ```
            menu/
                __item/
                    menu__item.css
                    menu__item.js
                    menu__item.tmpl     # Template for the `menu__item` element
                menu.css
                menu.js
                menu.tmpl               # Template for the `menu` element
            ```
        - `menu` block模板
            ```
            block('menu')(
              tag()('ul')               // The <ul> tag is set for the `menu` block
            );
            ```
        - `menu__item` element模板
            ```
            block('menu').elem('item')(
              tag()('li')               // The <li> tag is set for all `menu__item` elements
            );
            ```
        - 目标编译后生成的HMTL实现为：
            ```html
            <ul class="menu">
              <li class="menu__item">...</li>
              <li class="menu__item">...</li>
            </ul>
            ```
- 使用重定义级别
    - 重定义模板或其中的部分
        - 示例：
            ```
            project
                library.blocks/                 # Redefinition level with blocks from the library
                    menu/                       # The `menu` block from the library
                        __item/
                            menu__item.tmpl     # The `menu__item` element template
                        menu.css
                        menu.js
                        menu.tmpl               # The `menu` block template
                common.blocks/
            ```
        - 略...（待了解，详情见官网）
    - 将html元素添加到block中
        - 你可以使用模板在运行时更改块。例如，您可以添加新的HTML元素。
        - `menu` block由下面的BEM树表示：
            ```
            menu
                menu__item
                menu__item
            ```
        - 要在block（menu）中定位元素（menu__itme），需要创建一个额外的元素，如menu__inner。新元素与数据无关，只需要添加标记。这意味着你可以在编译模板时动态添加它。
            ```js
            block('menu')(
                tag()('menu'),
                // Adding the 'menu__inner' element
                content()(function() {
                    return {
                        elem: 'inner',
                        content: this.ctx.content
                    };
                })
            );
            
            // Setting the <ul> tag for the 'menu__inner' element
            elem('inner')(
                tag()('ul')
            );
            ```
        - 最后生成的html结果
            ```html
            <menu class="menu">
                <ul class="menu__inner">           // adds new element
                  <li class="menu__item"></li>
                  <li class="menu__item"></li>
                </ul>
            </menu>
            ```

## JavaScript

- 在BEM中，js主要用来使网页动态起来，是block实现的技术之一。

### BEM js组件基本原理

- 概要
    - js是block实现技术之一，也会看到其中BEM的主要概念。
- 统一主题域
    - 在web开发中，最终产品（例如网页）由不同的技术组成（html、css、js等）。在BEM中，在这些技术上会使用相同的术语和实现方法。这意味着使用BEM的整个项目有一个统一的认识，基于block、element、modifier的运行方式。
    - 所以，BEM block的js实现不适用DOM元素的概念，而是使用BEM tree抽象概念。
    - 示例：
        - 使用添加class的通用解决方案。此方法不一定方便，因为你必须对块名进行硬编码。
            ```js
            document.querySelector('.button')
              .addEventListener('click', function() {
                document.querySelector('.popup').classList.toggle('popup_visible');
            }, false);
            ```
        - 使用BEM原则，并不使用class操作，而是使用block、element、modifier进行操作。
            ```js
            block('button').click(function() {
                block('popup').toggleMod('visible');
            });
            ```
    - 使用统一的主题域，可以让组件之间的交互以更高级的方式进行交互。（而不是原始的，根据class、id、tag通过选择器找到元素然后操作等）
    - 略...
- 划分代码为几部分
    - 略...
- 使用重定义级别区分代码
    - 略...

### 如何将js切换到BEM风格

- 最快的方法是在项目中开始应用BEM原则
- 要立即使用项目中的所有BEM概念，您需要：
    - 在所有技术中使用统一术语：block、element、modifier
    - 在JavaScript级别创建独立组件
    - 使用类似于css的重定义级别更改block、element、modifier的行为
    - 重用block并在项目之间迁移它们
    - 由于组件独立，可以单独开发block，进而促进和加速项目的开发和调试
    - 通过项目的文件结构简化导航

### BEM js实现

- 声明
    - BEM项目中的声明性JavaScript如下所示：
        - 每个block的行为单独描述
        - block的状态以声明方式设置，更改状态时，将自动调用为此状态的代码
        - block的逻辑被描述为用于执行这些操作的一组动作和条件。这使得block的功能可以分为单独的部分并使用重定义级别
- BEM js面向对象设计原理
    - 封装
        - 在BEM中，一个块的JavaScript实现与另一个块分开。每个块提供用于与其他块交互的API。
        - block允许它隐藏内部的实现，由于element始终是block的内部实现，因此只能通过block的API访问它们
    - 继承
        - block行为的声明性描述使得，可以在派生block内使用基block的方法，并继承它们。新block可以获取基block的所有方法和属性
        - 依次，你还可以创建继承链
- 动态的block的DOM表示
    - 使用js实现的block可以对应于html中的节点。我们将其称为具有DOM表示的block。
    - 在最简单的情况下，块与DOM节点具有一对一的关系。 但是，DOM节点和块并不总是等效的。 您可以在同一个DOM节点上放置多个块（这称为混合），或在多个DOM节点上实现单个块。
    - 同时也存在不具有DOM节点对应的block。
- block和block之间的交互
    - BEM建议用独立block。但实际上，block不能完全相互独立。
    - block可以使用以下方式相互交互：
        - 订阅其它block实例的事件
        - 订阅其它block的modifier的更改事件
        - 直接调用其他块实例的方法或另一个块类的静态方法
        - 任何互动模式。例如，事件通道：所有通信都通过组件使用中介发布和侦听的消息进行。
    - BEM方法建议根据块在DOM树中的位置分层排列块之间的交互。 嵌套块不应该知道有关父块的任何信息，因为这会违反独立组件的原则。
- block和elment之间的交互
    - element是块的内部实现。 在BEM方法中，block通常具有用于处理其element的额外帮助器。 无法直接访问另一个block的element。 只能通过此element所属的block的API访问element。

## 文件结构

- 所有BEM项目的文件结构都遵循类似的结构。当文件始终位于熟悉的位置时，这使开发人员可以更轻松地导航项目并在项目之间切换。
- BEM有几种组织项目文件结构的方法：
    - 嵌套nested
    - 平铺flat
    - 灵活flex

### BEM项目文件结构指南

- 项目包括重定义级别
    - 项目始终至少有一个重定义级别。最大级别数没有限制。
        ```files
        project/
            common.blocks/  # Redefinition level with the project blocks 
            library.blocks/ # Redefinition level with the library blocks
        ```
- block实现由多个单独的文件组成
    - 每种实现技术都有一个单独的文件。实现文件的名称与块名称匹配。
        ```files
        project 
            common.blocks/ 
                input.css            # CSS implementation of the input block 
                input.js             # JavaScript implementation of the input block 
                input_theme_sun.css  # Implementation of the input_theme_sun modifier 
                input__clear.css     # CSS implementation of the input__clear element 
                input__clear.js      # JavaScript implementation of the input__clear element
        ```
- 文件按意义分组，而不是按类型分组
    - 每个块都有一个目录，其中包含用于实现块的文件的块名称。
        ```files
        project 
            common.blocks/ 
                input/            # Directory for the input block 
                    input.css     # CSS implementation of the input block 
                    input.js      # JavaScript implementation of the input block 
                popup/            # Directory for the popup block 
                    popup.css     # CSS implementation of the popup block 
                    popup.js      # JavaScript implementation of the popup block
        ```
    - 为了改善项目的导航，具有多个值的块修饰符也可以组合在不同的目录中。
        ```files
        project 
            common.blocks/                     # Redefinition level with blocks 
                input/                         # Directory for the input block 
                    _type/                     # Directory for the input_type modifier 
                        input_type_search.css  # CSS implementation of the input_type modifier 
                        input_type_pass.css    # CSS implementation of the input_type modifier 
                    input.css                  # CSS implementation of the input block 
                    input.js                   # JavaScript implementation of the input block 
                popup/                         # Directory for the popup block
        ```

### 结构方式

- 嵌套nested
    - 这是BEM项目的经典文件结构方法：
        - 每个块对应一个目录
        - 修饰符和元素的代码存储在单独的文件中
        - 修饰符和元素的文件存储在不同的目录中
        - 块目录是其元素和修饰符的子目录的根目录
        - 元素目录的名称以双下划线开头（__）
        - 修饰符目录的名称以单个下划线开头（_）
    - 示例
        ```files
        project 
            common.blocks/                            # Redefinition level with blocks 
                input/                                # Directory for the input block 
                    _type/                            # Directory for the input_type modifier 
                        input_type_search.css         # CSS implementation of the input_type modifier 
                    __clear/                          # Directory for the input__clear element 
                        _visible/                     # Directory for the input__clear_visible modifier 
                            input__clear_visible.css  # CSS implementation of the input__clear_visible modifier 
                        input__clear.css              # CSS implementation of the input__clear element
                        input__clear.js               # JavaScript implementation of the input__clear element 
                input.css                             # CSS implementation of the input block 
                input.js                              # JavaScript implementation of the input block
        ```
- 平铺flat
    - 文件结构的简化结构:
        - 目录和块不对应
        - 可选元素和修饰符在单独的文件或主块文件中实现
    - 示例
        ```files
        project 
            common.blocks/ 
                input_type_search.css     # The input_type_search modifier in CSS 
                input_type_search.js      # The input_type_search modifier in JavaScript 
                input__clear.js           # Optional element of the input block 
                input.css 
                input.js 
                popup.css 
                popup.js 
                popup.png
        ```
- 灵活flex
    - 最灵活的方法是nested和flat的组合。简单的block使用flat，复杂的block使用nested。
        - 每个块对应一个单独的目录
        - 元素和修饰符可以在块文件中或在单独的文件中实现
    - 示例
        ```
        project 
            common.blocks/
                input/                                # Directory for the input block 
                    _type/                            # Directory for the input_type modifier 
                        input_type_search.css         # CSS implementation of the input_type modifier 
                    __clear/                          # Directory for the input__clear element 
                        _visible/                     # Directory for the input__clear_visible modifier 
                            input__clear_visible.css  # CSS implementation of the input__clear_visible modifier 
                        input__clear.css              # CSS implementation of the input__clear element 
                        input__clear.js               # JavaScript implementation of the input__clear element 
                    input.css                         # CSS implementation of the input block 
                    input.js                          # JavaScript implementation of the input block 
                popup/                                # Directory for the popup block 
                    popup.css 
                    popup.js 
                    popup.png
        ```

## 重定义级别

### 什么是重定义级别

- 重定义级别是BEM项目中的目录，其中包含用于实现block、element、modifier的文件
- 任何BEM项目都包含重新定义级别。每个项目必须至少有一个级别，但最大级别数不受限制。
- 具有一个重定义级别的BEM项目的文件系统示例：
    ```files
    project/ 
        common.blocks/ # redefinition level with project blocks 
            header/ 
            footer/
    ```
- 重定义规则允许你：
    - 将项目代码使用不同的平台
    - 容易更新集成到项目中的block库
    - 使用公共的block库来开发不同的项目。（有一点脚手架的味道）
    - 在不影响项目逻辑的情况下更改设计主题
    - 在实时项目上执行实验

### 重定义级别应用场景

- 将block添加到项目中
    - 您可以在项目中的任何级别使用块而无需进行更改。
    - 下面的示例显示了如何使用项目中第三方库的按钮。 要做到这一点，您只需要在单独的级别上将库与按钮块连接起来。 您无需将按钮块的代码复制到项目块的级别。
        ```files
        project/ 
            common.blocks/  # redefinition level with project blocks 
                header/ 
                logo/ 
            library.blocks/ # redefinition level with library blocks 
                button/     # button block 
        ```
    - 为构建项目的结果，按钮块将包含在项目中：：
        ```css
        @import "common.blocks/header/header.css";  /* header from the common project block level */
        @import "common.blocks/logo/logo.css";      /* logo from the common project block level */
        @import "library.blocks/button/button.css"; /* button from the library level */
        ```
- 更改现有的block
    - 您可以从任何级别更改块以满足不同重定义级别的项目需求：
        - 扩展 - 向块添加新属性。
        - 重新定义 - 更改块的现有属性。
    - 您可以按任何顺序使用任意数量的级别来组装最终的块实现。 原始块实现通过后续级别的实现进行扩展或重新定义。 这就是为什么将原始实现首先包含在构建中的重要性，然后可以从所有重定义级别应用更改。
    - 该图显示了如何将来自不同重定义级别的BEM实体添加到构建中：
        - ![](https://camo.githubusercontent.com/dfde0c22cc89d088c7246f2cdb69feeba6780c2c/68747470733a2f2f63646e2e7261776769742e636f6d2f62656d2d736974652f62656d2d6d6574686f642f62656d2d696e666f2d646174612f6d6574686f642f7265646566696e6974696f6e2d6c6576656c732f7265646566696e6974696f6e2d6c6576656c735f5f6c6576656c732e737667)
    - 略...
    

### 如何使用重定义级别

- 您可以在同一项目中配置不同的构建：定义每个单独案例的顺序和级别数。例如，您可以单独配置要用于项目中每个页面的级别集。
- 下图图显示了针对不同平台的项目构建，具体取决于用户代理：
    - ![](https://camo.githubusercontent.com/b24ff6d6e889b10de33838ab5cd4c17d913411c7/68747470733a2f2f63646e2e7261776769742e636f6d2f62656d2d736974652f62656d2d6d6574686f642f62656d2d696e666f2d646174612f6d6574686f642f6275696c642f6275696c645f5f6c6576656c732e737667)

### 使用重定义级别的示例

- 将项目通过平台进行划分
    - 示例
        ```files
        project/ 
            common.blocks/ 
                button/ 
                    button.css   # basic CSS button implementation 
            desktop.blocks/ 
                button/ 
                    button.css   # custom button for desktop 
            mobile.blocks/ 
                button/ 
                    button.css   # custom button for mobile
        ```
    - 作为构建的结果，desktop.bundles / bundle / bundle.css文件从common.blocks级别获取按钮的所有基本CSS规则，并从desktop.blocks级别获取重新定义规则。
        ```css
        @import "common.blocks/button/button.css";   /* Basic CSS rules */
        @import "desktop.blocks/button/button.css";  /* Desktop version */
        ```
    - mobile.bundles / bundle / bundle.css文件从common.blocks级别获取按钮的所有基本CSS规则，从mobile.blocks级别获取重定义规则。
        ```css
        @import "common.blocks/button/button.css";   /* Basic CSS rules */
        @import "mobile.blocks/button/button.css";   /* Mobile version */
        ```
- 更新项目中的block库
    - 示例：
        ```files
        project/ 
            common.blocks/   # redefinition level with project blocks 
                header/ 
                logo/ 
            library.blocks/  # redefinition level with library blocks 
                button/     
        ```
- 使用通用block开发项目
    ```files
    projects/ 
        common.blocks/    # shared blocks for multiple projects 
            button/ 
            input/ 
        project-1/        # project 1 
            button/       # redefined button block for project 1 
            logo/ 
            modal/ 
        project-2/        # project 2 
            button/       # redefined b1 block for project 2 
            search/ 
            spin/    
    ```
- 为项目创建不同的设计主题
    ```files
    project/ 
        common.blocks/    # shared blocks for describing the project's business logic 
            button/ 
            input/ 
            ... 
        alpha/            # alpha design theme 
            button/ 
            input/ 
        beta/             # beta design theme 
            button/ 
            input/
    ```
- 在实时项目上运行实验
    ```files
    project/ 
        common.blocks/    # project blocks 
            header/ 
            user-name/ 
            user-pic/ 
            ... 
    exps/ 
        exp-1/            # level for experiment 1 
            header/       # new offsets in the header 
            user-name/    # new font for the user name 
            user-pic/     # new type of profile picture 
        exp-2/            # level for experiment 2 
            header/       # new offsets in the header 
            user-name/    # new font for the user name 
            user-pic/     # new type of profile picture 
        exp-n/            # level for any new experiment 
            header/       # new offsets in the header 
            user-name/    # new font for the user name 
            user-pic/     # new type of profile picture       
    ```

## Block modification

- Block ———— 逻辑和功能独立，可重用的页面组件。相同的block可用于不同的项目。为了防止这些项目看起来相同，可以使用以下方法修改块：
    - modifier
    - mix
    - redefinition level
    - context
- 上述修改方法不需要你做：
    - 拷贝block代码来进行修改
    - 修改block的原始实现
    - 基于现有的block创建新block

### 如何选择block的修改方法

- 使用modifier。
    - 设置和删除modifier仅影响对应的block，不影响周围的block。
- 使用mix。
    - 将一个block放到另一个block内部
    - 将样式应用到页面上多个不同的block，而不是使用选择器组
- 使用redefinition level。
    - 更改项目中具有相同名称的所有块
- 使用context。
    - 您不知道嵌套块的内容将是什么时，使用context去定义block样式

### 使用modifier修改block
### 使用mix修改block
### 使用redefinition level修改block
### 使用context修改block
    

## Build

### 介绍

- 在BEM项目中，代码被分成单独的文件（源文件）。 要将源文件合并到一个文件中（例如，将所有CSS文件放在project.css中，将所有JS文件放在project.js中，等等），我们使用构建过程。 生成的文件在BEM方法中称为包（bundles）。
    - ![](https://camo.githubusercontent.com/2e266eabf5d6977d7026d49f456f58f0520bd2ef/68747470733a2f2f63646e2e7261776769742e636f6d2f62656d2d736974652f62656d2d6d6574686f642f62656d2d696e666f2d646174612f6d6574686f642f6275696c642f6275696c645f5f62656d2d70726f6a6563742e737667)
- 构建执行以下任务：
    - 合并分布在项目文件系统中的源文件。
    - 仅包含项目中必需的block，element和modifier（BEM实体）。
    - 按照引用（include）实体的顺序。
    - 在构建过程中处理源代码（例如，将LESS代码编译为CSS代码）。

### 构建阶段

- 为了接受作为构建结果的捆绑包（bundles），请定义以下内容：
    - BEM实体列表
    - 它们之间的依赖关系
    - 引用（include）它们的顺序
- BEM实体列表
    - 要在构建中仅包含必需的BEM实体，您需要创建页面上使用的block，element和modifier的列表。此列表称为声明（declaration）。它允许您摆脱增加包大小的不必要的代码。
    - 构建工具仅捆绑列表中包含的BEM实体。下面的示例显示了基于声明的捆绑。
        - ![](https://camo.githubusercontent.com/63f6e29faf2cdc6bd0b50a6fc2bd94c5f8e516dd/68747470733a2f2f63646e2e7261776769742e636f6d2f62656d2d736974652f62656d2d6d6574686f642f62656d2d696e666f2d646174612f6d6574686f642f6275696c642f6275696c645f5f6465636c61726174696f6e2e737667)
- BEM实体之间的依赖关系
    - 您可以基于其他块创建BEM块。为此，您需要定义它们的依赖关系。依赖关系允许您避免不必要的复制和粘贴。
    - 构建工具获取有关依赖项的信息，并添加实现块所需的所有BEM实体。下面的示例显示了一个复合块。
        - ![](https://camo.githubusercontent.com/05fbc3dc4cebc92b38ba31129778ef00413ecc24/68747470733a2f2f63646e2e7261776769742e636f6d2f62656d2d736974652f62656d2d6d6574686f642f62656d2d696e666f2d646174612f6d6574686f642f6275696c642f6275696c645f5f7365617263682d666f726d2e737667)
- 引用（include）BEM实体的顺序
    - 在构建中包含BEM实体的顺序取决于
        - 依赖关系（Dependencies.）
        - 重定义级别（Redefinition levels.）
    - 依赖关系以及在构建中包含BEM实体的顺序
        - 在BEM中，依赖关系可以影响在构建中包含BEM实体的顺序
    - 重新定义级别以及构建中包含BEM实体的顺序
        - 在BEM中，最终的block实现可能分布在不同的重定义级别上。
        - 它们允许您更改不同平台的block的表示和行为。
        - 每个后续级别都会扩展或覆盖原始block实现。 
        - 因此，原始实现必须首先包含在构建中，然后可以从所有重新定义级别应用更改。
        - 下面的示例显示了具有重定义级别的项目：common.blocks，desktop.blocks和touch.blocks。 构建顺序标有数字。
            - ![](https://camo.githubusercontent.com/b24ff6d6e889b10de33838ab5cd4c17d913411c7/68747470733a2f2f63646e2e7261776769742e636f6d2f62656d2d736974652f62656d2d6d6574686f642f62656d2d696e666f2d646174612f6d6574686f642f6275696c642f6275696c645f5f6c6576656c732e737667)


### 构建结果

- 构建的输出结果可以是：
    - 页面片段（例如，header.css和footer.css）
    - 单个页面（例如，hello.css和hello.js）
    - 整个项目（例如，project.css和project.js）
- 构建单个页面或项目时，生成的代码可以包括：
    - 项目文件结构中的所有BEM实体（这显着增加了代码量）
    - 只有必要的BEM实体
- 下例显示了页面“hello”的构建
    - 构建前
        ```files
        blocks/                 # Directory containing blocks

        bundles/                # Directory containing build results (optional)
            hello/              # Directory of the hello page (created manually)
                hello.decl.js   # List of BEM entities requires for the hello page
        ```
    - 构建后
        ```files
        blocks/

        bundles/
            hello/
                hello.decl.js
                hello.css       # Compiled CSS file for the hello page (the hello bundle in CSS)
                hello.js        # Compiled JS file for the hello page (the hello bundle in JS)
        ```

### 构建工具

- BEM不限制你使用什么构建工具，例如enb、gulp等等

## Declarations

- 要列出构建网页所需的BEM实体（实际上是“一个包的实例”），您可以使用声明（declaration）。
- 声明（declaration）是页面上使用block、element、modifier的实体列表。构建工具使用声明列表信息来缩小最终项目中的实体列表。你可以从列表中仅选择必要的block，而不是项目中包含的所有block。
- **声明的目标**是定义构建中应包含的内容和顺序。

### 获得声明的方式

- 概要
    - 手动
    - 自动
        - 依据html页面描述
        - 依据项目文件结构
- 通过页面描述创建声明
    - 可以使用来自网页的HTML文件的类来获得要包括在构建中的实体的列表
    - 在BEM项目中，网页结构由BEM tree描述。此树可以手动创建，也可以从HTML代码中的类自动生成（它包含具有所有BEM实体名称的类）。
    - 构建页面时，将根据BEM tree数据自动形成声明：
        - 所有实体（block，element和modifier）都按照构建配置中指定的顺序包含在声明中。
        - 如果在页面上使用相同的实体两次，则它仅在声明中出现一次。
        - 块和元素的嵌套不在声明中显示。
        - ![](https://raw.githubusercontent.com/bem-site/bem-method/bem-info-data/method/declarations/declarations__html2decl.en.png)
- 通过项目文件结构创建声明
    - BEM实体另一个信息来源是项目的文件结构。因此，声明将包含项目结构中的所有实体。
    - 这种方法会构建所有实体，缺乏精确性；相反基于页面描述的声明仅会构建需要的实体，不会构建全部。
    - ![](https://raw.githubusercontent.com/bem-site/bem-method/bem-info-data/method/declarations/declarations__fs2decl.en.png)

### 使用声明

- 声明可以帮助您管理构建过程。 例如，您可以将不同的页面声明组合成一个，并一次构建整个项目，而不是逐页构建。 除了组合声明之外，您还可以重用它们，提取它们的常用和不同部分。
- 这种控件使您可以将所有页面组合成一个包，根据请求加载页面的必要部分或在不同页面上重用已构建的公共组件。
- 声明操作
    - 合并：将来自不同声明的实体集合成一个
    - 差异：从不同的声明中获取实体集之间的差异
    - 交叉：从两个其他声明的实体的交集
- 合并
    ```text
    Declaration 1       Declaration 2        Declaration 3

    [                   [                    [
    'header',           'header',            'header',
    'input',            'input',             'input',
    'button',           'button',            'button',
    'link',                                  'link',
    'attach',      +                  =      'attach',
                        'menu',              'menu',
    'image',                                 'image',
                        'checkbox',          'checkbox',
    'popup'                                  'popup',
                        'textarea'           'textarea'
    ]                   ]                    ]
    ```
- 差异
    ```text
    Declaration 1       Declaration 2       Declaration 3

    [                   [                   [
    'button',           'button',
    'checkbox',                             'checkbox',
    'textarea',                             'textarea',
    'suggest'                               'suggest'
                        'header',
                 -      'input',      =
                        'menu',
                        'image',
                        'popup'
    ]                   ]                   ]
    ```
- 交叉
    ```text
    Declaration 1       Declaration 2       Declaration 3

    [                   [                   [
    'header',           'header',           'header',
    'input',            'menu',
    'link',        +    'button',      =
    'attach',           'input',
    'checkbox',         'image',
    'textarea',         'popup',
    'footer'            'footer'            'footer'
    ]                   ]                   ]
    ```

## Solved problems
