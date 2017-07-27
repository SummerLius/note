## Net

`net` 模块封装了异步的网络接口，包含网络服务器和网络客户端API

- `Class: net.Server`: 用来创建一个TCP服务的类
- `Class: net.Socket`: 用来创建一个TCP客户端的类，来连接net.Server

### net.Server

`net.Server` 定义的events有：

- `close`: 当服务关闭时触发。注意当connections存在时，会等所有connections结束时才会触发close事件
- `connection`: 当一个net.Socket客户端连接到net.Server服务时触发
- `error`: 当net.Server发生错误时触发。注意当error触发时，close事件不会自动触发，除非手动调用server.close()
- `listening`: server.listen调用时触发，即net.Server启动时

`net.Server` 定义的方法：

- `server.adddress()`: 
- `server.close()`: 
- `server.getConnections(callback)`: 
- `server.listen(handle[, backlog][, callback])`: 
- `server.listen(options[, callback])`: 
- `server.listen(path[, backlog][, callback])`: 
- `server.listen([port][, hostname][, backlog][, callback])`: 
- `server.maxConnections`: 
- `server.ref()`: 
- `server.unref()`: 

### net.Socket

`net.Socket` 继承了 `duplex stream`、`EventEmitter`，是用来和net.Server服务进行交流socket客户端

```javascript
new net.Socket([options]);

options默认值为：
{
    fd: null,
    allowHalfOpen: false,
    readable: false,
    writable: false
}
```

`net.Socket` 定义的events有：

- `close`: 
- `connect`: 
- `data`: 
- `drain`: 
- `end`: 
- `error`: 
- `lookup`: 
- `timeout`: 

`net.Socket` 定义的属性有：

- `socket.bufferSize`: 
- `socket.bytesRead`: 
- `socket.bytesWritten`: 
- `socket.destroyed`: 
- `socket.localAddress`: 
- `socket.localPort`: 
- `socket.remoteAddress`: 
- `socket.remoteFamily`: 
- `socket.remotePort`: 

`net.Socket` 定义的方法有：

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

### net模块其它函数

- `net.connect(options[, connectListener])`: 
- `net.connect(path[, connectListener])`: 
- `net.connect(port[, host][, connectListener])`: 
- `net.createConnection(options[, connectListener])`: 
- `net.createConnection(path[, connectListener])`: 
- `net.createConnection(port[, host][, connectListener])`: 
- `net.createServer([options][, connectionListener])`: 
- `net.isIP(input)`: 
- `net.isIPv4(input)`: 
- `net.isIPv6(input)`: 

