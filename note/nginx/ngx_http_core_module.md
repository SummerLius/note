## location

**Syntax**
- location [= | ~ | \~\* | \^\~] uri {...} 
- location @name {...}

**Default**
- 无

**Context**
- server
- location

**Desc**

设置URI方面的配置。  

在URI匹配之前会将URI转换为标准格式，即对"%xx"形式解码，将多个相邻的斜杠"//"转换成"/"一个等。  

location配置的uri可以为一个表示请求uri前缀的字符串，或者是一个正则表达式。正则表达式必须指定前缀修饰符`~*`(不区分大小写)或`~`(区分大小写)。

匹配规则：
1. 开始
2. 检查所有前缀字符串类型，并选中匹配前缀最长的location
    - 若匹配到的最长前缀带有`^~`修饰符，则跳到步骤5
    - 带有修饰符`=`表示精确匹配模式，若http请求匹配到这样的location则跳到步骤5(精确模式的location里面显然不能再内嵌location)。
3. 然后检查正则表达式类型，按照配置文件中的先后顺序，若匹配到则终止后续寻找。
4. 若正则没有匹配，则使用步骤2结果
5. 选中，结束  

特殊location：
- `location @name {}`：这样的location不出常规的http请求，而是用于请求重定位
- 如果location是前缀字符串类型和以斜杠/结尾，而且请求被指令[proxy_pass](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)，[fastcgi_pass](http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_pass)，[uwsgi_pass](http://nginx.org/en/docs/http/ngx_http_uwsgi_module.html#uwsgi_pass)，[scgi_pass](http://nginx.org/en/docs/http/ngx_http_scgi_module.html#scgi_pass)，[memcached_pass](http://nginx.org/en/docs/http/ngx_http_memcached_module.html#memcached_pass)处理，则request被这些指令特殊处理。在这种情况下：

```nginx
# 在第二种特殊情况下，有两种情况

# 末尾为斜杠/ 
# 若request的uri为/user，则流程如下
#   1. nginx 直接响应请求，设置statusCode为301，设置响应头部信息
#      headers.location=host/user/(uri末尾补上斜杠/)
#   2. 接受重定位的uri=/user/，proxy_pass指令处理
location /user/ {
    proxy_pass http://user.example.com;
}

# 末尾没有斜杠
#   1. 直接proxy_pass指令处理
location = /user {
    proxy_pass http://user.example.com;
}
```

