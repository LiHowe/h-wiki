---
home: true
heroImage: https://images.unsplash.com/photo-1594031245755-1ac99bbc7a3c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80
heroText: Howe's Blog
tagline: false
footer: Howe | Explore World | Made with ❤️ in China · 2020 - 2021
---

<img :src="url" />

<script>
import axios from 'axios'
import { reactive, ref, onBeforeMount, onMounted, h } from 'vue'

export default {
  setup () {
    const url = ref('')
    const params = new URLSearchParams()
    params.set('client_id', 'ecKBFHfCx9wueN4g1RdHhDcuVkGZXA7dzJF_9nEzyUo')
    params.set('query', 'code')
    params.set('orientation', 'landscape')
    onBeforeMount(async () => {
      const res = await axios.get('https://api.unsplash.com/photos/random?' + params.toString())
      url.value= res.data.urls.regular
      console.log('url is', url.value)
    })
    return {
      url
    }
  }
}
</script>
<style>
  .home .hero img{
    margin: 0;
  }
</style>
