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
  title: string
  editable?: boolean
  code: string
  handler?: () => void
}[] = [
  {
    title: '实现Object的 for...of',
    code: `
    const obj = {
      name: 'a',
      age: 1,
      say() {
        console.log('hello')
      },
      // Symbol.iterator 用来实现对象内置 @@iterator 属性
      // 如果没有该实现, 则无法使用 for...of
      // 不实现会报错: Found non-callable @@iterator
      // *[Symbol.iterator]() {
      //   for (const key of Object.keys(this)) {
      //     yield key
      //   }
      // },
      // 上面可以简写成
      *[Symbol.iterator]() {
        yield* Object.keys(this)
      }
    }
    for (const key of obj) {
      console.log(key)
    }
    `
  },
  {
    title: '实现range',
    code: `
    	function range(start, end, step) {
        return {
          [Symbol.iterator]() {
            return this
          },
          next() {
            if (start < end) {
              start += step
              return { value: start, done: false }
            }
            return { value: undefined, done: true }
          }
        }
      }
      // 0 ~ 10, 间隔为 2
      console.log(...range(0, 10, 2))
    `
  }
]
</script>
<style lang="postcss" scoped>

</style>
