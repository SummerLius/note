## 常见操作符

### `==` `!=`
在比较均会先**转换操作数**(强制转换)

转换规则如下：
- 如果有一个为boolean值,先转换为数值false->0,true->1
- 如果一个string一个number, 先把string转换为number在比较
- 如果一个Object另一个不是,调用Object的valueOf()得到基本类型再比较
    - 比较规则如下：
    - null与undefined相等
    - 比较之前,不能将null undefined转换成其它值(即undefined ==0为false,null == 0为false)
    - 只要存在NaN, ==比较为false, !=比较为true
    - 如果都是Object,比较是否指向同一个对象

### `===` `!==`

除了在比较之前**不转换操作数**,其他和相等操作一样(即若类型不同直接为false,undefined 与 null 不全等,类型不同)

undefined == null        //true  
undefined === null       //false  
undefined == 0           //false  
null      == 0           //false  
undefined === undefined  //true  
null === null            //true  


### `&&` `||` `!`

 基本的逻辑和其它语言一样,不同的是 "返回值",不一定返回boolean值

`!`：可应用于EcmaScript任何值,会将操作数先转换为一个boolean值,再求反  
- 规则如下：
- 调用Boolean()转换函数再求反
- 返回值为Boolean类型

`&&`：可应用任何类型,操作数不为boolean类型,返回值也不一定为boolean类型
- 规则如下：
- 内部比较的时候,是Boolean()转换后判断
- undefined/null/0/NaN/''，这5种情况都为false, 同时都会造成"断路",谁在前面就会返回谁,即使后有语法错误都不检测了
- 在整体结果为true的情况下,返回"最后一个操作数"
- undefined && null && 0 && NaN && '' //返回第一个 undefined
- {P: 1} && {p: 2} && {p: 3} //返回最后一个{p: 3}

`||`：任何类型,返回不一定为boolean类型
- 同样内部比较的时候转换为 Boolean()之后
- 返回true值得第一个操作数, 同时造成后面"短路"
- 全是false值, 返回最后一个操作数
- 0 || '' || undefined || null|| NaN // 返回 NaN


## 位操作符“&”“|”“~”和正码、反码、补码

+ 正码、反码、补码
+ 位操作符：全部都是直接对存储的“补码”进行操作，位操作符限定为32位，所以会将64位数先转换为32位在操作
    - `&`   ： 与
    - `|`   ： 或
    - `~`   ： 非，包括符号位，全部反转。非操作类似于“负值减一”
    - `^`   ： 异或
    - `>>>` ： 无符号右移
    - `>>`  ： 有符号右移
    - `<<`  ： 有符号左移



 + 一般只对于正数或者无符号数应用（不操作负数）：
    - 判断指定位是否为0或1：只需要与上一个此位为1其它位为0的正数即可。例如判断第五位，operatorNum & 16 === 0
    - 给指定位赋值为0：先非后或再非回来。
    - 给指定位赋值为1：直接或。
    - 指定位赋值目的 ：可以利用一个数字的各个二进制位的状态，来表示一个对象的多个属性的状态，例如“一条动态”的是否删除属性、是否有资格进入热门动态属性...


+ 给指定位赋值重点是采用或运算的原因是，一是意义更加清晰，可以用[000001000]指定位为1，其它位为0的数来或运算
操作数；二是可以不影响其它位，用0去或运算其它位，其它位保持不变；三是指定位赋值0或1，第二个操作数都是一样
的，只是位操作流程不一样。

```javascript
let i = 0;            //这是第一个操作数
let j = 0 | 2^3;      //8为第二个操作符，指定i的第四位为1，[1000]
let k = ~((~j)|2^3);  //将第四位重新置为0，第二个操作数8不变，只需要非和或运算
```


+ 为什么不用1去与运算其它位呢？效果不是一样吗？
No！不完全相同，因为用1去使其它位保持不变的话，我们需要指定一个最大的范围数值[...1110111]，这样含义不清晰，
不如[000100]清晰。

## 数据类型

- 基本类型：Undefined
- 基本类型：Null
- 基本类型：Number
- 基本类型：String
- 引用类型：Object  

### Undefined
- 此类型只有一个值undefined, 即 undefined === undefined //true

### Null
- 此类型只有一个值null, 即 null === null //true
- typeof null // object

### Boolean
- ECMAScript中所有类型的值都有与boolean的true和false等价的值,在需要的地方会自动转换为boolean值,例如 if(xx)、tt ? xx : yy 等里面
- 5大false：空字符串、0/NaN、null、undefined
- 转换规则如下
    - Stirng ： 非空字符串-->true  |  ''-->false
    - Number ： 非0数字值,含Infinity-->true  |  0和NaN-->false
    - Object ： 任何对象-->true  |  null-->false
    - Undefined ：N/A -->true  |  undefined-->false


## 函数

