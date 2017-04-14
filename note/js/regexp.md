# Javacript 所支持的正则表达式

ECMAScript通过RegExp类型支持正则


## 创建正则表达式

- 字面量，可使用类似Perl语法创建
- RegExp构造函数

```javascript
var pattern1 = /pattern/flags;
var pattern2 = new RegExp("pattern", "flags");
var pattern3 = new RegExp(/pattern/flags, "flags");// es6后支持
```

note：传递给RegExp构造函数的两个参数都是字符串(**es6中，构造函数能直接传字面量**)，不能将正则表达式字面量pattern传递给RegExp构造函数。参数中的所有元字符都必须双重转义，在字面量模式的基础上对应转义：

| 字面量模式        | 等价的字符串           |
| :--:             | :--:                  |
| /\[bc\]at/       | "\\[bc\\]at"          |
| /\w\\hello\\123/ | "\\w\\\\hello\\\\123" |

需要转义的元字符有：
`{ } ( ) [ ] | \ ^ $ ? * + .`

> ECMAScript3中，字面量会共享同一个RegExp实例，而构造函数每次都是创建新实例  
> ECMAScript5重新规定，字面量须和构造函数一样，每次都创建新实例


模式flags可选值：
- `g`：global，全局模式，即pattern应用所有字符串，不会在发现第一个匹配项时停止
- `i`：ignoreCase，不区分大小写
- `m`：multiline，多行模式，将开始和结束字符（^和$）视为在多行上工作（例如，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。
- `u`：Unicode，将pattern视为Unicode编码点序列
- `y`：sticky，仅匹配目标字符串中此RegExpObj.lastIndex属性指示的索引

## RegExp 实例属性

每个RegExp均具有下列属性：
- global：布尔值，表示是否设置了g标志
- ignoreCase：布尔值，表示是否设置i标志
- multiline：布尔值，表示是否设置了m标志
- unicode：布尔值，表示是否设置了u标志
- sticky：布尔值，表示是否设置了y标志
- lastIndex：表示开始搜索下一个匹配项的字符位置，从0算起
- source：正则表达式字符串表示，source保存规范形式的字符串，即字面量形式所用的字符串。即使是RegExp构造函数实例，其source也会转换为字面量规范字符串

## RegExp 实例方法

[实例方法](http://devdocs.io/javascript-regexp/)

### exec

`regexpObj.exec(str)`  

如果成功匹配，则返回一个数组，并更新正则表达式对象的属性。返回的数组具有匹配的文本作为第一项，然后匹配的每个捕获括号的一个项包含捕获的文本。  

如果是匹配失败，返回null

```javascript
let regexpObj = /quick\s(brown).+?(jumps)/ig;

let result = regexpObj.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```

| 对象 | 属性/索引 | 描述 | 例子 |
| :--: | :--: | :--: | :--: |
| result | [0] | 匹配的字符串 | Quick Brown Fox Jumps |
|  |[1], ...[n] | 圆括号中的分组捕获 | [1] = Brown, [2] = Jumps|
|  | index | 匹配到的字符串与原字符串的索引值 | 4 |
|  | input | 原字符串 | The ... Dog |
| regexpOjb | lastIndex | 下一次匹配开始的索引位置 | 25 |
|  | ignoreCase | ... | true |
|  | global | ... | true |
|  | multiline | ... | false |
|  | source | 正则模式字符串 | quick\s(brown).+?(jumps) |

**Note**：`g` 标记对方法exec的影响？

```javascript
// re.lastIndex=0
var re = /a/i;

// ret1.index=1, re.lastIndex=2
var ret1 = re.exec('-a-a-');

// ret2.index=3, re.lastIndex=4
var ret2 = re.exec('-a-a-');

// ret3=null, re.lastIndex=0, 匹配失败则lastIndex重置为0
var ret3 = re.exec('-a-a-');


// reG.lastIndex=0
var reG = /a/gi;

// retG1.index=1, reG.lastIndex=0
var retG1 = reG.exec('-a-a-');
```

**Note**：对于复用RegExp实例，来进行正则匹配的时候，要注意RegExp实例lastIndex的值的变化；若每次都直接使用RegExp字面量来正则匹配，则不用考虑这样的问题了，因为字面量es5后就不共享实例了，即会创建新实例，每个新实例的lastIndex均为0。

### test

`regexpObj.test(str)`  

若只想知道一个pattern是否存在于一个字符串中，就可以使用test()方法，返回true或false。
 

## RegExp 构造函数属性

RegExp 构造函数包含一些属性，这些属性在其它语言中看作静态属性。这些属性使用于作用域中的所有正则表达式，并且**基于所执行最近一次正则表达式操作而变化**。

详细暂略...

## 模式局限性

![limit](../../assets/regexp_pattern_limit.png)