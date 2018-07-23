<!-- TOC -->

- [API/DOM](#apidom)
    - [简介](#简介)
    - [API](#api)
        - [XMLHttpRequest](#xmlhttprequest)
    - [参考](#参考)

<!-- /TOC -->

# API/DOM

## 简介

- 当你使用JavaScript编写网页代码时，有许多API可调用。以下是所有接口的API列表，你可以在开发网站或Web应用程序时使用它们。

## API

### XMLHttpRequest

- [MDN 地址](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 介绍
    - XMLHttpRequest 是一个web api，它为客户端提供了和服务器之间传输数据的功能。
    - 它提供了一个通过url来获取数据的简单方式，并且不会使整个页面刷新。这使得网页只更新一部分页面而打扰到用户。
    - XMLHttpRequest在[AJAX](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)中被大量使用。
    - 虽然名字中含有XML，但是该对象可以接受任何数据类型，而不仅仅为XML，而且它支持的协议类型不限于HTTP，还有file、ftp等
    - 如果你的连接涉及从服务器接受事件或数据，可以考虑采用通过 EventSource 接口使用 Server-sent events 服务器事件。至于全双工通信，使用WebSockers是一个更好的选择。
- 构造函数
- ...

## 参考

- [Mdn Dom Api](https://developer.mozilla.org/zh-CN/docs/Web/API)