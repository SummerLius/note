<!-- TOC -->

- [Web API](#web-api)
    - [介绍](#介绍)
    - [////////////////////////////](#)
    - [W3C DOM4 标准](#w3c-dom4-标准)
    - [常见Web API](#常见web-api)
        - [Element](#element)
        - [HTMLElement](#htmlelement)
        - [HTMLButtonElement](#htmlbuttonelement)
        - [MouseEvent](#mouseevent)
        - [File](#file)
        - [Node](#node)
    - [链接](#链接)

<!-- /TOC -->

# Web API

## 介绍

- 概要
    - 首先，Web API不等于DOM API，前者包含后者；
        - 除了DOM API，还有许多其它功能API，例如XMLHttpRequest、File等等；
    - DOM API，仅仅是用于访问和操作文档（HTML、XML文档等）的API；
        - 将文档解析为节点树模型，然后提供操作这些节点的API；

## ////////////////////////////

## W3C DOM4 标准

- [地址](#)
    - https://www.w3.org/TR/2015/REC-dom-20151119/
- [目标](#)
1. [Conformance](#)
2. [术语（Terminology）](#)
3. [事件（Events）](#)
    1. “DOM Events”介绍
    2. `Event` 接口
    3. `CustomEvent` 接口
    4. 构造事件
    5. 定义事件接口
    6. `EventTarget` 接口
    7. 派遣事件
    8. 触发事件
4. [节点（Nodes）](#)
    1. “The DOM”介绍
    2. Node树
    3. ...
5. [Ranges](#)
6. [Traversal](#)
7. [Sets](#)
8. [historical](#)
- [异常和错误](#)
- [CSS Concepts](#)

## 常见Web API

### Element

- Element是非常通用的基类，所有Document对象下的对象都继承它；
    ```
    Element.prototype
        → Node.prototype
            → EventTarget.prototype
                → Object.prototype
    ```
    
### HTMLElement

- HTMLElement接口可以表示任何HTML元素，一些元素直接实现该接口，另一些元素间接实现该接口；
    ```
    HTMLElement.prototype
        → Element.prototype
            → Node.prototype
                → EventTarget.prototype
                    → Object.prototype
    ```

### HTMLButtonElement

- `<button>`元素为HTMLButtonElement对象
    ```
    HTMLButtonElement.prototype
        → HTMLElement.prototype
            → Element.prototype
                → Node.prototype
                    → EventTarget.prototype
                        → Object.prototype
    ```

### MouseEvent

- MouseEvent 接口指用户与指针设备( 如鼠标 )交互时发生的事件;
- 使用此接口的常见事件包括：click，dblclick，mouseup，mousedown，也就是说这些事件对象的原型为MouseEvent.prototype
    ```
    MouseEvent.prototype
        → UIEvent.prototype
            → Event.prototype
                → Object.prototype
    ```

### File

- todo
    ```
    File.prototype
        → Blob.prototype
            → Object.prototype
    ```

### Node

- 大多数DOM API对象都继承Node接口；
    ```
    Node.prototype
        → EventTarget.prototype
            → Object.prototype
    ```

## 链接

- [W3C 标准：W3C DOM4 2015-11-19](https://www.w3.org/TR/2015/REC-dom-20151119/)
- [MDN：Web API](https://developer.mozilla.org/en-US/docs/Web/API)