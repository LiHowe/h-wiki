---
categories:
- frontend
- basic
titleSlug: js-array
title: Array常用方法
thumbnail: ''
series: JS基础
description: 暂无
wip: true
top: false

---

# Array 常用方法

* `map()`  
  作用: 按照原始数组顺序对数组元素依次调用function, 返回一个新数组.  
  注意: 不会对空数组进行检测, **不会改变原始数组**  
  用法: `array.map(function(currentValue, index, arr), thisValue)`  
  • `currentValue` (必填):  当前元素的值  
  • `index` (可选):  当前元素索引  
  • `arr` (可选):  当前元素所属的数组对象  
  • `thisValue` (可选): 对象作为该执行回调时使用

* `indexOf()`  
  作用: 返回在该数组中第一个找到的元素位置, 不存在返回 -1  
  用法: `indexOf(item, start)`  
  • `item`(必填): 需要查找的元素  
  • `start`(可选): 规定开始检索的位置

* `lastIndexOf()`  
  作用: 返回在该数组中最后一个找到的元素位置, 不存在返回 -1  
  用法: `lastIndexOf(item, start)`  
  • `item`(必填): 需要查找的元素  
  • `start`(可选): 规定开始检索的位置

* `every()`  
  作用: 用于检测数组中元素是否全部符合指定条件(函数), 如有任意一个被检测元素不满足,则返回false并停止检测. 如果全部符合, 返回true  
  注意: 不会对空数组进行检测, **不会改变原数组**  
  用法: `every(function(currentValue, index, arr), thisvalue)`  
  • `currentValue` (必填):  当前元素的值  
  • `index` (可选):  当前元素索引  
  • `arr` (可选):  当前元素所属的数组对象  
  • `thisValue` (可选): 对象作为该执行回调时使用

* `some()`  
  作用: 用于检测数组元素是否部分符合指定条件(函数),如有任意一个被检测元素满足, 则返回true并停止检测. 如果无符合条件元素, 返回false  
  注意: 不会对空数组进行检测, **不会改变原数组**  
  用法: `some(function(currentValue, index, arr), thisvalue)`  
  • `currentValue` (必填):  当前元素的值  
  • `index` (可选):  当前元素索引
  • `arr` (可选):  当前元素所属的数组对象  
  • `thisValue` (可选): 对象作为该执行回调时使用

* `filter()`  
  作用: 筛选出符合指定条件(函数)的数组元素并返回  
  注意: 不会对空数组进行检测, **不会改变原数组**  
  用法: `filter(function(currentValue, index, arr), thisvalue)`  
  • `currentValue` (必填):  当前元素的值  
  • `index` (可选):  当前元素索引  
  • `arr` (可选):  当前元素所属的数组对象  
  • `thisValue` (可选): 对象作为该执行回调时使用

* `forEach()`  
  作用: 遍历数组  
  注意: 不会对空数组进行操作, **无返回值**  
  用法: `forEach(function(currentValue, index, arr), thisvalue)`  
  • `currentValue` (必填):  当前元素的值  
  • `index` (可选):  当前元素索引  
  • `arr` (可选):  当前元素所属的数组对象  
  • `thisValue` (可选): 对象作为该执行回调时使用

* `reduce()`    
  作用: 接收一个函数作为累加器, 数组中的每个值(从左到右)开始缩减, 最终计算为一个值.  
  注意: 不会对空数组进行操作  
  用法: `reduce(function(total, currentValue, currentIndex, arr), initialValue)`  
  • `total`(必填): 初始值或者计算结束后的返回值  
  • `currentValue`(必填): 当前元素  
  • `currentIndex`(可选): 当前元素的索引  
  • `arr`(可选): 当前数组
  • `initialValue`(可选): 传递给函数的初始值

* `join()`    
  作用: 用于把数组中的所有元素转换成一个字符串,并返回  
  注意: 不会改变原数组  
  用法: `join(separator)`  
  • `separator`(可选): 指定要使用的分隔符, 省略则默认为逗号

* `shift()`    
  作用: 用于将数组的第一个元素删除,并返回  
  注意: **会改变原数组**  
  用法: `shift()`

* `pop()`  
  作用: 用于将数组的最后一个元素删除,并返回  
  注意: **会改变原数组**  
  用法: `pop()`

* `splice()`  
  作用: 用于插入, 删除或替换数组元素, 返回被删除元素的数组  
  注意: **会改变原数组**  
  用法: `splice(index, howmany, item1, .... , itemX)`  
  • `index`(必填): 规定从何处开始添加/删除元素  
  • `howmany`(必填): 规定应该删除多少元素, 可为0  
  • `item1 ... itemx`(可选): 要添加到数组的元素

* `slice()`  
  作用: 用于截取数组, 返回截取到的元素[start, end)  
  注意: 不会改变原数组  
  用法: `slice(start, end)`  
  • `start`(可选): 规定截取开始位置. 若为负数,则为从数组尾部开始算起, -1 为最后一个元素, -2 为倒数第二个....以此类推  
  • `end`(可选): 规定截取结束位置. 若不指定该参数, 则会截取到数组长度结束

* `unshift()`  
  作用: 用于向数组开头添加元素, 返回数组的新长度  
  注意: **会改变原数组**  
  用法: `unshift(item1, item2, ..., itemX)`

* `reverse()`  
  作用: 用于颠倒数组元素顺序  
  注意: **会改变原数组**  
  用法: `reverse()`

* `sort()`  
  作用: 用于对数组进行排序, 默认为按字母升序, 返回排序后数组(原数组)  
  注意: **会改变原数组元素顺序**  
  用法: `sort(sortFunction)`  
  • `sortFunction`(可选): 规定数组排序规则, 不填为默认排序.  
