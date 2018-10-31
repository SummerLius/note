# npm-scripts

## 概述

npm支持使用package.json中的“scripts”字段来指定脚本：
- `republish`：
- `prepare`：
- `prepublishOnly`：
- `prepack`：
- `postpack`：
- `publish`, `postpublish`：
- `preinstall`：在此包安装之前执行该脚本
- `install`, `postinstall`：在此包安装之后执行该脚本
- `preuninstall`, `uninstall`：在此包卸载之前执行该脚本
- `postuninstall`：在此包卸载之后执行该脚本
- `preversion`：
- `version`：
- `postversion`：
- `pretest`, `test`, `posttest`：使用 `npm test` 命令执行该脚本
- `prestop`, `stop`, `poststop`：使用 `npm stop` 命令执行该脚本
- `prestart`, `start`, `poststart`：使用 `npm start` 命令执行该脚本
- `prerestart`, `restart`, `postrestart`：使用 `npm restart` 命令执行该脚本。如果执行了该命令，但是在package.json中没有指定restart脚本，那么npm会执行stop和start脚本
- `preshrinkwrap`, `shrinkwrap`, `postshrinkwrap`：

此外，任意的脚本名，可以通过命令 `npm run-script <command> [-- <args>...]` 来执行。

## 环境

### path

### package.json vars

如果使用npm启动package.json指定的脚本，那么npm会给该进程添加一些环境变量：
- 以`npm_package_`为前缀的package.json所有键值对

### configuration

如果使用npm启动package.json指定的脚本，那么npm会给该进程添加一些环境变量：
- 以`npm_config_`为前缀的npm 所有配置键值对

### special: package.json "config" object

package.json中的"config"字段作用有些特殊。


假如"config"字段值如下：
```json
{
    "name": "my-project",
    "config": {
        "port": "8088"
    }
}
```

1. 如上面所说，package.json所有字段，会以 `npm_package_` 开头，全部添加到脚本进程环境变量中。
2. 此时环境变量中：`npm_package_config_port: "8088"`
3. 如果npm配置信息中含有键值对为：`my-project:port: 9999`，那么其会覆盖package.json中的"config"。
4. npm配置中的key名需要固定格式为：**`<name>[@version]:<key>`**，指定package的名字和"config"对象内的key名
5. 最终的环境变量中的结果为：`npm_package_config_port: "9999"`

> NOTE: 感觉产生覆盖的几率不高，用的不多

### current lifecycle event

```
npm_lifecycle_event: start
npm_lifecycle_script: node app.js
```

## 样例

## 退出

脚本的执行是作为参数传给`sh`程序去执行，如果脚本退出且退出码不为0，那么该进程也会退出。

注意脚本文件不必非得是Nodejs或js代码，它们对于系统来说，只要是可执行文件即可。

## 钩子脚本

- node_modules/.hooks/{eventname}

## 最佳实践

- 脚本代码不要以非0码退出，除非你明确知道后果
- 不要使用脚本去做npm本身就能为你做的事。可以详细查看package.json各个字段，去了解你可以指定或开启的功能等。
- 先检查环境变量env，再决定文件的存放。
- 不要在脚本中直接指定"sudo"，应该让用户实时处理
- 不要使用"install"。你应该永远都不应该指定"preinstall"和"install"脚本，除非你了解后果。