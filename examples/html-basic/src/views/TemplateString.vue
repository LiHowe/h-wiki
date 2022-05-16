<template>
  <div class="">
    {{ html`This is String ${name} ${age} \n After Expersion` }}
  </div>
</template>
<script setup lang="ts">

const name = 'a'

const age = 12

function html(strings, ...exp) {
  console.log({ strings, exp })
  return strings
}

</script>
