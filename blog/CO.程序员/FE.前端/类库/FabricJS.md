---
WIP: true
---
# Fabric.JS

> canvas绘图库, 操作便捷, 缺点是文档多为英文(本人英文渣渣)  
> [官方网站](http://fabricjs.com/)

## Install

+ bower   
  `bower install fabric`

+ npm  
  `npm install fabric --save`

+ CDN  
  `<script src="https://cdn.bootcss.com/fabric.js/3.4.0/fabric.js"></script>`

## Usage

### 1. Canvas

> 创建画布, 用于创建画布容器

#### 1.1 创建实例

+ html

```html
<canvas id="demo" width="100" height="100"></canvas>
```

+ js

```javascript
// 创建默认画布
const canvas = new fabric.Canvas('demo')

// 自定义初始化画布属性
const options = {
  backgroundColor: 'blue'
  // ...
}
const customCanvas = new fabric.Canvas('demo', options)

```

#### 1.2 交互

+ 禁用选中

```javascript
// 禁用画布选择
canvas.selection = false

// 禁用画布中元素选择
rect.set('selectable', false)
rect.selectable = false
```

+ 自定义框选框样式

```javascript
canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 5;
canvas.selectionDashArray = [10, 0, 10]
```

#### 1.3 画布调整及渲染

```javascript
// 画布属性调整
canvas.setBackgroundColor('blue')
// ...

// 重新渲染
canvas.renderAll()

// 清除画布内容
canvas.clear()
```

#### 1.4 画布数据导出/导入

+ toJSON

```javascript
const canvas = new fabric.Canvas('demo')
JSON.stringify(canvas) // "{version: "3.4.0", objects: []}"
canvas.toJSON() // "{version: "3.4.0", objects: []}"
// objects 为画布中的对象集合
```

+ toImage

```javascript
const canvas = new fabric.Canvas('demo')
canvas.toDataURL('png') // data:image/png;base64, ....
```

+ toObject

```javascript
const canvas = new fabric.Canvas('demo')
canvas.toObject() // {version: "3.4.0", objects: []}
```

+ toSVG

```javascript
const canvas = new fabric.Canvas('demo')
canvas.toSVG()
// <?xml version="1.0" encoding="UTF-8" standalone="no" ?> .... </svg>
```

+ fromJSON

```javascript
const canvas = new fabric.Canvas()
canvas.loadFromJSON('jsonString')
```



### 2. Object (对象)

#### 2.1 基本对象

> fabric一共提供了7种类基础图形类型

1. Circle (圆)
2. Ellipse (椭圆)
3. Line (线)
4. Polygon (多边形)
5. Polyline (折线)
6. Rect (矩形)
7. Triangle (三角形)

初始化方法为  
`var rect = new fabric.Rect({option})`  
属性变更与获取方法为  
`rect.set('attr', 'value')`  
`rect.get('attr')`

#### 2.2 Image 图片

用法  
`fabric.Image.fromURL('url', options)`  
例

```javascript
const img =  fabric.Image.fromURL('demo.jpg', {
  
})
```

#### 2.3 Text 文本

用法  
`new fabric.Text('text', options)`  
例

```javascript
const text = new fabric.Text('demo', {
  left: 10,
  right: 10,
  fontFamily: 'Comic Sans'
})
```

#### 2.4 Group 组

用法  
`new fabric.Group([object1, object2, ..., objectN], options)`

| API           | 说明                           |
| ------------- | ------------------------------ |
| add           | 向组中添加对象                 |
| addWithUpdate | 向组中添加对象, 并更新组的尺寸 |


#### 2.5 对象操作

**Function 方法**

+ object.clone() 拷贝对象

**Attribute 属性**

| 属性          | 说明                                                   | 类型    |
| ------------- | ------------------------------------------------------ | ------- |
| lockMovementX | 锁定X轴移动                                            | boolean |
| lockMovementY | 锁定Y轴移动                                            | boolean |
| lockRotation  | 锁定旋转                                               | boolean |
| lockScalingX  | 锁定X轴缩放                                            | boolean |
| lockScalingY  | 锁定Y轴缩放                                            | boolean |
| hasBorders    | 是否显示选中对象时的边框                               | boolean |
| hasControls   | 是否显示选中对象时候的边框的角(就是边框上的几个小方块) | boolean |
| selectable    | 是否可以选中                                           | boolean |

### 3. Animation (动画)

语法  
`fabricObject.animate('attr', targetValue, options)`
例

```javascript
// 该方法改变了矩形的高到200px
rect.animate('height', 200, {
  onChange: canvas.renderAll.bind(canvas), // canvas 为实例化的画布容器
  duration: 1000, // ms
  easing: fabric.util.ease.easeOutBounce // fabric 内置
})
````

### 4. Event (事件)

**API**:  
绑定事件`on`  
解绑事件`off`  

用法  
`canvas.on('eventType', handler)`

**EventType (事件列表)**

+ 鼠标事件

| 事件       | 说明     |
| ---------- | -------- |
| mouse:down | 鼠标按下 |
| mouse:up   | 鼠标抬起 |
| mouse:move | 鼠标移动 |

+ 通用事件

| 事件         | 说明   |
| ------------ | ------ |
| after:render | 渲染后 |

+ 选择/交互相关

| 事件                     | 说明     |
| ------------------------ | -------- |
| before:selection:cleared | 取消选中 |
| selection:created        | 选中     |
| selection:cleared        | 清除选中 |

+ 对象事件

| 事件            | 说明       |
| --------------- | ---------- |
| object:modified | 对象被修改 |
| object:added    | 对象被添加 |
| object: removed | 对象被移除 |
| object:selected | 对象被选中 |
| object: moving  | 对象移动   |
| object: scaling | 对象缩放   |
| object:rotating | 对象旋转   |


例  

```javascript
const canvas = new fabric.Canvas('target')
canvas.on('mouse:down', options => {
// options中包含 e, target两个属性
// e: 原始事件
// target: 当前点击元素
  console.log(options)
})
```

### 5. 通用API

| API  | 描述 |
| ---- | ---- |
|      | obj  |