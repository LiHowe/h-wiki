# Custom DOM
> https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements

##

## 生命周期
+ connectedCallback：当 custom element首次被插入文档DOM时，被调用。
+ disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
+ adoptedCallback：当 custom element被移动到新的文档时，被调用。
+ attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用, 参数为 (name, oldVal, newVal)
