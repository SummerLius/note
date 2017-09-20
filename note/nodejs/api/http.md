
## net

### net.Server类

- `close事件`：当server关闭时触发。注意如果connections存在，知道所有connections结束后才会触发该事件
- `connection事件`：当一个新的connection建立时触发。
- `error事件`：当错误出现时触发。不同于net.Socket，close事件不会在这个事件后继续触发，除非server.close()手动调用
- `listening事件`：当服务调用server.listen()绑定时触发

## http

### http.Server类

继承**net.Server**

- `checkContinue事件`：
- `checkExpectation事件`：
- `clientError事件`：
- `close事件`：
- `connect事件`：
- `connection事件`：
- `request事件`：
- `upgrade事件`：

### http.IncomingMessage

该对象实现了**可读流**接口

- aborted事件：当请求已被客户端终止且网络socket已关闭时
- close事件：当底层连接被关闭时触发。同end事件一样，该事件每个响应只触发一次。
- 