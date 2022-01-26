/**
 * 本地(发送端)
 * @type RTCPeerConnection
 */
let localPeerConnection
/**
 * 接收端
 * @type RTCPeerConnection
 */
let remotePeerConnection

let localStream

let remoteStream

let server = null

export function createLocalConnection () {
  localPeerConnection = new RTCPeerConnection(server)
  localPeerConnection.addEventListener('icecandidate', handleConnection);
  localPeerConnection.addEventListener(
  'iceconnectionstatechange', e => {
    console.log('local ICE连接状态改变,', e.target.iceConnectionState)
  })
}

export function createRemoteConnection (cb) {
  remotePeerConnection = new RTCPeerConnection(server)
  remotePeerConnection.addEventListener('icecandidate', handleConnection)
  remotePeerConnection.addEventListener(
    'iceconnectionstatechange', e => {
      console.log('remote ICE连接状态改变,', e.target.iceConnectionState)
    })
  remotePeerConnection.addEventListener('track', e => {
    console.log('add stream fn listener', e)
    remoteStream = e.streams[0]
    cb(remoteStream)
  })
}

/**
 *
 * @param stream {MediaStream}
 */
export function addStream (stream) {
  stream.getTracks().forEach(track => {
    localPeerConnection.addTrack(track, stream)
  })
}

export async function call () {
  console.log('呼叫')
  // 创建SDP offer, 返回回话描述信息(sdp)和类型(type)
  const sessionDescription = await localPeerConnection.createOffer()
  console.log('sessionDescription is', sessionDescription)
  await localPeerConnection.setLocalDescription(sessionDescription)
  await remotePeerConnection.setRemoteDescription(sessionDescription)
}

export async function answer () {
  console.log('响应呼叫')
  const sessionDescription = await remotePeerConnection.createAnswer()
  await remotePeerConnection.setLocalDescription(sessionDescription)
  await localPeerConnection.setRemoteDescription(sessionDescription)
}

export async function hangup () {
  console.log('结束通话')
  localPeerConnection.close()
  remotePeerConnection.close()
  localPeerConnection = null
  remotePeerConnection = null
}

function handleConnection(event) {
  const peerConnection = event.target;
  const iceCandidate = event.candidate;

  if (iceCandidate) {
    const newIceCandidate = new RTCIceCandidate(iceCandidate)
    const otherPeer = getOtherPeer(peerConnection)

    otherPeer.addIceCandidate(newIceCandidate)
      .then(() => {
        console.log('add ice candidate success')
      }).catch((error) => {
      console.log('add ice candidate failed', error)
    })
  }
}

// Gets the "other" peer connection.
function getOtherPeer(peerConnection) {
  return (peerConnection === localPeerConnection) ?
    remotePeerConnection : localPeerConnection;
}
