
<template>
  <code-block
  v-for="(block, i) in blocks"
  :key="i"
  :code="block.code"
  :title="block.title"
  :editable="block.editable"
  @run="block.handler"
  />
</template>

<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'

const blocks: {
  code: string,
  title: string,
  handler?: () => void,
  editable?: boolean
}[] = [
  {
    code: `
      const a = {}
      a.name = 'a'
      a.getName = function() {
        return this.name
      }
      console.log(a)
      console.log(Object.keys(a))
    `,
    title: '字面量创建'
  },
  {
    code: `
    const a = Object.create(null)
    a.name = 'a'
    a.getName = function() {
      return this.name
    }
    console.log(a)
    console.log(Object.keys(a))
    `,
    title: 'Object.create'
  },
  {
    code: `
    function A(name = 'a') {
      this.name = name
      this.getName = function() {
        return this.name
      }
    }
    const a = new A()
    console.log(a)
    console.log(Object.keys(a))
    `,
    title: '构造函数'
  },
  {
    title: '组合模式',
    code: `
    function A(name = 'a') {
      this.name = name
    }
    A.prototype = {
      constructor: A,
      getName: function() {
        console.log(this.name)
      }
    }
    const a = new A()
    console.log(a)
    console.log(Object.keys(a))
    `
  },
  {
    code: `
    function createA(name = 'a') {
      const obj = {}
      obj.name = name
      obj.getName = function() {
        return this.name
      }
      return obj
    }
    const a = createA()
    console.log(a)
    console.log(Object.keys(a))
    `,
    title: '工厂模式'
  },
  {
    title: '原型模式',
    code: `
    function A() {}
    A.prototype.name = 'a'
    A.prototype.getName = function() { return this.name }
    const a = new A()
    console.log(a)
    console.log(Object.keys(a))
    `
  },
  {
    title: '动态原型模式',
    code: `
    function A(name = 'a') {
      this.name = name
      if (typeof this.getName !== 'function') {
        A.prototype.getName = function() {
          console.log(this.name)
        }
      }
    }
    const a = new A()
    console.log(a)
    console.log(Object.keys(a))
    `
  },
  {
    title: 'ES6 Class方式',
    code: `
    class A {
      constructor(name = 'a') {
        this.name = name
      }
      #getName() {
        return this.name
      }
    }
    const a = new A()
    console.log(a)
    console.log(Object.keys(a))
    `
  }
]
blocks.map(item => {
  item.editable = true
  return item
})

</script>
<style lang="postcss" scoped>

</style>
