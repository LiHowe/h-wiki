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
|--- index.js								主入口文件 <-
|--- parser_block.js				块解析器
|--- parser_core.js					核心解析器
|--- parser_inline.js				行内解析器
|--- renderer.js						渲染器
|--- ruler.js								规则
|--- token.js								分词
```



## 源码解析

先放一张MarkdownIt 的整体渲染(render)流程(使用Figma绘制)

![markdownIt](https://s2.loli.net/2022/02/18/LHmJ2Cx3riMwez8.png)

### md: MarkdownIt - 实例化

我们在 `index.js` 文件中找到 `MarkdownIt` 的定义方法 

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

例如: `md.render('# 一级标题')`

### md.render - 渲染方法

源码:

```javascript
// src = '一级标题'
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};
  return this.renderer.render(
    this.parse(src, env), // <-- 调用了 parse 方法
    this.options,
    env
  );
};
```

可以看到, `render` 方法调用了 renderer 的 `render` 方法,

入参则调用了 `parse` 方法来解析字符串, 我们来看下 `parse` 方法的定义

### md.parse - 解析方法

该方法用于MarkdownIt来将传入字符串解析为token的方法

#### 源码

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

#### 解析过程

1. 建立状态对象(state), 用于记录解析过程

`state` 状态对象包含了以下属性

+ `src`: 原始字符串
+ `env`: 环境信息, 初始接收于 render 的入参
+ `tokens`: 解析的分词数组
+ `inlineMode`: 是否是行内模式
+ `md`: MarkdownIt实例

2. **调用核心解析器(`parser_core`)的 `process` 方法来解析(分别应用以下规则)**
   1. `normalize`: 将换行符统一为 `\n`, 将空字符统一为 `\uFFFD`, 更新状态(`state`)
   2. **`block`: 调用 ParserBlock 的 parse 方法来进行块级元素解析**
   3. **`inline`: 调用 ParserInline 的 parse 方法来进行行内元素解析**
   4. `linkify`: 链接解析
   5. `replacements`: 印刷字符替换, 比如(c) -> © 
   6. `smartquotes`: 引号转换
3. 返回解析好的分词数组 `tokens`

#### Token - 分词

在知道了解析流程之后, 我们再来看一下Token的定义.

Token 定义于 `lib/token.js`

```javascript
// Token
function Token(type, tag, nesting) {
  this.type     = type;			// 标签类型
  this.tag      = tag;			// HTML标签名称
  this.attrs    = null;			// HTMl标签属性
  this.map      = null;			// 源映射信息
  this.nesting  = nesting;	// 标签级别. 1: 开标签  0: 自闭合标签  -1: 闭标签
  this.level    = 0;				// 标签嵌套级别
  this.children = null;			// 子标签
  this.content  = '';				// 标签内容
  this.markup   = '';				// 代码字符串和*, _形式的强调
  this.info     = '';				// 代码块额外信息
  this.meta     = null;			// 用于插件存放额外信息
  this.block    = false;		// 是否是块级元素
  this.hidden   = false;		// 元素是否隐藏
}
```

像 `# 一级标题` 就会解析成如下内容(token内容有所缩减, 只展示了重要部分)

```javascript
[
  {
    type: 'heading_open',
    tag: 'h1',
    nesting: 1,
    markup: '#',
    map: [0, 1],
    // ...
  },
  {
    type: 'inline',
    tag: '',
    nesting: 0,
    content: '一级标题',
    map: [0, 1],
    children: [
      {
        type: 'text',
        tag: '',
        content: '一级标题',
        // ...
      }
    ]
    // ...
  },
  {
    type: 'heading_close',
    tag: 'h1',
    nesting: -1,
    markup: '#',
    map: null,
    // ...
  }
]
```



解析过程实质上就是将待解析字符串传入各个规则中进行解析, 其中最重要的两个规则就是 `block` 和 `inline` 了.



### Block规则

应用block规则实质上是调用了 `md.block.parse`, 也就是 `ParserBlock` 的 `parse` 方法, 位于 `lib/parser_block.js` 中.

#### 源码

```javascript
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;
  if (!src) { return; }
  state = new this.State(src, md, env, outTokens);	// <- 状态对象初始化
  this.tokenize(state, state.line, state.lineMax); 	// <- 解析
}
```

#### 解析流程

> Core, Block, Inline 使用的分别是其对应的 State 对象来存储其解析过程

1. 初始化状态对象(`state`)来存储解析过程中的数据, 该对象会贯穿于整个解析过程
   1. 循环字符串初始化各个指标(`bMarks`, `eMarks`, `tShift`, `sCount`等), 并确认整个字符串行数.
2. 执行 `ParserBlock.tokenize` 方法进行分词解析
   1. 遍历字符串的每一行
   2. 逐个使用**块级规则**来对每一行的字符串进行匹配解析, 如果不匹配规则, 则标记为空行.
      1. `table`: 表格
      2. `code`: 行代码
      3. `fence`: 代码块
      4. `blockquote`: 块引用
      5. `hr`: 分隔符 `***`, `---`, `___` -> `hr`
      6. `list`: 列表
      7. `reference`: 注释
      8. `html_block`: HTML块
      9. `heading`: 标题. `#, ##...` -> `h1, h2...`
      10. `lheading`: 标题. `---`, `===` -> `h1, h2...`
      11. `paragraph`: 段落. line -> `p`



## 参考链接

+ [markdown-it | markdown-it 中文文档 (docschina.org)](https://markdown-it.docschina.org/#安装)
+ [markdown-it 12.3.2 API documentation](https://markdown-it.github.io/markdown-it/)

