<template>
  <div class="layout-content">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="postcss" scoped>
.layout-content {
  @apply h-full overflow-auto;
}
</style>
