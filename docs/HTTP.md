---
WIP: true
categories:
  - frontend
  - basic
  - Network
titleSlug: http
title: HTTP
series: 网络基础
thumbnail: ''
description: 暂无
wip: true
top: false
---



# HTTP

## 各个版本特性
### HTTP/0.9
诞生于1991年， 是第一个HTTP版本

只支持get请求， 只能响应HTML文本

### HTTP/1.0
诞生于1996年

#### 特性

* 可以发送任何格式的内容
* 请求和响应段增加头部字段
* 增加 `POST` 和 `HEAD` 请求

#### 不足




### HTTP/1.1
诞生于1999年

#### 特性

* 持久连接
  浏览器对于同一个域名， 最多允许同时建立6个TCP持久连接

  解决方案: 多个静态资源CDN域名

* 管线化技术

* 支持响应分块
  会将响应数据分为多个chunk， 每个chunk会附带上一个chunk的数据长度，最后传输一个0长度的chunk来标识请求结束

* 增加Host头

* 增加`Cache-Control` 和 `E-Tag` 缓存头

* 增加`PUT` 、`PATCH` 、`HEAD` 、`OPTIONS` 、`DELETE` 请求方式

#### 不足



### HTTP/2.0

#### 特性

* 多路复用：
  因为是基于二进制传输的，引入了`流`机制， 浏览器针对同一域名的资源只建立一个TCP通道，这条通道可以同时处理多个请求，解决了HTTP1.1的队头阻塞

  将一个HTTP请求划分为三个部分

  * 帧： 一段二进制数据， 是HTTP/2传输的最小单位
  * 消息：一个请求或响应对应的一个或多个帧
  * 数据流：已建立的连接内的双向字节流， 可以承载一条或多条消息

* 头部压缩: 采用二进制传输, 使用HPACK算法进行压缩
   * 客户端与服务器端维护一份相同的静态字典, 通过索引传输
   * 维护一份相同的动态字典, 可以动态添加内容
   * 通过静态[Huffman编码](https://zh.wikipedia.org/wiki/%E9%9C%8D%E5%A4%AB%E6%9B%BC%E7%BC%96%E7%A0%81)对头部字段进行编码
   
* 服务器端推送

* 请求优先级

* 流量控制

* 重置消息

* 二进制分帧层

#### 不足

+ 浏览器必须使用SSL/TLS才能支持HTTP/2 (HTTPS)



 ![](https://i.loli.net/2021/11/23/Kksvi7Sc2jlHfN4.jpg)



![](https://i.loli.net/2021/11/23/8E7ZJqs9LoQv2Bk.jpg )





## 相关知识

+ [TCP](./TCP.md)

