---
categories:
  - os
  - Linux
titleSlug: ''
title: 文件操作
thumbnail: ''
description: 暂无
wip: true
top: false
---
## 传输文件
### 上传
#### 1. 上传本地文件到服务器
```shell
scp /path/filename username@servername:remote_dir
```

#### 2. 上传本地目录到服务器
```shell
scp -r local_dir username@servername:remote_dir
```

### 下载
#### 1. 下载服务器文件到本地
```shell
scp username@servername:/remote_dir/remote_file local_dir
```

#### 2. 下载服务器文件夹到本地
```shell
scp -r username@servername:remote_dir local_dir
```
