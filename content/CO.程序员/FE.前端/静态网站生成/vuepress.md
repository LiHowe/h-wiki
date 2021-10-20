# 使用VuePress构建个人博客

## 1.x

### 开始使用

1. 安装`vuepress`

   ```shell	
   yarn add vuepress -D
   ```

2. 在`package.json`中添加脚本命令

   ```shell
   {
     "scripts": {
       "docs:dev": "vuepress dev .",
       "docs:build": "vuepress build ."
     }
   }
   ```

   > 这里`.`指的是当前目录, 也可以换成当前文件夹名

3. 构建目录结构, 推荐按照官方推荐目录结构来构建

   ```text
   .
   ├── docs
   │   ├── .vuepress (可选的, 用于存放全局的配置、组件、静态资源等。)
   │   │   ├── components (可选的, 该目录中的 Vue 组件将会被自动注册为全局组件)
   │   │   ├── theme (可选的, 用于存放本地主题)
   │   │   │   └── Layout.vue
   │   │   ├── public (可选的, 静态资源目录)
   │   │   ├── styles (可选的, 用于存放样式相关的文件)
   │   │   │   ├── index.styl (将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。)
   │   │   │   └── palette.styl (用于重写默认颜色常量，或者设置新的 stylus 颜色常量。)
   │   │   ├── templates (可选的, 谨慎配置, 存储 HTML 模板文件)
   │   │   │   ├── dev.html (用于开发环境的 HTML 模板文件)
   │   │   │   └── ssr.html (构建时基于 Vue SSR 的 HTML 模板文件)
   │   │   ├── config.ts (可选的, 配置文件的入口文件，也可以是 YML 或 toml)
   │   │   └── enhanceApp.js (可选的, 客户端应用的增强)
   │   │ 
   │   ├── README.md
   │   ├── guide
   │   │   └── README.md
   │   └── config.md
   │ 
   └── package.json
   ```



4. 启动项目测试

   执行`yarn docs:dev`, 项目会运行在 `localhost:8080`, 打开浏览器可查看到项目根目录下`README.md`文件内容

5. 对项目进行基本配置
   1. 在`.vuepress`文件夹下新建`config.ts`文件

   2. 配置`标题(title)`

      ```javascript
      module.export = {
        title: 'H-Wiki'
      }
      ```

      > 更多配置查看官网[配置](https://vuepress.vuejs.org/zh/config/)

   3. 重新查看浏览器即可看见效果

   

### 常用插件

#### 插件用法

在`.vuepress/config.ts`文件中配置`plugins`字段来使用插件, 配置方法有以下几种

1. 本地插件可以使用使用`plugins: [require(./my-plugin.js)]`方式
2. 发布到npm的插件使用`plugins: ['xxx']`方式
3. 如果发布到npm的插件以`vuepress-plugin-`开头, 则可以省略前缀直接使用, 比如`vuepress-plugin-xxx`可以直接用`plugins: ['xxx']`的方式使用

#### active-header-links

页面滚动的时候自动高亮TOC对应链接


## 2.x

### 为什么要升级2.x

1. 想要使用Vue3语法和TypeScript的话
2. 单纯想尝鲜，拥抱变化
3. 想使用`webpack`或者`vite`来作为打包工具

### 基本使用

1. 创建并初始化项目

```shell
mkdir vuepress-demo
cd vuepress-demo
git init
yarn init
```

2. 安装Vuepress
   
```shell
  yarn add -D vuepress@next
```

3. 创建一篇markdown文档
  
这里我们在`docs`文件夹下进行创建（可以自行命名文件夹）, 可以手动进行创建， 也可以使用下面命令快速创建

```shell
echo '# Hello VuePress' >> docs/README.md
```

4. 在`package.json`的`scripts`中添加启动以及打包命令配置

> 这里 docs 对应第3步你所创建的文件夹名称

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

5. 启动本地服务进行测试
   
```shell
yarn docs:dev
```

VuePress会在 http://localhost:8080 启动一个开发服务器， 支持热重载。

### 主题的使用及开发
### 插件的使用及开发
