
## Linux进程相关


### 工作管理shell与job

工作管理（job control）是shell拥有的一项功能。能让我们在一个shell下同时执行多项任务，例如同时复制文件、数据搜寻、编译文件等任务。

shell进程是一个前端进程，用于给用户使用Linux，与Linux进行交互。但是shell默认下，一次只能执行一个任务，而且这个任务会占用shell的终端界面，导致不能交互，只能等任务执行完毕。所以提供了job功能，来同时执行多个任务。

job将shell中任务的执行环境分为foreground和background。因为一个shell，只有一个终端界面，故foreground只能执行一个任务，而background可以同时执行多个任务。需要注意，只有通过终端界面才能进行交互，所以background下的任务无法进进行交互。而且放入background下的任务无法使用ctrl+c终止。

> shell下job管理注意点：
> - 各自的shell管理各自job
> - 前台，foreground：用户可以交互的环境
> - 后台，background：可以运行多个任务，用户无法使用ctrl+c终止，可以使用bg/fg控制任务
> - background运行的任务不能等待terminal/shell的输入，即也还是不能交互

shell只能管理自己的job而不能管理其它shell的job，即使你是root权限的shell也不能将其它shell下的job拿过来运行。


- jobs
- bg/&
- fg

### foreground

shell下执行命令，启动程序默认是foreground环境下。

### background

想要以background执行命令，则需要在命令语句后添加字符 `&`。

运行在background下的job虽然不能交互，即不接受stdin，但是会将stdout、stderr输出到前端显示。这样不会影响foreground下进程的交互，当时也会影响显示。所以，如果background下job如果有stdout、stderr输出的话，可以重定向到其它文件，不影响foreground环境，例如`cp xx yy 1>log.txt 2>&1 &`


> jobs命令
> - -l：列出background下所有job
> - -r：仅列出正在background下run的job
> - -s：仅列出正在background下stop的job

```sh

```
