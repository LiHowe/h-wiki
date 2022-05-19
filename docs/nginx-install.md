---
categories:
  - server
  - nginx
titleSlug: nginx-install
title: Nginx安装
thumbnail: ''
series: Nginx
description: 暂无
wip: true
top: false
---

# Nginx 安装说明

## Linux环境

1. 前往[官网](http://nginx.org/en/download.html)下载需要nginx安装文件(或者复制下载地址)

   1. 下载到本地然后通过FTP等方式上传到服务器
   2. 在服务器上使用 `wget <http://nginx.org/download/nginx-1.21.1.tar.gz`> 来进行下载

2. 解压安装包

   ```bash
   tar -zxvf nginx-1.21.1.tar.gz
   ```

3. 安装配置

   进入到安装包解压的路径, 然后根据自己需求来配置解压路径以及模块

   - `--prefix=路径` 为配置nginx安装路径
   - `--with-http_ssl_module` : 启用SSL模块(为了HTTPS)
   - `--with-http_v2_module` : 启用HTTP2支持

   ```bash
   ./configure \\
   --prefix=/usr/local/nginx \\
   --with-http_ssl_module \\
   --with-http_v2_module
   ```

4. 编译安装

   ```bash
   make && make install
   ```

5. 启动

   ```bash
   cd ./sbin
   ./nginx
   ```

6. 配置为服务以便开机自启

   ```bash
   vim /etc/init.d/nginx
   chmod a+x /etc/init.d/nginx
   chkconfig -add /etc/init.d/nginx
   chkconfig nginx on
   ```

7. 其他命令

   ```bash
   ./nginx            # 启动
   ./nginx -s stop    # 强制停止（使用kill命令强制杀掉进程）
   ./nginx -s quit    # 停止（处理任务完毕进行停止）
   ./nginx -s reload  # 重新加载（用于nginx.conf 修改后）
   ./nginx -V         # 查看安装配置
   ```