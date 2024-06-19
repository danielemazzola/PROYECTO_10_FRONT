import './alert.css'

export const Alert = (error, msg) => {
  if (!msg) return null
  const body = document.querySelector('body')
  let containerAlert = document.querySelector('#containerAlert')

  if (!containerAlert) {
    containerAlert = document.createElement('div')
    containerAlert.id = 'containerAlert'
    body.append(containerAlert)
  }

  const divAlert = document.createElement('div')
  const msgAlert = document.createElement('p')
  divAlert.className = 'alert'
  msgAlert.className = 'messageAlert'
  msgAlert.textContent = msg
  if (error) {
    divAlert.classList.add('error')
  }
  containerAlert.appendChild(divAlert)
  divAlert.appendChild(msgAlert)

  setTimeout(() => {
    divAlert.remove()
    if (containerAlert.childElementCount === 0) {
      containerAlert.remove()
    }
  }, 4000)
}
