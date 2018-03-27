

## 分层

|OSI reference model| tcp/ip  | five-layer |
|:-:|:-:|:-:|
|Application|Application|Application|
|Presentation|Transport|Transport|
|Session|Network|Network|
|Transport|Interface|Link|
|Network||Physical|
|Link|||
|Physical|||

该目录按照五层协议栈结构。


## 协议的定义与实现

该目录下各个分层的阐述中不涉及具体电路或代码的实现，只是介绍各个协议。


协议的具体的实现可以在各个地方，以Linux服务器为例：

- physical和link层实现在网卡上
- network和tansport实现在操作系统内核处
- application就由我们应用开发者具体调用系统函数实现