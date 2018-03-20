# 临时

## 链接

- [google 反垃圾邮件完全手册 pdf](https://books.google.com.hk/books?id=ng3JODtYRVMC&pg=PA6&lpg=PA6&dq=%E5%8F%8D%E5%9E%83%E5%9C%BE%E9%82%AE%E4%BB%B6%E5%AE%8C%E5%85%A8%E6%89%8B%E5%86%8C+pdf&source=bl&ots=2JjgpSVjvS&sig=Ayz__fO6Bkzpvcl_Nkjp4SEKPdU&hl=zh-CN&sa=X&ved=0ahUKEwi3ksurwObZAhVIGZQKHVmACKgQ6AEIJjAA#v=onepage&q=%E5%8F%8D%E5%9E%83%E5%9C%BE%E9%82%AE%E4%BB%B6%E5%AE%8C%E5%85%A8%E6%89%8B%E5%86%8C%20pdf&f=false)
- [《中国互联网协会反垃圾邮件规范》](http://www.isc.org.cn/hyzl/hyzl/listinfo-15601.html)
- [网易邮箱常见问题](http://feedback.mail.163.com/FeedBack/feedback.do?method=index#)
- [百度百科：反垃圾邮件网关](https://baike.baidu.com/item/%E5%8F%8D%E5%9E%83%E5%9C%BE%E9%82%AE%E4%BB%B6%E7%BD%91%E5%85%B3/6749971?fr=aladdin)
- []()
- []()
- []()
- []()
- []()
- RBL查询网址
    - https://www.dnsbl.info/dnsbl-list.php
    - https://whatismyipaddress.com/blacklist-check
    - https://www.whatismyip.com/blacklist-check/
    - https://mxtoolbox.com/blacklists.aspx
    - [150个黑名单列表，及如何从黑名单中删除被列入黑名单的邮件服务器？](https://www.emailcamel.org/node/107)
    - [青羽科技](http://www.check-rbl.com/)
    - https://www.rblmon.com/subscription/
    - https://rblwatcher.com/
    - [趋势科技](https://www.ers.trendmicro.com/)

其它
- http://support.huawei.com/huaweiconnect/enterprise/zh/thread-294455.html
- http://blog.csdn.net/u011628250/article/details/73526390
- http://www.ruanyifeng.com/blog/2016/06/dns.html
- [邮件黑名单处理](http://blog.51cto.com/liaoen/872455)

rfc
- https://www.rfc-editor.org/rfc-index.html
- https://tools.ietf.org/rfc/index
- https://tools.ietf.org/html/rfc6471

## 查询黑名单

黑名单有许多中类型：
    - 公开的组织：像spamhaus、等
    - 系统服务商、企业自己的黑名单等：像趋势科技等

1. [spamhaus]()
    - dnsbl地址：
        1. sbl.spamhaus.org.cn
        2. xbl.spamhaus.org.cn
        3. pbl.spamhaus.org.cn
        4. dbl.spamhaus.org.cn
        5. zen.spamhaus.org.cn (sbl/xbl/pbl)
    - 在特定的情况下免费：
        1. 对spamhaus dnsbl的使用是非商业的
        2. 电子邮件流量，每天少于10 0000个smtp连接
        3. 每天的dnsbl的查询量，每天少于30 0000次查询
2. [anti-spam.org.cn]()
    - dnsbl地址：
        1. cbl.anti-spam.org.cn
        2. cdl.anti-spam.org.cn
        3. cblplus.anti-spam.org.cn
        4. cblless.anti-spam.org.cn
    ```
    名称	地址	测试地址	返回状态码
    CBL	    cbl.anti-spam.org.cn	2.0.0.127.cbl.anti-spam.org.cn.	127.0.8.2
    CDL	    cdl.anti-spam.org.cn	0.0.0.240.cdl.anti-spam.org.cn.	127.0.8.4
    CBL+	cblplus.anti-spam.org.cn	2.0.0.127.cblplus.anti-spam.org.cn.	127.0.8.6
    CBL-	cblless.anti-spam.org.cn	2.0.0.127.cblless.anti-spam.org.cn.	127.0.8.5
    ```
3. 趋势科技
    - dnsbl地址：具体地址有待确定，不知道有没有提供
        1. rbl
        2. dul
        3. qil
        - 保持疑问的地址：
            - rbl-plus.mail-abuse.org
            - dialups.mail-abuse.org
            - 尚不确定，有点研究
    - http请求地址
        1. https://www.ers.trendmicro.com/reputations/index?ip_address=127.0.0.2
        2. http://www.mail-abuse.com/cgi-bin/lookup?ip_address=121.201.116.215
        3. https://www.ers.trendmicro.com/guide/en_us/AG/Intro/Step1_determineip.htm#XREF_50235_Determine_Your_IP
4. [spamcop](https://www.spamcop.net)
    - dnsbl地址：
        1. bl.spamcop.net
    - help：
        - https://www.spamcop.net/fom-serve/cache/351.html
    ```
    nslookup 2.0.0.127.bl.spamcop.net
    ```
5. 待续...

