<!-- TOC -->

- [CSS规范](#css规范)
    - [书写与命名](#书写与命名)
        - [CSS BEM 命名约定](#css-bem-命名约定)
            - [微信tmt团队关于css bem命名约定](#微信tmt团队关于css-bem命名约定)
            - [bem-method说明](#bem-method说明)
    - [参考](#参考)

<!-- /TOC -->

# CSS规范

## 书写与命名

- css命名规范方案种类：
    1. [bem](https://en.bem.info/)
    2. [nec](http://nec.netease.com/)
    3. ...

### CSS BEM 命名约定

#### 微信tmt团队关于css bem命名约定

1. 概要
    - 使用bem命名规范，理论上讲，每行css代码都只有一个选择器。
    - BEM代表 “块（block），元素（element），修饰符（modifier）”，我们常用这三个实体开发组件。
    - 在选择器中，我们设定由以下三种符号来表示扩展关系：
        ```
        -   连字符：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
        __  双下划线：双下划线用来连接块和块的子元素。
        _   单下划线：单下划线用来描述一个块或者块的子元素的一种状态。

        block__element_modifier
        ```
2. 块（block）
    - 一个块是设计或布局的一部分，它具有具体且唯一的意义，要么是语义上的要么是视觉上的。
    - 在大多数情况下，任何独立的页面元素（或复杂或简单）都可以被视作一个块。它的html容器会有一个唯一的css类名，也就是这个块的名字。
    - 针对块的css类名会加一些前缀（ui-），这些前缀在css中有类似命名空间的作用。
    - 一个块的正式（实际上是半正式的）定义有下面三个基本原则：
        1. css中只能使用类名（不能是ID）
        2. 每一个块名应该有一个命名空间（前缀）
        3. 每一条css规则必须属于一个块。
3. 元素（element）
    - 块中的子元素是块的子元素，并且子元素的子元素在bem也被认为是块的直接子元素。（bem将嵌套的元素，也视为平面化）。
    - 一个块中元素的类名必须用父级块的名称作为前缀。
    - 例如：
        ```css
        .list{}
        .list .item{}

        .list{}
        .list__item{}
        ```
4. 修饰符（modifier）
    - 一个修饰符，可以理解为一个块的特定状态，标识着它的一个特定的属性。
    - 用一个例子来解释最好不过了。一个标识按钮的块默认有三个大小：小、中、大。为了避免创建三个不同的块，最好是在块上加修饰符。这个修饰符应该有个名字，比如尺寸，small、normal、big。
    - 例如，以下表示状态，选中、激活：
        ```css
        .list.select{}
        .list .item.active{}

        .list{}
        .list_select{}
        .list_item{}
        .list__item_active{}
        ```
5. 书写原则
    1. 原则上不会出现2层以上的选择器嵌套。
        - 使用bem原则，用命名来解耦，所有类名都为一层，增加效率和服用性。
    2. 两层选择器嵌套出现在 .mod-xxx__item_current 子元素的情况下，如下，使用推荐的嵌套写法：
        - 常规写法：
            ```css
            .xxx{}
            .xxx__item{}
            .xxx__item_current{}
            // 嵌套写法
            .xxx__item_current .mod-xxx__link{}
            ```
        - 推荐写法：
            ```css
            .xxx{}
            .xxx__item{}
            .xxx__item_hightlight{}
            .xxx__product-name{}
            .xxx__link{}
            .xxx__ming-zi-ke-yi-hen-chang{}
            
            // 嵌套写法
            .xxx__item_current{
                .xxx__link{}
            }
            ```
        - 对应的html结构如下：
            ```html
            <ul class="xxx">
                <li class="xxx__item">第一项
                    <div class="xxx__product-name">我是名称</div>
                    <span class="xxx__ming-zi-ke-yi-hen-chang">看类名</span>
                    <a href="#" class="xxx__link">我是link</a>
                <li>
                <li class="xxx__item xxx__item_current">第二项 且 当前选择项
                    <div class="xxx__product-name">我是名称</div>
                    <a href="#" class="xxx__item-link">我是link</a>
                <li>
                <li class="xxx__item xxx__item_hightlight">第三项 且 特殊高亮
                     <div class="xxx__product-name">我是名称</div>
                    <a href="#" class="xxx__item-link">我是link</a>
                <li>
            </ul>
            ```
6. bem解决问题
    - 组件之间完全解耦，不会造成命名空间污染，例如：.mod-xxx ul li 的写法带来的潜在的嵌套风险


#### bem-method说明

- [bem-method](https://github.com/bem-site/bem-method)



## 参考

- http://www.techug.com/post/css-guidelines.html
- https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83
- https://www.zhangxinxu.com/wordpress/2010/09/%E7%B2%BE%E7%AE%80%E9%AB%98%E6%95%88%E7%9A%84css%E5%91%BD%E5%90%8D%E5%87%86%E5%88%99%E6%96%B9%E6%B3%95/
- https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/css-write-and-name.html
- http://getbem.com/introduction/
- http://nec.netease.com/
- https://en.bem.info/

