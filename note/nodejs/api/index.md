启动node程序指令：

```shell
node [options] [v8 options] [script.js | -e "script"] [arguments]
```

其后的[arguments]参数在程序中可以通过process.argv读取
```shell
node app.js arg1 arg2 arg3
>process.argv => ['/usr/local/bin/node', '/home/app.js', 'argv1', 'argv2', 'argv3']
```
