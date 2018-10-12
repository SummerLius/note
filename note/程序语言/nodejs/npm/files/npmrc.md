# npmrc

<!-- TOC -->

- [npmrc](#npmrc)
    - [概述](#概述)
    - [文件](#文件)
        - [注释](#注释)
        - [项目npmrc配置](#项目npmrc配置)
        - [用户npmrc配置](#用户npmrc配置)
        - [全局npmrc配置](#全局npmrc配置)
        - [内置npmrc配置](#内置npmrc配置)
    - [总结](#总结)

<!-- /TOC -->

## 概述

`.npmrc`是npm的配置文件。

npm可以从三个位置获取配置信息：
- 命令行
- 环境变量
- `.npmrc`文件

使用 `npm config` 命令可以更新、编辑user或global的npmrc文件。

## 文件

有四个不同优先级的npmrc文件：
1. 项目下的配置文件，位置在你项目路径的根目录下（/path/to/my/project/.npmrc）
2. 不同用户下的配置文件（~/.npmrc）
3. 全局配置（$PREFIX/etc/npmrc）
4. npm程序内置配置文件（/path/to/npm/npmrc）

四种配置文件都会被npm加载解析，具体的选项配置会按照优先级排序，高优先级想选项会覆盖低优先级的。

### 注释

npmrc 配置文件中以 `;` 或 `#` 开头的行，会被当作注释。

### 项目npmrc配置

注意
-  `.npmrc` 配置需要放在项目的根目录下，即和`node_modules`、`package.json`置于同一目录。
- 如果你在项目目录安装全局包，即`npm install -g`，此时不会读取当前项目的配置

### 用户npmrc配置

- 默认位置：`$HOME/.npmrc`
- 或使用命令修改：`npm config`

### 全局npmrc配置

- 默认位置：`$PREFIX/.npmrc`
- 或使用命令修改：`npm config`


### 内置npmrc配置

- 默认位置：`path/to/npm/itself/npmrc`，即npm本身程序代码所在的目录
- 该文件是npm维护的内置配置文件

## 总结

**总结**：当npm要读取配置时，依次配置的优先级为
1. 命令行上直接读取
2. 环境变量
3. 项目配置文件
4. 用户配置文件
5. 全局配置文件
6. 内置配置文件
7. 默认配置


给出配置样例：
- ubuntu
    ```shell
    # 默认下
    npm config ls -l
    > userconfig="/home/summer/.npmrc"
    > globalconfig="/usr/local/etc/npmrc"

    # npm内置npmrc位置
    /usr/local/lib/node_modules/npm/npmrc
    
    ```
- windows
    ```bat
    # 默认下
    npm config ls -l
    > userconfig="c:\\Users\admin\\.npmrc"
    > globalconfig="c:\\Users\\admin\\AppData\\Roaming\\npm\\etc\\npmrc"

    # npm内置npmrc位置
    d:\\program files\\nodejs\\node_modules\\npm\\npmrc
    ```
    