# Chrome Extension
[Declare permissions - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/)

因为Microsoft最新的Edge浏览器也使用的chromium内核， 所以Chrome插件同时适用于 `Google Chrome` 与 `Microsoft Edge` 两款浏览器

## 能力

Chrome

### 覆写页面

Chrome允许我们使用插件覆盖浏览器以下**任一**内置页面(只能选择一种进行覆盖)

- 新标签页: `chrome://newtab` 或 `edge://newtab`
- 历史标签页: `chrome://history` 或 `edge://history`
- 收藏夹页面: `chrome://bookmarks` 或 `edge://favorates`

## Manifest.json

作为拓展的说明文件， 相当于 `package.json`

### 字段说明

- `name` : 插件名称
    - 类型: `string`
- `description` : 插件描述
    - 类型: `string`
- `version` : 插件版本
    - 类型: `string`
- `manifest_version` : 使用的manifest的版本
    - 类型: `number`
- `background` : 插件的进程
    - 类型: `object`
- `permissions` : 插件所需权限
    - 类型: `string[]`
- `action` : 插件页面配置
    - 类型: `object`
- `option_page` : 插件的配置页面路径
    - 类型: `string`
- `chrome_url_overrides` : 用于覆盖浏览器默认页面 * 类型: `string` * 可选覆盖值: * `newtab` : 新标签页 * `history` : 历史记录页 * `bookmarks` : 书签(收藏夹)页 * 格式: `"newtab": "index.html"`
