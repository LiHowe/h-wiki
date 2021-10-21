---
category: code
layout: blog
title: egg教程
date: 06/10-2021 10:29
coverImage: https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png
tags:
  - Node.js
  - BackEnd
  - Egg.js
  - Tutorials
description: egg的简单使用
stick: false
wip: true

---

## 起步

### 1. 初始化项目

```bash
mkdir egg-example && cd egg-example
npm init egg --type=simple
npm i
npm run dev
open <http://localhost:7001>
```

### 2. 添加ORM框架

https://eggjs.org/zh-cn/tutorials/sequelize.html

1. 安装`egg-sequelize`插件与`mysql2`

   ```bash
   npm install egg-sequelize mysql2 -S2. 
   ```

2. 引用插件,  `config/plugin.js`

   ```js
   module.exports = {
     sequelize: {
       enable: true,
       package: 'egg-sequelize',
     },
   };
   ```

3. 编写sequelize配置, `config/config.default.js`

   ```js
   module.exports = appInfo => {
     // config等默认配置...
   
     config.sequelize = {
       dialect: 'mysql', // 数据库类型
       host: '你的数据库地址',
       port: 3306,
       user: 'root',
       password: 'pwd',
       database: '需要连接的数据库名称',
     };
   
     return {
       ...config,
       ...userConfig,
     };
   };
   ```

4. 初始化数据库和Migrations

   + 方式1: 手动创建表结构

   ```sql
   CREATE TABLE `users` (
     `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
     `name` varchar(30) DEFAULT NULL COMMENT 'user name',
     `age` int(11) DEFAULT NULL COMMENT 'user age',
     `created_at` datetime DEFAULT NULL COMMENT 'created time',
     `updated_at` datetime DEFAULT NULL COMMENT 'updated time',
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='user';
   ```

   + 方式2: 使用`sequelize-cli`创建表结构

   	1. 安装 `sequelize-cli`

       ```bash
       npm install sequelize-cli -D
       ```

   	2. 在**项目根目录**创建配置文件(`.sequelizerc`)， 用来放置数据库Migrations相关内容

     ```text
     'use strict';
     
     const path = require('path');
     
     module.exports = {
       config: path.join(__dirname, 'database/config.json'),
       'migrations-path': path.join(__dirname, 'database/migrations'),
       'seeders-path': path.join(__dirname, 'database/seeders'),
       'models-path': path.join(__dirname, 'app/model'),
     };
     ```

   	3. 初始化 Migrations 配置文件和目录. 下面命令会自动生成`database/config.json`和`database/migrations`

     ```bash
     npx sequelize init:config
     npx sequelize init:migrations
     ```

   	4. 修改数据库连接配置 `database/config.json`

   	5. 创建表配置文件, 命令会在 `database/migrations` 下生成 `${timestamp}-init-users.js` 文件

       ```bash
       npx sequelize migration:generate --name=init-users
       ```

   	6. 根据自身需求修改生成的表配置文件`${timestamp}-init-users.js`

       ```jsx
       'use strict';
       
       module.exports = {
         // 在执行数据库升级时调用的函数，创建 users 表
         up: async (queryInterface, Sequelize) => {
           const { INTEGER, DATE, STRING } = Sequelize;
           await queryInterface.createTable('users', {
             id: { type: INTEGER, primaryKey: true, autoIncrement: true },
             name: STRING(30),
             age: INTEGER,
             created_at: DATE,
             updated_at: DATE,
           });
         },
         // 在执行数据库降级时调用的函数，删除 users 表
         down: async queryInterface => {
           await queryInterface.dropTable('users');
         },
       };
       ```

   	7. 执行 migrate 进行数据库变更

     ```bash
     # 升级数据库
     npx sequelize db:migrate
     # 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
     # npx sequelize db:migrate:undo
     # 可以通过 `db:migrate:undo:all` 回退到初始状态
     # npx sequelize db:migrate:undo:all
     ```

   


