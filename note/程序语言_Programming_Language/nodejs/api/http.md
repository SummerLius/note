<!-- TOC -->

- [http](#http)
    - [http.Agent类](#httpagent类)
    - [http.ClientRequest类](#httpclientrequest类)
    - [http.Server类](#httpserver类)
        - [事件](#事件)
        - [字段属性](#字段属性)
        - [方法](#方法)
    - [http.ServerResponse类](#httpserverresponse类)
    - [http.IncomingMessage类](#httpincomingmessage类)
    - [http.METHODS](#httpmethods)
    - [http.STATUS_CODES](#httpstatus_codes)
    - [http.createServer([requestListener])](#httpcreateserverrequestlistener)
    - [http.get(options[, callback])](#httpgetoptions-callback)
    - [http.globalAgent](#httpglobalagent)
    - [http.request(options[, callback])](#httprequestoptions-callback)

<!-- /TOC -->

# http

## http.Agent类

## http.ClientRequest类

## http.Server类

继承 **`[net.Server]`**

### 事件

- `checkContinue事件`：
- `checkExpectation事件`：
- `clientError事件`：
- `close事件`：
- `connect事件`：
- `connection事件`：
- `request事件`：
- `upgrade事件`：

### 字段属性

- `server.listening`：
- `server.maxHeadersCount`：
- `server.timeout`：
- `server.keepAliveTimeout`：

### 方法

- `server.colse([callback])`：
- `server.listen()`：
- `server.setTimeout([msecs][, callback])`：

## http.ServerResponse类

## http.IncomingMessage类

该对象实现了**可读流**接口

- aborted事件：当请求已被客户端终止且网络socket已关闭时
- close事件：当底层连接被关闭时触发。同end事件一样，该事件每个响应只触发一次。
- 

## http.METHODS

## http.STATUS_CODES

## http.createServer([requestListener])

## http.get(options[, callback])

## http.globalAgent

## http.request(options[, callback])