---
category: code
layout: blog
title: 如何搭建自己的脚手架
date: 06/20-2021 19:22
coverImage: https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png
tags:
  - Node.js
  - BackEnd
  - Tutorials
description: 如何搭建自己的脚手架工具
stick: false
wip: true

---

## lib选择

+ [Commander](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)
	主流的Node.js命令行解决方案, 用来输出自定义命令行与接收用户输入

+ [Chalk](https://www.npmjs.com/package/chalk)
	用来给终端文字添加样式
	
+ [ora](https://www.npmjs.com/package/ora)
	为终端添加加载动画
	
+ [inquirer](https://www.npmjs.com/package/inquirer)
	命令行交互界面,用来收集用户每一步的输入选择
	
+ [download-git-repo](https://www.npmjs.com/package/download-git-repo)
	用来下载git仓库
	
+ [ShellJS](https://www.npmjs.com/package/shelljs)
	 用于多系统(Windows | Linux | OS X)使用Unix shell 命令

+ [log-symbols](https://www.npmjs.com/package/log-symbols)
	用来在控制台输出√ ×
	
+ [semver](https://www.npmjs.com/package/semver)
	npm语义化版本控制器

+ [execa](https://www.npmjs.com/package/execa)
	更好的方式使用`child_progress`
	
+ [fs-extra](https://www.npmjs.com/package/fs-extra)
	更好的方式使用Node.js的`fs`

+ [minimist](https://www.npmjs.com/package/minimist)
	用来将用户输入参数转化为对象

