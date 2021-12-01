import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 相当于一个容器Container
const scene = new THREE.Scene()

// 视觉锥台, 像是一个摄像机镜头, 用于拍摄物体
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

// 设置渲染像素比
renderer.setPixelRatio(window.devicePixelRatio)
// 设置渲染区域大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 设置相机位置
camera.position.setZ(30)
// 绘制
renderer.render(scene, camera)

// 场景布置完毕， 请演员 ↓

// 新建几何体, 环结构
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

// 新建材料, wireframe控制是否显示材料结构
const material = new THREE.MeshStandardMaterial({ color: 0x0089ffe })

// 混合几何体和材料， 做成环
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

// 添加灯光

// 点光源, hex颜色表示， 相当于#FFFFFF
const pointLight = new THREE.PointLight(0xFFFFFF)

pointLight.position.set(10, 10, 10)
scene.add(pointLight)

// 环境光
// const ambientLight = new THREE.AmbientLight(0x404040 )
// scene.add(ambientLight)

// 半球光，模拟太阳光照
// const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
// scene.add(hemisphereLight)

//
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

// 网格辅助， 可以看见水平线
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper)

// 轨道控制器， 可以控制画布缩放以及整体相机角度
const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color:0xFFFFFF })
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill(0).forEach(addStar)

// 添加背景图片
const spaceTexture = new THREE.TextureLoader().load('./universe.jpg')
scene.background = spaceTexture
controls.autoRotate = true
// 缩放步长
controls.zoomSpeed = 0.1
function anime() {
  requestAnimationFrame(anime)
  torus.rotation.x += 0.005
  torus.rotation.y += 0.005
  torus.rotation.z += 0.005
  controls.update()
  renderer.render(scene, camera)
}

// setInterval(() => {
//   camera.position.random()
// }, 1000)

anime()

