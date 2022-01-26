---
categories:
  - frontend
  - libs
titleSlug: eslint
title: eslint
thumbnail: ''
series: 工程化
description: 暂无
wip: true
top: false
---
# ESLint

`ESLint`用于以指定代码规范来检测规范代码, 在团队协作开发的时候效果明显, 避免因为每个人代码风格不同的问题而导致开发人员阅读以及理解代码上的障碍.

*ESLint使用 Espree 解析JavaScript, 使用AST分析代码模式*

## 使用

### 安装

```shell
# 全局安装
npm install eslint -g

# 项目目录范围安装
npm install eslint -D
```



### 初始化

我们可以通过在项目目录下执行`eslint --init`命令来初始化项目eslint配置文件,

如果没有全局安装`eslint`, 可以使用以下命令

```shell
# 使用npx
npx eslint --init

# 使用 yarn
yarn run eslint --init

# 使用node_modules下的eslint生成配置文件
./node_modules/.bin/eslint --init
```

之后根据命令行提示一步步执行, 这里举例说明下

```shell
? How would you like to use ESLint? … 										# 你打算以下面哪种方式使用ESLint?
  To check syntax only 																		# 仅校验语法
❯ To check syntax and find problems												# 校验语法, 找到问题
  To check syntax, find problems, and enforce code style	# 校验语法, 找到问题, 并且保证代码风格
  
? What type of modules does your project use? … 					# 你的项目是以哪种方式导入导出模块的?
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
  
? Which framework does your project use? … 								# 你项目用了下面哪个框架?
  React
  Vue.js
❯ None of these

? Does your project use TypeScript? › No / Yes						# 用没用TypeScript?

? Where does your code run? 															# 你的代码在哪个环境运行? (多选)
✔ Browser
✔ Node

? What format do you want your config file to be in? 			# 你打算使用哪种文件格式来配置eslint 
❯ JavaScript
  YAML
  JSON
  
# 上一步确认之后会下面告诉你都需要什么依赖
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
? Would you like to install them now with npm? › No / Yes	# 要不要现在就安装这些依赖嗷?
```



ESLint支持以下方式来配置

1. 使用JavaScript注释

2. 使用配置文件`.eslintrc`(无后缀, 或者 `.js`, `.yaml`, `.yml`, `.json` 格式)

3. 在 package.json 中的 `eslintConfig` 字段配置

>如果一个工程下存在多个eslint配置文件, 则ESLint会按照优先级只使用一个.
>.eslintrc.js > .eslintrc.yml | .eslintrc.yaml > .eslintrc.json > .eslintrc > package.json

## 配置

ESLint的常见配置项主要分为以下几项:

```javascript
module.exports = {
    root: true, 				// 将该文件作为项目根配置(停止文件夹.eslintrc就近使用)
    globals: {}, 				// 自定义全局变量
    env: {}, 						// 环境
    parser: "", 				// 解析器
    parserOptions: {}, 	// 解析器配置
    plugins: [], 				// 插件
    extends: [], 				// 预设规则
    rules: {}, 					// 校验规则
}
```

下面我们来看看每个属性都有什么作用

### 层叠配置 (root)

ESLint在检测文件的时候会使用**离待校验文件最近**的配置文件来**作为最高优先级**的校验规则, 以下面的目录结构为例

```text
src
|-- .eslintrc
|---- src
|------ index.js
|---- demo
|------ .eslintrc
|------ code.js
```

`src/index.js` 所在文件夹 `src` 下没有 `.eslintrc.*` 配置文件， 所以其校验规则使用根目录下的配置文件( `src/.eslintrc` )

而 `demo/code.js` 所在文件夹 `demo` 存在ESLint配置文件, 所以 `code.js` 的校验规则使用 `demo/.eslintrc` 和 `src/.eslintrc` ， 如果根目录的 `.eslintrc` 与 `demo/.eslintrc` 有冲突的时候会优先使用 `demo/.eslintrc`



我们可以通过在配置文件中加入 `root:true` 来关闭ESLint的这个特性, 在ESLint发现项目根目录的 `.eslintrc.*` 文件有配置 `root: true` 的时候就会停止在待检测文件的父级目录中查找配置文件

