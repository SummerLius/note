# npm各项配置详述

<!-- TOC -->

- [npm各项配置详述](#npm各项配置详述)
    - [概述](#概述)
        - [命令行参数](#命令行参数)
        - [环境变量](#环境变量)
        - [npmrc配置文件](#npmrc配置文件)
        - [默认配置](#默认配置)
    - [Shorthands and Other CLI Niceties](#shorthands-and-other-cli-niceties)
    - [Per-Package Config Settings](#per-package-config-settings)
    - [详细配置选项](#详细配置选项)

<!-- /TOC -->

关于npm configuration更多的信息。

## 概述

npm获取配置信息有几个方法，按优先级高到低排序如下：
1. 命令行参数
2. 环境变量
3. npmrc配置文件
4. 默认配置

### 命令行参数

- 格式：`--key=value` 或 `--key`
- 没有指定 `value` 的话，则其值默认为 `true`
- 单独 `--` 符号告诉npm CLI去停止读取配置参数

```sh
# 似乎对于 --key=value 在命令行上的位置没有什么要求

npm install --key1=value1 --key2=value2 --key3
npm --key1=value1 --key2=value2 --key3 install

npm --key1=value1 --key2 -- install
```

### 环境变量

任何以 `npm_config_`、`NPM_CONFIG_` 为前缀的环境变量会被npm解释为配置参数。

### npmrc配置文件

有四个级别的npmrc配置文件
- 项目配置文件（/path/to/my/project/.npmrc）
- User配置文件（$HOME/.npmrc）
- Global配置文件（$PREFIX/etc/npmrc）
- npm内置配置文件（/path/to/npm/npmrc）

### 默认配置

通过命令 `npm config ls -l` 可以查看npm的默认配置。 

## Shorthands and Other CLI Niceties

列出一些参数的简写：
- -v: --version
- -h, -?, --help, -H: --usage
- -s, --silent: --loglevel silent
- -q, --quiet: --loglevel warn
- -d: --loglevel info
- -dd, --verbose: --loglevel verbose
- -ddd: --loglevel silly
- -g: --global
- -C: --prefix
- -l: --long
- -m: --message
- -p, --porcelain: --parseable
- -reg: --registry
- -f: --force
- -desc: --description
- -S: --save
- -P: --save-prod
- -D: --save-dev
- -O: --save-optional
- -B: --save-bundle
- -E: --save-exact
- -y: --yes
- -n: --yes false
- ll and la commands: ls --long

## Per-Package Config Settings

## 详细配置选项

待整理...
