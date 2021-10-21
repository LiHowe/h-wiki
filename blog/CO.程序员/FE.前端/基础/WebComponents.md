---
category: code
layout: blog
title: Web Components
date: 07/14-2021 19:19
coverImage: https://i.loli.net/2021/07/14/ETVM6kWUOl2der8.png
thumbnail: https://i.loli.net/2021/07/14/CRH7u4YoUXrM5m6.png
tags:
  - JavaScript
  - HTML
description: Web Components 的简单介绍以及使用
stick: false
wip: false

---

Web Components主要由三项主要技术组成

1. Custom elements
2. Shadow DOM
3. HTML templates and slots

## Custom elements

HTML自定义标签, 可以将页面功能封装为自定义标签来进行复用而并非疯狂CV(复制粘贴)

### 使用

使用`customElements.define(name, customClass, options?)`方法来注册一个自定义元素

+ name: 自定义元素名, **必须**使用`-`进行分隔以便于原生标签名称进行区分, 如`custom-span`
+ customClass: 自定义类, 用于编写自定义元素逻辑
+ options: 非必须参数, 包含一个属性`extends`, `extends`表明该元素继承自哪个内置元素

根据注册方法中`options`的`extends`参数的有无, 可以将自定义元素分为两类

+ Autonomous custom elements: 独立自定义元素, 不依赖任何内置元素(即, 没有extends)
+ Customized built-in elements: 依赖于内置元素的自定义元素(即extends了内置元素)

比如我们创建一个简单的可以用于显示大写字母的自定义标签`uppercase-span`, 继承自内置的`span`标签

```javascript
class UppercaseSpan extends HTMLSpanElement {
    constructor () {
        super() // 必须调用
        this.innerHTML = this.innerHTML.toUpperCase()
    }
}
customElements.define('uppercase-span', UppercaseSpan, { extends: 'span' })
```

```html
<uppercase-span>this sentence will be convert to uppercase</uppercase-span>
<!-- 或者使用下面的形式👇 -->
<span is="uppercase-span">this sentence will be convert to uppercase</span>
```

### 生命周期钩子函数

自定义元素具有4个生命周期钩子

+ `connectedCallback`: 当 custom element 首次被插入文档DOM时
+ `disconnectedCallback`: 当 custom element 从文档DOM中删除时
+ `adoptedCallback`: 当 custom element 被移动到新的文档时
+ `attributeChangedCallback`: 当 custom element 增加、删除、修改自身属性时, 接收参数有3个, 分别为属性名称(name), 旧值(oldVal), 新值(newVal)
  该钩子函数需要配合`observedAttributes`属性使用, 否则无法监听

```javascript
class UppercaseSpan extends HTMLElement {
    constructor () {
        super()
    }
    static get observedAttributes () {
        return ['text']
    }
    connectedCallback () {
        console.log('自定义元素首次被插入到文档DOM中')
        this.convert()
    }

    disconnectedCallback () {
        console.log('自定义元素从文档DOM中删除')
    }

    adoptedCallback () {
        console.log('自定义元素被移动到新的文档')
    }

    attributeChangedCallback (name, oldVal, newVal) {
        console.log('自定义元素增加、删除、修改自身属性', name, oldVal, newVal)
        if (oldVal !== newVal) this.convert()
    }

    convert () {
        // this.span.innerHTML = this.getAttribute('text').toUpperCase()
        const text = this.getAttribute('text') || ''
        this.innerHTML = `${text}  -> ${text.toUpperCase()}`
    }
}
```

## Shadow DOM

Shadow DOM 允许我们将隐藏的DOM树添加到常规的DOM树中  
Shadow DOM以 `shadow root` 为起始根节点, 在该节点内进行内容填充.

### 特有术语

+ Shadow host: 一个常规的DOM节点, Shadow DOM会被添加到该节点下(相当于Shadow DOM寄生于该节点)
+ Shadow Tree: Shadow DOM内部的DOM树
+ Shadow boundary: Shadow DOM结束的地方
+ Shadow root: Shadow tree的根节点

### 优势

1. Shadow DOM是独立的DOM

   `document.querySelector()`等DOM查询方法无法获取到Shadow DOM内的元素

2. 具有CSS作用域(scoped CSS)

   在Shadow DOM内部的CSS定义不会影响外部的元素样式

3. 基于第二点, 在class或id起名的时候就会减少很多负担, 同时可以使用一些简单的选择器而不必担心冲突
4. 组件化, Shadow DOM是实现WebComponent的主要技术之一, 这样就可以进行一些原生的web组件开发而达到复用的效果

### 用法

使用`Element.attachShadow(options)`来为对应Element添加一个`shadow root`.  
`options`对象有一个`mode`属性, 可选值为

+ open: 可以从外部获取元素的`shadowRoot`属性. (`Element.shadowRoot` 为 `#shadow-root (open)`)
+ closed: 不可以从外部获取元素的`shadowRoot`属性. (`Element.shadowRoot` 为 `null`)

