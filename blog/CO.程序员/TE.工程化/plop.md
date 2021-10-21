# Plop

## 官网

---

[Plop: Consistency Made Simple](https://plopjs.com/)

## 使用

---

### 安装

```bash
# 项目下使用
npm install plop -D
# 全局使用
npm install plop -g
```

### 创建 `plopfile.js`

```jsx
module.exports = function(plop) {
	// ...generators
	plop.setGenerator('name', {
		description: '描述',
		prompts: [], // 问题列表
		actions: [], // 操作列表
	})
}
```

### **Prompts**

问题配置

用户输入答案(hash)结构为 `{ name: string, value: string | number | boolean }` 

- **type** `String` : 问题类型以及支持参数列表如下:
    - input:：输入
        - `type`, `name`, `message`[, `default`, `filter`, `validate`, `transformer`]
    - number： 数字
        - `type`, `name`, `message`[, `default`, `filter`, `validate`, `transformer`]
    - confirm： 确认(y/N)
        - `type`, `name`, `message`, [`default`]
        - default 为 `boolean` 类型
    - list： 列表
        - `type`, `name`, `message`, `choices`[, `default`, `filter`, `loop`]
        - default可为数组下标或者对应choice的value
    - rawlist： 带序号列表
        - `type`, `name`, `message`, `choices`[, `default`, `filter`, `loop`]
    - expand： 展开
        - `name`, `message`, `choices`, [ `default` ]
        - `choices` 数组内对象可以接受额外属性 `key`, 为单个小写字符(不能为`h`, 因为h已定义为帮助列表help)
    - checkbox：多选框
        - `type`, `name`, `message`, `choices`[, `filter`, `validate`, `default`, `loop`]
    - password：密码
        - `type`, `name`, `message`, `mask`,[, `default`, `filter`, `validate`]
    - editor：编辑器
        - `type`, `name`, `message`[, `default`, `filter`, `validate`, `postfix`]
- **name** `String` : 问题对应答案的属性名
- **message** `String | Function` : 问题描述, 默认值为 `name`的值(结尾跟随:)
    - `String` : 控制台打印出的问题
    - `Function(hash):String` : 参数为答案对象(hash)， 返回值为 `String`
- **default** : 默认值(类型跟随问题类型 `type` )
- **choices** `Array | Function` : 答案选项数组(用于 `list`, `rawlist`, `expand` )
    - `Array` :
        - `[{name: string, value: any, short: string}...]`
            - name: 列表展示名称
            - value: 答案值
            - short: 在选项后展示
        - `[number...]`
        - `[string...]`
    - `Function(hash):Array` : 参数为答案对象(hash), 需返回数组
- **validate** `Function(val, hash):Boolean` : 答案校验器, 参数为用户输入(val)和答案对象(hash)
- **filter** `Function(val, hash):any` : 返回过滤后的数据，返回值将会被放入答案对象中(hash)
- **transformer** `Function(val, hash, flag): any` : 返回转换后的数据展示给用户，返回值只会影响编辑时展示的数据，不会影响原始值(hash对象中的对应属性值)
- **when** `Function(hash):Boolean | Boolean` : 条件展示， 只有返回值为 `true` 的时候才会展示问题
- **pageSize** `Number` : 改变选项渲染行数，在 `type` 为 `list`, `rawlist`, `expand`, `checkbox` 时候使用
- **prefix** `String` : 改变默认问题描述前缀
- **suffix** `String` : 改变默认问题描述后缀
- **askAnswered** `Boolean` : 如果对于问题答案已经存在也提示问题
- **loop** `Boolean` : 开启列表循环(默认开启)

### **Actions**

**`Function(hash):Array | Array` 操作配置**

- **type** `String`
    - add: 增加(新建)文件， 额外属性配置如下
        - path `String`: 文件存放地址
        - template `String` : handlebars 模板
        - templateFile `String` : handlebars 模板文件
        - skipIfExists `Boolean`: 当文件已经存在是否跳过，默认为`false`
        - transform `Function` : 用于模板文件写入硬盘前的转换
    - addMany: 在一个操作(action)中添加多个文件
        - destination `String` : 生成文件的目标文件夹
        - base `String` : 生成文件的基本路径
        - templateFiles `Glob` : 用于匹配多个模板文件的 [glob 表达式](https://github.com/sindresorhus/globby#globbing-patterns)
        - stripExtensions `[string]` : 文件拓展名， 默认 `['hbs']`
        - globOptions `Object` :  改变匹配将要被添加的模板文件的glob配置
        - verbose `Boolean` : 是否打印成功添加文件的路径, 默认 `true`
    - modify: 修改文件内容
        - path `String` : 文件存放路径
        - pattern `RegExp` : 表明被替换文本的正则表达式， 默认为 `end-of-line`
        - template `String` : handlebars 模板，正则匹配组(capture groups)可为$1, $2等
        - templateFile `String` : handlebars 模板文件
        - template `String` : handlebars 模板
    - append: 增加文件内容
        - path `String` : 文件存放路径
        - pattern `RegExp | String` : 表明添加位置的正则表达式
        - unique `Boolean`:  是否删除相同条目， 默认为 `true`
        - separator `String` : 分隔符的值, 默认为 `new line`
        - template `String` : handlebars 模板，正则匹配组(capture groups)可为$1, $2等
        - templateFile `String` : handlebars 模板文件
    - custom (action function): 自定义操作
        
        ```jsx
        // 步骤1: 定义自定义action
        plop.setActionType('customAction', (answers, config, plop) => {
        	// 你的自定义方法
        	// 执行成功
        	return '成功信息'
        	// 执行失败
        	throw '错误信息'
        })
        // 也可以异步操作
        plop.setActionType('customAction', (answers, config, plop) => {
        	return new Promise((resolve, reject) => {
        		// 你的自定义方法
        		// 执行成功
        		resolve('成功信息')
        		// 执行失败
        		reject('错误信息')
        	})
        })
        // 步骤2: 使用自定义action
        plop.setGenerator('demo', {
        	prompts: [],
        	actions: [{
        		type: 'customAction',
        		customConfig1: '这是自定义配置(config)'
        	}]
        })
        ```
        
- **force** `Boolean` : 当文件存在的时候覆盖
- **data** `Object | Function:Object` : 传入模板的数据
- **abortOnFail** `Boolean` : 失败的时候是否中断后续操作， 默认为 `true`
- **skip** `Function:String` ：操作是否应该跳过， 返回值为跳过该操作的原因

### Case Modifiers Helper (文本修饰符)

---

- **camelCase**: changeFormatToThis
- **snakeCase**: change_format_to_this
- **dashCase/kebabCase**: change-format-to-this
- **dotCase**: change.format.to.this
- **pathCase**: change/format/to/this
- **properCase/pascalCase**: ChangeFormatToThis
- **lowerCase**: change format to this
- **sentenceCase**: Change format to this,
- **constantCase**: CHANGE_FORMAT_TO_THIS
- **titleCase**: Change Format To This

### 例子

---

1. 生成Vue组件

```jsx
// plopfile.js

module.exports = function(plop) {
	plop.setGenerator('component', {
		description: '生成vue组件',
		prompts: [
			{
				type: 'input',
				message: '请输入组件名称',
				name: 'name'
			},
			{
	      type: 'checkbox',
	      name: 'blocks',
	      message: '请选择生成标签:',
	      choices: [
	        {
	          name: '<template>',
	          value: 'template',
	          checked: true
	        },
	        {
	          name: '<script>',
	          value: 'script',
	          checked: true
	        },
	        {
	          name: '<style>',
	          value: 'style',
	          checked: true
	        }
	      ],
	      validate (value) {
	        if (
	          value.indexOf('script') === -1 &&
	          value.indexOf('template') === -1
	        ) {
	          return '组件需要至少包含<script>或者<template>'
	        }
	        return true
	      }
	    },
		],
		actions: hash => {
			const actions = [{
        type: 'add',
        path: 'src/components/{{ properCase name }}.vue',
        templateFile: 'plop/template/component/template.hbs',
        data: {
          name,
          template: data.blocks.includes('template'),
          script: data.blocks.includes('script'),
          style: data.blocks.includes('style')
        },
			}]
			return actions
		}
	})
}
```

```jsx
// template.hbs
{{#if template}}
<template>
  <div class="{{ kebabCase name }}-container">

  </div>
</template>
{{/if}}

{{#if script}}
<script>
export default {
  name: '{{ properCase name }}',
  props: {
  },
  data: () => ({
  }),
  methods: {
  }
}
</script>
{{/if}}

{{#if style}}
<style lang="less" scoped>
  .{{ kebabCase name }}-container {

  }
</style>
{{/if}}
```

## 相关链接

---

### plop prompts(inquirer questions)

plop 的prompts使用了i**nquirer.js**来在控制台获取用户输入数据

[SBoudrias/Inquirer.js](https://github.com/SBoudrias/Inquirer.js)

### Handlebar

plop 使用了 **handlebar** 作为template生成器

[Handlebars](https://handlebarsjs.com/)
