
## Linux进程相关


### 工作管理shell与job

工作管理（job control）是用在shell拥有的一项功能。能让我们在一个shell下同时执行多项任务，例如同时复制文件、数据搜寻、编译文件等任务。

shell进程是一个前端进程，用于给用户使用Linux，与Linux进行交互。但是shell默认下，一次只能执行一个任务，而且这个任务会占用shell的终端界面，导致不能交互，只能等任务执行完毕。所以提供了job功能，来同时执行多个任务。

job将shell中任务的执行环境分为foreground和background。因为一个shell，只有一个终端界面，故foreground只能执行一个任务，而background可以同时执行多个任务。需要注意，只有通过终端界面才能进行交互，所以background下的任务无法进进行交互。而且放入background下的任务无法使用ctrl+c终止。

> shell下job管理注意点：
> - 
> - 
> - 
> - 
