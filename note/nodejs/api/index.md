# Nodejs API 文档

## 列表

记录于2018.07.11：
- [] About these Docs
- [] Usage & Example
- [] Assertion Testing
- [实验] Async Hooks
- [] Buffer
- [] C++ Addons
- [] C/C++ Addons-N-API
- [] Child Processes
- [] Cluster
- [] Command Line Options
- [] Console
- [] Crypto
- [] Debugger
- [] Deprecated APIs
- [] DNS
- [] Domain
- [] ECMAScript Modules
- [] Errors
- [] Events
- [] File System
- [] Globals
- [] HTTP
- [] HTTP/2
- [] HTTPS
- [] Inspector
- [] Internationalization
- [] Modules
- [] Net
- [] OS
- [] Path
- [] performance Hooks
- [] Process
- [] Punycode
- [] Query Strings
- [] Readline
- [] REPL
- [] Stream
- [] String Decoder
- [] Timers
- [] TLS/SSL
- [] Tracing
- [] TTY
- [] UDP/Datagram
- [] URL
- [] Utilities
- [] V8
- [] VM
- [] ZLIB


## 其他

启动node程序指令：

```shell
node [options] [v8 options] [script.js | -e "script"] [arguments]
```

其后的[arguments]参数在程序中可以通过process.argv读取
```shell
node app.js arg1 arg2 arg3
>process.argv => ['/usr/local/bin/node', '/home/app.js', 'argv1', 'argv2', 'argv3']
```
