- [知乎 iframe](https://www.zhihu.com/question/20653055)
    ```
    HTML规范说：The iframe element represents a nested browsing context.
    
    所以如果你需要独立的浏览上下文，那么就用 iframe，否则就不用。
    
    历史上，iframe 常被用于复用部分面， 但是多数情况下并不合适。
    
    现在，应该使用 iframe 的例子如：
    1. 沙箱隔离。
    2. 引用第三方内容。
    3. 独立带有交互的 内容，比如幻灯片。
    4. 需要保持独立焦点和历史管理的子窗口，如复杂的Web应用。
    
    注：登录弹窗用iframe 未必合适。 HTML标准新增了dialog元素，可能更适合。
    
    作者：贺师俊
    链接：https://www.zhihu.com/question/20653055/answer/17786008
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    ```
    ```
    完全隔离的css 和 js , 但又可以使用 contentWindow和parent 来通信. 松耦合又不失灵活
    ```