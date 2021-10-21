---
home: true
heroImage: https://images.unsplash.com/photo-1594031245755-1ac99bbc7a3c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80
heroText: Howe's Blog
tagline: false
footer: Made with ❤️ in China · 2020 - 2021
---
# Howe's Blog

使用 `VuePress2.x` 构建, 重构于上一个未完成的博客(使用`nuxt`构建).

将会通过`netlify`进行部署, 配合阿里DNS解析

## 目录结构

```text

|- .obsidian        <- 本地markdown编辑器Obsidian配置
|- .script          <- 打包脚本等
|- .vuepress        <- vuepress 相关配置
|- .yarn            <- yarn3配置
|- content          <- Markdown内容

```

## TODO

目前不知道如何debug plugin
https://api.unsplash.com/photos/random?client_id=ecKBFHfCx9wueN4g1RdHhDcuVkGZXA7dzJF_9nEzyUo

<img :src="url" />

<script>
import axios from 'axios'
import { reactive, ref, onBeforeMount, onMounted, h } from 'vue'

export default {
  setup () {
    const url = ref('')
    onBeforeMount(async () => {
      const res = await axios.get('https://api.unsplash.com/photos/random?client_id=ecKBFHfCx9wueN4g1RdHhDcuVkGZXA7dzJF_9nEzyUo')
      url.value= res.data.urls.regular
      console.log('url is', url.value)
    })
    return {
      url
    }
  }
}
</script>
