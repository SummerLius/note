# package.json

<!-- TOC -->

- [package.json](#packagejson)
    - [概述](#概述)
    - [样例](#样例)
    - [键值对](#键值对)
        - [name](#name)
        - [version](#version)
        - [description](#description)
        - [keywords](#keywords)
        - [homepage](#homepage)
        - [bugs](#bugs)
        - [license](#license)
        - [people fields: author, contributors](#people-fields-author-contributors)
        - [files](#files)
        - [main](#main)
        - [bin](#bin)
        - [man](#man)
        - [directories](#directories)
        - [repository](#repository)
        - [scripts](#scripts)
        - [config](#config)
        - [dependencies](#dependencies)
        - [devDependencies](#devdependencies)
        - [peerDependencies](#peerdependencies)
        - [bundledDependencies](#bundleddependencies)
        - [optionalDependencies](#optionaldependencies)
        - [engines](#engines)
        - [engineStrict](#enginestrict)
        - [cpu](#cpu)
        - [preferGlobal](#preferglobal)
        - [private](#private)
        - [publishConfig](#publishconfig)
        - [DEFAULT VALUES](#default-values)

<!-- /TOC -->

## 概述

## 样例

```json
{
  "name": "koa",
  "version": "2.4.1",
  "description": "Koa web app framework",
  "main": "lib/application.js",
  "scripts": {
    "test": "jest",
    "test-cov": "npm run test -- --coverage",
    "lint": "eslint benchmarks lib test",
    "bench": "make -C benchmarks",
    "authors": "git log --format='%aN <%aE>' | sort -u > AUTHORS"
  },
  "repository": "koajs/koa",
  "keywords": [
    "web",
    "app",
    "http",
    "application",
    "framework",
    "middleware",
    "rack"
  ],
  "license": "MIT",
  "dependencies": {
    "accepts": "^1.2.2",
    "content-disposition": "~0.5.0",
    "content-type": "^1.0.0",
    "cookies": "~0.7.0",
    "debug": "*",
    "delegates": "^1.0.0",
    "depd": "^1.1.0",
    "destroy": "^1.0.3",
    "error-inject": "~1.0.0",
    "escape-html": "~1.0.1",
    "fresh": "^0.5.2",
    "http-assert": "^1.1.0",
    "http-errors": "^1.2.8",
    "is-generator-function": "^1.0.3",
    "koa-compose": "^4.0.0",
    "koa-convert": "^1.2.0",
    "koa-is-json": "^1.0.0",
    "mime-types": "^2.0.7",
    "on-finished": "^2.1.0",
    "only": "0.0.2",
    "parseurl": "^1.3.0",
    "statuses": "^1.2.0",
    "type-is": "^1.5.5",
    "vary": "^1.0.0"
  },
  "devDependencies": {
    "eslint": "^3.17.1",
    "eslint-config-koa": "^2.0.0",
    "eslint-config-standard": "^7.0.1",
    "eslint-plugin-promise": "^3.5.0",
    "eslint-plugin-standard": "^2.1.1",
    "istanbul": "^0.4.0",
    "jest": "^20.0.0",
    "supertest": "^3.0.0"
  },
  "engines": {
    "node": "^4.8.4 || ^6.10.1 || ^7.10.1 || >= 8.1.4"
  },
  "files": [
    "lib"
  ],
  "jest": {
    "testMatch": [
      "**/test/!(helpers)/*.js"
    ],
    "coverageReporters": [
      "text-summary",
      "lcov"
    ],
    "bail": true,
    "testEnvironment": "node"
  }
}
```

```json
{
  "name": "express",
  "description": "Fast, unopinionated, minimalist web framework",
  "version": "4.16.2",
  "author": "TJ Holowaychuk <tj@vision-media.ca>",
  "contributors": [
    "Aaron Heckmann <aaron.heckmann+github@gmail.com>",
    "Ciaran Jessup <ciaranj@gmail.com>",
    "Douglas Christopher Wilson <doug@somethingdoug.com>",
    "Guillermo Rauch <rauchg@gmail.com>",
    "Jonathan Ong <me@jongleberry.com>",
    "Roman Shtylman <shtylman+expressjs@gmail.com>",
    "Young Jae Sim <hanul@hanul.me>"
  ],
  "license": "MIT",
  "repository": "expressjs/express",
  "homepage": "http://expressjs.com/",
  "keywords": [
    "express",
    "framework",
    "sinatra",
    "web",
    "rest",
    "restful",
    "router",
    "app",
    "api"
  ],
  "dependencies": {
    "accepts": "~1.3.4",
    "array-flatten": "1.1.1",
    "body-parser": "1.18.2",
    "content-disposition": "0.5.2",
    "content-type": "~1.0.4",
    "cookie": "0.3.1",
    "cookie-signature": "1.0.6",
    "debug": "2.6.9",
    "depd": "~1.1.1",
    "encodeurl": "~1.0.1",
    "escape-html": "~1.0.3",
    "etag": "~1.8.1",
    "finalhandler": "1.1.0",
    "fresh": "0.5.2",
    "merge-descriptors": "1.0.1",
    "methods": "~1.1.2",
    "on-finished": "~2.3.0",
    "parseurl": "~1.3.2",
    "path-to-regexp": "0.1.7",
    "proxy-addr": "~2.0.2",
    "qs": "6.5.1",
    "range-parser": "~1.2.0",
    "safe-buffer": "5.1.1",
    "send": "0.16.1",
    "serve-static": "1.13.1",
    "setprototypeof": "1.1.0",
    "statuses": "~1.3.1",
    "type-is": "~1.6.15",
    "utils-merge": "1.0.1",
    "vary": "~1.1.2"
  },
  "devDependencies": {
    "after": "0.8.2",
    "cookie-parser": "~1.4.3",
    "cookie-session": "1.3.2",
    "ejs": "2.5.7",
    "eslint": "2.13.1",
    "express-session": "1.15.6",
    "hbs": "4.0.1",
    "istanbul": "0.4.5",
    "marked": "0.3.9",
    "method-override": "2.3.10",
    "mocha": "3.5.3",
    "morgan": "1.9.0",
    "multiparty": "4.1.3",
    "pbkdf2-password": "1.2.1",
    "should": "13.2.0",
    "supertest": "1.2.0",
    "connect-redis": "~2.4.1",
    "vhost": "~3.0.2"
  },
  "engines": {
    "node": ">= 0.10.0"
  },
  "files": [
    "LICENSE",
    "History.md",
    "Readme.md",
    "index.js",
    "lib/"
  ],
  "scripts": {
    "lint": "eslint .",
    "test": "mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit test/ test/acceptance/",
    "test-ci": "istanbul cover node_modules/mocha/bin/_mocha --report lcovonly -- --require test/support/env --reporter spec --check-leaks --no-exit test/ test/acceptance/",
    "test-cov": "istanbul cover node_modules/mocha/bin/_mocha -- --require test/support/env --reporter dot --check-leaks --no-exit test/ test/acceptance/",
    "test-tap": "mocha --require test/support/env --reporter tap --check-leaks --no-exit test/ test/acceptance/"
  }
}
```

## 键值对

### name

### version

详情见semver

### description

- 格式：字符串
- 描述信息，会被 `npm search` 应用

### keywords

- 字符串数组：`[string, string, ...]`
- 帮助别人查找，会被 `npm search` 应用

### homepage

- 指向项目主页的URL

### bugs

- 格式：对象或字符串
- 反馈地址

### license

- 格式：字符串
- 例如："MIT"

### people fields: author, contributors

指定开发人员信息：
- name
- email：可选
- url：可选

详细：
- author
    - 格式：字符串或对象
- contributors
    - 格式：数组，数组项同上为string或object

```json
{
    "author": {
        "name": "summerlius",
        "email": "summerliuz@163.com",
        "url": "https://github.com/summerlius"
    },

    "author": "summerlius <summerliuz@163.com> (http://xxxx)",
    
    "contributors": [
        "Bob <ssss@gmail.com>",
        "Tom <xxx@icloud.com> (http://xx)",
        {
            "name": "Jack",
            "email": "xx"
        }
    ]
}
```

### files

### main

### bin

许多package含有一个或更多可执行文件，并想要安装到`$PATH`路径下（这样就可以全局使用）。npm使这些包的需求得到了很简单的实现。

为了使用npm这个特性，需要在package.json文件中指定"bin"字段，该字段对应的值为该包下可执行文件的相对路径。

- npm会将包内的可执行路径软链接到`$PATH`路径下。
- 可执行文件可以多样，`#!/usr/bin/env bash|node|python...` 

例如Nodejs版本管理包：`n`，也是使用了该特性：
```json
{
   "bin": {
    "n": "./bin/n"
  }
}
```

### man 

### directories

### repository

### scripts

详情见npm-scripts

### config 

### dependencies

### devDependencies

### peerDependencies

### bundledDependencies

### optionalDependencies

### engines

### engineStrict

### cpu

### preferGlobal

### private

### publishConfig

### DEFAULT VALUES

