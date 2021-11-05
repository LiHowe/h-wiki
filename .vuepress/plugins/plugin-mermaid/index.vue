<template>
  <div class="mermaid-wrapper" ref="el">
    <slot></slot>
  </div>
</template>
<script setup>
import Mermaid from 'mermaid'
import { decode } from './utils'
import { nanoid } from 'nanoid'
import { useSlots, ref, onMounted} from 'vue'

const mermaid = Mermaid.mermaidAPI.initialize({
  startOnLoad: false,
  theme: 'default',
})

const props = defineProps({
  content: {
    type: String,
    default: '',
    required: true
  }
})

const el = ref(null)

const slots = useSlots()

onMounted(() => {
  const content = el.value.children[0].innerHTML
  const formatted = decode(content)
  el.__origin_code = formatted
  try {
    Mermaid.mermaidAPI.render('mermaid_' + nanoid(4), formatted, svgCode => {
      el.value.innerHTML = svgCode
    })
  } catch (err) {}
})

</script>
