<template>
  <div class="button__copy" ref="btn" :data-clipboard-target="`#${uid}`">
    <!-- {{ status ? 'Success' : 'Copy'}} -->
    <svg class="icon" aria-hidden="true" :style="{color: status ? '#00a001': '#fff'}">
      <use :xlink:href="`#icon-${!status ? 'fuzhi' : 'check'}`"></use>
    </svg>
  </div>
</template>
<script setup>
import Clipboard from 'clipboard'
import {onMounted, reactive, ref} from 'vue'

const status = ref(0)
const btn = ref(null)

const data = reactive({
  clipInstance: null
})

onMounted(() => {
  data.clipInstance = new Clipboard(btn.value)
  data.clipInstance.on('success', event => {
    console.log('copy success')
    event.clearSelection()
    status.value = 1
    // 2s 后还原状态
    window.setTimeout(() => {
      status.value = 0
    }, 1500)
  })
  data.clipInstance.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  })
})

</script>
<style lang="scss">
.button__copy {
  @apply
    cursor-pointer
    bg-gray-700 hover:bg-gray-600
    text-gray-100 dark:text-gray-200
    rounded text-sm shadow-md font-bold
    absolute p-2 bottom-0 right-0
    transition-all
    duration-150
    flex items-center justify-center;
}
</style>
