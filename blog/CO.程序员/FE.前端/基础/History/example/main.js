import './style.css'

history.replaceState(null, null, '')
const links = document.querySelectorAll('a')
const content = document.querySelector('.content')
let currentContent = ''
const stack = []
links.forEach(link => link.onclick = function() {
  console.log(this.text)
  history.pushState({ name: this.text}, this.text, `/${this.text}`)
  stack.push(this.text)
  currentContent = this.text
  changeContent()
})

function changeContent () {
  content.innerHTML = `
    current location is <b>${window.location.href}</b>
    <br/>
    history stack size is: <b>${history.length}</b>
    <br/>
    page content is <b>${currentContent}</b>
    <br/>
    stack is: ${stack}
  `
}

// Note that the pushState and replaceState can not trigger this event
// only `back`, `forward`, `go` can
window.onpopstate = e => {
  console.log('popstate', e)
  stack.pop()
  changeContent()
}
