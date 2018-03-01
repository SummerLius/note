<!-- TOC -->

- [一些疑难杂症记录](#一些疑难杂症记录)
    - [display：inline block inline-block的区别，以及float](#displayinline-block-inline-block的区别以及float)
- [](#)

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

##

