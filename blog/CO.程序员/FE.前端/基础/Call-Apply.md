# Call, Bind, Apply

## 问题

写一个`console.log`的包装方法, 用于`debug`输出信息. (输出需要显示**真实代码行号**)

## 总结

+ `call`, `bind`, `apply` 都是用于改变方法上下文(`this`)指向
+ `call`与`apply`作用相同, 都是用于改变方法`this`指向. 不同的是`call`接收**参数列表**而`bind`接收**参数数组**
+ `call`, `apply`与`bind`不同的是: `bind`不调用函数, 只**返回原函数的副本**, 而`call`,`bind`将会调用函数
+ 可以使用`bind`预设函数参数来创造**偏函数**
```javascript
const mul = (a, b) => a * b
const double = mul.bind(null, 2)
console.log(mul(2, 3)) // -> 6
console.log(double(3)) // -> 6
```
+ `bind`生成的副本函数不可以重新绑定(`fn.bind(a).bind(b)`最终`this`还是`a`)

## `call` & `apply`

`fn.call(context, arg1, arg2, ...)`
`fn.apply(context, [arg1, arg2, ...])`

## `bind`

用法:

`fn.bind(context, arg1, arg2, ...)`

该方法接收的参数列表将会作为方法`fn`的预置参数, 返回`fn`的副本(不调用)

