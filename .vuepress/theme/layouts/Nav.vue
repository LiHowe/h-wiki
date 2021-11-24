<template>
  <div class="header-nav">
    <nav-link v-for="nav in navbar" :key="nav.text" :data="nav" />
  </div>
</template>
<script lang="ts" setup>
import NavLink from '../components/NavLink.vue'
// @ts-ignore
import { themeData } from '@temp/internal/themeData'
const { navbar } = themeData
</script>
