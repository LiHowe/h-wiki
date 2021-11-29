# Three.js


## 灯光

### AmbientLight - 环境光源

### DirectionalLight - 平行光源

用于模拟太阳光之类的**无限远的**平行光源

`new THREE.DirectionalLight( color : Integer, intensity : Float )`
+ `color`: 光源颜色
+ `intensity`: 光照强度

### HemisphereLight - 半球光源

用于模拟户外光线, ** 无法产生阴影 **

`new THREE.HemisphereLight( skyColor : Integer, groundColor : Integer, intensity : Float )`
+ `skyColor`: 天空发出的颜色, 默认`0xffffff`
+ `groundColor`: 地面发出的颜色, 默认`0xffffff`
+ `intensity`: 光照强度, 默认`1`

### PointLight - 点光源 
相当于一个电灯泡发出的光一样
`new PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )`
+ `color`: 颜色. 默认`0xffffff`
+ `intensity`: 光照强度. 默认`1`
+ `distance`: 这个距离表示从光源到光照强度为0的位置. 默认`0`
+ `decay`: 沿着光照距离的衰退量. 默认`1`

设置光源位置
`light.position.set(x, y, z)`

### RectAreaLight - 矩形光源

模拟管儿灯、窗户透过的光以及条形灯光源
