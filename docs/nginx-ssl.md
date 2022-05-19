---
categories:
  - server
  - nginx
titleSlug: nginx-ssl
title: Nginx SSL配置
thumbnail: ''
series: Nginx
description: 暂无
wip: true
top: false
---

# Nginx SSL配置

## 证书生成

通常开发过程中我们比较常用的证书生成方式是使用**Openssl**, 下面以生成证书名称为 `demo` 为例进行操作

1. 生成私钥

   ```bash
   openssl genrsa -out demo.key 1024
   ```

2. 生成证书申请文件csr

   ```bash
   openssl req -new -key demo.key -out server.csr
   # 然后根据步骤指引进行填写
   # 当填写 Common Name的时候需要写自己网站的域名
   ```

3. 使用私钥(.key)对证书申请文件(.csr)签名生成证书(.crt)

   ```bash
   openssl ca -in server.csr -out demo.crt -cert demo.crt -keyfile demo.key
   ```

如果需要pem格式的证书则可以执行下面命令

```bash
cat demo.crt demo.key > demo.pem
```

## Nginx配置

可以在原有nginx server配置上进行修改, 也可以另起一个server配置

```
server {
		# 使用同一端口
    listen       8099 ssl;

		# 使用不同端口
		# listen       8099;
		# listen       8199 ssl;

		# 加入我们上一步生成的证书及私钥文件地址
		ssl_certificate             /etc/ssl/certs/pano.crt;
    ssl_certificate_key         /etc/ssl/private/pano.key;

    location / {
        root   html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```
