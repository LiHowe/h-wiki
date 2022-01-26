---
categories:
  - server
titleSlug: docker
title: Docker基础
series: Docker
thumbnail: ''
description: 暂无
wip: true
top: false
---

# Docker基础

## 开始使用

### 配置镜像加速器

[镜像加速器 - Docker —— 从入门到实践 (gitbook.io)](https://yeasy.gitbook.io/docker_practice/install/mirror)

- [网易云加速器 `https://hub-mirror.c.163.com`](https://www.163yun.com/help/documents/56918246390157312)
- [百度云加速器 `https://mirror.baidubce.com`](https://cloud.baidu.com/doc/CCE/s/Yjxppt74z#%E4%BD%BF%E7%94%A8dockerhub%E5%8A%A0%E9%80%9F%E5%99%A8)
- 七牛云加速器：[https://reg-mirror.qiniu.com](https://reg-mirror.qiniu.com/)
- 科大镜像：[https://docker.mirrors.ustc.edu.cn/](https://docker.mirrors.ustc.edu.cn/)

### 镜像

- 搜索镜像
  
    `docker search [option] keyword`
    
    以`nginx`为例 
    
    执行 `docker search nginx` 命令后, 会展示出以`nginx`为搜索关键词的所有镜像 
    
    ![https://i.loli.net/2021/07/16/rz416jda9w2iPNo.png](https://i.loli.net/2021/07/16/rz416jda9w2iPNo.png)
    
    如果只想获取官方镜像的话可以加上`option` : `docker search --filter=is-official=true nginx`
    
- 获取镜像
  
    `ducker [image] pull NAME[:TAG]`
    
    还是以`nginx`为例, 执行 `docker pull nginx`, docker默认会拉取最新版本(latest)
    
    ![https://i.loli.net/2021/07/16/psBg14ZLT2AvDKY.png](https://i.loli.net/2021/07/16/psBg14ZLT2AvDKY.png)
    
- 查看镜像
  
    可以使用 `docker image ls` 或者 `docker images` 来查看以及拉取的镜像列表
    
    ![https://i.loli.net/2021/07/16/Zi5oTe7bFrjXctR.png](https://i.loli.net/2021/07/16/Zi5oTe7bFrjXctR.png)
    
    字段解释:
    
    - REPOSITORY: 表明镜像来源仓库
    - TAG: 镜像标签, 标签只是标记, 并不能标识镜像内容(因为可以人为打TAG)
    - IMAGE ID: 镜像ID, 如果两个镜像ID相同, 则表明它们是不同TAG的同一镜像
- 为镜像添加标签(Tag)
  
    使用 `docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]` 来为目标镜像添加标签
    
    ![https://i.loli.net/2021/07/16/1Qwh2vLA3iSoOUN.png](https://i.loli.net/2021/07/16/1Qwh2vLA3iSoOUN.png)
    
- 删除镜像
  
    默认情况下, 有对应容器(container)运行的镜像无法删除, 如果需要强制删除则需要添加`-f` option
    
    - 使用标签删除
      
        `docker image rm [OPTIONS] IMAGE [IMAGE...]`
        
        或者 `docker rmi IMAGE:TAG`
        
        比如删掉我们刚刚打tag的node镜像(实际上是删掉了tag)
        
        ![https://i.loli.net/2021/07/16/bPkt9vu1ezM5h36.png](https://i.loli.net/2021/07/16/bPkt9vu1ezM5h36.png)
        
        当删除镜像只剩下一个标签的时候执行删除命令则会**彻底删除镜像**
        
    - 使用镜像ID删除
      
        `docker rmi IMAGEID`
    
- 清理镜像
  
    使用 `docker image prune [OPTIONS]` 来删除未使用的镜像
    
    OPTIONS包含
    
    - `-a` : 删除所有无用文件, 不仅仅是临时镜像
    - `-f` : 不提示确认
    - `--filter` : 只清理符合过滤条件的镜像
    
    ![https://i.loli.net/2021/07/16/gxbr3Vc9nqGWw1z.png](https://i.loli.net/2021/07/16/gxbr3Vc9nqGWw1z.png)
    
- 创建镜像
  
    比较常用的方式是使用`Dockerfile`来进行镜像创建
    
- 将镜像打包成文件
  
    `docker save -o <filename.tar> <image>` 

### 容器

- 查看正在运行的容器
  
    `docker ps`
    
- 运行容器:
  
    `docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]`
    
    - Options
        - `-d`: 后台运行
        - `-p`:指定端口
        - `--rm`: 容器停止后自动删除容器文件
        - `--name`: 设置容器名称

## 常用使用场景

[发布前端项目](Docker%2097ea4f183f1849df8513cd93f230dfa5/%E5%8F%91%E5%B8%83%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%209405e71ceb3d485f873f833758affd0f.md)

[部署Node项目](Docker%2097ea4f183f1849df8513cd93f230dfa5/%E9%83%A8%E7%BD%B2Node%E9%A1%B9%E7%9B%AE%207f021a2712b149bf9f71bc4aae33e92b.md)

## 参考资料

Docker 技术入门与实战／杨保华， 戴王剑， 曹亚仑编著 —3 版 —北京：机械工业出版

[Docker教程](https://yeasy.gitbook.io/docker_practice/)