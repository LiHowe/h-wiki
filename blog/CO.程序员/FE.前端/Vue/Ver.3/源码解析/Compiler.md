# 编译器

## 编译 - compile

### compileToFunction



### baseParse - 基础语法分析器

`packages/compiler-core/src/parse.ts`

该方法将字符串模板转化为抽象语法树(AST)





## parse - 解析



### TextModes -- 文本类型

```typescript
export const enum TextModes {
  //          | Elements | Entities | 结束标识              | 包括
  DATA, //    | ✔        | ✔        | End tags of ancestors |
  RCDATA, //  | ✘        | ✔        | End tag of the parent | <textarea>
  RAWTEXT, // | ✘        | ✘        | End tag of the parent | <style>,<script>
  CDATA,
  ATTRIBUTE_VALUE
}
```

```mermaid
graph TD
	S(TextModes) --> DATA
	S --> RCDATA
	S --> RAWTEXT
	S --> CDATA
	S --> ATTRIBUTE_VALUE
```



### parseText

解析文本

```typescript
function parseText(context: ParserContext, mode: TextModes): TextNode {
  const endTokens =
    mode === TextModes.CDATA ? [']]>'] : ['<', context.options.delimiters[0]]
  // 字符串总长度
  let endIndex = context.source.length
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1)
    if (index !== -1 && endIndex > index) {
      endIndex = index
    }
  }
  const start = getCursor(context)
  const content = parseTextData(context, endIndex, mode)
  return {
    type: NodeTypes.TEXT,
    content,
    loc: getSelection(context, start)
  }
}
```

![image-20211101103952728](https://i.loli.net/2021/11/01/RW4nfIydBlFTL6Z.png)

```mermaid
graph LR
	A(parseChildren) --> branchA(文本!v-pre并且以 &#123&#123 开头) --> 解析插值
	A --> branchB(文本以 < 开头,即标签)
	branchB --> 字符串长度小于1 --> E(emitError)
	branchB --> branch!(第二个字符是!)
	branchB --> 第二个字符是? --> E
	branchB --> 第二个字符是英文 --> 解析元素
	branchB --> 其他 --> E
	branch! --> a[<&#33--]
	branch! --> b[<&#33DCTYPE]
	branch! --> c[<&#33CDATA]
	A --> branchC(普通文本) --> 解析文本
	
```

