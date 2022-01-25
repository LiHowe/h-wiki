export function generateButton (text, clickHandler, parent) {
  const closeCamBtn = document.createElement('button')
  closeCamBtn.innerText = text
  closeCamBtn.classList.add(
    'rounded',
    'border',
    'px-2',
    'py-1',
    'text-white',
    'bg-blue-500',
    'hover:bg-blue-700',
    'text-sm'
  )
  closeCamBtn.onclick = () => {
    clickHandler(closeCamBtn)
  }
  parent.appendChild(closeCamBtn)
  return closeCamBtn
}

let selectIndex = 0
export function generateSelect (label, options, itemClickHandler, parent ) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('py-1', 'm-1')
  const labelEl = document.createElement('label')
  labelEl.style.width = '80px'
  labelEl.style.display = 'inline-block'
  labelEl.innerText = label
  labelEl.setAttribute('for', selectIndex)
  const select = document.createElement('select')
  select.id = selectIndex
  select.classList.add('border', 'rounded', 'px-2', 'py-1')
  options.forEach((item, i) => {
    const ops = document.createElement('option')
    ops.value = item.label
    ops.key = item.value
    ops.innerText = item.label
    ops._index = i
    select.appendChild(ops)
  })
  select.onchange = () => {
    itemClickHandler(options[select.selectedIndex])
  }
  wrapper.appendChild(labelEl)
  wrapper.appendChild(select)
  parent.appendChild(wrapper)
  return select
}

let checkboxIndex = 0
export function generateCheckbox (label, handler, parent, defaultValue = true) {
  const wrapper = document.createElement('div')
  wrapper.classList.add('border', 'rounded','px-2', 'py-1', 'm-1', 'flex', 'items-center', 'justify-between')
  const labelEl = document.createElement('label')
  labelEl.innerText = label
  labelEl.setAttribute('for', checkboxIndex)
  labelEl.classList.add('cursor-pointer')
  const cbx = document.createElement('input')
  cbx.id = checkboxIndex
  cbx.type = 'checkbox'
  cbx.checked = defaultValue
  cbx.onchange = () => {
    handler(cbx.checked)
  }
  wrapper.appendChild(labelEl)
  wrapper.appendChild(cbx)
  parent.appendChild(wrapper)
  checkboxIndex++
  return cbx
}
