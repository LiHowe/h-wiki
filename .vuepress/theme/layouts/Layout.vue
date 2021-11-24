<template>
  <Header />
  <Page />
  <Footer />
</template>
<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
import Page from './Page.vue'
// @ts-ignore
import { themeData } from '@temp/internal/themeData'

console.log(themeData)
</script>
<style lang="scss">
@import '../styles/index.scss';
</style>
