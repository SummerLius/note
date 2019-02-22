
# stream


<!-- TOC -->

- [stream](#stream)
    - [流的类型](#流的类型)
        - [对象模式](#对象模式)
        - [缓冲](#缓冲)
    - [使用流的相关API](#使用流的相关api)
        - [可写流](#可写流)
            - [stream.Writable 类](#streamwritable-类)
                - ['close' 事件](#close-事件)
                - ['drain' 事件](#drain-事件)
                - ['error' 事件](#error-事件)
                - ['finish' 事件](#finish-事件)
                - ['pipe' 事件](#pipe-事件)
                - ['unpipe' 事件](#unpipe-事件)
                - [writable.writable](#writablewritable)
                - [writable.writableHighWaterMark](#writablewritablehighwatermark)
                - [writable.writableLength](#writablewritablelength)
                - [writable.cork()](#writablecork)
                - [writable.uncork()](#writableuncork)
                - [writable.destory([error])](#writabledestoryerror)
                - [writable.end([chunk][, encoding][, callback])](#writableendchunk-encoding-callback)
                - [writable.setDefaultEncoding(encoding)](#writablesetdefaultencodingencoding)
                - [writable.write(chunk[, encoding][, callback])](#writablewritechunk-encoding-callback)
        - [可读流](#可读流)
            - [两种读取模式](#两种读取模式)
            - [三种状态](#三种状态)
            - [选择一种接口风格](#选择一种接口风格)
            - [stream.Readable 类](#streamreadable-类)
                - ['close' 事件](#close-事件-1)
                - ['data' 事件](#data-事件)
                - ['end' 事件](#end-事件)
                - ['error' 事件](#error-事件-1)
                - ['readable' 事件](#readable-事件)
                - [readable.destroy([error])](#readabledestroyerror)
                - [readable.isPaused()](#readableispaused)
                - [readable.pause()](#readablepause)
                - [readable.pipe(destination[, options])](#readablepipedestination-options)
                - [readable.read([size])](#readablereadsize)
                - [readable.readable](#readablereadable)
                - [readable.readableHighWaterMark](#readablereadablehighwatermark)
                - [readable.readableLength](#readablereadablelength)
                - [readable.resume()](#readableresume)
                - [readable.setEncoding(encoding)](#readablesetencodingencoding)
                - [readable.unpipe([destination])](#readableunpipedestination)
                - [readable.unshift(chunk)](#readableunshiftchunk)
                - [readable.wrap(stream)](#readablewrapstream)
                - [readable[Symbol.asyncIterator]()](#readablesymbolasynciterator)
        - [双工流和转换流](#双工流和转换流)
            - [stream.Duplex 类](#streamduplex-类)
            - [stream.Transform 类](#streamtransform-类)
                - [transform.destroy([error])](#transformdestroyerror)
        - [stream.finished(stream, callback)](#streamfinishedstream-callback)
        - [stream.pipeline(...streams[, callback])](#streampipelinestreams-callback)
    - [实现流的相关API](#实现流的相关api)
        - [简单的实现](#简单的实现)
        - [实现可写流](#实现可写流)
        - [实现可读流](#实现可读流)
        - [实现双工流](#实现双工流)
        - [实现转换流](#实现转换流)
    - [其他注意事项](#其他注意事项)
    - [//////////////以下为旧版本/////////////////](#以下为旧版本)
        - [流的类型](#流的类型-1)
            - [对象模式（Object Mode）](#对象模式object-mode)
            - [缓冲（Buffering）](#缓冲buffering)
        - [可写流（Writable）](#可写流writable)
        - [可读流（Readable）](#可读流readable)
            - [两种模式](#两种模式)
            - [三种状态](#三种状态-1)
            - [close事件](#close事件)
            - [data事件](#data事件)
            - [end事件](#end事件)
            - [error事件](#error事件)
            - [readable事件](#readable事件)
        - [双工流（Duplex）](#双工流duplex)
        - [变换流（Transform）](#变换流transform)
    - [链接](#链接)

<!-- /TOC -->

## 流的类型

- Node.js中有四种基本的流类型：
    - `Writable` - 可写入数据的流（例如，fs.createWriteStream()）
    - `Readable` - 可读取数据的流（例如，sf.createReadStream()）
    - `Duplex` - 可读可写的流（例如，net.Socket）
    - `Transform` - 在读写过程中可以修改或转换数据的 Duplex 流（例如，zlib.createDeflate()）

### 对象模式

- Node.js创建的流都是运作在 String 和 Buffer（或UintArray）上；
    - 当然，流的实现也可以使用其它类型的JavaScript值（除了null），这些流会以“对象模式”进行操作；
- 当创建流时，可以使用 objectMode 选项把流切换到对象模式；
- 将已存在的流切换到对象模式是不安全的；

### 缓冲

- 可写流和可读流都会在内部的缓冲器中存储数据，可以分别使用 writable.writableBuffer 或 readable.readableBuffer 来获取；
- 可缓冲的数据大小取决于传入stream构造函数的 highWaterMark 选项；
    - 对于普通的流，highWaterMark 指定了字节总数；
    - 对于对象模式的流，highWaterMark 指定了对象的总数；
- 当调用 steam.push(chunk) 时，数据会被缓冲到可读流中，如果流的消费者没有调用 stream.read()，则数据会保留在内部队列中直到被消费；
- 一旦内部的可读缓冲的总大小达到 highWaterMark 指定的阈值时，流会暂时停止从底层资源读取数据，直到当前缓冲的数据被消费；（也就是说，流会停止调用内部的用于填充可读缓冲的 readable._read()）
- 当调用 writable.write(chunk)时，数据会被缓冲到可写流中，当内部的可写缓冲总大小小于 highWaterMark 阈值时，调用 wiritable.write() 会返回 true，否则返回 false；
- stream API 的主要目标，特别是 stream.pipe()，是为了限制数据的缓冲到可接受的程度，也就是即使sources和destinations的读写速度不一致时，也不会压垮内存；
- 因为 Duplex 和 Transform 都是可读可写，所以它们各自维护着两个相互独立的内部缓冲器用于读写，这使得它们在维护数据流时，读和写两边可以各自独立地运作；

## 使用流的相关API

### 可写流

- 可写流是对数据要被写入目的地的一种抽象；
    - “我们” 写入数据到目的地；
- 可写流的例子包括：
    - 客户端的 HTTP 请求
    - 服务器的 HTTP 响应
    - fs 的写入流
    - zlib 流
    - crypto 流
    - TCP socket
    - 子进程 stdin
    - process.stdout、process.stderr
- 上面的一些例子事实上是实现了可写流接口的 Duplex 流；
- 所有的可写流都实现了 stream.Writable 类定义的接口；
- 尽管可写流的具体实例可能略有差别，但所有的可写流都遵循同一基本的使用模式，如以下例子所示：
    ```js
    const myStream = getWritableStreamSomehow();
    myStream.write('一些数据');
    myStream.write('更多数据');
    myStream.end('完成写入数据');
    ```

#### stream.Writable 类

##### 'close' 事件

- 当流或其底层资源（如文件描述符）被关闭时触发，表明不会再触发其他事件，也不会再发生操作；
- 不是所有可写流都会触发'close'事件；

##### 'drain' 事件

- 如果调用 stream.write(chunk) 返回false，即当前写入流的缓冲区已满；
    - 当缓冲区空出来，适合继续写入数据到流时，会触发 'drain' 事件；
- 示例：
    ```js
    // 向可写流中写入数据一百万次。
    // 留意背压（back-pressure）。
    function writeOneMillionTimes(writer, data, encoding, callback) {
      let i = 1000000;
      write();
      function write() {
        let ok = true;
        do {
          i--;
          if (i === 0) {
            // 最后一次写入。
            writer.write(data, encoding, callback);
          } else {
            // 检查是否可以继续写入。 
            // 不要传入回调，因为写入还没有结束。
            ok = writer.write(data, encoding);
          }
        } while (i > 0 && ok);
        if (i > 0) {
          // 被提前中止。
          // 当触发 'drain' 事件时继续写入。
          writer.once('drain', write);
        }
      }
    }
    ```

##### 'error' 事件

- 当写入数据发生错误时触发；
- 当触发 'error' 事件时，流还未被关闭；

##### 'finish' 事件

- 调用 stream.end() 且缓冲数据都已经传给底层系统之后触发；
    ```js
    const writer = getWritableStreamSomehow();
    for (let i = 0; i < 100; i++) {
      writer.write(`写入 #${i}!\n`);
    }
    writer.end('写入结尾\n');
    writer.on('finish', () => {
      console.error('写入已完成');
    });
    ```

##### 'pipe' 事件

- `src`：`<steam.Readable>` 通过管道流写入到可写流的来源流
- 当在可读流上调用 stream.pipe() 时触发
- 示例
    ```js
    const writer = getWritableStreamSomehow();
    const reader = getReadableStreamSomehow();
    writer.on('pipe', (src) => {
      console.error('有数据正通过管道流入写入器');
      assert.equal(src, reader);
    });
    reader.pipe(writer);
    ```

##### 'unpipe' 事件

- `src`：`<stream.Readable>` 被移除的写入管道的来源流
- 当在可读流上调用 stream.unpipe() 时触发；
- 当可读流通过管道流向可写流发生错误时，也会触发 'unpipe' 事件；
    ```js
    const writer = getWritableStreamSomehow();
    const reader = getReadableStreamSomehow();
    writer.on('unpipe', (src) => {
      console.error('已移除可写流管道');
      assert.equal(src, reader);
    });
    reader.pipe(writer);
    reader.unpipe(writer);
    ```

##### writable.writable

- Boolean类型
- 如果为true，则表示可以安全调用 writable.write()

##### writable.writableHighWaterMark

- Number类型
- 返回构造可写流时传入的 highWaterMark 的值；

##### writable.writableLength

- 返回队列中准备被写入的字节数（或对象数）

##### writable.cork()

- 后续强制把写入的数据都缓冲到内存中；
- 当调用 stream.uncork() 或 stream.end() 时，缓冲的数据才会被输出；
- 当写入大量小块数据到流时，内部缓冲可能会失效（具体为啥失效，可以查看源码实现），从而导致性能下降，writable.cork() 主要用于避免这种情况；
    - 对于这种情况，实现了 writable._writev() 的流可以用更优的方式对写入的数据进行缓冲；

##### writable.uncork()

- 将调用 stream.cork() 后缓冲的所有数据输出到目标；
- 当使用 writable.cork() 和 writable.uncork() 来管理流的写入缓冲时，建议使用 process.nextTick() 来延迟调用 writable.uncork()；通过这种方式，可以对单个Nodejs事件循环中调用所有的 writable.write() 进行批处理；
    ```js
    stream.cork();
    stream.write('一些 ');
    stream.write('数据 ');
    process.nextTick(() => stream.uncork());
    ```
- 如果一个流上多次调用 writable.cork()，则必须调用同样次数的 writable.uncork() 才能输出缓冲的数据；
    ```js
    stream.cork();
    stream.write('一些 ');
    stream.cork();
    stream.write('数据 ');
    process.nextTick(() => {
      stream.uncork();
      // 数据不会被输出，直到第二次调用 uncork()。
      stream.uncork();
    });
    ```

##### writable.destory([error])

- 返回：`<this>`
- 销毁流，并触发 `error` 事件且传入 error 参数；
- 调用该方法后，可写流就结束了，之后再调用 write() 或 end() 都会导致 ERR_STREAM_DESTROYED 错误；
- 实现流时不应该重写这个方法，而是重写 writable._destroy()；

##### writable.end([chunk][, encoding][, callback])

```js
/**
 * @description
 * 
 * @param {String|Buffer|Uint8Array|any} chunk 
 * @param {String} encoding 
 * @param {Function} callback 
 * @returns {this}
 */
writable.end([chunk][, encoding][, callback])
```
- 参数chunk，表示要写入的数据
    - 对于非对象模式的流，chunk必须是String、Buffer或Uint8Array；
    - 对于对象模式的流，chunk可以是任何JavaScript的值，除了null；
- 参数encoding
    - 如果chunk是字符串，则指定字符编码；
- 参数callback，当流结束时的回调函数；
- 调用 writable.end() 表明已没有数据要被写入可写流；
    - 可选的 chunk 和 encoding 参数可以在关闭流之前再写入一块数据；
    - 如果传入了 callback 函数，则会作为监听器添加到 'finish' 事件；
- 调用 stream.end() 之后再调用 steam.write() 会导致错误；
    ```js
    // 先写入 'hello, '，结束前再写入 'world!'。
    const fs = require('fs');
    const file = fs.createWriteStream('例子.txt');
    file.write('hello, ');
    file.end('world!');
    // 后面不允许再写入数据！
    ```

##### writable.setDefaultEncoding(encoding)

```js
/**
 * @description
 * 
 * @param {String} encoding 
 * @returns {this}
 */
writable.setDefaultEncoding(encoding)
```
- 参数encoding，为可写流设置默认编码；

##### writable.write(chunk[, encoding][, callback])

```js
/**
 * @description
 * 
 * @param {String|Buffer|Uint8Array|any} chunk 
 * @param {String} encoding 
 * @param {Function} callback 
 * @returns {Boolean}
 */
writable.write(chunk[, encoding][, callback])
```
- 参数chunk，表示要写入的数据
    - 对于非对象模式的流，chunk必须是String、Buffer或Uint8Array；
    - 对于对象模式的流，chunk可以是任何JavaScript的值，除了null；
- 参数encoding
    - 如果chunk是字符串，则指定字符编码；
- 参数callback，当数据块被输出到目标后的回调函数；
- 返回Boolean值，如果流需要等待 'drain' 事件触发才能继续写入更多数据，则返回false，否则返回true；
- writable.write() 写入数据到流，并在数据被完全处理之后才调用 callback；
    - 如果发生错误，则 callback 可能被调用也可能不被调用；
    - 为了可靠的检测错误，可以为 'error' 事件添加监听器；
- 在接收 chunk 后，如果内部的缓冲小于创建流时配置的 highWaterMark，则返回true；如果返回 false，则应该停止向流写入数据，直到 'drain' 事件被触发；
- 当缓冲区数据大小达到阈值时，调用 write() 会返回false；
    - 一旦当前缓冲区的数据块被排空时（被操作系统接受并传输），则触发 'drain' 事件；
        - 【这里问题待研究 ———— 具体什么情况触发 'drain' 事件？】是缓冲区全部排空还是排空到合适即可；
    - 建议一旦 write() 返回 false，则不再写入任何数据块，直到 'drain' 事件被触发；
    - 当流还未被排空时，也是可以调用 write()，Node.js会缓冲所有被写入的数据块，直到达到最大内存占用，这时它会无条件中止；
    - 甚至在它中止之前，高内存占用将会导致垃圾回收器的性能变差和RSS变高（即使内存不再需要，通常也不会被释放回系统）；
    - 如果远程的另一端没有读取数据，TCP的socket可能永远也不会排空，所以写入到一个不会排空的socket可能会导致远程可利用的漏洞；
- 对于 Transform，写入数据到一个不会排空的流尤其成问题，因为Transform流默认会被暂停，直到它们被pipe或者添加了'data'或'readable'事件句柄；
- 如果要被写入的数据可以根据需要生成或者取得，建议将逻辑封装一个可读流并且使用 stream.pipe()；
    - 如果要优先调用 write()，则可以使用 'drain' 事件来防止背压与避免内存问题；
        ```js
        function write(data, cb) {
          if (!stream.write(data)) {
            stream.once('drain', cb);
          } else {
            process.nextTick(cb);
          }
        }
        
        // 在回调函数被执行后再进行其他的写入。
        write('hello', () => {
          console.log('完成写入，可以进行更多的写入');
        });
        ```

### 可读流

- 可读流是对提供数据的来源的一种抽象；
    - “我们” 从源头读取数据；
- 可读流的例子包括：
    - 客户端的 HTTP 响应
    - 服务器的 HTTP 请求
    - fs 的读取流
    - zlib 流
    - crypto 流
    - TCP socket
    - 子进程 stdout 与 stderr
    - process.stdin
- 所有可读流都实现了 stream.Readable 类定义的接口

#### 两种读取模式

- 可读流运作于两种模式之一：流动模式（flowing）或暂停模式（paused）
    - 在流动模式中，数据自动从底层系统读取，并通过 EventEmitter 接口的事件尽可能快地被提供给应用程序；
    - 在暂停模式中，必须显式调用 stream.read() 读取数据块；
- 所有可读流开始都处于暂停模式，可以通过以下方式切换到流动模式：
    - 添加 `data` 事件句柄；
    - 调用 stream.resume()；
    - 调用 stream.pipe()；
- 可读流可以通过以下方式切换回暂停模式：
    - 如果没有管道目标，则调用 stream.pause()；
    - 如果有管道目标，则移除所有管道目标，调用 stream.unpipe() 可以移除多个管道目标；
- 只有提供了消费或者忽略数据的机制后，可读流才会产生数据；如果消费的机制被禁用或者移除，则可读流会停止产生数据；
- 为了向后兼容，移除'data'事件句柄不会自动暂停流；如果有管道流目标，一旦目标变为 drain 状态并请求接受数据时，则调用 stream.pause() 也不能保证流会保持暂停模式；
- 如果可读流切换到流动模式，且没有可用的消费者来处理数据，则数据将会丢失；
    - 例如，当调用 readable.resume() 时，没有监听 'data' 事件或 'data'事件句柄已移除；
- 添加 'readable' 事件句柄会使流自动停止流动，并通过 readable.read() 消费数据；
    - 如果 'readable' 事件句柄被移除，且存在 'data' 事件句柄，则流会再次开始流动；

#### 三种状态

- 可读流的两种模式是对发生在可读流中更加复杂的内部状态管理的一种简化的抽象；
- 在任意时刻，可读流会处于以下三种状态之一：
    - 

#### 选择一种接口风格
#### stream.Readable 类
##### 'close' 事件
##### 'data' 事件
##### 'end' 事件
##### 'error' 事件
##### 'readable' 事件
##### readable.destroy([error])
##### readable.isPaused()
##### readable.pause()
##### readable.pipe(destination[, options])
##### readable.read([size])
##### readable.readable
##### readable.readableHighWaterMark
##### readable.readableLength
##### readable.resume()
##### readable.setEncoding(encoding)
##### readable.unpipe([destination])
##### readable.unshift(chunk)
##### readable.wrap(stream)
##### readable[Symbol.asyncIterator]()

### 双工流和转换流

#### stream.Duplex 类
#### stream.Transform 类
##### transform.destroy([error])

### stream.finished(stream, callback)
### stream.pipeline(...streams[, callback])

## 实现流的相关API

### 简单的实现
### 实现可写流
### 实现可读流
### 实现双工流
### 实现转换流

## 其他注意事项

## //////////////以下为旧版本/////////////////
Stream继承了Events

### 流的类型

Nodejs有四种基本的流类型：
- Readable：可读的流，例如 fs.createReadStream()
- Writable：可写的流，例如 fs.createWriteStream()
- Duplex：可读写的流，双工，例如 net.Socket()
- Transform：在读写过程中可以修改和变换数据的 Duplex 流，例如 zlib.createDeflate()


#### 对象模式（Object Mode）


#### 缓冲（Buffering）

### 可写流（Writable）

可写流是写入数据目的地的抽象。  

可写流的实例：
- HTTP requests, on the client
- HTTP responses, on the server
- fs write streams
- zlib streams
- crypto streams
- TCP sockets
- child process stdin
- process.stdout, process.stderr

### 可读流（Readable）

可读流是对提供数据源头的抽象。  

可读流的实例：
- HTTP responses, on the client
- HTTP requests, on the server
- fs read streams
- zlib streams
- crypto streams
- TCP sockets
- child process stdout and stderr
- process.stdin

#### 两种模式

可读流工作在下面两种模式之一：
- `flowing`：可读流自动从系统底层读取数据，并通过 EventEmitter 接口尽快的将数据提供给应用
- `paused`：此模式下，必须显示调用 stream.read() 方法，来从流中读取数据片段

两种模式之间切换
- `paused->flowing`
    - 监听 `data` 事件
    - 调用 `stream.resume()` 方法
    - 调用 `stream.pipe()` 方法将数据发送到可写流
- `flowing->paused`
    - 如果不存在管道目标（pipe destination），可以通过调用 stream.pause() 方法
    - 如果存在管道目标，可以通过取消 'data' 事件监听，并调用stream.unpipe()方法移除所有管道目标

**Note**：这里需要记住的重要概念就是，可读流需要先为其提供消费或忽略的机制，才能开始提供数据。如果消费机制被禁用或取消，可读流将尝试停止生成数据。

> 注意: 为了向后兼容，取消 'data' 事件监听并 不会 自动将流暂停。同时，如果存在管道目标（pipe destination），且目标状态变为可以接收数据（drain and ask for more data），调用了 stream.pause() 方法也并不保证流会一直 保持 暂停状态。

> 注意: 如果 Readable 切换到 flowing 模式，且没有消费者处理流中的数据，这些数据将会丢失。 比如， 调用了 readable.resume() 方法却没有监听 'data' 事件，或是取消了 'data' 事件监听，就有可能出现这种情况。

#### 三种状态

可读流的 “两种工作模式” 是一种简单的抽象。它抽象了在可读流实现内部发生的复杂的状态管理过程。

在任意时刻，任意可读流应确切处理下面三种状态之一：
- readable._readableState.flowing = null
- readable._readableState.flowing = false
- readable._readableState.flowing = true

若状态为 null，由于不存在数据消费者，可读流将不会产生数据库。在这个状态下，监听 'data' 事件、调用 readable.pipe() 方法、或者调用 readable.resume() 方法，将会使状态置为 true。这是随着数据生成，可读流开始频繁触发事件。

调用 readable.pause() 方法，readable.unpipe() 方法，将导致状态置为 false。这将暂停事件流，但不会暂停数据生成。在这种情况下，为 'data' 事件设置监听函数不会导致状态变为true。

当装填置为false时，数据可能堆积在流的内部缓存中。

#### close事件

close事件将在流或其底层资源关闭后触发。close事件触发后，该流不会再触发任何事件。

**Note**：不是所有的Readable都会触发close事件 

#### data事件

`chunk <Buffer> | <string> | <any>`数据片段。

对于非对象模式的可读流，这是一个String或Buffer。对于对象模式可读流，这可以是除 null 以外的任意类型Javascript值。

'data' 事件会在Readable将数据传递给消费者时触发。当流转换到flowing模式时触发该事件。'data'事件也会在调用Readable.read()方法并有数据返回时触发。

如果调用readable.setEncoding()方法为流指定了编码，回调函数将接受到一个String，否者接受到的数据将是一个Buffer实例

#### end事件 

end事件将在流中再没有数据可供消费时触发。

#### error事件

#### readable事件


### 双工流（Duplex）

双工流的实例：
- TCP sockets
- zlib streams
- crypto streams

### 变换流（Transform）

变换流的实例：
- zlib streams
- crypto streams


## 链接

- http://nodejs.cn/api/
- https://nodejs.org/api/