注: 自闭合标签无法添加shadow DOM, 如`img`

```javascript
const divEl = document.querySelector('.demo-1')
divEl.attachShadow({ mode: 'open' })
```

## Template and slots

当我们遇到重复的HTML结构的时候可以使用`template`来进行结构复用, 但是有时候我们需要改变模板中的部分值进行复用, 这时候我们可以改造`template`, 为其添加`slot`插槽来提高其灵活度

```html
 <template id="demo-template">
    <p>this tag is from demo-template</p>
</template>

<script>
    const template = document.querySelector('#demo-template')
    document.body.appendChild(template.content)
</script>
```

`template`通常搭配Web Component一起使用

```html
<template id="demo-template">
    <p>this tag is from demo-template</p>
    <slot name="my-slot">
        <!-- 在未设置插槽的时候显示的默认值 -->
        <span>this is default slot span tag</span>
    </slot>
</template>

<!-- 未使用插槽 -->
<my-section></my-section>

<my-section>
    <button>Slot Button</button>
</my-section>

<script>
    customElements.define('my-section', class MySection extends HTMLElement {
        constructor () {
            super()
            const template = document.querySelector('#demo-template')
            const templateContent = template.content
            const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(templateContent)
        }
    })
</script>
```

## 例

我们结合使用Custom Element, Shadow DOM与 Template来写一个简单的卡片组件`custom-card`

+ 接受`title`参数来显示标题
+ 接受`plain`来改变样式
+ 接受插槽来自定义卡片内容

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ExWopOj" data-user="lihowe" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/lihowe/pen/ExWopOj">
  Web Components Demo</a> by Howe (<a href="https://codepen.io/lihowe">@lihowe</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

1. 模板`template`

    ```html
    <template id="card">
        <div class="card">
            <div class="card-title">
                <span class="title-content"></span>
            </div>
            <div class="card-body">
                <slot name="card-body">
                    <span>这是默认卡片内容</span>
                </slot>
            </div>
        </div>
        <style>
            .card {
                border-radius: 4px;
                overflow: hidden;
                width: 300px;
                border: 1px solid #e4e4e4;
                box-shadow: 0 0 4px #d0d0d0;
                color: rgb(94, 94, 94);
                margin-bottom: 10px;
            }
            .card.plain {
                box-shadow: none;
            }
            .card .card-title {
                font-weight: bold;
                line-height: 1.5;
            }
            .card .card-title.with-title {
                border-bottom: 1px solid #e4e4e4;
                padding: 5px;
            }
            .card .card-body {
                padding: 10px;
            }
        </style>
    </template>
    ```

2. 元素逻辑

    ```javascript
    class CustomCard extends HTMLElement {
        
        static get observedAttributes () {
            return ['title', 'plain']
        }

        constructor () {
            super()
            const template = this._getEl('#card')
            const templateContent = template.content
            this.attachShadow({ mode: 'open' }).appendChild(templateContent.cloneNode(true))
        }

        attributeChangedCallback (name, oldVal, newVal) {
            const fnMapping = {
                title: this.handleTitleChange,
                plain: this.handlePlainChange
            }
            if (oldVal !== newVal) {
                fnMapping[name](newVal)
            }
        }

        handleTitleChange = (val) => {
            if (!val) val = this.getAttribute('title')
            const titleEl = this._getSelfEl('.title-content')
            if (val) this._getSelfEl('.card-title').classList.add('with-title')
            titleEl.innerText = val
        }

        handlePlainChange = (flag) => {
            if (flag == '') flag = true
            const body = this._getSelfEl('.card')
            console.log('enter handle plain change, flag is ', flag, body)
            body.classList[flag ? 'add': 'remove']('plain')
        }

        /**
         * @param {String} selector 
         * @returns {HTMLElement}
         */
        _getEl (selector) {
            return document.querySelector(selector)
        }

        /**
         * @param {String} selector 
         * @returns {HTMLElement}
         */
        _getSelfEl (selector) {
            return this.shadowRoot.querySelector(selector)
        }
        
    }

    customElements.define('custom-card', CustomCard)
    ```

3. 测试

    ```html
    <custom-card title="测试卡片" class="custom-card">
        <div slot="card-body">
            <input type="text" id="title-input" placeholder="请输入卡片标题进行修改">
            <button id="btn_change-title">改变标题</button>
        </div>
    </custom-card>
    
    <custom-card title="默认卡片"></custom-card>
    
    <custom-card>
        这段文字不会渲染
        <div slot="card-body">这是使用了文字插槽的无title卡片</div>
    </custom-card>
    
    <custom-card plain>
        <div slot="card-body">这是plain卡片</div>
    </custom-card>
    <script>
        const changeTitleButton = document.querySelector('#btn_change-title')
        changeTitleButton.addEventListener('click', () => {
            const card = document.querySelector('custom-card')
            card.setAttribute('title', document.querySelector('#title-input').value)
        })
    </script>
    ```

## 相关链接

[MDN - Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

[JSInfo - Web Components](https://zh.javascript.info/web-components)
