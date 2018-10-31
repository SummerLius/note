<!-- TOC -->

- [npm-bin](#npm-bin)
- [npm-cache](#npm-cache)
- [npm-config](#npm-config)
- [npm-docs](#npm-docs)
- [npm-help](#npm-help)
- [npm-init](#npm-init)
- [npm-install-test](#npm-install-test)
- [npm-install](#npm-install)
- [npm-ls](#npm-ls)
- [npm-prefix](#npm-prefix)
- [npm-prune](#npm-prune)
- [npm-repo](#npm-repo)
- [npm-restart](#npm-restart)
- [npm-root](#npm-root)
- [npm-run-script](#npm-run-script)
- [npm-search](#npm-search)
- [npm-start](#npm-start)
- [npm-stop](#npm-stop)
- [npm-test](#npm-test)
- [npm-uninstall](#npm-uninstall)
- [npm-update](#npm-update)
- [npm-view](#npm-view)

<!-- /TOC -->

## npm-bin

```sh
npm bin [-g|--global]
```

- 显示npm的bin目录

## npm-cache

```sh
npm cache add <tarball file>
npm cache add <folder>
npm cache add <tarball url>
npm cache add <name>@<version>

npm cache clean [<path>]
aliases: npm cache clear, npm cache rm

npm cache verify
```

- 

## npm-config

已处理

## npm-docs

```sh
npm docs [<pkgname> [<pkgname> ...]]
npm docs .
npm home [<pkgname> [<pkgname> ...]]
npm home .
```

- 此command会尝试定位指定的package的说明文档URL
- 猜测好像会优先读取package.json中"homepage"字段，具体逻辑不详，有待测试
- 这个指令不错

## npm-help

```sh
npm help <term> [<terms..>]
```

- 主要提供npm相关命令、主题的帮助说明文档，很实用
- 在Windows上以浏览器打开，在Posix上以Man手册打开
- 例如：
    - `npm help index`：进入帮助文档首页
    - `npm help install`：查看npm install命令

## npm-init

```sh
npm init [-f|--force|-y|--yes]
```

- 生成一个package.json文件

## npm-install-test














## npm-install

```sh
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
```

- 该命令会根据package.json中依赖列表，来安装依赖包，如果存在 `package-lock` 或 `shrinkwrap` 文件，则安装依赖包的过程会由该文件控制。 
- 参数：
    1. `folder`：一个目录，里面含有用package.json文件描述的程序
    2. `tarball file`：一个压缩的tar包，里面含有1
    3. 一个指向2的URL
    4. `<name>@<version>`：指向发布在npm仓库中的一个包，表现为一个URL，3
    5. `<name>@<tag>`：同4，仓库的某个tag
    6. `<name>`：仅指定名字时，默认指定 `latest` tag
    7. `<git remote url>`：指向1

详述：
- **`npm install`**（不指定任何参数）
    - 寻找package.json文件或node_modules目录，根据package.json文件安装依赖包
    - 如果执行该命令的当前目录不含有package.json文件或node_modules目录，则会沿着父目录往上寻找，如果在哪个祖先目录寻找到，则会在那个目录安装依赖包，即相当于在那个目录执行 `npm install .`，没找到则报错
    - 默认下，"dependencies" 和 "devDependencies" 下的列表都会安装
    - 指定 `--production` 参数或当前环境变量为 `NODE_ENV=production`，那么仅会安装  "dependencies" 下的依赖
- **`npm install <folder>`** 
    - 指定的folder必须含有package.json，否则报错
    - 假如目录结构为：`/a/b/c/`
        1. （父目录文件，子目录执行）当package.json在 a 目录下，然后在 c 目录下执行：`npm intall ../../`，其效果等同于在 c 目录下执行： `npm install`，等同于在 a 目录下执行：`npm install .`
        2. （子目录文件，父目录执行）当package.json在 c 目录下，然后在 a 目录下执行：`npm install b/c/`，这样好像不会执行成功，会报错（有待继续测试...）
- **`npm install <tarball file>`**
    - npm可以识别tar文件，直接安装
    ```sh
    wget http://registry.npm.taobao.org/express/download/express-4.16.2.tgz
    
    # 下载到文件到本地目录
    > express-4.16.2.taz

    # 此时可以直接npm安装
    npm install express-4.16.2.taz
    ```
- **`npm install <tarball url>`**
    - 同上，只是npm会先下载该tarball文件，然后在安装tarball文件
    - `npm install http://registry.npm.taobao.org/express/download/express-4.16.2.tgz`
- **`npm install [<@scope>]<name>[@<tag>|<version>|<version range>]`**
    - 直接指定package name，然后npm会到配置中的registry地址去检索到tarball文件，然后下载下来安装
    - 可以指定 tag 或 version 来获取同一package的不同版本
    - 安装位置：
        1. 若当前目录有package.json文件或node_moduels目录，则会安装到当前目录下
        2. 若1不成立，则会往父目录上一次寻找，若找到哪个目录有package.json文件或node_modules目录，则安装到那个目录
        3. 若2过程，沿着父目录至根目录都没有找到，则只能安装在执行命令的当前目录下，新建node_modules目录
    - 默认下，npm指定安装的package会记录写入当前package.json文件的**"dependencies"**字段内容中，你可以指定参数来改变
        1. `-P, --save-prod`：--> dependencies，这是默认
        2. `-D, --save-dev`： --> devDependencies
        3. `-O, --save-optional`：--> optionalDependencies
        4. `--no-save`：阻止写入 --> dependencies
        5. `-E, --save-exact`：写入package的精确版本，而不是默认semver版本范围
        6. `-B, --save--bundle`：--> bundleDependencies
    - 如果安装的目录下存在，`npm-shrinkwrap.json` 或 `package-lock.json`文件，那么该文件也会更新
- **`npm install <git remote url>`**
- **`npm install <githubname>/<githubrepo>[#<commit-ish>]`**
- **`npm install github:<githubname>/<githubrepo>[#<commit-ish>]`**
- **`npm install gist:[<githubname>/]<gistID>[#<commit-ish>|#semver:<semver>]`**
- **`npm install bitbucket:<bitbucketname>/<bitbucketrepo>[#<commit-ish>]`**
- **`npm install gitlab:<gitlabname>/<gitlabrepo>[#<commit-ish>]`**

部分参数：
- `-f, --force`：即使本地存在，还是强制npm从远程下载
- `-g, --global`：将package安装到全局目录下，详细参考npm-folder
- `--tag`：
- `--dry-run`：
- `--global-style`：
- `--ignore-scripts`：
- `--link`：
- `--no-bin-links`：
- `--no-optional`：
- `--no-shrinkwrap`：
- `--no-package-lock`：
- `--nodedir=/path/to/node/source`：
- `--only={prod|dev}`：















## npm-ls

## npm-prefix

```sh
npm prefix [-g]
```

- 打印显示prefix，相关联可以查看 `npm-config`

## npm-prune

```sh
npm prune [[<@scope>/]<pkg>...] [--production]
```

- 该命令会移除没有使用的package，即没有列在父package的dependencies列表中的包
- 如果指定了package name，则仅会删除该包
- 若指定了`--production`选项或当前存在环境变量`NODE_ENV=production`，那么该命令会移除devDependencies所有包。
- 如果想要忽略环境变量`NODE_ENV=production`，那么可以强制指定：`--production=false`

## npm-repo

```sh
npm repo [<pkg>]
```

- 在浏览器中打开package的仓库地址URL

## npm-restart

```sh
npm restart [-- <args>]
```

- 该命令会运行 "stop、restart、start" 脚本，同时还有相关的脚本：pre- 或 post- 脚本，其顺序为：
1. prerestart
2. prestop
3. stop
4. poststop
5. restart
6. prestart
7. start
8. poststart
9. postrestart
10. 其中的pre-和post-脚本不需要指定执行，会伴随着start、stop、restart脚本的执行而自动执行

## npm-root

```sh
npm root [-g]
```

- 打印显示npm root路径

## npm-run-script

```sh
npm run-script <command> [--silent] [-- <args>...]

alias: npm run
```

- 此命令可以运行任意指定的脚本，如果没有指定任何脚本，即 `npm run`，则会列出可以执行的脚本
- 该命令还可以使用 `--` 符号来传递参数给你指定的脚本，例如 `npm run test -- --grep="pattern"` ，npm会将 `--` 符号后面的参数给脚本，前面的参数给npm本身
- ...

## npm-search

## npm-start

```sh
npm start [-- <args>]
```

- 运行package.json中指定了"start"脚本
- 如果没有指定"start"脚本，那么它会默认执行：`node server.js`

## npm-stop

```sh
npm stop [-- <args>]
```

- 运行package.json中指定了"test"脚本

## npm-test

```sh
  npm test [-- <args>]

  aliases: t, tst
```

- 运行package.json中指定了"test"脚本

## npm-uninstall

```sh
npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional|--no-save]

aliases: remove, rm, r, un, unlink
```

- `-g, --global`：
- `-S, --save`：默认，package信息也会同时从 dependencies 字段内容中移除
- `-D, --save-dev`：package信息同时也会从 devDependencies 字段内容中移除
- `-O, --save-optional`：package信息同时也会从 optionalDependencies 字段内容中移除
- `--no-save`：package信息不会从package.json中移除

位置：
1. 只要当前目录下有package.json文件或node_modules目录，则该命令仅在当前目录处理，不会删除、修改其它父、子目录的文件
2. 若当前目录没有相关文件，则沿着父目录依次冒泡寻找，若有找到，则在那个目录处理

## npm-update

## npm-view
