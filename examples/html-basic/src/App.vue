<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
const components = [
  {
    label: '鼠标事件',
    component: defineAsyncComponent(() => import('./views/MouseEvent.vue'))
  },
  {
    label: 'Generator',
    component: defineAsyncComponent(() => import('./views/Generator.vue'))
  },
  {
    label: '对象继承',
    component: defineAsyncComponent(() => import('./views/Object/ObjectExtends.vue'))
  }
]

const current = ref(0)

const currentComponent = computed(() => components[current.value])

function changeCurrent (i) {
  current.value = i
}
</script>

<template>
  <div class="com-selector">
    <button
      class="rounded border bg-blue-500 text-white px-2 py-1"
      :class="{'bg-blue-700': i === current}"
      v-for="(c, i) in components"
      :key="c.label"
      @click="changeCurrent(i)"
    >{{ c.label }}</button>
  </div>
  <div>
    <h1 class="text-center text-lg font-bold">{{ currentComponent.label }}</h1>
    <component :is="currentComponent.component" />
  </div>
</template>
