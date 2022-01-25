---
wip: true
categories:
  - monorepo
  - architecture
  - frontend
titleSlug: index
title: index
thumbnail: ''
description: 暂无
top: false
---

# MonoRepo <Badge vif="{{ $frontmatter.wip }}" type="tip" text="WIP" vertical="middle" />

## 什么是MonoRepo

即 Mono repository, 在一个仓库下存放多个项目.

在以前(甚至现在)我们习惯于每一个项目对应一个Git仓库, 在我们多个仓库需要互相调用的时候就显得很麻烦.

monorepo的出现使得多个项目在同一目录下, 这样项目间的相互引用就变得很简单了.

通常我们使用`Lerna`来管理monorepo项目

## Lerna

### 使用

我们从搭建一个monorepo项目来一步步了解monorepo

1. 全局安装`Lerna`

```shell
npm install lerna -g
```

2. 初始化项目

```shell
git init
lerna init
```

`lerna`会帮我们生成一个文件夹和两个json文件

+ `📃 package.json`
+ `📃 lerna.json`
+ `📂 package`: 用于存放各个项目



### 常用操作

#### 添加依赖(全部项目)

该命令将会在每个项目下生成对应的`package-lock.json`和`node_modules`

```shell
lerna add package
```

如果不想在每个项目下都生成对应包的文件, 则可以将依赖提升至全局

```shell
lerna add package --hoist
```

这样会在项目根目录下生成`node_modules`和对应的`package-lock.json`文件

#### 升级特定项目下依赖

如果我们想要升级特定项目下特定依赖的版本, 可以使用`--scope=projectName`

```shell
lerna add package@1.0.1 --scope=A
```

#### 将内部项目作为依赖

如果我们想要添加`packages`下其他项目作为依赖, 可以使用下面命令

```shell
lerna add A --scope=B
```

这将会在`B`项目下的`node_modules`下创建`A`项目的软连接(符号链接), 使得`A`的文件对`B`项目完全透明

#### 已有项目初始化

当我们创建好一个monorepo发布后, 其他成员或者在其他机器上同步代码的时候需要进行项目初始化

```shell
lerna bootstrap --hoist
```

#### 查看已有项目列表

```shell
lerna ls
```







## 参考链接

+ [Medium: Monorepos By Example](https://codeburst.io/monorepos-by-example-part-1-3a883b49047e)
