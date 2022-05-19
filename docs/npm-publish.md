---
title: 如何发布npm包
tags:
  - Node.js
  - npm
description: 暂无
wip: true
series: Webpack
categories:
  - frontend
  - webpack
titleSlug: npm-publish
top: false
---

# 如何发布npm包

> 前提: 已有项目，已有npm账号

1. 登录到npm

   ```bash
   npm login
   ```

   登录到特定仓库需要添加 `--registry` 参数

   ```bash
   npm login --registry <http://localhost:4873>
   ```

2. 

## 本地发布

### yalc

1. 安装环境

   ```bash
   npm install yalc -g
   ```

2. 发布依赖

   ```bash
   yalc publish
   ```

3. 添加本地依赖

   ```bash
   yalc add local-repo
   ```

4. 更新依赖

   ```bash
   yalc update
   ```

5. 清除依赖

   ```bash
   yalc remove
   # 全部移除
   yalc remove --all
   ```

### verdaccio

1. 安装环境

```bash
npm install --global verdaccio
```

1. 运行`verdaccio`
2. 登录npm:  `npm adduser --registry [<http://localhost:4873/>](<http://localhost:4873/>)`
3. 打开本地 http://localhost:4873/
4. 发布: `npm publish --registry [<http://localhost:4873/>](<http://localhost:4873/>)`
