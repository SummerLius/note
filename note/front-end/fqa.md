<!-- TOC -->

- [问题集结](#问题集结)
    - [IE兼容判断处理](#ie兼容判断处理)
    - [shortcut icon 和 icon 的区别?](#shortcut-icon-和-icon-的区别)

<!-- /TOC -->

# 问题集结

## IE兼容判断处理

IE对于HTML文档支持这样一种语法：条件注释 `<!--[if lt IE 8]>`xxx`<![endif]-->`

IE会判断版本，如果if判断为true则其中内容`xxx`生效，否则当作注释。

而其它浏览器不会识别这种语法，直接当作注释，所以该代码仅对IE起作用。


```html
<!--[if lt IE 8]>

这里自定义兼容处理，或给出版本过低提示，或引入js脚本兼容处理等等

<div class="low-v-tip">
    版本过低
</div>

<script src="http://xxxx/compat.js" type="text/javascript"></script>

<![endif]-->
```

## shortcut icon 和 icon 的区别?

待整理
