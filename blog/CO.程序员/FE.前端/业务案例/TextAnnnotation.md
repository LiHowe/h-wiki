---
category: code
layout: blog
title: 基于Vue的文本标注组件的简单实现
date: 07/05-2021 10:19
coverImage: https://i.loli.net/2021/07/05/IowQZ1x28eJKOap.png
thumbnail: https://i.loli.net/2021/07/05/IowQZ1x28eJKOap.png
tags:
  - JavaScript
  - Vue
  - AI
description: 基于Vue的文本标注组件的简单实现
stick: false
wip: false

---

## 介绍

文本标注主要应用于人工智能领域的NLP方向，是对文本进行特征标记的过程，对文本打上具体的元数据标签。  
本文讲的组件实现主要是针对于文字打标, 组件构成也就分为两个主体部分:
1. 标签列表与选择
2. 文本以及标签的显示

## 1. 标签列表与选择组件(dropdown)

<img src="https://i.loli.net/2021/07/05/7CtjoILOByYlH38.png" style="width: 200px" on-error="this.src = 'https://howe-blog.oss-cn-hangzhou.aliyuncs.com/7CtjoILOByYlH38.png'" />

为组件的`props`添加标签参数`labels`，用于接收标签数据。
具体的标签结构可以根据自己的需求进行定义，我这里使用的标签结构为`{ text: string, backgroundColor: string }`的形式

```jsx
import './searchDropdown.less'
export default {
  name: 'SearchDropdown',
  props: {
    labels: {
      type: Array,
      default: () => [],
      required: true
    },
    show: {
      type: Boolean,
      default: false,
    },
    // 位置信息
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    labelSearchParam: ''
  }),
  watch: {
    show () {
      this.labelSearchParam = ''
    }
  },
  computed: {
    copiedLabels () {
      return this.labels.filter(item => item.text.includes(this.labelSearchParam))
    }
  },
  created () {
    window.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeDestroy () {
    window.removeEventListener('mousedown', this.handleClickOutside)
  },
  methods: {
    handleItemClick (item) {
      this.$emit('on-item-click', item)
    },
    handleSearch (e) {
      this.labelSearchParam = e.target.value
      this.$emit('on-search', this.labelSearchParam)
    },
    handleClickOutside (e) {
      if (!this.$el.contains(e.target)) {
        this.$emit('on-hide')
      }
    }
  },
  render () {
    return (
      <div class={ ['label-menu', this.show ? '' : 'hide']} style={ { top: `${this.y}px`, left: `${this.x}px` } }>
        <input type="text" value={ this.labelSearchParam } class="label-search" oninput={ this.handleSearch } />
        <div class="item-wrapper">
          {
            this.copiedLabels.map(item => {
              return (
                <div class="label-menu-item" onclick={ () => this.handleItemClick(item) }>
                  <div class="label-menu-item-color" style={ { backgroundColor: item.backgroundColor } }></div>
                  <span class="label-menu-item-content" title={ item.text }>{ item.text }</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  },
}

```



## 2. 文本以及标签的显示(label-editor)

用于显示待标注文本以及已标注的标签信息, 是文本标注的主要操作区域.

文本标注的实现思路为:
1. 获取文本选中区域坐标
2. 弹出标签选择列表进行标签选择
3. 将文本以框选的位置为中心成多个块(chunk)
4. 将选中位置的块(chunk)设置标签样式

