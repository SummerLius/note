<!-- TOC -->

- [DOM](#dom)
    - [介绍](#介绍)
    - [////////////////////////////](#)
    - [W3C DOM4 标准](#w3c-dom4-标准)
    - [////////////////////////////](#-1)
    - [Web API](#web-api)
    - [////////////////////////////](#-2)
    - [未整理](#未整理)

<!-- /TOC -->

# DOM

## 介绍

## ////////////////////////////

## W3C DOM4 标准

- **地址**
    - https://www.w3.org/TR/2015/REC-dom-20151119/
- **目标**
1. **Conformance**
2. **术语（Terminology）**
3. **事件（Events）**
    1. “DOM Events”介绍
    2. `Event` 接口
    3. `CustomEvent` 接口
    4. 构造事件
    5. 定义事件接口
    6. `EventTarget` 接口
    7. 派遣事件
    8. 触发事件
4. **节点（Nodes）**
    1. “The DOM”介绍
    2. Node树
    3. ...
5. **Ranges**
6. **Traversal**
7. **Sets**
8. **historical**
- **异常和错误**
- **CSS Concepts**

## ////////////////////////////

## Web API

- EventTarget
    - 概述：
        - EventTarget是一个由可以接受事件的对象实现的接口，并且可以为它们创建监听器
        - `Element`、`document`、`window` 是最常见的事件目标对象，但是其它对象也可以是事件目标，比如 `XMLHttpRequest`、`AudioNode`、`AudioContext` 等等
    - 方法：
        - `addEventListener()`
        - `removeEventListener()`
        - `dispatchEvent()`

## ////////////////////////////

## 未整理


1. 一个`<button>`的原型链：
    - object -> EventTarget -> Node -> Element -> HTMLElement -> HTMLButtonElement --操作--> `<button>`
    - Object -> Event -> UIEvent -> MouseEvent
2. 