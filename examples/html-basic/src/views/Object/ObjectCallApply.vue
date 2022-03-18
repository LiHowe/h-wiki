<template>
  <div class="">
    <button @click="runDemo">Run Demo</button>
  </div>
</template>
<script setup lang="ts">

Function.prototype.customBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }
  // 获取除context之外的参数列表
  const args = Array.prototype.slice.call(arguments, 1)
  // 存储原函数
  const fToBind = this
  // 新函数
  const fBound = function(...restArgs) {
    return fToBind.call(
      this instanceof fBound ? this : Object(context), // 避免多次绑定 或 绑定基本类型
      ...args,
      ...restArgs
      )
  }
  // 继承原型
  if (fToBind.prototype) {
    fBound.prototype = Object.create(fToBind.prototype)
  }
  return fBound
}

const runDemo = () => {
  // function f() { console.log(this) }
  // const user = { f: f.bind(null) }
  // user.f()
  function foo() { 
    console.log(this.name)
  }
  foo.a = 1
  foo.__proto__.b = 2
  let f = foo.bind({ name: 'a' })
  console.log(foo.a) // 1
  console.log(f.a) // undefined

  console.log(foo.b) // 2
  console.log(f.b) // 2
}

</script>
