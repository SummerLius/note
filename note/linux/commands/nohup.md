# nohup

1. nohup
    - 运行一个命令，并使其名免疫于hangup信号，并使output不输出到终端上
2. 语法
    - nohup COMMAND [ARG] ...
    - nohup OPTION
3. 描述
    - 如果命令的 stdin 是终端，把其重定向到/dev/null
    - 如果命令的 stdout 是终端，把其重定向到 nohup.out 文件，'$HOME/nohup.out'
    - 如果命令的 stderr 是终端，把其重定向到 stdout
    - Note：以nohup执行命令，最好显示的自定义输出文件，例如
        ```sh
        nohup node app.js 1>/dev/null 2>&1

        nohup node app.js 1>/p.log 2>&1
        ```