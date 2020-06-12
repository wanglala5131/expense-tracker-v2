const modalBody = document.querySelector('.modal-body')
let iconInput = document.querySelector('.icon-input')
const iconImg = document.querySelector('#icon')
modalBody.addEventListener('click', (evevt) => {
  if (event.target.tagName === 'INPUT' && evevt.target.className.includes('self-btn')) {
    const iconClass = document.querySelector('.self-input').value
    iconInput.value = iconClass
    iconImg.className = iconClass
  }
  if (event.target.tagName === 'I') {
    const iconClass = event.target.className
    iconInput.value = iconClass
    iconImg.className = iconClass
  }
  if (event.target.tagName === 'BUTTON') {
    const iconClass = event.target.children[0].className
    iconInput.value = iconClass
    iconImg.className = iconClass
  }
})
