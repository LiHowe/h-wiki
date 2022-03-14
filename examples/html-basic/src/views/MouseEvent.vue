<template>
  <div class="outer" ref="outer">
    <div class="inner text-center" ref="inner">
      <p><strong>Inner</strong></p>
      <p>width: 200px;</p>
      <p>height: 200px;</p>
      <p>border: 20px solid hsl(34, 44%, 69%);</p>
    </div>
  </div>
  <div>
    <p>按键情况:</p>
    <div class="ctrl btn-key" :class="{active: winPos.ctrlKey}">
      Ctrl
    </div>
    <div class="alt btn-key" :class="{active: winPos.altKey}">
      Alt
    </div>
    <div class="meta btn-key" :class="{active: winPos.metaKey}">
      Meta
    </div>
  </div>
  <div class="tooltip" ref="tooltip">
    <ul>
      <p>Inner Event Position</p>
      <li v-for="a in attr" :key="a">
        <strong>{{ a }}:</strong>
        <span class="num">{{ pos[a] }}</span>
      </li>
    </ul>
    <ul>
      <p>Window Position</p>
      <li v-for="a in attr" :key="a">
        <strong>{{ a }}:</strong>
        <span class="num">{{ winPos[a] }}</span>
      </li>
    </ul>
  </div>
</template> 
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const outer = ref(null)
const inner = ref(null)
const tooltip = ref(null)

const data = reactive({
  pos: {},
  winPos: {}
})

const pos = computed(() => data.pos)
const winPos = computed(() => data.winPos)

const attr = [
  'clientX',
  'layerX',
  'offsetX',
  'screenX',
  'x',
  'clientY',
  'layerY',
  'offsetY',
  'screenY',
  'y'
]


onMounted(() => {
  
  const innerListerner = e => {
    data.pos = e
  }
  inner.value.addEventListener('mousemove',innerListerner)
  const windowsListener = e => {
    data.winPos = e
  }
  window.addEventListener('mousemove', windowsListener)
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', windowsListener)
  })
})

</script>
<style scoped>
.outer {
  width: 300px;
  height: 300px;
  padding: 20px;
  border: 1px solid hsl(34, 100%, 25%);
  overflow: auto;
}
.inner {
  width: 200px;
  height: 200px;
  border: 20px solid hsl(34, 44%, 69%);
  background: hsl(34, 100%, 25%);
}
.num {
  color: rgb(0, 153, 255);
}
.tooltip {
  width: 400px;
  display: grid;
  grid-template-columns: auto auto;
}
.btn-key {
  width: 60px;
  height: 35px;
  border-radius: 4px;
  background: hsl(197, 83%, 44%);
  color: white;
  line-height: 35px;
  text-align: center;
  display: inline-block;
  margin-right: 10px;
}
.btn-key.active {
  background: hsl(197, 83%, 34%)
}
</style>
