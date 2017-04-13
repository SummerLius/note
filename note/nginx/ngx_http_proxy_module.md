# HTTP 代理模块

## proxy_pass

**Syntax**
- `proxy_pass URL` 

**Default**
- 无

**Context**
- location
- if in location
- limit_except

**Desc**

设置代理服务器的协议和地址，可选择性添加URI。
- 协议：http和https。
- 地址：域名或ip地址，端口号可选择性添加

> 例如(protocol+domain+uri)：proxy_pass http://localhost:8000/uri/;  

若域名解析到若干ip地址，则以轮询方式请求他们。此外，地址可以通过[server group](http://nginx.org/en/docs/http/ngx_http_upstream_module.html)指定  

URI传递转换规则如下：
- 若 *proxy_pass* 指定了URI，当nginx来了一个请求，则请求的URI和 *location* 指令匹配的部分会被 *proxy_pass*的URI替换，如下
```nginx
# 假设nginx来了请求：/name/supermen
# 传递到代理服务器为：/remote/supermen
#
# 匹配location的部分会被替换掉
location /name/ {
    proxy_pass http://127.0.0.1:3000/remote/;
}
```
- 若 *proxy_pass* 没有指定URI，则nginx将客户端URI原封不动传递给代理服务器

```nginx
# 假设nginx来了请求：/name/supermen
# 传递到代理服务器为：/name/supermen
#
# URI原封不动传递
location /name/ {
    proxy_pass http://127.0.0.1:3000;
}
```  

某些情况下，请求URI被替换的部分是不确定的：
- 当 `location` 是正则表达式类型，`proxy_pass` 不能指定URI部分
- When the URI is changed inside a proxied location using the rewrite directive, and this same configuration will be used to process a request (break).In this case, the URI specified in the directive is ignored and the full changed request URI is passed to the server.

```nginx
location /name/ {
    rewrite    /name/([^/]+) /users?name=$1 break;
    proxy_pass http://127.0.0.1;
}
```
- A server name, its port and the passed URI can also be specified using variables.In this case, the server name is searched among the described server groups, and, if not found, is determined using a resolver.

```nginx
proxy_pass http://$host$uri;
# or even like this:
proxy_pass $request;
```


