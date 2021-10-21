---
category: code
layout: blog
title: egg-sequelize介绍
date: 06/10-2021 10:29
coverImage: https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png
tags:
  - Node.js
  - BackEnd
  - Egg.js
  - DB
  - Sequelize
description: egg-sequelize的简单使用
stick: false

---

## 简介

- **Egg-sequelize是啥?**

  为egg封装的[Sequelize](https://sequelize.org/)

- **Sequelize是啥?**

  Node.js的ORM工具

+ **ORM是啥意思**

  Object Relational Mapping 的缩写，译为“对象关系映射”框架

- **都支持啥数据库?**

  共支持5种数据库: Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server.

- **官网介绍:**

  [🔗 GitHub仓库](https://github.com/eggjs/egg-sequelize)

  Sequelize 是一个基于 promise 的 Node.js ORM 工具, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能



## 使用(以mysql为例)

### 安装

```shell
npm i --save egg-sequelize mysql2
# or
yarn add --save egg-sequelize mysql2
```



