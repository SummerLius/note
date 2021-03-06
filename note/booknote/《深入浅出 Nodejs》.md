<!-- TOC -->

- [深入浅出 Nodejs](#深入浅出-nodejs)
    - [第一章 Node简介](#第一章-node简介)
    - [第二章 模块机制](#第二章-模块机制)
    - [第三章 异步I/O](#第三章-异步io)

<!-- /TOC -->

# 深入浅出 Nodejs

- 此处仅做部分简要的笔记，详细内容请参考全书。
- 关于此书中的阐述，仅做参考了解，细节可能要看源码

## 第一章 Node简介

## 第二章 模块机制

## 第三章 异步I/O

1. 简介
2. 为什么要异步I/o
    - 简介
    - 用户体验
        1. 异步的概念之所以在Web2.0中火起来，是因为在浏览器中JavaScript在单线程上执行，而且它还与UI渲染共用一个线程。
        2. 单个线程下，耗时JavaScript i/o 的交互，如果是同步的话，可能会阻塞UI渲染，故提供了异步方法。
    - 资源分配
        1. 排除用户体验的因素，我们从资源分配的层面来分析一下异步i/o的必要性。计算机在发展过程中将组件进行了抽象，分为i/o设备和计算设备。
        2. 假设业务场景中有一组互不相关的任务需要完成，现行主流方法有一下两种：
            - 单线程串行以此执行
            - 多线程并行完成
        3. ...
        4. ...
3. 异步i/o实现现状
    - 简介
        1. 异步i/o在Node中应用较广泛，但是它并非Node的原创。下面我们看看**操作系统**对异步i/o实现的支持情况。
    - 异步i/o与非阻塞i/o
        1. 对计算机内核i/o而言，异步/同步和阻塞/非阻塞是两码事。
        2. 操作系统内核对于i/o只有两种方式：阻塞和非阻塞。在调用阻塞i/o时，应用程序需要等待i/o完成才返回结果。
        3. 阻塞i/o造成cpu等待i/o，浪费等待时间，cpu的处理能力不能得到充分利用。为了提供性能，内核提供了非阻塞i/o。非阻塞i/o和阻塞i/o的差别为调用之后会立即返回。
        4. 非阻塞i/o返回之后，cpu的时间片可以用来处理其他事物，此时性能提升是明显的。但是非阻塞i/o也存在一些问题，由于完整的i/o并没有完成，立即返回的并不是业务层期望的数据，而仅仅是当前调用的状态。为了获取完整的数据，应用程序需要重复调用i/o操作来确认是否完成。这种重复调用判断操作是否完成的技术叫做轮询。
        5. 下面我们简要介绍轮询技术。任意技术都非完美的。阻塞i/o造成cpu等待浪费，非阻塞则需要轮询去确认是否完成数据获取，它会让cpu处理状态判断，也是对cpu资源的浪费。这里我们且看轮询技术是如何演进的，以减小i/o状态判断的cpu的损耗。现存的轮询技术主要有如下这些：
            - **read**。它是最原始、性能最低的一种，通过重复调用，来检查i/o状态来完成完整数据的读取。在得到最终数据前，cpu一直耗用在等待上。
            - **select**。它是在read的基础上改进的一种方案，通过对文件描述符上的事件状态来进行判断。select轮询具有一个较弱的限制，那就是由于它采用一个1024长度的数组来存储状态，所以它最多可以同时检查1024个文件描述符。
            - **poll**。
            - **epoll**。
            - **kqueue**。
    - 理想的非阻塞异步i/o
    - 现实的异步i/o
4. Node异步i/o
    - 简介
    - 事件循环
    - 观察者
    - 请求对象
    - 执行回调
    - 小结
5. 非i/o的异步API
    - 简介
    - 定时器
    - process.nextTick()
    - setImmediate()
6. 事件驱动与高性能服务器
7. 总结


自己总结：
1. 对于Android Java，主线程是UI主要处理，对于耗时的同步逻辑，例如网络访问、文件读取等，则是新开一个线程处理；对于web前端，ui处理和js的执行是同一个线程，故如果同步i/o逻辑会阻塞UI的渲染，使得用户体验较差，故web api提供了许多异步API，使得UI的渲染和js i/o操作得以同时进行。
2. 一般程序模型：
    - **多线程并行执行（同步方法）**
        1. 优点：
            - 在多核cpu上能够有效提供cpu的利用率
        2. 缺点
            - 创建线程和线程上下文切换开销较大
            - 复杂业务中，多线程会面临状态同步、锁等问题
    - **单线程串行执行（同步方法）**
        1. 优点
            - 较符合编程人员按顺序思考的思维方式
            - 代码可读性高，易于表达
            - 没有锁、状态同步等问题
        2. 缺点
            - 确定主要在于性能，任意一个略慢的任务都会导致后续执行代码被阻塞
            - 不能有效利用i/o、cpu等资源
    - **单线程串行执行（异步方法）（Nodejs）**
        1. 优点
            - 单线程，没有锁、状态同步等问题
            - 利用异步i/o，让单线程不用被阻塞，更改的利用i/o、cpu等资源
        2. 缺点
            - 毕竟单线程，无法有效利用多核cpu，不过这方面，Node提供了类似前端浏览器中的Web Workers的子进程，该子进程可以通过工作进程高效地利用CPU和I/O。
            - 异步编程代码比较乱，产生地狱回调，可读性差。不过经过社区的努力，像async/await、promise等可以很好提高异步代码可读性
    - “进程被阻塞时，是不会占用操作系统cpu的，阻塞状态解除才能占用系统cpu？？？”
3. 问题：这叫阻塞，还是非阻塞，还是同步，还是异步（从Nodejs层面理解，不是从系统内核i/o上理解）？
    - readFile 文件还未准备好，需要等待，则等待文件好后才返回
    - readFile 文件还未准备好，不等待，直接返回说：文件未准备好
    - 总结：这几个概念似乎在不同的场景，会有不同的理解，这里我写出自己的统一理解：
        1. 同步/异步：对象是方法、函数。影响是通信机制。
            - 同步函数，不管过程是耗时的还是即时的，只要结果是函数即时return的，不需要通过其他方式（例如底层发信号通知）返回最终结果的，则叫做同步。
            - 异步函数，函数是立即返回的，但是最终结果不是，而是等被调用方把数据处理好后，通过事件、消息等方式通知。
            - 举个例子：A调用B，B立即return结果，则为同步；A调用B，B的return不含结果，等B将结果处理好后，在通知A最后结果。可以看出，同步是一步完成，而异步需要两步。
        2. 阻塞/非阻塞：对象方法、函数。影响是进程、执行流程。
            - 首先，阻塞的理解大致就是进程被一个耗时的函数堵住了，后续的代码不能得到执行
            - 阻塞（耗时任务），一般是调用耗时的同步函数造成的
            - 非阻塞（耗时任务），可以是调用非耗时同步函数或异步函数。
                - 问题：对于非阻塞（耗时任务），中方法之一是采用调用 “非耗时同步函数”，那么对于一个耗时任务来讲，可能需要while(1)循环调用该“非阻塞同步函数”，来轮询判断任务是否完成，这样同样也是阻塞后续的任务啊，怎么叫“非阻塞”？？？
                - 回答：这里的“阻塞/非阻塞”的含义是：调用一次函数，该函数是否阻塞进程，函数是否是立即返回（不管是否带最终结果一起返回）。而不是针对应用层的某一个任务，说它是否阻塞进程，如果这么说，那可以说他可能是阻塞进程的，具体要看应用层的代码设计。（所以，看你对“阻塞/非阻塞”的定义）
        3. 我理解这几个概念在Nodejs的地位
            - 同步函数
            - 异步函数
            - 阻塞函数
            - 非阻塞函数
4. 从操作系统内核i/o操作，去理解“同步/异步/阻塞/非阻塞”和在nodejs上理解是不同的，要注意，内核都是针对I/O操作来讲的！
    - 同步i/o：（poxis定义：在i/o操作完成之前会造成进程阻塞，无论是完全阻塞还是部分阻塞）
        - 阻塞i/o（完全阻塞）
        - 非阻塞i/o（部分阻塞）
        - 多路复用i/o
        - 信号驱动式i/o
    - 异步i/o（完全不阻塞）
    - 详细参考：[Linux IO模式及 select、poll、epoll详解](https://segmentfault.com/a/1190000003063859)
5. Nodejs异步函数有两种：
    1. i/o异步api
    2. 非i/o异步api（如Timers等）
    