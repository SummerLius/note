<!-- TOC -->

- [Crypto 加密](#crypto-加密)
    - [概要](#概要)
    - [检测是否支持crypto](#检测是否支持crypto)
    - [Certificate 类](#certificate-类)
    - [Cipher 类](#cipher-类)
    - [Decipher 类](#decipher-类)
    - [DiffieHellman 类](#diffiehellman-类)
    - [ECDH 类](#ecdh-类)
    - [Hash 类](#hash-类)
        - [crypto.getHashes()](#cryptogethashes)
        - [crypto.createHash(algorithm[, options])](#cryptocreatehashalgorithm-options)
        - [hash.update(data[, inputEncoding])](#hashupdatedata-inputencoding)
        - [hash.digest([encoding])](#hashdigestencoding)
    - [Sign 类](#sign-类)
    - [Verify 类](#verify-类)
    - [crypto 模块的方法和属性](#crypto-模块的方法和属性)
        - [crypto.getCiphers()](#cryptogetciphers)
    - [注意事项](#注意事项)
    - [crypto常量](#crypto常量)

<!-- /TOC -->

# Crypto 加密

## 概要

- 记录于 Node.js v10.15.1 版本

## 检测是否支持crypto

## Certificate 类
## Cipher 类

- Cipher类的实例用于加密数据；

## Decipher 类

- Decipher类的实例用于解密数据；

## DiffieHellman 类

- DiffieHellman 类是一个用来创建Diffie-Hellman键交换的工具；

## ECDH 类

- ECDH 类是创建椭圆曲线Diffie-Hellman（Elliptic Curve Diffie-Hellman (ECDH)）键交换的实用工具；

## Hash 类

- Hash 类是用于创建数据hash值的工具类；
- 它能用以下方法使用：
    - 使用 `stream`，它既可读又可写；
    - 使用hash.update()和hash.digest()方法产生计算后的hash值；
- hash的实例由 crypto.createHash() 方法创建，不能直接使用 new 关键字创建对象；
- 示例
    - 使用hash对象作为流（stream）
        ```js
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        
        hash.on('readable', () => {
          const data = hash.read();
          if (data) {
            console.log(data.toString('hex'));
            // Prints:
            //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
          }
        });
        
        hash.write('some data to hash');
        hash.end();
        ```
    - 使用管道流（pipe）
        ```js
        const crypto = require('crypto');
        const fs = require('fs');
        const hash = crypto.createHash('sha256');
        
        const input = fs.createReadStream('test.js');
        input.pipe(hash).pipe(process.stdout);
        ```
    - 使用 hash.update() 和 hash.digest()
        ```js
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        
        hash.update('some data to hash');
        console.log(hash.digest('hex'));
        // Prints:
        //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
        ```

### crypto.getHashes()

- 获取支持的hash算法列表
- 返回一个字符串数组 `<string[]>`
- 示例
    ```js
    const hashes = crypto.getHashes();
    console.log(hashes); // ['DSA', 'DSA-SHA', 'DSA-SHA1', 'md5', ...]
    ```

### crypto.createHash(algorithm[, options])

```js
/**
 * @description
 * 
 * @param {String} algorithm 
 * @param {Object} options stream.transform options
 * @returns {Hash}
 * /
```
- 创建并返回一个 Hash 对象，可以用来产生hash摘要，参数algorithm指定算法；
- 参数options可选，用来控制 stream 的行为；
- 参数algorithm依赖于平台上OpenSSL版本支持的可用算法，例如 sha256'、'md5'等；
- 查看OpenSSL支持的摘要算法：
    - 最近版本：`openssl list -digest-algorithms`
    - 老版本：`openssl list-message-digest-algorithms`
- 示例
    ```js
    const filename = process.argv[2];
    const crypto = require('crypto');
    const fs = require('fs');
    
    const hash = crypto.createHash('sha256');
    
    const input = fs.createReadStream(filename);
    input.on('readable', () => {
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        console.log(`${hash.digest('hex')} ${filename}`);
      }
    });
    ```

### hash.update(data[, inputEncoding])

```js
/**
 * @description
 * 
 * @param {String|Buffer|TypedArray|DataView} data 
 * @param {String} inputEncoding 
 * @returns {}
 * /
```
- 根据参数data更新hash的内容；
- 当参数data为String类型时，参数inputEncoding可以指定编码类型，默认为utf8；
- 如果data是Buffer、TypedArray、DataView类型时，inputEncoding会被忽略；

### hash.digest([encoding])

```js
/**
 * @description
 * 
 * @param {String} encoding 
 * @returns {Buffer|String}
 * /
```
- 计算摘要；
- 如果指定了参数encoding，那么返回String类型，否则返回Buffer类型；
- hash对象在 hash.digest() 方法调用之后不能再次被使用，多次的调用会引发错误并抛出；

## Sign 类

- Sign 类是生成签名的实用工具；

## Verify 类

- Verify 类服是验证签名的工具；

## crypto 模块的方法和属性

### crypto.getCiphers()

- 获取支持的加密算法列表
- 返回一个字符串数组 `<string[]>`
- 示例
    ```js
    const ciphers = crypto.getCiphers();
    console.log(ciphers); // ['aes-128-cbc', 'aes-128-ccm', ...]
    ```



## 注意事项

## crypto常量
