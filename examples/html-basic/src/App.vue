<script setup>
import NavSide from './layout/NavSide.vue'
import Content from './layout/Content.vue'
import { computed, defineAsyncComponent, ref, shallowRef } from 'vue'

const currentComponent = shallowRef({})

function changeNav (navItem) {
  currentComponent.value = navItem
}

</script>

<template>
  <div class="app">
    <NavSide class="col-span-1" @change="changeNav"/>
    <Content class="col-span-4">
      <component :is="currentComponent.component" />
    </Content>
  </div>
  <!-- <div class="com-selector">
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
  </div> -->
</template>
<style lang="postcss">
.app {
  @apply grid grid-cols-5 gap-2;
  height: 100vh;
  width: 100vw;
}
</style>
