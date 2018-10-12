<!-- TOC -->

- [guide](#guide)
    - [常规](#常规)
        - [新手指南](#新手指南)
        - [Debugging指南](#debugging指南)
        - [简单分析Nodejs应用程序](#简单分析nodejs应用程序)
        - [Docker容器化 Nodejs web app](#docker容器化-nodejs-web-app)
        - [迁移到安全Buffer构造函数](#迁移到安全buffer构造函数)
    - [Nodejs 核心概念](#nodejs-核心概念)
        - [阻塞 VS 非阻塞 概要](#阻塞-vs-非阻塞-概要)
        - [Nodejs 事件循环、Timers、process.nextTick()](#nodejs-事件循环timersprocessnexttick)
        - [不要阻塞事件循环（或工作池 The Worker Pool）](#不要阻塞事件循环或工作池-the-worker-pool)
        - [Timer in Nodejs](#timer-in-nodejs)
    - [其他相关模块指南](#其他相关模块指南)
        - [剖析HTTP事物](#剖析http事物)
        - [工作在不同的文件系统](#工作在不同的文件系统)
        - [Backpressuring in Streams](#backpressuring-in-streams)
        - [Domain Module Postmortem](#domain-module-postmortem)
        - [如何发布 N-API 包](#如何发布-n-api-包)
    - [参考](#参考)

<!-- /TOC -->

# guide

## 常规

### 新手指南

太简单了，不做记录

### Debugging指南

- 开启检查
- 安全相关
- 检查器客户端
- 命令行选项
- 开启远程调试场景
- 遗留调试器

### 简单分析Nodejs应用程序

### Docker容器化 Nodejs web app

### 迁移到安全Buffer构造函数

## Nodejs 核心概念

### 阻塞 VS 非阻塞 概要

- 阻塞
    1. **blocking**：在Node线程中，执行额外的js代码，必须等非js操作执行完成（例如fs、net操作）。这是因为，当阻塞操作执行时，事件循环event loop被阻塞了，不能继续执行js。
    2. 在Nodejs中，如果是因为cpu密集型操作（例如js for循环）而不是非js操作（例如i/o），所导致的性能交差，其不能叫阻塞。
    3. 在使用libuv的Nodejs标准库中，同步方法大多数都是阻塞的。本地模块也会有阻塞方法。
    4. 在Nodejs标准库（API）中，所有的I/O方法均提供了异步版本，即**non-blocking**，异步方法接受回调函数。同时也提供了一些同步方法。
- 代码比较
    1. 阻塞方法被同步执行，非阻塞方法被异步执行
    2. 举个栗子
        ```js
        // 同步、阻塞
        const data = fs.readFileSync('/file.md');

        // 异步、非阻塞
        fs.readFile('/file.md', (err, data) => {
            if(err) throw err;
        });
        ```
- 并发和吞吐（concurrency and throughput）
    1. Node.js中的JavaScript执行是单线程的，因此并发指的是事件循环在完成其他工作后执行JavaScript回调函数的能力。
    2. 预期以并发方式运行的任何代码都必须允许事件循环继续运行，因为非js操作（如i/o）正在发生。
    3. 作为一个例子，让我们考虑一个情况，其中每个对Web服务器的请求需要50ms完成，并且该50ms中的45ms是可以异步完成的数据库I / O。选择非阻塞异步操作可释放每个请求45ms以处理其他请求。只是通过选择使用非阻塞方法而不是阻塞方法，这是一个显着的容量差异。
    4. 事件循环与许多其他语言中的模型不同，在这些语言中可能会创建额外的线程来处理并发工作。
- 搞混阻塞和非阻塞代码是危险的
    1. 处理I / O时应该避免一些模式。我们来看一个例子：
        ```js
        // readFile 和 unlinkSync 可能有冲突
        const fs = require('fs');
        fs.readFile('/file.md', (err, data) => {
          if (err) throw err;
          console.log(data);
        });
        fs.unlinkSync('/file.md');

        // readFile 和 unlinkSync 按照顺序
        const fs = require('fs');
        fs.readFile('/file.md', (readFileErr, data) => {
          if (readFileErr) throw readFileErr;
          console.log(data);
          fs.unlink('/file.md', (unlinkErr) => {
            if (unlinkErr) throw unlinkErr;
          });
        });
        ```
- 其他资源
    1. [libuv](http://libuv.org/)
    2. [About Node.js](https://nodejs.org/en/about/)

### Nodejs 事件循环、Timers、process.nextTick()

[这里有翻译](https://segmentfault.com/a/1190000012258592)

- 什么是事件循环event loop
    1. 事件循环的主要作用是 通过将操作卸载到系统内核上去处理，从而允许Nodejs执行非阻塞I/O操作，尽管js的执行是单线程的。
- 事件循环解释
    1. 当nodejs程序启动时，它初始化事件循环，处理指定的js脚本，该脚本可能会调用异步API、schedule timers或process.nextTick()，然后就会处理事件循环。
    2. 下面的表格展示了一个事件循环操作顺序的简要大概：
        ```
           ┌───────────────────────────┐
        ┌─>│           timers          │
        │  └─────────────┬─────────────┘
        │  ┌─────────────┴─────────────┐
        │  │     pending callbacks     │
        │  └─────────────┬─────────────┘
        │  ┌─────────────┴─────────────┐
        │  │       idle, prepare       │
        │  └─────────────┬─────────────┘      ┌───────────────┐
        │  ┌─────────────┴─────────────┐      │   incoming:   │
        │  │           poll            │<─────┤  connections, │
        │  └─────────────┬─────────────┘      │   data, etc.  │
        │  ┌─────────────┴─────────────┐      └───────────────┘
        │  │           check           │
        │  └─────────────┬─────────────┘
        │  ┌─────────────┴─────────────┐
        └──┤      close callbacks      │
           └───────────────────────────┘

        注意：每一个盒子表示事件循环的一个阶段
        ```
    3. 每个阶段都有一个执行回调的FIFO队列。虽然每个阶段都有其特定的方式，但通常情况下，当事件循环进入给定阶段时，它将执行特定于该阶段的任何操作，然后在该阶段的队列中执行回调，直到队列耗尽或回调的最大数量已执行。当队列耗尽或达到回调限制时，事件循环将移至下一个阶段，依此类推。
    4. 由于这些操作中的任何一个都可以调度更多的操作，并且在轮询阶段处理的新事件由内核排队，所以轮询事件可以在轮询事件正在处理的同时排队。因此，长时间运行的回调可以使轮询阶段的运行时间远远超过计时器的阈值。有关更多详细信息，请参阅定时器和轮询部分
    5. 注意：Windows和Unix / Linux实现之间略有差异，但这对此演示不重要。最重要的部分在这里。实际上有七八个步骤，但我们关心的那些 - Node.js实际使用的那些 - 就是上述那些
- 阶段概述
    1. **timers**：此阶段执行 由 `setTimeout()`、`setInterval()` 方法计划的回调。(例如，setTimeout方法的第二个参数，即要传入回调函数)
    2. **pending callbacks**：将执行I/O的回调，延迟到下一个循环迭代
    3. **idle, prepare**：仅在内部被使用（待理解）
    4. **poll**：检索新的i/o事件；执行i/o相关的回调函数（除了，close回调、timers回调，setImmediate()回调 ）；适当时，node将会在这里阻塞。
    5. **check**：`setImmediate()` 回调函数在此被执行
    6. **close callbacks**：一些 close 事件回调函数在此被执行，例如 `socket.on('close', ...)`
    7. 在事件循环每次运行之间，nodejs检查它是否正在等待任何异步i/o或定时器，并在没有任何异步i/o或定时器时清理关闭。
- 阶段详细
    1. timers
        - 计时器指定阈值，之后可以执行提供的回调，而不是人们希望执行的确切时间。定时器回调将在指定的时间过后，按照预定的时间运行;但是，操作系统调度或其他回调的运行可能会延迟它们。
        - 注意：从技术上讲，poll阶段控制何时执行定时器
        - ...
        - ...
    2. pending callbacks
        - 此阶段为某些系统操作（如TCP错误类型）执行回调。例如，如果尝试连接时TCP套接字收到ECONNREFUSED，则某些* nix系统要等待报告错误。这将排队等候在待处理的回调阶段执行
    3. poll
        - poll轮询阶段
    4. check
    5. close callbacks
- setImmediate() VS setTimeout()
- process.nextTick()


### 不要阻塞事件循环（或工作池 The Worker Pool）

### Timer in Nodejs

## 其他相关模块指南

### 剖析HTTP事物

### 工作在不同的文件系统

### Backpressuring in Streams

### Domain Module Postmortem

### 如何发布 N-API 包

## 参考

- https://nodejs.org/en/docs/guides/