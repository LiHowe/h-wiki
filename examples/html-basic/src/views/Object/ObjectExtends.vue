<template>
  <div class="object-extends" ref="el">
    <div class="code-block">
      <p>
        <b>原型链继承</b>
      </p>
      <pre contenteditable data-case="1">
        function A(alias = ['a', 'A']) { this.alias = alias }
        function B() {}
        B.prototype = new A() // 覆盖原型
        B.prototype.constructor = B // 覆盖构造函数

        let b1 = new B()
        let b2 = new B()
        console.log(b1.alias) // ['a', 'A']
        b1.alias.push('b1')
        console.log(b1.alias) // ['a', 'A', 'b1']
        console.log(b2.alias) // ['a', 'A', 'b1'], 被同步修改了
      </pre>
    </div>
    <div class="code-block">
      <p>
        <b>构造函数继承</b>
      </p>
      <pre contenteditable data-case="2">
        function A(alias = ['a', 'A']) { this.alias = alias }
        function B(name) {
          this.name = name
          A.call(this)
        }
        let b = new B('b')
        console.log(b.name) // b
        console.log(b.alias) // ['a', 'A']
        console.log(b.__proto__ === A.prototype) // false
      </pre>
    </div>
    <div class="code-block">
      <p>
        <b>组合继承 (原型链继承 + 构造函数继承)</b>
      </p>
      <pre contenteditable data-case="2">
        function A(alias = ['a', 'A']) { this.alias = alias }
        function B(name) {
          this.name = name
          A.call(this)
        }
        B.prototype = new A()
        B.prototype.constructor = A
        let b = new B('b')
        console.log(b.name) // b
        console.log(b.alias) // ['a', 'A']
        console.log(b.__proto__ === A.prototype) // true
      </pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
function runCode(code: string | (() => string)) {
  if (!code) return
  if (code instanceof Function) code = code()
  try {
    eval(code)
  } catch(e) {
    console.error('eval error:', e)
  }
}

const el = ref<HTMLElement>()

onMounted(() => {
  for (const i in el.value.children) {
    const target = el.value.children[i]
    if (target.className === 'code-block') {
      const btn = document.createElement('button')
      btn.addEventListener('click', () => {
        runCode(target.children[1].textContent)
      })
      btn.classList.add('exec-btn')
      btn.innerHTML = 'Run Code'
      target.appendChild(btn)
    }
  }
})
</script>

<style lang="postcss">

.object-extends .code-block {
  @apply border border-gray-200 rounded p-2;
}
.object-extends .exec-btn {
  @apply bg-emerald-600 text-white rounded px-2 py-1;
}
</style>
