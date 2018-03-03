<!-- TOC -->

- [一些疑难杂症记录](#一些疑难杂症记录)
    - [display：inline block inline-block的区别，以及float](#displayinline-block-inline-block的区别以及float)
    - [替换元素和非替换元素](#替换元素和非替换元素)
    - [各种元素width height margin padding特性](#各种元素width-height-margin-padding特性)

<!-- /TOC -->

# 一些疑难杂症记录

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


