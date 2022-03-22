<template>
  <div class="timer-block offset-timer">
    <p>Offset timer delay 500ms</p>
    <button class="btn" @click="offset.start">start</button>
    <button class="btn" @click="offset.end">end</button>
    <div>
      <p>
        <span>实际时间:</span>
        <span>{{ state.real }}ms</span>
      </p>
      <p>
        <span>期望时间:</span>
        <span>{{ state.ideal }}ms</span>
      </p>
      <p>
        <span>差异值:</span>
        <span>{{ state.diff }}ms</span>
      </p>
    </div>
  </div>
  <div class="timer-block worker-timer">
    <p>Worker Timer</p>
    <button class="btn" @click="runWorkerTimer">Run WorkerTimer</button>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity"


function offsetTimer(delay = 500) {
  let start = Date.now()
  const state = reactive({
    counter: 1,
    real: 0, // 实际时间
    ideal: 0, // 理想时间
    diff: 0, // 差异
    timer: null
  })
  
  function f() {
    state.ideal = state.counter * delay
    state.real = Date.now() - start
    state.counter++
    state.diff = state.ideal - state.real
    state.timer = setTimeout(f, delay - state.diff)
  }
  state.timer = setTimeout(f, delay)
  return state
}

const state = ref({})

const offset = {
  start: () => {
    state.value = offsetTimer(500)
  },
  end: () => {
    clearTimeout(state.value.timer)
    state.value = {}
  }
}


/**
 * 使用worker实现定时器
 * @param fn 
 * @param delay 
 */
function createWorkerTimer(fn, delay) {
  function createWorker(fn, options?) {
    const blob = new Blob([`(${fn.toString()})()`])
    const url = URL.createObjectURL(blob)
    return new Worker(url, options ?? {})
  }

  const worker = createWorker(() => {
    onmessage = function(e) {
      const date = Date.now()
      while(1) {
        const now = Date.now()
        if (now - date >= e.data) {
          postMessage(1)
          return
        }
      }
    }
  })

  function timer (fn, delay) {
    worker.onmessage = function (e) {
      fn()
      worker.postMessage(delay)
    }
    worker.postMessage(delay)
  }
  timer(fn, delay)
}

function runWorkerTimer() {
  const start = Date.now()
  const workerTimer = createWorkerTimer(() => {
    console.log('worker timer', Date.now() - start)
  }, 500)
}

</script>
<style lang="postcss" scoped>

</style>
