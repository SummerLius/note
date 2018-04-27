<!-- TOC -->

- [ps](#ps)
    - [名称](#名称)
    - [语法](#语法)
    - [描述](#描述)
    - [待整理](#待整理)
    - [链接](#链接)

<!-- /TOC -->

# ps

## 名称

ps - 显示当前进程列表快照

## 语法

ps [options]

## 描述

ps命令可以接受几种不同风格的可选项：
1. UNIX 选项，可以组合，前面必须以破折号（-）开始
2. BSD 选项，可以组合，前面不能使用破折号（-）开始
3. GNU 选项，前面以两个破折号（--）开始

## 待整理

标准格式说明符:
- 下面有许多不同的关键词，用来控制输出格式（使用选项 "-o"），或使用选项 "--sort" 来排序
- 例如：`ps -eo pid,user,args --sort user`
- 以下的一些关键词，可能不一定会支持排序
- 支持的关键字 `CODE`:
    1. `%cpu | pcpu`
        - 页眉: "%CPU"
        - 描述：该进程使用cpu的情况。实际cpu占用的时间/该进程运行的时间，即 cputime/realtime 比例。
    2. `%mem | pmem`
        - 页眉: "%MEM"
        - 描述：该进程驻留内存的大小 / 机器物理内存大小
    3. `args | cmd | command`
        - 页眉: "COMMAND"
        - 描述：显示该进程启动的完整的命令，包括参数。
    4. `blocked | sigmask | sig_block`
    5. `bsdstart`：
        - 页眉"START"
        - 描述：命令执行的时间点
    6. `bsdtime`
        - 页眉"TIME"
        - 描述：
    7. `c`
    8. `caught | sigcatch | sig_catch`
    9. `cgname`
        - 页眉："CGNAME"
        - 描述：显示该进程属于控制组的名字
    10. `cgroup`
        - 页眉："CGROUP"
        - 描述：显示该进程属于的控制组
    11. `class | cls | policy`
    12. `comm | ucmd | ucomm`
        - 页眉："COMMAND"
        - 描述：启动该进程的命令，只显示命令名，不含参数
    13. `cp`
    14. `cputime | time`
    15. `drs`
    16. `gid | egid`
        - 页眉：EGID
        - 描述：有效用户组ID
    17. `group | egroup`
        - 页眉：EGROUP
        - 描述：
    18. `eip`
    19. `esp`
    20. `etime`
    21. `etimes`
    22. `euid | uid`
        - 页眉：EUID
        - 描述：有效用户ID
    23. `euser | uname | user`
        - 页眉：EUSER
        - 描述：有效用户名
    24. `f | flag | flags`
    25. `fgid`
    26. `fgroup`
    27. `fname`
    28. `fuid`
    29. `fuser`
    30. `ignored | sigignore | sig_ignore`
    31. `ipcns`
    32. `label`
    33. `lstart`
    34. `lsession`
    35. `lwp | spid`
    36. `lxc`
    37. `machine`
    38. `maj_flt`
    39. `min_flt`
    40. `mntns`
    41. `metns`
    42. `ni | nice`
    43. `nlwp`
    44. `numa`
    45. `nwchan`
    46. `ouid`
    47. `pending | sig | sig_pend`
    48. `pgid | pgrd`
    49. `pid | tgid`
    50. `pidns`
    51. `ppid`
    52. `pri`
    53. `psr`
    54. `rgid`
    55. `rgroup`
    56. `rss | rssize | rsz`
    57. `rtprio`
    58. `ruid`
    59. `ruser`
    60. `s`
    61. `sched`
    62. `seat`
    63. `sess | sid | session`
    64. `sgi_p`
    65. `sgid | svgid`
    66. `sgroup`
    67. `size`
    68. `slice`
    69. `stackp`
    70. `start`
    71. `start_time`
    72. `stat`
    73. `state`
    74. `suid | svuid`
    75. `supgid`
    76. `supgrp`
    77. `suser`
    78. `sz`
    79. `tgid`
    80. `thcount`
    81. `tid`
    82. `tty | tt | tname`
    83. `tpgid`
    84. `trs`
    85. `unit`
    86. `userns`
    87. `utsns`
    88. `uunit`
    89. `vsize | vsz`
    90. `wchan`

## 链接

- [man7 ps](http://man7.org/linux/man-pages/man1/ps.1.html)



