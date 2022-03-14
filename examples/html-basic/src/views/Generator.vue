<template>
  <div class="case case-1">
    <div class="title">Basic Usage</div>
    <div class="case-body">
      <pre class="code">
        function* gen1() {
          yield (...args) => {
            console.log('step1', ...args)
          }
          yield 
          yield 1
        }
        const g1 = gen1()
      </pre>
      <div class="text-center">
        <button
        class="border border-gray-400 rounded px-2 py-1"
        @click="next1">
        g1.next()
        </button>
      </div>
      <pre>{{ resultDisplay }}</pre>
    </div>
  </div>

  <div class="case case-2">
    <div class="title">Has Return</div>
    <div class="case-body">
      <pre class="code">
        function* gen2() {
          yield 1
          return 2
          yield 3
        }
        const g2 = gen2()
      </pre>
      <div class="text-center">
        <button
        class="border border-gray-400 rounded px-2 py-1"
        @click="next2">
        g2.next()
        </button>
      </div>
      <pre>{{ resultDisplay2 }}</pre>
    </div>
  </div>

  <div class="case case-3">
    <div class="title">Has Params</div>
    <div class="case-body">
      <pre class="code">
        function* gen3(x) {
          var y = 2 * (yield (x + 1));
          var z = yield (y / 3);
          return (x + y + z);
        }
        const g3 = gen3(5)
      </pre>
      <div class="text-center">
        args:<input type="text" v-model="g3input">
        <button
        class="border border-gray-400 rounded px-2 py-1"
        @click="next3">
        g3.next(args)
        </button>
      </div>
      <pre>{{ resultDisplay3 }}</pre>
    </div>
  </div>

  <div class="case case-4">
    <div class="title">yield* another generator</div>
    <div class="case-body">
      <pre class="code">
        function* ogen4(i) {
          yield i + 1
          yield i + 2
        }

        function* gen4(i) {
          yield i
          yield* ogen4(i)
          yield i + 10
        }
        const g4 = gen4(1)
      </pre>
      <div class="text-center">
        <button
        class="border border-gray-400 rounded px-2 py-1"
        @click="next4">
        g4.next()
        </button>
      </div>
      <pre>{{ resultDisplay4 }}</pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRaw } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"

function formatter(e) {
  return `done: ${e.done}, value: ${e.value}\n`
}

function* gen1() {
  yield (...args) => {
    console.log('step1', ...args)
  }
  yield 
  yield 1
}
const gen = gen1()
const result = ref<any[]>([])

const resultDisplay = computed(() => result.value.map(formatter).join(''))

function next1() {
  result.value.push(gen.next())
}

function* gen2() {
  yield 1
  return 2
  yield 3
}
const result2 = ref<any[]>([])
const resultDisplay2 = computed(() => result2.value.map(formatter).join(''))
const g2 = gen2()
function next2() {
  result2.value.push(g2.next())
}

function* gen3(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
const g3 = gen3(5)
const result3 = ref<any[]>([])
const g3input = ref<number>(0)
const resultDisplay3 = computed(() => result3.value.map(formatter).join(''))
function next3() {
  result3.value.push(g3.next(+g3input.value))
}

function* ogen4(i) {
	yield i + 1
	yield i + 2
}

function* gen4(i) {
	yield i
	yield* ogen4(i)
	yield i + 10
}
const g4 = gen4(1)
const result4 = ref<any[]>([])
const resultDisplay4 = computed(() => result4.value.map(formatter).join(''))
function next4() {
  result4.value.push(g4.next())
}

// theory of Generator
const regeneratorRuntime = {
  mark(fn) {
    return fn
  },
  wrap(fn, markedFn) {
    const _context = {
      prev: '',
      next: '',
      sent: '',
      done: false,
      stop(){ }
    }
  }
}

function customGenerator(fn) {
  return regeneratorRuntime.wrap(fn, regeneratorRuntime.mark(fn))
}


</script>

<style scoped lang="postcss">
.case {
  @apply border border-gray-200;
}
.code {
  @apply bg-yellow-100;
}
.case-body {
  @apply grid grid-cols-3;
}
</style>
