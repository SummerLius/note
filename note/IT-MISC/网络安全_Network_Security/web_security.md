<!-- TOC -->

- [Web安全](#web安全)
    - [跨站脚本攻击（XSS）](#跨站脚本攻击xss)
        - [XSS 简介](#xss-简介)
        - [XSS 攻击进阶](#xss-攻击进阶)
        - [XSS 的防御](#xss-的防御)
        - [小结](#小结)
    - [参考链接](#参考链接)

<!-- /TOC -->

# Web安全

## 跨站脚本攻击（XSS）

- 此章节按照《白帽子将Web安全》整理

### XSS 简介

- **跨站脚本攻击**，英文名 Cross Site Script，本来缩写CSS，但是为了和层叠样式表（Cascading Style Sheet，CSS）区分开来，所以在安全领域叫做“XSS”。
- 什么是XSS攻击？
    - XSS攻击，通常指黑客通过“HTML注入”篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击。
    - 在一开始，这种攻击的演示案例是跨域的，所以叫做“跨站脚本”。
    - 但是发展到今天，由于JavaScript的强大功能以及网站前端应用的复杂化，是否跨域已经不再重要。但是由于历史原因，XSS这个名字却一直保留下来。
    - XSS长期以来被列为客户端Web安全中的头号大敌。因为XSS破坏力强大，且产生的场景复杂，难以一次性解决。
    - 现在业内达成的共识是：针对各种不同场景产生的XSS，需要区分情景对待。
    - 场景举例：
        - web贴吧网站，用户发帖、评论的内容，可以被其他用户访问网站看到，如果内容含有特殊代码而网站没有做处理，则产生了XSS攻击
            ```js
            // 发帖、评论内容含有一下特殊代码，那么任何用户访问该网站时，会显示alert窗口
            <script>alert('you are foolish!');</script>
            ```
- XSS根据效果的不同分成如下几类：
    1. 反射型
        - 反射型XSS只是简单的把用户输入的数据“发射”给浏览器。也就是说，黑客往往需要诱使用户“点击”一个恶意链接，才能攻击成功。
        - 反射型XSS也叫做“非持久型XSS”（Non-persistent XSS）。
    2. 存储型
        - 存储型XSS会把用户输入的数据“存储”在服务端。
        - 这种XSS具有很强的稳定性。
        - 存储型XSS通常也叫做“持久型XSS”（Persistent XSS），因为从效果上来说，它存在的时间比较长。
    3. DOM Based
        - 实际上，DOM Based XSS从效果上也是反射型XSS，单独划分出来，是因为DOM Based XSS的形成原因比较特别，发现它的安全专家提出了这种类型的XSS。
        - 出于历史原因，也就把它单独作为一个分类了。
        - 通过修改页面的DOM节点形成的XSS，称之为DOM Based XSS。

### XSS 攻击进阶

1. 初探XSS Payload
    - xss Playload：可以劫持cookie
2. 强大的XSS Payload
    - 构造GET和POST请求
    - xss钓鱼（在当前网页下，嵌入html，替换原先的登录html部分，伪造登录窗口，获取用户账号密码）
    - 识别用户浏览器
    - 识别用户安装的软件
    - css history hack
    - 获取用户真实ip地址
3. XSS 攻击平台
    - xss payload如此强大，为了使用方便，有安全研究者将许多功能封装起来，称为xss攻击平台。
    - 这些攻击平台的主要目的是为了演示xss的危害，以及方便渗透测试使用。
    - 下面介绍几个常见的xss攻击平台：
        - Attack API
        - BeEF
        - XSS-Proxy
4. 终极武器：XSS Worm
    - Samy Worm
    - 百度空间蠕虫
5. 调试JavaScript
    - 介绍几个常用的调试JavaScript的工具，以及辅助测试的工具：
        - Firebug
        - IE 8 Developer Tools
        - Fiddler
        - HttpWatch
        - 
6. XSS构造技巧
    - 利用字符编码
    - 绕过长度限制
    - 使用`<base>`标签
    - window.name的妙用
7. 变废为宝：Mission Impossible
    - apache expect header xss
    - anehta的回旋镖
8. 容易被忽视的角落：Flash XSS
9. 真的高枕无忧吗：JavaScript开发框架
    - Dojo
    - YUI
    - jQuery


### XSS 的防御

1. 四两拨千斤：HttpOnly
    - 浏览器将禁止页面的JavaScript访问带有HttpOnly属性的Cookie
2. 输入检查
    - 检查特殊字符，过滤或者编码
3. 输出检查
    - 安全的编码函数
    - 只需一种编码吗
4. 正确的防御XSS
    - 为了更好的设计xss防御方案，需要认清xss产生的本质原因。
    - **xss的本质还是一种“html注入”，用户的数据被当做了html代码的一部分来执行，从而混淆了原本的语义，产生了新的语义。**
    - 如果网站使用了MVC架构，那么xss就发生在view层————在应用拼接变量到hmtl页面时产生。所以在用户提交数据处进行输入检查的方案，其实并不是在真正发生攻击的地方做防御。
    - **想要根治xss问题，可以列出所有xss可能发生的场景，再一一解决。**
        1. 在HTML标签中输出
        2. 在HTMl属性中输出
        3. 在`<script>`标签中输出
        4. 在事件中输出
        5. 在css中输出
        6. 在地址中输出
5. 处理富文本
    - 有些时候，网站需要允许用户提交一些自定义的html代码，称之为“富文本”。
    - 如何区分安全的“富文本”和有攻击性的xss呢？
        - 在处理富文本时，还是要回到“输入检查”的思路上来。
        - “输入检查”的主要问题是，在检查时还不知道变量的输出语境。但是用户提交的“富文本”数据，其语义是完整的html代码，在输出时也不会拼凑到某个标签的属性中。
        - 在过滤富文本时，“事件”应该被严格禁止，因为“富文本”的展示需求里不应该包括“事件”这种动态效果。
        - 而一些危险的标签，比如`<iframe>`、`<script>`、`<base>`、`<form>`等，也是应该被严格禁止的。
        - 在标签的选择上，应该使用白名单，便面使用黑名单。比如，只允许`<a>`、`<img>`、`div`等比较安全的标签存在。
        - “白名单”原则不仅仅用于标签的选择，同样应该用于属性与事件的选择。
        - 在富文本过滤中，处理css也是一件麻烦的事情。如果允许用户自定义css、style，则可能导致xss攻击。因此尽可能禁止用户自定义css与style。
        - 如果一定要允许用户自定义样式，则只能像过滤“富文本”一样过滤“css”。这需要一个 CSS Parser 对样式进行智能分析，检查其中是否包含危险代码。
        - 有一些比较成熟的开源项目，实现了对富文本xss的检查。
            - Anti-Samy是OWASP上的一个开源项目，也是目前最好的XSSFilter。最早它是基于Java，现在已经扩展到.NET等语言。
            - 在PHP中，可以使用另外一个广受好评的开源项目：HTMLPurify
6. 防御DOM Based XSS
    - DOM Based XSS是一种比较特别的XSS漏洞，前文提到的几种防御方法都不太适用，需要特别对待。
    - ...
7. 换个角度看XSS风险

### 小结

## 参考链接