### 全局变量 (globals)

globals用来配置一些非环境内置的全局变量, 比如当我们全局引用一些第三方库的时候, 第三方库的全局变量可能会被ESLint检测报错, 这时我们可以通过配置globals来让该全局变量通过校验

比如:

```javascript
module.exports = {
    globals: {
        g1: 'writable', // 可重写变量
        g2: 'readonly', // 只读变量
    }
}
```



### 环境 (env)

用于指定代码运行环境, 会支持对应环境的全局变量以及数据类型。

比如配置ES6语法支持

 `"env": { "es6": true }` , 这样会启用**ES6全局变量/类型支持**以及**ES6语法解析器支持**(相当于也配置了`ecmaVersion: 6`)

> 注意: 配置了 `ecmaVersion: 6` 不等于配置了ES6的`env`, 比如配置了 `ecmaVersion: 6` 后可以支持ES6的语法(箭头函数、解构等), 但是并不支持ES6的新增对象类型(`Promise`, `Map`, `Set`等)和全局变量定义(`const`, `let`)



### 解析器 (parserOptions)

用于配置ESLint解析JavaScript时的配置

- `ecmaVersion` : 用于配置解析器支持的语法版本, 默认ES5 ecmaVersion: 5 , 如果需要支持ES6以上JS版本则需要指定为6, 7, 8, 9, 10等

- `sourceType` : 指定代码类型, script 或者 module 

- `ecmaFeatures` : 配置额外的语言特性

- `globalReturn` : 全局作用域的return支持

- `impliedStrict` : 全局严格模式(ES5+)

- `jsx` : JSX文件支持



### 继承配置文件 (extends)

`extends` 引用的配置文件可以被 `rules` 定义的规则继承, 可以配置单个或多个待继承文件

