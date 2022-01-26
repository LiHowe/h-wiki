<template>
  <div class="wiki-header">
    <div>
      <Logo />
      <Nav />
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './Logo.vue'
import Nav from './Nav.vue'
</script>
<style scoped lang="scss">
.wiki-header {
  @apply z-10 sticky top-0 w-full;
}
</style>
