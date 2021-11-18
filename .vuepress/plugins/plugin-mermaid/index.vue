<template>
  <div class="mermaid-wrapper" ref="el">
    <slot></slot>
  </div>
</template>
<script setup>
import { htmlUnescape } from '@vuepress/shared'
import { nanoid } from 'nanoid'
import { useSlots, ref, onBeforeMount } from 'vue'

function getMermaid () {
  return new Promise(resolve => {
    if (window.__mermaid) {
      resolve(window.__mermaid)
      return
    }
    import('mermaid').then(({ default: Mermaid }) => {
      window && (window.__mermaid = Mermaid)
      Mermaid.mermaidAPI.initialize({
        startOnLoad: false,
        theme: 'default',
      })
      resolve(Mermaid)
    })
  })

}

const el = ref(null)

onBeforeMount(async () => {
  const Mermaid = await getMermaid()
  const content = el.value.children[0].innerHTML
  const formatted = htmlUnescape(content)
  el.__origin_code = formatted
  try {
    Mermaid.mermaidAPI.render('mermaid_' + nanoid(4), formatted, svgCode => {
      el.value.innerHTML = svgCode
    })
  } catch (err) {}
})

</script>
