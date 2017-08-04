# html

# css

## 字体

### font-family

字体成比例啥意思？  

例如i和m，显然这两个字符本身大小、宽度不同，若实际显示占宽随本身比例那么就是成比例，若占宽都一样则不成比例即等宽。  


字体有几个通用分类：
- serif：衬线体，宽度成比例，上下有短线
- sans-sefif：非衬线体，宽度成比例，没有上下短线
- monospace：等宽体，宽度不成比例，即等宽
- cursive：手写体
- fantasy：“特立独行幻想”体，无法归纳到某一种类别

使用：  
```css
body {
    font-family: Times, 'New York', serif;
}
```

特性：
- 可继承
- 可指定多个字体，最前优先级越高，依次从用户电脑中寻找是否安装了指定字体
- 引号在'New York'这类多个单词的字体名使用
- 通用字体最好放在最后
- 通用字体不要使用引号，用户代理会被认为你指定了一个和通用字体同名的具体字体，不会认作通用字体

更加优雅(使用用户电脑没有的字体)：
- @font-face,[mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)
- google font

google font（提供了一些api可以查看）
```html
<!--1-->
<link type="text/css" href="http://fonts.googleapis.com/css?family=Condiment">

<!--2-->
@import url(http://fonts.googleapis.com/css?family=Condiment);

<!--3-->
javascript脚本引入

<!--引入后就能直接使用-->
<style>
    body {
        font-family: Condiment,serif;
    }
</style>

```