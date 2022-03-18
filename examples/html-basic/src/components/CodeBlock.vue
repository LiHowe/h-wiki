<template>
  <div class="code-block border border-gray-200">
    <div class="border-b border-gray-200 px-2 py-1 flex items-center">
      <span class="block-title font-bold"> {{ title }} </span>
      <button class="rounded px-2 py-1 ml-auto bg-emerald-600 text-white hover:bg-emerald-500" @click="runCode"> Run </button>
    </div>
    <div class="grid grid-cols-2">
      <pre ref="pre" class="bg-gray-100" :contenteditable="editable ?? true" :class="`language-${language ?? 'javascript'}`">
        <code v-html="codeDisplay"></code>
      </pre>
      <div class="relative border-l">
        <button class="absolute right-0 top-0 bg-gray-200 px-1 rounded" @click="logs.length = 0">clear</button>
        <code v-for="(log, i) in logs" :key="i" class="block leading-6">
          <span class="text-gray-400 select-none border-r px-2 inline-block bg-gray-100">{{i + 1}}</span> {{ JSON.stringify(log) }}
        </code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import js from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', js)

interface Props {
  code?: string
  language?: string
  editable?: boolean
  title?: string
}
const props = defineProps<Props>()

const emit = defineEmits([
  'run'
])

const logs = ref<string[]>([])

function runCode() {
  const c = () => {
    return {
      ...console,
      log: (...args) => {
        logs.value.push(...args)
        console.log.bind(console, '[Code Output] - ', ...args)
      }
    }
  }
  try {
    const fn = new Function(`
      const console = arguments[0]
      ${props.code}
    `)
    emit('run', fn(c()))
  } catch(e) {
    console.error('[CodeBlock] 执行方法失败', e)
  }
}

const pre = ref<HTMLElement>()

const codeDisplay = computed(() => {
  return hljs.highlight(props.code, { language: props.language ?? 'javascript' }).value
})
</script>

<style lang="postcss">
.code-block +.code-block {
  margin-top: 10px;
}
</style>
