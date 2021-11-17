# Prettier

`Prettier` 是一个用于格式化代码的工具, 用于以指定规则美化代码

区别与`ESLint`的是`Prettier`只做代码格式校验, 不会对代码质量进行校验, 所以大部分的项目都是`ESlint`+`Prettier`来搭配使用



## 初始化

### 安装

<CodeGroup>

​	<CodeGroupItem title="npm">

```shell
npm install --save-dev --save-exact prettier
```

​	</CodeGroupItem>



​	<CodeGroupItem title="yarn">

```shell
yarn add --dev --exact prettier
```

​	</CodeGroupItem>

</CodeGroup>



### 创建配置文件

```shell
# 配置文件
echo {} > .prettierrc
# 过滤配置文件, build可以改成你需要过滤的文件夹
echo build > .prettierignore
```

其他配置方式查看[配置](#配置)

### 配置IDE

+ VSCode

  扩展应用商店搜索 `Prettier - Code formatter`

更多IDE配置查看->[Editor Integration · Prettier](https://prettier.io/docs/en/editors.html)



## 配置

### 配置文件

`prettier`与`ESLint`差不多, 也支持多种配置文件格式

+ 在`package.json`中配置`prettier`字段

+ 使用`.prettierrc`文件, 内容使用JSON或者YAML格式来写
+ `.prettierrc.json`, `.prettierrc.yml`, `.prettierrc.yaml`, 或 `.prettierrc.json5` 文件
+ `.prettierrc.js`, `.prettierrc.cjs`, `prettier.config.js`, 或 `prettier.config.cjs`文件
+ `.prettierrc.toml`文件

### 配置项

> 下面表格只展示了一些常用的可配置项, 如需查看全部配置项请移步官网->[Options · Prettier](https://prettier.io/docs/en/options.html)

| 字段              | 参数类型          | 说明                                               | 默认值   |
| ----------------- | ----------------- | -------------------------------------------------- | -------- |
| `printWidth`      | `number`          | 每行最大长度, 超出换行                             | `80`     |
| `tabWidth`        | `number`          | Tab键代表几个空格                                  | `2`      |
| `useTabs`         | `boolean`         | 是否使用Tab键而非空格                              | `false`  |
| `semi`            | `boolean`         | 是否在句尾添加分号                                 | `true`   |
| `singleQuote`     | `boolean`         | 引号使用单引号而非双引号                           | `false`  |
| `jsxSingleQuote`  | `boolean`         | jsx文件使用单引号                                  | `false`  |
| `bracketSpacing`  | `boolean`         | 花括号内是否加空格, 如`{ foo: bar }`               | `true`   |
| `trailingComma`   | `es5|none|all`    | 是否在行尾跟随逗号                                 | `es5`    |
| `bracketSameLine` | `boolean`         | 是否将`>`换行                                      | `false`  |
| `arrowParens`     | `always|avoid`    | 是否为单参数箭头函数的参数添加括号<br />`(x) => x` | `always` |
| `endOfLine`       | `lf|crlf|cr|auto` | 换行符                                             | `lf`     |



