## API

### Buffer.from(array)

直接传入16进制字节数组

```javascript
// "们" utf8编码后的字节为：e4 bb ac
var buf = Buffer.from([0xe4, 0xbb, 0xac]);
var str = buf.toString('utf8');
console.log(str);// => 们
```

### Buffer.from(arrayBuffer[, byteOffset[, length]])

### Buffer.from(buffer)

### Buffer.from(string[, encoding])

将字字符串转换为Buffer对象，并指定字符串的编码类型

**encoding**含义：不是表示将string以此encoding编码，而是表示当前的string的已经是此编码格式了

```javascript
// 以汉字"们"为例
// "们"的utf8编码为 -> e4 bb ac
// "们" base64处理：
//        1. 得到"们"utf8字节：e4 bb ac
//        2. 将得到的字节按照base64规则处理，得到新的字节
//        3. 新的字节也按照base64解析，例如base64字节值为57对应着字符"5"，与ascii对应不同

Buffer.from('们', 'utf8');// <Buffer e4 bb ac>

Buffer.from('5Lus', 'base64'); //<Buffer e4 bb ac>，可以看出存储在buffer中已解码
```

### Buffer.from(object[, offsetOrEncoding[, length]])

## Buffer结构

Buffer是一个像Array的对象，主要用于操作字节，可以说Buffer是二进制数据。

### 模块结构

Buffer是一个js与C++结合的模块，它将性能部分用C++实现，非性能部分用js实现。

Buffer所占用的内存不是通过V8分配，属于堆外内存。

### Buffer对象

Buffer对象类似于数组，它的元素为16进制的两位数，即0到255的数值。

```javascript
var buf = Buffer.from('们', 'utf8');
console.log(buf);
// => <Buffer e4 bb ac>

// "们" utf8编码后的字节就是 e4 bb ac，buffer直接存储的就是编码后的字节
```

### Buffer内存分配

## Buffer转换

Buffer对象可以与字符串之间相互转换。目前支持的字符串编码类型有：

- 'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- 'utf16le' - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- 'ucs2' - 'utf16le' 的别名。
- 'base64' - Base64 编码。当从字符串创建 Buffer 时，按照 RFC4648 第 5 章的规定，这种编码也将正确地接受“URL 与文件名安全字母表”。
- 'latin1' - 一种把 Buffer 编码成一字节编码的字符串的方式（由 IANA 定义在 RFC1345 第 63 页，用作 Latin-1 补充块与 C0/C1 控制码）。
- 'binary' - 'latin1' 的别名。
- 'hex' - 将每个字节编码为两个十六进制字符。

可见buffer支持的编码类型有限，可以使用第三方包扩展使用更多的编码：
- `iconv-lite`：采用纯Javascript实现，较轻量
- `iconv`：通过C++调用libiconv库完成

```javascript
var iconv = require('iconv-lite');

// Buffer转字符串
var str = iconv.decode(buf, 'gbk');

// 字符串转Buffer
var buf = iconv.encode('马买匹', 'gbk');
```

## Buffer的拼接

```javascript
// 存在隐患的拼接

var fs = require('fs');

var rs = fs.createReadStream('test.md');
var data = '';
rs.on('data', (chunk) => {
    data += chunk;
});
rs.on('end', () => {
    console.log(data);
});
```

```javascript
// 还是存在隐患的拼接

var fs = require('fs');

var rs = fs.createReadStream('test.md');
rs.setEncoding('utf8');

var data = '';
rs.on('data', (chunk) => {
    data += chunk;
});
rs.on('end', () => {
    console.log(data);
});
```

隐患：
- 没有指定setEncoding()时，那么chunk为buffer，直接使用"+"操作符拼接buffer，会进行隐式转换，即 data = data.toString() + chunk.toString()，这样没一小段chunk都执行一次解码，可能会形成乱码
- 指定了setEncoding()时，那么chunk为string，说明buffer内部执行了解码，但这种内部解码也存在局限性，只能处理utf8，base64，utf-16三种编码，所以不能根本上解决问题。

正确处理：
- 好的处理，还是一次性获取完全部的，buffer chunk，然后再将整个buffer解码，这样就不会有乱码的隐患

```javascript
var chunks = [];
var size = 0;

res.on('data', (chunk) => {
    chunks.push(chunk);
    size += chunk.length;
});

res.on('end', () => {
    var buf = Buffer.concat(chunks, size);
    var str = iconv.decode(buf, 'utf8');
    // 或 var str = buf.toString('utf8');
    console.log(str);
});
```

```javascript
```