---
categories:
  - backend
  - nestjs
titleSlug: ''
title: NestJS简单使用
thumbnail: ''
series: NestJS
description: 暂无
wip: true
top: false
---

# NestJS

中文文档: [https://docs.nestjs.cn/8/controllers](https://docs.nestjs.cn/8/controllers)

官网: [https://docs.nestjs.com/controllers](https://docs.nestjs.com/controllers)

感觉写法跟angular有些像， nestjs后台 angular前台感觉是个不错的搭配

学习的时候还能复习一下Angular的写法

## 安装

1. 安装cli并新建项目
   
    ```bash
    $ npm i -g @nestjs/cli
    $ nest new nest-demo
    ```
    
2. 选择喜欢的包管理工具，然后等待安装完成

![Untitled](https://s2.loli.net/2022/01/26/aQhwbixGSjuVfLt.png)

1. 安装完成后的项目结构

启动项目

```bash
yarn start
```

## CLI功能介绍

`<>` 为必须

`[]` 为可选

### 新建项目

命令: `nest n <project-name> [options]`

options选项:

- `-p` : 设置包管理器( `npm` , `yarn` , `pnpm`)

- `-g` : 跳过git仓库初始化

- `-d` : 不更改文件系统（只是告诉你会创建什么文件）
  
    比如 `nest n demo -d`
    

![Untitled 1](https://s2.loli.net/2022/01/26/v635d7snLUyMYxr.png)

- `-s` : 跳过依赖安装
- `-l [language]` : 表明项目开发语言（默认`TS` ，可选`JS`)
- 

## 模块介绍