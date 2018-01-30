# HTML

<!-- TOC -->

- [HTML](#html)
    - [概念](#概念)
    - [标签](#标签)
        - [临时](#临时)
            - [html](#html)
            - [head](#head)
                - [base](#base)
                - [link](#link)
                - [meta](#meta)
                - [title](#title)
                - [script](#script)
                - [style](#style)
            - [body](#body)

<!-- /TOC -->

## 概念

HTML 是一种用来描述网页的语言。这种语言编写的代码会被浏览器所解析，生成网页。

1. 既然是一种语言，当然有它的语法：
    - HTML 全称超文本标记语言（Hyper Text Markup Language）
    - HTML 不同于编程语言，是一种标记语言（markup language）
    - 标记语言是一套标记标签（markup tag）
    - HTML 使用标记标签来描述网页
    - HTML文档包含HTML标签和纯文本
2. HTML标记标签通常简称为**HTML标签**（HTML tag）
    - HTML标签由尖括号包围关键词，如\<html\>
    - HTML标签通常成对出现，如\<b\>和\</b\>
    - 标签对称为开始标签和结束标签（start tag/end tag），或开放标签和闭合标签（opening tag/closing tag）
3. **HTML元素**：指从开始标签到结束标签的所有代码。
    - Element以start tag起始
    - Element以end tag终止
    - **元素的内容**是start tag和end tag之间的内容
    - 某些元素具有空内容，空元素（void element）的标签不是成对的，仅一个标签，在开始标签进行关闭，如\<br/\>
    - 大多数HTML元素可拥有属性
    - 大多数HTML元素可以嵌套
4. **HTML属性**：html标签可以拥有属性，属性提供了HTML元素更多的信息。
    - 属性总是以“名称/值”对的形式出现，如：name="value"
    - 属性总是在HTML元素的开始标签（start tag）中指定
    - 有些属性是没有值的，不是成对，这种也是合法的。这种属性称为布尔属性，它们的值只能跟它们的属性名一样。例如`disabled`属性，`<input type="text" disabled>`、`<input type="text" disabled="disabled">`，两种写法都合法
    - 属性值使用单、双引号均可
5. **块级元素和内联元素**
    - 这两种是HTML中重要的元素类别
    - 块级元素：在页面中以块的形式展现，即块级元素前后会**自动新成一行**。块级元素不会嵌套进内联元素中，但可以嵌套在其它块级元素中。
    - 内联元素：通常出现在块级元素中并包裹文档的一小部分，而不是一整个段落或一组内容。内联元素**不会导致文本换行**，通常出现在一堆文字之间。如，\<a\>、\<em\>、\<strong\>等元素

## 标签

### 临时

#### html

- `<html>`：
- `<!DOCTYPE html>`：

#### head

- `<head>`：该标签用于定义html文档的头部，它是所有头部元素的容器。里面可以提供引用脚本、引用样式文件、提供元信息等功能。绝大多数头部包含的数据不会真正作为内容显示给读者。
    - `<base>`：
    - `<link>`：
    - `<meta>`：
    - `<script>`：
    - `<style>`：
    - `<title>`：

```html
<head>

    <!-- 标题 -->
    <title>标题不会显示在文档区</title>

    <!-- css文件外链 -->
    <link rel="stylesheet" type="text/css" href="/html/xxx.css">

    <!-- 直接css写在head里面 -->
    <style type="text/css">
        h1 {color: red}
        p {color: blue}
    </style>

    <!-- 使用<meta>添加文档一些信息 -->
    
    <!-- 作者信息 -->
    <meta name="author" content="summerlius">
    <meta name="revised" content="Summer Liu,8/1/07">

    <!-- 关键字 -->
    <meta name="keywords" content="HTML, CSS, JavaScript, XML">
    <meta name="descriptions" content="HTML head test">

    <!-- 重定向控制 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
    <meta http-equiv="Refresh" content="5;url=http://www.w3school.com.cn" />
    
</head>
```

##### base

- 该标签必须在head元素内
- base标签为页面上所有连接指定默认地址或默认目标，即href和target属性
- 可以作用的标签有a、img、link、form，这些标签中若指定
- 注意如果没有指定base标签，那么这些链接的默认地址使用该HTML文档自身的URL地址

|属性|值|描述|
|:--:|:--:|:--:|
|href|url|指定页面中所有相对链接的基准URL，<br/>如果没有指定，则使用该HTML文档的自身域名地址|
|target|_blank <br/> _parent <br/> _self <br/> _top <br/> *framename*|指定在何处打开链接|
||||

```html
<head>
    <base href="https://www.2980.com" target="_blank"/>
</head>
```

##### link

- 该标签只能在`<head>`元素内，可多次
- 该标签主要定义文档与外部资源的关系
- 该标签主要用于**链接样式表**，这项功能几乎所有浏览器都支持，但是该标签的其它功能浏览器的支持就不怎么好
- 该标签是空元素，不含内容，仅含属性
- 该标签不成对，没有结束标签，仅开始标签 `<link/>`
- 可见css的处理既可以直接使用`style`标签在head元素中编写，也可以使用`<link>`标签引入外部CSS文件爱你

[属性详细点击进入w3c](http://www.w3school.com.cn/tags/tag_link.asp)

|属性|值|描述|
|:--:|:--:|:--:|
|href|*UR*L|指定被链接文档的地址|
|type|*MIME_type*|指定被链接文档的MIME类型|
|rel|stylesheet <br/> icon <br/> ... <br/> 还有其它功能，但不是<br/>所有功能各浏览器都支持|指定当前文档与被链接文档之间的关系relation|
|...|...|...|
||||

```html
<head>
    <!-- 指定外部CSS样式文档 -->
    <link rel="stylesheet" href="http://www.xxxx.com/public/a.css" type="text/css"/>

    <!-- 指定页面小图标 -->
    <link rel="icon" href="../../favicon"/>

    <!-- 引入其它文档，指定某个作用 -->
    <link rel="xxx" href="http://xxxx"/>
</head>
```

<!-- 
|属性|值|描述|
|:--:|:--:|:--:|
||||
||||
||||
 -->

##### meta

##### title

- 指定网页在浏览器标签页上的标题
- 非空标签，即成对

`<title>这是标题<title/>`

##### script

- 该标签作用形同此名，脚本

##### style

- 该标签仅在head元素中
- 非空元素，即成对
- 该标签用于直接为html文档定义样式信息
- 该标签type属性是必需的，且仅有唯一值"text/css"
- media属性可选，值有多种，主要为样式表规定不同的媒介类型

[详细点击进入w3c](http://www.w3school.com.cn/tags/tag_style.asp)

#### body

- `<body>`：




<!-- 
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`：
- `<>`： 
-->


<!-- 
=### 根元素

- `<html>`：表示HTML文档的根，称为根元素，顶级元素。



=### HTML文档元数据

元数据（Metadata）含有页面的相关信息，包含样式、脚本及数据，能帮助一些软件（如搜索引擎、浏览器等）更好的运用和渲染页面。

对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。

- `<link>`：该元素指定外部资源与当前HTML文档的关系。
- `<meta>`：
- `<style>`：

=### HTML文档内容结构

=### 文本内容相关

=### 内联文本语义

=### 图像和多媒体

=### 内嵌内容

=### 脚本

=### 编辑标识

=### 表格

=### 表单

=### 交互元素

=### web组件

=### 废弃的标签 
-->
