---
categories:
  - frontend
  - vue
  - Ver.3
  - 源码解析
titleSlug: ast
title: Vue AST
thumbnail: ''
description: 暂无
wip: true
top: false
---
# AST

AST(Abstract Syntax Tree)

Vue模板是一个跨平台的HTML(语法)超集, 所以Vue的AST命名空间只声明了`HTML`, 其余的(如`SVG`和`MathML`)命名空间是由特定平台的编译器声明的.



## NodeTypes - 节点类型

目前(compiler-core v3.2.20)一共声明了`26`种节点类型, 共分为4大类

### 1. 基础类型 (base)

| 定义              | 值   | 含义       | 例子             |
| ----------------- | ---- | ---------- | ---------------- |
| ROOT              | 0    | 根节点     |                  |
| ELEMENT           | 1    | HTML元素   | `<div>`          |
| TEXT              | 2    | 文本       | `demo text`      |
| COMMENT           | 3    | 注释       | `<!--comment-->` |
| SIMPLE_EXPRESSION | 4    | 简单表达式 |                  |
| INTERPOLATION     | 5    | 插值       | `{{ a }}`        |
| ATTRIBUTE         | 6    | 属性       |                  |
| DIRECTIVE         | 7    | 指令       |                  |



### 2. 容器类型 (container)

| 定义                | 值   | 含义 | 例子 |
| ------------------- | ---- | ---- | ---- |
| COMPOUND_EXPRESSION | 8    |      |      |
| IF                  | 9    |      |      |
| IF_BRANCH           | 10   |      |      |
| FOR                 | 11   |      |      |
| TEXT_CALL           | 12   |      |      |



### 3. 代码生成类型 (codegen)

| 定义                      | 值   | 含义 | 例子 |
| ------------------------- | ---- | ---- | ---- |
| VNODE_CALL                | 13   |      |      |
| JS_CALL_EXPRESSION        | 14   |      |      |
| JS_OBJECT_EXPRESSION      | 15   |      |      |
| JS_PROPERTY               | 16   |      |      |
| JS_ARRAY_EXPRESSION       | 17   |      |      |
| JS_FUNCTION_EXPRESSION    | 18   |      |      |
| JS_CONDITIONAL_EXPRESSION | 19   |      |      |
| JS_CACHE_EXPRESSION       | 20   |      |      |



### 4. 服务器代码生成类型 (SSR codegen)

| 定义                     | 值   | 含义 | 例子 |
| ------------------------ | ---- | ---- | ---- |
| JS_BLOCK_STATEMENT       | 21   |      |      |
| JS_TEMPLATE_LITERAL      | 22   |      |      |
| JS_IF_STATEMENT          | 23   |      |      |
| JS_ASSIGNMENT_EXPRESSION | 24   |      |      |
| JS_SEQUENCE_EXPRESSION   | 25   |      |      |
| JS_RETURN_STATEMENT      | 26   |      |      |
