# npm config命令行

<!-- TOC -->

- [npm config命令行](#npm-config命令行)
    - [语法](#语法)
    - [概述](#概述)
    - [参数](#参数)
        - [set](#set)
        - [edit](#edit)
        - [delete](#delete)
        - [get](#get)
        - [list](#list)

<!-- /TOC -->

## 语法

```shell
npm config set <key> <value> [-g|--global]
npm config get <key>
npm config delete <key> [-g|--global]
npm config list [-l]
npm config edit [-g|--global]

npm get <key>
npm set <key> <value> [-g|--global]

aliases: c
```

## 概述

npm 从命令行、环境变量、npmrc文件等地方获取配置设置信息。

使用 `npm config` 命令可以用来更新、编辑User或Global的`npmrc`配置文件。

**注意**：默认情况下修改的都是User npmrc，除非指定 -g|--global 参数，从而指定修改 Global npmrc 配置

## 参数

### set

给User npmrc或Global npmrc，添加一个选项配置

```shell
npm set AAA BBB
npm set AAA=BBB # 使用等号时，则等号两边不能有空格

npm set AAA BBB -g
npm set AAA=BBB -g
```

### edit

上述set选项仅一条一条设置，edit选项是直接编辑User npmrc或Global npmrc文件，类似vi编辑

```shell
npm c edit 
npm c edit -g
```

### delete

delete 可以和 set 选项对应，一条一条删除

```shell
npm c delete AAA
npm c delete AAA -g
```

### get

获取当前npm某条配置，注意 get 选项获取配置信息，是按照配置优先级来的，由高到低匹配，匹配到立即返回，后面若还有相同配置，则直接覆盖忽略

优先级：
1. 命令行
2. 环境变量
3. 配置文件
    - 项目配置
    - 用户配置
    - 全局配置
    - npm内置配置
4. 默认配置

```shell
npm c get AAA
```

### list

列出配置信息

```shell
npm c list|ls
npm c list|ls -l
```



