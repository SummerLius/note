
## stream


<!-- TOC -->

- [stream](#stream)
    - [流的类型](#流的类型)
        - [对象模式（Object Mode）](#对象模式object-mode)
        - [缓冲（Buffering）](#缓冲buffering)
    - [可写流（Writable）](#可写流writable)
    - [可读流（Readable）](#可读流readable)
        - [两种模式](#两种模式)
        - [三种状态](#三种状态)
        - [close事件](#close事件)
        - [data事件](#data事件)
        - [end事件](#end事件)
        - [error事件](#error事件)
        - [readable事件](#readable事件)
    - [双工流（Duplex）](#双工流duplex)
    - [变换流（Transform）](#变换流transform)

<!-- /TOC -->

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

