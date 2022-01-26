import {
  call,
  answer,
  hangup,
  addStream,
  createLocalConnection,
  createRemoteConnection
} from '../../HoweEngine/connection.js'
import Engine from '../../HoweEngine/engine.mjs'

const localVideo = document.querySelector('#localVideo')
const remoteVideo = document.querySelector('#remoteVideo')

const callBtn = document.querySelector('#call')
const answerBtn = document.querySelector('#answer')
const hangupBtn = document.querySelector('#hangup')
hangupBtn.disabled = true
answerBtn.disabled = true

const engine = new Engine()
createLocalConnection()
const stream = await engine.getStream()
localVideo.srcObject = stream
callBtn.addEventListener('click', async () => {
  createLocalConnection()
  addStream(stream)
  createRemoteConnection((stream) => {
    console.log('stream响应', stream)
    remoteVideo.srcObject = stream
  })
  await call()
  hangupBtn.disabled = false
  answerBtn.disabled = false
  callBtn.disabled = true
})
answerBtn.addEventListener('click', () => {
  answer()
  answerBtn.disabled = true
})
hangupBtn.addEventListener('click', () => {
  hangup()
  callBtn.disabled = false
  answerBtn.disabled = false
})
