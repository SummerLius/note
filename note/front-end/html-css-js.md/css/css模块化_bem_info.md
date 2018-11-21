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
    - [JavaScript](#javascript)
    - [文件结构](#文件结构)
    - [重定义级别](#重定义级别)
    - [Block modification](#block-modification)
    - [Build](#build)
    - [Declarations](#declarations)
    - [Solved problems](#solved-problems)

<!-- /TOC -->

# Bem Info

- [Bem Info](https://en.bem.info)

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
    - 重用block=
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
- 单个block应用到多个DOM节点

### 嵌套元素
### 使用HTML包装器

## JavaScript
## 文件结构
## 重定义级别
## Block modification
## Build
## Declarations
## Solved problems
