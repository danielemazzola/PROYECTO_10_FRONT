import { Alert } from '../../components/alert/Alert'
import './dashboard.css'

export const openAvatar = (data) => {
  const contain = document.querySelector('#avatarToggle')
  if (contain) contain.remove()
  const containImg = `
      <div id="avatarToggle">
        <img alt="avatar by ${data.data.name}" src=${
    data.data.avatar
  } loading='lazy' />
        <div class="infoToggle">
          <p>Name: <span>${data.data.name}</span></p>
          <p>Lastname: <span>${data.data.lastName}</span></p>
          <p>E-mail: <span>${data.data.email}</span></p>
          <p>Role: ${data.data.roles.map(
            (val, index) => `<span key=${index}> ${val}</span>`
          )}</p>
        </div>
      </div>
    `
  app.innerHTML = containImg
  return
}
export const closeAvatar = () => {
  const containImg = document.querySelector('#avatarToggle')
  containImg.style.animation = 'animateClose 0.3s forwards'
  setTimeout(() => {
    containImg.remove()
  }, 300)
  return
}

//CLOSE SESION
export const closeSession = () => {
  localStorage.removeItem('__EVENT_ACCESS__')
  let error = false
  Alert(error, '❤️Thank you for visiting us❤️')
  setTimeout(() => {
    window.location.assign('/')
  }, 3000)
}
