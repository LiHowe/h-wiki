---
title: Husky基本使用
date: '06/13-2021 18:46'
coverImage: 'https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png'
tags:
  - Tutorials
  - Git
  - Tool
description: 暂无
series: 工程化
stick: false
wip: true
categories:
  - frontend
  - architecture
titleSlug: husky
thumbnail: ''
top: false
---

# 🐶 Husky基本使用

### 介绍

Husky (哈士奇) 主要是用来规范git提交信息、运行测试、规范代码等, 支持[全部的git钩子](https://git-scm.com/docs/githooks)。 在日常项目中使用主要是用来规范团队中每个人提交的代码，可以用来防止编写不规范的代码被commit、push或merge

### 使用

1. 安装

   ```shell
   npx husky-init && npm install       # npm
   npx husky-init && yarn              # Yarn 1
   yarn dlx husky-init --yarn2 && yarn # Yarn 2
   ```

2. 创建初始化脚本

   ```shell
   npm set-script prepare "husky install"
   ```

   > 也可以直接修改 `package.json`, 在 `scripts` 中添加 `"prepare": "husky install"`

3. 运行初始化脚本

   ```shell
   npm run prepare
   ```

   运行该命令后, husky会在你当前运行命令的文件夹下生成一个 `.husky` 的文件夹

4. 添加所需的Git钩子, 比如 `pre-commit`



## 相关链接

- [Husky官网](https://typicode.github.io/husky/#/)