![chunk分布](https://i.loli.net/2021/07/05/dBYZ8mqTPUON96A.png)


### 获取文本选中区域

使用[window.getSelection().getRangeAt(0)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)来获取用户当前选中文本区域的开始坐标与结束坐标(**基于选中元素位置**), 通过监听文本容器的 `onMouseDown`和 `onMouseUp` 来实现.

![image-20210705145848604](https://i.loli.net/2021/07/05/FoMh8uO1UKpLHnm.png)

```javascript
const sel = window.getSelection()
const { startOffset, endOffset } = sel.getRangeAt(0) // 有些浏览器可以选择多个区域, 但大多数浏览器行为是只能选择一段文字, 所以getRangeAt(0)
console.log('开始位置为:', startOffset) // 0
console.log('结束位置为:', endOffset) // 7
```

注: `getRangeAt(0)` 获取到的坐标是相对于当前选中元素的文本位置, 而非选中位置对于整体文本的位置(具体理解参考下面例子)

```html
<span>0123456789</span>
<br>一二三四五六七八九十<br>
<span>9876543210</span>
<br>
<span id="position"></span>
```

```javascript
const displayEl = document.querySelector('#position')
window.addEventListener('mouseup', getPosition)
function getPosition () {
  const sel = window.getSelection()
  const { startOffset, endOffset } = sel.getRangeAt(0)
  displayEl.innerText = `开始位置为${startOffset}, 结束位置为${endOffset}`
}
```

<img src="https://i.loli.net/2021/07/05/kEh9mFoIDnN8BpL.png" style="display: inline-block; width: 30%; margin-right: 1%; margin-left:3.5%" />
<img src="https://i.loli.net/2021/07/05/SfNG5bheQc4Ea6U.png" style="display: inline-block; width: 30%; margin-right: 1%" />
<img src="https://i.loli.net/2021/07/05/q8XZRcodvGO71e3.png" style="display: inline-block; width: 30%; margin-right: 1%" />

### 文本标注(chunk拆分)

在选择标签后, 我们需要使用上一步的`startOffset` 和 `endOffset`,并分别加上当前chunk的偏移量(偏移量为chunk的`start`, 因为`startOffset`与`endOffset`是针对于元素的文本位置, 所以需要加上chunk的start才能得到选中文字针对于整体文本的位置)对选中文本进行拆分为下面三块
+ [文本开始坐标, `startOffset`)
+ [`startOffset`, `endOffset`] <- 这是当前选中的区域
+ (`endOffset`, 文本结束坐标]
拆分完的每个块对象含有对应的文本片段以及坐标信息 `{ text: string, start: number, end: number }`,
其中被标注块(选中块)还含有对应标签的颜色(color),标签文本(label)以及id等信息

```javascript
const chunkBefore = this.makeChunk(originText.substring(0, this.start), {
    start,
    end: target.startOffset
})
const annotatedChunk = this.makeChunk(originText.substring(this.start, this.end), {
    label: text,
    color: backgroundColor,
    id: target.id,
    start: target.startOffset,
    end: target.endOffset
})
const chunkAfter = this.makeChunk(originText.substring(this.end), {
    start: target.endOffset,
    end
})
this.chunks.splice(chunkIndex, 1, chunkBefore, annotatedChunk, chunkAfter)
```

页面显示使用`v-for`遍历chunks来渲染, 有标注信息的chunk使用高亮组件(`Highlight`)进行渲染

```jsx
this.chunks.map((item, i) => {
    if (item.label) {
      return (
        <Highlight
          text={ item.text }
          label={ item.label }
          color={ item.color }
          data-index={ i }
          on-on-click={ e => this.changeLabel(e, i) }
          on-on-mousedown={ () => { this.currentChunkIndex = i } }
          on-on-mouseup={ e => this.handleMouseUp(e, i) }
          on-on-delete={ () => this.removeLabel(item, i) }
        />
      )
    } else {
      return <span
        onmousedown={ () => { this.currentChunkIndex = i } }
        onmouseup={e => this.handleMouseUp(e, i)}
        data-index={i}
      >
        { item.text }
      </span>
    }
})
```

附上`Highlight.jsx`组件代码
```jsx
import './highlight.less'
export default {
  name: 'Highlight',
  props: {
    text: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    color: String,
  },
  render () {
    return (
      <span
        class={this.label ? 'highlight bottom' : ''}
        style={{ borderColor: this.color || '#000' }}
        onmousedown={ this.handleMouseDown }
        onmouseup={ this.handleMouseUp }
        onclick={ this.handleClick }
      >
        <span class="highlight__content">{ this.text }</span>
        <span class="highlight__label" data-label={ this.label } style={{ backgroundColor: this.color || '#000' }}></span>
        <button class="highlight__button" onclick={ this.handleDelete }>
          <h-icon name="android-close"></h-icon>
        </button>
      </span>
    )
  },
  methods: {
    handleClick (e) {
      this.$emit('on-click', e)
    },
    handleMouseDown (e) {
      this.$emit('on-mousedown', e)
    },
    handleMouseUp (e) {
      this.$emit('on-mouseup', e)
    },
    handleDelete (e) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('on-delete')
    }
  }
}

```

这样基础的标注功能就完成了. 但是有时候用户选择的文本会跨chunk进行选择, 这时候我们就需要在用户`mouseUp`的时候进行判断.   
这里我选择在`mouseDown`的时候记录用户当前点击chunk的下标, 然后与`mouseUp`的target的下标进行比较, 如果一致则为同一个chunk.   
```javascript
if (!target.dataset.index || +target.dataset.index !== this.currentChunkIndex) return
```

### 取消标注(chunk合并)
在取消标注信息的时候需要对之前拆分好的chunk进行合并操作.  
找到最靠前的chunk的start与最靠后的end作为合并后chunk的start与end, 文本则进行拼接.(传入的chunks是有顺序的, 所以方法内没有再根据start进行排序)
```javascript
mergeChunk (...chunks) {
    return chunks.reduce((init, chunk) => {
      if (chunk.start < init.start) init.start = chunk.start
      if (chunk.end > init.end) init.end = chunk.end
      init.text += chunk.text
      return init
    }, {
      start: Infinity,
      end: 0,
      color: null,
      label: null,
      text: ''
    })
}
```