<template>
  <!-- normal router link -->
  <router-link v-if="!isRouterLink" :to="nav.link" class="nav-item">
    {{ nav.text }}
  </router-link>
  <!-- if is website -->
  <a v-else :href="nav.link" target="_blank" class="nav-item nav-item__link">
    {{ nav.text }}
  </a>
</template>
<script lang="ts" setup>
import { isLinkHttp, isLinkMailto, isLinkTel } from '@vuepress/shared'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const nav = props.data

const isRouterLink = isLinkHttp(nav.link)
</script>
<style scoped lang="pcss">
.nav-item {
  @apply no-underline text-xs;
  & + .nav-item {
    @apply ml-2;
  }
  &__link {

  }
}
</style>
