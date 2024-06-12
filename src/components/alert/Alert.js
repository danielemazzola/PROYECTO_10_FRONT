import './alert.css'

export const Alert = (error, msg) => {
  if (!msg) return
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
  divAlert.style.backgroundColor = error ? 'rgb(255, 0, 0)' : 'rgb(0, 40, 219)'
  containerAlert.appendChild(divAlert)
  divAlert.appendChild(msgAlert)

  setTimeout(() => {
    divAlert.remove()
    if (containerAlert.childElementCount === 0) {
      containerAlert.remove()
    }
  }, 4000)
}
