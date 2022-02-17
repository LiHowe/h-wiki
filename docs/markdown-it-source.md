---
WIP: true
categories:
  - frontend
  - libs
titleSlug: markdown/it
title: Markdown-it源码阅读
thumbnail: ''
description: 暂无
series: Markdown-it
wip: true
top: false
---



# Markdown-it 源码解析

由于近期用到Markdown-it, 并且需要开发Markdown-it插件, 又因为网上没有比较系统和完整的相关文章(官网我又看不太懂), 所以就读一读源码来理解其工作原理, 从而能够从容地开发插件.

## 目录结构

```txt
|- lib
|--- common									通用文件, 包含工具函数和常量定义
|--- helpers								助手函数
|--- presets								预设配置
|--- rules_block						块级规则
|--- rules_core							核心规则
|--- rules_inline						行内规则
|--- index.js								主入口文件 😯
|--- parser_block.js				块解析器
|--- parser_core.js					核心解析器
|--- parser_inline.js				行内解析器
|--- renderer.js						渲染器
|--- ruler.js								规则
|--- token.js								分词
```



## 源码解析

我们从入口文件 `index.js` 来入手

### md: MarkdownIt

我们在文件中找到 `MarkdownIt` 的定义方法 

```javascript
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }
	// 如果没有指定预设规则, 则使用 `default` 规则. 并且将第一个参数作为options配置
  if (!options) {
    if (!utils.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  this.inline = new ParserInline();							// 行内解析器
  this.block = new ParserBlock();								// 块级解析器
  this.core = new ParserCore();									// 核心解析器
  
  this.renderer = new Renderer();								// 渲染器
  this.linkify = new LinkifyIt();								// 自动将url变为可点击标签
  
  this.validateLink = validateLink;							// 工具函数, 校验链接
  this.normalizeLink = normalizeLink;						// 标准化链接
  this.normalizeLinkText = normalizeLinkText;		// 标准化链接文本
  this.utils = utils;														// 暴露工具函数
  this.helpers = utils.assign({}, helpers);			// 暴露帮助函数的拷贝


  this.options = {};														// MarkdownIt配置
  this.configure(presetName);

  if (options) { this.set(options); }
}
```

在该方法之外, MarkdownIt还在其原型上定义了一些方法:

**配置类**

+ `set(options)`: 合并MarkdownIt选项
+ `configure(presets)`: 批量加载所有选项和编译设置
+ `enable(list[, ignoreInvalid])`: 启用指定规则列表
+ `disable(list[, ignoreInvalid])`: 禁用指定规则列表
+ `use(plugin[, params])`: 使用插件

**使用类**

+ `parse`: 解析方法
+ `render`: 渲染方法
+ `parseInline`: 解析方法(行内)
+ `renderInline`: 渲染方法(行内)



接下来我们以 `render` 函数为切入点来理解 MarkdownIt 的解析及渲染流程

例如: `md.render('# demo')`

### md.render

源码:

```javascript
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};
  return this.renderer.render(
    this.parse(src, env), // <-- 调用了 parse 方法
    this.options,
    env
  );
};
```

可以看到, render 方法调用了 renderer的render方法,

入参则调用了 parse 方法来解析字符串, 我们来看下 parse 方法的定义

### md.parse

源码:

```javascript
MarkdownIt.prototype.parse = function (src, env) {
  // 只接受字符串类型src
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }
  // 建立状态对象, 用于记录解析过程.
  // 源码位于 rules_core/state_core.js
  var state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens;
};
```

1. 建立状态对象(state), 用于记录解析过程

`state` 状态对象包含了以下属性

+ `src`: 原始字符串
+ `env`: 环境信息, 初始接收于 render 的入参
+ `tokens`: 解析的分词数组
+ `inlineMode`: 是否是行内模式
+ `md`: MarkdownIt实例

2. 调用核心解析器(`parser_core`)的 `process` 方法来解析
   1. normalize: 将换行符统一为 `\n`, 将空字符统一为 `\uFFFD`, 更新状态(`state`)
   2. block: 如果不是inlineMode 则调用 ParserBlock 的 parse 方法来解析
3. 



## 参考链接

+ [markdown-it | markdown-it 中文文档 (docschina.org)](https://markdown-it.docschina.org/#安装)
+ [markdown-it 12.3.2 API documentation](https://markdown-it.github.io/markdown-it/)

