<template>
  <div class="z-10 fixed top-0 w-full transition-color duration-200">
    <div class="h-16 mx-auto flex items-center">
      <Logo class="w-16" />
      <Nav class="ml-16" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from '../../components/Logo.vue'
import Nav from './Nav.vue'
</script>
<style scoped lang="scss">

</style>
