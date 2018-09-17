<!-- TOC -->

- [seq](#seq)
    - [概要](#概要)
    - [样例](#样例)

<!-- /TOC -->

# seq

## 概要

- 作用：打印一串数字
- 语法：
    - 打印 `[first, last]` 范围内的数字，步长为 `increment`
    - `seq [option]... last`
    - `seq [option]... first last`
    - `seq [option]... first increment last`
    - 如果first和increment忽略，则默认为 1 。
- 选项参数
    - -f 或 --format=FORMAT
    - -s 或--separator=STRING
        - 使用该STRING去分隔数字列表，默认为`\n`
    - -w 或 --equl-width


## 样例

```sh
# 
seq 3
> 1
> 2
> 3

#
seq 1 0.1 2
> 1.0
> 1.1
> 1.2
> 1.3
> 1.4
> 1.5
> 1.6
> 1.7
> 1.8
> 1.9
> 2.0
```
