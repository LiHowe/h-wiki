# vuepress-plugin-menu

该插件用于基于给定根目录来构建导航菜单

## Install

`npm install vuepress-plugin-menu`

## Feature

- [ ] 支持嵌套目录, 支持层级深度配置`depth`
- [ ] 支持`ignorePattern`配置来过滤文件(夹)
- [ ] 自定义`formatter`来格式化生成的导航标题

## Config

```javascript
['menu', {
    root: 'src',
    depth: 2,
    ignorePattern: '',
    formatter: '',
    generateMd: true
}]
```

### `root`: `string`

默认`src`

存放文章的根目录, 只会检测该文件夹下的子文件夹

### `depth`: `number`

默认 `2`

生成目录的文件夹最大嵌套深度

### `ignorePattern`: `string` | `RegExp`

默认 `''`

过滤文件夹规则

### `formatter`: `string`

默认 `null`

标题生成规则 

### `generateMd`: `boolean`

默认`true`

是否在对应文件夹下生成`README.md`来存放生成的数据
