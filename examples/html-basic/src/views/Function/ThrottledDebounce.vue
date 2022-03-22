<template>
  <div>
    <button class="rounded px-2 py-1 bg-teal-500 text-white" @click="debounce">Debounce 2s</button>
    <button class="rounded px-2 py-1 bg-teal-500 text-white ml-1" @click="throttle">Throttle 2s</button>
  </div>
</template>

<script setup lang="ts">
  // 节流: 如果函数在n秒内重复触发，只会执行一次
  function throttled (fn, delay) {
    let timer = null
    let startTime = Date.now()
    return function () {
      let curTime = Date.now()
      // 剩余时间
      let remaining = delay - (curTime - startTime)
      const context = this
      clearTimeout(timer)
      // 如果剩余时间小于0，则执行
      if (remaining <= 0) {
        fn.apply(context, arguments)
        startTime = Date.now()
      } else {
        // 否则重新计时
        timer = setTimeout(() => {
          fn.apply(context, arguments)
        }, remaining)
      }
    }
  }
  // 防抖: 在n秒后执行函数， 如果n秒内被重复触发，则重复计时。
  function debounced (fn, delay, immediate: boolean = false) {
    let timer: any = null
    return function () {
      let context = this
      // 立即执行
      if (immediate) fn.apply(context, arguments)
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, arguments)
      }, delay)
    }
  }

  const debounce = debounced(() => {
      console.log('debounced')
    }, 2000)


  const throttle = throttled(() => {
      console.log('throttle')
    }, 2000)
</script>

<style lang="postcss" scoped>

</style>
