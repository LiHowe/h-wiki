<template>
  <div>

  </div>
</template>

<script setup lang="ts">
let a = Symbol('a')
let b = Symbol('a')
console.log(a === b) // false
a = Symbol('a')
b = Symbol.for('a')
console.log(a === b) // false
a = Symbol.for('a')
b = Symbol.for('a')
console.log(a === b) // true




</script>
