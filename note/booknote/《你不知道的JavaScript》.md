<!-- TOC -->

- [《你不知道的JavaScript》](#你不知道的javascript)
    - [概要](#概要)
    - [入门与进阶](#入门与进阶)
        - [第一章：进入编程](#第一章进入编程)
        - [第二章：进入JavaScript](#第二章进入javascript)
        - [第三章：进入YDKJS](#第三章进入ydkjs)
    - [作用域与闭包](#作用域与闭包)
        - [第一章：什么是作用域？](#第一章什么是作用域)
        - [第二章：词法作用域](#第二章词法作用域)
        - [第三章：函数与块儿作用域](#第三章函数与块儿作用域)
        - [第四章：提升](#第四章提升)
        - [第五章：作用域闭包](#第五章作用域闭包)
        - [附录A：动态作用域](#附录a动态作用域)
        - [附录B：填补块儿作用域](#附录b填补块儿作用域)
        - [附录C：词法this](#附录c词法this)
    - [this与对象原型](#this与对象原型)
        - [第一章: this还是That?](#第一章-this还是that)
        - [第二章: this豁然开朗!](#第二章-this豁然开朗)
        - [第三章: 对象](#第三章-对象)
        - [第四章: 混合（淆）“类”的对象](#第四章-混合淆类的对象)
        - [第五章: 原型](#第五章-原型)
        - [第六章: 行为委托](#第六章-行为委托)
        - [附录A: ES6 class](#附录a-es6-class)
    - [类型与文法](#类型与文法)
        - [第一章：类型](#第一章类型)
        - [第二章：值](#第二章值)
        - [第三章：原生类型](#第三章原生类型)
        - [第四章：强制转换](#第四章强制转换)
        - [第五章：文法](#第五章文法)
        - [附录A：混合环境下的JavaScript](#附录a混合环境下的javascript)
    - [异步与性能](#异步与性能)
        - [第一章: 异步:现在与稍后](#第一章-异步现在与稍后)
        - [第二章: 回调](#第二章-回调)
        - [第三章: Promise](#第三章-promise)
        - [第四章: Generator](#第四章-generator)
        - [第五章: 程序性能](#第五章-程序性能)
        - [第六章: 基准分析与调优](#第六章-基准分析与调优)
        - [附录A：库：asynquence](#附录a库asynquence)
        - [附录B：高级异步模式](#附录b高级异步模式)
    - [ES6与未来](#es6与未来)
        - [第一章：ES？现在与未来](#第一章es现在与未来)
        - [第二章：语法](#第二章语法)
        - [第三章：组织](#第三章组织)
        - [第四章：异步流程控制](#第四章异步流程控制)
        - [第五章：集合](#第五章集合)
        - [第六章：新增API](#第六章新增api)
        - [第七章：元编程](#第七章元编程)
        - [第八章：ES6之后](#第八章es6之后)

<!-- /TOC -->

# 《你不知道的JavaScript》

## 概要

- [Github You-Dont-Know-JS 英文](https://github.com/getify/You-Dont-Know-JS)
    - [Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going)
    - [Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)
    - [this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
    - [Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/README.md#you-dont-know-js-types--grammar)
    - [Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance)
    - [ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond)
- [Github You-Dont-Know-JS 中文](https://github.com/JoeHetfield/You-Dont-Know-JS)
    - [入门与进阶](https://github.com/JoeHetfield/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going)
    - [作用域与闭包](https://github.com/JoeHetfield/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)
    - [this 与对象原型](https://github.com/JoeHetfield/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
    - [类型与文法](https://github.com/JoeHetfield/You-Dont-Know-JS/blob/master/types%20&%20grammar/README.md#you-dont-know-js-types--grammar)
    - [异步与性能](https://github.com/JoeHetfield/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance)
    - [ES6与未来](https://github.com/JoeHetfield/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond)
- 这里先阅读中文版，有模棱两可处再参考英文版

## 入门与进阶
### 第一章：进入编程

10. 函数
    1. 作用域
        - 作用域（技术上讲称为 词法作用域）；
        - 在JavaScript中，每个函数都有自己的作用域；
        - 作用域基本上就是变量的集合，也是如何使用名称访问这些变量的规则；
        - 只有在这个函数内部的代码才能访问这个函数 作用域内 的变量；
        - 在同一个作用域内变量名必须是唯一的 —— 不能有两个不同的变量a并排出现。但是相同的变量名a可以出现在不同的作用域中；
        - 另外，一个作用域可以嵌套在另一个作用域中，如果一个作用域嵌套在另一个中，那么在内部作用域中的代码就可以访问这两个作用域中的变量；
        - 词法作用域规则说，在一个作用域中的代码既可以访问这个作用域中的变量，又可以访问任何在它外面的作用域的变量；
        - 注意： 关于词法作用域的更多信息，参见本系列的 作用域与闭包 的前三章。

### 第二章：进入JavaScript
### 第三章：进入YDKJS

## 作用域与闭包
### 第一章：什么是作用域？
### 第二章：词法作用域
### 第三章：函数与块儿作用域
### 第四章：提升
### 第五章：作用域闭包
### 附录A：动态作用域
### 附录B：填补块儿作用域
### 附录C：词法this

## this与对象原型
### 第一章: this还是That?
### 第二章: this豁然开朗!
### 第三章: 对象
### 第四章: 混合（淆）“类”的对象
### 第五章: 原型
### 第六章: 行为委托
### 附录A: ES6 class

## 类型与文法
### 第一章：类型
### 第二章：值
### 第三章：原生类型
### 第四章：强制转换
### 第五章：文法
### 附录A：混合环境下的JavaScript

## 异步与性能
### 第一章: 异步:现在与稍后
### 第二章: 回调
### 第三章: Promise
### 第四章: Generator
### 第五章: 程序性能
### 第六章: 基准分析与调优
### 附录A：库：asynquence
### 附录B：高级异步模式

## ES6与未来
### 第一章：ES？现在与未来
### 第二章：语法
### 第三章：组织
### 第四章：异步流程控制
### 第五章：集合
### 第六章：新增API
### 第七章：元编程
### 第八章：ES6之后

