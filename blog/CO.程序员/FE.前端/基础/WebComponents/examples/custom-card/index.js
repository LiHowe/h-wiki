class CustomCard extends HTMLElement {
    
    static get observedAttributes () {
        return ['title', 'plain']
    }

    constructor () {
        super()
        const template = this._getEl('#card')
        const templateContent = template.content
        this.attachShadow({ mode: 'open' }).appendChild(templateContent.cloneNode(true))
    }

    attributeChangedCallback (name, oldVal, newVal) {
        const fnMapping = {
            title: this.handleTitleChange,
            plain: this.handlePlainChange
        }
        if (oldVal !== newVal) {
            fnMapping[name](newVal)
        }
    }

    handleTitleChange = (val) => {
        if (!val) val = this.getAttribute('title')
        const titleEl = this._getSelfEl('.title-content')
        if (val) this._getSelfEl('.card-title').classList.add('with-title')
        titleEl.innerText = val
    }

    handlePlainChange = (flag) => {
        if (flag == '') flag = true
        const body = this._getSelfEl('.card')
        console.log('enter handle plain change, flag is ', flag, body)
        body.classList[flag ? 'add': 'remove']('plain')
    }

    /**
     * @param {String} selector 
     * @returns {HTMLElement}
     */
    _getEl (selector) {
        return document.querySelector(selector)
    }

    /**
     * @param {String} selector 
     * @returns {HTMLElement}
     */
    _getSelfEl (selector) {
        return this.shadowRoot.querySelector(selector)
    }
    
}

customElements.define('custom-card', CustomCard)

const changeTitleButton = document.querySelector('#btn_change-title')
changeTitleButton.addEventListener('click', () => {
    const card = document.querySelector('custom-card')
    card.setAttribute('title', document.querySelector('#title-input').value)
})