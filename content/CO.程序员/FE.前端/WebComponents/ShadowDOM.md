# Shadow DOM
> 可以将一个隐藏的,独立的DOM添加到一个元素上
> 是Web Components的关键


## 基本用法

### 将shadow root附加到元素上
如果将mode设置为`closed`, 那么在外部就无法获取该Shadow DOM
```javascript
const root = document.querySelector('#demo')
// root.shadowRoot = #shadow-root (open)
let openShadow = root.attachShadow({ mode: 'open' })
// root.shadowRoot = null
let closedShadow = root.attachShadow({ mode: 'closed' })
```


