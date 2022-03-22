<template>
  <ul class="layout-nav nav-side">
    <li
      class="rounded border bg-blue-500 text-white px-2 py-1 cursor-pointer"
      :class="{'bg-blue-700': i === currentIdx}"
      v-for="(c, i) in components"
      :key="c.label"
      @click="changeCurrent(c, i)"
    >{{ c.label }}</li>
  </ul>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

interface NavItem {
  label: string
  component?: Function
  children?: NavItem[]
}

const components: NavItem[] = [
  {
    label: '鼠标事件',
    component: defineAsyncComponent(() => import('../views/MouseEvent.vue'))
  },
  {
    label: 'Generator',
    component: defineAsyncComponent(() => import('../views/Generator.vue'))
  },
  {
    label: 'Object',
    children: [
      {
        label: '对象继承',
        component: defineAsyncComponent(() => import('../views/Object/ObjectExtends.vue'))
      },
      {
        label: 'Call,Bind,Apply',
        component: defineAsyncComponent(() => import('../views/Object/ObjectCallApply.vue'))
      },
      {
        label: '循环对象',
        component: defineAsyncComponent(() => import('../views/Object/ObjectKeyLoop.vue'))
      },
      {
        label: '创建对象',
        component: defineAsyncComponent(() => import('../views/Object/ObjectCreate.vue'))
      },
      {
        label: '迭代器',
        component: defineAsyncComponent(() => import('../views/Object/ObjectIterator.vue'))
      },
    ]
  },
  {
    label: '节流, 防抖',
    component: defineAsyncComponent(() => import('../views/Function/ThrottledDebounce.vue'))
  },
  {
    label: '精准定时器',
    component: defineAsyncComponent(() => import('../views/Function/Timeout.vue'))
  }
]

const emit = defineEmits([
  'change'
])

const currentIdx = ref(0)

function changeCurrent(c, idx: number) {
  currentIdx.value = idx
  emit('change', c)  
}

</script>
<style lang="postcss" scoped>
.layout-nav {
  @apply h-full overflow-x-hidden overflow-y-auto;
}
</style>
