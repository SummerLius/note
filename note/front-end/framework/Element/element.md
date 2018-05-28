<!-- TOC -->

- [Element](#element)
    - [概要](#概要)
    - [开发指南](#开发指南)
        - [安装](#安装)
        - [快速上手](#快速上手)
        - [国际化](#国际化)
        - [自定义主题](#自定义主题)
        - [内置过渡动画](#内置过渡动画)
    - [组件](#组件)
        - [Basic](#basic)
            - [Layout 布局](#layout-布局)
            - [Container 布局容器](#container-布局容器)
            - [Color 色彩](#color-色彩)
            - [Typography 字体](#typography-字体)
            - [Icon 图标](#icon-图标)
            - [Button 按钮](#button-按钮)
        - [Form](#form)
        - [Data](#data)
        - [Notice](#notice)
        - [Navigation](#navigation)
            - [NavMenu 导航菜单](#navmenu-导航菜单)
            - [Tabs 标签页](#tabs-标签页)
            - [Breadcrumb 面包屑](#breadcrumb-面包屑)
            - [Dropdown 下拉菜单](#dropdown-下拉菜单)
            - [Steps 步骤条](#steps-步骤条)
        - [Others](#others)

<!-- /TOC -->

# Element

## 概要

- 网站快速成型工具
- Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
- [指南](http://element.eleme.io/#/zh-CN/guide/design)
- [组件](http://element.eleme.io/#/zh-CN/component/layout)
- [资源](http://element.eleme.io/#/zh-CN/resource)

## 开发指南

### 安装

### 快速上手

### 国际化

### 自定义主题

### 内置过渡动画

## 组件

### Basic

#### Layout 布局

- 概要
- 基础布局
- 分栏间隔
- 混合布局
- 分栏偏移
- 对齐方式
- 响应式布局
- 基于断点的隐藏类

#### Container 布局容器

- 概要
    - 用于布局的容器组件，方便快速搭建页面的基本结构：
        1. `<el-container>`：外层容器。当子元素中包含 `<el-header>` 或 `<el-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。
        2. `<el-header>`：顶栏容器
        3. `<el-aside>`：侧边栏容器
        4. `<el-main>`：主要区域容器
        5. `<el-footer>`：底栏容器
    - 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，\<el-container\> 的子元素只能是后四者，后四者的父元素也只能是 \<el-container\>。
- 常见页面布局
- 实例

#### Color 色彩
#### Typography 字体
#### Icon 图标
#### Button 按钮

### Form

### Data

### Notice

### Navigation

#### NavMenu 导航菜单

- Menu
- SubMenu
- Menu-Item
- Menu-Group

#### Tabs 标签页
#### Breadcrumb 面包屑
#### Dropdown 下拉菜单
#### Steps 步骤条

### Others
