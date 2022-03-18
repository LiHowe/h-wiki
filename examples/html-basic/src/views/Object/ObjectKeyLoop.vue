<template>
  <code-block
  v-for="(block, i) in blocks"
  :key="i"
  :code="block.code"
  :title="block.title"
  @run="block.handler"
  />
</template>

<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'

const blocks: {
  code: string,
  title: string,
  handler?: () => any
}[] = [
  {
    title: 'for...in',
    code: `
      let obj = {
        0: 'a',
        1: 'b',
        2: 'c'
      }
      const keys = Object.keys(obj)
      for (let i in keys) {
        console.log(obj[keys[i]])
      }
    `
  },
  {
    title: 'for...of',
    code: `
       let obj = {
        0: 'a',
        1: 'b',
        2: 'c'
      }
      for (let [key, value] of Object.entries(obj)) {
        console.log(value)
      }
    `
  },
  {
    title: 'Iterator',
    code: `
    let obj = {
      0: 'a',
      1: 'b',
      2: 'c'
    }
    // 因为 obj 无法直接使用 for...of 来循环
    // 实现迭代器接口
    obj[Symbol.iterator] = Array.prototype[Symbol.iterator]
    // 还需要设置length属性, 否则无效
    obj.length = 3
    // 如果length设置比实际长度大, 超出的部分会输出undefined
    for (let item of obj) {
      console.log(item)
    }
    `
  }
]

</script>
