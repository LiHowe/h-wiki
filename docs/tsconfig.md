---
WIP: true
categories:
  - frontend
  - typescript
titleSlug: tsconfig
title: tsconfig
thumbnail: ''
description: 暂无
wip: true
top: false
---

# TSConfig

`tsconfig.json`的作用: 无需每次编译都在命令行去输入配置参数, 对参数进行统一管理

可以通过`tsc --init` 生成初始配置文件 `tsconfig.json`

## 根字段说明

[官方字段说明](https://www.typescriptlang.org/tsconfig)

`tsconfig.json`官方支持6个顶级配置, 分别为

+ [compilerOptions](#compileroptions): 编译选项
+ [files](#files): 编译文件范围
+ [include](#include): 编译文件匹配规则列表
+ [exclude](#exclude): 忽略文件列表
+ [extends](#extends): 继承配置
+ [references](#references): 引用配置


### compilerOptions

在`tsc --init`生成的`tsconfig.json`中, 涵盖了大部分常用的编译选项.

#### 基础选项

+ `target`: 项目编译目标
  'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'

+ `module`: 模块化规范
  + `none`
  + `commonjs`
  + `amd`
  + `system`
  + `umd`
  + `es2015`
  + `es2020`
  + `ESNext`

### files

用于表明当前项目的待编译文件范围, 如果你的项目中有一大堆文件, 但是你只想编译其中的几个, 可以使用该配置

```json
{
  "files": [
    "yourFile.ts"
  ]
}
```

### include

用于表明哪些文件是**应该**被包含进项目中.

```json
{
  "include": [
    "src/**/*"
  ]
}
```

### exclude

用于在`include`中排除文件, 如果设置的表达式本就不在include的范围内, 则无意义

```json
{
  "exclude": [
    "dist/**/*"
  ]
}
```

### extends

用于继承其他配置文件中除了引用`reference`之外的配置

同名配置使用当前文件值

`tsconfig.base.json`
```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

`tsconfig.json`
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "noImplicitAny": false,
    "strict": true
  }
}
```

这样`tsconfig.json`实际的内容为

```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "strict": true
  }
}
```


### references

`TypeScript 3.x`新特性, 可以让我们缩短构建时间, 可以让你按照功能/组件逻辑拆分项目

比如你的项目中分别有需要构建为`CommonJS`的模块和`UMD`模块, 这时你要构建项目需要执行两次`tsc`, 因为他们的构建目标不同,
`tsconfig`配置文件也至少有两个

但是有了`references`之后, 一些共通的配置可以写入一个`tsconfig.json`中,
然后将两个模块不同的配置分别写到`a.tsconfig.json`与`b.tsconfig.json`中,
再在`tsconfig.json`中配置, 引用这两个配置文件.

这样就可以`tsc`一次构建两个不同配置的模块了

> 编译使用的 `tsconfig.json` 需要开启 `composite` 和 `declaration` 编译选项

```json
{
  "compilerOptions": {
    "strict": true,
    "composite": true
  },
  "references": [
    {
      "path": "a/a.config.json",
    },
    {
      "path": "b/b.config.json"
    }
  ]
}
```

与`extends`不同的是, `extends`继承其他配置文件后最终编译使用的只是合并配置之后的**一个**配置文件

而`references` 是同时使用多个配置文件
