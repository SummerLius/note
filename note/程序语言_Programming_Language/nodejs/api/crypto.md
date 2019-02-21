<!-- TOC -->

- [Crypto 加密](#crypto-加密)
    - [概要](#概要)
    - [检测是否支持crypto](#检测是否支持crypto)
    - [Certificate 类](#certificate-类)
    - [Cipher 类](#cipher-类)
        - [crypto.createCipheriv(algorithm, key, iv[, options])](#cryptocreatecipherivalgorithm-key-iv-options)
        - [cipher.final([outputEncoding])](#cipherfinaloutputencoding)
        - [cipher.setAAD(buffer[, options])](#ciphersetaadbuffer-options)
        - [cipher.getAuthTag()](#ciphergetauthtag)
        - [cipher.setAutoPadding([autoPadding])](#ciphersetautopaddingautopadding)
        - [cipher.update(data[, inputEncoding][, outputEncoding])](#cipherupdatedata-inputencoding-outputencoding)
    - [Decipher 类](#decipher-类)
        - [crypto.createDecipheriv(algorithm, key, iv[, options])](#cryptocreatedecipherivalgorithm-key-iv-options)
        - [decipher.final([outputEncoding])](#decipherfinaloutputencoding)
        - [decipher.setAAD(buffer[, options])](#deciphersetaadbuffer-options)
        - [decipher.setAuthTag(buffer)](#deciphersetauthtagbuffer)
        - [decipher.setAutoPadding([autoPadding])](#deciphersetautopaddingautopadding)
        - [decipher.update(data[, inputEncoding][, outputEncoding])](#decipherupdatedata-inputencoding-outputencoding)
    - [DiffieHellman 类](#diffiehellman-类)
    - [ECDH 类](#ecdh-类)
    - [Hash 类](#hash-类)
        - [crypto.getHashes()](#cryptogethashes)
        - [crypto.createHash(algorithm[, options])](#cryptocreatehashalgorithm-options)
        - [hash.update(data[, inputEncoding])](#hashupdatedata-inputencoding)
        - [hash.digest([encoding])](#hashdigestencoding)
    - [Sign 类](#sign-类)
        - [crypto.createSign(algorithm[, options])](#cryptocreatesignalgorithm-options)
        - [sign.update(data[, inputEncoding])](#signupdatedata-inputencoding)
        - [sign.sign(privateKey[, outputEncoding])](#signsignprivatekey-outputencoding)
    - [Verify 类](#verify-类)
        - [crypto.createVerify(algorithm[, options])](#cryptocreateverifyalgorithm-options)
        - [verify.update(data[, inputEncoding])](#verifyupdatedata-inputencoding)
        - [verify.verify(object, signature[, signatureEncoding])](#verifyverifyobject-signature-signatureencoding)
    - [crypto 模块的方法和属性](#crypto-模块的方法和属性)
        - [crypto.getCiphers()](#cryptogetciphers)
        - [crypto.generateKeyPair(type, options, callback)](#cryptogeneratekeypairtype-options-callback)
        - [crypto.generateKeyPairSync(type, options)](#cryptogeneratekeypairsynctype-options)
        - [crypto.privateEncrypt(privateKey, buffer)](#cryptoprivateencryptprivatekey-buffer)
        - [crypto.privateDecrypt(privateKey, buffer)](#cryptoprivatedecryptprivatekey-buffer)
        - [crypto.publicEncrypt(key, buffer)](#cryptopublicencryptkey-buffer)
        - [crypto.publicDecrypt(key, buffer)](#cryptopublicdecryptkey-buffer)
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
- 该类可以用以下两种方法：
    - 作为流（Stream）；
    - 使用 cipher.update() 和 cipher.final() 方法产生加密的数据；
- Cipher实例对象由 crypto.createCipheriv() 方法创建，不能由 new 关键字创建；
- 示例：
    - 使用流（stream）
        ```js
        const crypto = require('crypto');
        const cipher = crypto.createCipher('aes192', 'a password');
        
        let encrypted = '';
        cipher.on('readable', () => {
          const data = cipher.read();
          if (data)
            encrypted += data.toString('hex');
        });
        cipher.on('end', () => {
          console.log(encrypted);
          // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
        });
        
        cipher.write('some clear text data');
        cipher.end();
        ```
    - 使用管道流（pipe）
        ```js
        const crypto = require('crypto');
        const fs = require('fs');
        const cipher = crypto.createCipher('aes192', 'a password');
        
        const input = fs.createReadStream('test.js');
        const output = fs.createWriteStream('test.enc');
        
        input.pipe(cipher).pipe(output);
        ```
    - 使用 cipher.update() 和 cipher.final() 方法
        ```js
        const crypto = require('crypto');
        const cipher = crypto.createCipher('aes192', 'a password');
        
        let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log(encrypted);
        // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
        ```

### crypto.createCipheriv(algorithm, key, iv[, options])

```js
/**
 * @description
 * 
 * @param {String} algorithm 
 * @param {String|Buffer|TypedArray|DataView} key 
 * @param {String|Buffer|TypedArray|DataView} iv 初始化向量（initialization vector, iv）
 * @param {Object} options stream.transform options
 * @returns {Cipher}
 */
crypto.createCipheriv(algorithm, key, iv[, options])
```
- 创建并返回一个 Cipher 实例对象;
- 参数options
    - 该参数可以控制流（stream）行为；
    - 该参数是可选的，除非密码cipher是CCM或OCB模式（例如，'aes-128-ccm'），这样options参数必须；
        - 在CCM或OCB模式下，必须指定 options.authTagLength，该选项指定了authentication tag的字节长度；
        - 在GCM模式下，options.authTagLength可选，若指定则也会设置authentication tag的字节长度，默认长度为16字节，authentication tag可以通过方法 cipher.getAuthTag() 返回；
- 参数algorithm
    - 该参数依赖于OpenSSL
    - 查看OpenSSL支持的可用的加密算法
        - 新版本：`openssl list -cipher-algorithms`
        - 旧版本：`openssl list-cipher-algorithms`
- 参数key是给参数algorithm使用的原始密钥，参数iv是[初始化向量](https://en.wikipedia.org/wiki/Initialization_vector)；
    - 这个两个参数的值可以是utf8编码的字符串、Buffer、TypedArray或DataView；
    - 如果cipher不需要初始化向量，那么参数iv可以为空null；
    
### cipher.final([outputEncoding])

```js
/**
 * @description
 * 
 * @param {String} [outputEncoding]
 * @returns {String}
 */
cipher.final([outputEncoding])
```
- 返回所有加密的内容；
- 参数outputEncoding如果指定，则返回String，否则返回Buffer；
- 一旦cipher.final()方法被调用，cipher对象便不能继续使用，否则报错；

### cipher.setAAD(buffer[, options])
### cipher.getAuthTag()
### cipher.setAutoPadding([autoPadding])
### cipher.update(data[, inputEncoding][, outputEncoding])

```js
/**
 * @description
 * 
 * @param {String|Buffer|TypedArray|DataView} data
 * @param {String} inputEncoding
 * @param {String} outputEncoding
 * @returns {String|Buffer}
 */
cipher.update(data[, inputEncoding][, outputEncoding])
```
- 若data为字符串类型Stirng，则可以通过参数inputEncoding指定该字符串编码方式；
- 参数outputEncoding指定了加密数据的输出格式，若指定该参数，那么返回使用指定编码的字符串，否则返回Buffer；
- cipher.update() 方法可以用新数据多次调用，直到 cipher.final() 被调用；

## Decipher 类

- Decipher类的实例用于解密数据；

### crypto.createDecipheriv(algorithm, key, iv[, options])
### decipher.final([outputEncoding])
### decipher.setAAD(buffer[, options])
### decipher.setAuthTag(buffer)
### decipher.setAutoPadding([autoPadding])
### decipher.update(data[, inputEncoding][, outputEncoding])

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
 */
crypto.createHash(algorithm[, options])
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
 */
hash.update(data[, inputEncoding])
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
 */
hash.digest([encoding])
```
- 计算摘要；
- 如果指定了参数encoding，那么返回String类型，否则返回Buffer类型；
- hash对象在 hash.digest() 方法调用之后不能再次被使用，多次的调用会引发错误并抛出；

## Sign 类

- Sign 类是生成签名的实用工具；
    - 签名流程：先对指定内容hash，然后再用私钥加密；
- 它有两种使用方式：
    - 作为一个stream使用；
    - 使用 sign.update() 和 sign.sign() 方法产生签名；
- Sign 实例由 crypto.createSign() 创建，不能使用 new 关键字创建；
- 示例：
    - Sign 实例对象作为流（Stream）
        ```js
        const crypto = require('crypto');
        const sign = crypto.createSign('SHA256');
        
        sign.write('some data to sign');
        sign.end();
        
        const privateKey = getPrivateKeySomehow();
        console.log(sign.sign(privateKey, 'hex'));
        // Prints: the calculated signature using the specified private key and
        // SHA-256. For RSA keys, the algorithm is RSASSA-PKCS1-v1_5 (see padding
        // parameter below for RSASSA-PSS). For EC keys, the algorithm is ECDSA.
        ```
    - 使用 sign.update() 和 sign.sign() 方法
        ```js
        const crypto = require('crypto');
        const sign = crypto.createSign('SHA256');
        
        sign.update('some data to sign');
        
        const privateKey = getPrivateKeySomehow();
        console.log(sign.sign(privateKey, 'hex'));
        // Prints: the calculated signature
        ```
- 

### crypto.createSign(algorithm[, options])

```js
/**
 * @description
 * 
 * @param {String} algorithm 
 * @param {Object} options stream.Writable options 
 * @returns {Sign}
 */
crypto.createSign(algorithm[, options])
```
- 创建并返回一个 Sign 实例对象；
- 参数algorithm的可选值，可以通过 crypto.getHashes() 查看可用的签名算法；
- 参数options可以控制 stream.Writable 的行为；

### sign.update(data[, inputEncoding])

```js
/**
 * @description
 * 
 * @param {String|Buffer|TypedArray|DataView} data 
 * @param {String} inputEncoding 当参数data为String类型时，该参数指定编码
 * @returns {Sign}
 */
sign.update(data[, inputEncoding])
```
- 根据参数data更新 Sign 实例对象内容
- 当参数data为String类型时，参数inputEncoding可以指定编码类型，默认为utf8；
- 如果data是Buffer、TypedArray、DataView类型时，inputEncoding会被忽略；

### sign.sign(privateKey[, outputEncoding])

```js
/**
 * @description
 * 
 * @param {String|Object} privateKey 
 * @param {String} privateKey.key
 * @param {String} privateKey.passphrase
 * @param {Integer} privateKey.padding
 * @param {Integer} privateKey.saltLength
 * @param {String} outputEncoding 指定返回内容的编码方式
 * @returns {Buffer|String}
 */ 
sign.sign(privateKey[, outputEncoding])
```
- 该方法生成最后的签名，即对哈希过的内容进行最后签名；
- 参数 privateKey 类型可以是Object或String
    - 如果类型为String，那么参数privateKey被看做不带passphrase的原始密码（raw key）；
    - 如果类型为Object，那么参数privateKey对象必须含有以下一个或多个属性：
        - `key`：PEM编码的私钥，必选
        - `passphrase`：为私钥设置passphrase
        - `padding`：
        - `saltLength`：
- 如果指定了返回内容的编码方式 outputEncoding，那么返回字符串类型String，否则返回Buffer类型；
- 当 sign.sign() 方法调用后，Sign实例对象便不能再使用；多次调用 sign.sign() 会抛错；

## Verify 类

- Verify 类服是验证签名的工具；
- 它有两种方式使用：
    - 作为流（Stream）使用；
    - 使用 verify.update() 和 verify.verify() 方法来验证签名；
- Verify 实例对象仅能由 crypto.createVerify() 方法创建，不能使用 new 关键字创建；
- 示例：
    - 作为流（stream）验证
        ```js
        const crypto = require('crypto');
        const verify = crypto.createVerify('SHA256');
        
        verify.write('some data to sign');
        verify.end();
        
        const publicKey = getPublicKeySomehow();
        const signature = getSignatureToVerify();
        console.log(verify.verify(publicKey, signature));
        // Prints: true or false
        ```
    - 使用 verify.update() 和 verify.verify() 方法验证
        ```js
        const crypto = require('crypto');
        const verify = crypto.createVerify('SHA256');
        
        verify.update('some data to sign');
        
        const publicKey = getPublicKeySomehow();
        const signature = getSignatureToVerify();
        console.log(verify.verify(publicKey, signature));
        // Prints: true or false
        ```

### crypto.createVerify(algorithm[, options])

```js
/**
 * @description
 * 
 * @param {String} algorithm 
 * @param {Object} options stream.Writable options 
 * @returns {Verify}
 */
crypto.createVerify(algorithm[, options])
```
- 创建并返回一个 Verify 的实例对象；
- 参数algorithm可以通过 crypto.getHashes() 获取可用的算法；
- 参数options可用来控制 stream.Writable 行为；


### verify.update(data[, inputEncoding])

```js
/**
 * @description
 * 
 * @param {String|Buffer|TypedArray|DataView} data 
 * @param {String} inputEncoding 若参数data类型为String，则该参数指定data编码 
 * @returns {Verify}
 */
verify.update(data[, inputEncoding])
```

### verify.verify(object, signature[, signatureEncoding])

```js
/**
 * @description
 * 
 * @param {String|Object} object
 * @param {String} object.key
 * @param {Integer} object.padding
 * @param {Integer} object.saltLength
 * @param {String|Buffer|TypedArray|DataView} signature
 * @param {String} signatureEncoding 若signature类型为String，则该参数指定编码 
 * @returns {Boolean} 
 */
verify.verify(object, signature[, signatureEncoding])
```
- 参数object类型可以是String或Object
    - 若为String类型，则该字符串是包含PEM编码的对象，可以是RSA公钥、DSA公钥或X.509证书；
    - 若为Object类型，则具有以下一个或多个属性
        - `key`：PEM编码的公钥（必选）
        - `padding`：
        - `saltLength`：
- 参数signature是签名内容，若参数为String类型，则第三个参数可以指定编码方法，否则忽略第三个参数；
- 方法 verify.verify() 执行之后，verify对象便不能继续使用，否则报错；

## crypto 模块的方法和属性

### crypto.getCiphers()

- 获取支持的加密算法列表
- 返回一个字符串数组 `<string[]>`
- 示例
    ```js
    const ciphers = crypto.getCiphers();
    console.log(ciphers); // ['aes-128-cbc', 'aes-128-ccm', ...]
    ```

### crypto.generateKeyPair(type, options, callback)
### crypto.generateKeyPairSync(type, options)
### crypto.privateEncrypt(privateKey, buffer)
### crypto.privateDecrypt(privateKey, buffer)
### crypto.publicEncrypt(key, buffer)
### crypto.publicDecrypt(key, buffer)


## 注意事项

## crypto常量
