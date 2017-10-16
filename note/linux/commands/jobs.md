<!-- TOC -->

- [jobs](#jobs)
- [bg](#bg)
- [fg](#fg)

<!-- /TOC -->

<hr>

### jobs

查看当前有多少在后台运行的命令

`jobs [options]`

- -l：列出background下所有job
- -r：仅列出正在background下run的job
- -s：仅列出正在background下stop的job

> `ctrl+z`：可以将一个正在前台执行的命令放到后台，并且暂停

<hr>

### bg

将一个在后台暂停的任务，变成继续执行。如果指定的作业已经在后台运行，bg 命令不起作用并成功退出。如果未提供 JobID 参数，bg 命令会使用最近暂挂的作业。

`bg [options]`

- `%jobID`：jobID
- `%str`：选中以此字符串开头的job，若匹配到多个，则错误提示
- `%?str`：选中包含此字符串的job，若匹配到多个，则错误提示
- `%+`：选中最近的job
- `%%`：选中最近的job
- `%-`：选中第二最近的job

<hr>

### fg

将后台中的命令调至前台继续运行

`fg [options]`

- `%jobID`：jobID
- `%str`：选中以此字符串开头的job，若匹配到多个，则错误提示
- `%?str`：选中包含此字符串的job，若匹配到多个，则错误提示
- `%+`：选中最近的job
- `%%`：选中最近的job
- `%-`：选中第二最近的job

