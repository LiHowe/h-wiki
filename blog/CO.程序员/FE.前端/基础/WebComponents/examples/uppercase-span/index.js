class UppercaseSpan extends HTMLElement {

    static get observedAttributes () {
        return ['text']
    }

    constructor () {
        super()
    }

    connectedCallback () {
        console.log('自定义元素首次被插入到文档DOM中')
        this.convert()
    }

    disconnectedCallback () {
        console.log('自定义元素从文档DOM中删除')
    }

    adoptedCallback () {
        console.log('自定义元素被移动到新的文档')
    }

    attributeChangedCallback (name, oldVal, newVal) {
        console.log('自定义元素增加、删除、修改自身属性', name, oldVal, newVal)
        if (oldVal !== newVal) this.convert()
    }

    convert () {
        // this.span.innerHTML = this.getAttribute('text').toUpperCase()
        const text = this.getAttribute('text') || ''
        this.innerHTML = `${text}  -> ${text.toUpperCase()}`
    }
}

// 定义自定义标签
// 语法 customElements.define(name, constructor, options)
// name 必须有横线(-)
customElements.define('uppercase-span', UppercaseSpan)

const change = document.querySelector('#change')
const add = document.querySelector('#add')
const remove = document.querySelector('#remove')
change.addEventListener('click', changeText)
add.addEventListener('click', addElement)
remove.addEventListener('click', removeElement)

function changeText () {
    const text = new Array(Math.round(Math.random() * 10)).fill(1).map(_ => {
        return String.fromCharCode(97 + Math.round(Math.random() * (122 - 97)))
    }).join('')
    document.querySelector('.uppercase-span').setAttribute('text', text)
}

function addElement () {
    if (document.querySelector('.uppercase-span')) return
    const el = document.createElement('uppercase-span')
    el.setAttribute('text', 'this is new element')
    el.classList.add('uppercase-span')
    document.body.appendChild(el)
    add.disabled = true
    remove.disabled = false
}

function removeElement () {
    const el = document.querySelector('.uppercase-span')
    if (!el) return
    document.body.removeChild(el)
    add.disabled = false
    remove.disabled = true
}