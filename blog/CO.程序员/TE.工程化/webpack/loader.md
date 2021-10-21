# Webpack Loader

## **loader-utils**

webpack官方提供的loader工具类, 在我们自己写loader的时候可以使用以下方法来便捷地获取loader的一些配置参数, [GitHub地址](https://github.com/webpack/loader-utils)

### **getOptions** : 获取配置

`getOptions(Loader): Object`

在loader内使用， 返回loader配置对象

```
const options = loaderUtils.getOptions(this)

```

例如：

```
module.exports = function() {
    module: {
        rules: [
            {
                test: /\\.js$/,
                use: [{
                    loader: path.resolve('loaders/loader.js'),
                    options: {
                        t: 1
                    }
                }],
            }
        ]
    }
}

```

在 `loader.js` 中调用 `getOptions` 方法返回 `{ t: 1 }`

### **parseQuery** : 将资源请求解析为对象

将loader的 `resourceQuery` 解析为对象

例:

```
const params = loaderUtils.parseQuery(this.resourceQuery); // resource: `file?param1=foo`
if (params.param1 === "foo") {
	// do something
}

```

### **stringifyRequest** : 将模块请求URL转为字符串

`stringifyRequest(Loader, url)`

例:

```
loaderUtils.stringifyRequest(this, "./test.js");
// "\\"./test.js\\""

```

### **utlToRequest** : 将资源URL转为webpack 模块请求

在调用该方法之前需要调用 `isUrlRequest` 来确保参数是可以请求的路径

### **interpolateName** : 按照插值模板生成名称

支持的插值模板列表

- `[ext]` the extension of the resource
- `[name]` the basename of the resource
- `[path]` the path of the resource relative to the `context` query parameter or option.
- `[folder]` the folder the resource is in
- `[query]` the queryof the resource, i.e. `?foo=bar`
- `[emoji]` a random emoji representation of `options.content`
- `[emoji:<length>]` same as above, but with a customizable number of emojis
- `[contenthash]` the hash of `options.content` (Buffer) (by default it's the hex digest of the md4 hash)
- `[<hashType>:contenthash:<digestType>:<length>]` optionally one can configure
    - other `hashType`s, i. e. `sha1`, `md4`, `md5`, `sha256`, `sha512`
    - other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
    - and `length` the length in chars
- `[hash]` the hash of `options.content` (Buffer) (by default it's the hex digest of the md4 hash)
- `[<hashType>:hash:<digestType>:<length>]` optionally one can configure
    - other `hashType`s, i. e. `sha1`, `md4`, `md5`, `sha256`, `sha512`
    - other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
    - and `length` the length in chars
- `[N]` the N-th match obtained from matching the current file name against `options.regExp`

### **getHashDigest** : 生成哈希码

`getHashDigest(buffer, hashType, digestType, maxLength)`

- `buffer` : 需要被哈希的内容
- `hashType` : `sha1`, `md4`, `md5`, `sha256`, `sha512` 其中一个或者任何 `node.js` 支持的哈希类型
- `digestType` : `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64` 其中一个
- `maxLength` : 生成的哈希码的最大长度
