<template>
  <div>

  </div>
</template>

<script setup lang="ts">
// class A{}
/**
 * Class A { name='a' } ES5 version
 * @param Constructor 构造函数
 * @param protoProps 原型属性
 * @param staticProps 静态属性
 */
function createClass(Constructor, protoProps, staticProps) {
  if (protoProps) Object.defineProperties(Constructor.prototype, protoProps)
  if (staticProps) Object.defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}

function defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumberable = descriptor.enumberable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}

function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

// 继承方法实现
function inherits(subClass, superClass) {
  // 如果父类不是方法, 则报错
  // ps: 可以 extends null
  if(typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass)
  }
  // 将子类的原型指向父类原型对象
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  // 将子类原型属性禁止写入
  Object.defineProperty(subClass, 'prototype', { writable: false })
  if (superClass) setPrototypeOf(subClass, superClass)
}

var setPrototypeOf = function (obj, proto) {
  setPrototypeOf = Object.setPrototypeOf ||
  function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto
    return obj
  }
  return setPrototypeOf(obj, proto)
}

var getPrototypeOf = function (o) {
  getPrototypeOf = Object.setPrototypeOf 
    ? Object.getPrototypeOf 
    : function _getPrototypeOf (o) {
      return o.__proto__ || Object.getPrototypeOf(o)
    }
  return getPrototypeOf(o)
}

function createSuper(Constructor) {
  var hasNativeReflectConstruct = isNativeReflectConstruct()
  return function createSuperInternal() {
    var Super = getPrototypeOf(Constructor), result
    if (hasNativeReflectConstruct) {
      var NewTarget = getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      // 寄生组合继承
      result = Super.apply(this, arguments)
    }
    return possibleConstructorReturn(this, result)
  }
}

function possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  } else if (call !== void 0) {
    throw new TypeError('Derived constructors may only return object or undefined')
  }
  return self
}

function _typeof(obj) {
  return ('function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
  ? function (obj) { return typeof obj }
  : function (obj) {
    return obj 
    && 'function' == typeof Symbol
    && obj.constructor === Symbol
    && obj !== Symbol.prototype
      ? 'symbol'
      : typeof obj
  })(obj)
}

// 是否是原生的 Reflect构造
function isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}

// IIFE
var A = (function () {
  function A() {
    classCallCheck(this, A)
    defineProperty(this, 'name', 'a')
  }
  createClass(A, [
    {
      key: 'getName',
      value: function getName() {
        return this.name
      }
    }
  ])
  return A
})()

var B = (function (Parent) {
  inherits(B, Parent)
  debugger
  var _super = createSuper(B)
  function B() {
    classCallCheck(this, B)
    return _super.call(this)
  }
  return createClass(B)
})(A)

</script>