比如常见的 `extends: "eslint:recommended"` 继承的是[当前ESLint版本推荐的配置](https://cn.eslint.org/docs/rules/)

`extends` 可选继承的值

+ 共享配置(npm包, 像 `eslint-config-*` 形式的包)
+ `eslint:recommended`
+ `eslint:all`
+ 来自插件(plugin)的配置 (`plugin:xxx/xxx`)
+ 来自其他配置文件的配置 (`./demo/.eslintrc`)

在我们继承一些共享的配置(npm包)时, 比如`eslint-config-standard`, `extends`会为这些包自动加上 `eslint-config-` 前缀, 所以我们在使用的时候只需要写成 `extends: ["standard"] ` 



### 配置插件 (plugins)

`plugins` 是一个npm包, 输出0个,1个或多个配置规则.

以 `plugins: ['@typescript-eslint']` 为例

![image-20210907160155611](https://i.loli.net/2021/09/07/b7OEnsTSxmH3y9a.png)

可以看出, `@typescript-eslint` 导出了5个配置文件, 所以我们在使用时, `extends` 可以在这5个中进行选择, 比如我们选择使用推荐配置: `extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended']`



> #### extends 与 plugins 的区别
>
> 1. `extends`导出的是单个`rules`, `plugins`可能导出0个或多个`rules`
> 2. `extends` 中加入规则的时候会直接使用该规则, 而 `plugins` 中加入插件并不会强制使用任何规则
> 3. `plugins` 中引用的`plugin`可以理解为是导入规则集合(`import rules from plugin`), 然后我们就可以在 `extends` 里面去使用继承规则

### 校验规则 (rules)

#### 规则定义

规则形式: `rule1: "off"` 或 `rule1: 0`

- `off` | `0` : 关闭规则

- `warn` | `1` : 以**警告级别**开启规则

- `error` | `2` : 以**错误级别**开启规则(触发时会退出程序)

在定义规则的时候可以指定想要使用的规则选项, 比如引号规则, 选择使用双引号, 不符规则会进行警告

`quotes: ["error", "double"]`

#### 规则覆盖

有时候在我们 `extends` 一些规则的时候会发现有些规则并不适用于自己项目, 我们可以针对这些规则进行覆盖.

只需要 `rules` 里进行**相同名称**的规则定义即可覆盖其规则

相同的, 如果 `extends `了 `plugins` 的预设规则, 则需要在 `rules` 里使用 `插件名/规则` 的形式进行覆盖

```javascript
{
  plugins: ['plugin1'],
  extends: ['eslint:standard', 'plugins1/recommended']
  rules: {
    'quotes': ['error', 'double'],
    'plugins1/rule1': 0
  }
}
```

#### 规则禁用

在ESLint规则影响我们编码心情的时候, 我们可以使用以下几种方式进行禁用

1. 范围禁用

   通过**块注释**(`/* eslint-disable [rules] */`)来禁用, 该注释下方的代码将会不受ESLint规则限制. 当我们把该注释放于文件**顶部**的时候, 该文件整个文件将不会校验ESLint规则

   > 注意块注释前后的空格

   ```javascript
   /* eslint-disable */
   const a = '整个文件禁用规则校验'
   
   /* eslint-disable no-alert no-console */
   alert('禁用某几项规则校验')
   
   ```

   或者结合使用 `/* eslint-disable */` 与 `/* eslint-enable */` 来控制某一代码区间是否校验

   ```javascript
   /* eslint-disable */
   console.log('禁用了')
   alert('也禁用了')
   /* eslint-enable */
   alert('启用了')
   ```

   

2. 行禁用

   我们可以使用 `eslint-disable-line` 与 `eslint-disable-next-line` 关键词配合**行注释**(`//`)或者**块注释**(`/* */`)来禁用**某一行**或者某一行的下一行的校验

   ```javascript
   alert('foo'); // eslint-disable-line
   
   // eslint-disable-next-line
   alert('foo');
   
   /* eslint-disable-next-line */
   alert('foo');
   
   alert('foo'); /* eslint-disable-line */
   ```

   

3. 文件名正则禁用

   我们可以通过配置ESLint配置文件中的重写(`overrides`)属性来控制符合条件的文件的校验规则

   ```javascript
   {
     rules: {...}, // 一些规则
     overrides: [
       {
         files: ['*.spec.js', '*.test.js'], // 需要重写规则的文件正则
         rules: {
           'no-console': 1
         }
       }
     ]
   }
   ```

   也可以在`overrides`选项内添加`excludedFiles`属性来配合`files`进行更灵活的过滤

   ```javascript
   {
     rules: {
       quotes: ['error', 'double']
     },
   
     overrides: [
       {
         files: ['bin/*.js', 'lib/*.js'],
         excludedFiles: '*.test.js',
         rules: {
           quotes: ['error', 'single']
         }
       }
     ]
   }
   ```

   

### 校验范围 (ignore)

我们可以通过以下几种方式来配置过滤**无需校验**的文件

1. 在配置文件中配置 `ignorePatterns` 属性

   ```javascript
   {
     ignorePatterns: ['**/test/*.js']
   }
   ```

2. 使用项目根目录 `.eslintignore` 文件

   ESLint有以下隐藏(内置)过滤规则

   + `/node_modules/*`
   + `/bower_components/*`
   + `.*` : 点文件(夹), 比如`.vscode`, `.gitignore`

3. 使用备用文件(文件需符合`.gitignore`规范)

   命令行使用通过 `--ignore-path` 来指定所使用的配置文件

   ```shell
   eslint --ignore-path .gitignore demo.js
   ```

4. 使用 `package.json` 中的 `eslintIgnore` 属性

   ```json
   {
     "eslintIgnore": ["**/*.js"]
   }
   ```

   

## IDE配置

### VS Code

安装[ESLint插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### WebStorm

打开设置然后参考如下设置即可(好像默认设置就是这样), 如果想要自动修复可以勾选 `保存时运行 eslint --fix`

![image-20210907171934216](https://i.loli.net/2021/09/07/skRy6oNXQmCITY7.png)

## 参考链接

- [ESLint测试](http://wiznote-desktop/index.html)

- [ESLint官网](https://cn.eslint.org/docs/user-guide/configuring)

