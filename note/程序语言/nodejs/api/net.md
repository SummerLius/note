<!-- TOC -->

- [Net](#net)
    - [net.Server类](#netserver类)
        - [事件](#事件)
        - [字段](#字段)
        - [方法](#方法)
    - [net.Socket类](#netsocket类)
        - [事件](#事件-1)
        - [字段](#字段-1)
        - [方法](#方法-1)
    - [net模块其它函数](#net模块其它函数)
        - [net.connect()](#netconnect)
        - [net.createConnection()](#netcreateconnection)
        - [net.createServer()](#netcreateserver)
        - [net.isIp()](#netisip)
        - [net.isIPv4()](#netisipv4)
        - [net.isIPv6](#netisipv6)

<!-- /TOC -->

# Net

`net` 模块封装了异步的网络接口，包含网络服务器和网络客户端API

- `Class: net.Server`: 用来创建一个TCP服务的类
- `Class: net.Socket`: 用来创建一个TCP客户端的类，来连接net.Server

## net.Server类

`net.Server`类由于创建tcp或UNIX Socket IPC服务

`net.Server`继承了EventEmitter类。

### 事件
- `close`: 当服务server关闭时触发。注意当connections存在时，会等所有connections结束时才会触发close事件
- `connection`: 当一个新的connection建立的时候触发
- `error`: 当net.Server发生错误时触发。注意当error触发时，close事件不会自动触发，也就是如果该error不影响server运行的话，server不会挂掉，除非手动调用server.close()
- `listening`: server.listen()调用时触发，即net.Server启动时

### 字段

- `server.listening`：一个布尔值，表明server是否正在监听连接
- `server.maxConnections`：设置该属性，使得当server连接数过多时拒绝连接。一旦将一个socket发送给 "child_process.fork()" 生成的子进程，就不推荐使用该选项。有需要可以在子进程中设置该选项。 

### 方法

- `new net.Server([options][, connectionListener])`：创建一个Server实例，参数同`net.createServer([options][, connectionListener])`函数一样
- `server.adddress()`: 
- `server.close()`: 
- `server.getConnections(callback)`: 
- `server.listen(handle[, backlog][, callback])`: 
- `server.listen(options[, callback])`: 
- `server.listen(path[, backlog][, callback])`: 
- `server.listen([port][, hostname][, backlog][, callback])`: 
- `server.ref()`: 
- `server.unref()`: 

## net.Socket类

`net.Socket`类是TCP或UNIX Socket的抽象，用户可以用此和net.Server服务通信交流。

`net.Socket` 继承了 `duplex stream`、`EventEmitter`。

- 在客户端：可以通过net.createConnection()等类似方法获得net.Socket，客户端用此和server通信
- 在服务端：在监听net.server的'connection'事件的回调函数中获得net.Socket实例，服务端用此可以和客户端通信

### 事件

- `close`: 
- `connect`: 
- `data`: 
- `drain`: 
- `end`: 
- `error`: 
- `lookup`: 
- `timeout`: 

### 字段

- `socket.bufferSize`: 
- `socket.bytesRead`: 
- `socket.bytesWritten`: 
- `socket.connecting`：
- `socket.destroyed`: 
- `socket.localAddress`: 
- `socket.localPort`: 
- `socket.remoteAddress`: 
- `socket.remoteFamily`: 
- `socket.remotePort`: 

### 方法

- `new net.Socket([options])`
- `socket.address()`: 
- `socket.connect(options[, connectListener])`: 
- `socket.connect(path[, connectListener])`: 
- `socket.connect(port[, host][, connectListener])`: 
- `socket.destroy()`: 
- `socket.end([data][, encoding])`: 
- `socket.pause()`: 
- `socket.ref()`: 
- `socket.resume()`: 
- `socket.setEncoding([encoding])`: 
- `socket.setKeepAlive([enable][, initialDelay])`: 
- `socket.setNoDelay([noDelay])`: 
- `socket.setTimeout(timeout[, callback])`: 
- `socket.unref()`: 
- `socket.write(data[, encoding][, callback])`: 

## net模块其它函数

### net.connect()

**此为net.createConnection()的别名**

- `net.connect(options[, connectListener])`: 
- `net.connect(path[, connectListener])`: 
- `net.connect(port[, host][, connectListener])`: 

### net.createConnection()

该方法是用于创建 `net.Socket` 的工厂函数，并立即调用socket实例方法 `socket.connect()`初始化connection，然后返回已经和Server连接的net.Socket实例。 

- `net.createConnection(options[, connectListener])`
- `net.createConnection(path[, connectListener])`：用于IPC连接
- `net.createConnection(port[, host][, connectListener])`：用于TCP连接

### net.createServer()

该方法是用于创建 `net.Server`（TCP或UNIX IPC服务） 的工厂函数

- `net.createServer([options][, connectionListener])`：
- 参数：
    - `options`：
        - `allowHalfOpen`：设置是否允许半开的TCP连接（half-opened TCP connection），**默认值**：false
        - `pauseOnConnect`：设置当连接建立时，socket对象的数据通信是否暂停，**默认值**：false
    - `connectionListener`：自动给 `net.Server` 的"connection"事件添加监听器



### net.isIp()

- `net.isIP(input)`: 

### net.isIPv4()

- `net.isIPv4(input)`:

### net.isIPv6 
- `net.isIPv6(input)`: 

