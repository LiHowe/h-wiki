---
category: code
layout: blog
title: hasky
date: '06/13-2021 18:46'
coverImage: 'https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png'
tags:
  - Tutorials
  - Git
  - Tool
description: 暂无
stick: false
wip: true
categories:
  - frontend
  - architecture
titleSlug: hasky
thumbnail: ''
top: false
---

# 😆 Husky基本使用

### 介绍

Husky (哈士奇) 主要是用来规范git提交信息、运行测试、规范代码等, 支持全部的git钩子。 在日常项目中使用主要是用来规范团队中每个人提交的代码，防止编写不规范的代码被commit、push或merge

### 使用

#### 自动初始化(推荐用法)

进行初始化的项目必须是git项目

使用`husky-init` 来进行项目初始化

```shell
# 使用npm
npx husky-init && npm install

# 使用yarn
npx husky-init && yarn
```

初始化完毕会在项目下生成`.husky`文件夹

<img src="https://i.loli.net/2021/06/20/o8Kh1ugvbrAHlVq.png" alt="image-20210620195835750" style="zoom:50%; " />

### 手动初始化

1. 安装`husky`
	
	```shell
	 npm install husky -D
	```
	
2. 启用 Git hooks
	
	```shell
	npx husky install
	```
	
3. 如果想要自动开启 Git hooks, 需要编辑 `package.json`

	 + 自动生成
	 
	 ```shell
	 npm set-script prepare "husky install"
	 ```
	
	 + 手动编辑
	 
	 ```json
	 {
	 	"scripts": {
	 		"prepare": "husky install"
	 	}
	 }
	 ```
	 
4. 创建钩子
	 使用`husky add <file> [cmd]`来为一个钩子添加命令或者创建一个新的钩子(不要忘了先运行`husky install`)
	 例如: 为`pre-commit`钩子添加命令
	 ```shell
	 npx husky add .husky/pre-commit "npm test"
	 ```
