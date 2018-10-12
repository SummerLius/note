# HTTP 重写模块

*ngx_http_rewrite_module* 主要利用 *PCRE* 正则表达式来改变请求URI，然后返回重定向，并且选择相应的配置。

此模块的指令按下面的步骤执行：
- 在 *[server](http://nginx.org/en/docs/http/ngx_http_core_module.html#server)* 里面的此模块的指令按顺序执行
- 重复流程：
    - 请求URI匹配到nginx下一个[*location*]()
    - 匹配*location*下的*rewrite*模块指令顺序执行
    - 若请求URI被[重写*rewritten*]()，则此流程重复，但不超过10次

## break

>**Syntax**：`break`  
>**Default**：无  
>**Context**：`server`，`location`，`if` 

**Desc**

停止当前*ngx_http_rewrite_module*指令集的执行。

如果*location*内部指定了一个指令，*location*里面的request继续执行。（TM，这句话啥意思，黑人？？？）

例如：
```nginx
if ($slow) {
    limit_rate 10k;
    break;
}
```

## if

>**Syntax**：`if (condition) {...}`  
>**Default**：无  
>**Context**：`server`，`location`

**Desc**  

*if* 指令里面的条件会被计算，若结果为true，则括号里面的指令集会被执行，请求会被赋予 *if* 指令里面的配置，而    *if* 指令里面的配置继承于上一级的配置。

*if* 指令的条件表达式可为如下情况：
- 一个变量名。若变量值为空字符串或"0"，则为false
- 字符串变量的比较，使用 "=" 和 "!=" 操作符
- 匹配一个正则表达式，使用 "~" (区分大小写) 和 "~*" (不区分大小写)操作符。
 

## rewrite 

>**Syntax**：`rewrite regex [flag]`  
>**Default**：无  
>**Context**：`server`，`location`，`if`  